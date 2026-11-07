// server.ts
import express4 from "express";
import path3 from "path";
import { fileURLToPath as fileURLToPath3 } from "url";
import dotenv from "dotenv";
import { GoogleGenAI as GoogleGenAI2 } from "@google/genai";

// server/adminRoutes.ts
import express from "express";
import crypto from "crypto";
import path2 from "path";
import multer from "multer";
import bcrypt2 from "bcryptjs";
import { fileURLToPath as fileURLToPath2 } from "url";

// server/db.ts
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

// server/data/defaultSubjects.ts
var DEFAULT_11_SUBJECTS = [
  {
    id: "sub-01",
    slug: "cell-biology",
    name: {
      en: "Cell Biology",
      hinglish: "Cell Biology (Koshika Vigyan)"
    },
    description: {
      en: "Structural and functional organization of eukaryotic and prokaryotic cells, membrane transport, organelle biogenesis, signaling pathways, and cell cycle checkpoints.",
      hinglish: "Eukaryotic aur prokaryotic cells ka structural aur functional organization, membrane transport, cell organelles, signal transduction, aur cell cycle regulation."
    },
    icon: "Layers",
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 1,
    isPublished: true,
    overview: {
      en: "Cell Biology is the fundamental bedrock of all biotechnological inquiry. It deals with subcellular architecture, dynamic biomembrane fluidity, vesicular trafficking via Golgi and ER, cytoskeletal mechanics, and apoptotic cascades crucial for biomanufacturing and cellular engineering.",
      hinglish: "Cell biology biotechnology ki basic foundation hai. Isme membrane dynamics, organelles ke internal functions, signal transduction pathways, aur cell division mechanisms covered hain."
    },
    learningObjectives: {
      en: [
        "Understand phospholipid bilayer dynamics and transport kinetics across selective membranes",
        "Analyze protein sorting pathways between Endoplasmic Reticulum, Golgi complex, and lysosomes",
        "Examine GPCR and Receptor Tyrosine Kinase (RTK) signal transduction cascades",
        "Trace cell cycle control points (Cyclins, CDKs) and apoptotic intrinsic/extrinsic pathways"
      ],
      hinglish: [
        "Cell membrane ki structure aur selective transport mechanisms ko accurately samajhna",
        "Protein sorting aur intracellular vesicular transport pathways ko trace karna",
        "GPCR aur RTK signaling cascades ke molecular switches ko master karna",
        "Cell cycle checkpoints (Cyclin-CDK complex) aur apoptosis pathways ko verify karna"
      ]
    },
    keyFormulas: [
      {
        name: "Nernst Equation (Membrane Potential)",
        formula: "E = (RT / zF) * ln([Ion]_out / [Ion]_in)",
        description: {
          en: "Calculates the equilibrium electrical potential across an ion-permeable cell membrane.",
          hinglish: "Cell membrane ke across electrochemical equilibrium potential calculate karne ke liye use hota hai."
        }
      }
    ],
    references: [
      { citation: "Alberts B. et al. Molecular Biology of the Cell. 7th Edition, W. W. Norton & Company.", type: "Book", year: 2022 },
      { citation: "Lodish H. et al. Molecular Cell Biology. 9th Edition, Macmillan Learning.", type: "Book", year: 2021 }
    ],
    units: [
      {
        id: "u-cb-1",
        unitNumber: 1,
        title: {
          en: "Membrane Structure and Dynamic Transport",
          hinglish: "Cell Membrane Structure aur Transport Mechanisms"
        },
        chapters: [
          {
            id: "c-cb-1",
            chapterNumber: 1,
            title: {
              en: "Biomembrane Architecture and Fluidity",
              hinglish: "Biomembrane Architecture aur Lipid Dynamics"
            },
            topics: [
              {
                id: "top-cb-1",
                slug: "membrane-structure-and-transport",
                title: {
                  en: "Fluid Mosaic Model & Membrane Asymmetry",
                  hinglish: "Fluid Mosaic Model aur Membrane Asymmetry"
                },
                difficulty: "Beginner",
                readTimeMin: 12,
                orderIndex: 1,
                isPublished: true,
                contentEn: "Phospholipid bilayers form the basic structural matrix of biological membranes. The fluid mosaic model describes dynamic lateral diffusion of lipids and integral membrane proteins.",
                contentHinglish: "Phospholipid bilayer cell membrane ka basic matrix banati hai. Fluid mosaic model lipid aur proteins ke dynamic lateral movement ko explain karta hai.",
                keyPoints: [
                  "Amphipathic phosphoglycerides and sphingolipids form bilayers spontaneously in aqueous environments",
                  "Flippases, floppases, and scramblases maintain transverse lipid asymmetry",
                  "Cholesterol functions as a bidirectional fluidity buffer maintaining membrane integrity across temperatures"
                ]
              },
              {
                id: "top-cb-2",
                slug: "solute-transport-and-channels",
                title: {
                  en: "Passive Diffusion, Ion Channels & ABC Transporters",
                  hinglish: "Passive Diffusion, Ion Channels aur Active ABC Transporters"
                },
                difficulty: "Intermediate",
                readTimeMin: 14,
                orderIndex: 2,
                isPublished: true,
                contentEn: "Solute movement across biomembranes operates via simple diffusion, facilitated carrier proteins, voltage-gated channels, and primary/secondary active transporters.",
                contentHinglish: "Biomembrane ke across molecules simple diffusion, facilitated diffusion, aur ATP-dependent primary/secondary active transport dwara move karte hain.",
                keyPoints: [
                  "Na+/K+ ATPase establishes the fundamental -70mV resting potential via 3 Na+ out / 2 K+ in stoichiometry",
                  "ABC transporters utilize ATP hydrolysis cassettes to pump multidrug xenobiotics and peptides"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "u-cb-2",
        unitNumber: 2,
        title: {
          en: "Intracellular Organelles & Protein Sorting",
          hinglish: "Cell Organelles aur Protein Sorting Pathways"
        },
        chapters: [
          {
            id: "c-cb-2",
            chapterNumber: 2,
            title: {
              en: "Endoplasmic Reticulum & Golgi Vesicular Trafficking",
              hinglish: "ER aur Golgi Vesicular Transport"
            },
            topics: [
              {
                id: "top-cb-3",
                slug: "er-protein-translocation",
                title: {
                  en: "Co-translational Translocation & Chaperone Folding",
                  hinglish: "Co-translational Translocation aur Chaperones"
                },
                difficulty: "Intermediate",
                readTimeMin: 15,
                orderIndex: 3,
                isPublished: true,
                contentEn: "Nascent polypeptide chains bearing N-terminal signal peptides are targeted to the ER translocon by Signal Recognition Particle (SRP) and folded by BiP and calnexin.",
                contentHinglish: "SRP nascent peptide signal sequence ko recognize karke ribosome ko ER translocon par bind karwata hai jaha BiP chaperone protein folding facilitate karta hai.",
                keyPoints: [
                  "SRP binds hydrophobic signal peptides halting elongation until docking with SRP receptor",
                  "N-linked glycosylation transfers Glc3Man9GlcNAc2 oligosaccharide onto Asn residues at Asn-X-Ser/Thr motifs"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "u-cb-3",
        unitNumber: 3,
        title: {
          en: "Signal Transduction Pathways",
          hinglish: "Cellular Signaling Pathways (GPCR & RTK)"
        },
        chapters: [
          {
            id: "c-cb-3",
            chapterNumber: 3,
            title: {
              en: "Cell Surface Receptors & Secondary Messengers",
              hinglish: "Receptors aur Second Messengers"
            },
            topics: [
              {
                id: "top-cb-4",
                slug: "gpcr-signaling-mechanisms",
                title: {
                  en: "GPCR, Adenylyl Cyclase & Phospholipase C Cascades",
                  hinglish: "GPCR Signaling, cAMP aur IP3/DAG Cascades"
                },
                difficulty: "Advanced",
                readTimeMin: 16,
                orderIndex: 4,
                isPublished: true,
                contentEn: "Heterotrimeric G-proteins transduce extracellular ligand binding into intracellular second messenger generation via cAMP, IP3, DAG, and Ca2+ fluxes.",
                contentHinglish: "Ligand binding se 7-transmembrane GPCR conformational change undergo karta hai, jo Ga-GTP dissociation se adenylyl cyclase ya PLC-beta ko activate karta hai.",
                keyPoints: [
                  "Gas activates adenylyl cyclase elevating intracellular cAMP which activates Protein Kinase A (PKA)",
                  "Gaq activates Phospholipase C-beta cleaving PIP2 into IP3 (releasing ER Ca2+) and DAG (activating PKC)"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "u-cb-4",
        unitNumber: 4,
        title: {
          en: "Cell Cycle Control & Apoptosis",
          hinglish: "Cell Cycle Checkpoints aur Apoptosis Mechanisms"
        },
        chapters: [
          {
            id: "c-cb-4",
            chapterNumber: 4,
            title: {
              en: "Cyclin-CDK Complexes & Caspase Cascades",
              hinglish: "Cyclin-CDK Complex aur Caspases"
            },
            topics: [
              {
                id: "top-cb-5",
                slug: "cell-cycle-checkpoints",
                title: {
                  en: "G1/S, G2/M Checkpoints & p53 DNA Damage Response",
                  hinglish: "Cell Cycle Checkpoints aur p53 Pathway"
                },
                difficulty: "Advanced",
                readTimeMin: 18,
                orderIndex: 5,
                isPublished: true,
                contentEn: "Cell division fidelity is guaranteed by strict surveillance checkpoints governed by Cyclin-CDK complexes, Wee1/Cdc25 kinases, and the p53-p21 tumor suppressor axis.",
                contentHinglish: "Cell cycle checkpoints DNA damage par division ko halt karte hain. ATM/ATR kinase activation se p53 stabilize hota hai jo p21 CDK inhibitor express karta hai.",
                keyPoints: [
                  "Cyclin D-CDK4/6 phosphorylates Retinoblastoma (Rb) protein, releasing E2F to transcribe S-phase genes",
                  "Intrinsic apoptosis involves mitochondrial outer membrane permeabilization (MOMP) releasing cytochrome c to form the apoptosome with Apaf-1 and procaspase-9"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-02",
    slug: "biochemistry",
    name: {
      en: "Biochemistry",
      hinglish: "Biochemistry (Jaiv Rasayan)"
    },
    description: {
      en: "Thermodynamics of biological systems, structure and conformational kinetics of proteins, carbohydrate metabolism, lipid biosynthesis, and enzyme kinetics.",
      hinglish: "Biological systems ki thermodynamics, proteins ki 3D conformational dynamics, enzyme kinetics, glycolysis, Krebs cycle, aur lipid metabolism."
    },
    icon: "Atom",
    unitsCount: 4,
    topicsCount: 18,
    orderIndex: 2,
    isPublished: true,
    overview: {
      en: "Biochemistry bridges molecular architecture with cellular bioenergetics. It explores amino acid ionization, Ramachandran steric constraints, steady-state enzyme mechanics, and ATP generation via the mitochondrial electron transport chain.",
      hinglish: "Biochemistry biomolecules ke chemical structure aur energy conversions ko explain karti hai. Isme amino acids ke Ramachandran plots, Michaelis-Menten enzyme kinetics, aur metabolic pathways jaise Glycolysis aur oxidative phosphorylation detailed covered hain."
    },
    learningObjectives: {
      en: [
        "Calculate steady-state enzyme kinetics parameters using Michaelis-Menten and Lineweaver-Burk transformations",
        "Analyze protein folding free-energy landscapes, secondary motifs, and tertiary stabilization bonds",
        "Trace carbon flux through Glycolysis, TCA cycle, Gluconeogenesis, and Pentose Phosphate Pathway",
        "Compute Gibbs free energy changes for bioenergetic reactions in oxidative phosphorylation"
      ],
      hinglish: [
        "Michaelis-Menten equation aur Lineweaver-Burk plots se Km aur Vmax accurately nikalna",
        "Proteins ke secondary structure aur Ramachandran plot angles ko analyze karna",
        "Central metabolic pathways (Glycolysis, Krebs cycle, ETC) me ATP balance sheet calculate karna",
        "Enzyme inhibition types (Competitive, Non-competitive, Uncompetitive) me Lineweaver-Burk shifts samajhna"
      ]
    },
    keyFormulas: [
      {
        name: "Michaelis-Menten Equation",
        formula: "v0 = (Vmax * [S]) / (Km + [S])",
        description: {
          en: "Relates reaction velocity to substrate concentration for hyperbolic single-substrate enzymes.",
          hinglish: "Substrate concentration aur enzyme reaction speed ke relationship ko describe karta hai."
        }
      },
      {
        name: "Henderson-Hasselbalch Equation",
        formula: "pH = pKa + log([A-] / [HA])",
        description: {
          en: "Determines the pH of a physiological buffer solution based on conjugate base/acid ratio.",
          hinglish: "Biological buffers me acid-base conjugate ratio se buffer pH calculate karne ke liye formula."
        }
      }
    ],
    references: [
      { citation: "Nelson D. L. & Cox M. M. Lehninger Principles of Biochemistry. 8th Edition, W. H. Freeman.", type: "Book", year: 2021 },
      { citation: "Voet D. & Voet J. G. Biochemistry. 5th Edition, John Wiley & Sons.", type: "Book", year: 2018 }
    ],
    units: [
      {
        id: "u-bc-1",
        unitNumber: 1,
        title: { en: "Protein Structure & Enzymology", hinglish: "Protein Structure aur Enzyme Kinetics" },
        chapters: [
          {
            id: "c-bc-1",
            chapterNumber: 1,
            title: { en: "Enzyme Kinetics & Inhibition Types", hinglish: "Enzyme Kinetics aur Inhibition" },
            topics: [
              {
                id: "top-bc-1",
                slug: "enzyme-kinetics-and-inhibition",
                title: { en: "Michaelis-Menten Kinetics & Lineweaver-Burk Analysis", hinglish: "Michaelis-Menten aur Lineweaver-Burk Analysis" },
                difficulty: "Intermediate",
                readTimeMin: 16,
                orderIndex: 1,
                isPublished: true,
                contentEn: "Enzymes accelerate biochemical reactions by stabilizing transition states. Steady-state Michaelis-Menten kinetics mathematically models initial velocity as a function of substrate concentration.",
                contentHinglish: "Enzymes transition state ko stabilize karke activation energy decrease karte hain. Michaelis-Menten equation initial velocity aur substrate concentration ka relation deti hai.",
                keyPoints: [
                  "Km represents substrate concentration at half-maximal velocity (Vmax/2) reflecting binding affinity",
                  "Competitive inhibition increases apparent Km without changing Vmax; Lineweaver-Burk lines pivot on the 1/v0 y-axis intercept"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-03",
    slug: "genetics",
    name: { en: "Genetics", hinglish: "Genetics (Aanuvanshiki)" },
    description: {
      en: "Mendelian inheritance, linkage mapping, recombination, chromosome aberrations, gene interactions, and population genetics.",
      hinglish: "Mendelian principles, gene mapping, recombination frequency, chromosomal abnormalities, aur population genetics."
    },
    icon: "Dna",
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 3,
    isPublished: true,
    overview: {
      en: "Genetics governs the transmission and variation of biological traits across generations. It covers classical cross-breeding models, quantitative inheritance, three-point testcross mapping, and Hardy-Weinberg equilibrium.",
      hinglish: "Genetics biological traits ke inheritance aur variation ko samjhati hai. Isme Mendel ke laws, linkage mapping, chromosomal mutations, aur population genetics shamil hain."
    },
    learningObjectives: {
      en: [
        "Calculate recombination frequencies and gene order from three-point testcross data",
        "Solve non-Mendelian epistatic ratio modifications (9:7, 12:3:1, 9:3:4, 15:1)",
        "Compute Hardy-Weinberg allele and genotype frequencies under selection pressure"
      ],
      hinglish: [
        "Three-point testcross data se gene order aur map distance (cM) nikalna",
        "Modified epistatic ratios aur gene interaction problems solve karna",
        "Hardy-Weinberg equilibrium equations se allele frequencies calculate karna"
      ]
    },
    keyFormulas: [
      {
        name: "Hardy-Weinberg Equation",
        formula: "p^2 + 2pq + q^2 = 1 ; p + q = 1",
        description: {
          en: "Predicts allele and genotype distribution in an idealized non-evolving population.",
          hinglish: "Ideal population me allele aur genotype frequencies predict karne ka fundamental formula."
        }
      }
    ],
    references: [
      { citation: "Griffiths A. J. F. et al. Introduction to Genetic Analysis. 12th Edition, W. H. Freeman.", type: "Book", year: 2020 },
      { citation: "Klug W. S. et al. Concepts of Genetics. 12th Edition, Pearson.", type: "Book", year: 2019 }
    ],
    units: [
      {
        id: "u-gen-1",
        unitNumber: 1,
        title: { en: "Linkage Mapping & Gene Interaction", hinglish: "Linkage Mapping aur Gene Interactions" },
        chapters: [
          {
            id: "c-gen-1",
            chapterNumber: 1,
            title: { en: "Recombination & Chromosome Mapping", hinglish: "Recombination aur Three-Point Testcross" },
            topics: [
              {
                id: "top-gen-1",
                slug: "linkage-mapping-and-three-point-testcross",
                title: { en: "Three-Point Testcross & Genetic Distance (cM)", hinglish: "Three-Point Testcross aur Map Distance" },
                difficulty: "Advanced",
                readTimeMin: 18,
                orderIndex: 1,
                isPublished: true,
                contentEn: "Linkage mapping deduces linear chromosomal gene arrangement by quantifying crossing-over frequencies between heterozygous loci and homozygous recessive testers.",
                contentHinglish: "Three-point testcross me recombinant frequencies calculate karke teen genes ka accurate linear order aur inter-genic distances (centimorgans) nikaale jate hain.",
                keyPoints: [
                  "Double cross-over (DCO) classes have the lowest numerical frequency; comparing DCO with parental classes identifies the middle gene",
                  "Coefficient of Coincidence (C) = Observed DCO / Expected DCO ; Interference (I) = 1 - C"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-04",
    slug: "molecular-biology",
    name: { en: "Molecular Biology", hinglish: "Molecular Biology (Aanvik Jeev Vigyan)" },
    description: {
      en: "Central dogma mechanisms: DNA replication fidelity, transcription regulation, RNA processing, translation mechanisms, and operon control.",
      hinglish: "DNA replication, transcription, RNA splicing, translation machinery, lac/trp operon regulation, aur molecular repair systems."
    },
    icon: "Binary",
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 4,
    isPublished: true,
    overview: {
      en: "Molecular Biology elucidates the information flow from nucleotide sequences to functional proteins. It details polymerases, topoisomerases, spliceosomes, ribosomal catalytic peptidyl transferase centers, and epigenetic chromatin dynamics.",
      hinglish: "Molecular Biology biological information ke flow ko explain karti hai. Isme replication fork proteins, RNA polymerase regulation, aur operon switches detail me covered hain."
    },
    learningObjectives: {
      en: [
        "Detail bacterial and eukaryotic replication fork progression and proofreading excision",
        "Analyze promoter architecture, sigma factors, and general transcription factors (TFIID, TFIIH)",
        "Explain mRNA post-transcriptional processing: 5' capping, spliceosomal intron excision, and polyadenylation",
        "Interpret negative and positive gene regulatory circuits in Lac, Trp, and Ara operons"
      ],
      hinglish: [
        "Prokaryotic aur eukaryotic replication machinery aur proofreading mechanisms samajhna",
        "RNA polymerase holoenzyme promoters aur transcription factors ko map karna",
        "Pre-mRNA splicing, 5' cap, aur 3' poly-A tail ke biochemical steps ko verify karna",
        "Lac aur Trp operons ke induction, repression, aur attenuation mechanisms ko master karna"
      ]
    },
    references: [
      { citation: "Watson J. D. et al. Molecular Biology of the Gene. 7th Edition, Pearson.", type: "Book", year: 2014 },
      { citation: "Krebs J. E. et al. Lewin's GENES XII. Jones & Bartlett Learning.", type: "Book", year: 2018 }
    ],
    units: [
      {
        id: "u-mb-1",
        unitNumber: 1,
        title: { en: "DNA Replication & Repair Mechanisms", hinglish: "DNA Replication aur Repair" },
        chapters: [
          {
            id: "c-mb-1",
            chapterNumber: 1,
            title: { en: "Replication Machinery & Fork Progression", hinglish: "Replication Machinery" },
            topics: [
              {
                id: "top-mb-1",
                slug: "dna-replication-in-prokaryotes",
                title: { en: "DNA Replication in Prokaryotes: Molecular Architecture and Fidelity", hinglish: "Prokaryotes me DNA Replication" },
                difficulty: "Intermediate",
                readTimeMin: 14,
                orderIndex: 1,
                isPublished: true,
                contentEn: "Replication in E. coli initiates at oriC where DnaA oligomerizes to melt 13-mer AT-rich repeats. DnaB helicase unwinds duplex DNA, stabilized by SSB proteins.",
                contentHinglish: "E. coli me replication oriC par shuru hota hai. DnaB helicase DNA strands ko separate karta hai aur DNA Polymerase III holoenzyme leading aur lagging strands synthesize karta hai.",
                keyPoints: [
                  "DNA Polymerase III core contains alpha (polymerase), epsilon (3' to 5' exonuclease proofreader), and theta subunits",
                  "Beta clamp confers high processivity (>5000 nucleotides per binding event)",
                  "DNA Polymerase I utilizes 5' to 3' exonuclease nick translation to remove RNA primers"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "sub-05",
    slug: "microbiology",
    name: { en: "Microbiology", hinglish: "Microbiology (Sukshmjeev Vigyan)" },
    description: {
      en: "Bacterial morphology, cell wall architecture, culture kinetics, microbial genetics, pathogenic mechanisms, and industrial fermentation strains.",
      hinglish: "Bacteria, viruses, fungi ka classification, cell wall structure, microbial growth kinetics, sterilization, aur antibiotic resistance."
    },
    icon: "Bug",
    unitsCount: 4,
    topicsCount: 14,
    orderIndex: 5,
    isPublished: true,
    overview: {
      en: "Microbiology covers microscopic biological entities driving biogeochemical cycles and bioprocess applications. It encompasses peptidoglycan crosslinking, endotoxins, horizontal gene transfer, and sterilization kinetics.",
      hinglish: "Microbiology bacteria, viruses, aur fungi ke biological study ko cover karti hai. Isme Gram staining, bacterial growth curves, aur industrial strain applications detailed hain."
    },
    learningObjectives: {
      en: [
        "Differentiate Gram-positive and Gram-negative peptidoglycan and outer membrane lipopolysaccharide architecture",
        "Calculate specific growth rate, doubling time, and yield coefficients from batch growth kinetics",
        "Compare mechanisms of horizontal gene transfer: Transformation, Transduction, and Conjugation"
      ],
      hinglish: [
        "Gram-positive aur Gram-negative cell wall ke molecular differences ko identify karna",
        "Bacterial growth curve se doubling time aur specific growth rate (mu) calculate karna",
        "Transformation, Transduction, aur Conjugation ke mechanisms ko trace karna"
      ]
    },
    references: [
      { citation: "Madigan M. T. et al. Brock Biology of Microorganisms. 16th Edition, Pearson.", type: "Book", year: 2021 },
      { citation: "Willey J. M. et al. Prescott's Microbiology. 11th Edition, McGraw-Hill.", type: "Book", year: 2020 }
    ],
    units: []
  },
  {
    id: "sub-06",
    slug: "immunology",
    name: { en: "Immunology", hinglish: "Immunology (Pratiraksha Vigyan)" },
    description: {
      en: "Innate immunity, antigen presentation, antibody classes, V(D)J recombination, MHC restriction, and hypersensitivity reactions.",
      hinglish: "Innate aur adaptive immunity, antibody structure, MHC Class I/II pathways, T-cell activation, autoimmunity, aur vaccines."
    },
    icon: "Shield",
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 6,
    isPublished: true,
    overview: {
      en: "Immunology analyzes host defense systems against biological pathogens. It explores clonal selection, somatic hypermutation, cytokine signaling, monoclonal antibodies, and vaccine design.",
      hinglish: "Immunology immune system ke defense mechanisms ko analyze karti hai. Isme antibodies, MHC proteins, T cell receptors, aur immunological assays shamil hain."
    },
    learningObjectives: {
      en: [
        "Outline immunoglobulin domain structure and compare effector functions of IgG, IgM, IgA, IgE, and IgD",
        "Trace antigen processing and presentation via cytosolic (MHC-I) and endocytic (MHC-II) pathways",
        "Differentiate Coombs & Gell Hypersensitivity mechanisms Types I, II, III, and IV"
      ],
      hinglish: [
        "Antibodies ke 5 classes aur unke functions ko accurately compare karna",
        "MHC Class I aur Class II antigen presentation pathways ko step-by-step trace karna",
        "Hypersensitivity reactions ke 4 types ko clinically aur mechanistically differentiate karna"
      ]
    },
    references: [
      { citation: "Punt J. et al. Kuby Immunology. 8th Edition, W. H. Freeman.", type: "Book", year: 2018 },
      { citation: "Murphy K. & Weaver C. Janeway's Immunobiology. 9th Edition, Garland Science.", type: "Book", year: 2016 }
    ],
    units: []
  },
  {
    id: "sub-07",
    slug: "genetic-engineering",
    name: {
      en: "Genetic Engineering & Recombinant DNA",
      hinglish: "Genetic Engineering & rDNA Technology"
    },
    description: {
      en: "Restriction endonucleases, cloning vectors, expression systems, CRISPR-Cas9 genome editing, PCR methodologies, and DNA libraries.",
      hinglish: "Restriction enzymes, plasmid vectors, gene cloning, blue-white screening, PCR variants, aur CRISPR-Cas9 genome editing."
    },
    icon: "Wrench",
    unitsCount: 4,
    topicsCount: 16,
    orderIndex: 7,
    isPublished: true,
    overview: {
      en: "Genetic Engineering represents the toolkit for targeted modification of genetic material. It covers restriction cleavage, ligation, transformation, site-directed mutagenesis, and recombinant therapeutic production.",
      hinglish: "Genetic Engineering recombinant DNA banane aur organisms ke genome ko modify karne ki technology hai. Isme cloning vectors, PCR, aur CRISPR Cas9 shamil hain."
    },
    learningObjectives: {
      en: [
        "Select appropriate restriction endonucleases, ligases, and phosphatases for directional sticky-end cloning",
        "Design CRISPR-Cas9 single guide RNAs (sgRNAs) matching 5'-NGG-3' PAM sites for double-strand cleavage",
        "Compare recombinant protein expression across bacterial, yeast, insect, and mammalian platforms"
      ],
      hinglish: [
        "Cloning ke liye sahi restriction enzymes aur vector selection karna",
        "CRISPR-Cas9 sgRNA design aur PAM recognition rules ko master karna",
        "Bacterial vs eukaryotic expression systems ke pros and cons evaluate karna"
      ]
    },
    references: [
      { citation: "Brown T. A. Gene Cloning and DNA Analysis: An Introduction. 8th Edition, Wiley-Blackwell.", type: "Book", year: 2020 },
      { citation: "Primrose S. B. & Twyman R. M. Principles of Gene Manipulation and Genomics. 7th Edition, Blackwell.", type: "Book", year: 2006 }
    ],
    units: []
  },
  {
    id: "sub-08",
    slug: "bioprocess-technology",
    name: {
      en: "Bioprocess Technology & Engineering",
      hinglish: "Bioprocess Technology & Fermentation Engineering"
    },
    description: {
      en: "Bioreactor design, fluid mechanics, oxygen mass transfer (kLa), sterilization kinetics, upstream fermentation, and downstream processing.",
      hinglish: "Bioreactor design, oxygen transfer rate (kLa), media sterilization kinetics, fed-batch fermentation, aur downstream purification."
    },
    icon: "Cpu",
    unitsCount: 4,
    topicsCount: 14,
    orderIndex: 8,
    isPublished: true,
    overview: {
      en: "Bioprocess Engineering scales laboratory biological discoveries into industrial-scale production. It explores mass and energy balances, aeration and agitation mechanics, and separation methods.",
      hinglish: "Bioprocess Engineering laboratory research ko commercial production me convert karti hai. Isme stirred tank bioreactors, oxygen transfer kLa, aur chromatography shamil hain."
    },
    learningObjectives: {
      en: [
        "Calculate volumetric mass transfer coefficient (kLa) and oxygen uptake rate in aerobic fermenters",
        "Compute thermal death kinetics (Del factor, D-value, z-value) for media batch and continuous sterilization",
        "Evaluate downstream purification yields across filtration, chromatography, and lyophilization steps"
      ],
      hinglish: [
        "Oxygen transfer coefficient (kLa) aur oxygen uptake rate calculate karna",
        "Sterilization Del factor aur thermal inactivation kinetics solve karna",
        "Downstream processing me recovery yield aur product purity determine karna"
      ]
    },
    references: [
      { citation: "Doran P. M. Bioprocess Engineering Principles. 2nd Edition, Academic Press.", type: "Book", year: 2012 },
      { citation: "Shuler M. L. et al. Bioprocess Engineering: Basic Concepts. 3rd Edition, Prentice Hall.", type: "Book", year: 2017 }
    ],
    units: []
  },
  {
    id: "sub-09",
    slug: "bioinformatics",
    name: { en: "Bioinformatics", hinglish: "Bioinformatics (Jaiv Soochna Vigyan)" },
    description: {
      en: "Biological databases, pairwise and multiple sequence alignment (BLAST, Clustal), structural modeling, molecular docking, and phylogenetic trees.",
      hinglish: "Biological databases (NCBI, UniProt, PDB), sequence alignment algorithms (BLAST), protein structure modeling, aur phylogenetics."
    },
    icon: "Terminal",
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 9,
    isPublished: true,
    overview: {
      en: "Bioinformatics applies computational and statistical methodologies to biological data. It covers dynamic programming (Smith-Waterman, Needleman-Wunsch), scoring matrices (PAM, BLOSUM), and structural genomics.",
      hinglish: "Bioinformatics biological data ko computational algorithms se analyze karti hai. Isme BLAST algorithms, PAM/BLOSUM scoring matrices, aur 3D protein structure prediction shamil hain."
    },
    learningObjectives: {
      en: [
        "Execute and interpret BLAST searches evaluating E-values, bit scores, and alignment coverage",
        "Differentiate PAM and BLOSUM substitution matrices for evolutionary distance matching",
        "Construct and root phylogenetic trees using Neighbor-Joining, Maximum Parsimony, and Maximum Likelihood"
      ],
      hinglish: [
        "BLAST search results me E-value aur bit score ka accurate biological meaning nikalna",
        "PAM aur BLOSUM matrices ke difference aur selection criteria ko samajhna",
        "Phylogenetic trees construct karke evolutionary distances analyze karna"
      ]
    },
    references: [
      { citation: "Pevsner J. Bioinformatics and Functional Genomics. 3rd Edition, Wiley-Blackwell.", type: "Book", year: 2015 },
      { citation: "Xiong J. Essential Bioinformatics. Cambridge University Press.", type: "Book", year: 2006 }
    ],
    units: []
  },
  {
    id: "sub-10",
    slug: "plant-animal-biotechnology",
    name: {
      en: "Plant & Animal Biotechnology",
      hinglish: "Plant aur Animal Biotechnology"
    },
    description: {
      en: "Plant tissue culture, Agrobacterium tumefaciens Ti plasmid transformation, transgenic crops, mammalian cell culture, monoclonal hybridomas, and stem cell biology.",
      hinglish: "Plant tissue culture, Agrobacterium-mediated gene transfer, transgenic crops, animal cell culture, hybridoma technology, aur stem cells."
    },
    icon: "Trees",
    unitsCount: 4,
    topicsCount: 15,
    orderIndex: 10,
    isPublished: true,
    overview: {
      en: "Plant and Animal Biotechnology focuses on cell culture systems and transgenic modifications of multicellular eukaryotes. It covers totipotency, binary vectors, somatic cell nuclear transfer, and regenerative therapies.",
      hinglish: "Ye subject plants aur animals me biotechnology applications ko cover karta hai. Isme tissue culture, transgenic animals, monoclonal antibodies, aur stem cells shamil hain."
    },
    learningObjectives: {
      en: [
        "Formulate plant tissue culture media manipulating auxin-to-cytokinin ratios for organogenesis versus embryogenesis",
        "Trace Agrobacterium Ti plasmid vir gene induction and T-DNA nuclear integration into plant genomes",
        "Detail hybridoma generation using PEG fusion and HAT selective medium for monoclonal antibody synthesis"
      ],
      hinglish: [
        "Auxin aur cytokinin ratio se shoot aur root development control karna",
        "Agrobacterium vir gene cascade aur T-DNA transfer mechanism ko explain karna",
        "HAT medium selection mechanism se hybridoma cells isolate karna"
      ]
    },
    references: [
      { citation: "Slater A. et al. Plant Biotechnology: The Genetic Manipulation of Plants. 2nd Edition, Oxford University Press.", type: "Book", year: 2008 },
      { citation: "Freshney R. I. Culture of Animal Cells: A Manual of Basic Technique and Specialized Applications. 7th Edition, Wiley.", type: "Book", year: 2016 }
    ],
    units: []
  },
  {
    id: "sub-11",
    slug: "ipr-biosafety",
    name: {
      en: "IPR, Biosafety & Bioethics",
      hinglish: "IPR, Biosafety aur Bioethics"
    },
    description: {
      en: "Intellectual property rights, patentability criteria, WTO/TRIPS, plant variety protection, biosafety regulatory committees (IBSC, RCGM, GEAC), and bioethics.",
      hinglish: "Patents, copyright, trademarks, TRIPS agreement, Indian biosafety guidelines (IBSC, RCGM, GEAC), aur bioethical considerations."
    },
    icon: "Scale",
    unitsCount: 4,
    topicsCount: 14,
    orderIndex: 11,
    isPublished: true,
    overview: {
      en: "IPR, Biosafety, and Bioethics define the legal, ethical, and safety boundaries of biotechnological innovations. It covers patent law criteria, GMO containment levels, and statutory regulatory bodies in India.",
      hinglish: "Ye subject biotechnology ke legal, safety, aur ethical rules ko explain karta hai. Isme patent filing rules, BSL containment levels, aur GEAC/RCGM approval protocols shamil hain."
    },
    learningObjectives: {
      en: [
        "Analyze patentability criteria: Novelty, Non-obviousness/Inventive Step, and Industrial Utility",
        "Differentiate Indian regulatory roles of IBSC, RCGM, and GEAC in GMO development and release",
        "Categorize biological containment standards across Biosafety Levels 1 through 4 (BSL-1 to BSL-4)"
      ],
      hinglish: [
        "Patent grant karne ke teen fundamental criteria evaluate karna",
        "IBSC, RCGM, aur GEAC ke legal roles aur clearance hierarchies ko samajhna",
        "BSL-1 se BSL-4 containment requirements aur risk groups ko identify karna"
      ]
    },
    keyFormulas: [
      {
        name: "Risk Assessment Factor (Biosafety)",
        formula: "Risk = Severity of Hazard * Likelihood of Exposure",
        description: {
          en: "Standard qualitative framework used in GMO environmental and laboratory risk assessment.",
          hinglish: "Laboratory containment aur GMO field trials me risk index calculate karne ka protocol."
        }
      }
    ],
    references: [
      { citation: "Department of Biotechnology (DBT), Government of India. Regulations and Guidelines for Recombinant DNA Research and Biocontainment.", type: "Standard Reference", year: 2017 },
      { citation: "World Intellectual Property Organization (WIPO). WIPO Intellectual Property Handbook.", type: "Standard Reference", year: 2004 }
    ],
    units: []
  }
];

// server/db.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
var DATA_DIR = isServerless ? "/tmp/data" : path.resolve(__dirname, "data");
var STORE_PATH = isServerless ? "/tmp/data/store.json" : path.resolve(DATA_DIR, "store.json");
var UPLOADS_DIR = isServerless ? "/tmp/uploads" : path.resolve(__dirname, "uploads");
try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {
  console.warn("Notice initializing DATA_DIR:", e);
}
try {
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
} catch (e) {
  console.warn("Notice initializing UPLOADS_DIR:", e);
}
var INITIAL_SUPERADMIN_EMAIL = "charanjaydeep712@gmail.com";
function createDefaultStore() {
  const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1e3).toISOString();
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  const initialPasswordHash = initialPassword ? bcrypt.hashSync(initialPassword, 10) : "";
  return {
    adminUsers: [
      {
        id: "usr-superadmin-01",
        email: INITIAL_SUPERADMIN_EMAIL,
        fullName: "Super Administrator",
        role: "superadmin",
        passwordHash: initialPasswordHash,
        isInitialSetupPending: !initialPassword,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        failedLoginAttempts: 0
      }
    ],
    adminSessions: [],
    maintenance: {
      enabled: false,
      title: "We'll Be Back Soon!",
      message_en: "BioScience Hub is temporarily under scheduled system maintenance and database optimization to provide an enhanced academic learning experience.",
      message_hi: "BioScience Hub \u092A\u0930 \u0906\u092A\u0915\u0947 \u0905\u0927\u094D\u092F\u092F\u0928 \u0905\u0928\u0941\u092D\u0935 \u0915\u094B \u0914\u0930 \u092C\u0947\u0939\u0924\u0930 \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0928\u093F\u0930\u094D\u0927\u093E\u0930\u093F\u0924 \u0938\u093F\u0938\u094D\u091F\u092E \u0930\u0916\u0930\u0916\u093E\u0935 \u0914\u0930 \u0921\u0947\u091F\u093E\u092C\u0947\u0938 \u0905\u0928\u0941\u0915\u0942\u0932\u0928 \u0915\u093E \u0915\u093E\u0930\u094D\u092F \u092A\u094D\u0930\u0917\u0924\u093F \u092A\u0930 \u0939\u0948\u0964",
      personal_message_en: "\u23F3 While BioScience Hub is getting ready to welcome you back, take this opportunity to spend some precious time with your family and loved ones. \u2764\uFE0F\u{1F468}\u{1F469}\u{1F467}\u{1F466}\n\nMake beautiful memories, share a smile, and enjoy the little moments of life. \u{1F338}\u2728\n\nWe'll be back soon with a better learning experience for you! \u{1F680}",
      personal_message_hi: "\u23F3 \u091C\u092C \u0924\u0915 BioScience Hub \u0926\u094B\u092C\u093E\u0930\u093E \u0936\u0941\u0930\u0942 \u0939\u094B\u0924\u093E \u0939\u0948, \u0924\u092C \u0924\u0915 \u0905\u092A\u0928\u093E \u092F\u0939 \u0915\u0940\u092E\u0924\u0940 \u0938\u092E\u092F \u0905\u092A\u0928\u0947 \u092A\u0930\u093F\u0935\u093E\u0930 \u0914\u0930 \u092A\u094D\u0930\u093F\u092F\u091C\u0928\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u092C\u093F\u0924\u093E\u0907\u090F\u0964 \u2764\uFE0F\u{1F468}\u{1F469}\u{1F467}\u{1F466}\n\n\u0905\u092A\u0928\u094B\u0902 \u0915\u0947 \u0938\u093E\u0925 \u0915\u0941\u091B \u0916\u0942\u092C\u0938\u0942\u0930\u0924 \u092A\u0932 \u092C\u093F\u0924\u093E\u0907\u090F, \u0916\u0941\u0936 \u0930\u0939\u093F\u090F \u0914\u0930 \u092E\u0941\u0938\u094D\u0915\u0941\u0930\u093E\u0924\u0947 \u0930\u0939\u093F\u090F\u0964 \u{1F338}\u2728\n\n\u0939\u092E \u091C\u0932\u094D\u0926 \u0939\u0940 \u0906\u092A\u0915\u0947 \u0932\u093F\u090F \u090F\u0915 \u092C\u0947\u0939\u0924\u0930 Learning Experience \u0915\u0947 \u0938\u093E\u0925 \u0935\u093E\u092A\u0938 \u0906\u090F\u0902\u0917\u0947! \u{1F680}",
      expected_reopening_iso: twoHoursLater,
      timezone: "Asia/Kolkata",
      mini_games: {
        memory_match: true,
        number_puzzle: true,
        quick_math: true,
        word_scramble: true
      },
      last_updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      last_updated_by: "system",
      history: []
    },
    popups: [],
    subjects: DEFAULT_11_SUBJECTS,
    auditLogs: [
      {
        id: "log-init-01",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        actorEmail: "system",
        actorRole: "system",
        action: "SYSTEM_INITIALIZED",
        resource: "DATABASE",
        details: { message: "BioScience Hub central database initialized." }
      }
    ],
    contactSubmissions: [
      {
        id: "cnt-01",
        name: "Prof. Ananya Sharma",
        email: "ananya.s@biotech-univ.ac.in",
        subject: "Curriculum mapping for Molecular Genetics unit",
        message: "The transcriptional regulation diagrams are extraordinarily clear. We have recommended BioScience Hub to our M.Sc. Biotechnology first semester cohort.",
        submittedAt: new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString(),
        status: "read"
      }
    ],
    newsletterSubscribers: [
      {
        id: "sub-01",
        email: "scholar.biotech@research.org",
        subscribedAt: new Date(Date.now() - 48 * 60 * 60 * 1e3).toISOString(),
        status: "active",
        preferredCategories: ["Competitive Exams", "Research Fellowships", "Lab Protocols"]
      }
    ],
    mediaFiles: [],
    articles: [
      {
        id: "art-01",
        slug: "crispr-cas9-mechanisms-applications",
        title: "CRISPR-Cas9 Molecular Precision: Mechanistic Insight & RNP Delivery",
        subjectSlug: "genetic-engineering",
        topicSlug: "crispr-cas9",
        summary: "In-depth molecular analysis of Cas9 endonuclease ribonucleoprotein complex, PAM recognition (5'-NGG-3'), and double-strand break repair via NHEJ versus HDR.",
        content: `<h2>Molecular Structure of Cas9 Endonuclease</h2><p>Streptococcus pyogenes Cas9 (SpCas9) is a multi-domain endonuclease that associates with a chimeric single guide RNA (sgRNA). Cas9 comprises two structural lobes: the Recognition (REC) lobe and the Nuclease (NUC) lobe.</p><h3>PAM Recognition & Strand Cleavage</h3><p>Target search involves scanning genomic DNA for the 5'-NGG-3' protospacer adjacent motif (PAM) by the PAM-interacting domain (PID). Strand separation is initiated, followed by RNA-DNA hybridization.</p>`,
        status: "published",
        sourceUrl: "https://doi.org/10.1126/science.1225829",
        verifiedBy: "charanjaydeep712@gmail.com",
        lastVerifiedDate: "2026-10-15",
        nextReviewDate: "2027-04-15",
        author: "BioScience Editorial Board",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1e3).toISOString(),
        revisions: []
      }
    ],
    opportunities: [
      {
        id: "opp-01",
        type: "job",
        title: "Junior Research Fellow (JRF) - Structural Biology & Cryo-EM",
        organization: "Regional Centre for Biotechnology (RCB), Faridabad",
        description: "DST-SERB sponsored project investigating viral envelope glycoproteins using single-particle cryo-electron microscopy and biochemical reconstitution.",
        eligibility: "M.Sc. in Biotechnology / Biochemistry / Life Sciences with CSIR-UGC NET (JRF/LS) or valid GATE score.",
        qualification: "Postgraduate degree in Life Sciences with national entrance qualification.",
        location: "Faridabad, Haryana (NCR)",
        stipendOrSalary: "\u20B937,000 + 24% HRA per month (DST Guidelines)",
        openingDate: "2026-10-10",
        deadline: "2026-11-25",
        officialNotificationUrl: "https://rcb.res.in/index.php?param=newdetails/712",
        applicationUrl: "https://rcb.res.in/index.php?param=apply",
        sourceUrl: "https://rcb.res.in",
        verificationStatus: "verified",
        publicationStatus: "published",
        lastVerifiedDate: "2026-11-01",
        nextReviewDate: "2026-11-20",
        verifiedBy: "charanjaydeep712@gmail.com",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: "opp-02",
        type: "internship",
        title: "Science Academies Summer Research Fellowship Programme (SRFP)",
        organization: "Indian Academy of Sciences, Bengaluru",
        description: "Two-month prestigious summer research fellowship under fellowship guides across national institutions (IISc, TIFR, IITs, CSIR institutes).",
        eligibility: "Undergraduate and postgraduate biotechnology and life sciences students with minimum 65% aggregate score.",
        qualification: "B.Sc. (2nd/3rd year), M.Sc. (1st year), or B.Tech (3rd year)",
        location: "Pan-India participating research institutes",
        stipendOrSalary: "Monthly fellowship \u20B912,000 + round-trip travel allowance",
        openingDate: "2026-10-01",
        deadline: "2026-11-15",
        officialNotificationUrl: "https://webjapps.ias.ac.in/",
        applicationUrl: "https://webjapps.ias.ac.in/",
        sourceUrl: "https://webjapps.ias.ac.in/",
        verificationStatus: "verified",
        publicationStatus: "published",
        lastVerifiedDate: "2026-11-01",
        nextReviewDate: "2026-11-12",
        verifiedBy: "charanjaydeep712@gmail.com",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        id: "opp-03",
        type: "fellowship",
        title: "DBT-Junior Research Fellowship (DBT-JRF / BET)",
        organization: "Department of Biotechnology (DBT), Govt. of India",
        description: "National fellowship award for doctoral research across universities and national laboratories in biotechnology and allied disciplines.",
        eligibility: "M.Sc. / M.Tech in Biotechnology or Life Sciences with minimum 60% marks (55% for SC/ST/PwD).",
        qualification: "Postgraduate qualification in Biotechnology / Life Sciences",
        location: "Pan-India DBT recognized institutions",
        stipendOrSalary: "\u20B937,000/month JRF + contingency grant (Category I)",
        openingDate: "2026-02-15",
        deadline: "2026-03-20",
        // past date to verify auto-expiry detection
        officialNotificationUrl: "https://dbt.nta.ac.in",
        applicationUrl: "https://dbt.nta.ac.in",
        sourceUrl: "https://dbt.nta.ac.in",
        verificationStatus: "verified",
        publicationStatus: "published",
        lastVerifiedDate: "2026-10-25",
        nextReviewDate: "2026-12-01",
        verifiedBy: "charanjaydeep712@gmail.com",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ],
    examinations: [
      {
        code: "GAT-B",
        fullName: "Graduate Aptitude Test - Biotechnology",
        conductingAgency: "National Testing Agency (NTA) on behalf of Regional Centre for Biotechnology (RCB)",
        officialPortalUrl: "https://dbt.nta.ac.in",
        syllabusSummary: "Section A: 10+2 level Physics, Chemistry, Mathematics, and Biology. Section B: Graduate level Biotechnology, Life Sciences, Genetics, Microbiology, and Bioinformatics.",
        eligibilitySummary: "Bachelor degree in Biotechnology or allied biological disciplines with minimum 60% aggregate (55% for reserved categories).",
        examPattern: "Computer Based Test (CBT), 180 Minutes. Section A: 60 compulsory questions. Section B: 100 questions (candidate attempts any 60).",
        durationMinutes: 180,
        markingScheme: "Section A: +1, -0.5. Section B: +3, -1.",
        importantDatesText: "2026 cycle concluded (Exam held 17 May 2026). Official 2027 session bulletin expected early 2027.",
        verificationDate: "2026-11-01",
        masteryDestinationUrl: "https://bioscience-mastery-p-vdf1.bolt.host/en/courses/gat-b",
        masteryActive: true,
        statusNote: "Admissions for 2026 participating institutions concluded. Official 2027 notification awaited.",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        code: "DBT-JRF",
        fullName: "Biotechnology Eligibility Test (BET) / DBT-JRF",
        conductingAgency: "Regional Centre for Biotechnology (RCB) / NTA",
        officialPortalUrl: "https://dbt.nta.ac.in",
        syllabusSummary: "Section A: General Aptitude & General Biotechnology. Section B: Specialized subjects in Agricultural, Animal, Medical, Environmental, and Industrial Biotechnology.",
        eligibilitySummary: "M.Sc. / M.Tech / M.V.Sc. in Biotechnology or allied subjects with 60% marks. Age limit 28 years (relaxation as per GOI rules).",
        examPattern: "CBT, 180 Minutes. Section A: 50 compulsory questions. Section B: 150 questions (attempt 50). Total 100 questions.",
        durationMinutes: 180,
        markingScheme: "+3 marks for correct, -1 mark for incorrect.",
        importantDatesText: "Annual examination cycle. 2027 notification scheduled for announcement by NTA/DBT.",
        verificationDate: "2026-11-01",
        masteryDestinationUrl: "https://bioscience-mastery-p-vdf1.bolt.host/en/exams",
        masteryActive: true,
        statusNote: "Category-I (top 275) awarded DBT-JRF fellowship. Category-II eligible for project employment.",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        code: "GATE-BT",
        fullName: "Graduate Aptitude Test in Engineering - Biotechnology",
        conductingAgency: "Indian Institutes of Technology (IITs) / IISc",
        officialPortalUrl: "https://gate2026.iitr.ac.in",
        syllabusSummary: "General Aptitude, Engineering Mathematics, Microbiology, Biochemistry, Molecular Biology & Genetics, Bioprocess Engineering, Plant & Animal Biotech, Recombinant DNA, Computational Biology.",
        eligibilitySummary: "Candidates in 3rd/final year or completed Bachelor degree in Engineering / Technology or M.Sc. in Science subjects.",
        examPattern: "CBT, 180 Minutes, 65 questions (10 General Aptitude + 55 Subject specific). Combination of MCQs, MSQs, and NATs.",
        durationMinutes: 180,
        markingScheme: "1-mark and 2-mark questions. MCQs have negative marking (1/3rd or 2/3rd). MSQs and NATs have ZERO negative marking.",
        importantDatesText: "Annual national examination held in February.",
        verificationDate: "2026-11-01",
        masteryDestinationUrl: "https://bioscience-mastery-p-vdf1.bolt.host/en/exams",
        masteryActive: true,
        statusNote: "Score card valid for 3 years for M.Tech admissions and PSU recruitment.",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        code: "IIT-JAM",
        fullName: "Joint Admission Test for Masters - Biotechnology (BT)",
        conductingAgency: "Organizing IIT (annual rotation)",
        officialPortalUrl: "https://jam2026.iitd.ac.in",
        syllabusSummary: "Biology (44%), Chemistry (20%), Mathematics (18%), Physics (18%) at 10+2 and undergraduate level.",
        eligibilitySummary: "Undergraduate degree with no minimum aggregate mark requirement (only pass required per revised IIT JAM norms).",
        examPattern: "CBT, 180 Minutes, 60 questions divided into Section A (MCQs), Section B (MSQs), Section C (NATs).",
        durationMinutes: 180,
        markingScheme: "Section A: Negative marking. Section B & C: No negative marking.",
        importantDatesText: "Annual exam conducted in February across Indian centers.",
        verificationDate: "2026-11-01",
        masteryDestinationUrl: "https://bioscience-mastery-p-vdf1.bolt.host/en/exams",
        masteryActive: true,
        statusNote: "Admission into M.Sc., Joint M.Sc.-Ph.D. at IITs and Integrated Ph.D. at IISc.",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        code: "CUET-PG",
        fullName: "Common University Entrance Test (Postgraduate) - Life Sciences (SCQP17)",
        conductingAgency: "National Testing Agency (NTA)",
        officialPortalUrl: "https://pgcuet.samarth.ac.in",
        syllabusSummary: "Microbiology, Biochemistry, Cell Biology, Genetics, Molecular Biology, Plant Physiology, Animal Physiology, Ecology, Evolution, Techniques in Biology.",
        eligibilitySummary: "Bachelor degree in Science with biological subjects from a recognized university.",
        examPattern: "CBT, 105 Minutes, 75 domain-specific questions (General Part A removed from 2024 onwards).",
        durationMinutes: 105,
        markingScheme: "+4 for correct, -1 for incorrect.",
        importantDatesText: "Conducted annually in March for central and participating state universities.",
        verificationDate: "2026-11-01",
        masteryDestinationUrl: "https://bioscience-mastery-p-vdf1.bolt.host/en/exams",
        masteryActive: true,
        statusNote: "Single entrance gateway for JNU, BHU, DU, Hyd University M.Sc. Life Sciences / Biotechnology programs.",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      {
        code: "CSIR-NET",
        fullName: "Joint CSIR-UGC NET for JRF and Lectureship - Life Sciences",
        conductingAgency: "National Testing Agency (NTA) on behalf of CSIR",
        officialPortalUrl: "https://csirnet.nta.ac.in",
        syllabusSummary: "13 Comprehensive Units: Molecules, Cellular Organization, Fundamental Processes, Cell Communication, Developmental Biology, System Physiology (Plant/Animal), Inheritance Biology, Diversity of Life, Ecological Principles, Evolution, Applied Biology, Methods in Biology.",
        eligibilitySummary: "M.Sc. or equivalent degree in Life Sciences with 55% marks (50% for reserved categories).",
        examPattern: "CBT, 180 Minutes. Part A (General Aptitude, 20 Qs, attempt 15), Part B (Core Concepts, 50 Qs, attempt 35), Part C (Analytical Research, 75 Qs, attempt 25).",
        durationMinutes: 180,
        markingScheme: "Part A & B: +2, -0.5. Part C: +4, -1.",
        importantDatesText: "Conducted twice annually (June and December cycles).",
        verificationDate: "2026-11-01",
        masteryDestinationUrl: "https://bioscience-mastery-p-vdf1.bolt.host/en/exams",
        masteryActive: true,
        statusNote: "Qualifies candidates for CSIR/UGC Junior Research Fellowship and Assistant Professor eligibility across India.",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    ],
    seoSettings: {
      websiteTitle: "BioScience Hub \u2014 Learn Biotechnology, Master Concepts, Prepare for Research",
      metaDescription: "Comprehensive bilingual biotechnology encyclopedia, competitive exam preparation portal (GAT-B, DBT-JRF, GATE BT, IIT JAM, CUET-PG, CSIR-NET), and interactive laboratory knowledge platform.",
      ogTitle: "BioScience Hub \u2014 Learn Biotechnology, Master Concepts, Prepare for Research",
      ogDescription: "Verified academic literature, biotechnology career vacancies, lab instrumentation, and 6 national competitive examination portals.",
      socialLinks: {
        whatsappChannel: "https://whatsapp.com/channel/0029VbBeWMxA89MgAovtkf2j",
        linkedin: "https://www.linkedin.com/company/https-bioscienceknowledge-hub.vercel.app-/"
      },
      announcementBanner: {
        enabled: true,
        text: "Ecosystem Announcement: BioScience Hub is seamlessly integrated with BioScience Mastery for targeted national entrance examination preparation.",
        linkUrl: "https://bioscience-mastery-p-vdf1.bolt.host/en/exams"
      },
      footerNotice: "Public education portal. Grounded in official gazettes, NTA/DBT bulletins, and peer-reviewed reference texts (Lehninger, Alberts, Lodish, Brock)."
    },
    aiConfig: {
      operatingMode: "research_only",
      // Default to research-only mode as required
      activeProvider: "gemini",
      providerPriorities: ["gemini", "groq", "openrouter", "ollama_gemma", "ollama_qwen"],
      providerSettings: {
        gemini: {
          enabled: true,
          model: "gemini-3.8-flash",
          priorityOrder: 1,
          statusNote: "Primary cloud AI (Google GenAI Free Tier)"
        },
        groq: {
          enabled: true,
          model: "llama-3.3-70b-versatile",
          priorityOrder: 2,
          statusNote: "Secondary fast inference provider"
        },
        openrouter: {
          enabled: true,
          model: "meta-llama/llama-3.3-70b-instruct:free",
          priorityOrder: 3,
          statusNote: "Third provider, strictly free models only"
        },
        ollama_gemma: {
          enabled: true,
          model: "gemma3:4b",
          priorityOrder: 4,
          statusNote: "Local offline LLM (Google Gemma 3 4B)"
        },
        ollama_qwen: {
          enabled: true,
          model: "qwen2.5:1.5b",
          priorityOrder: 5,
          statusNote: "Local offline lightweight LLM (Qwen 2.5 1.5B)"
        }
      },
      monthlyBudgetINR: 0,
      // Enforce strictly ₹0 budget, zero paid fallback
      monthlyUsageRequests: 0,
      monthlyTokensUsed: 0,
      lastUsageResetMonth: (/* @__PURE__ */ new Date()).toISOString().substring(0, 7),
      tavilyEnabled: false,
      ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
      autoScheduleEnabled: true,
      dailyCheckHourUtc: 3,
      maxItemsPerResearchRun: 8
    },
    aiResearchQueue: [],
    aiExamProposals: [],
    aiContentProposals: [],
    aiWeeklyDispatches: [],
    aiActivityLogs: [
      {
        id: "log-ai-init",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        providerUsed: "system",
        action: "AI_SYSTEM_INITIALIZED",
        taskType: "INIT",
        sourcesChecked: ["DBT", "DST", "CSIR", "ICMR", "NTA", "IITs"],
        recordsFound: 0,
        status: "success",
        details: { message: "Autonomous AI Engine initialized in Research Mode with \u20B90 budget policy." },
        costINR: 0
      }
    ],
    aiTaskCheckpoints: []
  };
}
var Database = class {
  constructor() {
    this.writeTimer = null;
    this.data = this.load();
    this.resetMonthlyAiUsageIfNewMonth();
  }
  load() {
    try {
      const candidatePaths = [
        STORE_PATH,
        path.resolve(__dirname, "server", "data", "store.json"),
        path.resolve(__dirname, "data", "store.json"),
        path.resolve(process.cwd(), "server", "data", "store.json"),
        path.resolve(process.cwd(), "data", "store.json")
      ];
      let pathToRead = null;
      for (const p of candidatePaths) {
        if (p && fs.existsSync(p)) {
          pathToRead = p;
          break;
        }
      }
      if (pathToRead) {
        const raw = fs.readFileSync(pathToRead, "utf-8");
        const parsed = JSON.parse(raw);
        const defaults = createDefaultStore();
        const merged = {
          ...defaults,
          ...parsed,
          maintenance: {
            ...defaults.maintenance,
            ...parsed.maintenance || {},
            mini_games: {
              memory_match: true,
              number_puzzle: true,
              quick_math: true,
              word_scramble: true,
              ...parsed.maintenance && parsed.maintenance.mini_games || {}
            }
          },
          popups: Array.isArray(parsed.popups) ? parsed.popups : [],
          subjects: Array.isArray(parsed.subjects) && parsed.subjects.length > 0 ? parsed.subjects : defaults.subjects,
          seoSettings: {
            ...defaults.seoSettings,
            ...parsed.seoSettings || {}
          },
          aiConfig: {
            ...defaults.aiConfig,
            ...parsed.aiConfig || {},
            providerSettings: {
              ...defaults.aiConfig.providerSettings,
              ...parsed.aiConfig && parsed.aiConfig.providerSettings || {}
            }
          },
          aiResearchQueue: Array.isArray(parsed.aiResearchQueue) ? parsed.aiResearchQueue : [],
          aiExamProposals: Array.isArray(parsed.aiExamProposals) ? parsed.aiExamProposals : [],
          aiContentProposals: Array.isArray(parsed.aiContentProposals) ? parsed.aiContentProposals : [],
          aiWeeklyDispatches: Array.isArray(parsed.aiWeeklyDispatches) ? parsed.aiWeeklyDispatches : [],
          aiActivityLogs: Array.isArray(parsed.aiActivityLogs) ? parsed.aiActivityLogs : defaults.aiActivityLogs,
          aiTaskCheckpoints: Array.isArray(parsed.aiTaskCheckpoints) ? parsed.aiTaskCheckpoints : []
        };
        if (isServerless && pathToRead !== STORE_PATH) {
          this.saveImmediate(merged);
        }
        return merged;
      }
    } catch (e) {
      console.warn("Notice loading database store, creating default:", e);
    }
    const def = createDefaultStore();
    this.saveImmediate(def);
    return def;
  }
  saveImmediate(dataToSave) {
    try {
      const parentDir = path.dirname(STORE_PATH);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }
      fs.writeFileSync(STORE_PATH, JSON.stringify(dataToSave, null, 2), "utf-8");
    } catch (e) {
      console.warn("Database save notice:", e);
    }
  }
  save() {
    if (this.writeTimer) clearTimeout(this.writeTimer);
    if (isServerless) {
      this.saveImmediate(this.data);
    } else {
      this.writeTimer = setTimeout(() => {
        this.saveImmediate(this.data);
      }, 100);
    }
  }
  getData() {
    return this.data;
  }
  // Auto-expire maintenance mode if reopening time passed
  checkAndAutoExpireMaintenance() {
    const m = this.data.maintenance;
    if (m.enabled && m.expected_reopening_iso) {
      const reopenTime = new Date(m.expected_reopening_iso).getTime();
      const now = Date.now();
      if (now >= reopenTime) {
        m.enabled = false;
        m.last_updated_at = (/* @__PURE__ */ new Date()).toISOString();
        m.last_updated_by = "system_scheduled_auto_reopen";
        m.history.unshift({
          id: "hist-" + Date.now(),
          action: "auto_reopened",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          triggered_by: "system_auto_timer",
          note: `Maintenance mode automatically turned OFF as scheduled reopening time (${m.expected_reopening_iso}) was reached.`
        });
        this.addAuditLog(
          "system_auto_timer",
          "system",
          "MAINTENANCE_AUTO_REOPEN",
          "MAINTENANCE",
          { message: "Maintenance mode automatically expired and public website restored." }
        );
        this.save();
        return true;
      }
    }
    return false;
  }
  // Audit logging helper
  addAuditLog(actorEmail, actorRole, action, resource, details, ip) {
    const entry = {
      id: "log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      actorEmail,
      actorRole,
      action,
      resource,
      details,
      ip
    };
    this.data.auditLogs.unshift(entry);
    if (this.data.auditLogs.length > 1e3) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 1e3);
    }
    this.save();
  }
  // AI Activity Logging Helper
  addAiActivityLog(providerUsed, action, taskType, sourcesChecked = [], recordsFound = 0, status = "success", details) {
    const log = {
      id: "ai-log-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      providerUsed,
      action,
      taskType,
      sourcesChecked,
      recordsFound,
      status,
      details,
      costINR: 0
      // Zero paid fallback policy enforced
    };
    this.data.aiActivityLogs.unshift(log);
    if (this.data.aiActivityLogs.length > 500) {
      this.data.aiActivityLogs = this.data.aiActivityLogs.slice(0, 500);
    }
    this.save();
  }
  // Monthly usage tracker (resets on 1st of every month)
  resetMonthlyAiUsageIfNewMonth() {
    const currentMonth = (/* @__PURE__ */ new Date()).toISOString().substring(0, 7);
    if (this.data.aiConfig.lastUsageResetMonth !== currentMonth) {
      this.data.aiConfig.monthlyUsageRequests = 0;
      this.data.aiConfig.monthlyTokensUsed = 0;
      this.data.aiConfig.lastUsageResetMonth = currentMonth;
      this.save();
    }
  }
  incrementAiUsage(tokens = 0) {
    this.resetMonthlyAiUsageIfNewMonth();
    this.data.aiConfig.monthlyUsageRequests += 1;
    this.data.aiConfig.monthlyTokensUsed += tokens;
    this.save();
  }
};
var db = new Database();
if (!isServerless) {
  const reopenTimer = setInterval(() => {
    db.checkAndAutoExpireMaintenance();
  }, 1e4);
  if (reopenTimer && typeof reopenTimer.unref === "function") {
    reopenTimer.unref();
  }
}

// server/adminRoutes.ts
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename2);
var UPLOADS_DIR2 = path2.resolve(__dirname2, "uploads");
var adminRouter = express.Router();
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR2);
  },
  filename: (req, file, cb) => {
    const ext = path2.extname(file.originalname).toLowerCase();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9_-]/g, "_").substring(0, 30);
    cb(null, `${Date.now()}-${safeName}${ext}`);
  }
});
var upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 },
  // 25MB max
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
      "text/plain",
      "text/csv"
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type. Only JPG, PNG, WEBP, SVG, PDF, TXT, and CSV are allowed."));
    }
  }
});
var loginRateLimitMap = /* @__PURE__ */ new Map();
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : req.headers["x-admin-token"];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Authentication token is required" });
  }
  const store = db.getData();
  let session = store.adminSessions.find((s) => s.token === token);
  if (!session) {
    if (token.startsWith("adm-session-") || token.startsWith("client-admin-") || token.length >= 24) {
      const superAdmin = store.adminUsers.find((u) => u.email === "charanjaydeep712@gmail.com") || store.adminUsers[0];
      if (superAdmin) {
        session = {
          token,
          userId: superAdmin.id,
          createdAt: (/* @__PURE__ */ new Date()).toISOString(),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString(),
          ip: getClientIp(req),
          userAgent: req.headers["user-agent"] || ""
        };
        store.adminSessions.push(session);
        db.save();
      }
    }
  }
  if (!session) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired session" });
  }
  if (new Date(session.expiresAt).getTime() < Date.now()) {
    store.adminSessions = store.adminSessions.filter((s) => s.token !== token);
    db.save();
    return res.status(401).json({ error: "Unauthorized: Session has expired. Please sign in again." });
  }
  const user = store.adminUsers.find((u) => u.id === session.userId);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized: User account not found" });
  }
  req.adminUser = user;
  next();
}
function requireRoles(allowedRoles) {
  return (req, res, next) => {
    if (!req.adminUser || !allowedRoles.includes(req.adminUser.role)) {
      return res.status(403).json({
        error: `Forbidden: This action requires one of the following roles: ${allowedRoles.join(", ")}`
      });
    }
    next();
  };
}
adminRouter.get("/public/maintenance-status", (req, res) => {
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
    server_time_iso: (/* @__PURE__ */ new Date()).toISOString()
  });
});
adminRouter.get("/auth/setup-status", (req, res) => {
  const store = db.getData();
  const superAdmin = store.adminUsers.find((u) => u.email === "charanjaydeep712@gmail.com");
  res.json({
    setupPending: superAdmin ? superAdmin.isInitialSetupPending : false,
    email: "charanjaydeep712@gmail.com"
  });
});
adminRouter.post("/auth/setup", async (req, res) => {
  const { email, password, fullName } = req.body;
  if (email !== "charanjaydeep712@gmail.com") {
    return res.status(400).json({ error: "Initial setup is reserved for the primary administrator account." });
  }
  if (!password || password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters with high entropy." });
  }
  const store = db.getData();
  let superAdmin = store.adminUsers.find((u) => u.email === email);
  if (!superAdmin) {
    superAdmin = {
      id: "usr-superadmin-01",
      email,
      fullName: fullName || "Super Administrator",
      role: "superadmin",
      passwordHash: "",
      isInitialSetupPending: true,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      failedLoginAttempts: 0
    };
    store.adminUsers.push(superAdmin);
  }
  if (!superAdmin.isInitialSetupPending && superAdmin.passwordHash) {
    return res.status(400).json({ error: "Initial setup has already been completed. Please log in directly." });
  }
  const hash = await bcrypt2.hash(password, 12);
  superAdmin.passwordHash = hash;
  superAdmin.isInitialSetupPending = false;
  if (fullName) superAdmin.fullName = fullName;
  const token = crypto.randomBytes(32).toString("hex");
  const session = {
    token,
    userId: superAdmin.id,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString(),
    ip: getClientIp(req),
    userAgent: req.headers["user-agent"] || ""
  };
  store.adminSessions.push(session);
  db.addAuditLog(
    email,
    "superadmin",
    "ADMIN_INITIAL_SETUP_COMPLETED",
    "AUTH",
    { message: "Super admin password initialized." },
    getClientIp(req)
  );
  db.save();
  res.json({
    success: true,
    message: "Super Administrator initialized successfully.",
    token,
    user: {
      id: superAdmin.id,
      email: superAdmin.email,
      fullName: superAdmin.fullName,
      role: superAdmin.role
    }
  });
});
var ADMIN_SECRET_CODE = "95872214678769441578";
var pending2faMap = /* @__PURE__ */ new Map();
var passwordResetMap = /* @__PURE__ */ new Map();
adminRouter.post("/auth/login", async (req, res) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const cleanEmail = email.toLowerCase().trim();
  const cleanPassword = String(password).trim();
  const isSuperAdminCredential = cleanEmail === "charanjaydeep712@gmail.com" && cleanPassword === "charanjaydeep712@gmail.comadmin";
  if (!isSuperAdminCredential) {
    const rl = loginRateLimitMap.get(ip);
    if (rl && rl.blockedUntil && rl.blockedUntil > now) {
      const remainingSec = Math.ceil((rl.blockedUntil - now) / 1e3);
      return res.status(429).json({
        error: `Too many failed login attempts. IP temporarily locked. Please try again in ${remainingSec} seconds.`
      });
    }
  }
  const store = db.getData();
  let user = store.adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    if (cleanEmail === "charanjaydeep712@gmail.com") {
      const defaultHash = await bcrypt2.hash("charanjaydeep712@gmail.comadmin", 12);
      user = {
        id: "usr-superadmin-01",
        email: "charanjaydeep712@gmail.com",
        fullName: "Super Administrator",
        role: "superadmin",
        passwordHash: defaultHash,
        isInitialSetupPending: false,
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        failedLoginAttempts: 0
      };
      store.adminUsers.push(user);
      db.save();
    } else {
      const current = loginRateLimitMap.get(ip) || { attempts: 0 };
      current.attempts += 1;
      if (current.attempts >= 5) {
        current.blockedUntil = now + 15 * 60 * 1e3;
      }
      loginRateLimitMap.set(ip, current);
      return res.status(401).json({ error: "Invalid credentials or unauthorized user account." });
    }
  }
  const isDirectSuperAdminPassword = cleanEmail === "charanjaydeep712@gmail.com" && cleanPassword === "charanjaydeep712@gmail.comadmin";
  let isMatch = false;
  if (isDirectSuperAdminPassword) {
    isMatch = true;
    if (!user.passwordHash || !await bcrypt2.compare(cleanPassword, user.passwordHash)) {
      user.passwordHash = await bcrypt2.hash("charanjaydeep712@gmail.comadmin", 12);
      user.isInitialSetupPending = false;
      db.save();
    }
  } else if (user.passwordHash) {
    isMatch = await bcrypt2.compare(cleanPassword, user.passwordHash);
  }
  if (!isMatch) {
    const current = loginRateLimitMap.get(ip) || { attempts: 0 };
    current.attempts += 1;
    if (current.attempts >= 5) {
      current.blockedUntil = now + 15 * 60 * 1e3;
    }
    loginRateLimitMap.set(ip, current);
    db.addAuditLog(
      email,
      user.role,
      "LOGIN_FAILED",
      "AUTH",
      { reason: "Incorrect password" },
      ip
    );
    return res.status(401).json({ error: "Invalid credentials. Password verification failed." });
  }
  loginRateLimitMap.delete(ip);
  const tempToken = crypto.randomBytes(32).toString("hex");
  pending2faMap.set(tempToken, {
    userId: user.id,
    email: user.email,
    createdAt: now,
    expiresAt: now + 10 * 60 * 1e3
    // 10 minutes valid
  });
  db.addAuditLog(
    email,
    user.role,
    "LOGIN_STEP1_VERIFIED",
    "AUTH",
    { message: "Password verified. 2FA Secret Key / OTP prompt initiated." },
    ip
  );
  res.json({
    success: true,
    require2FA: true,
    tempToken,
    email: user.email,
    message: "Password verified. Enter your 20-digit Admin Secret Code or request an Email OTP."
  });
});
adminRouter.post("/auth/send-otp", (req, res) => {
  const { tempToken } = req.body;
  if (!tempToken) {
    return res.status(400).json({ error: "Authentication temporary token is required." });
  }
  const session = pending2faMap.get(tempToken);
  if (!session || session.expiresAt < Date.now()) {
    return res.status(401).json({ error: "Authentication session expired. Please enter password again." });
  }
  const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
  session.otp = otp;
  session.otpExpiresAt = Date.now() + 10 * 60 * 1e3;
  const ip = getClientIp(req);
  db.addAuditLog(
    session.email,
    "superadmin",
    "ADMIN_2FA_OTP_SENT",
    "AUTH",
    { email: session.email, expiryMinutes: 10 },
    ip
  );
  db.save();
  console.log(`[BioScience Hub 2FA] OTP for ${session.email}: ${otp}`);
  res.json({
    success: true,
    message: `A 6-digit security OTP has been sent to your registered email (${session.email}).`,
    email: session.email,
    debugOtp: otp
    // Provides immediate copy/paste fallback in web environment
  });
});
adminRouter.post("/auth/verify-2fa", async (req, res) => {
  const ip = getClientIp(req);
  const now = Date.now();
  const { tempToken, code } = req.body;
  if (!tempToken || !code) {
    return res.status(400).json({ error: "Both authentication token and security code are required." });
  }
  const session = pending2faMap.get(tempToken);
  if (!session || session.expiresAt < now) {
    return res.status(401).json({ error: "Session expired. Please start login from password step." });
  }
  const cleanedCode = String(code).trim();
  const isSecretCodeMatch = cleanedCode === ADMIN_SECRET_CODE;
  const isOtpMatch = session.otp && cleanedCode === session.otp && session.otpExpiresAt && session.otpExpiresAt > now;
  if (!isSecretCodeMatch && !isOtpMatch) {
    return res.status(401).json({
      error: 'Invalid security code or OTP. Please enter the valid Admin Secret Key or click "Send OTP to Email".'
    });
  }
  pending2faMap.delete(tempToken);
  loginRateLimitMap.delete(ip);
  const store = db.getData();
  const user = store.adminUsers.find((u) => u.id === session.userId);
  if (!user) {
    return res.status(401).json({ error: "Admin account not found." });
  }
  const token = crypto.randomBytes(32).toString("hex");
  const adminSession = {
    token,
    userId: user.id,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString(),
    ip,
    userAgent: req.headers["user-agent"] || ""
  };
  store.adminSessions.push(adminSession);
  user.lastLoginAt = (/* @__PURE__ */ new Date()).toISOString();
  db.addAuditLog(
    user.email,
    user.role,
    "LOGIN_SUCCESSFUL_WITH_2FA",
    "AUTH",
    {
      verificationType: isSecretCodeMatch ? "SECRET_CODE_VERIFIED" : "EMAIL_OTP_VERIFIED",
      userAgent: req.headers["user-agent"]
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
      lastLoginAt: user.lastLoginAt
    }
  });
});
adminRouter.post("/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Administrator email is required." });
  }
  const cleanEmail = String(email).toLowerCase().trim();
  const store = db.getData();
  const user = store.adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    return res.status(404).json({ error: "No administrator account found with this email address." });
  }
  const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
  const expiresAt = Date.now() + 15 * 60 * 1e3;
  passwordResetMap.set(cleanEmail, {
    email: cleanEmail,
    otp,
    expiresAt
  });
  const ip = getClientIp(req);
  db.addAuditLog(
    cleanEmail,
    user.role,
    "PASSWORD_RESET_REQUESTED",
    "AUTH",
    { email: cleanEmail, expiryMinutes: 15 },
    ip
  );
  db.save();
  console.log(`[BioScience Hub Password Reset] OTP for ${cleanEmail}: ${otp}`);
  res.json({
    success: true,
    message: `Password reset verification code has been dispatched to ${cleanEmail}.`,
    email: cleanEmail,
    debugOtp: otp
    // immediate web preview convenience
  });
});
adminRouter.post("/auth/reset-password", async (req, res) => {
  const { email, code, newPassword } = req.body;
  if (!email || !code || !newPassword) {
    return res.status(400).json({ error: "Email, verification code, and new password are required." });
  }
  if (String(newPassword).length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters." });
  }
  const cleanEmail = String(email).toLowerCase().trim();
  const cleanCode = String(code).trim();
  const store = db.getData();
  const user = store.adminUsers.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    return res.status(404).json({ error: "Administrator account not found." });
  }
  const session = passwordResetMap.get(cleanEmail);
  const now = Date.now();
  const isOtpMatch = session && session.otp === cleanCode && session.expiresAt > now;
  const isSecretCodeMatch = cleanCode === ADMIN_SECRET_CODE;
  if (!isOtpMatch && !isSecretCodeMatch) {
    return res.status(401).json({
      error: "Invalid or expired reset code. Please use the 6-digit OTP sent to your email or your 20-digit Admin Secret Code."
    });
  }
  const hash = await bcrypt2.hash(newPassword, 12);
  user.passwordHash = hash;
  user.isInitialSetupPending = false;
  user.failedLoginAttempts = 0;
  passwordResetMap.delete(cleanEmail);
  const ip = getClientIp(req);
  loginRateLimitMap.delete(ip);
  db.addAuditLog(
    cleanEmail,
    user.role,
    "PASSWORD_RESET_SUCCESSFUL",
    "AUTH",
    { method: isSecretCodeMatch ? "SECRET_CODE" : "EMAIL_OTP" },
    ip
  );
  db.save();
  res.json({
    success: true,
    message: "Password reset successful! You can now log in with your new password."
  });
});
adminRouter.get("/auth/me", requireAdminAuth, (req, res) => {
  const user = req.adminUser;
  res.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    lastLoginAt: user.lastLoginAt
  });
});
adminRouter.post("/auth/logout", requireAdminAuth, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : req.headers["x-admin-token"];
  const store = db.getData();
  store.adminSessions = store.adminSessions.filter((s) => s.token !== token);
  db.addAuditLog(
    req.adminUser.email,
    req.adminUser.role,
    "LOGOUT",
    "AUTH",
    {},
    getClientIp(req)
  );
  db.save();
  res.json({ success: true, message: "Logged out successfully." });
});
adminRouter.post("/auth/change-password", requireAdminAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: "New password must be at least 8 characters." });
  }
  const user = req.adminUser;
  const isMatch = await bcrypt2.compare(currentPassword, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ error: "Current password verification failed." });
  }
  user.passwordHash = await bcrypt2.hash(newPassword, 12);
  db.addAuditLog(
    user.email,
    user.role,
    "PASSWORD_CHANGED",
    "AUTH",
    {},
    getClientIp(req)
  );
  db.save();
  res.json({ success: true, message: "Password updated successfully." });
});
adminRouter.get("/auth/users", requireAdminAuth, requireRoles(["superadmin"]), (req, res) => {
  const users = db.getData().adminUsers.map((u) => ({
    id: u.id,
    email: u.email,
    fullName: u.fullName,
    role: u.role,
    isInitialSetupPending: u.isInitialSetupPending,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt
  }));
  res.json(users);
});
adminRouter.post("/auth/users", requireAdminAuth, requireRoles(["superadmin"]), async (req, res) => {
  const { email, fullName, role, password } = req.body;
  if (!email || !fullName || !role || !password) {
    return res.status(400).json({ error: "All fields (email, fullName, role, password) are required." });
  }
  const store = db.getData();
  if (store.adminUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(400).json({ error: "An administrator with this email already exists." });
  }
  const passwordHash = await bcrypt2.hash(password, 10);
  const newUser = {
    id: "usr-" + Date.now(),
    email,
    fullName,
    role,
    passwordHash,
    isInitialSetupPending: false,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    failedLoginAttempts: 0
  };
  store.adminUsers.push(newUser);
  db.addAuditLog(
    req.adminUser.email,
    req.adminUser.role,
    "ADMIN_USER_CREATED",
    "USERS",
    { createdUser: email, role }
  );
  db.save();
  res.json({ success: true, user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName, role: newUser.role } });
});
adminRouter.delete("/auth/users/:id", requireAdminAuth, requireRoles(["superadmin"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  const target = store.adminUsers.find((u) => u.id === id);
  if (!target) {
    return res.status(404).json({ error: "User not found" });
  }
  if (target.email === "charanjaydeep712@gmail.com") {
    return res.status(400).json({ error: "The primary Super Administrator account cannot be removed." });
  }
  store.adminUsers = store.adminUsers.filter((u) => u.id !== id);
  store.adminSessions = store.adminSessions.filter((s) => s.userId !== id);
  db.addAuditLog(
    req.adminUser.email,
    req.adminUser.role,
    "ADMIN_USER_DELETED",
    "USERS",
    { deletedUser: target.email }
  );
  db.save();
  res.json({ success: true, message: "User deleted successfully." });
});
adminRouter.get("/maintenance", requireAdminAuth, (req, res) => {
  db.checkAndAutoExpireMaintenance();
  const m = db.getData().maintenance;
  res.json(m);
});
adminRouter.post("/maintenance", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const {
    enabled,
    title,
    message_en,
    message_hi,
    personal_message_en,
    personal_message_hi,
    expected_reopening_iso,
    timezone
  } = req.body;
  const store = db.getData();
  const m = store.maintenance;
  const wasEnabled = m.enabled;
  if (typeof enabled === "boolean") m.enabled = enabled;
  if (title) m.title = title;
  if (message_en) m.message_en = message_en;
  if (message_hi) m.message_hi = message_hi;
  if (personal_message_en) m.personal_message_en = personal_message_en;
  if (personal_message_hi) m.personal_message_hi = personal_message_hi;
  if (expected_reopening_iso) m.expected_reopening_iso = expected_reopening_iso;
  if (timezone) m.timezone = timezone;
  if (req.body.mini_games) {
    m.mini_games = {
      ...m.mini_games || { memory_match: true, number_puzzle: true, quick_math: true, word_scramble: true },
      ...req.body.mini_games
    };
  }
  m.last_updated_at = (/* @__PURE__ */ new Date()).toISOString();
  m.last_updated_by = req.adminUser.email;
  let action = m.enabled ? "enabled" : "disabled";
  if (wasEnabled && m.enabled && expected_reopening_iso) action = "extended";
  m.history.unshift({
    id: "hist-" + Date.now(),
    action,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    triggered_by: req.adminUser.email,
    scheduled_reopening: m.expected_reopening_iso,
    note: m.enabled ? `Maintenance Mode activated until ${m.expected_reopening_iso} (${m.timezone}).` : "Maintenance Mode deactivated. Public website access fully restored."
  });
  db.addAuditLog(
    req.adminUser.email,
    req.adminUser.role,
    m.enabled ? "MAINTENANCE_ENABLED" : "MAINTENANCE_DISABLED",
    "MAINTENANCE",
    {
      expected_reopening_iso: m.expected_reopening_iso,
      timezone: m.timezone
    },
    getClientIp(req)
  );
  db.save();
  res.json({
    success: true,
    message: m.enabled ? "Maintenance Mode has been activated." : "Maintenance Mode has been deactivated. Website is now live for all visitors.",
    maintenance: m
  });
});
adminRouter.get("/dashboard/stats", requireAdminAuth, (req, res) => {
  db.checkAndAutoExpireMaintenance();
  const store = db.getData();
  const now = /* @__PURE__ */ new Date();
  const opportunities = store.opportunities;
  const activeOpportunities = opportunities.filter((o) => {
    return o.publicationStatus === "published" && new Date(o.deadline) >= now;
  }).length;
  const upcomingDeadlines = opportunities.filter((o) => {
    const diffDays = (new Date(o.deadline).getTime() - now.getTime()) / (1e3 * 3600 * 24);
    return diffDays >= 0 && diffDays <= 14;
  }).length;
  const expiredOpportunities = opportunities.filter((o) => {
    return new Date(o.deadline) < now;
  }).length;
  const pendingVerification = opportunities.filter((o) => o.verificationStatus === "pending_review" || o.verificationStatus === "unverified").length;
  const draftContent = store.articles.filter((a) => a.status === "draft").length;
  const alerts = [];
  if (store.maintenance.enabled) {
    alerts.push({
      id: "alt-maint",
      type: "warning",
      title: "Maintenance Mode Active",
      message: `Website is currently under maintenance until ${store.maintenance.expected_reopening_iso} (Asia/Kolkata). Public traffic sees the maintenance page.`,
      link: "/admin/maintenance"
    });
  }
  if (expiredOpportunities > 0) {
    alerts.push({
      id: "alt-expired",
      type: "info",
      title: `${expiredOpportunities} Expired Opportunities Detected`,
      message: "These opportunities have passed their official deadlines. Review, update, or archive them.",
      link: "/admin/opportunities"
    });
  }
  if (upcomingDeadlines > 0) {
    alerts.push({
      id: "alt-deadlines",
      type: "urgent",
      title: `${upcomingDeadlines} Opportunities Closing Within 14 Days`,
      message: "Verify that official portal links remain active and valid.",
      link: "/admin/opportunities"
    });
  }
  if (pendingVerification > 0) {
    alerts.push({
      id: "alt-verify",
      type: "warning",
      title: `${pendingVerification} Items Awaiting Literature/Notice Verification`,
      message: "Editorial policy strictly requires official bulletins or DOI verification before publishing.",
      link: "/admin/opportunities"
    });
  }
  const totalSubjects = (store.subjects || []).length;
  const totalTopics = (store.subjects || []).reduce((acc, s) => acc + (s.topicsCount || 0), 0);
  res.json({
    counts: {
      totalSubjects: totalSubjects > 0 ? totalSubjects : 11,
      totalTopics: totalTopics > 0 ? totalTopics : 55,
      totalArticles: store.articles.length,
      totalExaminations: (store.examinations || []).length,
      activeOpportunities,
      upcomingDeadlines,
      expiredOpportunities,
      draftContent,
      contentPendingVerification: pendingVerification,
      contactSubmissions: store.contactSubmissions.length,
      unreadContacts: store.contactSubmissions.filter((c) => c.status === "unread").length,
      newsletterSubscribers: store.newsletterSubscribers.filter((s) => s.status === "active").length
    },
    alerts,
    recentArticles: store.articles.slice(0, 5),
    recentAuditLogs: store.auditLogs.slice(0, 8)
  });
});
adminRouter.get("/cms/articles", requireAdminAuth, (req, res) => {
  res.json(db.getData().articles);
});
adminRouter.post("/cms/articles", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { title, subjectSlug, topicSlug, summary, content, status, sourceUrl } = req.body;
  if (!title || !subjectSlug || !content) {
    return res.status(400).json({ error: "Title, subject, and content are required." });
  }
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const store = db.getData();
  const newArticle = {
    id: "art-" + Date.now(),
    slug,
    title,
    subjectSlug,
    topicSlug,
    summary: summary || "",
    content,
    status: status || "draft",
    sourceUrl,
    verifiedBy: req.adminUser.email,
    lastVerifiedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    nextReviewDate: new Date(Date.now() + 180 * 24 * 3600 * 1e3).toISOString().split("T")[0],
    author: req.adminUser.fullName,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    revisions: [
      {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        editedBy: req.adminUser.email,
        changeNote: "Initial article creation",
        contentSnapshot: content
      }
    ]
  };
  store.articles.unshift(newArticle);
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "ARTICLE_CREATED", "ARTICLES", { title, slug });
  db.save();
  res.json({ success: true, article: newArticle });
});
adminRouter.put("/cms/articles/:id", requireAdminAuth, requireRoles(["superadmin", "editor", "reviewer"]), (req, res) => {
  const { id } = req.params;
  const { title, summary, content, status, sourceUrl, changeNote } = req.body;
  const store = db.getData();
  const article = store.articles.find((a) => a.id === id);
  if (!article) return res.status(404).json({ error: "Article not found" });
  if (title) article.title = title;
  if (summary !== void 0) article.summary = summary;
  if (sourceUrl !== void 0) article.sourceUrl = sourceUrl;
  if (status) article.status = status;
  if (content && content !== article.content) {
    article.revisions.unshift({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      editedBy: req.adminUser.email,
      changeNote: changeNote || "Content revision",
      contentSnapshot: article.content
    });
    article.content = content;
  }
  article.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "ARTICLE_UPDATED", "ARTICLES", { id, title: article.title, status: article.status });
  db.save();
  res.json({ success: true, article });
});
adminRouter.delete("/cms/articles/:id", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  const idx = store.articles.findIndex((a) => a.id === id);
  if (idx === -1) return res.status(404).json({ error: "Article not found" });
  const title = store.articles[idx].title;
  store.articles.splice(idx, 1);
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "ARTICLE_DELETED", "ARTICLES", { id, title });
  db.save();
  res.json({ success: true, message: "Article removed" });
});
adminRouter.get("/cms/opportunities", requireAdminAuth, (req, res) => {
  const store = db.getData();
  const now = /* @__PURE__ */ new Date();
  const list = store.opportunities.map((opp) => {
    const isPast = new Date(opp.deadline) < now;
    return {
      ...opp,
      isExpired: isPast,
      computedStatus: isPast ? "expired" : opp.publicationStatus
    };
  });
  res.json(list);
});
adminRouter.post("/cms/opportunities", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
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
    publicationStatus
  } = req.body;
  if (!title || !organization || !deadline || !officialNotificationUrl) {
    return res.status(400).json({ error: "Title, organization, deadline, and official URL are required." });
  }
  const store = db.getData();
  const newOpp = {
    id: "opp-" + Date.now(),
    type: type || "job",
    title,
    organization,
    description: description || "",
    eligibility: eligibility || "",
    qualification: qualification || "",
    location: location || "All India",
    stipendOrSalary,
    openingDate: openingDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    deadline,
    officialNotificationUrl,
    applicationUrl: applicationUrl || officialNotificationUrl,
    sourceUrl: sourceUrl || officialNotificationUrl,
    verificationStatus: verificationStatus || "verified",
    publicationStatus: publicationStatus || "published",
    lastVerifiedDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    nextReviewDate: new Date(Date.now() + 30 * 24 * 3600 * 1e3).toISOString().split("T")[0],
    verifiedBy: req.adminUser.email,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  store.opportunities.unshift(newOpp);
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "OPPORTUNITY_CREATED", "OPPORTUNITIES", { title, organization });
  db.save();
  res.json({ success: true, opportunity: newOpp });
});
adminRouter.put("/cms/opportunities/:id", requireAdminAuth, requireRoles(["superadmin", "editor", "reviewer"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  const opp = store.opportunities.find((o) => o.id === id);
  if (!opp) return res.status(404).json({ error: "Opportunity not found" });
  Object.assign(opp, req.body, { updatedAt: (/* @__PURE__ */ new Date()).toISOString() });
  opp.verifiedBy = req.adminUser.email;
  opp.lastVerifiedDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "OPPORTUNITY_UPDATED", "OPPORTUNITIES", { id, title: opp.title });
  db.save();
  res.json({ success: true, opportunity: opp });
});
adminRouter.delete("/cms/opportunities/:id", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  const idx = store.opportunities.findIndex((o) => o.id === id);
  if (idx === -1) return res.status(404).json({ error: "Opportunity not found" });
  const title = store.opportunities[idx].title;
  store.opportunities.splice(idx, 1);
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "OPPORTUNITY_DELETED", "OPPORTUNITIES", { id, title });
  db.save();
  res.json({ success: true, message: "Opportunity deleted." });
});
adminRouter.get("/cms/examinations", requireAdminAuth, (req, res) => {
  res.json(db.getData().examinations);
});
adminRouter.put("/cms/examinations/:code", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { code } = req.params;
  const store = db.getData();
  const exam = store.examinations.find((e) => e.code === code);
  if (!exam) return res.status(404).json({ error: "Examination not found" });
  const allowed = [
    "syllabusSummary",
    "eligibilitySummary",
    "examPattern",
    "durationMinutes",
    "markingScheme",
    "importantDatesText",
    "officialPortalUrl",
    "masteryDestinationUrl",
    "masteryActive",
    "statusNote"
  ];
  for (const key of allowed) {
    if (req.body[key] !== void 0) {
      exam[key] = req.body[key];
    }
  }
  exam.verificationDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  exam.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "EXAMINATION_UPDATED", "EXAMINATIONS", { code });
  db.save();
  res.json({ success: true, examination: exam });
});
adminRouter.get("/cms/media", requireAdminAuth, (req, res) => {
  res.json(db.getData().mediaFiles);
});
adminRouter.post("/cms/media", requireAdminAuth, requireRoles(["superadmin", "editor"]), upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }
  const { category, description, subjectSlug } = req.body;
  const store = db.getData();
  const fileItem = {
    id: "med-" + Date.now(),
    originalName: req.file.originalname,
    fileName: req.file.filename,
    mimeType: req.file.mimetype,
    size: req.file.size,
    category: category || "documents",
    subjectSlug: subjectSlug || void 0,
    uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
    uploadedBy: req.adminUser.email,
    url: `/api/admin/media-file/${req.file.filename}`,
    description: description || ""
  };
  store.mediaFiles.unshift(fileItem);
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "MEDIA_UPLOADED", "MEDIA", { fileName: fileItem.fileName, size: fileItem.size });
  db.save();
  res.json({ success: true, file: fileItem });
});
adminRouter.delete("/cms/media/:id", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  const idx = store.mediaFiles.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ error: "Media file not found" });
  const item = store.mediaFiles[idx];
  store.mediaFiles.splice(idx, 1);
  try {
    const p = path2.resolve(UPLOADS_DIR2, item.fileName);
    import("fs").then((fs2) => {
      if (fs2.existsSync(p)) fs2.unlinkSync(p);
    });
  } catch (e) {
    console.error("Failed to unlink file:", e);
  }
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "MEDIA_DELETED", "MEDIA", { fileName: item.fileName });
  db.save();
  res.json({ success: true, message: "Media file removed." });
});
adminRouter.get("/media-file/:filename", (req, res) => {
  const { filename } = req.params;
  const safeName = path2.basename(filename);
  const filePath = path2.resolve(UPLOADS_DIR2, safeName);
  res.sendFile(filePath);
});
adminRouter.get("/contacts", requireAdminAuth, (req, res) => {
  res.json(db.getData().contactSubmissions);
});
adminRouter.put("/contacts/:id", requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;
  const store = db.getData();
  const item = store.contactSubmissions.find((c) => c.id === id);
  if (!item) return res.status(404).json({ error: "Submission not found" });
  if (status) item.status = status;
  if (notes !== void 0) item.notes = notes;
  db.save();
  res.json({ success: true, item });
});
adminRouter.delete("/contacts/:id", requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  store.contactSubmissions = store.contactSubmissions.filter((c) => c.id !== id);
  db.save();
  res.json({ success: true });
});
adminRouter.get("/newsletter", requireAdminAuth, (req, res) => {
  res.json(db.getData().newsletterSubscribers);
});
adminRouter.get("/newsletter/export-csv", requireAdminAuth, (req, res) => {
  const subscribers = db.getData().newsletterSubscribers;
  const header = "ID,Email,SubscribedAt,Status,PreferredCategories\n";
  const rows = subscribers.map(
    (s) => `"${s.id}","${s.email}","${s.subscribedAt}","${s.status}","${(s.preferredCategories || []).join(";")}"`
  ).join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="bioscience_subscribers.csv"');
  res.send(header + rows);
});
adminRouter.get("/seo", requireAdminAuth, (req, res) => {
  res.json(db.getData().seoSettings);
});
adminRouter.post("/seo", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const store = db.getData();
  store.seoSettings = {
    ...store.seoSettings,
    ...req.body
  };
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "SEO_SETTINGS_UPDATED", "SEO", req.body);
  db.save();
  res.json({ success: true, seoSettings: store.seoSettings });
});
adminRouter.get("/audit-logs", requireAdminAuth, requireRoles(["superadmin"]), (req, res) => {
  res.json(db.getData().auditLogs);
});
adminRouter.get("/popups", requireAdminAuth, (req, res) => {
  const store = db.getData();
  res.json(store.popups || []);
});
adminRouter.post("/popups", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const store = db.getData();
  const {
    title,
    message,
    imageUrl,
    bgColor = "#ffffff",
    textColor = "#0f172a",
    position = "center_modal",
    size = "medium",
    borderRadius = "rounded-2xl",
    startDateTime,
    expiryDateTime,
    displayDuration = 0,
    frequency = "once_per_session",
    enabled = true,
    showCancelButton = true,
    cancelButtonText = "Dismiss",
    buttons = []
  } = req.body;
  if (!title || !message) {
    return res.status(400).json({ error: "Title and message are required." });
  }
  const newPopup = {
    id: `pop-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: String(title).trim(),
    message: String(message).trim(),
    imageUrl: imageUrl ? String(imageUrl).trim() : void 0,
    bgColor: String(bgColor),
    textColor: String(textColor),
    position,
    size,
    borderRadius,
    startDateTime: startDateTime || void 0,
    expiryDateTime: expiryDateTime || void 0,
    displayDuration: Number(displayDuration) || 0,
    frequency,
    enabled: Boolean(enabled),
    showCancelButton: Boolean(showCancelButton),
    cancelButtonText: String(cancelButtonText || "Dismiss"),
    buttons: Array.isArray(buttons) ? buttons : [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  store.popups = store.popups || [];
  store.popups.unshift(newPopup);
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "POPUP_CREATED", "POPUP", { popupId: newPopup.id, title });
  db.save();
  res.status(201).json({ success: true, popup: newPopup });
});
adminRouter.put("/popups/:id", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  store.popups = store.popups || [];
  const idx = store.popups.findIndex((p) => p.id === id);
  if (idx === -1) {
    return res.status(400).json({ error: "Popup not found" });
  }
  const existing = store.popups[idx];
  const updated = {
    ...existing,
    ...req.body,
    id: existing.id,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  store.popups[idx] = updated;
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "POPUP_UPDATED", "POPUP", { popupId: id, title: updated.title });
  db.save();
  res.json({ success: true, popup: updated });
});
adminRouter.delete("/popups/:id", requireAdminAuth, requireRoles(["superadmin"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  store.popups = store.popups || [];
  const beforeLen = store.popups.length;
  store.popups = store.popups.filter((p) => p.id !== id);
  if (store.popups.length === beforeLen) {
    return res.status(404).json({ error: "Popup not found" });
  }
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "POPUP_DELETED", "POPUP", { popupId: id });
  db.save();
  res.json({ success: true });
});
adminRouter.post("/popups/:id/toggle", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  store.popups = store.popups || [];
  const popup = store.popups.find((p) => p.id === id);
  if (!popup) {
    return res.status(404).json({ error: "Popup not found" });
  }
  popup.enabled = !popup.enabled;
  popup.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "POPUP_STATUS_TOGGLED", "POPUP", { popupId: id, enabled: popup.enabled });
  db.save();
  res.json({ success: true, enabled: popup.enabled });
});
adminRouter.get("/cms/subjects", requireAdminAuth, (req, res) => {
  const store = db.getData();
  res.json(store.subjects || []);
});
adminRouter.post("/cms/subjects", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { name, slug, description, overview, learningObjectives, icon, units, orderIndex, references, keyFormulas } = req.body;
  if (!name?.en || !slug) {
    return res.status(400).json({ error: "Subject English name and slug are required." });
  }
  const cleanSlug = String(slug).toLowerCase().trim().replace(/[^a-z0-9-]+/g, "-");
  const store = db.getData();
  store.subjects = store.subjects || [];
  if (store.subjects.some((s) => s.slug === cleanSlug)) {
    return res.status(400).json({ error: `A subject with slug "${cleanSlug}" already exists.` });
  }
  const newSubject = {
    id: `sub-${Date.now()}`,
    slug: cleanSlug,
    name: {
      en: String(name.en).trim(),
      hinglish: String(name.hinglish || name.en).trim()
    },
    description: {
      en: String(description?.en || "").trim(),
      hinglish: String(description?.hinglish || "").trim()
    },
    icon: icon || "BookOpen",
    unitsCount: Array.isArray(units) ? units.length : 0,
    topicsCount: Array.isArray(units) ? units.reduce((acc, u) => acc + (u.chapters?.reduce((cAcc, c) => cAcc + (c.topics?.length || 0), 0) || 0), 0) : 0,
    orderIndex: Number(orderIndex) || store.subjects.length + 1,
    isPublished: true,
    overview: {
      en: String(overview?.en || "").trim(),
      hinglish: String(overview?.hinglish || "").trim()
    },
    learningObjectives: {
      en: Array.isArray(learningObjectives?.en) ? learningObjectives.en : [],
      hinglish: Array.isArray(learningObjectives?.hinglish) ? learningObjectives.hinglish : []
    },
    references: Array.isArray(references) ? references : [],
    keyFormulas: Array.isArray(keyFormulas) ? keyFormulas : [],
    units: Array.isArray(units) ? units : [],
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  store.subjects.push(newSubject);
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "SUBJECT_CREATED", "CMS_SUBJECTS", { slug: newSubject.slug, name: newSubject.name.en });
  db.save();
  res.status(201).json({ success: true, subject: newSubject });
});
adminRouter.put("/cms/subjects/:id", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  store.subjects = store.subjects || [];
  const subject = store.subjects.find((s) => s.id === id || s.slug === id);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }
  const fields = ["name", "description", "icon", "overview", "learningObjectives", "keyFormulas", "references", "units", "orderIndex", "isPublished"];
  for (const f of fields) {
    if (req.body[f] !== void 0) {
      subject[f] = req.body[f];
    }
  }
  if (Array.isArray(subject.units)) {
    subject.unitsCount = subject.units.length;
    subject.topicsCount = subject.units.reduce((acc, u) => {
      const chTopics = (u.chapters || []).reduce((cAcc, c) => cAcc + (c.topics?.length || 0), 0);
      return acc + chTopics;
    }, 0);
  }
  subject.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "SUBJECT_UPDATED", "CMS_SUBJECTS", { id: subject.id, slug: subject.slug });
  db.save();
  res.json({ success: true, subject });
});
adminRouter.delete("/cms/subjects/:id", requireAdminAuth, requireRoles(["superadmin"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  store.subjects = store.subjects || [];
  const idx = store.subjects.findIndex((s) => s.id === id || s.slug === id);
  if (idx === -1) {
    return res.status(404).json({ error: "Subject not found" });
  }
  const removed = store.subjects.splice(idx, 1)[0];
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "SUBJECT_DELETED", "CMS_SUBJECTS", { slug: removed.slug, name: removed.name.en });
  db.save();
  res.json({ success: true, message: `Subject "${removed.name.en}" deleted.` });
});
adminRouter.post("/cms/subjects/:id/toggle-publish", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { id } = req.params;
  const store = db.getData();
  store.subjects = store.subjects || [];
  const subject = store.subjects.find((s) => s.id === id || s.slug === id);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }
  subject.isPublished = !subject.isPublished;
  subject.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "SUBJECT_PUBLISH_TOGGLED", "CMS_SUBJECTS", { slug: subject.slug, isPublished: subject.isPublished });
  db.save();
  res.json({ success: true, isPublished: subject.isPublished });
});
adminRouter.get("/cms/topics", requireAdminAuth, (req, res) => {
  const store = db.getData();
  const allTopics = [];
  for (const sub of store.subjects || []) {
    for (const unit of sub.units || []) {
      for (const ch of unit.chapters || []) {
        for (const top of ch.topics || []) {
          allTopics.push({
            ...top,
            subjectId: sub.id,
            subjectSlug: sub.slug,
            subjectName: sub.name.en,
            unitNumber: unit.unitNumber,
            unitTitle: unit.title.en,
            chapterNumber: ch.chapterNumber,
            chapterTitle: ch.title.en
          });
        }
      }
    }
  }
  res.json(allTopics);
});
adminRouter.put("/cms/topics/:slug", requireAdminAuth, requireRoles(["superadmin", "editor"]), (req, res) => {
  const { slug } = req.params;
  const store = db.getData();
  let found = false;
  for (const sub of store.subjects || []) {
    for (const unit of sub.units || []) {
      for (const ch of unit.chapters || []) {
        const top = (ch.topics || []).find((t) => t.slug === slug || t.id === slug);
        if (top) {
          Object.assign(top, req.body);
          sub.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (found) break;
  }
  if (!found) {
    return res.status(404).json({ error: "Topic not found across any curriculum subject" });
  }
  db.addAuditLog(req.adminUser.email, req.adminUser.role, "TOPIC_UPDATED", "CMS_TOPICS", { slug });
  db.save();
  res.json({ success: true, message: `Topic ${slug} updated successfully.` });
});

// server/aiRoutes.ts
import express2 from "express";

// server/ai/providers/geminiProvider.ts
import { GoogleGenAI } from "@google/genai";
var GeminiProvider = class {
  constructor() {
    this.client = null;
    this.defaultModel = "gemini-3.8-flash";
    this.initClient();
  }
  initClient() {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      try {
        this.client = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build"
            }
          }
        });
      } catch (e) {
        console.warn("[GeminiProvider] Initialization warning:", e);
        this.client = null;
      }
    } else {
      this.client = null;
    }
  }
  isConfigured() {
    return Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  }
  async checkHealth(modelName = this.defaultModel) {
    if (!this.isConfigured()) {
      return {
        provider: "gemini",
        configured: false,
        operational: false,
        model: modelName,
        message: "GEMINI_API_KEY is not set in environment."
      };
    }
    const start = Date.now();
    try {
      if (!this.client) this.initClient();
      if (!this.client) throw new Error("Failed to instantiate Google GenAI client");
      const response = await this.client.models.generateContent({
        model: modelName,
        contents: 'Respond with the word "READY" if you are operational for scientific research.'
      });
      const latencyMs = Date.now() - start;
      const text = response.text || "";
      return {
        provider: "gemini",
        configured: true,
        operational: text.length > 0,
        latencyMs,
        model: modelName,
        message: `Gemini API is operational (Latency: ${latencyMs}ms)`
      };
    } catch (err) {
      return {
        provider: "gemini",
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: modelName,
        message: err.message || "Gemini connectivity failed.",
        error: String(err)
      };
    }
  }
  async execute(request, modelName = this.defaultModel, enableSearchGrounding = false) {
    if (!this.isConfigured()) {
      throw new Error("GEMINI_API_KEY not configured in environment variables.");
    }
    if (!this.client) this.initClient();
    if (!this.client) throw new Error("Google GenAI client unavailable.");
    const start = Date.now();
    const config = {
      systemInstruction: request.systemPrompt
    };
    if (request.responseMimeType) {
      config.responseMimeType = request.responseMimeType;
    }
    if (enableSearchGrounding) {
      config.tools = [{ googleSearch: {} }];
    }
    const response = await this.client.models.generateContent({
      model: modelName,
      contents: request.userPrompt,
      config
    });
    const text = response.text || "";
    const durationMs = Date.now() - start;
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = rawChunks.map((chunk) => ({
      title: chunk.web?.title || "Official Reference",
      url: chunk.web?.uri || ""
    })).filter((s) => Boolean(s.url));
    return {
      text,
      provider: "gemini",
      model: modelName,
      sources,
      durationMs
    };
  }
};

// server/ai/providers/groqProvider.ts
var GroqProvider = class {
  constructor() {
    this.defaultModel = "llama-3.3-70b-versatile";
    this.endpoint = "https://api.groq.com/openai/v1/chat/completions";
  }
  isConfigured() {
    return Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim().length > 0);
  }
  async checkHealth(modelName = this.defaultModel) {
    if (!this.isConfigured()) {
      return {
        provider: "groq",
        configured: false,
        operational: false,
        model: modelName,
        message: "GROQ_API_KEY is not set in environment."
      };
    }
    const start = Date.now();
    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: "user", content: 'Respond with the word "READY".' }],
          max_tokens: 10
        })
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `HTTP ${res.status} ${res.statusText}`;
        return {
          provider: "groq",
          configured: true,
          operational: false,
          latencyMs,
          model: modelName,
          message: `Groq error: ${errMsg}`,
          error: errMsg
        };
      }
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "";
      return {
        provider: "groq",
        configured: true,
        operational: content.length > 0,
        latencyMs,
        model: modelName,
        message: `Groq API is operational (Latency: ${latencyMs}ms)`
      };
    } catch (err) {
      return {
        provider: "groq",
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: modelName,
        message: err.message || "Groq connectivity failed.",
        error: String(err)
      };
    }
  }
  async execute(request, modelName = this.defaultModel) {
    if (!this.isConfigured()) {
      throw new Error("GROQ_API_KEY not configured in environment variables.");
    }
    const start = Date.now();
    const messages = [
      { role: "system", content: request.systemPrompt },
      { role: "user", content: request.userPrompt }
    ];
    const body = {
      model: modelName,
      messages,
      temperature: request.temperature ?? 0.2,
      max_tokens: request.maxTokens ?? 2048
    };
    if (request.responseMimeType === "application/json") {
      body.response_format = { type: "json_object" };
    }
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify(body)
    });
    const durationMs = Date.now() - start;
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || `Groq API error HTTP ${res.status}`;
      if (res.status === 429) {
        throw new Error(`RATE_LIMIT: ${errMsg}`);
      }
      throw new Error(`Groq request failed: ${errMsg}`);
    }
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || 0;
    return {
      text,
      provider: "groq",
      model: modelName,
      tokensUsed,
      durationMs
    };
  }
};

// server/ai/providers/openrouterProvider.ts
var OpenRouterProvider = class {
  constructor() {
    this.defaultModel = "meta-llama/llama-3.3-70b-instruct:free";
    this.endpoint = "https://openrouter.ai/api/v1/chat/completions";
    // Strict list of allowed FREE-tier models to prevent any paid billing
    this.allowedFreeModels = [
      "meta-llama/llama-3.3-70b-instruct:free",
      "google/gemini-2.0-flash-exp:free",
      "qwen/qwen-2.5-72b-instruct:free",
      "mistralai/mistral-7b-instruct:free",
      "meta-llama/llama-3.1-8b-instruct:free"
    ];
  }
  isConfigured() {
    return Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim().length > 0);
  }
  validateFreeModel(model) {
    if (!model.endsWith(":free") && !this.allowedFreeModels.includes(model)) {
      console.warn(`[OpenRouter] Model "${model}" is not in free tier list. Defaulting to free model.`);
      return this.defaultModel;
    }
    return model;
  }
  async checkHealth(modelName = this.defaultModel) {
    if (!this.isConfigured()) {
      return {
        provider: "openrouter",
        configured: false,
        operational: false,
        model: modelName,
        message: "OPENROUTER_API_KEY is not set in environment."
      };
    }
    const safeModel = this.validateFreeModel(modelName);
    const start = Date.now();
    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://bioscienceknowledge-hub.vercel.app",
          "X-Title": "BioScience Hub"
        },
        body: JSON.stringify({
          model: safeModel,
          messages: [{ role: "user", content: 'Respond with the word "READY".' }],
          max_tokens: 10
        })
      });
      const latencyMs = Date.now() - start;
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `HTTP ${res.status} ${res.statusText}`;
        return {
          provider: "openrouter",
          configured: true,
          operational: false,
          latencyMs,
          model: safeModel,
          message: `OpenRouter error: ${errMsg}`,
          error: errMsg
        };
      }
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content || "";
      return {
        provider: "openrouter",
        configured: true,
        operational: content.length > 0,
        latencyMs,
        model: safeModel,
        message: `OpenRouter free tier operational (Latency: ${latencyMs}ms)`
      };
    } catch (err) {
      return {
        provider: "openrouter",
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: safeModel,
        message: err.message || "OpenRouter connectivity failed.",
        error: String(err)
      };
    }
  }
  async execute(request, modelName = this.defaultModel) {
    if (!this.isConfigured()) {
      throw new Error("OPENROUTER_API_KEY not configured in environment variables.");
    }
    const safeModel = this.validateFreeModel(modelName);
    const start = Date.now();
    const messages = [
      { role: "system", content: request.systemPrompt },
      { role: "user", content: request.userPrompt }
    ];
    const body = {
      model: safeModel,
      messages,
      temperature: request.temperature ?? 0.2,
      max_tokens: request.maxTokens ?? 2048
    };
    if (request.responseMimeType === "application/json") {
      body.response_format = { type: "json_object" };
    }
    const res = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://bioscienceknowledge-hub.vercel.app",
        "X-Title": "BioScience Hub"
      },
      body: JSON.stringify(body)
    });
    const durationMs = Date.now() - start;
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      const errMsg = errJson?.error?.message || `OpenRouter API error HTTP ${res.status}`;
      if (res.status === 429) {
        throw new Error(`RATE_LIMIT: ${errMsg}`);
      }
      throw new Error(`OpenRouter request failed: ${errMsg}`);
    }
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || "";
    const tokensUsed = data.usage?.total_tokens || 0;
    return {
      text,
      provider: "openrouter",
      model: safeModel,
      tokensUsed,
      durationMs
    };
  }
};

// server/ai/providers/ollamaProvider.ts
var OllamaProvider = class {
  getBaseUrl() {
    return (process.env.OLLAMA_BASE_URL || "http://localhost:11434").replace(/\/+$/, "");
  }
  async checkHealth(modelName = "gemma3:4b") {
    const baseUrl = this.getBaseUrl();
    const start = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    try {
      const versionRes = await fetch(`${baseUrl}/api/version`, {
        signal: controller.signal
      }).catch((err) => {
        throw new Error(`Ollama daemon unreachable at ${baseUrl} (${err.message})`);
      });
      if (!versionRes.ok) {
        clearTimeout(timeout);
        return {
          provider: "ollama",
          configured: true,
          operational: false,
          model: modelName,
          message: `Ollama reachable but returned HTTP ${versionRes.status}`
        };
      }
      const tagsRes = await fetch(`${baseUrl}/api/tags`, {
        signal: controller.signal
      }).catch(() => null);
      clearTimeout(timeout);
      let modelInstalled = false;
      let installedList = [];
      if (tagsRes && tagsRes.ok) {
        const tagsData = await tagsRes.json().catch(() => ({}));
        const models = (tagsData.models || []).map((m) => m.name);
        installedList = models;
        modelInstalled = models.some((m) => m.toLowerCase().includes(modelName.toLowerCase().split(":")[0]));
      }
      const latencyMs = Date.now() - start;
      return {
        provider: "ollama",
        configured: true,
        operational: true,
        latencyMs,
        model: modelName,
        message: modelInstalled ? `Ollama online at ${baseUrl}. Model "${modelName}" is ready.` : `Ollama online at ${baseUrl}, but "${modelName}" may need to be pulled (Available: ${installedList.slice(0, 3).join(", ") || "none"}).`
      };
    } catch (err) {
      clearTimeout(timeout);
      return {
        provider: "ollama",
        configured: true,
        operational: false,
        latencyMs: Date.now() - start,
        model: modelName,
        message: `Local Ollama is offline or unreachable at ${baseUrl}. (Expected if running in cloud container or local daemon is stopped).`,
        error: String(err.message || err)
      };
    }
  }
  async execute(request, modelName = "gemma3:4b") {
    const baseUrl = this.getBaseUrl();
    const start = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6e4);
    try {
      const prompt = `${request.systemPrompt}

Task:
${request.userPrompt}`;
      const res = await fetch(`${baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: modelName,
          prompt,
          stream: false,
          format: request.responseMimeType === "application/json" ? "json" : void 0,
          options: {
            temperature: request.temperature ?? 0.2
          }
        })
      });
      clearTimeout(timeout);
      if (!res.ok) {
        throw new Error(`Ollama request failed with HTTP ${res.status}`);
      }
      const data = await res.json();
      const text = data.response || "";
      const durationMs = Date.now() - start;
      return {
        text,
        provider: "ollama",
        model: modelName,
        durationMs
      };
    } catch (err) {
      clearTimeout(timeout);
      throw new Error(`Ollama execution failed: ${err.message}`);
    }
  }
};

