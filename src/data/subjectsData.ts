import { Subject, Unit, TopicDetail } from '../types/index.ts';

export const CORE_SUBJECTS: Subject[] = [
  {
    id: 'sub-01',
    slug: 'cell-biology',
    name: {
      en: 'Cell Biology',
      hinglish: 'Cell Biology (Koshika Vigyan)',
    },
    description: {
      en: 'Structural and functional organization of eukaryotic and prokaryotic cells, membrane transport, organelle biogenesis, signaling pathways, and cell cycle checkpoints.',
      hinglish: 'Eukaryotic aur prokaryotic cells ka structural aur functional organization, membrane transport, cell organelles, signal transduction, aur cell cycle regulation.',
    },
    icon: 'Layers',
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 1,
    overview: {
      en: 'Cell Biology is the fundamental bedrock of all biotechnological inquiry. It deals with subcellular architecture, dynamic biomembrane fluidity, vesicular trafficking via Golgi and ER, cytoskeletal mechanics, and apoptotic cascades crucial for biomanufacturing and cellular engineering.',
      hinglish: 'Cell biology biotechnology ki basic foundation hai. Isme hum membrane dynamics, organelles ke internal functions, signal transduction pathways, aur cell division mechanisms ko detail me samjhte hain jo disease modeling aur biotechnology research me use hote hain.',
    },
    learningObjectives: {
      en: [
        'Understand phospholipid bilayer dynamics and transport kinetics across selective membranes',
        'Analyze protein sorting pathways between Endoplasmic Reticulum, Golgi complex, and lysosomes',
        'Examine G-protein coupled receptor (GPCR) and Receptor Tyrosine Kinase (RTK) signal transduction cascades',
        'Trace cell cycle control points (Cyclins, CDKs) and apoptotic intrinsic/extrinsic pathways',
      ],
      hinglish: [
        'Cell membrane ki structure aur selective transport mechanisms ko accurately samajhna',
        'Protein sorting aur intracellular vesicular transport pathways ko trace karna',
        'GPCR aur RTK signaling cascades ke molecular switches ko master karna',
        'Cell cycle checkpoints (Cyclin-CDK complex) aur apoptosis pathways ko verify karna',
      ],
    },
    keyFormulas: [
      {
        name: 'Nernst Equation (Membrane Potential)',
        formula: 'E = (RT / zF) * ln([Ion]_out / [Ion]_in)',
        description: {
          en: 'Calculates the equilibrium electrical potential across an ion-permeable cell membrane.',
          hinglish: 'Cell membrane ke across electrochemical equilibrium potential calculate karne ke liye use hota hai.',
        },
      },
    ],
    references: [
      { citation: 'Alberts B. et al. Molecular Biology of the Cell. 7th Edition, W. W. Norton & Company.', type: 'Book', year: 2022 },
      { citation: 'Lodish H. et al. Molecular Cell Biology. 9th Edition, Macmillan Learning.', type: 'Book', year: 2021 },
    ],
  },
  {
    id: 'sub-02',
    slug: 'biochemistry',
    name: {
      en: 'Biochemistry',
      hinglish: 'Biochemistry (Jaiv Rasayan)',
    },
    description: {
      en: 'Thermodynamics of biological systems, structure and conformational kinetics of proteins, carbohydrate metabolism, lipid biosynthesis, and enzyme kinetics.',
      hinglish: 'Biological systems ki thermodynamics, proteins ki 3D conformational dynamics, enzyme kinetics, glycolysis, Krebs cycle, aur lipid metabolism.',
    },
    icon: 'Atom',
    unitsCount: 4,
    topicsCount: 18,
    orderIndex: 2,
    overview: {
      en: 'Biochemistry bridges molecular architecture with cellular bioenergetics. It explores amino acid ionization, Ramachandran steric constraints, steady-state enzyme mechanics, and ATP generation via the mitochondrial electron transport chain.',
      hinglish: 'Biochemistry biomolecules ke chemical structure aur energy conversions ko explain karti hai. Isme amino acids ke Ramachandran plots, Michaelis-Menten enzyme kinetics, aur metabolic pathways jaise Glycolysis aur oxidative phosphorylation detailed covered hain.',
    },
    learningObjectives: {
      en: [
        'Calculate steady-state enzyme kinetics parameters using Michaelis-Menten and Lineweaver-Burk transformations',
        'Analyze protein folding free-energy landscapes, secondary motifs, and tertiary stabilization bonds',
        'Trace carbon flux through Glycolysis, TCA cycle, Gluconeogenesis, and Pentose Phosphate Pathway',
        'Compute Gibbs free energy changes (delta G) for bioenergetic reactions in mitochondrial oxidative phosphorylation',
      ],
      hinglish: [
        'Michaelis-Menten equation aur Lineweaver-Burk plots se Km aur Vmax accurately nikalna',
        'Proteins ke secondary structure (alpha-helix, beta-sheet) aur Ramachandran plot angles ko analyze karna',
        'Central metabolic pathways (Glycolysis, Krebs cycle, ETC) me ATP balance sheet calculate karna',
        'Enzyme inhibition types (Competitive, Non-competitive, Uncompetitive) me Lineweaver-Burk shifts samajhna',
      ],
    },
    keyFormulas: [
      {
        name: 'Michaelis-Menten Equation',
        formula: 'v0 = (Vmax * [S]) / (Km + [S])',
        description: {
          en: 'Relates reaction velocity to substrate concentration for hyperbolic single-substrate enzymes.',
          hinglish: 'Substrate concentration aur enzyme reaction speed ke relationship ko describe karta hai.',
        },
      },
      {
        name: 'Henderson-Hasselbalch Equation',
        formula: 'pH = pKa + log([A-] / [HA])',
        description: {
          en: 'Determines the pH of a physiological buffer solution based on conjugate base/acid ratio.',
          hinglish: 'Biological buffers me acid-base conjugate ratio se buffer pH calculate karne ke liye formula.',
        },
      },
    ],
    references: [
      { citation: 'Nelson D.L. & Cox M.M. Lehninger Principles of Biochemistry. 8th Edition, W. H. Freeman.', type: 'Book', year: 2021 },
      { citation: 'Voet D. & Voet J.G. Biochemistry. 5th Edition, John Wiley & Sons.', type: 'Book', year: 2016 },
    ],
  },
  {
    id: 'sub-03',
    slug: 'genetics',
    name: {
      en: 'Genetics',
      hinglish: 'Genetics (Anuvanshiki)',
    },
    description: {
      en: 'Mendelian principles, gene mapping, recombination frequency, chromosome aberrations, sex linkage, non-Mendelian inheritance, and population genetics.',
      hinglish: 'Mendel ke laws, gene mapping, linkage aur recombination, chromosomal aberrations, sex-linked traits, aur Hardy-Weinberg population genetics.',
    },
    icon: 'GitFork',
    unitsCount: 4,
    topicsCount: 14,
    orderIndex: 3,
    overview: {
      en: 'Genetics explores the rules of biological inheritance, chromosomal transmission, pedigree patterns, and allelic variations that guide selective breeding, quantitative genetics, and human disease mapping.',
      hinglish: 'Genetics me hum genetic traits ke transmission patterns, linkage analysis, chromosome mapping via three-point test cross, aur population me allele frequency changes ko study karte hain.',
    },
    learningObjectives: {
      en: [
        'Determine gene order and map distances using three-point testcross data and coefficient of coincidence',
        'Interpret complex pedigrees for autosomal, sex-linked, and mitochondrial inheritance patterns',
        'Evaluate chromosomal numerical (aneuploidy) and structural mutations (inversions, translocations)',
        'Calculate allele and genotype frequencies under Hardy-Weinberg equilibrium conditions',
      ],
      hinglish: [
        'Three-point test cross se gene sequence aur centimorgan (cM) distance calculate karna',
        'Pedigree charts me dominant, recessive, aur sex-linked inheritance distinguish karna',
        'Hardy-Weinberg equilibrium formula (p^2 + 2pq + q^2 = 1) apply karke allele frequencies nikalna',
        'Chromosomal mutations jaise Robertsonian translocation aur non-disjunction ko identify karna',
      ],
    },
    keyFormulas: [
      {
        name: 'Hardy-Weinberg Equilibrium',
        formula: 'p^2 + 2pq + q^2 = 1 ; p + q = 1',
        description: {
          en: 'Describes stable genotype distributions in a randomly mating, non-evolving diploid population.',
          hinglish: 'Diploid population me allele frequencies aur genotype proportions calculate karne ka law.',
        },
      },
      {
        name: 'Recombination Frequency (Map Distance)',
        formula: 'RF (%) = (Number of Recombinants / Total Progeny) * 100',
        description: {
          en: 'Calculates the distance between two linked loci in map units (centimorgans, cM).',
          hinglish: 'Do linked genes ke beech centimorgan distance find karne ka standard formula.',
        },
      },
    ],
    references: [
      { citation: 'Griffiths A.J.F. et al. Introduction to Genetic Analysis. 12th Edition, W. H. Freeman.', type: 'Book', year: 2020 },
      { citation: 'Pierce B.A. Genetics: A Conceptual Approach. 7th Edition, W. H. Freeman.', type: 'Book', year: 2020 },
    ],
  },
  {
    id: 'sub-04',
    slug: 'molecular-biology',
    name: {
      en: 'Molecular Biology',
      hinglish: 'Molecular Biology (Anvik Jeev Vigyan)',
    },
    description: {
      en: 'Replication mechanics, transcription, RNA processing, translation, the genetic code, DNA repair mechanisms, and prokaryotic/eukaryotic gene regulation.',
      hinglish: 'DNA replication, transcription, RNA splicing, translation, operon systems (lac, trp), epigenetic modifications, aur DNA repair mechanisms.',
    },
    icon: 'Dna',
    unitsCount: 4,
    topicsCount: 18,
    orderIndex: 4,
    overview: {
      en: 'Molecular Biology deciphers the central dogma of life: DNA replication fidelity, RNA synthesis via Pol I/II/III, post-transcriptional capping and splicing, translation elongation on the ribosome, and molecular switches governing gene expression.',
      hinglish: 'Molecular biology Central Dogma (DNA -> RNA -> Protein) ki molecular machinery explain karti hai. Isme proofreading, telomerase action, lac aur trp operon repression, aur eukaryotic chromatin remodeling key topics hain.',
    },
    learningObjectives: {
      en: [
        'Analyze replication fork architecture, leading/lagging strand synthesis, and telomere maintenance',
        'Compare prokaryotic promoter recognition by sigma factors with eukaryotic basal transcription factors',
        'Understand pre-mRNA 5-capping, 3-polyadenylation, spliceosome assembly, and alternative splicing',
        'Examine translation ribosomal decoding, peptide bond synthesis, and antibiotic translation inhibitors',
      ],
      hinglish: [
        'DNA replication fork pe DNA Pol III, helicase, primase, aur ligase ke coordination ko master karna',
        'Prokaryotic sigma factors aur eukaryotic transcription factor (TFIID, TFIIH) initiation steps samajhna',
        'Spliceosome ke snRNPs (U1, U2, U4/U6, U5) dwara intron removal process ko trace karna',
        'Lac operon me allolactose induction aur catabolite activator protein (CAP-cAMP) activation analyze karna',
      ],
    },
    keyFormulas: [
      {
        name: 'DNA Supercoiling Topological Invariant',
        formula: 'Lk = Tw + Wr',
        description: {
          en: 'Linking number (Lk) equals twist (Tw) plus writhe (Wr) in covalently closed circular DNA.',
          hinglish: 'Closed circular DNA me topology explain karta hai: Linking number = Twist + Writhe.',
        },
      },
    ],
    references: [
      { citation: 'Watson J.D. et al. Molecular Biology of the Gene. 7th Edition, Pearson.', type: 'Book', year: 2013 },
      { citation: 'Krebs J.E., Goldstein E.S., Kilpatrick S.T. Lewin\'s GENES XII. Jones & Bartlett Learning.', type: 'Book', year: 2017 },
    ],
  },
  {
    id: 'sub-05',
    slug: 'microbiology',
    name: {
      en: 'Microbiology',
      hinglish: 'Microbiology (Sukshmjeev Vigyan)',
    },
    description: {
      en: 'Microbial taxonomy, bacterial cell wall ultrastructure, microbial growth kinetics, sterilization protocols, viral architecture and replication, and antimicrobial resistance.',
      hinglish: 'Bacterial cell wall structure, microbial growth curves, culture media types, sterilization techniques, bacteriophage lifecycles, aur antibiotic resistance mechanisms.',
    },
    icon: 'Bug',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 5,
    overview: {
      en: 'Microbiology explores the physiology, genetics, and ecology of bacteria, archaea, fungi, and viruses, with applications spanning antibiotic fermentation, bioremediation, and industrial biocatalysis.',
      hinglish: 'Microbiology me hum microorganisms ki growth dynamics, gram-positive vs gram-negative cell wall composition, endospore resistance, lytic/lysogenic cycles, aur autoclaving sterilization standards ko examine karte hain.',
    },
    learningObjectives: {
      en: [
        'Calculate bacterial specific growth rate (mu), doubling time, and yield coefficients in batch culture',
        'Contrast Gram-positive peptidoglycan-teichoic wall with Gram-negative outer membrane LPS architecture',
        'Understand mechanism of action of beta-lactams, aminoglycosides, quinolones, and macrolides',
        'Evaluate thermal death time (TDT) and decimal reduction time (D-value) in sterilization processes',
      ],
      hinglish: [
        'Bacterial doubling time (td = ln 2 / mu) aur generation time batch culture me compute karna',
        'Gram stain principle aur Gram-negative periplasmic space vs Gram-positive peptidoglycan analyze karna',
        'Antibiotic resistance mechanisms jaise beta-lactamase production aur efflux pumps samajhna',
        'Autoclave validation (121 degree C at 15 psi for 15-20 min) aur D-value calculations verify karna',
      ],
    },
    keyFormulas: [
      {
        name: 'Specific Growth Rate & Doubling Time',
        formula: 'ln(X_t / X_0) = mu * t ; td = ln(2) / mu = 0.693 / mu',
        description: {
          en: 'Models exponential biomass growth rate and generation doubling time in microbial culture.',
          hinglish: 'Microbial batch culture me biomass increase aur doubling time nikalne ka mathematical formula.',
        },
      },
    ],
    references: [
      { citation: 'Madigan M.T. et al. Brock Biology of Microorganisms. 16th Edition, Pearson.', type: 'Book', year: 2021 },
      { citation: 'Prescott L.M., Harley J.P., Klein D.A. Microbiology. McGraw-Hill.', type: 'Book', year: 2019 },
    ],
  },
  {
    id: 'sub-06',
    slug: 'immunology',
    name: {
      en: 'Immunology',
      hinglish: 'Immunology (Pratraksha Vigyan)',
    },
    description: {
      en: 'Innate vs adaptive immunity, antigen-antibody interactions, V(D)J recombination, MHC class I and II antigen presentation, complement activation pathways, and monoclonal antibody production.',
      hinglish: 'Innate aur adaptive immunity, antibody structure, V(D)J somatic recombination, MHC presentation, classical/alternative complement pathways, aur hybridoma monoclonal technology.',
    },
    icon: 'Shield',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 6,
    overview: {
      en: 'Immunology analyzes host defense systems against pathogens, immunoglobulin diversity generated by RAG-mediated rearrangement, cytokine signaling networks, and diagnostic immunochemical assays like ELISA and Western blotting.',
      hinglish: 'Immunology immune system ke cellular aur humoral arms ko explain karta hai. Isme B-cell receptor (BCR) aur T-cell receptor (TCR) development, clonal selection, hybridoma technique, aur autoimmune hypersensitivity reactions detailed cover hote hain.',
    },
    learningObjectives: {
      en: [
        'Diagram the structural domains of IgG, IgM, IgA, IgE, IgD and their respective effector functions',
        'Trace the V(D)J gene segment recombination catalyzed by RAG1/2 and TdT for antibody diversity',
        'Differentiate MHC Class I (endogenous peptide) and MHC Class II (exogenous peptide) presentation pathways',
        'Compare the Classical, Lectin, and Alternative complement pathways culminating in MAC pore assembly',
      ],
      hinglish: [
        'Antibody classes (IgG, IgM, etc.) ke Fc aur Fab regions aur unke biological functions samajhna',
        'V(D)J recombination aur junctional diversity se billions of antibodies create hone ka molecular basis',
        'MHC Class I (CD8+ CTL) aur MHC Class II (CD4+ Th cells) ke antigen presentation differences note karna',
        'ELISA, Western Blotting, aur Hybridoma technology ke experimental steps aur trouble shooting master karna',
      ],
    },
    keyFormulas: [
      {
        name: 'Antibody-Antigen Scatchard Equation',
        formula: 'r / [L] = n * Ka - r * Ka',
        description: {
          en: 'Determines the affinity constant (Ka) and number of binding sites (n) in antibody-antigen equilibrium.',
          hinglish: 'Antibody aur antigen ke beech affinity constant aur valence sites calculate karne ka equation.',
        },
      },
    ],
    references: [
      { citation: 'Punt J., Stranford S., Jones P., Owen J.A. Kuby Immunology. 8th Edition, W. H. Freeman.', type: 'Book', year: 2018 },
      { citation: 'Murphy K. & Weaver C. Janeway\'s Immunobiology. 9th Edition, Garland Science.', type: 'Book', year: 2016 },
    ],
  },
  {
    id: 'sub-07',
    slug: 'recombinant-dna-technology',
    name: {
      en: 'Genetic Engineering & rDNA Technology',
      hinglish: 'Genetic Engineering & rDNA Technology',
    },
    description: {
      en: 'Restriction enzymes, cloning vectors, cDNA and genomic libraries, PCR amplification variations, CRISPR-Cas9 genome editing, site-directed mutagenesis, and recombinant expression systems.',
      hinglish: 'Restriction endonucleases, plasmids aur expression vectors, PCR variations (RT-PCR, qPCR), CRISPR-Cas9 gene editing, DNA sequencing methods, aur recombinant protein purification.',
    },
    icon: 'Cpu',
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 7,
    overview: {
      en: 'Genetic Engineering provides the molecular toolkit to isolate, recombine, alter, and express foreign genetic material in host systems. It underpins recombinant therapeutics, transgenic crops, and CRISPR precision editing.',
      hinglish: 'Recombinant DNA technology modern biotechnology ka core engineering tool hai. Isme restriction mapping, plasmid cloning, Sanger vs Next-Generation Sequencing, aur CRISPR-Cas9 molecular scissors ke mechanisms ko detail me prepare karte hain.',
    },
    learningObjectives: {
      en: [
        'Analyze restriction endonuclease cleavage types, isoschizomers, and cohesive vs blunt ligation',
        'Evaluate cloning and expression vector elements: MCS, strong promoters (T7, lacUV5), selectable markers, and affinity tags (His-tag, GST)',
        'Design forward and reverse PCR primers with optimal Tm, GC-content, and zero self-complementarity',
        'Explain CRISPR-Cas9 sgRNA guided double-strand break repair via NHEJ and HDR pathways',
      ],
      hinglish: [
        'Restriction enzymes ke cutting patterns aur blunt vs sticky ends ligation kinetics samajhna',
        'Expression vectors me promoter strength, RBS alignment, aur His-tag purification protocols master karna',
        'PCR primer design rules (Tm calculation, GC% 40-60%, primer-dimer prevention) execute karna',
        'CRISPR-Cas9 guide RNA design, PAM sequence recognition, aur targeted gene knockout mechanisms trace karna',
      ],
    },
    keyFormulas: [
      {
        name: 'PCR Primer Melting Temperature (Tm - Wallace Rule)',
        formula: 'Tm = 2 * (A + T) + 4 * (G + C)  (for oligonucleotides < 20 bp)',
        description: {
          en: 'Estimates primer melting temperature for setting optimal PCR annealing steps.',
          hinglish: 'Short oligonucleotides ke liye approximate melting temperature calculate karne ka formula.',
        },
      },
    ],
    references: [
      { citation: 'Brown T.A. Gene Cloning and DNA Analysis: An Introduction. 8th Edition, Wiley-Blackwell.', type: 'Book', year: 2020 },
      { citation: 'Primrose S.B. & Twyman R. Principles of Gene Manipulation and Genomics. 7th Edition, Blackwell.', type: 'Book', year: 2006 },
    ],
  },
  {
    id: 'sub-08',
    slug: 'bioprocess-engineering',
    name: {
      en: 'Bioprocess Engineering',
      hinglish: 'Bioprocess Engineering (Jaiv Prakram Abhiyantriki)',
    },
    description: {
      en: 'Upstream processing, media formulation, bioreactor design (STR, airlift, packed bed), oxygen mass transfer (kLa), scale-up criteria, and downstream product recovery.',
      hinglish: 'Bioreactor design, oxygen mass transfer rate (kLa), fermentation kinetics (Monod model), sterilization kinetics, cell disruption, chromatography, aur downstream purification.',
    },
    icon: 'FlaskConical',
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 8,
    overview: {
      en: 'Bioprocess Engineering translates laboratory discoveries into commercial-scale biomanufacturing. It combines fluid dynamics, mass and heat transfer, stoichiometry of growth, and multi-stage downstream separation to produce vaccines, biofuels, and therapeutic proteins.',
      hinglish: 'Bioprocess engineering lab-scale discoveries ko industrial scale production me convert karta hai. Isme stirred tank bioreactor mechanics, kLa determination (dynamic gassing out method), aur downstream operations (centrifugation, ultrafiltration, chromatography) center stage hain.',
    },
    learningObjectives: {
      en: [
        'Calculate oxygen transfer rate (OTR) and volumetric mass transfer coefficient (kLa) in aerated stirred tanks',
        'Model microbial growth and substrate consumption using Monod kinetic equations in batch and chemostat cultures',
        'Design continuous media sterilization heat exchangers using Del factor calculations',
        'Optimize downstream processing sequence: cell disruption, flocculation, membrane filtration, and chromatography',
      ],
      hinglish: [
        'Volumetric mass transfer coefficient (kLa) aur Oxygen Transfer Rate (OTR) numerically solve karna',
        'Chemostat me steady-state dilution rate (D = mu) aur critical dilution rate (D_crit) calculate karna',
        'Medium sterilization me Del factor (ln(N0 / N)) aur thermal death kinetics design karna',
        'Downstream purification me yield, purification fold, aur chromatography resolution optimize karna',
      ],
    },
    keyFormulas: [
      {
        name: 'Monod Equation for Microbial Growth',
        formula: 'mu = (mu_max * S) / (Ks + S)',
        description: {
          en: 'Models specific growth rate as a function of growth-limiting substrate concentration.',
          hinglish: 'Substrate concentration ke respect me specific microbial growth rate calculate karne ka equation.',
        },
      },
      {
        name: 'Oxygen Transfer Rate (OTR)',
        formula: 'OTR = kLa * (C* - CL)',
        description: {
          en: 'Defines the rate of oxygen transfer from gas bubbles into liquid fermentation broth.',
          hinglish: 'Fermentation broth me dissolved oxygen transfer rate find karne ka fundamental formula.',
        },
      },
    ],
    references: [
      { citation: 'Doran P.M. Bioprocess Engineering Principles. 2nd Edition, Academic Press.', type: 'Book', year: 2012 },
      { citation: 'Shuler M.L., Kargi F., DeLisa M. Bioprocess Engineering: Basic Concepts. 3rd Edition, Prentice Hall.', type: 'Book', year: 2017 },
    ],
  },
  {
    id: 'sub-09',
    slug: 'bioinformatics',
    name: {
      en: 'Bioinformatics',
      hinglish: 'Bioinformatics (Jaiv Soochna Vigyan)',
    },
    description: {
      en: 'Biological databases (NCBI, UniProt, PDB), pairwise alignment (Needleman-Wunsch, Smith-Waterman), BLAST algorithm, multiple sequence alignment, phylogenetics, and protein structure modeling.',
      hinglish: 'NCBI, UniProt, PDB databases, sequence alignment algorithms (Needleman-Wunsch, Smith-Waterman, BLAST), phylogenetic trees, scoring matrices (PAM, BLOSUM), aur protein structure prediction.',
    },
    icon: 'Binary',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 9,
    overview: {
      en: 'Bioinformatics combines computer science, statistics, and molecular biology to store, retrieve, align, and model genomic and proteomic data. It forms the computational foundation for modern genomics and rational drug discovery.',
      hinglish: 'Bioinformatics computational tools ke through massive biological data ko analyze karti hai. Isme pairwise sequence alignment matrices (PAM vs BLOSUM), BLAST E-value calculations, molecular docking, aur phylogenetic tree construction core topics hain.',
    },
    learningObjectives: {
      en: [
        'Differentiate dynamic programming algorithms: Needleman-Wunsch (global) vs Smith-Waterman (local)',
        'Interpret scoring matrices: PAM (evolutionary divergence model) vs BLOSUM (blocks of conserved sequences)',
        'Evaluate BLAST statistical significance: bit score, raw score, and Expectation value (E-value)',
        'Construct and interpret phylogenetic trees using distance (UPGMA, NJ) and character-based methods',
      ],
      hinglish: [
        'Needleman-Wunsch global alignment aur Smith-Waterman local alignment grid matrices build karna',
        'BLOSUM62 vs PAM250 matrices ke use cases aur log-odds scoring schemes distinguish karna',
        'BLAST search output me E-value ka biological significance aur false positive filtering samajhna',
        'Phylogenetic tree methods (UPGMA, Neighbor-Joining, Maximum Parsimony) ke concepts compare karna',
      ],
    },
    keyFormulas: [
      {
        name: 'BLAST Expectation Value (E-value)',
        formula: 'E = K * m * n * e^(-lambda * S)',
        description: {
          en: 'Computes the number of expected chance alignments with a given score in database of size n.',
          hinglish: 'Database search me random chance matches ki probability estimate karne ka formula.',
        },
      },
    ],
    references: [
      { citation: 'Mount D.W. Bioinformatics: Sequence and Genome Analysis. 2nd Edition, CSHL Press.', type: 'Book', year: 2004 },
      { citation: 'Pevsner J. Bioinformatics and Functional Genomics. 3rd Edition, Wiley-Blackwell.', type: 'Book', year: 2015 },
    ],
  },
  {
    id: 'sub-10',
    slug: 'plant-animal-biotechnology',
    name: {
      en: 'Plant & Animal Biotechnology',
      hinglish: 'Plant & Animal Biotechnology',
    },
    description: {
      en: 'Totipotency, plant tissue culture media (MS medium), Agrobacterium-mediated gene transfer, transgenic crop traits, animal cell culture protocols, stem cell therapy, and transgenic animal models.',
      hinglish: 'Plant tissue culture, MS media formulation, Agrobacterium tumefaciens Ti plasmid transfer, Bt crops, animal cell culture passaging, primary vs continuous cell lines, stem cells, aur transgenics.',
    },
    icon: 'Sprout',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 10,
    overview: {
      en: 'Plant & Animal Biotechnology harnesses cellular totipotency and genetic manipulation to boost crop resilience, engineer pest-resistant cultivars, produce pharmaceutical biologics in mammalian bioreactors, and advance regenerative medicine.',
      hinglish: 'Plant and Animal Biotechnology agricultural yield improvement aur biopharmaceutical manufacturing se related hai. Isme Agrobacterium T-DNA integration, micropropagation, cryopreservation of germplasm, aur animal cell culture media (DMEM/FBS) critical subjects hain.',
    },
    learningObjectives: {
      en: [
        'Formulate Murashige and Skoog (MS) media components, balancing auxin-to-cytokinin organogenesis ratios',
        'Detail Agrobacterium tumefaciens Ti plasmid vir gene induction (acetosyringone) and T-DNA nuclear integration',
        'Analyze transgenic crop strategies: Bt Cry toxin specificity, Golden Rice provitamin A synthesis, and herbicide tolerance',
        'Manage mammalian cell culture parameters: serum-free vs serum-containing media, contact inhibition, and cryopreservation in DMSO',
      ],
      hinglish: [
        'Auxin aur cytokinin ratio se shoot vs root differentiation (Skoog-Miller hypothesis) control karna',
        'Agrobacterium vir genes (virA, virG, virD1/D2, virE) ka molecular induction aur T-DNA transfer trace karna',
        'Bt cotton me Cry endotoxin mechanism aur pest gut receptor binding study karna',
        'Animal cell culture maintenance: trypsinization, doubling time, contamination prevention, aur liquid nitrogen storage',
      ],
    },
    keyFormulas: [
      {
        name: 'Cell Viability Trypan Blue Dye Exclusion',
        formula: 'Viability (%) = (Total Viable Cells (Unstained) / Total Cells) * 100',
        description: {
          en: 'Calculates percentage of viable cells in hemocytometer count using dye exclusion.',
          hinglish: 'Hemocytometer me live unstained cells aur dead stained cells se cell viability percentage nikalna.',
        },
      },
    ],
    references: [
      { citation: 'Slater A., Scott N.W., Fowler M.R. Plant Biotechnology. 2nd Edition, Oxford University Press.', type: 'Book', year: 2008 },
      { citation: 'Freshney R.I. Culture of Animal Cells: A Manual of Basic Technique and Specialized Applications. 7th Edition, Wiley-Blackwell.', type: 'Book', year: 2015 },
    ],
  },
  {
    id: 'sub-11',
    slug: 'ipr-biosafety',
    name: {
      en: 'IPR, Bioethics & Biosafety',
      hinglish: 'IPR, Bioethics & Biosafety',
    },
    description: {
      en: 'Patentability criteria, TRIPS agreement, Budapest Treaty, recombinant DNA safety guidelines, Cartagena Protocol on Biosafety, RCGM and GEAC regulatory frameworks in India, and ethical implications of gene editing.',
      hinglish: 'Patents, copyright, trademarks, patentability criteria (novelty, inventive step, utility), Budapest Treaty on microorganism deposit, Biosafety levels (BSL-1 to BSL-4), aur India me RCGM/GEAC regulatory approvals.',
    },
    icon: 'Scale',
    unitsCount: 4,
    topicsCount: 12,
    orderIndex: 11,
    overview: {
      en: 'IPR and Biosafety governs the legal protection and ethical stewardship of biotechnological inventions. It establishes international containment standards (BSL-1 to BSL-4), risk assessment protocols for Genetically Modified Organisms (GMOs), and national regulatory clearances.',
      hinglish: 'IPR aur Biosafety research ko legally secure aur environmentally safe banata hai. Isme patent filing guidelines, microorganism deposit requirements under Budapest treaty, BSL containment levels, aur India me GEAC aur RCGM approval procedures essential hain.',
    },
    learningObjectives: {
      en: [
        'Evaluate the tripartite criteria of patentability: Novelty, Non-obviousness (Inventive step), and Industrial applicability',
        'Understand the Budapest Treaty provisions on the international recognition of the deposit of microorganisms for patent procedures',
        'Categorize Biosafety Levels (BSL-1 through BSL-4) based on agent risk group, air containment, and PPE protocols',
        'Analyze the Indian regulatory hierarchy: Institutional Biosafety Committee (IBSC), RCGM, and Genetic Engineering Appraisal Committee (GEAC)',
      ],
      hinglish: [
        'Patentability ke 3 core requirements (Novelty, Inventive step, Industrial utility) ko verify karna',
        'Budapest Treaty ke antargat international depository authorities (IDAs) me microbial strain submission samajhna',
        'BSL-1 se BSL-4 containment facilities ke engineering controls (HEPA filters, negative pressure) compare karna',
        'India me recombinant therapeutics aur GMO crops approval ke liye IBSC, RCGM, aur GEAC roles master karna',
      ],
    },
    keyFormulas: [
      {
        name: 'Risk Assessment Factor (Biosafety)',
        formula: 'Risk = Severity of Hazard * Likelihood of Exposure',
        description: {
          en: 'Standard qualitative framework used in GMO environmental and laboratory risk assessment.',
          hinglish: 'Laboratory containment aur GMO field trials me risk index calculate karne ka protocol.',
        },
      },
    ],
    references: [
      { citation: 'Department of Biotechnology (DBT), Government of India. Regulations and Guidelines for Recombinant DNA Research and Biocontainment.', type: 'Standard Reference', year: 2017 },
      { citation: 'World Intellectual Property Organization (WIPO). WIPO Intellectual Property Handbook.', type: 'Standard Reference', year: 2004 },
    ],
  },
];

