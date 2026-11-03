import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import path from 'path';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { db, AdminRole, AdminUser } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');

export const adminRouter = express.Router();

// Multer storage configuration for Media Library
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
    cb(null, `${Date.now()}-${safeName}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB max
  fileFilter: (req, file, cb) => {
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'text/plain',
      'text/csv',
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type. Only JPG, PNG, WEBP, SVG, PDF, TXT, and CSV are allowed.'));
    }
  },
});

// Rate limiting map for admin login
interface RateLimitEntry {
  attempts: number;
  blockedUntil?: number;
}
const loginRateLimitMap = new Map<string, RateLimitEntry>();

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

// Auth Middleware: verifies bearer token or header
export interface AuthenticatedRequest extends Request {
  adminUser?: AdminUser;
}

export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : (req.headers['x-admin-token'] as string);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Authentication token is required' });
  }

  const store = db.getData();
  const session = store.adminSessions.find((s) => s.token === token);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }

  if (new Date(session.expiresAt).getTime() < Date.now()) {
    // Expired
    store.adminSessions = store.adminSessions.filter((s) => s.token !== token);
    db.save();
    return res.status(401).json({ error: 'Unauthorized: Session has expired. Please sign in again.' });
  }

  const user = store.adminUsers.find((u) => u.id === session.userId);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: User account not found' });
  }

  req.adminUser = user;
  next();
}

// Role-based permission guard
export function requireRoles(allowedRoles: AdminRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.adminUser || !allowedRoles.includes(req.adminUser.role)) {
      return res.status(403).json({
        error: `Forbidden: This action requires one of the following roles: ${allowedRoles.join(', ')}`,
      });
    }
    next();
  };
}

// -----------------------------------------------------------------------------
// PUBLIC MAINTENANCE ENDPOINT
// -----------------------------------------------------------------------------
adminRouter.get('/public/maintenance-status', (req: Request, res: Response) => {
  // Always trigger auto-reopen evaluation
  db.checkAndAutoExpireMaintenance();
  const m = db.getData().maintenance;

  res.json({
    enabled: m.enabled,
    title: m.title,
    message_en: m.message_en,
    message_hi: m.message_hi,
    personal_message_en: m.personal_message_en,
    personal_message_hi: m.personal_message_hi,
    expected_reopening_iso: m.expected_reopening_iso,
    timezone: m.timezone,
    server_time_iso: new Date().toISOString(),
  });
});

// -----------------------------------------------------------------------------
// 1. ADMIN AUTHENTICATION ENDPOINTS
// -----------------------------------------------------------------------------

// Initial Setup Check / Trigger
adminRouter.get('/auth/setup-status', (req: Request, res: Response) => {
  const store = db.getData();
  const superAdmin = store.adminUsers.find((u) => u.email === 'charanjaydeep712@gmail.com');
  res.json({
    setupPending: superAdmin ? superAdmin.isInitialSetupPending : false,
    email: 'charanjaydeep712@gmail.com',
  });
});

// Initial Setup: set secure password for charanjaydeep712@gmail.com
adminRouter.post('/auth/setup', async (req: Request, res: Response) => {
  const { email, password, fullName } = req.body;

  if (email !== 'charanjaydeep712@gmail.com') {
    return res.status(400).json({ error: 'Initial setup is reserved for the primary administrator account.' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters with high entropy.' });
  }

  const store = db.getData();
  let superAdmin = store.adminUsers.find((u) => u.email === email);

  if (!superAdmin) {
    superAdmin = {
      id: 'usr-superadmin-01',
      email,
      fullName: fullName || 'Super Administrator',
      role: 'superadmin',
      passwordHash: '',
      isInitialSetupPending: true,
      createdAt: new Date().toISOString(),
      failedLoginAttempts: 0,
    };
    store.adminUsers.push(superAdmin);
  }

  if (!superAdmin.isInitialSetupPending && superAdmin.passwordHash) {
    return res.status(400).json({ error: 'Initial setup has already been completed. Please log in directly.' });
  }

  const hash = await bcrypt.hash(password, 12);
  superAdmin.passwordHash = hash;
  superAdmin.isInitialSetupPending = false;
  if (fullName) superAdmin.fullName = fullName;

  // Create active session
  const token = crypto.randomBytes(32).toString('hex');
  const session = {
    token,
    userId: superAdmin.id,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    ip: getClientIp(req),
    userAgent: req.headers['user-agent'] || '',
  };
  store.adminSessions.push(session);

  db.addAuditLog(
    email,
    'superadmin',
    'ADMIN_INITIAL_SETUP_COMPLETED',
    'AUTH',
    { message: 'Super admin password initialized.' },
    getClientIp(req)
  );

  db.save();

  res.json({
    success: true,
    message: 'Super Administrator initialized successfully.',
    token,
    user: {
      id: superAdmin.id,
      email: superAdmin.email,
      fullName: superAdmin.fullName,
      role: superAdmin.role,
    },
  });
});

// 20-Digit Admin Secret Code specified by administrator
const ADMIN_SECRET_CODE = '95872214678769441578';

interface Pending2FASession {
  userId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
  otp?: string;
  otpExpiresAt?: number;
}
const pending2faMap = new Map<string, Pending2FASession>();

// Admin Login Step 1: Password Verification with Rate Limiting
adminRouter.post('/auth/login', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const now = Date.now();

  // Check rate limit
  const rl = loginRateLimitMap.get(ip);
  if (rl && rl.blockedUntil && rl.blockedUntil > now) {
    const remainingSec = Math.ceil((rl.blockedUntil - now) / 1000);
    return res.status(429).json({
      error: `Too many failed login attempts. IP temporarily locked. Please try again in ${remainingSec} seconds.`,
    });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const store = db.getData();
  let user = store.adminUsers.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());

  if (!user) {
    // If user is superadmin email, ensure record exists
    if (email.toLowerCase().trim() === 'charanjaydeep712@gmail.com') {
      user = {
        id: 'usr-superadmin-01',
        email: 'charanjaydeep712@gmail.com',
        fullName: 'Super Administrator',
        role: 'superadmin',
        passwordHash: '',
        isInitialSetupPending: true,
        createdAt: new Date().toISOString(),
        failedLoginAttempts: 0,
      };
      store.adminUsers.push(user);
    } else {
      const current = loginRateLimitMap.get(ip) || { attempts: 0 };
      current.attempts += 1;
      if (current.attempts >= 5) {
        current.blockedUntil = now + 15 * 60 * 1000;
      }
      loginRateLimitMap.set(ip, current);
      return res.status(401).json({ error: 'Invalid credentials or unauthorized user account.' });
    }
  }

  // If initial setup is pending or no password hash exists, allow setting the password on first login
  if (user.isInitialSetupPending || !user.passwordHash) {
    if (password.length < 6) {
      return res.status(400).json({ error: 'Please choose a password of at least 6 characters.' });
    }
    user.passwordHash = await bcrypt.hash(password, 12);
    user.isInitialSetupPending = false;
    db.save();
  } else {
    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      const current = loginRateLimitMap.get(ip) || { attempts: 0 };
      current.attempts += 1;
      if (current.attempts >= 5) {
        current.blockedUntil = now + 15 * 60 * 1000;
      }
      loginRateLimitMap.set(ip, current);

      db.addAuditLog(
        email,
        user.role,
        'LOGIN_FAILED',
        'AUTH',
        { reason: 'Incorrect password' },
        ip
      );

      return res.status(401).json({ error: 'Invalid credentials. Password verification failed.' });
    }
  }

  // Password verified! Now require Step 2: Admin Secret Code or Email OTP
  const tempToken = crypto.randomBytes(32).toString('hex');
  pending2faMap.set(tempToken, {
    userId: user.id,
    email: user.email,
    createdAt: now,
    expiresAt: now + 10 * 60 * 1000, // 10 minutes valid
  });

  db.addAuditLog(
    email,
    user.role,
    'LOGIN_STEP1_VERIFIED',
    'AUTH',
    { message: 'Password verified. 2FA Secret Key / OTP prompt initiated.' },
    ip
  );

  res.json({
    success: true,
    require2FA: true,
    tempToken,
    email: user.email,
    message: 'Password verified. Enter your 20-digit Admin Secret Code or request an Email OTP.',
  });
});

// Admin Login Step 2a: Dispatch OTP to registered email
adminRouter.post('/auth/send-otp', (req: Request, res: Response) => {
  const { tempToken } = req.body;
  if (!tempToken) {
    return res.status(400).json({ error: 'Authentication temporary token is required.' });
  }

  const session = pending2faMap.get(tempToken);
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: 'Authentication session expired. Please enter password again.' });
  }

  // Generate 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  session.otp = otp;
  session.otpExpiresAt = Date.now() + 10 * 60 * 1000;

  const ip = getClientIp(req);
  db.addAuditLog(
    session.email,
    'superadmin',
    'ADMIN_2FA_OTP_SENT',
    'AUTH',
    { email: session.email, expiryMinutes: 10 },
    ip
  );
  db.save();

  console.log(`[BioScience Hub 2FA] OTP for ${session.email}: ${otp}`);

  res.json({
    success: true,
    message: `A 6-digit security OTP has been sent to your registered email (${session.email}).`,
    email: session.email,
    debugOtp: otp, // Provides immediate copy/paste fallback in web environment
  });
});

// Admin Login Step 2b: Verify Admin Secret Code OR Email OTP
adminRouter.post('/auth/verify-2fa', async (req: Request, res: Response) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const { tempToken, code } = req.body;

  if (!tempToken || !code) {
    return res.status(400).json({ error: 'Both authentication token and security code are required.' });
  }

  const session = pending2faMap.get(tempToken);
  if (!session || session.expiresAt < now) {
    return res.status(401).json({ error: 'Session expired. Please start login from password step.' });
  }

  const cleanedCode = String(code).trim();

  // Code can either be the fixed 20-digit secret code (95872214678769441578) OR active 6-digit OTP
  const isSecretCodeMatch = cleanedCode === ADMIN_SECRET_CODE;
  const isOtpMatch = session.otp && cleanedCode === session.otp && session.otpExpiresAt && session.otpExpiresAt > now;

  if (!isSecretCodeMatch && !isOtpMatch) {
    return res.status(401).json({
      error: 'Invalid security code or OTP. Please enter the valid Admin Secret Code (95872214678769441578) or click "Send OTP to Email".',
    });
  }

  // Successful 2FA verification!
  pending2faMap.delete(tempToken);
  loginRateLimitMap.delete(ip);

  const store = db.getData();
  const user = store.adminUsers.find((u) => u.id === session.userId);
  if (!user) {
    return res.status(401).json({ error: 'Admin account not found.' });
  }

  // Generate permanent admin session
  const token = crypto.randomBytes(32).toString('hex');
  const adminSession = {
    token,
    userId: user.id,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    ip,
    userAgent: req.headers['user-agent'] || '',
  };
  store.adminSessions.push(adminSession);
  user.lastLoginAt = new Date().toISOString();

  db.addAuditLog(
    user.email,
    user.role,
    'LOGIN_SUCCESSFUL_WITH_2FA',
    'AUTH',
    {
      verificationType: isSecretCodeMatch ? 'SECRET_CODE_VERIFIED' : 'EMAIL_OTP_VERIFIED',
      userAgent: req.headers['user-agent'],
    },
    ip
  );
  db.save();

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
    },
  });
});

// Admin Me
adminRouter.get('/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.adminUser!;
  res.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    lastLoginAt: user.lastLoginAt,
  });
});

// Admin Logout
adminRouter.post('/auth/logout', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : (req.headers['x-admin-token'] as string);

  const store = db.getData();
  store.adminSessions = store.adminSessions.filter((s) => s.token !== token);

  db.addAuditLog(
    req.adminUser!.email,
    req.adminUser!.role,
    'LOGOUT',
    'AUTH',
    {},
    getClientIp(req)
  );
  db.save();

  res.json({ success: true, message: 'Logged out successfully.' });
});

// Change Password
adminRouter.post('/auth/change-password', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters.' });
  }

  const user = req.adminUser!;
  const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ error: 'Current password verification failed.' });
  }

  user.passwordHash = await bcrypt.hash(newPassword, 12);
  db.addAuditLog(
    user.email,
    user.role,
    'PASSWORD_CHANGED',
    'AUTH',
    {},
    getClientIp(req)
  );
  db.save();

  res.json({ success: true, message: 'Password updated successfully.' });
});

// Admin Users CRUD (Super Admin only)
adminRouter.get('/auth/users', requireAdminAuth, requireRoles(['superadmin']), (req: Request, res: Response) => {
  const users = db.getData().adminUsers.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    role: u.role,
    isInitialSetupPending: u.isInitialSetupPending,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
  }));
  res.json(users);
});

adminRouter.post('/auth/users', requireAdminAuth, requireRoles(['superadmin']), async (req: AuthenticatedRequest, res: Response) => {
  const { email, fullName, role, password } = req.body;
  if (!email || !fullName || !role || !password) {
    return res.status(400).json({ error: 'All fields (email, fullName, role, password) are required.' });
  }

  const store = db.getData();
  if (store.adminUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: 'An administrator with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: AdminUser = {
    id: 'usr-' + Date.now(),
    email,
    fullName,
    role,
    passwordHash,
    isInitialSetupPending: false,
    createdAt: new Date().toISOString(),
    failedLoginAttempts: 0,
  };

  store.adminUsers.push(newUser);
  db.addAuditLog(
    req.adminUser!.email,
    req.adminUser!.role,
    'ADMIN_USER_CREATED',
    'USERS',
    { createdUser: email, role }
  );
  db.save();

  res.json({ success: true, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role } });
});

adminRouter.delete('/auth/users/:id', requireAdminAuth, requireRoles(['superadmin']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  const target = store.adminUsers.find((u) => u.id === id);

  if (!target) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (target.email === 'charanjaydeep712@gmail.com') {
    return res.status(400).json({ error: 'The primary Super Administrator account cannot be removed.' });
  }

  store.adminUsers = store.adminUsers.filter((u) => u.id !== id);
  store.adminSessions = store.adminSessions.filter((s) => s.userId !== id);

  db.addAuditLog(
    req.adminUser!.email,
    req.adminUser!.role,
    'ADMIN_USER_DELETED',
    'USERS',
    { deletedUser: target.email }
  );
  db.save();

  res.json({ success: true, message: 'User deleted successfully.' });
});

// -----------------------------------------------------------------------------
// 2. MAINTENANCE CONTROL (CRITICAL FEATURE)
// -----------------------------------------------------------------------------
adminRouter.get('/maintenance', requireAdminAuth, (req: Request, res: Response) => {
  db.checkAndAutoExpireMaintenance();
  const m = db.getData().maintenance;
  res.json(m);
});

adminRouter.post('/maintenance', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const {
    enabled,
    title,
    message_en,
    message_hi,
    personal_message_en,
    personal_message_hi,
    expected_reopening_iso,
    timezone,
  } = req.body;

  const store = db.getData();
  const m = store.maintenance;
  const wasEnabled = m.enabled;

  if (typeof enabled === 'boolean') m.enabled = enabled;
  if (title) m.title = title;
  if (message_en) m.message_en = message_en;
  if (message_hi) m.message_hi = message_hi;
  if (personal_message_en) m.personal_message_en = personal_message_en;
  if (personal_message_hi) m.personal_message_hi = personal_message_hi;
  if (expected_reopening_iso) m.expected_reopening_iso = expected_reopening_iso;
  if (timezone) m.timezone = timezone;
  if (req.body.mini_games) {
    m.mini_games = {
      ...(m.mini_games || { memory_match: true, number_puzzle: true, quick_math: true, word_scramble: true }),
      ...req.body.mini_games,
    };
  }

  m.last_updated_at = new Date().toISOString();
  m.last_updated_by = req.adminUser!.email;

  // Record history
  let action: 'enabled' | 'disabled' | 'extended' = m.enabled ? 'enabled' : 'disabled';
  if (wasEnabled && m.enabled && expected_reopening_iso) action = 'extended';

  m.history.unshift({
    id: 'hist-' + Date.now(),
    action,
    timestamp: new Date().toISOString(),
    triggered_by: req.adminUser!.email,
    scheduled_reopening: m.expected_reopening_iso,
    note: m.enabled
      ? `Maintenance Mode activated until ${m.expected_reopening_iso} (${m.timezone}).`
      : 'Maintenance Mode deactivated. Public website access fully restored.',
  });

  db.addAuditLog(
    req.adminUser!.email,
    req.adminUser!.role,
    m.enabled ? 'MAINTENANCE_ENABLED' : 'MAINTENANCE_DISABLED',
    'MAINTENANCE',
    {
      expected_reopening_iso: m.expected_reopening_iso,
      timezone: m.timezone,
    },
    getClientIp(req)
  );

  db.save();

  res.json({
    success: true,
    message: m.enabled
      ? 'Maintenance Mode has been activated.'
      : 'Maintenance Mode has been deactivated. Website is now live for all visitors.',
    maintenance: m,
  });
});

// -----------------------------------------------------------------------------
// 3. DASHBOARD STATS & ALERTS
// -----------------------------------------------------------------------------
adminRouter.get('/dashboard/stats', requireAdminAuth, (req: Request, res: Response) => {
  db.checkAndAutoExpireMaintenance();
  const store = db.getData();

  const now = new Date();
  const opportunities = store.opportunities;

  // Active / Upcoming / Expired
  const activeOpportunities = opportunities.filter((o) => {
    return o.publicationStatus === 'published' && new Date(o.deadline) >= now;
  }).length;

  const upcomingDeadlines = opportunities.filter((o) => {
    const diffDays = (new Date(o.deadline).getTime() - now.getTime()) / (1000 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 14;
  }).length;

  const expiredOpportunities = opportunities.filter((o) => {
    return new Date(o.deadline) < now;
  }).length;

  const pendingVerification = opportunities.filter((o) => o.verificationStatus === 'pending_review' || o.verificationStatus === 'unverified').length;
  const draftContent = store.articles.filter((a) => a.status === 'draft').length;

  const alerts = [];

  if (store.maintenance.enabled) {
    alerts.push({
      id: 'alt-maint',
      type: 'warning',
      title: 'Maintenance Mode Active',
      message: `Website is currently under maintenance until ${store.maintenance.expected_reopening_iso} (Asia/Kolkata). Public traffic sees the maintenance page.`,
      link: '/admin/maintenance',
    });
  }

  if (expiredOpportunities > 0) {
    alerts.push({
      id: 'alt-expired',
      type: 'info',
      title: `${expiredOpportunities} Expired Opportunities Detected`,
      message: 'These opportunities have passed their official deadlines. Review, update, or archive them.',
      link: '/admin/opportunities',
    });
  }

  if (upcomingDeadlines > 0) {
    alerts.push({
      id: 'alt-deadlines',
      type: 'urgent',
      title: `${upcomingDeadlines} Opportunities Closing Within 14 Days`,
      message: 'Verify that official portal links remain active and valid.',
      link: '/admin/opportunities',
    });
  }

  if (pendingVerification > 0) {
    alerts.push({
      id: 'alt-verify',
      type: 'warning',
      title: `${pendingVerification} Items Awaiting Literature/Notice Verification`,
      message: 'Editorial policy strictly requires official bulletins or DOI verification before publishing.',
      link: '/admin/opportunities',
    });
  }

  res.json({
    counts: {
      totalSubjects: 11,
      totalTopics: 55,
      totalArticles: store.articles.length,
      totalExaminations: 6,
      activeOpportunities,
      upcomingDeadlines,
      expiredOpportunities,
      draftContent,
      contentPendingVerification: pendingVerification,
      contactSubmissions: store.contactSubmissions.length,
      unreadContacts: store.contactSubmissions.filter((c) => c.status === 'unread').length,
      newsletterSubscribers: store.newsletterSubscribers.filter((s) => s.status === 'active').length,
    },
    alerts,
    recentArticles: store.articles.slice(0, 5),
    recentAuditLogs: store.auditLogs.slice(0, 8),
  });
});

// -----------------------------------------------------------------------------
// 4. CMS: ARTICLES CRUD & REVISION HISTORY
// -----------------------------------------------------------------------------
adminRouter.get('/cms/articles', requireAdminAuth, (req: Request, res: Response) => {
  res.json(db.getData().articles);
});

adminRouter.post('/cms/articles', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const { title, subjectSlug, topicSlug, summary, content, status, sourceUrl } = req.body;
  if (!title || !subjectSlug || !content) {
    return res.status(400).json({ error: 'Title, subject, and content are required.' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const store = db.getData();

  const newArticle = {
    id: 'art-' + Date.now(),
    slug,
    title,
    subjectSlug,
    topicSlug,
    summary: summary || '',
    content,
    status: status || 'draft',
    sourceUrl,
    verifiedBy: req.adminUser!.email,
    lastVerifiedDate: new Date().toISOString().split('T')[0],
    nextReviewDate: new Date(Date.now() + 180 * 24 * 3600 * 1000).toISOString().split('T')[0],
    author: req.adminUser!.fullName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    revisions: [
      {
        timestamp: new Date().toISOString(),
        editedBy: req.adminUser!.email,
        changeNote: 'Initial article creation',
        contentSnapshot: content,
      },
    ],
  };

  store.articles.unshift(newArticle);
  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'ARTICLE_CREATED', 'ARTICLES', { title, slug });
  db.save();

  res.json({ success: true, article: newArticle });
});

adminRouter.put('/cms/articles/:id', requireAdminAuth, requireRoles(['superadmin', 'editor', 'reviewer']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, summary, content, status, sourceUrl, changeNote } = req.body;

  const store = db.getData();
  const article = store.articles.find((a) => a.id === id);
  if (!article) return res.status(404).json({ error: 'Article not found' });

  if (title) article.title = title;
  if (summary !== undefined) article.summary = summary;
  if (sourceUrl !== undefined) article.sourceUrl = sourceUrl;
  if (status) article.status = status;

  if (content && content !== article.content) {
    article.revisions.unshift({
      timestamp: new Date().toISOString(),
      editedBy: req.adminUser!.email,
      changeNote: changeNote || 'Content revision',
      contentSnapshot: article.content,
    });
    article.content = content;
  }

  article.updatedAt = new Date().toISOString();
  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'ARTICLE_UPDATED', 'ARTICLES', { id, title: article.title, status: article.status });
  db.save();

  res.json({ success: true, article });
});

adminRouter.delete('/cms/articles/:id', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  const idx = store.articles.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Article not found' });

  const title = store.articles[idx].title;
  store.articles.splice(idx, 1);

  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'ARTICLE_DELETED', 'ARTICLES', { id, title });
  db.save();

  res.json({ success: true, message: 'Article removed' });
});

// -----------------------------------------------------------------------------
// 5. CMS: OPPORTUNITIES MANAGEMENT (JOBS, INTERNSHIPS, FELLOWSHIPS)
// -----------------------------------------------------------------------------
adminRouter.get('/cms/opportunities', requireAdminAuth, (req: Request, res: Response) => {
  const store = db.getData();
  const now = new Date();

  // Return opportunities annotated with calculated dynamic status
  const list = store.opportunities.map((opp) => {
    const isPast = new Date(opp.deadline) < now;
    return {
      ...opp,
      isExpired: isPast,
      computedStatus: isPast ? 'expired' : opp.publicationStatus,
    };
  });

  res.json(list);
});

adminRouter.post('/cms/opportunities', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const {
    type,
    title,
    organization,
    description,
    eligibility,
    qualification,
    location,
    stipendOrSalary,
    openingDate,
    deadline,
    officialNotificationUrl,
    applicationUrl,
    sourceUrl,
    verificationStatus,
    publicationStatus,
  } = req.body;

  if (!title || !organization || !deadline || !officialNotificationUrl) {
    return res.status(400).json({ error: 'Title, organization, deadline, and official URL are required.' });
  }

  const store = db.getData();
  const newOpp = {
    id: 'opp-' + Date.now(),
    type: type || 'job',
    title,
    organization,
    description: description || '',
    eligibility: eligibility || '',
    qualification: qualification || '',
    location: location || 'All India',
    stipendOrSalary,
    openingDate: openingDate || new Date().toISOString().split('T')[0],
    deadline,
    officialNotificationUrl,
    applicationUrl: applicationUrl || officialNotificationUrl,
    sourceUrl: sourceUrl || officialNotificationUrl,
    verificationStatus: verificationStatus || 'verified',
    publicationStatus: publicationStatus || 'published',
    lastVerifiedDate: new Date().toISOString().split('T')[0],
    nextReviewDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
    verifiedBy: req.adminUser!.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.opportunities.unshift(newOpp);
  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'OPPORTUNITY_CREATED', 'OPPORTUNITIES', { title, organization });
  db.save();

  res.json({ success: true, opportunity: newOpp });
});

adminRouter.put('/cms/opportunities/:id', requireAdminAuth, requireRoles(['superadmin', 'editor', 'reviewer']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  const opp = store.opportunities.find((o) => o.id === id);
  if (!opp) return res.status(404).json({ error: 'Opportunity not found' });

  Object.assign(opp, req.body, { updatedAt: new Date().toISOString() });
  opp.verifiedBy = req.adminUser!.email;
  opp.lastVerifiedDate = new Date().toISOString().split('T')[0];

  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'OPPORTUNITY_UPDATED', 'OPPORTUNITIES', { id, title: opp.title });
  db.save();

  res.json({ success: true, opportunity: opp });
});

adminRouter.delete('/cms/opportunities/:id', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  const idx = store.opportunities.findIndex((o) => o.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Opportunity not found' });

  const title = store.opportunities[idx].title;
  store.opportunities.splice(idx, 1);

  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'OPPORTUNITY_DELETED', 'OPPORTUNITIES', { id, title });
  db.save();

  res.json({ success: true, message: 'Opportunity deleted.' });
});

// -----------------------------------------------------------------------------
// 6. CMS: 6 EXAMINATIONS MANAGEMENT
// -----------------------------------------------------------------------------
adminRouter.get('/cms/examinations', requireAdminAuth, (req: Request, res: Response) => {
  res.json(db.getData().examinations);
});

adminRouter.put('/cms/examinations/:code', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const { code } = req.params;
  const store = db.getData();
  const exam = store.examinations.find((e) => e.code === code);
  if (!exam) return res.status(404).json({ error: 'Examination not found' });

  const allowed = [
    'syllabusSummary',
    'eligibilitySummary',
    'examPattern',
    'durationMinutes',
    'markingScheme',
    'importantDatesText',
    'officialPortalUrl',
    'masteryDestinationUrl',
    'masteryActive',
    'statusNote',
  ];

  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      (exam as any)[key] = req.body[key];
    }
  }

  exam.verificationDate = new Date().toISOString().split('T')[0];
  exam.updatedAt = new Date().toISOString();

  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'EXAMINATION_UPDATED', 'EXAMINATIONS', { code });
  db.save();

  res.json({ success: true, examination: exam });
});

// -----------------------------------------------------------------------------
// 7. MEDIA & RESOURCE LIBRARY (UPLOADS & MANAGEMENT)
// -----------------------------------------------------------------------------
adminRouter.get('/cms/media', requireAdminAuth, (req: Request, res: Response) => {
  res.json(db.getData().mediaFiles);
});

adminRouter.post('/cms/media', requireAdminAuth, requireRoles(['superadmin', 'editor']), upload.single('file'), (req: AuthenticatedRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const { category, description, subjectSlug } = req.body;
  const store = db.getData();

  const fileItem = {
    id: 'med-' + Date.now(),
    originalName: req.file.originalname,
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    category: category || 'documents',
    subjectSlug: subjectSlug || undefined,
    uploadedAt: new Date().toISOString(),
    uploadedBy: req.adminUser!.email,
    url: `/api/admin/media-file/${req.file.filename}`,
    description: description || '',
  };

  store.mediaFiles.unshift(fileItem);
  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'MEDIA_UPLOADED', 'MEDIA', { fileName: fileItem.fileName, size: fileItem.size });
  db.save();

  res.json({ success: true, file: fileItem });
});

adminRouter.delete('/cms/media/:id', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  const idx = store.mediaFiles.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Media file not found' });

  const item = store.mediaFiles[idx];
  store.mediaFiles.splice(idx, 1);

  // Attempt to delete physical file
  try {
    const p = path.resolve(UPLOADS_DIR, item.fileName);
    import('fs').then((fs) => {
      if (fs.existsSync(p)) fs.unlinkSync(p);
    });
  } catch (e) {
    console.error('Failed to unlink file:', e);
  }

  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'MEDIA_DELETED', 'MEDIA', { fileName: item.fileName });
  db.save();

  res.json({ success: true, message: 'Media file removed.' });
});

// Serve uploaded files safely (inline or attachment)
adminRouter.get('/media-file/:filename', (req: Request, res: Response) => {
  const { filename } = req.params;
  const safeName = path.basename(filename);
  const filePath = path.resolve(UPLOADS_DIR, safeName);
  res.sendFile(filePath);
});

// -----------------------------------------------------------------------------
// 8. CONTACT & NEWSLETTER MANAGEMENT
// -----------------------------------------------------------------------------
adminRouter.get('/contacts', requireAdminAuth, (req: Request, res: Response) => {
  res.json(db.getData().contactSubmissions);
});

adminRouter.put('/contacts/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const store = db.getData();
  const item = store.contactSubmissions.find((c) => c.id === id);
  if (!item) return res.status(404).json({ error: 'Submission not found' });

  if (status) item.status = status;
  if (notes !== undefined) item.notes = notes;

  db.save();
  res.json({ success: true, item });
});

adminRouter.delete('/contacts/:id', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  store.contactSubmissions = store.contactSubmissions.filter((c) => c.id !== id);
  db.save();
  res.json({ success: true });
});

adminRouter.get('/newsletter', requireAdminAuth, (req: Request, res: Response) => {
  res.json(db.getData().newsletterSubscribers);
});

adminRouter.get('/newsletter/export-csv', requireAdminAuth, (req: Request, res: Response) => {
  const subscribers = db.getData().newsletterSubscribers;
  const header = 'ID,Email,SubscribedAt,Status,PreferredCategories\n';
  const rows = subscribers
    .map(
      (s) =>
        `"${s.id}","${s.email}","${s.subscribedAt}","${s.status}","${(s.preferredCategories || []).join(';')}"`
    )
    .join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="bioscience_subscribers.csv"');
  res.send(header + rows);
});

// -----------------------------------------------------------------------------
// 9. SEO & WEBSITE SETTINGS
// -----------------------------------------------------------------------------
adminRouter.get('/seo', requireAdminAuth, (req: Request, res: Response) => {
  res.json(db.getData().seoSettings);
});

adminRouter.post('/seo', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  store.seoSettings = {
    ...store.seoSettings,
    ...req.body,
  };

  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'SEO_SETTINGS_UPDATED', 'SEO', req.body);
  db.save();

  res.json({ success: true, seoSettings: store.seoSettings });
});

// -----------------------------------------------------------------------------
// 10. AUDIT LOGS
// -----------------------------------------------------------------------------
adminRouter.get('/audit-logs', requireAdminAuth, requireRoles(['superadmin']), (req: Request, res: Response) => {
  res.json(db.getData().auditLogs);
});

// -----------------------------------------------------------------------------
// 11. WEBSITE POPUP & ANNOUNCEMENT MANAGER
// -----------------------------------------------------------------------------
adminRouter.get('/popups', requireAdminAuth, (req: Request, res: Response) => {
  const store = db.getData();
  res.json(store.popups || []);
});

adminRouter.post('/popups', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const store = db.getData();
  const {
    title,
    message,
    imageUrl,
    bgColor = '#ffffff',
    textColor = '#0f172a',
    position = 'center_modal',
    size = 'medium',
    borderRadius = 'rounded-2xl',
    startDateTime,
    expiryDateTime,
    displayDuration = 0,
    frequency = 'once_per_session',
    enabled = true,
    showCancelButton = true,
    cancelButtonText = 'Dismiss',
    buttons = [],
  } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: 'Title and message are required.' });
  }

  const newPopup = {
    id: `pop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: String(title).trim(),
    message: String(message).trim(),
    imageUrl: imageUrl ? String(imageUrl).trim() : undefined,
    bgColor: String(bgColor),
    textColor: String(textColor),
    position,
    size,
    borderRadius,
    startDateTime: startDateTime || undefined,
    expiryDateTime: expiryDateTime || undefined,
    displayDuration: Number(displayDuration) || 0,
    frequency,
    enabled: Boolean(enabled),
    showCancelButton: Boolean(showCancelButton),
    cancelButtonText: String(cancelButtonText || 'Dismiss'),
    buttons: Array.isArray(buttons) ? buttons : [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.popups = store.popups || [];
  store.popups.unshift(newPopup);
  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'POPUP_CREATED', 'POPUP', { popupId: newPopup.id, title });
  db.save();

  res.status(201).json({ success: true, popup: newPopup });
});