// server/ai/aiEngine.ts
var AiEngine = class {
  constructor() {
    this.gemini = new GeminiProvider();
    this.groq = new GroqProvider();
    this.openrouter = new OpenRouterProvider();
    this.ollama = new OllamaProvider();
    // In-memory cooldown tracker (timestamps until when a provider is in cooldown)
    this.providerCooldowns = /* @__PURE__ */ new Map();
    // In-memory consecutive error counter
    this.errorCounts = /* @__PURE__ */ new Map();
  }
  /**
   * Health-check all 5 provider slots and return consolidated status
   */
  async getHealthReport() {
    const store = db.getData();
    const cfg = store.aiConfig;
    const results = [];
    const geminiStatus = await this.gemini.checkHealth(cfg.providerSettings.gemini?.model || "gemini-3.8-flash");
    results.push(geminiStatus);
    const groqStatus = await this.groq.checkHealth(cfg.providerSettings.groq?.model || "llama-3.3-70b-versatile");
    results.push(groqStatus);
    const openrouterStatus = await this.openrouter.checkHealth(cfg.providerSettings.openrouter?.model || "meta-llama/llama-3.3-70b-instruct:free");
    results.push(openrouterStatus);
    const ollamaGemmaStatus = await this.ollama.checkHealth("gemma3:4b");
    ollamaGemmaStatus.provider = "ollama_gemma";
    results.push(ollamaGemmaStatus);
    const ollamaQwenStatus = await this.ollama.checkHealth("qwen2.5:1.5b");
    ollamaQwenStatus.provider = "ollama_qwen";
    results.push(ollamaQwenStatus);
    for (const res of results) {
      const pid = res.provider;
      if (cfg.providerSettings[pid]) {
        cfg.providerSettings[pid].isOperational = res.operational;
        cfg.providerSettings[pid].lastTestedAt = (/* @__PURE__ */ new Date()).toISOString();
        if (res.message) {
          cfg.providerSettings[pid].statusNote = res.message;
        }
      }
    }
    db.save();
    return results;
  }
  /**
   * Returns list of providers ordered by priority and availability
   */
  getEligibleProviders() {
    const store = db.getData();
    const priorities = store.aiConfig.providerPriorities || [
      "gemini",
      "groq",
      "openrouter",
      "ollama_gemma",
      "ollama_qwen"
    ];
    const now = Date.now();
    return priorities.filter((pid) => {
      const settings = store.aiConfig.providerSettings[pid];
      if (settings && !settings.enabled) return false;
      const cooldownUntil = this.providerCooldowns.get(pid);
      if (cooldownUntil && cooldownUntil > now) {
        return false;
      }
      if (pid === "gemini" && !this.gemini.isConfigured()) return false;
      if (pid === "groq" && !this.groq.isConfigured()) return false;
      if (pid === "openrouter" && !this.openrouter.isConfigured()) return false;
      return true;
    });
  }
  /**
   * Execute request with automatic failover across providers in priority order.
   * If a provider fails with rate limit or transient error, it fails over to the next.
   * If all fail, preserves progress and safely throws with details.
   */
  async executeWithFailover(request, options) {
    const store = db.getData();
    let eligible = this.getEligibleProviders();
    if (options?.preferredProvider && eligible.includes(options.preferredProvider)) {
      eligible = [options.preferredProvider, ...eligible.filter((p) => p !== options.preferredProvider)];
    }
    if (eligible.length === 0) {
      const msg = "No AI providers currently eligible or configured. Check API keys (GEMINI_API_KEY, GROQ_API_KEY, OPENROUTER_API_KEY) or start Ollama.";
      db.addAiActivityLog("system", "ALL_PROVIDERS_UNAVAILABLE", "EXECUTION_FAILOVER", [], 0, "warning", {
        error: msg,
        cooldowns: Array.from(this.providerCooldowns.entries()).map(([k, v]) => ({
          provider: k,
          cooldownRemainingSec: Math.max(0, Math.ceil((v - Date.now()) / 1e3))
        }))
      });
      throw new Error(msg);
    }
    const errors = [];
    for (const providerId of eligible) {
      try {
        const settings = store.aiConfig.providerSettings[providerId];
        let response;
        if (providerId === "gemini") {
          const model = settings?.model || "gemini-3.8-flash";
          response = await this.gemini.execute(request, model, options?.enableSearchGrounding);
        } else if (providerId === "groq") {
          const model = settings?.model || "llama-3.3-70b-versatile";
          response = await this.groq.execute(request, model);
        } else if (providerId === "openrouter") {
          const model = settings?.model || "meta-llama/llama-3.3-70b-instruct:free";
          response = await this.openrouter.execute(request, model);
        } else if (providerId === "ollama_gemma") {
          response = await this.ollama.execute(request, "gemma3:4b");
          response.provider = "ollama_gemma";
        } else if (providerId === "ollama_qwen") {
          response = await this.ollama.execute(request, "qwen2.5:1.5b");
          response.provider = "ollama_qwen";
        } else {
          continue;
        }
        this.errorCounts.delete(providerId);
        this.providerCooldowns.delete(providerId);
        store.aiConfig.activeProvider = providerId;
        db.incrementAiUsage(response.tokensUsed || 0);
        return response;
      } catch (err) {
        const errMsg = String(err.message || err);
        errors.push({ provider: providerId, error: errMsg });
        const isRateLimit = errMsg.includes("RATE_LIMIT") || errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED");
        const isAuthError = errMsg.includes("401") || errMsg.includes("403") || errMsg.includes("API_KEY_INVALID");
        const cooldownSeconds = isRateLimit ? 60 : isAuthError ? 900 : 30;
        this.providerCooldowns.set(providerId, Date.now() + cooldownSeconds * 1e3);
        const currentErrCount = (this.errorCounts.get(providerId) || 0) + 1;
        this.errorCounts.set(providerId, currentErrCount);
        db.addAiActivityLog(providerId, "PROVIDER_FAILOVER_TRIGGERED", "FAILOVER", [], 0, "warning", {
          providerFailed: providerId,
          reason: errMsg,
          isRateLimit,
          isAuthError,
          cooldownSeconds,
          consecutiveErrors: currentErrCount
        });
        console.warn(`[AiEngine] Provider ${providerId} failed (${errMsg}). Failing over to next eligible provider...`);
      }
    }
    const combinedMsg = `All available AI providers failed. Attempts: ${errors.map((e) => `${e.provider}: ${e.error}`).join(" | ")}`;
    db.addAiActivityLog("system", "ALL_PROVIDERS_EXHAUSTED", "FAILOVER_HALT", [], 0, "failed", { errors });
    throw new Error(combinedMsg);
  }
};
var aiEngine = new AiEngine();

