import {
  ResearchProposalScheme,
  ScientificEventWorkshop,
  CareerGuidanceRoadmap,
  ResearchClub
} from '../types/index.ts';

export const RESEARCH_PROPOSAL_SCHEMES: ResearchProposalScheme[] = [
  {
    id: 'grant-birac-big',
    schemeName: 'Biotechnology Ignition Grant (BIG Scheme - 25th Call)',
    fundingAgency: 'BIRAC',
    targetAudience: 'Biotech entrepreneurs, graduating research scholars, postdoctoral fellows, and startups (<5 years old)',
    grantBudgetRange: 'Up to ₹50 Lakhs (Grant-in-Aid, 100% non-dilutive)',
    submissionDeadline: '2026-04-15',
    guidelinesSummary: 'Fosters innovative ideas with commercialization potential into proof-of-concept (POC) across Healthcare, Industrial Biotech, Agriculture, and Clean Energy.',
    officialCallUrl: 'https://birac.nic.in/big.php',
    eligibilityCriteria: [
      'Individual applicant must hold a minimum B.Tech / M.Sc. / Ph.D. degree in science/engineering',
      'Startups must be incorporated in India with >51% Indian shareholding',
      'Project duration: Up to 18 months with milestone-linked tranches'
    ],
    isActive: true
  },
  {
    id: 'grant-serb-crg',
    schemeName: 'Core Research Grant (CRG) – Life Sciences & Bioengineering',
    fundingAgency: 'SERB',
    targetAudience: 'Regular academic faculty, scientists in recognized universities and national R&D institutions',
    grantBudgetRange: '₹30 Lakhs to ₹75 Lakhs (Over 3 years)',
    submissionDeadline: '2026-05-31',
    guidelinesSummary: 'Supports investigator-centric research in fundamental life processes, synthetic biology, molecular genetics, and biophysical mechanisms.',
    officialCallUrl: 'https://serbonline.in',
    eligibilityCriteria: [
      'Applicant must hold a Ph.D. and a regular academic/research position in India',
      'Proposal must define novel hypotheses with verifiable experimental milestones',
      'Includes provision for JRF/SRF project staff, equipment, and consumables'
    ],
    isActive: true
  },
  {
    id: 'grant-wellcome-dbt',
    schemeName: 'DBT/Wellcome Trust India Alliance Early Career Fellowships',
    fundingAgency: 'Wellcome-DBT',
    targetAudience: 'Postdoctoral researchers with 1-4 years of post-Ph.D. research experience',
    grantBudgetRange: 'Full personal salary + research expenses (~₹1.5 - ₹2.0 Crores for 5 years)',
    submissionDeadline: '2026-07-15',
    guidelinesSummary: 'Prestigious fellowship designed for promising postdoctoral scientists wishing to establish their independent research program in biomedical and life sciences in India.',
    officialCallUrl: 'https://www.indiaalliance.org/fellowships',
    eligibilityCriteria: [
      'Ph.D. in Life Sciences, MD, or equivalent degree completed within past 4 years',
      'Sponsorship from a host institution in India capable of providing laboratory space',
      'High-impact international peer-reviewed publications'
    ],
    isActive: true
  },
  {
    id: 'grant-dbt-twins',
    schemeName: 'DBT Biotechnology-based Programmes for Societal Development & Agri-Biotech',
    fundingAgency: 'DBT',
    targetAudience: 'Scientists, universities, and registered bio-incubators working on localized challenges',
    grantBudgetRange: '₹25 Lakhs to ₹60 Lakhs',
    submissionDeadline: '2026-06-30',
    guidelinesSummary: 'Application of bio-fertilizers, microbial consortia, disease-free tissue culture plantlets, and aquaculture technologies for rural prosperity.',
    officialCallUrl: 'https://dbtindia.gov.in',
    eligibilityCriteria: [
      'Collaborative proposals involving academic PI and grassroots field demonstration teams',
      'Quantifiable impact metrics on farm productivity and soil health'
    ],
    isActive: true
  }
];

