export type Language = 'en' | 'hinglish';

export interface Subject {
  id: string;
  slug: string;
  name: {
    en: string;
    hinglish: string;
  };
  description: {
    en: string;
    hinglish: string;
  };
  icon: string;
  unitsCount: number;
  topicsCount: number;
  orderIndex: number;
  overview: {
    en: string;
    hinglish: string;
  };
  learningObjectives: {
    en: string[];
    hinglish: string[];
  };
  keyFormulas?: {
    name: string;
    formula: string;
    description: { en: string; hinglish: string };
  }[];
  references: {
    citation: string;
    type: 'Book' | 'Journal' | 'Standard Reference';
    year?: number;
  }[];
}

export interface Unit {
  id: string;
  subjectSlug: string;
  unitNumber: number;
  title: {
    en: string;
    hinglish: string;
  };
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  chapterNumber: number;
  title: {
    en: string;
    hinglish: string;
  };
  topics: TopicOverview[];
}

export interface TopicOverview {
  slug: string;
  title: {
    en: string;
    hinglish: string;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTimeMin: number;
  hasHinglish: boolean;
}

export interface TopicDetail {
  slug: string;
  subjectSlug: string;
  title: {
    en: string;
    hinglish: string;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTimeMin: number;
  definitions: {
    term: string;
    en: string;
    hinglish: string;
  }[];
  content: {
    en: {
      introduction: string;
      mechanism: string[];
      pathwaySteps?: string[];
      keyPoints: string[];
      applications: string[];
      revisionNotes: string[];
    };
    hinglish: {
      introduction: string;
      mechanism: string[];
      pathwaySteps?: string[];
      keyPoints: string[];
      applications: string[];
      revisionNotes: string[];
    };
  };
  diagram?: {
    title: string;
    description: string;
    svgType: 'dna_replication' | 'pcr_cycle' | 'cell_membrane' | 'protein_structure' | 'bioreactor' | 'plasmid_vector';
  };
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  references: {
    citation: string;
    doiOrLink?: string;
  }[];
}

export interface Examination {
  code: 'GAT-B' | 'DBT-JRF' | 'GATE-BT' | 'IIT-JAM' | 'CUET-PG' | 'CSIR-NET';
  fullName: {
    en: string;
    hinglish: string;
  };
  conductingBody: string;
  officialWebsite: string;
  lastVerifiedDate: string;
  overview: {
    en: string;
    hinglish: string;
  };
  eligibility: {
    degree: string[];
    minimumMarks: string;
    ageLimit: string;
  };
  examPattern: {
    mode: string;
    durationMinutes: number;
    totalMarks: number;
    totalQuestions: number;
    markingScheme: string;
    sections: {
      name: string;
      questions: string;
      marks: string;
      syllabusScope: string;
    }[];
  };
  coreSyllabusTopics: string[];
  preparationStrategy: {
    en: string[];
    hinglish: string[];
  };
  cycleYear?: string;
  applicationWindow?: string;
  examDate?: string;
  statusNote?: string;
  officialBulletinUrl?: string;
}

export interface LabInstrument {
  slug: string;
  name: {
    en: string;
    hinglish: string;
  };
  category: 'Spectroscopy' | 'Separation & Centrifugation' | 'Molecular & PCR' | 'Sterilization & Culture' | 'Microscopy & Imaging' | 'Bioprocess & Advanced';
  principle: {
    en: string;
    hinglish: string;
  };
  components: string[];
  workingMechanism: {
    en: string[];
    hinglish: string[];
  };
  applications: string[];
  advantages: string[];
  limitations: string[];
  precautions: string[];
  references: string[];
}

export interface LabProtocol {
  slug: string;
  title: {
    en: string;
    hinglish: string;
  };
  category: 'Molecular Biology' | 'Biochemistry' | 'Microbiology' | 'Immunology';
  objective: {
    en: string;
    hinglish: string;
  };
  principle: {
    en: string;
    hinglish: string;
  };
  materials: string[];
  reagents: string[];
  procedure: {
    step: number;
    instruction: {
      en: string;
      hinglish: string;
    };
    criticalNote?: string;
  }[];
  calculations?: string;
  troubleshooting: {
    problem: string;
    probableCause: string;
    solution: string;
  }[];
  safetyPrecautions: string[];
  references: string[];
}

// -----------------------------------------------------------------------------
// Expanded Opportunity & Community Interfaces
// -----------------------------------------------------------------------------

export type ApplicationStatus = 'OPEN' | 'UPCOMING' | 'CLOSED' | 'EXPIRED' | 'UNVERIFIED' | 'ARCHIVED';

export type VerificationStatus = 'VERIFIED_OFFICIAL' | 'VERIFIED_SECONDARY' | 'UNVERIFIED' | 'UNDER_REVIEW';

export interface BiotechJob {
  id: string;
  title: string;
  slug: string;
  organization: string;
  category: 'Government' | 'Industry' | 'Research Position' | 'JRF/SRF' | 'Freshers' | 'Bioinformatics' | 'QC/QA';
  qualification: string;
  experienceLevel: 'Entry Level / Freshers' | '1-3 Years' | '3-5 Years' | 'Senior / 5+ Years';
  location: string;
  eligibility: string;
  salaryOrStipend: string;
  applicationOpeningDate: string;
  applicationDeadline: string; // YYYY-MM-DD or 'Rolling'
  officialNotificationUrl: string;
  officialApplicationUrl: string;
  sourceUrl: string;
  sourceCitation: string;
  sourcePublicationDate: string;
  lastVerifiedDate: string;
  applicationStatus: ApplicationStatus;
  verificationStatus: VerificationStatus;
  archivedStatus: boolean;
  jobDescription: string;
  // Backward compatibility aliases
  officialLink?: string;
  publishedDate?: string;
  isVerified?: boolean;
  isActive?: boolean;
}

export interface InternshipOpportunity {
  id: string;
  title: string;
  slug: string;
  institution: string;
  internshipType: 'IIT/IISc/IISER' | 'Government National' | 'University Research' | 'Biotech Industry';
  qualification: string;
  location: string;
  duration: string;
  stipendAmount: string;
  eligibility: string;
  applicationOpeningDate: string;
  applicationDeadline: string;
  officialNotificationUrl: string;
  officialApplicationUrl: string;
  sourceUrl: string;
  sourceCitation: string;
  sourcePublicationDate: string;
  lastVerifiedDate: string;
  applicationStatus: ApplicationStatus;
  verificationStatus: VerificationStatus;
  archivedStatus: boolean;
  overview: string;
  // Backward compatibility aliases
  deadline?: string;
  officialLink?: string;
  isVerified?: boolean;
  isActive?: boolean;
}

export interface ScholarshipAdmission {
  id: string;
  title: string;
  slug: string;
  entityType: 'Scholarship' | 'Ph.D. Admission' | 'Master Admission' | 'Postdoc Fellowship';
  issuingBody: string;
  fundingAmount: string;
  eligibility: string;
  qualification: string;
  applicationOpeningDate: string;
  applicationDeadline: string;
  officialNotificationUrl: string;
  officialApplicationUrl: string;
  sourceUrl: string;
  sourceCitation: string;
  lastVerifiedDate: string;
  applicationStatus: ApplicationStatus;
  verificationStatus: VerificationStatus;
  archivedStatus: boolean;
  location?: string;
  details: string;
  // Backward compatibility aliases
  deadline?: string;
  officialLink?: string;
  isVerified?: boolean;
  isActive?: boolean;
}

export interface BiotechNewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Industry & Biopharma' | 'Research Discoveries' | 'Regulatory & DCGI/FDA' | 'Agri-Biotech' | 'Policy & Grants';
  summary: string;
  content: string[];
  sourceOutlet: string;
  sourceUrl: string;
  publishedDate: string;
  isVerified: boolean;
  keyTakeaways: string[];
}

export interface ScientificEventWorkshop {
  id: string;
  title: string;
  organizer: string;
  eventType: 'National Conference' | 'International Symposium' | 'Hands-on Workshop' | 'Scientific Award';
  dates: string;
  mode: 'Offline / In-Person' | 'Online / Virtual' | 'Hybrid';
  venueCity: string;
  registrationDeadline: string;
  officialLink: string;
  description: string;
  isVerified: boolean;
}

export interface ResearchProposalScheme {
  id: string;
  schemeName: string;
  fundingAgency: 'DBT' | 'DST' | 'ICMR' | 'CSIR' | 'SERB' | 'BIRAC' | 'Wellcome-DBT';
  targetAudience: string;
  grantBudgetRange: string;
  submissionDeadline: string;
  guidelinesSummary: string;
  officialCallUrl: string;
  eligibilityCriteria: string[];
  isActive: boolean;
}

export interface CareerGuidanceRoadmap {
  id: string;
  slug: string;
  title: string;
  domain: string;
  targetQualifications: string[];
  salaryRangeInsight: string;
  summary: string;
  keyMilestones: {
    step: string;
    description: string;
    recommendedSkills: string[];
  }[];
  topHiringOrganizations: string[];
}

export interface ResearchClub {
  id: string;
  name: string;
  slug: string;
  focusArea: string;
  meetingFormat: string;
  description: string;
  discussionTopics: string[];
  participationGuidelines: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  preferredLanguage: Language;
  state?: string;
  city?: string;
  educationLevel?: string;
  college?: string;
  currentYear?: string;
  graduationYear?: number;
  examGoals: string[];
  learningGoals: string[];
  onboardingCompleted: boolean;
  role: 'student' | 'content_editor' | 'admin';
}

export interface BookmarkItem {
  id: string;
  type: 'topic' | 'instrument' | 'protocol' | 'exam' | 'job' | 'internship';
  slug: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface SearchResult {
  id: string;
  type: 'subject' | 'topic' | 'exam' | 'instrument' | 'protocol' | 'calculator' | 'job' | 'internship' | 'news' | 'proposal';
  title: string;
  subtitle: string;
  url: string;
  tags?: string[];
}