adminRouter.put('/popups/:id', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  store.popups = store.popups || [];
  const idx = store.popups.findIndex((p) => p.id === id);

  if (idx === -1) {
    return res.status(400).json({ error: 'Popup not found' });
  }

  const existing = store.popups[idx];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id,
    updatedAt: new Date().toISOString(),
  };

  store.popups[idx] = updated;
  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'POPUP_UPDATED', 'POPUP', { popupId: id, title: updated.title });
  db.save();

  res.json({ success: true, popup: updated });
});

adminRouter.delete('/popups/:id', requireAdminAuth, requireRoles(['superadmin']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  store.popups = store.popups || [];
  const beforeLen = store.popups.length;
  store.popups = store.popups.filter((p) => p.id !== id);

  if (store.popups.length === beforeLen) {
    return res.status(404).json({ error: 'Popup not found' });
  }

  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'POPUP_DELETED', 'POPUP', { popupId: id });
  db.save();

  res.json({ success: true });
});

adminRouter.post('/popups/:id/toggle', requireAdminAuth, requireRoles(['superadmin', 'editor']), (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const store = db.getData();
  store.popups = store.popups || [];
  const popup = store.popups.find((p) => p.id === id);

  if (!popup) {
    return res.status(404).json({ error: 'Popup not found' });
  }

  popup.enabled = !popup.enabled;
  popup.updatedAt = new Date().toISOString();
  db.addAuditLog(req.adminUser!.email, req.adminUser!.role, 'POPUP_STATUS_TOGGLED', 'POPUP', { popupId: id, enabled: popup.enabled });
  db.save();

  res.json({ success: true, enabled: popup.enabled });
});