export const SCIENTIFIC_EVENTS_WORKSHOPS: ScientificEventWorkshop[] = [
  {
    id: 'event-ngbt-2026',
    title: 'International Conference on Next Generation Genomics and Bioinformatics (NGBT)',
    organizer: 'SciGenom Research Foundation (SGRF) & Premier Genomics Partners',
    eventType: 'International Symposium',
    dates: 'October 12 - 15, 2026',
    mode: 'Hybrid',
    venueCity: 'Bengaluru, Karnataka',
    registrationDeadline: '2026-08-31',
    officialLink: 'https://sgrf.org/ngbt/',
    description: 'Premier genomics gathering featuring plenary sessions on single-cell RNA sequencing, spatial transcriptomics, pangenomics, and clinical multi-omics.',
    isVerified: true
  },
  {
    id: 'event-instem-crispr',
    title: 'National Hands-on Training Workshop on CRISPR-Cas9 Gene Editing & Mammalian Culture',
    organizer: 'Institute for Stem Cell Science and Regenerative Medicine (inStem), Bengaluru',
    eventType: 'Hands-on Workshop',
    dates: 'May 18 - 23, 2026',
    mode: 'Offline / In-Person',
    venueCity: 'Bengaluru, Karnataka',
    registrationDeadline: '2026-04-20',
    officialLink: 'https://instem.res.in/events',
    description: 'Intensive laboratory workshop covering sgRNA design, ribonucleoprotein (RNP) electroporation, T7E1 mismatch cleavage assay, and single-cell cloning.',
    isVerified: true
  },
  {
    id: 'event-ict-fermentation',
    title: 'Advanced Masterclass on Pilot-Scale Bioreactor Operation & Downstream Purification',
    organizer: 'DBT-ICT Centre for Energy Biosciences, Mumbai',
    eventType: 'Hands-on Workshop',
    dates: 'June 08 - 12, 2026',
    mode: 'Offline / In-Person',
    venueCity: 'Mumbai, Maharashtra',
    registrationDeadline: '2026-05-10',
    officialLink: 'https://www.ictmumbai.edu.in',
    description: 'Hands-on training on 10L/50L stirred-tank fermenters, automated gas mixing, kLa mass transfer measurement, cell harvesting, and FPLC protein purification.',
    isVerified: true
  },
  {
    id: 'event-bioscience-award',
    title: 'National Bioscience Award for Career Development 2026',
    organizer: 'Department of Biotechnology (DBT), Ministry of Science and Technology',
    eventType: 'Scientific Award',
    dates: 'Award Ceremony: November 2026',
    mode: 'Offline / In-Person',
    venueCity: 'New Delhi, Delhi',
    registrationDeadline: '2026-07-31',
    officialLink: 'https://dbtindia.gov.in/awards',
    description: 'Prestigious national recognition honoring young Indian bioscience researchers under 45 years of age for outstanding basic and applied biological research, carrying a cash prize and research grant.',
    isVerified: true
  }
];

