import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { DEFAULT_11_SUBJECTS } from './data/defaultSubjects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const STORE_PATH = path.resolve(DATA_DIR, 'store.json');
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export type AdminRole = 'superadmin' | 'editor' | 'reviewer' | 'viewer';

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  passwordHash: string;
  isInitialSetupPending: boolean;
  createdAt: string;
  lastLoginAt?: string;
  failedLoginAttempts: number;
  lockoutUntil?: string;
}

export interface AdminSession {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
  ip: string;
  userAgent: string;
}

export interface MaintenanceConfig {
  enabled: boolean;
  title: string;
  message_en: string;
  message_hi: string;
  personal_message_en: string;
  personal_message_hi: string;
  expected_reopening_iso: string;
  timezone: string; // default: 'Asia/Kolkata'
  mini_games?: {
    memory_match: boolean;
    number_puzzle: boolean;
    quick_math: boolean;
    word_scramble: boolean;
  };
  last_updated_at: string;
  last_updated_by: string;
  history: {
    id: string;
    action: 'enabled' | 'disabled' | 'extended' | 'auto_reopened';
    timestamp: string;
    triggered_by: string;
    scheduled_reopening?: string;
    note?: string;
  }[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  resource: string;
  details?: any;
  ip?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'unread' | 'read' | 'replied' | 'spam';
  notes?: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  preferredCategories?: string[];
}

export interface MediaFile {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  category: 'images' | 'documents' | 'exam_bulletins' | 'syllabus' | 'other';
  subjectSlug?: string;
  uploadedAt: string;
  uploadedBy: string;
  url: string;
  description?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  subjectSlug: string;
  topicSlug?: string;
  summary: string;
  content: string; // rich text HTML / markdown
  status: 'draft' | 'under_review' | 'approved' | 'published' | 'archived';
  sourceUrl?: string;
  verifiedBy?: string;
  lastVerifiedDate?: string;
  nextReviewDate?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  revisions: {
    timestamp: string;
    editedBy: string;
    changeNote: string;
    contentSnapshot: string;
  }[];
}

export interface OpportunityItem {
  id: string;
  type: 'job' | 'internship' | 'scholarship' | 'admission' | 'research' | 'fellowship';
  title: string;
  organization: string;
  description: string;
  eligibility: string;
  qualification: string;
  location: string;
  stipendOrSalary?: string;
  openingDate: string;
  deadline: string; // YYYY-MM-DD
  officialNotificationUrl: string;
  applicationUrl: string;
  sourceUrl: string;
  verificationStatus: 'verified' | 'unverified' | 'pending_review';
  publicationStatus: 'published' | 'draft' | 'archived';
  lastVerifiedDate: string;
  nextReviewDate: string;
  verifiedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExaminationConfig {
  code: 'GAT-B' | 'DBT-JRF' | 'GATE-BT' | 'IIT-JAM' | 'CUET-PG' | 'CSIR-NET';
  fullName: string;
  conductingAgency: string;
  officialPortalUrl: string;
  syllabusSummary: string;
  eligibilitySummary: string;
  examPattern: string;
  durationMinutes: number;
  markingScheme: string;
  importantDatesText: string;
  verificationDate: string;
  masteryDestinationUrl: string;
  masteryActive: boolean;
  statusNote: string;
  updatedAt: string;
}

export interface SeoSettings {
  websiteTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  socialLinks: {
    whatsappChannel: string;
    linkedin: string;
    twitter?: string;
    youtube?: string;
  };
  announcementBanner: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
  };
  footerNotice: string;
}

export interface PopupButton {
  id: string;
  label: string;
  url: string;
  color: string;
  style: 'solid' | 'outline' | 'ghost';
  openInNewTab: boolean;
  enabled: boolean;
}

export interface WebsitePopup {
  id: string;
  title: string;
  message: string;
  imageUrl?: string;
  bgColor: string; // e.g. '#ffffff' or dark
  textColor: string; // e.g. '#0f172a'
  position: 'center_modal' | 'toast_bottom_right' | 'toast_bottom_left' | 'top_banner' | 'bottom_banner';
  size: 'small' | 'medium' | 'large' | 'full';
  borderRadius: 'none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl';
  startDateTime?: string;
  expiryDateTime?: string;
  displayDuration: number; // 0 = manual, or seconds 5, 10, 15, 30
  frequency: 'once_per_session' | 'once_per_visitor' | 'every_page';
  enabled: boolean;
  showCancelButton: boolean;
  cancelButtonText?: string;
  buttons: PopupButton[];
  createdAt: string;
  updatedAt: string;
}

export interface TopicItem {
  id: string;
  slug: string;
  title: { en: string; hinglish: string };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTimeMin: number;
  orderIndex: number;
  isPublished: boolean;
  contentEn?: string;
  contentHinglish?: string;
  keyPoints?: string[];
  references?: string[];
}

export interface ChapterItem {
  id: string;
  chapterNumber: number;
  title: { en: string; hinglish: string };
  topics: TopicItem[];
}

export interface UnitItem {
  id: string;
  unitNumber: number;
  title: { en: string; hinglish: string };
  chapters: ChapterItem[];
}

export interface SubjectItem {
  id: string;
  slug: string;
  name: { en: string; hinglish: string };
  description: { en: string; hinglish: string };
  icon: string;
  unitsCount: number;
  topicsCount: number;
  orderIndex: number;
  isPublished: boolean;
  overview: { en: string; hinglish: string };
  learningObjectives: { en: string[]; hinglish: string[] };
  keyFormulas?: { name: string; formula: string; description: { en: string; hinglish: string } }[];
  references: { citation: string; type: string; year?: number }[];
  units: UnitItem[];
  updatedAt?: string;
}

// -----------------------------------------------------------------------------
// AUTONOMOUS AI SYSTEM INTERFACES
// -----------------------------------------------------------------------------

export type AiProviderId = 'gemini' | 'groq' | 'openrouter' | 'ollama_gemma' | 'ollama_qwen';
export type AiOperatingMode = 'research_only' | 'review_mode' | 'controlled_autonomous';

export interface AiProviderConfig {
  enabled: boolean;
  model: string;
  priorityOrder: number;
  lastTestedAt?: string;
  isOperational?: boolean;
  statusNote?: string;
  inCooldownUntil?: number;
  consecutiveErrors?: number;
}

export interface AiConfig {
  operatingMode: AiOperatingMode; // 'research_only' (default) | 'review_mode' | 'controlled_autonomous'
  activeProvider: AiProviderId; // 'gemini' (default)
  providerPriorities: AiProviderId[];
  providerSettings: Record<AiProviderId, AiProviderConfig>;
  monthlyBudgetINR: number; // strictly 0 (Zero Paid Fallback Policy)
  monthlyUsageRequests: number;
  monthlyTokensUsed: number;
  lastUsageResetMonth: string;
  tavilyEnabled: boolean;
  ollamaBaseUrl: string; // default: 'http://localhost:11434'
  autoScheduleEnabled: boolean;
  dailyCheckHourUtc: number; // default: 3 (8:30 AM IST)
  maxItemsPerResearchRun: number; // default: 8
}

export type VerificationStatus =
  | 'Verified Official'
  | 'Official Source Found – Further Review Needed'
  | 'Unverified'
  | 'Conflicting Information'
  | 'Expired'
  | 'Withdrawn'
  | 'Source Unavailable';

export interface ResearchRecord {
  id: string;
  title: string;
  category: 'job' | 'internship' | 'scholarship' | 'admission' | 'research' | 'fellowship' | 'conference' | 'exam' | 'news' | 'scientific';
  institution: string;
  originalSourceUrl: string;
  notificationUrlOrPdf: string;
  publicationDate?: string;
  applicationOpeningDate?: string;
  applicationDeadline?: string; // YYYY-MM-DD
  eligibility?: string;
  stipendOrFunding?: string;
  location?: string;
  duration?: string;
  officialApplicationLink?: string;
  lastCheckedAt: string;
  lastUpdatedAt: string;
  verificationStatus: VerificationStatus;
  evidenceNotes: string;
  sourceMetadata: Record<string, any>;
  discoveredByProvider: string;
  isPublishedToLive: boolean;
  liveEntityId?: string;
}

export interface ExamChangeProposal {
  id: string;
  examCode: 'GAT-B' | 'DBT-JRF' | 'GATE-BT' | 'IIT-JAM' | 'CUET-PG' | 'CSIR-NET';
  examName: string;
  field: string;
  currentValue: string;
  proposedValue: string;
  officialSourceUrl: string;
  evidence: string;
  status: 'pending_review' | 'approved' | 'rejected';
  detectedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ContentProposal {
  id: string;
  targetSection: 'opportunities' | 'articles' | 'exams' | 'news' | 'lab_zone' | 'subjects';
  title: string;
  summary: string;
  currentContent?: string;
  proposedContent: string;
  diffSummary: string;
  sourceUrl: string;
  verificationStatus: VerificationStatus;
  status: 'draft' | 'pending_review' | 'approved_and_published' | 'rejected' | 'rolled_back';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  publishedBy?: string;
  previousSnapshot?: string;
}

export interface WeeklyDispatchDraft {
  id: string;
  weekNumber: number;
  year: number;
  title: string;
  publishedAt?: string;
  status: 'draft' | 'ready_for_review' | 'published';
  summaryText: string;
  highlights: {
    jobs: { id: string; title: string; organization: string; deadline: string; url: string }[];
    internships: { id: string; title: string; organization: string; deadline: string; url: string }[];
    fellowships: { id: string; title: string; organization: string; deadline: string; url: string }[];
    exams: { code: string; title: string; update: string; url: string }[];
    news: { headline: string; summary: string; source: string }[];
  };
  fullDraftHtml: string;
  createdAt: string;
  updatedAt: string;
}

export interface AiActivityLog {
  id: string;
  timestamp: string;
  providerUsed: string;
  action: string;
  taskType: string;
  sourcesChecked: string[];
  recordsFound: number;
  status: 'success' | 'warning' | 'failed' | 'paused';
  details?: any;
  costINR: number; // Always 0
}

export interface TaskCheckpoint {
  id: string;
  taskType: string;
  lastStep: string;
  savedAt: string;
  state: any;
  status: 'idle' | 'running' | 'paused' | 'failed' | 'completed';
  error?: string;
}

export interface DataStore {
  adminUsers: AdminUser[];
  adminSessions: AdminSession[];
  maintenance: MaintenanceConfig;
  auditLogs: AuditLog[];
  contactSubmissions: ContactSubmission[];
  newsletterSubscribers: NewsletterSubscriber[];
  mediaFiles: MediaFile[];
  articles: ArticleItem[];
  opportunities: OpportunityItem[];
  examinations: ExaminationConfig[];
  seoSettings: SeoSettings;
  popups: WebsitePopup[];
  subjects: SubjectItem[];
  aiConfig: AiConfig;
  aiResearchQueue: ResearchRecord[];
  aiExamProposals: ExamChangeProposal[];
  aiContentProposals: ContentProposal[];
  aiWeeklyDispatches: WeeklyDispatchDraft[];
  aiActivityLogs: AiActivityLog[];
  aiTaskCheckpoints: TaskCheckpoint[];
}

// Initial Super Admin credentials
const INITIAL_SUPERADMIN_EMAIL = 'charanjaydeep712@gmail.com';

function createDefaultStore(): DataStore {
  // Default reopening set to 2 hours from current time in Asia/Kolkata
  const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

  // If ADMIN_INITIAL_PASSWORD env var is defined, use it; otherwise require setup
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const initialPasswordHash = initialPassword
    ? bcrypt.hashSync(initialPassword, 10)
    : '';

  return {
    adminUsers: [
      {
        id: 'usr-superadmin-01',
        email: INITIAL_SUPERADMIN_EMAIL,
        fullName: 'Super Administrator',
        role: 'superadmin',
        passwordHash: initialPasswordHash,
        isInitialSetupPending: !initialPassword,
        createdAt: new Date().toISOString(),
        failedLoginAttempts: 0,
      },
    ],
    adminSessions: [],
    maintenance: {
      enabled: false,
      title: "We'll Be Back Soon!",
      message_en: "BioScience Hub is temporarily under scheduled system maintenance and database optimization to provide an enhanced academic learning experience.",
      message_hi: "BioScience Hub पर आपके अध्ययन अनुभव को और बेहतर बनाने के लिए निर्धारित सिस्टम रखरखाव और डेटाबेस अनुकूलन का कार्य प्रगति पर है।",
      personal_message_en: "⏳ While BioScience Hub is getting ready to welcome you back, take this opportunity to spend some precious time with your family and loved ones. ❤️👨👩👧👦\n\nMake beautiful memories, share a smile, and enjoy the little moments of life. 🌸✨\n\nWe'll be back soon with a better learning experience for you! 🚀",
      personal_message_hi: "⏳ जब तक BioScience Hub दोबारा शुरू होता है, तब तक अपना यह कीमती समय अपने परिवार और प्रियजनों के साथ बिताइए। ❤️👨👩👧👦\n\nअपनों के साथ कुछ खूबसूरत पल बिताइए, खुश रहिए और मुस्कुराते रहिए। 🌸✨\n\nहम जल्द ही आपके लिए एक बेहतर Learning Experience के साथ वापस आएंगे! 🚀",
      expected_reopening_iso: twoHoursLater,
      timezone: 'Asia/Kolkata',
      mini_games: {
        memory_match: true,
        number_puzzle: true,
        quick_math: true,
        word_scramble: true,
      },
      last_updated_at: new Date().toISOString(),
      last_updated_by: 'system',
      history: [],
    },
    popups: [],
    subjects: DEFAULT_11_SUBJECTS,
    auditLogs: [
      {
        id: 'log-init-01',
        timestamp: new Date().toISOString(),
        actorEmail: 'system',
        actorRole: 'system',
        action: 'SYSTEM_INITIALIZED',
        resource: 'DATABASE',
        details: { message: 'BioScience Hub central database initialized.' },
      },
    ],
    contactSubmissions: [
      {
        id: 'cnt-01',
        name: 'Prof. Ananya Sharma',
        email: 'ananya.s@biotech-univ.ac.in',
        subject: 'Curriculum mapping for Molecular Genetics unit',
        message: 'The transcriptional regulation diagrams are extraordinarily clear. We have recommended BioScience Hub to our M.Sc. Biotechnology first semester cohort.',
        submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        status: 'read',
      },
    ],
    newsletterSubscribers: [
      {
        id: 'sub-01',
        email: 'scholar.biotech@research.org',
        subscribedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        preferredCategories: ['Competitive Exams', 'Research Fellowships', 'Lab Protocols'],
      },
    ],
    mediaFiles: [],
    articles: [
      {
        id: 'art-01',
        slug: 'crispr-cas9-mechanisms-applications',
        title: 'CRISPR-Cas9 Molecular Precision: Mechanistic Insight & RNP Delivery',
        subjectSlug: 'genetic-engineering',
        topicSlug: 'crispr-cas9',
        summary: 'In-depth molecular analysis of Cas9 endonuclease ribonucleoprotein complex, PAM recognition (5\'-NGG-3\'), and double-strand break repair via NHEJ versus HDR.',
        content: `<h2>Molecular Structure of Cas9 Endonuclease</h2><p>Streptococcus pyogenes Cas9 (SpCas9) is a multi-domain endonuclease that associates with a chimeric single guide RNA (sgRNA). Cas9 comprises two structural lobes: the Recognition (REC) lobe and the Nuclease (NUC) lobe.</p><h3>PAM Recognition & Strand Cleavage</h3><p>Target search involves scanning genomic DNA for the 5'-NGG-3' protospacer adjacent motif (PAM) by the PAM-interacting domain (PID). Strand separation is initiated, followed by RNA-DNA hybridization.</p>`,
        status: 'published',
        sourceUrl: 'https://doi.org/10.1126/science.1225829',
        verifiedBy: 'charanjaydeep712@gmail.com',
        lastVerifiedDate: '2026-10-15',
        nextReviewDate: '2027-04-15',
        author: 'BioScience Editorial Board',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        revisions: [],
      },
    ],
    opportunities: [
      {
        id: 'opp-01',
        type: 'job',
        title: 'Junior Research Fellow (JRF) - Structural Biology & Cryo-EM',
        organization: 'Regional Centre for Biotechnology (RCB), Faridabad',
        description: 'DST-SERB sponsored project investigating viral envelope glycoproteins using single-particle cryo-electron microscopy and biochemical reconstitution.',
        eligibility: 'M.Sc. in Biotechnology / Biochemistry / Life Sciences with CSIR-UGC NET (JRF/LS) or valid GATE score.',
        qualification: 'Postgraduate degree in Life Sciences with national entrance qualification.',
        location: 'Faridabad, Haryana (NCR)',
        stipendOrSalary: '₹37,000 + 24% HRA per month (DST Guidelines)',
        openingDate: '2026-10-10',
        deadline: '2026-11-25',
        officialNotificationUrl: 'https://rcb.res.in/index.php?param=newdetails/712',
        applicationUrl: 'https://rcb.res.in/index.php?param=apply',
        sourceUrl: 'https://rcb.res.in',
        verificationStatus: 'verified',
        publicationStatus: 'published',
        lastVerifiedDate: '2026-11-01',
        nextReviewDate: '2026-11-20',
        verifiedBy: 'charanjaydeep712@gmail.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'opp-02',
        type: 'internship',
        title: 'Science Academies Summer Research Fellowship Programme (SRFP)',
        organization: 'Indian Academy of Sciences, Bengaluru',
        description: 'Two-month prestigious summer research fellowship under fellowship guides across national institutions (IISc, TIFR, IITs, CSIR institutes).',
        eligibility: 'Undergraduate and postgraduate biotechnology and life sciences students with minimum 65% aggregate score.',
        qualification: 'B.Sc. (2nd/3rd year), M.Sc. (1st year), or B.Tech (3rd year)',
        location: 'Pan-India participating research institutes',
        stipendOrSalary: 'Monthly fellowship ₹12,000 + round-trip travel allowance',
        openingDate: '2026-10-01',
        deadline: '2026-11-15',
        officialNotificationUrl: 'https://webjapps.ias.ac.in/',
        applicationUrl: 'https://webjapps.ias.ac.in/',
        sourceUrl: 'https://webjapps.ias.ac.in/',
        verificationStatus: 'verified',
        publicationStatus: 'published',
        lastVerifiedDate: '2026-11-01',
        nextReviewDate: '2026-11-12',
        verifiedBy: 'charanjaydeep712@gmail.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'opp-03',
        type: 'fellowship',
        title: 'DBT-Junior Research Fellowship (DBT-JRF / BET)',
        organization: 'Department of Biotechnology (DBT), Govt. of India',
        description: 'National fellowship award for doctoral research across universities and national laboratories in biotechnology and allied disciplines.',
        eligibility: 'M.Sc. / M.Tech in Biotechnology or Life Sciences with minimum 60% marks (55% for SC/ST/PwD).',
        qualification: 'Postgraduate qualification in Biotechnology / Life Sciences',
        location: 'Pan-India DBT recognized institutions',
        stipendOrSalary: '₹37,000/month JRF + contingency grant (Category I)',
        openingDate: '2026-02-15',
        deadline: '2026-03-20', // past date to verify auto-expiry detection
        officialNotificationUrl: 'https://dbt.nta.ac.in',
        applicationUrl: 'https://dbt.nta.ac.in',
        sourceUrl: 'https://dbt.nta.ac.in',
        verificationStatus: 'verified',
        publicationStatus: 'published',
        lastVerifiedDate: '2026-10-25',
        nextReviewDate: '2026-12-01',
        verifiedBy: 'charanjaydeep712@gmail.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ],
    examinations: [
      {
        code: 'GAT-B',
        fullName: 'Graduate Aptitude Test - Biotechnology',
        conductingAgency: 'National Testing Agency (NTA) on behalf of Regional Centre for Biotechnology (RCB)',
        officialPortalUrl: 'https://dbt.nta.ac.in',
        syllabusSummary: 'Section A: 10+2 level Physics, Chemistry, Mathematics, and Biology. Section B: Graduate level Biotechnology, Life Sciences, Genetics, Microbiology, and Bioinformatics.',
        eligibilitySummary: 'Bachelor degree in Biotechnology or allied biological disciplines with minimum 60% aggregate (55% for reserved categories).',
        examPattern: 'Computer Based Test (CBT), 180 Minutes. Section A: 60 compulsory questions. Section B: 100 questions (candidate attempts any 60).',
        durationMinutes: 180,
        markingScheme: 'Section A: +1, -0.5. Section B: +3, -1.',
        importantDatesText: '2026 cycle concluded (Exam held 17 May 2026). Official 2027 session bulletin expected early 2027.',
        verificationDate: '2026-11-01',
        masteryDestinationUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/courses/gat-b',
        masteryActive: true,
        statusNote: 'Admissions for 2026 participating institutions concluded. Official 2027 notification awaited.',
        updatedAt: new Date().toISOString(),
      },
      {
        code: 'DBT-JRF',
        fullName: 'Biotechnology Eligibility Test (BET) / DBT-JRF',
        conductingAgency: 'Regional Centre for Biotechnology (RCB) / NTA',
        officialPortalUrl: 'https://dbt.nta.ac.in',
        syllabusSummary: 'Section A: General Aptitude & General Biotechnology. Section B: Specialized subjects in Agricultural, Animal, Medical, Environmental, and Industrial Biotechnology.',
        eligibilitySummary: 'M.Sc. / M.Tech / M.V.Sc. in Biotechnology or allied subjects with 60% marks. Age limit 28 years (relaxation as per GOI rules).',
        examPattern: 'CBT, 180 Minutes. Section A: 50 compulsory questions. Section B: 150 questions (attempt 50). Total 100 questions.',
        durationMinutes: 180,
        markingScheme: '+3 marks for correct, -1 mark for incorrect.',
        importantDatesText: 'Annual examination cycle. 2027 notification scheduled for announcement by NTA/DBT.',
        verificationDate: '2026-11-01',
        masteryDestinationUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
        masteryActive: true,
        statusNote: 'Category-I (top 275) awarded DBT-JRF fellowship. Category-II eligible for project employment.',
        updatedAt: new Date().toISOString(),
      },
      {
        code: 'GATE-BT',
        fullName: 'Graduate Aptitude Test in Engineering - Biotechnology',
        conductingAgency: 'Indian Institutes of Technology (IITs) / IISc',
        officialPortalUrl: 'https://gate2026.iitr.ac.in',
        syllabusSummary: 'General Aptitude, Engineering Mathematics, Microbiology, Biochemistry, Molecular Biology & Genetics, Bioprocess Engineering, Plant & Animal Biotech, Recombinant DNA, Computational Biology.',
        eligibilitySummary: 'Candidates in 3rd/final year or completed Bachelor degree in Engineering / Technology or M.Sc. in Science subjects.',
        examPattern: 'CBT, 180 Minutes, 65 questions (10 General Aptitude + 55 Subject specific). Combination of MCQs, MSQs, and NATs.',
        durationMinutes: 180,
        markingScheme: '1-mark and 2-mark questions. MCQs have negative marking (1/3rd or 2/3rd). MSQs and NATs have ZERO negative marking.',
        importantDatesText: 'Annual national examination held in February.',
        verificationDate: '2026-11-01',
        masteryDestinationUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
        masteryActive: true,
        statusNote: 'Score card valid for 3 years for M.Tech admissions and PSU recruitment.',
        updatedAt: new Date().toISOString(),
      },
      {
        code: 'IIT-JAM',
        fullName: 'Joint Admission Test for Masters - Biotechnology (BT)',
        conductingAgency: 'Organizing IIT (annual rotation)',
        officialPortalUrl: 'https://jam2026.iitd.ac.in',
        syllabusSummary: 'Biology (44%), Chemistry (20%), Mathematics (18%), Physics (18%) at 10+2 and undergraduate level.',
        eligibilitySummary: 'Undergraduate degree with no minimum aggregate mark requirement (only pass required per revised IIT JAM norms).',
        examPattern: 'CBT, 180 Minutes, 60 questions divided into Section A (MCQs), Section B (MSQs), Section C (NATs).',
        durationMinutes: 180,
        markingScheme: 'Section A: Negative marking. Section B & C: No negative marking.',
        importantDatesText: 'Annual exam conducted in February across Indian centers.',
        verificationDate: '2026-11-01',
        masteryDestinationUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
        masteryActive: true,
        statusNote: 'Admission into M.Sc., Joint M.Sc.-Ph.D. at IITs and Integrated Ph.D. at IISc.',
        updatedAt: new Date().toISOString(),
      },
      {
        code: 'CUET-PG',
        fullName: 'Common University Entrance Test (Postgraduate) - Life Sciences (SCQP17)',
        conductingAgency: 'National Testing Agency (NTA)',
        officialPortalUrl: 'https://pgcuet.samarth.ac.in',
        syllabusSummary: 'Microbiology, Biochemistry, Cell Biology, Genetics, Molecular Biology, Plant Physiology, Animal Physiology, Ecology, Evolution, Techniques in Biology.',
        eligibilitySummary: 'Bachelor degree in Science with biological subjects from a recognized university.',
        examPattern: 'CBT, 105 Minutes, 75 domain-specific questions (General Part A removed from 2024 onwards).',
        durationMinutes: 105,
        markingScheme: '+4 for correct, -1 for incorrect.',
        importantDatesText: 'Conducted annually in March for central and participating state universities.',
        verificationDate: '2026-11-01',
        masteryDestinationUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
        masteryActive: true,
        statusNote: 'Single entrance gateway for JNU, BHU, DU, Hyd University M.Sc. Life Sciences / Biotechnology programs.',
        updatedAt: new Date().toISOString(),
      },
      {
        code: 'CSIR-NET',
        fullName: 'Joint CSIR-UGC NET for JRF and Lectureship - Life Sciences',
        conductingAgency: 'National Testing Agency (NTA) on behalf of CSIR',
        officialPortalUrl: 'https://csirnet.nta.ac.in',
        syllabusSummary: '13 Comprehensive Units: Molecules, Cellular Organization, Fundamental Processes, Cell Communication, Developmental Biology, System Physiology (Plant/Animal), Inheritance Biology, Diversity of Life, Ecological Principles, Evolution, Applied Biology, Methods in Biology.',
        eligibilitySummary: 'M.Sc. or equivalent degree in Life Sciences with 55% marks (50% for reserved categories).',
        examPattern: 'CBT, 180 Minutes. Part A (General Aptitude, 20 Qs, attempt 15), Part B (Core Concepts, 50 Qs, attempt 35), Part C (Analytical Research, 75 Qs, attempt 25).',
        durationMinutes: 180,
        markingScheme: 'Part A & B: +2, -0.5. Part C: +4, -1.',
        importantDatesText: 'Conducted twice annually (June and December cycles).',
        verificationDate: '2026-11-01',
        masteryDestinationUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
        masteryActive: true,
        statusNote: 'Qualifies candidates for CSIR/UGC Junior Research Fellowship and Assistant Professor eligibility across India.',
        updatedAt: new Date().toISOString(),
      },
    ],
    seoSettings: {
      websiteTitle: 'BioScience Hub — Learn Biotechnology, Master Concepts, Prepare for Research',
      metaDescription: 'Comprehensive bilingual biotechnology encyclopedia, competitive exam preparation portal (GAT-B, DBT-JRF, GATE BT, IIT JAM, CUET-PG, CSIR-NET), and interactive laboratory knowledge platform.',
      ogTitle: 'BioScience Hub — Learn Biotechnology, Master Concepts, Prepare for Research',
      ogDescription: 'Verified academic literature, biotechnology career vacancies, lab instrumentation, and 6 national competitive examination portals.',
      socialLinks: {
        whatsappChannel: 'https://whatsapp.com/channel/0029VbBeWMxA89MgAovtkf2j',
        linkedin: 'https://www.linkedin.com/company/https-bioscienceknowledge-hub.vercel.app-/',
      },
      announcementBanner: {
        enabled: true,
        text: 'Ecosystem Announcement: BioScience Hub is seamlessly integrated with BioScience Mastery for targeted national entrance examination preparation.',
        linkUrl: 'https://bioscience-mastery-p-vdf1.bolt.host/en/exams',
      },
      footerNotice: 'Public education portal. Grounded in official gazettes, NTA/DBT bulletins, and peer-reviewed reference texts (Lehninger, Alberts, Lodish, Brock).',
    },
    aiConfig: {
      operatingMode: 'research_only', // Default to research-only mode as required
      activeProvider: 'gemini',
      providerPriorities: ['gemini', 'groq', 'openrouter', 'ollama_gemma', 'ollama_qwen'],
      providerSettings: {
        gemini: {
          enabled: true,
          model: 'gemini-3.8-flash',
          priorityOrder: 1,
          statusNote: 'Primary cloud AI (Google GenAI Free Tier)',
        },
        groq: {
          enabled: true,
          model: 'llama-3.3-70b-versatile',
          priorityOrder: 2,
          statusNote: 'Secondary fast inference provider',
        },
        openrouter: {
          enabled: true,
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          priorityOrder: 3,
          statusNote: 'Third provider, strictly free models only',
        },
        ollama_gemma: {
          enabled: true,
          model: 'gemma3:4b',
          priorityOrder: 4,
          statusNote: 'Local offline LLM (Google Gemma 3 4B)',
        },
        ollama_qwen: {
          enabled: true,
          model: 'qwen2.5:1.5b',
          priorityOrder: 5,
          statusNote: 'Local offline lightweight LLM (Qwen 2.5 1.5B)',
        },
      },
      monthlyBudgetINR: 0, // Enforce strictly ₹0 budget, zero paid fallback
      monthlyUsageRequests: 0,
      monthlyTokensUsed: 0,
      lastUsageResetMonth: new Date().toISOString().substring(0, 7),
      tavilyEnabled: false,
      ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      autoScheduleEnabled: true,
      dailyCheckHourUtc: 3,
      maxItemsPerResearchRun: 8,
    },
    aiResearchQueue: [],
    aiExamProposals: [],
    aiContentProposals: [],
    aiWeeklyDispatches: [],
    aiActivityLogs: [
      {
        id: 'log-ai-init',
        timestamp: new Date().toISOString(),
        providerUsed: 'system',
        action: 'AI_SYSTEM_INITIALIZED',
        taskType: 'INIT',
        sourcesChecked: ['DBT', 'DST', 'CSIR', 'ICMR', 'NTA', 'IITs'],
        recordsFound: 0,
        status: 'success',
        details: { message: 'Autonomous AI Engine initialized in Research Mode with ₹0 budget policy.' },
        costINR: 0,
      },
    ],
    aiTaskCheckpoints: [],
  };
}

class Database {
  private data: DataStore;
  private writeTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.load();
    this.resetMonthlyAiUsageIfNewMonth();
  }

  private load(): DataStore {
    try {
      if (fs.existsSync(STORE_PATH)) {
        const raw = fs.readFileSync(STORE_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        // Ensure default properties exist in loaded store
        const defaults = createDefaultStore();
        return {
          ...defaults,
          ...parsed,
          maintenance: {
            ...defaults.maintenance,
            ...(parsed.maintenance || {}),
            mini_games: {
              memory_match: true,
              number_puzzle: true,
              quick_math: true,
              word_scramble: true,
              ...((parsed.maintenance && parsed.maintenance.mini_games) || {}),
            },
          },
          popups: Array.isArray(parsed.popups) ? parsed.popups : [],
          subjects: Array.isArray(parsed.subjects) && parsed.subjects.length > 0 ? parsed.subjects : defaults.subjects,
          seoSettings: {
            ...defaults.seoSettings,
            ...(parsed.seoSettings || {}),
          },
          aiConfig: {
            ...defaults.aiConfig,
            ...(parsed.aiConfig || {}),
            providerSettings: {
              ...defaults.aiConfig.providerSettings,
              ...((parsed.aiConfig && parsed.aiConfig.providerSettings) || {}),
            },
          },
          aiResearchQueue: Array.isArray(parsed.aiResearchQueue) ? parsed.aiResearchQueue : [],
          aiExamProposals: Array.isArray(parsed.aiExamProposals) ? parsed.aiExamProposals : [],
          aiContentProposals: Array.isArray(parsed.aiContentProposals) ? parsed.aiContentProposals : [],
          aiWeeklyDispatches: Array.isArray(parsed.aiWeeklyDispatches) ? parsed.aiWeeklyDispatches : [],
          aiActivityLogs: Array.isArray(parsed.aiActivityLogs) ? parsed.aiActivityLogs : defaults.aiActivityLogs,
          aiTaskCheckpoints: Array.isArray(parsed.aiTaskCheckpoints) ? parsed.aiTaskCheckpoints : [],
        };
      }
    } catch (e) {
      console.error('Error loading database store, creating default:', e);
    }
    const def = createDefaultStore();
    this.saveImmediate(def);
    return def;
  }

  private saveImmediate(dataToSave: DataStore): void {
    try {
      fs.writeFileSync(STORE_PATH, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing database store:', e);
    }
  }

  public save(): void {
    if (this.writeTimer) clearTimeout(this.writeTimer);
    this.writeTimer = setTimeout(() => {
      this.saveImmediate(this.data);
    }, 100);
  }

  public getData(): DataStore {
    return this.data;
  }

  // Auto-expire maintenance mode if reopening time passed
  public checkAndAutoExpireMaintenance(): boolean {
    const m = this.data.maintenance;
    if (m.enabled && m.expected_reopening_iso) {
      const reopenTime = new Date(m.expected_reopening_iso).getTime();
      const now = Date.now();
      if (now >= reopenTime) {
        m.enabled = false;
        m.last_updated_at = new Date().toISOString();
        m.last_updated_by = 'system_scheduled_auto_reopen';
        m.history.unshift({
          id: 'hist-' + Date.now(),
          action: 'auto_reopened',
          timestamp: new Date().toISOString(),
          triggered_by: 'system_auto_timer',
          note: `Maintenance mode automatically turned OFF as scheduled reopening time (${m.expected_reopening_iso}) was reached.`,
        });

        this.addAuditLog(
          'system_auto_timer',
          'system',
          'MAINTENANCE_AUTO_REOPEN',
          'MAINTENANCE',
          { message: 'Maintenance mode automatically expired and public website restored.' }
        );

        this.save();
        return true;
      }
    }
    return false;
  }

  // Audit logging helper
  public addAuditLog(
    actorEmail: string,
    actorRole: string,
    action: string,
    resource: string,
    details?: any,
    ip?: string
  ): void {
    const entry: AuditLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      actorEmail,
      actorRole,
      action,
      resource,
      details,
      ip,
    };
    this.data.auditLogs.unshift(entry);
    // Keep last 1000 logs
    if (this.data.auditLogs.length > 1000) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 1000);
    }
    this.save();
  }

  // AI Activity Logging Helper
  public addAiActivityLog(
    providerUsed: string,
    action: string,
    taskType: string,
    sourcesChecked: string[] = [],
    recordsFound: number = 0,
    status: 'success' | 'warning' | 'failed' | 'paused' = 'success',
    details?: any
  ): void {
    const log: AiActivityLog = {
      id: 'ai-log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      providerUsed,
      action,
      taskType,
      sourcesChecked,
      recordsFound,
      status,
      details,
      costINR: 0, // Zero paid fallback policy enforced
    };
    this.data.aiActivityLogs.unshift(log);
    if (this.data.aiActivityLogs.length > 500) {
      this.data.aiActivityLogs = this.data.aiActivityLogs.slice(0, 500);
    }
    this.save();
  }

  // Monthly usage tracker (resets on 1st of every month)
  public resetMonthlyAiUsageIfNewMonth(): void {
    const currentMonth = new Date().toISOString().substring(0, 7);
    if (this.data.aiConfig.lastUsageResetMonth !== currentMonth) {
      this.data.aiConfig.monthlyUsageRequests = 0;
      this.data.aiConfig.monthlyTokensUsed = 0;
      this.data.aiConfig.lastUsageResetMonth = currentMonth;
      this.save();
    }
  }

  public incrementAiUsage(tokens: number = 0): void {
    this.resetMonthlyAiUsageIfNewMonth();
    this.data.aiConfig.monthlyUsageRequests += 1;
    this.data.aiConfig.monthlyTokensUsed += tokens;
    this.save();
  }
}

export const db = new Database();

// Start a periodic 10-second check for automatic reopening
setInterval(() => {
  db.checkAndAutoExpireMaintenance();
}, 10000);