export const SAMPLE_TOPIC_DETAILS: Record<string, TopicDetail> = {
  'dna-replication-in-prokaryotes': {
    slug: 'dna-replication-in-prokaryotes',
    subjectSlug: 'molecular-biology',
    title: {
      en: 'DNA Replication in Prokaryotes: Molecular Architecture and Fidelity',
      hinglish: 'Prokaryotes me DNA Replication: Molecular Machinery aur Fidelity',
    },
    difficulty: 'Intermediate',
    readTimeMin: 12,
    definitions: [
      {
        term: 'OriC',
        en: 'The singular 245 bp chromosomal origin of replication in E. coli containing three 13-mer AT-rich repeats and five 9-mer DnaA binding boxes.',
        hinglish: 'E. coli chromosome ka specific 245 bp origin sequence jisme three 13-mer AT-rich repeats aur five 9-mer DnaA binding sites hote hain.',
      },
      {
        term: 'DnaB Helicase',
        en: 'A hexameric ring-shaped molecular motor that unwinds duplex DNA processively in the 5\' to 3\' direction using ATP hydrolysis.',
        hinglish: 'Hexameric ring shape enzyme jo ATP hydrolysis se DNA double helix ko 5\' to 3\' direction me open karta hai.',
      },
      {
        term: 'DNA Polymerase III Holoenzyme',
        en: 'The primary replicative enzyme in E. coli featuring high processivity conferred by the beta-sliding clamp and 3\'->5\' proofreading exonuclease activity in the epsilon subunit.',
        hinglish: 'E. coli ka main replicating enzyme jisme beta clamp processivity deta hai aur epsilon subunit 3\' to 5\' proofreading karta hai.',
      },
    ],
    content: {
      en: {
        introduction: 'DNA replication in Escherichia coli represents the archetype of bidirectional, semiconservative chromosome duplication. Initiating at the designated oriC locus, replication proceeds bidirectionally with asymmetric synthesis at the replication fork, achieving near-perfect fidelity (one error per 10^9 to 10^10 base pairs).',
        mechanism: [
          'Initiation: Approximately 20-30 DnaA-ATP protomers assemble cooperatively on the 9-mer repeats of oriC, introducing positive superhelical strain that induces spontaneous unwinding of the AT-rich 13-mer tandem repeats.',
          'Helicase Loading: DnaC chaperones load two hexameric DnaB helicase rings onto the single-stranded open complex in opposite orientations, activating bidirectional fork unwinding.',
          'Priming: DnaG primase transiently associates with DnaB to synthesize short 10-12 nucleotide RNA primers complementary to template strands.',
          'Elongation: DNA Polymerase III holoenzyme core synthesizes the leading strand continuously 5\'->3\', while the lagging strand undergoes discontinuous synthesis resulting in 1000-2000 nt Okazaki fragments.',
          'Maturation & Ligation: DNA Polymerase I utilizes 5\'->3\' exonuclease (Nick Translation) to excise RNA primers while polymerizing replacement DNA; DNA Ligase catalyzes phosphodiester bond closure via NAD+ activation.',
          'Termination: Replication forks converge at the ter clusters where Tus protein locks fork progression in a polar fashion, followed by Type II Topoisomerase (DNA Gyrase) decatenation of daughter chromosomes.',
        ],
        pathwaySteps: [
          'DnaA binding to 9-mers -> Melting of 13-mer AT-rich region',
          'DnaC-dependent DnaB hexamer recruitment',
          'SSB protein stabilization of single-stranded DNA',
          'DnaG primase synthesis of RNA primers',
          'Beta-clamp loading via clamp loader complex (gamma-complex)',
          'Continuous leading strand & discontinuous Okazaki lagging synthesis',
          'Pol I nick translation & DNA Ligase seal',
          'Tus-Ter arrest & Topoisomerase IV decatenation',
        ],
        keyPoints: [
          'Replication polarity is strictly 5\' to 3\' because DNA polymerases require a free 3\'-OH group for nucleophilic attack on the alpha-phosphate of incoming dNTPs.',
          'The beta-sliding clamp converts DNA Pol III from a low-processivity enzyme (<15 nt/binding) into an engine capable of continuous synthesis (>50,000 nt/binding).',
          'Proofreading occurs via the 3\'->5\' exonuclease residing in the epsilon subunit of the Pol III core, reducing error frequency 100- to 1000-fold.',
          'Dam methylase methylates adenines in GATC palindromes, allowing MutHLS mismatch repair to differentiate newly synthesized unmethylated daughter strands from methylated parent templates.',
        ],
        applications: [
          'Designing targeted antibiotic inhibitors (e.g. Ciprofloxacin targeting DNA Gyrase; Novobiocin targeting GyrB).',
          'High-fidelity PCR amplification protocols utilizing Pfu/Phusion polymerases with intact proofreading.',
          'Engineered plasmid vector replication systems in industrial bacterial fermentations.',
        ],
        revisionNotes: [
          'DnaA: Initiator protein (binds oriC 9-mers)',
          'DnaB: Replicative Helicase (5\'->3\' direction, hexameric)',
          'DnaC: Helicase loader chaperone',
          'DnaG: Primase (synthesizes RNA primer)',
          'Pol III: Replicative polymerase (alpha=polymerase, epsilon=3\'->5\' exonuclease, theta=assembly)',
          'Beta-clamp: Sliding ring for ultra-high processivity',
          'Pol I: Primer removal (5\'->3\' exonuclease) + gap filling',
          'Ligase: Phosphodiester sealing using NAD+ in bacteria',
          'Tus: Termination protein at Ter sites (contra-helicase activity)',
        ],
      },
      hinglish: {
        introduction: 'Prokaryotes (jaise E. coli) me DNA replication bidirectional aur semiconservative hoti hai. Ye process oriC site se initiate hoti hai aur dono directions me continuous leading strand aur discontinuous lagging strand banati hai with extreme high fidelity.',
        mechanism: [
          'Initiation: DnaA protein oriC ke 9-mer sequences par bind karta hai, jisse 13-mer AT-rich region open ho jata hai.',
          'Helicase Loading: DnaC loader DnaB helicase ko single stranded region par load karta hai jo DNA duplex ko unwind karta hai.',
          'Priming: DnaG primase short 10-12 nt ke RNA primers banata hai jo DNA polymerase ko initial 3\'-OH group dete hain.',
          'Elongation: DNA Pol III continuous leading strand aur short Okazaki fragments (lagging strand) synthesize karta hai.',
          'Gap Filling: DNA Pol I apni 5\'->3\' exonuclease activity se RNA primer ko remove karta hai aur DNA fill karta hai.',
          'Ligation: DNA ligase enzyme Okazaki fragments ke beech ke nicks ko seal karta hai using NAD+ as cofactor.',
        ],
        keyPoints: [
          'DNA synthesis hamesha 5\' to 3\' direction me hi hoti hai kyunki free 3\'-OH group par new nucleotide add hota hai.',
          'Beta sliding clamp DNA Pol III ko DNA par hold karke rakhta hai, jisse processivity massively increase hoti hai.',
          'DNA Pol III ka epsilon subunit 3\'->5\' proofreading exonuclease activity carry karta hai.',
          'Dam methyltransferase parental GATC sequences ko methylate karta hai, jisse mismatch repair system newly synthesized strand ko pehchan sake.',
        ],
        applications: [
          'DNA Gyrase ko target karne wali fluoroquinolone antibiotics (Ciprofloxacin) ka design.',
          'High processivity proofreading DNA polymerases ka biotechnology laboratory me use.',
          'Bacterial expression vectors me origin of replication control.',
        ],
        revisionNotes: [
          'DnaA = Initiator protein jo 9-mer pe bind kare',
          'DnaB = Helicase jo strands unwind kare',
          'DnaG = Primase jo RNA primer banaye',
          'DNA Pol III = Main replication enzyme with beta clamp',
          'DNA Pol I = Primer remover (5\'->3\' exonuclease) + repair',
          'DNA Ligase = Nick sealer (bacteria me NAD+ use kare)',
        ],
      },
    },
    references: [
      { citation: 'Kornberg A. & Baker T.A. DNA Replication. 2nd Edition, W. H. Freeman.', doiOrLink: 'https://doi.org/10.1016/S0021-9258(18)53874-7' },
      { citation: 'Alberts B. et al. Molecular Biology of the Cell. Garland Science.', doiOrLink: 'https://www.ncbi.nlm.nih.gov/books/NBK26850/' },
    ],
  },
  'chromatin-organization-and-nucleosome-dynamics': {
    slug: 'chromatin-organization-and-nucleosome-dynamics',
    subjectSlug: 'cell-biology',
    title: {
      en: 'Chromatin Architecture: Nucleosome Core, Classical 30 nm Models, and Modern in vivo Realities',
      hinglish: 'Chromatin Structure: Nucleosome Core, Classical 30 nm Model, aur Modern in vivo Evidence',
    },
    difficulty: 'Advanced',
    readTimeMin: 14,
    definitions: [
      {
        term: 'Nucleosome Core Particle',
        en: 'The fundamental repeating unit of eukaryotic chromatin comprising 147 bp of DNA wrapped 1.65 left-handed superhelical turns around a histone octamer containing two copies each of core histones H2A, H2B, H3, and H4.',
        hinglish: 'Eukaryotic chromatin ki basic structural unit jisme 147 bp DNA ek histone octamer (H2A, H2B, H3, H4) ke charo taraf 1.65 turns me wrap hota hai.',
      },
      {
        term: 'Linker Histone H1',
        en: 'A winged-helix protein that binds the entry/exit DNA at the nucleosome dyad, sealing ~166-168 bp of DNA to form a chromatosome and facilitating higher-order condensation.',
        hinglish: 'Linker histone H1 entry aur exit DNA par bind karta hai, chromatosome structure banata hai aur chromatin packaging me help karta hai.',
      },
      {
        term: 'Bacterial NAPs vs Archaeal Histones',
        en: 'Bacteria lack true histones and organize their nucleoid using Nucleoid-Associated Proteins (NAPs like HU, IHF, H-NS, and Fis). In contrast, Archaea (such as Euryarchaeota) possess genuine histone homologs (HMf) that form DNA-wrapping tetramers and multimeric structures.',
        hinglish: 'Bacteria me true histones nahi hote; wo NAPs (HU, IHF, H-NS) use karte hain. Jabki Archaea me true histone homologs (HMf proteins) hote hain jo DNA ko wrap karte hain.',
      },
    ],
    content: {
      en: {
        introduction: 'Eukaryotic genome packaging spans a vast compaction scale, from 2-meter naked duplex DNA to the microscopic cell nucleus. Historically, textbook paradigms portrayed a rigid hierarchical folding cascade: 10 nm beads-on-a-string -> 30 nm solenoid/zigzag fiber -> 300 nm looped domains -> 700 nm metaphase chromatids. However, contemporary quantitative biophysics (cryo-electron tomography and ChromEMT) has revolutionized this view, establishing that regular 30 nm fibers do not predominate in living interphase nuclei.',
        mechanism: [
          'First-Order Packaging (10 nm Fiber): Core histones assemble into a central (H3-H4)2 tetramer flanked by two H2A-H2B dimers. Negatively charged DNA phosphodiester backbones form electrostatic bonds with basic lysine and arginine residues, generating a 6-fold compaction factor.',
          'Classical 30 nm Models (In Vitro Evidence): Under low ionic strength in isolated in vitro preparations, addition of linker histone H1 induces compaction into either a continuous one-start solenoid (Finch & Klug, 1976) or a two-start zigzag ribbon (Woodcock & Schalch).',
          'Modern In Vivo Reality: State-of-the-art cryo-electron tomography, small-angle X-ray scattering (SAXS), and ChromEMT (Ou et al., Science 2017) demonstrate that native interphase chromatin lacks regular 30 nm periodic fibers. Instead, chromatin behaves as a disordered, polymorphic 5–24 nm polymer mesh with variable local compaction densities.',
          'Prokaryotic & Archaeal Distinction: Bacteria package circular genomes into looped domains using dynamic NAPs: HU induces flexible bending, IHF mediates sequence-specific looping for recombination, and H-NS bridges DNA duplexes to repress transcription. Euryarchaeal histones share the eukaryotic histone-fold motif but form continuous variable-length protein cores without requiring linker histones.',
          'High-Order Regulation: Topological Associated Domains (TADs) are demarcated by CTCF insulator proteins and cohesin-driven loop extrusion complexes rather than rigid crystalline fiber coiling.',
        ],
        pathwaySteps: [
          'Naked Duplex DNA (2 nm diameter)',
          'Nucleosome core particle assembly (11 nm diameter, 147 bp wrap)',
          'Linker DNA association with Histone H1 (chromatosome, ~166 bp)',
          'Flexible disordered 10 nm polymer folding into variable density chromatin domains',
          'Cohesin & CTCF loop extrusion forming Topologically Associating Domains (TADs)',
          'Mitotic chromosome condensin-dependent hyper-compaction for anaphase segregation',
        ],
        keyPoints: [
          'CRITICAL SCIENTIFIC CORRECTION: The 30 nm chromatin fiber is a validated in vitro structure under low-salt conditions, but high-resolution in situ imaging confirms that interphase eukaryotic nuclei predominantly contain flexible 10 nm fibers in disordered, fluid conformational states.',
          'Histone octamer composition: Heterotetramer of (H3-H4)2 plus two (H2A-H2B) heterodimers. Core histones lack the winged-helix domain characteristic of linker histone H1.',
          'Epigenetic Tail Dynamics: N-terminal histone tails project outward from the core; post-translational acetylation (HATs) neutralizes positive charges to promote open euchromatin, while methylation (HMTs) recruits HP1 or Polycomb complexes for heterochromatin formation.',
          'Evolutionary divergence: Archaea possess genuine histone folds (ancestral to eukaryotes), whereas bacteria utilize fundamentally distinct NAPs (HU, IHF, H-NS).',
        ],
        applications: [
          'Histone Deacetylase (HDAC) inhibitors (e.g., Vorinostat) in cutaneous T-cell lymphoma therapeutics.',
          'Assay for Transposase-Accessible Chromatin with sequencing (ATAC-seq) mapping open genomic regulatory regions in biotechnology cell lines.',
          'CRISPR-dCas9 targeted epigenome editing with engineered histone acetyltransferases.',
        ],
        revisionNotes: [
          'Nucleosome core DNA = 147 bp; 1.65 left-handed superhelical turns',
          'Octamer = 2 × (H2A, H2B, H3, H4)',
          'Histone H1 = Linker histone (binds dyad; not part of core octamer)',
          '30 nm fiber = In vitro model (solenoid / zigzag); in vivo chromatin is a disordered 10 nm polymer network',
          'Bacteria = NAPs (HU, IHF, H-NS), NO true histones',
          'Archaea = True histone homologs (HMf), histone-fold present',
        ],
      },
      hinglish: {
        introduction: 'Chromatin organization eukaryotic cells me DNA ko nucleus ke microscopic space me package karta hai. Pehle standard textbooks me 30 nm fiber ko universal intermediate model bataya jata tha, lekin modern cryo-electron tomography aur ChromEMT studies ne prove kiya hai ki living cells ke andar chromatin mostly flexible, disordered 10 nm chains ke roop me rehta hai.',
        mechanism: [
          'Nucleosome Core: 147 bp DNA 8 histone proteins ke octamer (do copies each of H2A, H2B, H3, H4) ke charo taraf wrap hota hai.',
          'Classical 30 nm Model: Lab me low salt conditions me histone H1 ki presence me solenoid ya zigzag 30 nm structure banta hai.',
          'Modern in vivo Discovery: Living cells ke nucleus me regular 30 nm fiber observe nahi hota; chromatin variable density ke 10 nm polymer fibers me packed rehta hai.',
          'Bacteria vs Archaea: Bacteria me true histones nahi hote, wo NAPs (HU, H-NS, IHF) use karte hain. Archaea me eukaryotic histones ke homologs (HMf) hote hain.',
        ],
        keyPoints: [
          'Exam Correction: 30 nm fiber in vitro low salt condition me banta hai, lekin living interphase nucleus me disordered 10 nm chromatin domains hote hain.',
          'Octamer me H3-H4 tetramer aur do H2A-H2B dimers hote hain; H1 linker histone bahar bind karta hai.',
          'Bacteria NAPs use karte hain jabki Archaea true histone proteins rakhte hain.',
        ],
        applications: [
          'HDAC inhibitor cancer drugs ka development.',
          'ATAC-seq aur Hi-C mapping techniques me chromatin accessibility analyze karna.',
        ],
        revisionNotes: [
          'Nucleosome core DNA = 147 bp',
          'Octamer = (H2A, H2B, H3, H4) × 2',
          'Linker H1 = Chromatosome (~166 bp)',
          'Bacteria = NAPs (HU, IHF, H-NS), no true histones',
          'Archaea = True histones present (HMf)',
        ],
      },
    },
    references: [
      { citation: 'Alberts B. et al. Molecular Biology of the Cell. 7th Edition, W. W. Norton & Company.', doiOrLink: 'https://www.ncbi.nlm.nih.gov/books/NBK26850/' },
      { citation: 'Ou H.D. et al. ChromEMT: Visualizing 3D chromatin structure and compaction in interphase and mitotic cells. Science 357(6349), 2017.', doiOrLink: 'https://doi.org/10.1126/science.aag0025' },
      { citation: 'Eukaryotic and Archaeal Histones Review. Trends in Biochemical Sciences.', doiOrLink: 'https://doi.org/10.1016/j.tibs.2020.08.006' },
    ],
  },
  'ribosome-architecture-and-comparative-translation': {
    slug: 'ribosome-architecture-and-comparative-translation',
    subjectSlug: 'biochemistry',
    title: {
      en: 'Ribosome Architecture: 70S, 80S, and Mitochondrial Structural Exceptions',
      hinglish: 'Ribosome Structure: 70S, 80S, aur Mitochondrial Mitoribosome Exceptions',
    },
    difficulty: 'Intermediate',
    readTimeMin: 12,
    definitions: [
      {
        term: 'Svedberg Unit (S)',
        en: 'A non-SI metric of sedimentation velocity under centrifugal force (1 S = 10^-13 seconds), determined by particle mass, density, and shape (non-additive).',
        hinglish: 'Centrifugation me sedimentation coefficient ki unit (1 S = 10^-13 sec). Ye mass aur shape dono par depend karta hai isliye additive nahi hota (50S + 30S = 70S).',
      },
      {
        term: 'Peptidyl Transferase Center (PTC)',
        en: 'The catalytic ribozyme site in the large ribosomal subunit (23S rRNA in bacteria; 28S rRNA in eukaryotes) that synthesizes peptide bonds without protein catalysis.',
        hinglish: 'Large ribosomal subunit ka catalytic ribozyme center (23S rRNA in bacteria, 28S rRNA in eukaryotes) jo amino acids ke beech peptide bond banata hai.',
      },
      {
        term: 'Mitoribosome (~55S)',
        en: 'The specialized translation machinery of mammalian mitochondria possessing a 39S large subunit and 28S small subunit with an inverted RNA:protein ratio (2:1 protein:RNA) compared to bacterial 70S.',
        hinglish: 'Mammalian mitochondria ka 55S ribosome jisme RNA kam aur protein content zyada hota hai (protein-to-RNA ratio reverse hota hai).',
      },
    ],
    content: {
      en: {
        introduction: 'Ribosomes are ribonucleoprotein megadalton machines universal to all cellular life. While textbook introductions present a binary distinction between bacterial 70S and eukaryotic cytosolic 80S ribosomes, evolutionary biophysics reveals crucial structural nuances, including specialized mitochondrial and chloroplast ribosomes.',
        mechanism: [
          'Bacterial 70S Assembly: Composed of a 50S large subunit (23S rRNA [2904 nt], 5S rRNA [120 nt], and 34 ribosomal proteins L1-L34) and a 30S small subunit (16S rRNA [1542 nt] and 21 proteins S1-S21). Total mass: ~2.5 MDa; composition: ~65% RNA, 35% protein.',
          'Eukaryotic Cytosolic 80S Assembly: Composed of a 60S large subunit (28S rRNA [~4700 nt], 5.8S rRNA [160 nt], 5S rRNA [120 nt], and ~49 proteins) and a 40S small subunit (18S rRNA [~1900 nt] and ~33 proteins). Total mass: ~4.2 MDa; composition: ~50% RNA, 50% protein.',
          'Mitochondrial Ribosome Exception (Mitoribosomes): In mammalian mitochondria, mitoribosomes sediment at ~55S (39S large subunit with 16S mt-rRNA and 28S small subunit with 12S mt-rRNA). Unlike bacterial ribosomes, mammalian mitoribosomes contain ~67% protein and only ~33% RNA, having recruited numerous mitochondria-specific proteins to stabilize shortened rRNAs.',
          'Chloroplast Ribosomes: Chloroplasts retain ancestral ~70S ribosomes (50S and 30S subunits) with 23S, 16S, 5S, and 4.5S rRNAs, mirroring their endosymbiotic cyanobacterial heritage.',
          'Translational Antibiotic Selectivity: Aminoglycosides (Streptomycin, Kanamycin) target the decoding site of 16S rRNA in 30S; Macrolides (Erythromycin) and Chloramphenicol block the 23S rRNA exit tunnel and PTC of 50S; Cycloheximide selectively inhibits eukaryotic 60S translocation.',
        ],
        pathwaySteps: [
          'Small Subunit Initiation Complex formation (mRNA binding + initiator tRNA)',
          'Shine-Dalgarno (prokaryotes: 16S anti-SD pairing) vs 5\'-Cap Kozak scanning (eukaryotes: eIF4F)',
          'Large Subunit recruitment (GTP hydrolysis by IF2 / eIF5B)',
          'Elongation: A-site aminoacyl-tRNA selection -> Peptidyl transferase bond formation -> Translocation',
          'Termination: Class I Release Factors (RF1/RF2 in bacteria; eRF1 in eukaryotes) recognise stop codons',
          'Recycling: RRF and EF-G dissociate 70S into free subunits',
        ],
        keyPoints: [
          'CRITICAL EXCEPTION: Mitochondrial ribosomes are NOT standard 70S. Mammalian mitoribosomes are 55S (39S + 28S) with reversed protein-rich stoichiometry, though chloroplast ribosomes remain standard ~70S.',
          'The ribosome is an authentic Ribozyme: High-resolution X-ray crystallography (Steitz, Ramakrishnan, Yonath) demonstrated that no amino acid side chain resides within 18 Å of the catalytic peptidyl transferase center.',
          'Prokaryotic initiation uses Shine-Dalgarno: AGGAGG consensus pairing with the 3\' end of 16S rRNA (anti-Shine-Dalgarno). Eukaryotes use 5\' 7-methylguanosine cap recognition and 40S scanning for the Kozak sequence (ACCAUGG).',
        ],
        applications: [
          'Selective antibacterial drug discovery targeting 50S and 30S bacterial ribosomal pockets.',
          'Biopharmaceutical recombinant protein yield enhancement through codon optimization matched to host tRNA pools.',
          'Mitochondrial toxicity screening for novel antibiotic candidate pipelines.',
        ],
        revisionNotes: [
          'Bacterial 70S = 50S (23S, 5S, 34 proteins) + 30S (16S, 21 proteins)',
          'Eukaryotic 80S = 60S (28S, 5.8S, 5S, ~49 proteins) + 40S (18S, ~33 proteins)',
          'Mammalian Mitoribosome = 55S (39S + 28S); ~67% protein, ~33% RNA (inverted ratio)',
          'Chloroplast ribosome = ~70S (cyanobacterial heritage)',
          'Shine-Dalgarno = Prokaryotes (pairs with 16S rRNA 3\' end)',
          'Kozak sequence = Eukaryotes (ACC[A/G]GGAUGG)',
        ],
      },
      hinglish: {
        introduction: 'Ribosome cell ka translation engine hai. Standard biology me bacteria ke 70S aur eukaryotes ke 80S ribosome ko compare kiya jata hai, lekin mitochondrial ribosomes (mitoribosomes) jaise critical exceptions scientific exams me zaroor puche jaate hain.',
        mechanism: [
          'Bacterial 70S: 50S subunit (23S rRNA, 5S rRNA, 34 proteins) aur 30S subunit (16S rRNA, 21 proteins). RNA content approx 65% hota hai.',
          'Eukaryotic 80S: 60S subunit (28S, 5.8S, 5S rRNA, ~49 proteins) aur 40S subunit (18S rRNA, ~33 proteins).',
          'Mitochondrial Exception (55S): Mammalian mitochondria me ribosome 55S hota hai (39S large + 28S small subunit). Isme protein content RNA se zyada hota hai (inverted ratio).',
          'Chloroplast: Plant chloroplasts me ancestral 70S ribosomes hote hain.',
        ],
        keyPoints: [
          'Exam Point: Mammalian mitochondrial ribosomes 70S nahi, balki 55S (39S + 28S) hote hain.',
          'Ribosome ek Ribozyme hai: Peptide bond formation 23S/28S rRNA se catalyze hoti hai.',
          'Prokaryotes me Shine-Dalgarno sequence 16S rRNA se pair karta hai, jabki eukaryotes me 5\' cap aur Kozak consensus scan hota hai.',
        ],
        applications: [
          'Antibiotics mode of action: Streptomycin (30S), Chloramphenicol (50S), Cycloheximide (80S eukaryotic specific).',
          'Bioprocess me recombinant protein translation rate optimization.',
        ],
        revisionNotes: [
          '70S = 50S (23S + 5S) + 30S (16S)',
          '80S = 60S (28S + 5.8S + 5S) + 40S (18S)',
          'Mitoribosome = 55S (39S + 28S) with high protein ratio',
          'Peptidyl transferase = 23S/28S rRNA ribozyme',
        ],
      },
    },
    references: [
      { citation: 'Ramakrishnan V. The Ribosome: Structure, Function, and Evolution. Nobel Lecture.', doiOrLink: 'https://doi.org/10.1002/anie.201004383' },
      { citation: 'Greber B.J. & Ban N. Structure and Function of the Mitochondrial Ribosome. Annual Review of Biochemistry 85, 2016.', doiOrLink: 'https://doi.org/10.1146/annurev-biochem-060815-014343' },
      { citation: 'Alberts B. et al. Molecular Biology of the Cell. 7th Edition.', doiOrLink: 'https://www.ncbi.nlm.nih.gov/books/NBK26850/' },
    ],
  },
};