export const CAREER_GUIDANCE_ROADMAPS: CareerGuidanceRoadmap[] = [
  {
    id: 'career-bioinformatics',
    slug: 'bioinformatics-and-computational-biology',
    title: 'Bioinformatician & Computational Biologist Career Roadmap',
    domain: 'Data Science & Genomics',
    targetQualifications: ['B.Sc. / B.Tech / M.Sc. in Biotechnology, Bioinformatics, or Computer Science'],
    salaryRangeInsight: 'Entry: ₹4.5 - ₹7 LPA | Mid (3-6 yrs): ₹9 - ₹18 LPA | Lead/Staff: ₹22 - ₹40+ LPA',
    summary: 'A structured pathway from wet-lab biological curiosity to in-demand computational genomics, pipeline engineering (Nextflow/Snakemake), and structural drug discovery.',
    keyMilestones: [
      {
        step: 'Foundation (Months 1-3)',
        description: 'Master Linux CLI, Bash scripting, Python (Biopython, Pandas, NumPy), and fundamental genomics data structures (FASTQ, BAM, VCF, GFF3).',
        recommendedSkills: ['Linux terminal navigation', 'Python scripting', 'Biopython', 'Git / GitHub']
      },
      {
        step: 'Genomic Pipelines (Months 4-7)',
        description: 'Build end-to-end RNA-seq and DNA variant calling pipelines (FastQC, Trimmomatic, STAR/HISAT2, featureCounts, DESeq2, GATK4).',
        recommendedSkills: ['GATK4', 'DESeq2 in R', 'Nextflow / Snakemake', 'Docker / Singularity']
      },
      {
        step: 'Structural & ML Modeling (Months 8-12)',
        description: 'Explore AlphaFold2/ESMFold protein structure prediction, molecular docking (AutoDock Vina), and basic PyTorch machine learning for bio-data.',
        recommendedSkills: ['AlphaFold2', 'PyMOL', 'Molecular Docking', 'PyTorch / Scikit-learn']
      }
    ],
    topHiringOrganizations: [
      'Tata Memorial Centre (ACTREC)',
      'Strand Life Sciences',
      'MedGenome',
      'Syngene International',
      'Genomics India Project consortia',
      'European Molecular Biology Laboratory (EMBL)'
    ]
  },
  {
    id: 'career-bioprocess',
    slug: 'bioprocess-and-fermentation-engineering',
    title: 'Bioprocess & Industrial Fermentation Scientist Roadmap',
    domain: 'Industrial Biotechnology & Biomanufacturing',
    targetQualifications: ['B.Tech / M.Tech / M.Sc. in Biotechnology, Biochemical Engineering, or Chemical Technology'],
    salaryRangeInsight: 'Entry: ₹4.0 - ₹6.5 LPA | Mid: ₹8 - ₹15 LPA | Plant Lead / Senior Manager: ₹18 - ₹32 LPA',
    summary: 'Guide to transitioning into the rapidly expanding biomanufacturing sector: microbial and mammalian cell culture scale-up, bioreactor control, and regulatory compliance.',
    keyMilestones: [
      {
        step: 'Upstream Bioprocess Core (Months 1-3)',
        description: 'Understand microbial growth kinetics (Monod model), specific growth rate (mu), doubling time, oxygen transfer rate (OTR/kLa), and media sterilization.',
        recommendedSkills: ['Bioreactor calibration', 'Dissolved oxygen probes', 'Aseptic inoculation', 'Fed-batch kinetics']
      },
      {
        step: 'Downstream Purification (Months 4-7)',
        description: 'Master cell disruption (high-pressure homogenizer), tangential flow filtration (TFF), and preparatory FPLC chromatography (affinity, ion-exchange, size-exclusion).',
        recommendedSkills: ['TFF micro/ultrafiltration', 'AKTA FPLC systems', 'Resin packing & cleaning validation', 'SDS-PAGE / HPLC purity testing']
      },
      {
        step: 'Regulatory & cGMP Validation (Months 8-12)',
        description: 'Familiarize with US FDA 21 CFR Part 210/211, ICH Q7, cleanroom air classifications (Grade A to D), and computerized system validation (GAMP 5).',
        recommendedSkills: ['BMR documentation', 'Change control & CAPA', 'ICH Q7 / cGMP guidelines', 'Cleanroom protocols']
      }
    ],
    topHiringOrganizations: [
      'Biocon Biologics',
      'Serum Institute of India',
      'Reliance Life Sciences',
      'Dr. Reddy\'s Biologics',
      'Bharat Biotech',
      'Biological E'
    ]
  },
  {
    id: 'career-qc-qa-regulatory',
    slug: 'quality-assurance-qc-and-regulatory-affairs',
    title: 'Quality Control, QA & Regulatory Affairs (RA) Specialist Roadmap',
    domain: 'Pharma & Biopharmaceutical Quality Systems',
    targetQualifications: ['B.Sc. / M.Sc. in Biotechnology, Biochemistry, Microbiology, or Pharmacy (B.Pharm/M.Pharm)'],
    salaryRangeInsight: 'Entry: ₹3.6 - ₹5.5 LPA | Mid: ₹7 - ₹12 LPA | Regulatory Head: ₹16 - ₹28 LPA',
    summary: 'Navigate the essential pillars of pharmaceutical compliance: analytical method validation, deviation investigations, stability studies, and regulatory dossier filings.',
    keyMilestones: [
      {
        step: 'Analytical QC Testing (Months 1-4)',
        description: 'Routine wet-lab assay execution: HPLC assay, Karl Fischer water titration, endotoxin LAL gel clot, sterility testing under laminar airflow, and environmental monitoring.',
        recommendedSkills: ['HPLC operation', 'Endotoxin (LAL) testing', 'USP/EP/IP pharmacopeia compliance', 'Good Laboratory Practices (GLP)']
      },
      {
        step: 'Quality Assurance & Auditing (Months 5-8)',
        description: 'OOS/OOT investigations, Root Cause Analysis (Fishbone/5 Whys), risk management (ICH Q9), vendor qualification, and annual product quality reviews (APQR).',
        recommendedSkills: ['Deviation writing', 'CAPA design', 'SOP authoring', 'ICH Q9 Quality Risk Management']
      },
      {
        step: 'Regulatory Affairs & CTD Dossiers (Months 9-12)',
        description: 'Compile Common Technical Document (CTD) Module 3 (Quality/CMC), Investigational New Drug (IND) submissions to CDSCO / FDA, and electronic CTD (eCTD) publishing.',
        recommendedSkills: ['CTD Module 3 authoring', 'CDSCO Sugam portal', 'Stability data (ICH Q1A)', 'Post-approval changes']
      }
    ],
    topHiringOrganizations: [
      'Sun Pharma',
      'Cipla Biotec',
      'Lupin Pharmaceuticals',
      'Zydus Lifesciences',
      'Piramal Pharma Solutions',
      'Glenmark Life Sciences'
    ]
  }
];