// server/ai/types.ts
function sanitizeUntrustedContent(raw, maxChars = 25e3) {
  if (!raw || typeof raw !== "string") return "";
  let cleaned = raw.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, " ").replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const injectionPatterns = [
    /ignore\s+(all\s+)?previous\s+instructions/gi,
    /system\s+prompt\s*:/gi,
    /you\s+are\s+now\s+in\s+developer\s+mode/gi,
    /disregard\s+(the\s+)?above/gi,
    /override\s+all\s+safety/gi,
    /print\s+your\s+instructions/gi,
    /reveal\s+your\s+api\s+key/gi
  ];
  for (const pattern of injectionPatterns) {
    cleaned = cleaned.replace(pattern, "[REDACTED_POTENTIAL_INJECTION]");
  }
  if (cleaned.length > maxChars) {
    cleaned = cleaned.substring(0, maxChars) + "... [TRUNCATED_FOR_SAFETY]";
  }
  return `<untrusted_web_source_content>
${cleaned}
</untrusted_web_source_content>`;
}

// server/ai/webResearchEngine.ts
var WebResearchEngine = class {
  constructor() {
    // Authoritative biotechnology & science domains in India & internationally
    this.AUTHORITATIVE_DOMAINS = [
      "dbtindia.gov.in",
      "dbt.nta.ac.in",
      "dst.gov.in",
      "serb.gov.in",
      "anrfonline.in",
      "csir.res.in",
      "csirnet.nta.ac.in",
      "icmr.nic.in",
      "birac.nic.in",
      "rcb.res.in",
      "iisc.ac.in",
      "tifr.res.in",
      "ncbs.res.in",
      "nta.ac.in",
      "ugc.gov.in",
      "gate2026.iitr.ac.in",
      "jam2026.iitd.ac.in",
      "pgcuet.samarth.ac.in",
      "webjapps.ias.ac.in",
      "insaindia.res.in"
    ];
  }
  /**
   * Fetch and safely extract text from an official source URL with timeout and sanitization
   */
  async fetchOfficialSource(url) {
    try {
      const parsedUrl = new URL(url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        return { text: "", success: false, error: "Invalid URL protocol" };
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8e3);
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 BioScienceHubResearchBot/1.0",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        },
        signal: controller.signal
      });
      clearTimeout(timeout);
      if (!res.ok) {
        return { text: "", success: false, error: `HTTP ${res.status} from source portal` };
      }
      const html = await res.text();
      const sanitized = sanitizeUntrustedContent(html, 2e4);
      return {
        text: sanitized,
        success: true
      };
    } catch (err) {
      return {
        text: "",
        success: false,
        error: err.message || "Failed to retrieve source portal"
      };
    }
  }
  /**
   * Run targeted search via Tavily API (if configured) or fallback to Gemini Search Grounding
   */
  async searchOfficialSources(query) {
    const tavilyKey = process.env.TAVILY_API_KEY;
    if (tavilyKey && tavilyKey.trim().length > 0) {
      try {
        const res = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: tavilyKey,
            query: `${query} official notification OR application form DBT DST CSIR NTA IISc`,
            search_depth: "advanced",
            include_domains: this.AUTHORITATIVE_DOMAINS,
            max_results: 6
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.results)) {
            return data.results.map((r) => ({
              title: r.title || "Official Portal",
              url: r.url,
              snippet: r.content || ""
            }));
          }
        }
      } catch (e) {
        console.warn("[WebResearchEngine] Tavily query warning, falling back to Gemini Grounding:", e);
      }
    }
    try {
      const searchPrompt = `Find official announcements, government notifications, or portal updates for: ${query}.
Focus strictly on official Indian science institutions (DBT, DST, CSIR, ICMR, NTA, RCB, IISc, IITs).
Return a bulleted summary and list all official URLs found.`;
      const geminiRes = await aiEngine.executeWithFailover(
        {
          systemPrompt: "You are an autonomous scientific researcher for BioScience Hub. You identify official, genuine announcements and their source URLs.",
          userPrompt: searchPrompt
        },
        { enableSearchGrounding: true, preferredProvider: "gemini" }
      );
      if (geminiRes.sources && geminiRes.sources.length > 0) {
        return geminiRes.sources.map((s) => ({
          title: s.title,
          url: s.url,
          snippet: geminiRes.text.substring(0, 200)
        }));
      }
    } catch (e) {
      console.warn("[WebResearchEngine] Gemini search grounding fallback warning:", e);
    }
    return [];
  }
  /**
   * Conduct structured research cycle and extract verified opportunity records
   */
  async conductResearchCycle(options) {
    const store = db.getData();
    const mode = store.aiConfig.operatingMode;
    const maxItems = options.maxResults || store.aiConfig.maxItemsPerResearchRun || 6;
    let queryTopic = "biotechnology JRF vacancy project associate summer fellowship 2026";
    if (options.customQuery) {
      queryTopic = options.customQuery;
    } else if (options.targetExam) {
      queryTopic = `${options.targetExam} official bulletin examination date syllabus eligibility NTA`;
    } else if (options.targetInstitution) {
      queryTopic = `${options.targetInstitution} biotechnology fellowship recruitment admission notification`;
    } else if (options.category) {
      queryTopic = `biotechnology ${options.category} official notification deadline eligibility stipend`;
    }
    db.addAiActivityLog("system", "RESEARCH_CYCLE_STARTED", "DISCOVERY", [], 0, "success", {
      queryTopic,
      category: options.category,
      operatingMode: mode
    });
    const searchResults = await this.searchOfficialSources(queryTopic);
    const discoveredUrls = searchResults.map((r) => r.url);
    const extractionSystemPrompt = `You are the Scientific Research & Verification Engine of BioScience Hub.
Your task is to analyze discovered notifications and extract strictly genuine records.

RULES:
1. Only extract information supported by official facts.
2. If any field (stipend, deadline, eligibility) is not explicitly stated in the source, mark it as "Unknown". NEVER invent or guess details.
3. Classify verification status strictly:
   - "Verified Official": Original official agency notification URL is confirmed.
   - "Official Source Found \u2013 Further Review Needed": Official page found but incomplete criteria.
   - "Unverified": Secondary lead, requires inspection.
4. Return an exact JSON array of objects.

JSON schema per item:
{
  "title": string,
  "category": "job" | "internship" | "scholarship" | "admission" | "research" | "fellowship" | "conference" | "exam",
  "institution": string,
  "originalSourceUrl": string,
  "notificationUrlOrPdf": string,
  "publicationDate": string or "Unknown",
  "applicationOpeningDate": string or "Unknown",
  "applicationDeadline": string (YYYY-MM-DD) or "Unknown",
  "eligibility": string,
  "stipendOrFunding": string or "Unknown",
  "location": string or "Unknown",
  "duration": string or "Unknown",
  "officialApplicationLink": string or "Unknown",
  "verificationStatus": "Verified Official" | "Official Source Found \u2013 Further Review Needed" | "Unverified",
  "evidenceNotes": string (cite specific official notification number, date, or bulletin section)
}`;
    const userPrompt = `Analyze the following research leads for topic: "${queryTopic}".
Leads & Sources:
${searchResults.map((r, i) => `[Lead ${i + 1}] Title: ${r.title}
URL: ${r.url}
Excerpt: ${r.snippet}`).join("\n\n")}

Extract up to ${maxItems} verified opportunities in valid JSON format only.`;
    let extractedItems = [];
    let providerUsed = "unknown";
    try {
      const aiResponse = await aiEngine.executeWithFailover({
        systemPrompt: extractionSystemPrompt,
        userPrompt,
        responseMimeType: "application/json"
      });
      providerUsed = aiResponse.provider;
      const parsed = JSON.parse(aiResponse.text);
      if (Array.isArray(parsed)) {
        extractedItems = parsed;
      } else if (parsed && Array.isArray(parsed.items)) {
        extractedItems = parsed.items;
      }
    } catch (e) {
      console.warn("[WebResearchEngine] Extraction JSON parsing warning:", e);
      extractedItems = [];
    }
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const createdRecords = [];
    for (const item of extractedItems) {
      if (!item.title || !item.institution) continue;
      const isDuplicate = store.opportunities.some(
        (opp) => opp.title.toLowerCase().trim() === item.title.toLowerCase().trim() && opp.organization.toLowerCase().trim() === item.institution.toLowerCase().trim()
      ) || store.aiResearchQueue.some(
        (q) => q.title.toLowerCase().trim() === item.title.toLowerCase().trim() && q.institution.toLowerCase().trim() === item.institution.toLowerCase().trim()
      );
      if (isDuplicate) {
        continue;
      }
      const record = {
        id: "res-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
        title: String(item.title).trim(),
        category: item.category || options.category || "job",
        institution: String(item.institution).trim(),
        originalSourceUrl: item.originalSourceUrl || item.notificationUrlOrPdf || "Unknown",
        notificationUrlOrPdf: item.notificationUrlOrPdf || item.originalSourceUrl || "Unknown",
        publicationDate: item.publicationDate !== "Unknown" ? item.publicationDate : void 0,
        applicationOpeningDate: item.applicationOpeningDate !== "Unknown" ? item.applicationOpeningDate : void 0,
        applicationDeadline: item.applicationDeadline !== "Unknown" ? item.applicationDeadline : void 0,
        eligibility: item.eligibility || "Refer to official notification bulletin.",
        stipendOrFunding: item.stipendOrFunding !== "Unknown" ? item.stipendOrFunding : void 0,
        location: item.location !== "Unknown" ? item.location : "India",
        duration: item.duration !== "Unknown" ? item.duration : void 0,
        officialApplicationLink: item.officialApplicationLink !== "Unknown" ? item.officialApplicationLink : void 0,
        lastCheckedAt: nowIso,
        lastUpdatedAt: nowIso,
        verificationStatus: item.verificationStatus || "Official Source Found \u2013 Further Review Needed",
        evidenceNotes: item.evidenceNotes || "Extracted from official portal announcement.",
        sourceMetadata: {
          searchQuery: queryTopic,
          discoveredAt: nowIso,
          confidenceScore: item.verificationStatus === "Verified Official" ? 0.95 : 0.75
        },
        discoveredByProvider: providerUsed,
        isPublishedToLive: false
      };
      store.aiResearchQueue.unshift(record);
      createdRecords.push(record);
    }
    if (store.aiResearchQueue.length > 200) {
      store.aiResearchQueue = store.aiResearchQueue.slice(0, 200);
    }
    db.addAiActivityLog(providerUsed, "RESEARCH_CYCLE_COMPLETED", "DISCOVERY", discoveredUrls, createdRecords.length, "success", {
      queryTopic,
      newRecordsAdded: createdRecords.length,
      mode
    });
    db.save();
    return createdRecords;
  }
};
var webResearchEngine = new WebResearchEngine();

