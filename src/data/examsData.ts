import { Examination } from '../types/index.ts';

export const COMPETITIVE_EXAMINATIONS: Examination[] = [
  {
    code: 'GAT-B',
    fullName: {
      en: 'Graduate Aptitude Test - Biotechnology (GAT-B)',
      hinglish: 'Graduate Aptitude Test - Biotechnology (GAT-B)',
    },
    conductingBody: 'National Testing Agency (NTA) on behalf of Department of Biotechnology (DBT), Govt. of India',
    officialWebsite: 'https://dbt.nta.ac.in',
    lastVerifiedDate: '2026-03-15',
    overview: {
      en: 'GAT-B is an all-India entrance examination for admissions into DBT-supported postgraduate programs in Biotechnology and allied areas (M.Sc. Biotechnology, M.Tech Biotechnology, M.Sc. Agricultural Biotechnology, and M.V.Sc.) across participating Indian universities with DBT student fellowships.',
      hinglish: 'GAT-B National Testing Agency (NTA) conduct karta hai for admissions into DBT-supported postgraduate courses (M.Sc. Biotechnology, M.Tech Biotechnology). Qualified students ko government monthly DBT fellowship milti hai.',
    },
    eligibility: {
      degree: [
        'B.Sc. / B.Tech / Integrated B.Sc.-M.Sc. in Biotechnology, Life Sciences, Microbiology, Biochemistry, Agriculture, or allied areas',
        'Minimum 60% aggregate marks (55% for SC/ST/PwD) or equivalent CGPA in bachelor degree',
      ],
      minimumMarks: '60% aggregate (55% for reserved categories)',
      ageLimit: 'As per individual participating universities/institutions criteria',
    },
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      durationMinutes: 180,
      totalMarks: 240,
      totalQuestions: 160,
      markingScheme: 'Section A: +1 mark, -0.5 mark negative. Section B: +3 marks, -1 mark negative.',
      sections: [
        {
          name: 'Section A (General Aptitude, Physics, Chemistry, Mathematics, Biology)',
          questions: '60 compulsory questions',
          marks: '60 marks (1 mark each; -0.5 negative)',
          syllabusScope: '10+2 level Physics, Chemistry, Mathematics and General Basic Biology & Aptitude',
        },
        {
          name: 'Section B (Biotechnology & Life Sciences Specific)',
          questions: 'Attempt 60 questions out of 100 choices',
          marks: '180 marks (3 marks each; -1 negative)',
          syllabusScope: 'Graduate-level (B.Sc./B.Tech) Biomolecules, Cell Biology, Molecular Biology, Immunology, Bioprocess, rDNA Tech, Plant & Animal Biotech',
        },
      ],
    },
    coreSyllabusTopics: [
      'Biomolecules: Structure and functions of amino acids, proteins, nucleic acids, lipids, and carbohydrates',
      'Enzyme Kinetics: Michaelis-Menten kinetics, enzyme inhibition, coenzymes, and allosteric enzymes',
      'Cell Biology: Membrane transport, cell organelles, cytoskeleton, and signal transduction cascades',
      'Molecular Biology: Replication, transcription, translation, and gene regulation in prokaryotes and eukaryotes',
      'Recombinant DNA Technology: Restriction enzymes, cloning vectors, PCR, and genomic libraries',
      'Immunology: Innate vs adaptive immunity, antigen-antibody interactions, MHC, and hybridoma technology',
      'Bioprocess Engineering: Microbial growth kinetics, batch/continuous bioreactors, and downstream separation',
      'Bioinformatics: Biological databases (NCBI, UniProt), sequence alignment (BLAST), and scoring matrices',
    ],
    preparationStrategy: {
      en: [
        'Master Section A high-frequency 10+2 physics and chemistry basics to guarantee a solid 40+ base score.',
        'Target molecular biology, biochemistry, and recombinant DNA technology in Section B, as these carry the densest cluster of 3-mark questions.',
        'Practice time management: with 60 questions to choose from 100 in Section B, spending the first 10 minutes scanning and shortlisting high-confidence questions is critical.',
        'Solve 5+ years of official GAT-B question papers to calibrate negative-marking risk on 0.5 and 1.0 point penalties.',
      ],
      hinglish: [
        'Section A me 10+2 level chemistry aur biology questions ko thoroughly revise karein taaki easy marks secure ho sakein.',
        'Section B me molecular biology, biochemistry, aur genetic engineering ko priority dein kyunki har correct question 3 marks ka hai.',
        '100 questions me se best 60 select karne ke liye first 10 minutes paper scan karein taaki guessing minimize ho.',
        'Negative marking (-1 in Sec B, -0.5 in Sec A) se bachne ke liye sirf confident options ko hi mark karein.',
      ],
    },
  },
  {
    code: 'DBT-JRF',
    fullName: {
      en: 'DBT - Junior Research Fellowship / Biotechnology Eligibility Test (BET)',
      hinglish: 'DBT - Junior Research Fellowship / BET',
    },
    conductingBody: 'Department of Biotechnology (DBT), Govt. of India via National Testing Agency (NTA)',
    officialWebsite: 'https://dbt.nta.ac.in',
    lastVerifiedDate: '2026-03-15',
    overview: {
      en: 'DBT-JRF / BET qualifies candidates for the award of Junior Research Fellowship under Category-I (fellowship valid across any Indian university/institute) and Category-II (eligible for appointment in DBT-funded research projects without independent fellowship).',
      hinglish: 'DBT-JRF/BET exam qualify karke students biotechnology aur life sciences research me PhD ke liye monthly JRF fellowship pa sakte hain. Category-I candidates national institutions me fellowship ke liye eligible hote hain.',
    },
    eligibility: {
      degree: [
        'M.Sc. / M.Tech / M.V.Sc. in Biotechnology, Life Sciences, Bioinformatics, or allied subjects',
        'B.E. / B.Tech in Biotechnology (4-year course)',
        'Minimum 60% marks (55% for SC/ST/PwD) in qualifying degree',
      ],
      minimumMarks: '60% for General/OBC/EWS, 55% for SC/ST/PwD',
      ageLimit: 'Up to 28 years for General category (5 years relaxation for SC/ST/differently-abled/women)',
    },
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      durationMinutes: 180,
      totalMarks: 300,
      totalQuestions: 200,
      markingScheme: '+3 marks for correct answer, -1 mark for incorrect answer across both sections.',
      sections: [
        {
          name: 'Section A (General Aptitude, Chemistry, Mathematics & General Biotechnology)',
          questions: '50 compulsory questions',
          marks: '150 marks (3 marks each; -1 negative)',
          syllabusScope: 'Quantitative aptitude, analytical reasoning, general biotechnology principles, and core biochemical foundations',
        },
        {
          name: 'Section B (Specialized Biotechnology & Advanced Life Sciences)',
          questions: 'Attempt 50 questions out of 150 options',
          marks: '150 marks (3 marks each; -1 negative)',
          syllabusScope: 'Agricultural Biotech, Animal Biotech, Bioprocess, Medical Biotech, Marine Biotech, Neurobiology, Bioinformatics, and IPR',
        },
      ],
    },
    coreSyllabusTopics: [
      'General Biotechnology: Biomolecules, cell architecture, enzymatic catalysis, and bioenergetics',
      'Advanced Molecular Genetics: Chromatin remodeling, transcriptional regulation, non-coding RNAs, and epigenetics',
      'Recombinant DNA & Genomics: Next-generation sequencing, CRISPR-Cas systems, and vector design',
      'Bioprocess & Biochemical Engineering: Fermenter design, mass transfer, downstream processing, and enzyme engineering',
      'Immunotechnology: Monoclonal antibodies, FACS, ELISPOT, CAR-T cell concepts, and vaccines',
      'Bioinformatics: Multiple sequence alignment, phylogenetic analysis, molecular docking, and structural biology',
    ],
    preparationStrategy: {
      en: [
        'Capitalize on Section B\'s generous question choice (50 out of 150) by developing deep expertise in 3-4 specialized domains rather than superficial reading of all 10.',
        'Master Section A numerical aptitude and general science, as this section has no optionality and directly impacts Category-I rank.',
        'Focus on experimental techniques: gel filtration, affinity chromatography, Western blotting, confocal microscopy, and qPCR data analysis.',
      ],
      hinglish: [
        'Section B me 150 me se 50 questions choose karne hote hain, isliye apne strongest 3-4 subjects ko maximum depth me prepare karein.',
        'Section A compulsory hai, isme quantitative aptitude aur basic science reasoning questions daily practice karein.',
        'Analytical techniques (Western blot, qPCR, FACS analysis, Mass Spectrometry) ke data-interpretation questions par focus karein.',
      ],
    },
  },
  {
    code: 'GATE-BT',
    fullName: {
      en: 'Graduate Aptitude Test in Engineering — Biotechnology (GATE-BT)',
      hinglish: 'Graduate Aptitude Test in Engineering — Biotechnology (GATE-BT)',
    },
    conductingBody: 'Indian Institutes of Technology (IITs) on rotational basis / IISc Bangalore',
    officialWebsite: 'https://gate2026.iitr.ac.in',
    lastVerifiedDate: '2026-03-20',
    overview: {
      en: 'GATE Biotechnology is a premier national examination testing comprehensive understanding of undergraduate biotechnology and engineering sciences. Scores are valid for 3 years for M.Tech/Ph.D. admissions at IITs, IISc, and recruitment at public sector undertakings (PSUs).',
      hinglish: 'GATE-BT IITs aur IISc conduct karte hain. Scorecard 3 saal valid rehta hai for M.Tech admissions at IITs, direct PhD programs, aur public sector undertakings (PSUs) recruitment ke liye.',
    },
    eligibility: {
      degree: [
        'Candidates currently in 3rd year or higher of undergraduate degree (B.Tech / B.E. / B.Sc. Research 4-year)',
        'Master degree holders in relevant science branch (M.Sc. Biotechnology / Life Sciences / Chemistry)',
      ],
      minimumMarks: 'No minimum percentage required for appearing; admission criteria set by receiving institutions',
      ageLimit: 'No age limit',
    },
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      durationMinutes: 180,
      totalMarks: 100,
      totalQuestions: 65,
      markingScheme: 'MCQ (1-mark: -0.33, 2-mark: -0.66). MSQ & NAT (Numerical Answer Type): Zero negative marking.',
      sections: [
        {
          name: 'General Aptitude (GA)',
          questions: '10 questions (5 of 1-mark + 5 of 2-marks)',
          marks: '15 marks',
          syllabusScope: 'Verbal Ability and Numerical Ability (quant, data interpretation, logical reasoning)',
        },
        {
          name: 'Engineering Mathematics',
          questions: 'Approximately 7-8 questions',
          marks: '10-13 marks',
          syllabusScope: 'Linear algebra, calculus, differential equations, probability and statistics, numerical methods',
        },
        {
          name: 'Biotechnology Core Subject',
          questions: 'Approximately 47-48 questions (1-mark and 2-marks)',
          marks: '72-75 marks',
          syllabusScope: 'Microbiology, Biochemistry, Cell Biology, Molecular Biology, Bioprocess Engineering, Recombinant DNA, Plant/Animal Biotech',
        },
      ],
    },
    coreSyllabusTopics: [
      'Engineering Mathematics: Linear equations, matrices, Eigenvalues, derivatives, integration, and normal distributions',
      'General Biology: Taxonomy, photosynthesis, respiration, nitrogen fixation, and developmental biology basics',
      'Genetics & Cellular Biology: Mendelian genetics, linkage, mapping, cellular organelles, and cancer biology',
      'Fundamentals of Biological Chemistry: Amino acid pKa values, protein folds, enzyme kinetics, and metabolic pathways',
      'Bioprocess Engineering: Mass and energy balances, aeration and agitation, scale-up, rheology, and sterilizer sizing',
      'Recombinant DNA Technology: Restriction mapping, expression vectors, CRISPR, and protein purification tables',
    ],
    preparationStrategy: {
      en: [
        'Master Bioprocess Engineering numerical calculations (Monod kinetics, kLa, Del factor, chemostat balances) which constitute 25-30% of the core paper.',
        'Do not skip Engineering Mathematics and General Aptitude—they account for 28% of total marks and distinguish top 100 rankers.',
        'Practice NAT (Numerical Answer Type) questions rigorously without options to hone exact scientific calculator precision.',
      ],
      hinglish: [
        'Bioprocess engineering ke numericals (kLa, OTR, yield coefficients, chemostat wash-out) par daily practice karein.',
        'Engineering Mathematics (13 marks) aur General Aptitude (15 marks) high-scoring sections hain, inko bilkul ignore na karein.',
        'NAT questions me negative marking nahi hoti, isliye exact formula calculations par command banayein.',
      ],
    },
  },
  {
    code: 'IIT-JAM',
    fullName: {
      en: 'Joint Admission Test for Masters — Biotechnology (JAM-BT)',
      hinglish: 'Joint Admission Test for Masters — Biotechnology (JAM-BT)',
    },
    conductingBody: 'Indian Institutes of Technology (IITs) on rotational basis',
    officialWebsite: 'https://jam2026.iitd.ac.in',
    lastVerifiedDate: '2026-03-20',
    overview: {
      en: 'IIT JAM Biotechnology is the single gateway for admissions into prestigious M.Sc. Biotechnology, Joint M.Sc.-Ph.D., and Integrated Ph.D. programs at IIT Bombay, IIT Roorkee, IIT Indore, and IISc Bangalore.',
      hinglish: 'IIT JAM-BT crack karke students premier IITs (IIT Bombay, Roorkee, Indore) aur IISc Bangalore me M.Sc. Biotechnology aur Dual Degree PhD programs me admission lete hain.',
    },
    eligibility: {
      degree: [
        'Undergraduate degree with at least 55% aggregate or 5.5 CGPA out of 10 for General/OBC (50% or 5.0 CGPA for SC/ST/PwD)',
        'Candidates in their final bachelor year are eligible to sit for examination',
      ],
      minimumMarks: '55% aggregate (50% for SC/ST/PwD)',
      ageLimit: 'No age restriction',
    },
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      durationMinutes: 180,
      totalMarks: 100,
      totalQuestions: 60,
      markingScheme: 'Sec A: 1-mark (-0.33) & 2-mark (-0.66). Sec B: MSQ (no negative). Sec C: NAT (no negative).',
      sections: [
        {
          name: 'Section A: Multiple Choice Questions (MCQ)',
          questions: '30 questions (10 questions of 1-mark + 20 questions of 2-marks)',
          marks: '50 marks',
          syllabusScope: 'Biology (44%), Chemistry (20%), Mathematics (18%), Physics (18%)',
        },
        {
          name: 'Section B: Multiple Select Questions (MSQ)',
          questions: '10 questions of 2 marks each',
          marks: '20 marks',
          syllabusScope: 'One or more than one choices may be correct; all correct choices must be selected with no partial marking',
        },
        {
          name: 'Section C: Numerical Answer Type (NAT)',
          questions: '20 questions (10 of 1-mark + 10 of 2-marks)',
          marks: '30 marks',
          syllabusScope: 'Numerical computation questions entered via virtual keypad',
        },
      ],
    },
    coreSyllabusTopics: [
      'General Biology: Cell biology, genetics, molecular biology, physiology, ecology, evolution, and applied biology',
      'Basic Biotechnology: Tissue culture, recombinant DNA, immunotechnology, and enzyme catalysis',
      'Chemistry (10+2+3 level): Organic mechanisms, stereochemistry, thermodynamics, chemical kinetics, and periodicity',
      'Mathematics (10+2 level): Calculus, trigonometry, coordinate geometry, matrices, and basic probability',
      'Physics (10+2 level): Mechanics, optics, electricity, magnetism, thermodynamics, and modern physics',
    ],
    preparationStrategy: {
      en: [
        'Balance interdisciplinary preparation: 56% of the paper comes from Chemistry, Mathematics, and Physics, making non-biology revision decisive.',
        'Train specifically for Section B MSQ: since there is no partial credit, memorize complete mechanism steps and multi-factor biological regulations.',
        'Master numerical chemistry (solutions, pH calculations, reaction kinetics) and biological arithmetic (recombination mapping, genetics ratios).',
      ],
      hinglish: [
        'Sirf Biology padhna kaafi nahi hai—Chemistry, Physics, aur Mathematics 56% weightage hold karte hain.',
        'Section B MSQ questions me multi-correct options hote hain bina kisi partial credit ke, isliye concepts crystal clear rakhein.',
        'Section C NAT ke liye virtual numeric keypad use karke exact decimal calculations practice karein.',
      ],
    },
  },
  {
    code: 'CUET-PG',
    fullName: {
      en: 'Common University Entrance Test for Postgraduates — Biotechnology / Life Sciences',
      hinglish: 'CUET-PG — Biotechnology & Life Sciences',
    },
    conductingBody: 'National Testing Agency (NTA)',
    officialWebsite: 'https://pgcuet.samarth.ac.in',
    lastVerifiedDate: '2026-03-25',
    overview: {
      en: 'CUET-PG (Test Paper SCQP07 & SCQP17) provides a single window opportunity to seek admission into M.Sc. Biotechnology, Life Sciences, and Microbiology programs across all Central Universities (JNU, BHU, HCU, DU) and participating state universities in India.',
      hinglish: 'CUET-PG ke through students India ki top central universities jaise JNU, BHU, DU, aur Hyderabad Central University me M.Sc. Biotechnology me admission le sakte hain.',
    },
    eligibility: {
      degree: [
        'Bachelor degree in Biotechnology / Biological Sciences / Chemistry / Allied disciplines from recognized university',
        'Specific minimum eligibility percentage determined by individual target universities (usually 50-55%)',
      ],
      minimumMarks: 'Typically 50% to 55% depending on target Central University',
      ageLimit: 'No upper age limit specified by NTA',
    },
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      durationMinutes: 105,
      totalMarks: 300,
      totalQuestions: 75,
      markingScheme: '+4 marks for each correct answer; -1 mark negative for each incorrect answer.',
      sections: [
        {
          name: 'Domain Knowledge (Biotechnology / Life Sciences)',
          questions: '75 domain-specific multiple choice questions',
          marks: '300 marks (4 marks each; -1 negative)',
          syllabusScope: 'Core undergraduate life sciences: Cell Biology, Biochemistry, Genetics, Molecular Biology, Microbiology, and Techniques',
        },
      ],
    },
    coreSyllabusTopics: [
      'Biochemistry: Carbohydrates, proteins, enzymes, vitamins, bioenergetics, and metabolic cycles',
      'Cell & Molecular Biology: Organelles, transport, DNA structure, replication, transcription, and translation',
      'Genetics: Mendelian principles, chromosome structure, sex determination, and mutations',
      'Microbiology & Immunology: Microbial classification, culture media, antibodies, vaccines, and diagnostic techniques',
      'Biotechnology & Techniques: Centrifugation, chromatography, electrophoresis, spectrophotometry, and cloning vectors',
      'Plant & Animal Physiology: Photosynthesis, plant hormones, circulatory system, and neural transmission',
    ],
    preparationStrategy: {
      en: [
        'Focus on speed and precision: with 75 questions in 105 minutes, students have less than 85 seconds per question.',
        'High direct-recall quotient: prioritize standard definitions, scientist discoveries, enzyme cofactors, and scientific abbreviations.',
        'Review standard NCERT 11th/12th biology along with undergraduate B.Sc. core topics for quick high-yield points.',
      ],
      hinglish: [
        'Time management bohot crucial hai: 105 minutes me 75 questions attempt karne hain, yaani per question approx 1.4 minutes.',
        'Direct factual questions bohot aate hain (scientists, discoveries, units, enzyme names), inke revision notes banayein.',
        'Negative marking (-1 mark per wrong question) se bachein aur high accuracy maintain karein.',
      ],
    },
  },
  {
    code: 'CSIR-NET',
    fullName: {
      en: 'CSIR-UGC National Eligibility Test — Life Sciences (NET-LS & JRF)',
      hinglish: 'CSIR-UGC NET — Life Sciences',
    },
    conductingBody: 'National Testing Agency (NTA) on behalf of Council of Scientific and Industrial Research (CSIR)',
    officialWebsite: 'https://csirnet.nta.ac.in',
    lastVerifiedDate: '2026-03-25',
    overview: {
      en: 'CSIR-NET Life Sciences is the pinnacle national examination determining eligibility for Junior Research Fellowship (JRF) and Lectureship/Assistant Professorship (LS) across Indian universities and national research laboratories.',
      hinglish: 'CSIR-NET Life Sciences India ka sabse prestigious exam hai research fellowship (JRF) aur Assistant Professor / Lectureship eligibility ke liye. Iska Part C deep research questions test karta hai.',
    },
    eligibility: {
      degree: [
        'M.Sc. or equivalent degree / Integrated BS-MS / BS 4-year / BE / B.Tech / B.Pharma / MBBS with at least 55% marks (50% for SC/ST/PwD)',
        'Enrolled master students can appear under Result Awaited (RA) category',
      ],
      minimumMarks: '55% for General/EWS/OBC; 50% for SC/ST/Third gender/PwD',
      ageLimit: 'Maximum 28 years for JRF (up to 5 years relaxation for SC/ST/OBC-NCL/Women). No age limit for Lectureship (LS).',
    },
    examPattern: {
      mode: 'Computer Based Test (CBT)',
      durationMinutes: 180,
      totalMarks: 200,
      totalQuestions: 145,
      markingScheme: 'Part A: +2 (-0.5). Part B: +2 (-0.5). Part C: +4 (-1.0). Total to attempt: 75 questions.',
      sections: [
        {
          name: 'Part A: General Aptitude',
          questions: 'Attempt maximum 15 out of 20 questions',
          marks: '30 marks (+2 correct, -0.5 negative)',
          syllabusScope: 'Reasoning, graphical analysis, numerical ability, series formation, quantitative comparison',
        },
        {
          name: 'Part B: Subject Specific Knowledge',
          questions: 'Attempt maximum 35 out of 50 questions',
          marks: '70 marks (+2 correct, -0.5 negative)',
          syllabusScope: 'Direct conceptual questions covering Units 1 to 13 of CSIR Life Sciences syllabus',
        },
        {
          name: 'Part C: Higher Order Scientific Analysis',
          questions: 'Attempt maximum 25 out of 75 questions',
          marks: '100 marks (+4 correct, -1.0 negative)',
          syllabusScope: 'Analytical research-level questions testing experimental design, hypotheses, and multi-step data interpretation',
        },
      ],
    },
    coreSyllabusTopics: [
      'Unit 1: Molecules and their Interaction Relevant to Biology (Biochemistry & Biophysics)',
      'Unit 2: Cellular Organization (Membrane structure, organelles, operons, and microbial physiology)',
      'Unit 3: Fundamental Processes (Replication, transcription, translation, and DNA repair)',
      'Unit 4: Cell Communication and Cell Signaling (Host-parasite interaction, GPCR, RTK, and cancer)',
      'Unit 5: Developmental Biology (Fertilization, morphogenesis, vulva induction, and plant embryogenesis)',
      'Unit 6 & 7: System Physiology — Plant and Animal',
      'Unit 8: Inheritance Biology (Gene mapping, pedigree, and non-Mendelian inheritance)',
      'Unit 13: Methods in Biology (Molecular cloning, microarrays, FACS, NMR, X-ray, patch clamp, and biostatistics)',
    ],
    preparationStrategy: {
      en: [
        'Part C is the kingmaker: 25 questions provide 100 marks (50% of the paper) with an unprecedented 75-question menu. Focus deeply on 6-7 chosen units to secure 20+ correct analytical answers.',
        'Master Unit 13 (Methods in Biology) as experimental techniques appear persistently in both Part B and Part C.',
        'Analyze past 10 years Part C questions to become accustomed to complex pedigree charts, blot autoradiographs, and inhibitor kinetics graphs.',
      ],
      hinglish: [
        'Part C sabse deciding factor hai—isme 75 me se sirf 25 questions select karne hain jo 100 marks (50% paper) carry karte hain.',
        'Unit 13 (Methods in Biology) ko priority dein kyunki techniques se direct aur conceptual dono tarah ke questions aate hain.',
        'Data analysis, graphs, aur hypothesis testing wale questions ko regularly practice karein negative marking se bachne ke liye.',
      ],
    },
  },
];