export const RESEARCH_CLUBS: ResearchClub[] = [
  {
    id: 'club-genomics',
    name: 'Genomics & Precision Medicine Journal Club',
    slug: 'genomics-journal-club',
    focusArea: 'Human Genetics, Cancer Transcriptomics, and Single-Cell Biology',
    meetingFormat: 'Fortnightly Virtual Seminars (Alternate Saturdays at 6:00 PM IST)',
    description: 'An open academic journal club where students, research scholars, and junior faculty critically appraise the latest high-impact papers from Nature Genetics, Cell Genomics, and Genome Research.',
    discussionTopics: [
      'Spatial transcriptomics dissection of solid tumor microenvironments',
      'Long-read sequencing (PacBio & Oxford Nanopore) for complex structural variants',
      'Polygenic risk scores (PRS) in diverse South Asian cohorts',
      'Single-cell RNA velocity and lineage tracing algorithms'
    ],
    participationGuidelines: 'Participants take turns presenting one paper per session following a standard format: Background & Hypothesis, Methodology, Critical Data Analysis, and Technical Caveats. All slide decks and annotated PDFs are shared publicly.'
  },
  {
    id: 'club-synthetic-bio',
    name: 'Synthetic Biology & Metabolic Engineering Circle',
    slug: 'synthetic-biology-circle',
    focusArea: 'Genetic Circuit Design, Cell-Free Systems, and Microbial Chassis Engineering',
    meetingFormat: 'Monthly Thematic Roundtables & Bio-Design Sprints',
    description: 'A student-led community focused on applying engineering design-build-test-learn cycles to biological systems for sustainable chemical production and environmental remediation.',
    discussionTopics: [
      'CRISPR-Cas orthogonal regulators and genetic logic gates',
      'Directed evolution of enzymes for plastic degradation (PETase variants)',
      'Yeast metabolic engineering for artemisinin and squalene synthesis',
      'Biosafety standards, biosecurity governance, and genetic biocontainment systems'
    ],
    participationGuidelines: 'Open to B.Tech/M.Sc. students interested in iGEM competition topics and synthetic biology. Members collaborate on open-source in silico genetic construct designs.'
  },
  {
    id: 'club-structural-bio',
    name: 'Structural Biology & Drug Discovery Forum',
    slug: 'structural-biology-forum',
    focusArea: 'Cryo-EM, Protein Crystallography, and AI-Driven Protein Design',
    meetingFormat: 'Monthly Journal Review & Hands-on In Silico Demos',
    description: 'Bridging atomic-resolution macromolecular structures with modern computational therapeutics, de novo binder design, and molecular dynamic simulations.',
    discussionTopics: [
      'Cryo-electron microscopy resolution revolutions and membrane protein reconstruction',
      'Diffusion models for de novo protein backbone generation (RFdiffusion, Chroma)',
      'Molecular dynamics (GROMACS) for allosteric drug binding site discovery',
      'Covalent kinase inhibitors and fragment-based drug design (FBDD)'
    ],
    participationGuidelines: 'Sessions include 40 minutes of paper dissection followed by a 20-minute live demo showing PyMOL scripting or docking parameter setups.'
  }
];
