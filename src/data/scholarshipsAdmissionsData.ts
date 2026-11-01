import { ScholarshipAdmission } from '../types/index.ts';

export const SCHOLARSHIPS_ADMISSIONS: ScholarshipAdmission[] = [
  {
    id: 'sch-dbt-jrf-bet',
    title: 'DBT-JRF Fellowship (Biotechnology Eligibility Test - BET)',
    slug: 'dbt-jrf-bet-fellowship',
    entityType: 'Scholarship',
    issuingBody: 'Department of Biotechnology (DBT), Govt. of India / Regional Centre for Biotechnology (RCB)',
    fundingAmount: '₹37,000/month (JRF) for 2 years, upgradable to ₹42,000/month (SRF) for 3 years + ₹30,000 annual contingency + HRA',
    eligibility: 'M.Sc./M.Tech/B.Tech in Biotechnology or Life Sciences with min. 60% marks (General/EWS/OBC) or 55% (SC/ST/PwD). Age limit: 28 years.',
    deadline: '2026-03-31',
    officialLink: 'https://rcb.res.in/BET/',
    isVerified: true,
    isActive: true,
    details: 'Category-I qualifiers can activate fellowship in any recognized university/institute in India for Ph.D. Category-II qualifiers are eligible for DBT-sponsored research projects without independent fellowship.'
  },
  {
    id: 'sch-dst-inspire',
    title: 'DST-INSPIRE Faculty Fellowship / Ph.D. Fellowship in Life Sciences',
    slug: 'dst-inspire-fellowship-life-sciences',
    entityType: 'Scholarship',
    issuingBody: 'Department of Science and Technology (DST), Ministry of Science & Technology',
    fundingAmount: '₹37,000/month + HRA + ₹20,000 annual contingency grant for 5 years',
    eligibility: '1st Rank Holders in Post-Graduate examination in Basic & Applied Sciences at University level or INSPIRE Scholars with 65% aggregate.',
    deadline: '2026-10-15',
    officialLink: 'https://online-inspire.gov.in',
    isVerified: true,
    isActive: true,
    details: 'Assists top university rank holders directly pursuing doctoral degrees without separate competitive exams, fostering homegrown fundamental and applied scientific talent.'
  },
  {
    id: 'sch-icmr-jrf',
    title: 'ICMR Junior Research Fellowship (ICMR-JRF in Biomedical Sciences)',
    slug: 'icmr-jrf-biomedical-biotechnology',
    entityType: 'Scholarship',
    issuingBody: 'Indian Council of Medical Research (ICMR) & PGIMER Chandigarh',
    fundingAmount: '₹37,000/month (JRF) + HRA + ₹20,000 annual contingency grant',
    eligibility: 'M.Sc./M.A. in Life Sciences, Biotechnology, Genetics, or Biochemistry with minimum 55% marks (General) or 50% (Reserved). Age limit: 28 years.',
    deadline: '2026-06-20',
    officialLink: 'https://main.icmr.nic.in/content/junior-research-fellowships-jrf',
    isVerified: true,
    isActive: true,
    details: 'National examination allocating 120 fellowships in Biomedical Sciences (including Molecular Biology, Immunology, Microbiology, and Virology) and 30 in Social Sciences.'
  },
  {
    id: 'adm-iisc-phd',
    title: 'IISc Bengaluru Ph.D. & Integrated Ph.D. Admissions in Biological Sciences',
    slug: 'iisc-bengaluru-biological-sciences-phd-admissions',
    entityType: 'Ph.D. Admission',
    issuingBody: 'Indian Institute of Science (IISc), Bengaluru',
    fundingAmount: 'Full institutional fellowship (₹37,000/month JRF / ₹42,000/month SRF)',
    eligibility: 'Valid GATE (BT/XL/EY) score, CSIR-UGC NET JRF, or DBT-BET JRF. For Integrated Ph.D.: IIT-JAM in Biotechnology (BT) or Biological Sciences (BL).',
    deadline: '2026-03-24',
    officialLink: 'https://admissions.iisc.ac.in',
    isVerified: true,
    isActive: true,
    details: 'Covers Molecular Reproduction, Development and Genetics (MRDG), Molecular Biophysics Unit (MBU), Biochemistry, Microbiology & Cell Biology (MCB), and Centre for Ecological Sciences.'
  },
  {
    id: 'adm-jnu-msc-phd',
    title: 'JNU School of Biotechnology (SBT) M.Sc. & Ph.D. Programme',
    slug: 'jnu-delhi-school-of-biotechnology-admissions',
    entityType: 'Master Admission',
    issuingBody: 'Jawaharlal Nehru University (JNU), New Delhi through GAT-B & NTA JNU Entrance',
    fundingAmount: 'DBT monthly student stipend (₹12,000/month for GAT-B M.Sc.) / UGC-CSIR fellowship for Ph.D.',
    eligibility: 'Bachelor’s degree under 10+2+3 pattern of education in Physical, Biological, Agricultural, Veterinary, Fishery Sciences, or B.Tech Biotechnology with minimum 55% marks.',
    deadline: '2026-04-30',
    officialLink: 'https://www.jnu.ac.in/sbt',
    isVerified: true,
    isActive: true,
    details: 'Pioneering biotechnology department in India offering state-of-the-art facilities in structural bioinformatics, viral immunology, metabolic engineering, and synthetic biology.'
  },
  {
    id: 'adm-jgeebils-tifr',
    title: 'JGEEBILS (Joint Graduate Entrance Examination for Biology & Interdisciplinary Life Sciences)',
    slug: 'jgeebils-ncbs-tifr-phd-integrated-phd',
    entityType: 'Ph.D. Admission',
    issuingBody: 'TIFR, NCBS Bengaluru, DBS Mumbai, TCIS Hyderabad, IISERs',
    fundingAmount: 'Full institutional fellowship: ₹31,000 - ₹35,000 (pre-candidacy) up to ₹42,000 (post-candidacy) + on-campus accommodation',
    eligibility: 'B.Sc./B.Tech/M.Sc. in any branch of Basic Science, Technology, or Medicine.',
    deadline: '2026-11-02',
    officialLink: 'https://www.ncbs.res.in/academic/admissions-JGEEBILS',
    isVerified: true,
    isActive: true,
    details: 'Shared entrance test accepted across NCBS, inStem, TIFR Mumbai, IISER Pune, IISER Mohali, ACTREC, NBRC, and RGCB for premier Ph.D. and Int-Ph.D. programs.'
  }
];
