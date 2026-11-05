/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Default 11 Academic Subjects Seed Data
 * Authoritative curriculum aligned with GAT-B, DBT-JRF, GATE-BT, IIT-JAM, CUET-PG, CSIR-NET.
 */

import { SubjectItem } from '../db.js';

export const DEFAULT_11_SUBJECTS: SubjectItem[] = [
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
    isPublished: true,
    overview: {
      en: 'Cell Biology is the fundamental bedrock of all biotechnological inquiry. It deals with subcellular architecture, dynamic biomembrane fluidity, vesicular trafficking via Golgi and ER, cytoskeletal mechanics, and apoptotic cascades crucial for biomanufacturing and cellular engineering.',
      hinglish: 'Cell biology biotechnology ki basic foundation hai. Isme membrane dynamics, organelles ke internal functions, signal transduction pathways, aur cell division mechanisms covered hain.',
    },
    learningObjectives: {
      en: [
        'Understand phospholipid bilayer dynamics and transport kinetics across selective membranes',
        'Analyze protein sorting pathways between Endoplasmic Reticulum, Golgi complex, and lysosomes',
        'Examine GPCR and Receptor Tyrosine Kinase (RTK) signal transduction cascades',
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
    units: [
      {
        id: 'u-cb-1',
        unitNumber: 1,
        title: {
          en: 'Membrane Structure and Dynamic Transport',
          hinglish: 'Cell Membrane Structure aur Transport Mechanisms',
        },
        chapters: [
          {
            id: 'c-cb-1',
            chapterNumber: 1,
            title: {
              en: 'Biomembrane Architecture and Fluidity',
              hinglish: 'Biomembrane Architecture aur Lipid Dynamics',
            },
            topics: [
              {
                id: 'top-cb-1',
                slug: 'membrane-structure-and-transport',
                title: {
                  en: 'Fluid Mosaic Model & Membrane Asymmetry',
                  hinglish: 'Fluid Mosaic Model aur Membrane Asymmetry',
                },
                difficulty: 'Beginner',
                readTimeMin: 12,
                orderIndex: 1,
                isPublished: true,
                contentEn: 'Phospholipid bilayers form the basic structural matrix of biological membranes. The fluid mosaic model describes dynamic lateral diffusion of lipids and integral membrane proteins.',
                contentHinglish: 'Phospholipid bilayer cell membrane ka basic matrix banati hai. Fluid mosaic model lipid aur proteins ke dynamic lateral movement ko explain karta hai.',
                keyPoints: [
                  'Amphipathic phosphoglycerides and sphingolipids form bilayers spontaneously in aqueous environments',
                  'Flippases, floppases, and scramblases maintain transverse lipid asymmetry',
                  'Cholesterol functions as a bidirectional fluidity buffer maintaining membrane integrity across temperatures',
                ],
              },
              {
                id: 'top-cb-2',
                slug: 'solute-transport-and-channels',
                title: {
                  en: 'Passive Diffusion, Ion Channels & ABC Transporters',
                  hinglish: 'Passive Diffusion, Ion Channels aur Active ABC Transporters',
                },
                difficulty: 'Intermediate',
                readTimeMin: 14,
                orderIndex: 2,
                isPublished: true,
                contentEn: 'Solute movement across biomembranes operates via simple diffusion, facilitated carrier proteins, voltage-gated channels, and primary/secondary active transporters.',
                contentHinglish: 'Biomembrane ke across molecules simple diffusion, facilitated diffusion, aur ATP-dependent primary/secondary active transport dwara move karte hain.',
                keyPoints: [
                  'Na+/K+ ATPase establishes the fundamental -70mV resting potential via 3 Na+ out / 2 K+ in stoichiometry',
                  'ABC transporters utilize ATP hydrolysis cassettes to pump multidrug xenobiotics and peptides',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'u-cb-2',
        unitNumber: 2,
        title: {
          en: 'Intracellular Organelles & Protein Sorting',
          hinglish: 'Cell Organelles aur Protein Sorting Pathways',
        },
        chapters: [
          {
            id: 'c-cb-2',
            chapterNumber: 2,
            title: {
              en: 'Endoplasmic Reticulum & Golgi Vesicular Trafficking',
              hinglish: 'ER aur Golgi Vesicular Transport',
            },
            topics: [
              {
                id: 'top-cb-3',
                slug: 'er-protein-translocation',
                title: {
                  en: 'Co-translational Translocation & Chaperone Folding',
                  hinglish: 'Co-translational Translocation aur Chaperones',
                },
                difficulty: 'Intermediate',
                readTimeMin: 15,
                orderIndex: 3,
                isPublished: true,
                contentEn: 'Nascent polypeptide chains bearing N-terminal signal peptides are targeted to the ER translocon by Signal Recognition Particle (SRP) and folded by BiP and calnexin.',
                contentHinglish: 'SRP nascent peptide signal sequence ko recognize karke ribosome ko ER translocon par bind karwata hai jaha BiP chaperone protein folding facilitate karta hai.',
                keyPoints: [
                  'SRP binds hydrophobic signal peptides halting elongation until docking with SRP receptor',
                  'N-linked glycosylation transfers Glc3Man9GlcNAc2 oligosaccharide onto Asn residues at Asn-X-Ser/Thr motifs',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'u-cb-3',
        unitNumber: 3,
        title: {
          en: 'Signal Transduction Pathways',
          hinglish: 'Cellular Signaling Pathways (GPCR & RTK)',
        },
        chapters: [
          {
            id: 'c-cb-3',
            chapterNumber: 3,
            title: {
              en: 'Cell Surface Receptors & Secondary Messengers',
              hinglish: 'Receptors aur Second Messengers',
            },
            topics: [
              {
                id: 'top-cb-4',
                slug: 'gpcr-signaling-mechanisms',
                title: {
                  en: 'GPCR, Adenylyl Cyclase & Phospholipase C Cascades',
                  hinglish: 'GPCR Signaling, cAMP aur IP3/DAG Cascades',
                },
                difficulty: 'Advanced',
                readTimeMin: 16,
                orderIndex: 4,
                isPublished: true,
                contentEn: 'Heterotrimeric G-proteins transduce extracellular ligand binding into intracellular second messenger generation via cAMP, IP3, DAG, and Ca2+ fluxes.',
                contentHinglish: 'Ligand binding se 7-transmembrane GPCR conformational change undergo karta hai, jo Ga-GTP dissociation se adenylyl cyclase ya PLC-beta ko activate karta hai.',
                keyPoints: [
                  'Gas activates adenylyl cyclase elevating intracellular cAMP which activates Protein Kinase A (PKA)',
                  'Gaq activates Phospholipase C-beta cleaving PIP2 into IP3 (releasing ER Ca2+) and DAG (activating PKC)',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'u-cb-4',
        unitNumber: 4,
        title: {
          en: 'Cell Cycle Control & Apoptosis',
          hinglish: 'Cell Cycle Checkpoints aur Apoptosis Mechanisms',
        },
        chapters: [
          {
            id: 'c-cb-4',
            chapterNumber: 4,
            title: {
              en: 'Cyclin-CDK Complexes & Caspase Cascades',
              hinglish: 'Cyclin-CDK Complex aur Caspases',
            },
            topics: [
              {
                id: 'top-cb-5',
                slug: 'cell-cycle-checkpoints',
                title: {
                  en: 'G1/S, G2/M Checkpoints & p53 DNA Damage Response',
                  hinglish: 'Cell Cycle Checkpoints aur p53 Pathway',
                },
                difficulty: 'Advanced',
                readTimeMin: 18,
                orderIndex: 5,
                isPublished: true,
                contentEn: 'Cell division fidelity is guaranteed by strict surveillance checkpoints governed by Cyclin-CDK complexes, Wee1/Cdc25 kinases, and the p53-p21 tumor suppressor axis.',
                contentHinglish: 'Cell cycle checkpoints DNA damage par division ko halt karte hain. ATM/ATR kinase activation se p53 stabilize hota hai jo p21 CDK inhibitor express karta hai.',
                keyPoints: [
                  'Cyclin D-CDK4/6 phosphorylates Retinoblastoma (Rb) protein, releasing E2F to transcribe S-phase genes',
                  'Intrinsic apoptosis involves mitochondrial outer membrane permeabilization (MOMP) releasing cytochrome c to form the apoptosome with Apaf-1 and procaspase-9',
                ],
              },
            ],
          },
        ],
      },
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
    isPublished: true,
    overview: {
      en: 'Biochemistry bridges molecular architecture with cellular bioenergetics. It explores amino acid ionization, Ramachandran steric constraints, steady-state enzyme mechanics, and ATP generation via the mitochondrial electron transport chain.',
      hinglish: 'Biochemistry biomolecules ke chemical structure aur energy conversions ko explain karti hai. Isme amino acids ke Ramachandran plots, Michaelis-Menten enzyme kinetics, aur metabolic pathways jaise Glycolysis aur oxidative phosphorylation detailed covered hain.',
    },
    learningObjectives: {
      en: [
        'Calculate steady-state enzyme kinetics parameters using Michaelis-Menten and Lineweaver-Burk transformations',
        'Analyze protein folding free-energy landscapes, secondary motifs, and tertiary stabilization bonds',
        'Trace carbon flux through Glycolysis, TCA cycle, Gluconeogenesis, and Pentose Phosphate Pathway',
        'Compute Gibbs free energy changes for bioenergetic reactions in oxidative phosphorylation',
      ],
      hinglish: [
        'Michaelis-Menten equation aur Lineweaver-Burk plots se Km aur Vmax accurately nikalna',
        'Proteins ke secondary structure aur Ramachandran plot angles ko analyze karna',
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
      { citation: 'Nelson D. L. & Cox M. M. Lehninger Principles of Biochemistry. 8th Edition, W. H. Freeman.', type: 'Book', year: 2021 },
      { citation: 'Voet D. & Voet J. G. Biochemistry. 5th Edition, John Wiley & Sons.', type: 'Book', year: 2018 },
    ],
    units: [
      {
        id: 'u-bc-1',
        unitNumber: 1,
        title: { en: 'Protein Structure & Enzymology', hinglish: 'Protein Structure aur Enzyme Kinetics' },
        chapters: [
          {
            id: 'c-bc-1',
            chapterNumber: 1,
            title: { en: 'Enzyme Kinetics & Inhibition Types', hinglish: 'Enzyme Kinetics aur Inhibition' },
            topics: [
              {
                id: 'top-bc-1',
                slug: 'enzyme-kinetics-and-inhibition',
                title: { en: 'Michaelis-Menten Kinetics & Lineweaver-Burk Analysis', hinglish: 'Michaelis-Menten aur Lineweaver-Burk Analysis' },
                difficulty: 'Intermediate',
                readTimeMin: 16,
                orderIndex: 1,
                isPublished: true,
                contentEn: 'Enzymes accelerate biochemical reactions by stabilizing transition states. Steady-state Michaelis-Menten kinetics mathematically models initial velocity as a function of substrate concentration.',
                contentHinglish: 'Enzymes transition state ko stabilize karke activation energy decrease karte hain. Michaelis-Menten equation initial velocity aur substrate concentration ka relation deti hai.',
                keyPoints: [
                  'Km represents substrate concentration at half-maximal velocity (Vmax/2) reflecting binding affinity',
                  'Competitive inhibition increases apparent Km without changing Vmax; Lineweaver-Burk lines pivot on the 1/v0 y-axis intercept',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sub-03',
    slug: 'genetics',
    name: { en: 'Genetics', hinglish: 'Genetics (Aanuvanshiki)' },
    description: {
      en: 'Mendelian inheritance, linkage mapping, recombination, chromosome aberrations, gene interactions, and population genetics.',
      hinglish: 'Mendelian principles, gene mapping, recombination frequency, chromosomal abnormalities, aur population genetics.',
    },
    icon: 'Dna',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 3,
    isPublished: true,
    overview: {
      en: 'Genetics governs the transmission and variation of biological traits across generations. It covers classical cross-breeding models, quantitative inheritance, three-point testcross mapping, and Hardy-Weinberg equilibrium.',
      hinglish: 'Genetics biological traits ke inheritance aur variation ko samjhati hai. Isme Mendel ke laws, linkage mapping, chromosomal mutations, aur population genetics shamil hain.',
    },
    learningObjectives: {
      en: [
        'Calculate recombination frequencies and gene order from three-point testcross data',
        'Solve non-Mendelian epistatic ratio modifications (9:7, 12:3:1, 9:3:4, 15:1)',
        'Compute Hardy-Weinberg allele and genotype frequencies under selection pressure',
      ],
      hinglish: [
        'Three-point testcross data se gene order aur map distance (cM) nikalna',
        'Modified epistatic ratios aur gene interaction problems solve karna',
        'Hardy-Weinberg equilibrium equations se allele frequencies calculate karna',
      ],
    },
    keyFormulas: [
      {
        name: 'Hardy-Weinberg Equation',
        formula: 'p^2 + 2pq + q^2 = 1 ; p + q = 1',
        description: {
          en: 'Predicts allele and genotype distribution in an idealized non-evolving population.',
          hinglish: 'Ideal population me allele aur genotype frequencies predict karne ka fundamental formula.',
        },
      },
    ],
    references: [
      { citation: 'Griffiths A. J. F. et al. Introduction to Genetic Analysis. 12th Edition, W. H. Freeman.', type: 'Book', year: 2020 },
      { citation: 'Klug W. S. et al. Concepts of Genetics. 12th Edition, Pearson.', type: 'Book', year: 2019 },
    ],
    units: [
      {
        id: 'u-gen-1',
        unitNumber: 1,
        title: { en: 'Linkage Mapping & Gene Interaction', hinglish: 'Linkage Mapping aur Gene Interactions' },
        chapters: [
          {
            id: 'c-gen-1',
            chapterNumber: 1,
            title: { en: 'Recombination & Chromosome Mapping', hinglish: 'Recombination aur Three-Point Testcross' },
            topics: [
              {
                id: 'top-gen-1',
                slug: 'linkage-mapping-and-three-point-testcross',
                title: { en: 'Three-Point Testcross & Genetic Distance (cM)', hinglish: 'Three-Point Testcross aur Map Distance' },
                difficulty: 'Advanced',
                readTimeMin: 18,
                orderIndex: 1,
                isPublished: true,
                contentEn: 'Linkage mapping deduces linear chromosomal gene arrangement by quantifying crossing-over frequencies between heterozygous loci and homozygous recessive testers.',
                contentHinglish: 'Three-point testcross me recombinant frequencies calculate karke teen genes ka accurate linear order aur inter-genic distances (centimorgans) nikaale jate hain.',
                keyPoints: [
                  'Double cross-over (DCO) classes have the lowest numerical frequency; comparing DCO with parental classes identifies the middle gene',
                  'Coefficient of Coincidence (C) = Observed DCO / Expected DCO ; Interference (I) = 1 - C',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sub-04',
    slug: 'molecular-biology',
    name: { en: 'Molecular Biology', hinglish: 'Molecular Biology (Aanvik Jeev Vigyan)' },
    description: {
      en: 'Central dogma mechanisms: DNA replication fidelity, transcription regulation, RNA processing, translation mechanisms, and operon control.',
      hinglish: 'DNA replication, transcription, RNA splicing, translation machinery, lac/trp operon regulation, aur molecular repair systems.',
    },
    icon: 'Binary',
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 4,
    isPublished: true,
    overview: {
      en: 'Molecular Biology elucidates the information flow from nucleotide sequences to functional proteins. It details polymerases, topoisomerases, spliceosomes, ribosomal catalytic peptidyl transferase centers, and epigenetic chromatin dynamics.',
      hinglish: 'Molecular Biology biological information ke flow ko explain karti hai. Isme replication fork proteins, RNA polymerase regulation, aur operon switches detail me covered hain.',
    },
    learningObjectives: {
      en: [
        'Detail bacterial and eukaryotic replication fork progression and proofreading excision',
        'Analyze promoter architecture, sigma factors, and general transcription factors (TFIID, TFIIH)',
        'Explain mRNA post-transcriptional processing: 5\' capping, spliceosomal intron excision, and polyadenylation',
        'Interpret negative and positive gene regulatory circuits in Lac, Trp, and Ara operons',
      ],
      hinglish: [
        'Prokaryotic aur eukaryotic replication machinery aur proofreading mechanisms samajhna',
        'RNA polymerase holoenzyme promoters aur transcription factors ko map karna',
        'Pre-mRNA splicing, 5\' cap, aur 3\' poly-A tail ke biochemical steps ko verify karna',
        'Lac aur Trp operons ke induction, repression, aur attenuation mechanisms ko master karna',
      ],
    },
    references: [
      { citation: 'Watson J. D. et al. Molecular Biology of the Gene. 7th Edition, Pearson.', type: 'Book', year: 2014 },
      { citation: 'Krebs J. E. et al. Lewin\'s GENES XII. Jones & Bartlett Learning.', type: 'Book', year: 2018 },
    ],
    units: [
      {
        id: 'u-mb-1',
        unitNumber: 1,
        title: { en: 'DNA Replication & Repair Mechanisms', hinglish: 'DNA Replication aur Repair' },
        chapters: [
          {
            id: 'c-mb-1',
            chapterNumber: 1,
            title: { en: 'Replication Machinery & Fork Progression', hinglish: 'Replication Machinery' },
            topics: [
              {
                id: 'top-mb-1',
                slug: 'dna-replication-in-prokaryotes',
                title: { en: 'DNA Replication in Prokaryotes: Molecular Architecture and Fidelity', hinglish: 'Prokaryotes me DNA Replication' },
                difficulty: 'Intermediate',
                readTimeMin: 14,
                orderIndex: 1,
                isPublished: true,
                contentEn: 'Replication in E. coli initiates at oriC where DnaA oligomerizes to melt 13-mer AT-rich repeats. DnaB helicase unwinds duplex DNA, stabilized by SSB proteins.',
                contentHinglish: 'E. coli me replication oriC par shuru hota hai. DnaB helicase DNA strands ko separate karta hai aur DNA Polymerase III holoenzyme leading aur lagging strands synthesize karta hai.',
                keyPoints: [
                  'DNA Polymerase III core contains alpha (polymerase), epsilon (3\' to 5\' exonuclease proofreader), and theta subunits',
                  'Beta clamp confers high processivity (>5000 nucleotides per binding event)',
                  'DNA Polymerase I utilizes 5\' to 3\' exonuclease nick translation to remove RNA primers',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sub-05',
    slug: 'microbiology',
    name: { en: 'Microbiology', hinglish: 'Microbiology (Sukshmjeev Vigyan)' },
    description: {
      en: 'Bacterial morphology, cell wall architecture, culture kinetics, microbial genetics, pathogenic mechanisms, and industrial fermentation strains.',
      hinglish: 'Bacteria, viruses, fungi ka classification, cell wall structure, microbial growth kinetics, sterilization, aur antibiotic resistance.',
    },
    icon: 'Bug',
    unitsCount: 4,
    topicsCount: 14,
    orderIndex: 5,
    isPublished: true,
    overview: {
      en: 'Microbiology covers microscopic biological entities driving biogeochemical cycles and bioprocess applications. It encompasses peptidoglycan crosslinking, endotoxins, horizontal gene transfer, and sterilization kinetics.',
      hinglish: 'Microbiology bacteria, viruses, aur fungi ke biological study ko cover karti hai. Isme Gram staining, bacterial growth curves, aur industrial strain applications detailed hain.',
    },
    learningObjectives: {
      en: [
        'Differentiate Gram-positive and Gram-negative peptidoglycan and outer membrane lipopolysaccharide architecture',
        'Calculate specific growth rate, doubling time, and yield coefficients from batch growth kinetics',
        'Compare mechanisms of horizontal gene transfer: Transformation, Transduction, and Conjugation',
      ],
      hinglish: [
        'Gram-positive aur Gram-negative cell wall ke molecular differences ko identify karna',
        'Bacterial growth curve se doubling time aur specific growth rate (mu) calculate karna',
        'Transformation, Transduction, aur Conjugation ke mechanisms ko trace karna',
      ],
    },
    references: [
      { citation: 'Madigan M. T. et al. Brock Biology of Microorganisms. 16th Edition, Pearson.', type: 'Book', year: 2021 },
      { citation: 'Willey J. M. et al. Prescott\'s Microbiology. 11th Edition, McGraw-Hill.', type: 'Book', year: 2020 },
    ],
    units: [],
  },
  {
    id: 'sub-06',
    slug: 'immunology',
    name: { en: 'Immunology', hinglish: 'Immunology (Pratiraksha Vigyan)' },
    description: {
      en: 'Innate immunity, antigen presentation, antibody classes, V(D)J recombination, MHC restriction, and hypersensitivity reactions.',
      hinglish: 'Innate aur adaptive immunity, antibody structure, MHC Class I/II pathways, T-cell activation, autoimmunity, aur vaccines.',
    },
    icon: 'Shield',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 6,
    isPublished: true,
    overview: {
      en: 'Immunology analyzes host defense systems against biological pathogens. It explores clonal selection, somatic hypermutation, cytokine signaling, monoclonal antibodies, and vaccine design.',
      hinglish: 'Immunology immune system ke defense mechanisms ko analyze karti hai. Isme antibodies, MHC proteins, T cell receptors, aur immunological assays shamil hain.',
    },
    learningObjectives: {
      en: [
        'Outline immunoglobulin domain structure and compare effector functions of IgG, IgM, IgA, IgE, and IgD',
        'Trace antigen processing and presentation via cytosolic (MHC-I) and endocytic (MHC-II) pathways',
        'Differentiate Coombs & Gell Hypersensitivity mechanisms Types I, II, III, and IV',
      ],
      hinglish: [
        'Antibodies ke 5 classes aur unke functions ko accurately compare karna',
        'MHC Class I aur Class II antigen presentation pathways ko step-by-step trace karna',
        'Hypersensitivity reactions ke 4 types ko clinically aur mechanistically differentiate karna',
      ],
    },
    references: [
      { citation: 'Punt J. et al. Kuby Immunology. 8th Edition, W. H. Freeman.', type: 'Book', year: 2018 },
      { citation: 'Murphy K. & Weaver C. Janeway\'s Immunobiology. 9th Edition, Garland Science.', type: 'Book', year: 2016 },
    ],
    units: [],
  },
  {
    id: 'sub-07',
    slug: 'genetic-engineering',
    name: {
      en: 'Genetic Engineering & Recombinant DNA',
      hinglish: 'Genetic Engineering & rDNA Technology',
    },
    description: {
      en: 'Restriction endonucleases, cloning vectors, expression systems, CRISPR-Cas9 genome editing, PCR methodologies, and DNA libraries.',
      hinglish: 'Restriction enzymes, plasmid vectors, gene cloning, blue-white screening, PCR variants, aur CRISPR-Cas9 genome editing.',
    },
    icon: 'Wrench',
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 7,
    isPublished: true,
    overview: {
      en: 'Genetic Engineering represents the toolkit for targeted modification of genetic material. It covers restriction cleavage, ligation, transformation, site-directed mutagenesis, and recombinant therapeutic production.',
      hinglish: 'Genetic Engineering recombinant DNA banane aur organisms ke genome ko modify karne ki technology hai. Isme cloning vectors, PCR, aur CRISPR Cas9 shamil hain.',
    },
    learningObjectives: {
      en: [
        'Select appropriate restriction endonucleases, ligases, and phosphatases for directional sticky-end cloning',
        'Design CRISPR-Cas9 single guide RNAs (sgRNAs) matching 5\'-NGG-3\' PAM sites for double-strand cleavage',
        'Compare recombinant protein expression across bacterial, yeast, insect, and mammalian platforms',
      ],
      hinglish: [
        'Cloning ke liye sahi restriction enzymes aur vector selection karna',
        'CRISPR-Cas9 sgRNA design aur PAM recognition rules ko master karna',
        'Bacterial vs eukaryotic expression systems ke pros and cons evaluate karna',
      ],
    },
    references: [
      { citation: 'Brown T. A. Gene Cloning and DNA Analysis: An Introduction. 8th Edition, Wiley-Blackwell.', type: 'Book', year: 2020 },
      { citation: 'Primrose S. B. & Twyman R. M. Principles of Gene Manipulation and Genomics. 7th Edition, Blackwell.', type: 'Book', year: 2006 },
    ],
    units: [],
  },
  {
    id: 'sub-08',
    slug: 'bioprocess-technology',
    name: {
      en: 'Bioprocess Technology & Engineering',
      hinglish: 'Bioprocess Technology & Fermentation Engineering',
    },
    description: {
      en: 'Bioreactor design, fluid mechanics, oxygen mass transfer (kLa), sterilization kinetics, upstream fermentation, and downstream processing.',
      hinglish: 'Bioreactor design, oxygen transfer rate (kLa), media sterilization kinetics, fed-batch fermentation, aur downstream purification.',
    },
    icon: 'Cpu',
    unitsCount: 4,
    topicsCount: 14,
    orderIndex: 8,
    isPublished: true,
    overview: {
      en: 'Bioprocess Engineering scales laboratory biological discoveries into industrial-scale production. It explores mass and energy balances, aeration and agitation mechanics, and separation methods.',
      hinglish: 'Bioprocess Engineering laboratory research ko commercial production me convert karti hai. Isme stirred tank bioreactors, oxygen transfer kLa, aur chromatography shamil hain.',
    },
    learningObjectives: {
      en: [
        'Calculate volumetric mass transfer coefficient (kLa) and oxygen uptake rate in aerobic fermenters',
        'Compute thermal death kinetics (Del factor, D-value, z-value) for media batch and continuous sterilization',
        'Evaluate downstream purification yields across filtration, chromatography, and lyophilization steps',
      ],
      hinglish: [
        'Oxygen transfer coefficient (kLa) aur oxygen uptake rate calculate karna',
        'Sterilization Del factor aur thermal inactivation kinetics solve karna',
        'Downstream processing me recovery yield aur product purity determine karna',
      ],
    },
    references: [
      { citation: 'Doran P. M. Bioprocess Engineering Principles. 2nd Edition, Academic Press.', type: 'Book', year: 2012 },
      { citation: 'Shuler M. L. et al. Bioprocess Engineering: Basic Concepts. 3rd Edition, Prentice Hall.', type: 'Book', year: 2017 },
    ],
    units: [],
  },
  {
    id: 'sub-09',
    slug: 'bioinformatics',
    name: { en: 'Bioinformatics', hinglish: 'Bioinformatics (Jaiv Soochna Vigyan)' },
    description: {
      en: 'Biological databases, pairwise and multiple sequence alignment (BLAST, Clustal), structural modeling, molecular docking, and phylogenetic trees.',
      hinglish: 'Biological databases (NCBI, UniProt, PDB), sequence alignment algorithms (BLAST), protein structure modeling, aur phylogenetics.',
    },
    icon: 'Terminal',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 9,
    isPublished: true,
    overview: {
      en: 'Bioinformatics applies computational and statistical methodologies to biological data. It covers dynamic programming (Smith-Waterman, Needleman-Wunsch), scoring matrices (PAM, BLOSUM), and structural genomics.',
      hinglish: 'Bioinformatics biological data ko computational algorithms se analyze karti hai. Isme BLAST algorithms, PAM/BLOSUM scoring matrices, aur 3D protein structure prediction shamil hain.',
    },
    learningObjectives: {
      en: [
        'Execute and interpret BLAST searches evaluating E-values, bit scores, and alignment coverage',
        'Differentiate PAM and BLOSUM substitution matrices for evolutionary distance matching',
        'Construct and root phylogenetic trees using Neighbor-Joining, Maximum Parsimony, and Maximum Likelihood',
      ],
      hinglish: [
        'BLAST search results me E-value aur bit score ka accurate biological meaning nikalna',
        'PAM aur BLOSUM matrices ke difference aur selection criteria ko samajhna',
        'Phylogenetic trees construct karke evolutionary distances analyze karna',
      ],
    },
    references: [
      { citation: 'Pevsner J. Bioinformatics and Functional Genomics. 3rd Edition, Wiley-Blackwell.', type: 'Book', year: 2015 },
      { citation: 'Xiong J. Essential Bioinformatics. Cambridge University Press.', type: 'Book', year: 2006 },
    ],
    units: [],
  },
  {
    id: 'sub-10',
    slug: 'plant-animal-biotechnology',
    name: {
      en: 'Plant & Animal Biotechnology',
      hinglish: 'Plant aur Animal Biotechnology',
    },
    description: {
      en: 'Plant tissue culture, Agrobacterium tumefaciens Ti plasmid transformation, transgenic crops, mammalian cell culture, monoclonal hybridomas, and stem cell biology.',
      hinglish: 'Plant tissue culture, Agrobacterium-mediated gene transfer, transgenic crops, animal cell culture, hybridoma technology, aur stem cells.',
    },
    icon: 'Trees',
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 10,
    isPublished: true,
    overview: {
      en: 'Plant and Animal Biotechnology focuses on cell culture systems and transgenic modifications of multicellular eukaryotes. It covers totipotency, binary vectors, somatic cell nuclear transfer, and regenerative therapies.',
      hinglish: 'Ye subject plants aur animals me biotechnology applications ko cover karta hai. Isme tissue culture, transgenic animals, monoclonal antibodies, aur stem cells shamil hain.',
    },
    learningObjectives: {
      en: [
        'Formulate plant tissue culture media manipulating auxin-to-cytokinin ratios for organogenesis versus embryogenesis',
        'Trace Agrobacterium Ti plasmid vir gene induction and T-DNA nuclear integration into plant genomes',
        'Detail hybridoma generation using PEG fusion and HAT selective medium for monoclonal antibody synthesis',
      ],
      hinglish: [
        'Auxin aur cytokinin ratio se shoot aur root development control karna',
        'Agrobacterium vir gene cascade aur T-DNA transfer mechanism ko explain karna',
        'HAT medium selection mechanism se hybridoma cells isolate karna',
      ],
    },
    references: [
      { citation: 'Slater A. et al. Plant Biotechnology: The Genetic Manipulation of Plants. 2nd Edition, Oxford University Press.', type: 'Book', year: 2008 },
      { citation: 'Freshney R. I. Culture of Animal Cells: A Manual of Basic Technique and Specialized Applications. 7th Edition, Wiley.', type: 'Book', year: 2016 },
    ],
    units: [],
  },
  {
    id: 'sub-11',
    slug: 'ipr-biosafety',
    name: {
      en: 'IPR, Biosafety & Bioethics',
      hinglish: 'IPR, Biosafety aur Bioethics',
    },
    description: {
      en: 'Intellectual property rights, patentability criteria, WTO/TRIPS, plant variety protection, biosafety regulatory committees (IBSC, RCGM, GEAC), and bioethics.',
      hinglish: 'Patents, copyright, trademarks, TRIPS agreement, Indian biosafety guidelines (IBSC, RCGM, GEAC), aur bioethical considerations.',
    },
    icon: 'Scale',
    unitsCount: 4,
    topicsCount: 14,
    orderIndex: 11,
    isPublished: true,
    overview: {
      en: 'IPR, Biosafety, and Bioethics define the legal, ethical, and safety boundaries of biotechnological innovations. It covers patent law criteria, GMO containment levels, and statutory regulatory bodies in India.',
      hinglish: 'Ye subject biotechnology ke legal, safety, aur ethical rules ko explain karta hai. Isme patent filing rules, BSL containment levels, aur GEAC/RCGM approval protocols shamil hain.',
    },
    learningObjectives: {
      en: [
        'Analyze patentability criteria: Novelty, Non-obviousness/Inventive Step, and Industrial Utility',
        'Differentiate Indian regulatory roles of IBSC, RCGM, and GEAC in GMO development and release',
        'Categorize biological containment standards across Biosafety Levels 1 through 4 (BSL-1 to BSL-4)',
      ],
      hinglish: [
        'Patent grant karne ke teen fundamental criteria evaluate karna',
        'IBSC, RCGM, aur GEAC ke legal roles aur clearance hierarchies ko samajhna',
        'BSL-1 se BSL-4 containment requirements aur risk groups ko identify karna',
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
    units: [],
  },
];