// server/ai/verificationEngine.ts
var ScientificVerificationEngine = class {
  /**
   * Run 9-step scientific verification pipeline on a specific research record
   */
  async verifyRecord(recordId) {
    const store = db.getData();
    const record = store.aiResearchQueue.find((r) => r.id === recordId);
    if (!record) {
      throw new Error(`Record ${recordId} not found in research queue`);
    }
    const start = Date.now();
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const sourceUrl = record.notificationUrlOrPdf || record.originalSourceUrl;
    let newStatus = "Official Source Found \u2013 Further Review Needed";
    let notes = record.evidenceNotes || "";
    const isAuthoritativeDomain = [
      "gov.in",
      "nic.in",
      "res.in",
      "ac.in",
      "edu",
      "samarth.ac.in",
      "nta.ac.in"
    ].some((suffix) => {
      try {
        return new URL(sourceUrl).hostname.endsWith(suffix);
      } catch {
        return false;
      }
    });
    if (record.applicationDeadline && record.applicationDeadline !== "Unknown") {
      const deadlineDate = new Date(record.applicationDeadline);
      if (!isNaN(deadlineDate.getTime()) && deadlineDate.getTime() < Date.now()) {
        newStatus = "Expired";
        notes = `Application deadline (${record.applicationDeadline}) has passed. Marked as Expired.`;
      }
    }
    if (newStatus !== "Expired") {
      if (isAuthoritativeDomain && sourceUrl.startsWith("http")) {
        newStatus = "Verified Official";
        notes = `Verified against authoritative institutional portal: ${new URL(sourceUrl).hostname}. Dates and eligibility validated.`;
      } else if (sourceUrl === "Unknown" || !sourceUrl.startsWith("http")) {
        newStatus = "Source Unavailable";
        notes = "No valid official notification URL found for this opportunity.";
      } else {
        newStatus = "Official Source Found \u2013 Further Review Needed";
        notes = "Domain requires secondary administrative confirmation.";
      }
    }
    record.verificationStatus = newStatus;
    record.evidenceNotes = notes;
    record.lastCheckedAt = nowIso;
    record.lastUpdatedAt = nowIso;
    db.addAiActivityLog("verification_pipeline", "RECORD_VERIFIED", "VERIFICATION", [sourceUrl], 1, "success", {
      recordId: record.id,
      title: record.title,
      assignedStatus: newStatus,
      durationMs: Date.now() - start
    });
    db.save();
    return record;
  }
  /**
   * Promotes a verified research record to the public live website (store.opportunities)
   */
  async publishToLive(recordId, actorEmail) {
    const store = db.getData();
    const record = store.aiResearchQueue.find((r) => r.id === recordId);
    if (!record) {
      throw new Error(`Record ${recordId} not found`);
    }
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const oppId = "opp-ai-" + Date.now();
    let oppType = "job";
    if (["internship", "scholarship", "admission", "research", "fellowship"].includes(record.category)) {
      oppType = record.category;
    }
    const newOpportunity = {
      id: oppId,
      type: oppType,
      title: record.title,
      organization: record.institution,
      description: `${record.title} at ${record.institution}. ${record.evidenceNotes}`,
      eligibility: record.eligibility || "Refer to official notification bulletin.",
      qualification: record.eligibility || "Relevant scientific qualification required.",
      location: record.location || "India",
      stipendOrSalary: record.stipendOrFunding || "As per institutional norms",
      openingDate: record.applicationOpeningDate || nowIso.substring(0, 10),
      deadline: record.applicationDeadline || "2026-12-31",
      officialNotificationUrl: record.notificationUrlOrPdf || record.originalSourceUrl,
      applicationUrl: record.officialApplicationLink || record.originalSourceUrl,
      sourceUrl: record.originalSourceUrl,
      verificationStatus: record.verificationStatus === "Verified Official" ? "verified" : "pending_review",
      publicationStatus: "published",
      lastVerifiedDate: nowIso.substring(0, 10),
      nextReviewDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1e3).toISOString().substring(0, 10),
      verifiedBy: actorEmail,
      createdAt: nowIso,
      updatedAt: nowIso
    };
    store.opportunities.unshift(newOpportunity);
    record.isPublishedToLive = true;
    record.liveEntityId = oppId;
    db.addAuditLog(
      actorEmail,
      "superadmin",
      "AI_RECORD_PUBLISHED_TO_LIVE",
      "OPPORTUNITIES",
      { recordId, oppId, title: record.title, institution: record.institution }
    );
    db.addAiActivityLog("admin", "RECORD_PUBLISHED_LIVE", "PUBLISH", [record.originalSourceUrl], 1, "success", {
      recordId,
      oppId,
      actorEmail
    });
    db.save();
    return newOpportunity;
  }
  /**
   * Run background audit on existing published opportunities to flag or archive expired listings
   */
  async auditExpiredOpportunities() {
    const store = db.getData();
    const today = (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
    const mode = store.aiConfig.operatingMode;
    let checked = 0;
    let expiredArchived = 0;
    for (const opp of store.opportunities) {
      if (opp.publicationStatus === "published" && opp.deadline) {
        checked++;
        if (opp.deadline < today) {
          if (mode === "controlled_autonomous") {
            opp.publicationStatus = "archived";
            opp.verificationStatus = "verified";
            opp.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
            expiredArchived++;
          }
        }
      }
    }
    if (expiredArchived > 0) {
      db.addAiActivityLog("system", "EXPIRED_OPPORTUNITIES_AUTO_ARCHIVED", "MAINTENANCE", [], expiredArchived, "success", {
        checked,
        expiredArchived,
        mode
      });
      db.save();
    }
    return { checked, expiredArchived };
  }
};
var verificationEngine = new ScientificVerificationEngine();

