import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

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
      last_updated_at: new Date().toISOString(),
      last_updated_by: 'system',
      history: [],
    },
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
        masteryDestinationUrl: 'https://biosciencemasterycom.vercel.app/en/courses/gat-b',
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
        masteryDestinationUrl: 'https://biosciencemasterycom.vercel.app/en/exams',
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
        masteryDestinationUrl: 'https://biosciencemasterycom.vercel.app/en/exams',
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
        masteryDestinationUrl: 'https://biosciencemasterycom.vercel.app/en/exams',
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
        masteryDestinationUrl: 'https://biosciencemasterycom.vercel.app/en/exams',
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
        masteryDestinationUrl: 'https://biosciencemasterycom.vercel.app/en/exams',
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
        linkUrl: 'https://biosciencemasterycom.vercel.app/en/exams',
      },
      footerNotice: 'Public education portal. Grounded in official gazettes, NTA/DBT bulletins, and peer-reviewed reference texts (Lehninger, Alberts, Lodish, Brock).',
    },
  };
}

class Database {
  private data: DataStore;
  private writeTimer: NodeJS.Timeout | null = null;

  constructor() {
    this.data = this.load();
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
          },
          seoSettings: {
            ...defaults.seoSettings,
            ...(parsed.seoSettings || {}),
          },
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
}

export const db = new Database();

// Start a periodic 10-second check for automatic reopening
setInterval(() => {
  db.checkAndAutoExpireMaintenance();
}, 10000);