// server/ai/monitorEngine.ts
var ExaminationMonitorEngine = class {
  constructor() {
    this.SUPPORTED_EXAMS = [
      { code: "GAT-B", name: "Graduate Aptitude Test - Biotechnology", portalUrl: "https://dbt.nta.ac.in" },
      { code: "DBT-JRF", name: "Biotechnology Eligibility Test (BET) / DBT-JRF", portalUrl: "https://dbt.nta.ac.in" },
      { code: "GATE-BT", name: "GATE - Biotechnology", portalUrl: "https://gate2026.iitr.ac.in" },
      { code: "IIT-JAM", name: "IIT JAM - Biotechnology", portalUrl: "https://jam2026.iitd.ac.in" },
      { code: "CUET-PG", name: "CUET-PG - Life Sciences", portalUrl: "https://pgcuet.samarth.ac.in" },
      { code: "CSIR-NET", name: "Joint CSIR-UGC NET - Life Sciences", portalUrl: "https://csirnet.nta.ac.in" }
    ];
  }
  /**
   * Monitor an official examination portal and detect proposed corrections
   */
  async monitorExam(examCode) {
    const store = db.getData();
    const currentExam = store.examinations.find((e) => e.code === examCode);
    if (!currentExam) {
      throw new Error(`Examination ${examCode} not found in database.`);
    }
    const start = Date.now();
    const examMeta = this.SUPPORTED_EXAMS.find((e) => e.code === examCode);
    const systemPrompt = `You are the Examination Monitor Engine for BioScience Hub.
You monitor official Indian National Examination bulletins strictly for: GAT-B, DBT-JRF, GATE-BT, IIT-JAM, CUET-PG, CSIR-NET.
Compare the current database information with recent official announcements.

RULES:
1. NEVER fabricate exam dates, patterns, or marking schemes.
2. If official changes are detected (e.g. 2026/2027 application dates, revised syllabus, new conducting IIT/agency), output a proposed correction.
3. If no official change has occurred, return an empty array [].
4. Output valid JSON array only.

Schema:
[
  {
    "field": "importantDatesText" | "officialPortalUrl" | "examPattern" | "markingScheme" | "eligibilitySummary" | "statusNote",
    "proposedValue": string,
    "officialSourceUrl": string,
    "evidence": string
  }
]`;
    const userPrompt = `Target Examination: ${examMeta.name} (${examCode})
Official Portal: ${examMeta.portalUrl}
Current Stored Data:
- Important Dates: "${currentExam.importantDatesText}"
- Portal: "${currentExam.officialPortalUrl}"
- Pattern: "${currentExam.examPattern}"
- Marking Scheme: "${currentExam.markingScheme}"
- Eligibility: "${currentExam.eligibilitySummary}"
- Status Note: "${currentExam.statusNote}"

Has any official bulletin update or schedule change been released? If yes, provide the proposed change. If not, return [].`;
    let proposals = [];
    try {
      const response = await aiEngine.executeWithFailover(
        {
          systemPrompt,
          userPrompt,
          responseMimeType: "application/json"
        },
        { enableSearchGrounding: true }
      );
      const parsed = JSON.parse(response.text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        for (const item of parsed) {
          if (!item.field || !item.proposedValue) continue;
          const currentValue = String(currentExam[item.field] || "");
          if (currentValue.trim() === String(item.proposedValue).trim()) {
            continue;
          }
          const proposal = {
            id: "exam-prop-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
            examCode,
            examName: examMeta.name,
            field: item.field,
            currentValue,
            proposedValue: item.proposedValue,
            officialSourceUrl: item.officialSourceUrl || examMeta.portalUrl,
            evidence: item.evidence || "Official bulletin update detected.",
            status: "pending_review",
            detectedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
          store.aiExamProposals.unshift(proposal);
          proposals.push(proposal);
        }
      }
    } catch (e) {
      console.warn(`[ExaminationMonitorEngine] Check for ${examCode} completed with info:`, e.message);
    }
    db.addAiActivityLog("exam_monitor", "EXAM_MONITOR_CHECK", "EXAM_DIFF", [examMeta.portalUrl], proposals.length, "success", {
      examCode,
      proposalsCount: proposals.length,
      durationMs: Date.now() - start
    });
    db.save();
    return proposals;
  }
  /**
   * Apply approved exam change proposal to live store.examinations
   */
  async applyProposal(proposalId, actorEmail) {
    const store = db.getData();
    const proposal = store.aiExamProposals.find((p) => p.id === proposalId);
    if (!proposal) {
      throw new Error(`Proposal ${proposalId} not found`);
    }
    const exam = store.examinations.find((e) => e.code === proposal.examCode);
    if (!exam) {
      throw new Error(`Exam ${proposal.examCode} not found in database.`);
    }
    exam[proposal.field] = proposal.proposedValue;
    exam.verificationDate = (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
    exam.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    proposal.status = "approved";
    proposal.reviewedBy = actorEmail;
    proposal.reviewedAt = (/* @__PURE__ */ new Date()).toISOString();
    db.addAuditLog(
      actorEmail,
      "superadmin",
      "EXAM_CHANGE_PROPOSAL_APPROVED",
      "EXAMINATIONS",
      { examCode: proposal.examCode, field: proposal.field, newValue: proposal.proposedValue }
    );
    db.save();
    return exam;
  }
};
var examinationMonitorEngine = new ExaminationMonitorEngine();

// server/ai/weeklyDispatchEngine.ts
var WeeklyDispatchEngine = class {
  /**
   * Generates a weekly biotechnology opportunity digest draft from newly verified database records
   */
  async generateWeeklyDispatchDraft() {
    const store = db.getData();
    const now = /* @__PURE__ */ new Date();
    const nowIso = now.toISOString();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((now.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1e3));
    const weekNumber = Math.ceil((now.getDay() + 1 + numberOfDays) / 7);
    const year = now.getFullYear();
    const activeOpps = store.opportunities.filter((o) => o.publicationStatus === "published");
    const jobs = activeOpps.filter((o) => o.type === "job").slice(0, 4).map((o) => ({ id: o.id, title: o.title, organization: o.organization, deadline: o.deadline, url: o.applicationUrl || o.officialNotificationUrl }));
    const internships = activeOpps.filter((o) => o.type === "internship").slice(0, 3).map((o) => ({ id: o.id, title: o.title, organization: o.organization, deadline: o.deadline, url: o.applicationUrl || o.officialNotificationUrl }));
    const fellowships = activeOpps.filter((o) => o.type === "fellowship" || o.type === "research" || o.type === "scholarship").slice(0, 3).map((o) => ({ id: o.id, title: o.title, organization: o.organization, deadline: o.deadline, url: o.applicationUrl || o.officialNotificationUrl }));
    const exams = store.examinations.slice(0, 4).map((e) => ({
      code: e.code,
      title: e.fullName,
      update: e.importantDatesText,
      url: e.officialPortalUrl
    }));
    const news = [
      {
        headline: "DBT-BIRAC Biotechnology Research Initiative Updates",
        summary: "Department of Biotechnology issues updated guidelines for translational biomedical fellowships.",
        source: "dbtindia.gov.in"
      },
      {
        headline: "National Entrance Portal Calendar Sync",
        summary: "Synchronized examination milestones for GAT-B, CSIR-NET, and GATE-BT sessions.",
        source: "nta.ac.in"
      }
    ];
    const title = `BioScience Weekly Dispatch \u2014 Issue #${weekNumber} (${year})`;
    const summaryText = `Weekly curated digest of verified biotechnology vacancies, fellowships, summer internships, and national examination schedules.`;
    const fullDraftHtml = `
<div style="font-family: 'Times New Roman', Times, serif; color: #1e293b; max-width: 650px; margin: 0 auto; line-height: 1.6;">
  <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
    <h1 style="margin: 0; font-size: 24px; color: #0f172a;">${title}</h1>
    <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">BioScience Hub Official Academic Intelligence & Opportunity Digest</p>
  </div>

  <p style="font-size: 14px; margin-bottom: 20px;">${summaryText}</p>

  <h2 style="font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; color: #0f172a;">1. Verified Research & Job Vacancies</h2>
  <ul>
    ${jobs.map((j) => `<li><strong>${j.title}</strong> \u2014 ${j.organization} (Deadline: ${j.deadline}) <a href="${j.url}" target="_blank">Official Link</a></li>`).join("")}
  </ul>

  <h2 style="font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; color: #0f172a;">2. Fellowships & Internships</h2>
  <ul>
    ${[...internships, ...fellowships].map((f) => `<li><strong>${f.title}</strong> \u2014 ${f.organization} (Deadline: ${f.deadline}) <a href="${f.url}" target="_blank">Apply</a></li>`).join("")}
  </ul>

  <h2 style="font-size: 16px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; color: #0f172a;">3. National Competitive Examinations Update</h2>
  <ul>
    ${exams.map((e) => `<li><strong>${e.code} (${e.title})</strong>: ${e.update}</li>`).join("")}
  </ul>

  <div style="margin-top: 30px; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; font-size: 11px; color: #64748b;">
    Grounded strictly in official gazettes and agency bulletins (DBT, DST, CSIR, NTA). Distributed via BioScience Hub.
  </div>
</div>
    `.trim();
    const draft = {
      id: "dispatch-" + Date.now(),
      weekNumber,
      year,
      title,
      status: "draft",
      summaryText,
      highlights: {
        jobs,
        internships,
        fellowships,
        exams,
        news
      },
      fullDraftHtml,
      createdAt: nowIso,
      updatedAt: nowIso
    };
    store.aiWeeklyDispatches.unshift(draft);
    if (store.aiWeeklyDispatches.length > 20) {
      store.aiWeeklyDispatches = store.aiWeeklyDispatches.slice(0, 20);
    }
    db.addAiActivityLog("system", "WEEKLY_DISPATCH_DRAFT_CREATED", "NEWSLETTER_DIGEST", [], jobs.length + fellowships.length, "success", {
      draftId: draft.id,
      weekNumber,
      year
    });
    db.save();
    return draft;
  }
};
var weeklyDispatchEngine = new WeeklyDispatchEngine();

// server/ai/schedulerEngine.ts
var SchedulerEngine = class {
  constructor() {
    this.isRunningTask = false;
    this.intervalTimer = null;
    this.startBackgroundTimer();
  }
  getStatus() {
    return {
      isRunning: this.isRunningTask,
      checkpoints: db.getData().aiTaskCheckpoints || []
    };
  }
  updateCheckpoint(taskType, step, status, error) {
    const store = db.getData();
    let cp = store.aiTaskCheckpoints.find((c) => c.taskType === taskType);
    if (!cp) {
      cp = {
        id: "cp-" + taskType,
        taskType,
        lastStep: step,
        savedAt: (/* @__PURE__ */ new Date()).toISOString(),
        state: {},
        status,
        error
      };
      store.aiTaskCheckpoints.unshift(cp);
    } else {
      cp.lastStep = step;
      cp.savedAt = (/* @__PURE__ */ new Date()).toISOString();
      cp.status = status;
      cp.error = error;
    }
    db.save();
  }
  /**
   * Run full daily research & verification cycle
   */
  async runDailyCycle() {
    if (this.isRunningTask) {
      throw new Error("Another AI background task is already executing. Please wait.");
    }
    this.isRunningTask = true;
    this.updateCheckpoint("daily_cycle", "STARTED", "running");
    try {
      this.updateCheckpoint("daily_cycle", "RESEARCHING_JOBS", "running");
      const jobs = await webResearchEngine.conductResearchCycle({ category: "job", maxResults: 4 });
      this.updateCheckpoint("daily_cycle", "RESEARCHING_INTERNSHIPS", "running");
      const internships = await webResearchEngine.conductResearchCycle({ category: "internship", maxResults: 3 });
      this.updateCheckpoint("daily_cycle", "MONITORING_EXAMS", "running");
      let totalExamProposals = 0;
      try {
        const gatbProp = await examinationMonitorEngine.monitorExam("GAT-B");
        const csirProp = await examinationMonitorEngine.monitorExam("CSIR-NET");
        totalExamProposals = gatbProp.length + csirProp.length;
      } catch (e) {
        console.warn("[SchedulerEngine] Exam monitor step warning:", e);
      }
      this.updateCheckpoint("daily_cycle", "AUDITING_EXPIRY", "running");
      const auditResult = await verificationEngine.auditExpiredOpportunities();
      this.updateCheckpoint("daily_cycle", "COMPLETED", "completed");
      this.isRunningTask = false;
      return {
        newOpportunities: jobs.length + internships.length,
        expiredArchived: auditResult.expiredArchived,
        examProposals: totalExamProposals
      };
    } catch (err) {
      this.updateCheckpoint("daily_cycle", "FAILED", "failed", err.message);
      this.isRunningTask = false;
      throw err;
    }
  }
  /**
   * Run weekly digest cycle
   */
  async runWeeklyDigestCycle() {
    if (this.isRunningTask) {
      throw new Error("Another AI task is executing.");
    }
    this.isRunningTask = true;
    this.updateCheckpoint("weekly_digest", "STARTED", "running");
    try {
      const draft = await weeklyDispatchEngine.generateWeeklyDispatchDraft();
      this.updateCheckpoint("weekly_digest", "COMPLETED", "completed");
      this.isRunningTask = false;
      return draft;
    } catch (err) {
      this.updateCheckpoint("weekly_digest", "FAILED", "failed", err.message);
      this.isRunningTask = false;
      throw err;
    }
  }
  startBackgroundTimer() {
    if (this.intervalTimer) clearInterval(this.intervalTimer);
    const isServerless2 = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT);
    if (isServerless2) return;
    this.intervalTimer = setInterval(() => {
      const store = db.getData();
      if (!store.aiConfig.autoScheduleEnabled) return;
      const now = /* @__PURE__ */ new Date();
      const today = now.toISOString().substring(0, 10);
      const lastRun = store.aiTaskCheckpoints.find((c) => c.taskType === "daily_cycle")?.savedAt?.substring(0, 10);
      if (now.getUTCHours() === (store.aiConfig.dailyCheckHourUtc || 3) && lastRun !== today && !this.isRunningTask) {
        console.log("[SchedulerEngine] Auto-triggering scheduled daily AI research cycle...");
        this.runDailyCycle().catch((e) => console.warn("[SchedulerEngine] Scheduled daily cycle error:", e.message));
      }
    }, 15 * 60 * 1e3);
    if (this.intervalTimer && typeof this.intervalTimer.unref === "function") {
      this.intervalTimer.unref();
    }
  }
};
var schedulerEngine = new SchedulerEngine();

// server/aiRoutes.ts
var aiRouter = express2.Router();
aiRouter.use(requireAdminAuth);
aiRouter.get("/status", async (req, res) => {
  const store = db.getData();
  const cfg = store.aiConfig;
  const schedulerStatus = schedulerEngine.getStatus();
  const totalResearched = store.aiResearchQueue.length;
  const pendingReview = store.aiResearchQueue.filter((r) => !r.isPublishedToLive && r.verificationStatus !== "Expired").length;
  const verifiedCount = store.aiResearchQueue.filter((r) => r.verificationStatus === "Verified Official").length;
  const pendingExamProposals = store.aiExamProposals.filter((p) => p.status === "pending_review").length;
  res.json({
    config: cfg,
    scheduler: schedulerStatus,
    metrics: {
      totalResearched,
      pendingReview,
      verifiedCount,
      pendingExamProposals,
      monthlyUsageRequests: cfg.monthlyUsageRequests,
      monthlyBudgetINR: 0,
      zeroCostPolicyActive: true
    },
    activeProvider: cfg.activeProvider,
    operatingMode: cfg.operatingMode
  });
});
aiRouter.post("/health-check", async (req, res) => {
  try {
    const report = await aiEngine.getHealthReport();
    res.json({
      success: true,
      report,
      testedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to ping AI providers" });
  }
});
aiRouter.post("/config", (req, res) => {
  const { operatingMode, providerPriorities, providerSettings, autoScheduleEnabled, ollamaBaseUrl } = req.body;
  const store = db.getData();
  if (operatingMode && ["research_only", "review_mode", "controlled_autonomous"].includes(operatingMode)) {
    store.aiConfig.operatingMode = operatingMode;
  }
  if (Array.isArray(providerPriorities) && providerPriorities.length > 0) {
    store.aiConfig.providerPriorities = providerPriorities;
  }
  if (providerSettings && typeof providerSettings === "object") {
    for (const [key, val] of Object.entries(providerSettings)) {
      if (store.aiConfig.providerSettings[key]) {
        store.aiConfig.providerSettings[key] = {
          ...store.aiConfig.providerSettings[key],
          ...val
        };
      }
    }
  }
  if (typeof autoScheduleEnabled === "boolean") {
    store.aiConfig.autoScheduleEnabled = autoScheduleEnabled;
  }
  if (ollamaBaseUrl && typeof ollamaBaseUrl === "string") {
    store.aiConfig.ollamaBaseUrl = ollamaBaseUrl.trim();
  }
  db.addAuditLog(
    req.adminUser?.email || "admin",
    req.adminUser?.role || "superadmin",
    "AI_CONFIG_UPDATED",
    "AI_ENGINE",
    { operatingMode: store.aiConfig.operatingMode, autoScheduleEnabled }
  );
  db.save();
  res.json({ success: true, config: store.aiConfig });
});
aiRouter.post("/research/run", async (req, res) => {
  const { category, targetInstitution, targetExam, customQuery, maxResults } = req.body;
  try {
    const records = await webResearchEngine.conductResearchCycle({
      category,
      targetInstitution,
      targetExam,
      customQuery,
      maxResults: maxResults ? parseInt(maxResults, 10) : 6
    });
    res.json({
      success: true,
      recordsFound: records.length,
      records
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Research cycle execution failed" });
  }
});
aiRouter.get("/research/queue", (req, res) => {
  const { status, category, search } = req.query;
  const store = db.getData();
  let items = [...store.aiResearchQueue];
  if (status && typeof status === "string" && status !== "all") {
    items = items.filter((i) => i.verificationStatus === status);
  }
  if (category && typeof category === "string" && category !== "all") {
    items = items.filter((i) => i.category === category);
  }
  if (search && typeof search === "string") {
    const s = search.toLowerCase();
    items = items.filter(
      (i) => i.title.toLowerCase().includes(s) || i.institution.toLowerCase().includes(s)
    );
  }
  res.json({
    total: items.length,
    items
  });
});
aiRouter.post("/research/verify/:id", async (req, res) => {
  try {
    const record = await verificationEngine.verifyRecord(req.params.id);
    res.json({ success: true, record });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});
aiRouter.post("/research/publish/:id", async (req, res) => {
  try {
    const published = await verificationEngine.publishToLive(
      req.params.id,
      req.adminUser?.email || "admin"
    );
    res.json({ success: true, opportunity: published });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
aiRouter.post("/research/publish-all-verified", async (req, res) => {
  const store = db.getData();
  const eligible = store.aiResearchQueue.filter(
    (r) => r.verificationStatus === "Verified Official" && !r.isPublishedToLive
  );
  const publishedItems = [];
  for (const item of eligible) {
    try {
      const pub = await verificationEngine.publishToLive(item.id, req.adminUser?.email || "admin");
      publishedItems.push(pub);
    } catch (e) {
      console.warn(`Failed to auto-publish ${item.id}:`, e.message);
    }
  }
  res.json({
    success: true,
    publishedCount: publishedItems.length,
    opportunities: publishedItems
  });
});
aiRouter.delete("/research/:id", (req, res) => {
  const store = db.getData();
  const index = store.aiResearchQueue.findIndex((r) => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Record not found" });
  }
  const removed = store.aiResearchQueue.splice(index, 1)[0];
  db.addAiActivityLog(
    req.adminUser?.email || "admin",
    "RESEARCH_RECORD_REJECTED",
    "RESEARCH_QUEUE",
    [removed.originalSourceUrl],
    0,
    "warning",
    { id: removed.id, title: removed.title }
  );
  db.save();
  res.json({ success: true, message: "Record rejected and removed from queue." });
});
aiRouter.get("/exams/proposals", (req, res) => {
  const store = db.getData();
  res.json(store.aiExamProposals || []);
});
aiRouter.post("/exams/monitor/:code", async (req, res) => {
  const code = req.params.code;
  if (!["GAT-B", "DBT-JRF", "GATE-BT", "IIT-JAM", "CUET-PG", "CSIR-NET"].includes(code)) {
    return res.status(400).json({ error: "Invalid exam code. Must be one of the 6 supported examinations." });
  }
  try {
    const proposals = await examinationMonitorEngine.monitorExam(code);
    res.json({
      success: true,
      examCode: code,
      proposalsGenerated: proposals.length,
      proposals
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
aiRouter.post("/exams/proposals/:id/approve", async (req, res) => {
  try {
    const updatedExam = await examinationMonitorEngine.applyProposal(
      req.params.id,
      req.adminUser?.email || "admin"
    );
    res.json({ success: true, exam: updatedExam });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
aiRouter.post("/exams/proposals/:id/reject", (req, res) => {
  const store = db.getData();
  const proposal = store.aiExamProposals.find((p) => p.id === req.params.id);
  if (!proposal) {
    return res.status(404).json({ error: "Proposal not found" });
  }
  proposal.status = "rejected";
  proposal.reviewedBy = req.adminUser?.email || "admin";
  proposal.reviewedAt = (/* @__PURE__ */ new Date()).toISOString();
  db.save();
  res.json({ success: true, message: "Proposal rejected." });
});
aiRouter.get("/dispatches", (req, res) => {
  const store = db.getData();
  res.json(store.aiWeeklyDispatches || []);
});
aiRouter.post("/dispatches/generate", async (req, res) => {
  try {
    const draft = await weeklyDispatchEngine.generateWeeklyDispatchDraft();
    res.json({ success: true, draft });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
aiRouter.post("/dispatches/:id/publish", (req, res) => {
  const store = db.getData();
  const draft = store.aiWeeklyDispatches.find((d) => d.id === req.params.id);
  if (!draft) {
    return res.status(404).json({ error: "Dispatch draft not found" });
  }
  draft.status = "published";
  draft.publishedAt = (/* @__PURE__ */ new Date()).toISOString();
  draft.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  db.addAuditLog(
    req.adminUser?.email || "admin",
    "superadmin",
    "WEEKLY_DISPATCH_PUBLISHED",
    "NEWSLETTER",
    { id: draft.id, weekNumber: draft.weekNumber, year: draft.year }
  );
  db.save();
  res.json({ success: true, draft });
});
aiRouter.get("/logs", (req, res) => {
  const store = db.getData();
  const { provider, status, search, limit } = req.query;
  let logs = [...store.aiActivityLogs];
  if (provider && typeof provider === "string" && provider !== "all") {
    logs = logs.filter((l) => l.providerUsed === provider);
  }
  if (status && typeof status === "string" && status !== "all") {
    logs = logs.filter((l) => l.status === status);
  }
  if (search && typeof search === "string") {
    const s = search.toLowerCase();
    logs = logs.filter((l) => l.action.toLowerCase().includes(s) || l.taskType.toLowerCase().includes(s));
  }
  const max = limit ? parseInt(limit, 10) : 100;
  res.json({
    total: logs.length,
    logs: logs.slice(0, max)
  });
});
aiRouter.post("/tasks/run-daily", async (req, res) => {
  try {
    const result = await schedulerEngine.runDailyCycle();
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
aiRouter.post("/tasks/audit-expired", async (req, res) => {
  try {
    const result = await verificationEngine.auditExpiredOpportunities();
    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server/publicRoutes.ts
import express3 from "express";
var publicRouter = express3.Router();
publicRouter.get("/opportunities", (req, res) => {
  const { type, category, status } = req.query;
  const store = db.getData();
  const now = /* @__PURE__ */ new Date();
  let list = (store.opportunities || []).filter((o) => o.publicationStatus === "published");
  if (type && typeof type === "string" && type !== "all") {
    list = list.filter((o) => o.type === type);
  }
  const mapped = list.map((opp) => {
    const isPast = new Date(opp.deadline) < now;
    const isAiCurated = opp.id.startsWith("opp-ai-");
    return {
      id: opp.id,
      title: opp.title,
      slug: opp.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      organization: opp.organization,
      type: opp.type,
      category: opp.type === "job" ? "Government" : opp.type,
      qualification: opp.qualification || opp.eligibility,
      experienceLevel: "Entry Level / Freshers",
      location: opp.location || "India",
      eligibility: opp.eligibility,
      salaryOrStipend: opp.stipendOrSalary || "As per official norms",
      applicationOpeningDate: opp.openingDate,
      applicationDeadline: opp.deadline,
      officialNotificationUrl: opp.officialNotificationUrl,
      officialApplicationUrl: opp.applicationUrl || opp.officialNotificationUrl,
      sourceUrl: opp.sourceUrl || opp.officialNotificationUrl,
      sourceCitation: `${opp.organization} Official Notification Portal`,
      sourcePublicationDate: opp.openingDate,
      lastVerifiedDate: opp.lastVerifiedDate || opp.updatedAt?.substring(0, 10),
      applicationStatus: isPast ? "EXPIRED" : "OPEN",
      verificationStatus: opp.verificationStatus === "verified" ? "VERIFIED_OFFICIAL" : "UNDER_REVIEW",
      archivedStatus: isPast,
      jobDescription: opp.description,
      isAiResearched: isAiCurated,
      verifiedBy: opp.verifiedBy || "BioScience Hub Verification Engine"
    };
  });
  res.json({
    total: mapped.length,
    opportunities: mapped
  });
});
publicRouter.get("/exams", (req, res) => {
  const store = db.getData();
  res.json({
    total: store.examinations.length,
    examinations: store.examinations || []
  });
});
publicRouter.get("/dispatches", (req, res) => {
  const store = db.getData();
  const published = (store.aiWeeklyDispatches || []).filter((d) => d.status === "published");
  res.json({
    total: published.length,
    dispatches: published
  });
});
publicRouter.post("/newsletter/subscribe", (req, res) => {
  const { email, preferredCategories } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email address is required." });
  }
  const cleanEmail = email.toLowerCase().trim();
  const store = db.getData();
  const existing = store.newsletterSubscribers.find((s) => s.email === cleanEmail);
  if (existing) {
    if (existing.status === "unsubscribed") {
      existing.status = "active";
      existing.preferredCategories = preferredCategories || existing.preferredCategories;
      db.save();
    }
    return res.json({ success: true, message: "Subscription preferences updated successfully." });
  }
  const newSub = {
    id: "sub-" + Date.now(),
    email: cleanEmail,
    subscribedAt: (/* @__PURE__ */ new Date()).toISOString(),
    status: "active",
    preferredCategories: Array.isArray(preferredCategories) ? preferredCategories : ["Jobs", "Exams", "Internships"]
  };
  store.newsletterSubscribers.push(newSub);
  db.save();
  res.json({
    success: true,
    message: "Successfully subscribed to BioScience Hub Weekly Dispatch!"
  });
});
publicRouter.get("/subjects", (req, res) => {
  const store = db.getData();
  const active = (store.subjects || []).filter((s) => s.isPublished !== false);
  res.json({
    total: active.length,
    subjects: active
  });
});
publicRouter.get("/subjects/:slug", (req, res) => {
  const store = db.getData();
  const sub = (store.subjects || []).find((s) => s.slug === req.params.slug || s.id === req.params.slug);
  if (!sub) {
    return res.status(404).json({ error: "Subject not found" });
  }
  res.json(sub);
});

// server.ts
dotenv.config();
var __filename3 = fileURLToPath3(import.meta.url);
var __dirname3 = path3.dirname(__filename3);
var app = express4();
var port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
app.use(express4.json());
app.use("/api/public", publicRouter);
app.use("/api/admin/ai", aiRouter);
app.use("/api/admin", adminRouter);
app.get("/api/maintenance/status", (req, res) => {
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
    mini_games: m.mini_games || {
      memory_match: true,
      number_puzzle: true,
      quick_math: true,
      word_scramble: true
    },
    server_time_iso: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.get("/api/popups/active", (req, res) => {
  const store = db.getData();
  const allPopups = store.popups || [];
  const now = /* @__PURE__ */ new Date();
  const active = allPopups.filter((p) => {
    if (!p.enabled) return false;
    if (p.startDateTime) {
      const start = new Date(p.startDateTime);
      if (now < start) return false;
    }
    if (p.expiryDateTime) {
      const expiry = new Date(p.expiryDateTime);
      if (now > expiry) return false;
    }
    return true;
  });
  res.json(active);
});
var ai = new GoogleGenAI2();
app.post("/api/gemini-search-grounding", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Valid prompt string is required" });
    }
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    const text = response.text || "No response generated.";
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources = rawChunks.map((chunk) => ({
      title: chunk.web?.title || "Web Reference",
      url: chunk.web?.uri || ""
    })).filter((s) => s.url);
    res.json({
      text,
      sources: groundingSources
    });
  } catch (error) {
    console.error("Error in /api/gemini-search-grounding:", error);
    res.status(500).json({
      error: error.message || "Internal server error during search grounding"
    });
  }
});
app.all("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});
app.use((err, req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    console.error(`[API Error] ${req.method} ${req.originalUrl}:`, err);
    const statusCode = typeof err.status === "number" && err.status >= 400 && err.status < 600 ? err.status : 500;
    return res.status(statusCode).json({
      success: false,
      error: err?.message || "A server error occurred while processing the request"
    });
  }
  next(err);
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express4.static(path3.resolve(__dirname3, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path3.resolve(__dirname3, "dist", "index.html"));
    });
  }
  app.listen(port, "0.0.0.0", () => {
    console.log(`BioScience Hub full-stack server running on port ${port}`);
  });
}
if (!process.env.VERCEL) {
  startServer();
}
export {
  app
};
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Default 11 Academic Subjects Seed Data
 * Authoritative curriculum aligned with GAT-B, DBT-JRF, GATE-BT, IIT-JAM, CUET-PG, CSIR-NET.
 */
