import { TopicDetail } from '../types/index.ts';

export interface MultiLevelTopicData {
  slug: string;
  subjectSlug: string;
  title: {
    en: string;
    hinglish: string;
  };
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTimeMin: number;
  basicLevel: {
    overview: { en: string; hinglish: string };
    analogy: { en: string; hinglish: string };
    corePrinciples: { en: string; hinglish: string }[];
    basicVocabulary: { term: string; en: string; hinglish: string }[];
  };
  intermediateLevel: {
    biochemicalMechanism: { en: string; hinglish: string }[];
    reactionSteps: { step: number; title: string; en: string; hinglish: string }[];
    laboratoryTechniques: { en: string; hinglish: string }[];
    stoichiometryAndCofactors: { en: string; hinglish: string }[];
  };
  advancedLevel: {
    biophysicalThermodynamics: { en: string; hinglish: string };
    mathematicalEquations: { name: string; formula: string; description: string }[];
    modernInVivoRealities: { en: string; hinglish: string }[];
    examPitfallsAndTraps: { exam: string; pitfall: string; correction: string }[];
    scienceDatabases: {
      pdbId?: string;
      pdbTitle?: string;
      alphaFoldUniProt?: string;
      alphaFoldProtein?: string;
      pubchemCid?: number;
      pubchemName?: string;
      uniprotId?: string;
    };
  };
  practiceQuestions: {
    question: { en: string; hinglish: string };
    options: string[];
    correctIndex: number;
    explanation: { en: string; hinglish: string };
    examSource: string;
  }[];
  references: {
    citation: string;
    doiOrLink?: string;
    type: 'Textbook' | 'Nobel Lecture' | 'Research Paper' | 'Official Guideline';
  }[];
}

// Master topic database covering core themes across subjects
export const TOPICS_COMPREHENSIVE_KNOWLEDGE: Record<string, MultiLevelTopicData> = {
  // CELL BIOLOGY
  'membrane-structure-and-transport': {
    slug: 'membrane-structure-and-transport',
    subjectSlug: 'cell-biology',
    title: {
      en: 'Biomembrane Fluidity, Lipid Rafts, and Transmembrane Transport Kinetics',
      hinglish: 'Cell Membrane Structure: Fluid Mosaic Model, Lipid Rafts aur Transport',
    },
    difficulty: 'Intermediate',
    readTimeMin: 14,
    basicLevel: {
      overview: {
        en: 'Every living cell is enveloped by a dynamic phospholipid bilayer approximately 4-5 nm thick. First modeled by Singer and Nicolson in 1972 as the Fluid Mosaic Model, proteins float within a fluid lipid sea, regulating selective permeability between the cytoplasm and the extracellular environment.',
        hinglish: 'Har cell ek dynamic phospholipid bilayer se enveloped hoti hai (4-5 nm thick). 1972 me Singer aur Nicolson ne Fluid Mosaic Model diya jisme bataya gaya ki proteins lipid ke fluid sea me float karte hain aur selective transport regulate karte hain.',
      },
      analogy: {
        en: 'Think of the plasma membrane as an international border with selective passport checkpoints. Lipids form the border fence, while transport proteins act as specialized gates that open only for authorized molecules.',
        hinglish: 'Cell membrane ko ek international border samjhein jahan lipid layer boundary wall hai aur transport proteins specialized gates hain jo specific molecules ko hi pass hone dete hain.',
      },
      corePrinciples: [
        {
          en: 'Amphipathic nature: Phospholipids possess polar hydrophilic heads (facing water) and hydrophobic fatty acyl tails (tucked inside).',
          hinglish: 'Amphipathic property: Hydrophilic head bahar water ki taraf aur hydrophobic tails andar facing rehti hain.',
        },
        {
          en: 'Selective permeability: Small nonpolar molecules (O2, CO2) diffuse freely, whereas charged ions (Na+, K+) and large polar molecules (glucose) require specialized transport proteins.',
          hinglish: 'Selective permeability: Gases freely cross karti hain lekin ions aur glucose ko protein channels ki zaroorat hoti hai.',
        },
      ],
      basicVocabulary: [
        {
          term: 'Phospholipid Bilayer',
          en: 'Double layer of amphipathic lipid molecules forming the primary structural barrier of cells.',
          hinglish: 'Lipids ki do layers jo cell ka primary physical barrier banati hain.',
        },
        {
          term: 'Lipid Rafts',
          en: 'Microdomains enriched in cholesterol, sphingolipids, and GPI-anchored proteins organizing cell signaling complexes.',
          hinglish: 'Membrane ke specific microdomains jisme cholesterol aur sphingolipids zyada hote hain aur signaling help karte hain.',
        },
      ],
    },
    intermediateLevel: {
      biochemicalMechanism: [
        {
          en: 'Membrane Fluidity Regulation: Modulated by fatty acid unsaturation (cis-double bonds introduce kinks preventing tight packing) and cholesterol (acts as a bidirectional fluidity buffer: restricts fluidity at 37°C, prevents crystallization at low temperatures).',
          hinglish: 'Fluidity Control: Cis double bonds fatty acids me kinks banate hain jisse membrane fluid rehti hai; cholesterol temperature buffer ka kaam karta hai.',
        },
        {
          en: 'Primary Active Transport: Hydrolyzes ATP directly (e.g. Na+/K+-ATPase pumps 3 Na+ out and 2 K+ in per ATP, establishing the resting membrane potential).',
          hinglish: 'Primary Active Transport: Directly ATP use karke concentration gradient ke against ions pump karta hai (3 Na+ out, 2 K+ in).',
        },
        {
          en: 'Secondary Active Transport: Uses energy stored in electrochemical gradients (e.g. Na+-Glucose symporter SGLT1 in intestinal epithelia driven by the Na+ gradient).',
          hinglish: 'Secondary Active Transport: Na+ concentration gradient ki energy use karke glucose ko transport karta hai bina direct ATP tode.',
        },
      ],
      reactionSteps: [
        {
          step: 1,
          title: 'Intracellular 3 Na+ Binding',
          en: 'Na+/K+-ATPase in E1 conformation binds three intracellular Na+ ions with high affinity.',
          hinglish: 'E1 state me pump cell ke andar se 3 Na+ ions bind karta hai.',
        },
        {
          step: 2,
          title: 'ATP Phosphorylation',
          en: 'Enzyme transfers gamma-phosphate from ATP to an invariant Aspartate residue (Asp376), forming a high-energy phosphoenzyme intermediate.',
          hinglish: 'ATP se phosphate Aspartate amino acid par transfer hota hai.',
        },
        {
          step: 3,
          title: 'Conformational Shift (E1 -> E2)',
          en: 'Phosphorylation drives conformational transition from E1 to E2, opening the channel to the extracellular side and releasing 3 Na+ ions.',
          hinglish: 'E1 se E2 shape change hoti hai aur 3 Na+ bahar release hote hain.',
        },
        {
          step: 4,
          title: 'Extracellular 2 K+ Binding & Dephosphorylation',
          en: 'Two extracellular K+ ions bind; spontaneous dephosphorylation triggers return to E1 state, discharging 2 K+ into the cytosol.',
          hinglish: '2 K+ bind karte hain aur phosphate release hokar pump wapas E1 me aakar K+ release karta hai.',
        },
      ],
      laboratoryTechniques: [
        {
          en: 'Fluorescence Recovery After Photobleaching (FRAP): Measures lateral mobility coefficient (D) of GFP-tagged membrane proteins in living cells.',
          hinglish: 'FRAP experiment: Laser se fluorophore photobleach karke membrane protein ki movement speed measure karte hain.',
        },
        {
          en: 'Patch-Clamp Electrophysiology: Resolves pico-ampere single-ion channel opening and closing events in real time.',
          hinglish: 'Patch Clamp: Single ion channel ke electric current ko microsecond level par record karta hai.',
        },
      ],
      stoichiometryAndCofactors: [
        {
          en: 'Stoichiometry of Na+/K+ Pump: 3 Na+(in) + 2 K+(out) + 1 ATP -> 3 Na+(out) + 2 K+(in) + 1 ADP + 1 Pi (Net: -1 charge transported outward).',
          hinglish: 'Net: 1 positive charge bahar jaata hai, making cell interior electro-negative.',
        },
        {
          en: 'Cofactor Requirement: Absolute requirement for Mg2+ to coordinate ATP phosphate hydrolysis.',
          hinglish: 'Mg2+ ion zaroori hota hai ATP coordinate karne ke liye.',
        },
      ],
    },
    advancedLevel: {
      biophysicalThermodynamics: {
        en: 'The free energy change for uncharged solute transport is given by ΔG = RT ln([C_in] / [C_out]). For charged ions, electrical potential contributes: ΔG = RT ln([C_in] / [C_out]) + zF ΔΨ. Equilibrium occurs when ΔG = 0, deriving the Nernst Equation: E = (RT / zF) ln([Ion_out] / [Ion_in]).',
        hinglish: 'Charged ions ke transport me chemical gradient aur electrical potential dono combine hokar Electrochemical Potential banate hain. Equilibrium par Nernst Equation apply hoti hai: E = (RT/zF) ln([out]/[in]).',
      },
      mathematicalEquations: [
        {
          name: 'Nernst Equation',
          formula: 'E = (RT / zF) * ln([Ion]_out / [Ion]_in)',
          description: 'Calculates the equilibrium reversal potential across an ion-selective biological membrane.',
        },
        {
          name: 'Goldman-Hodgkin-Katz (GHK) Voltage Equation',
          formula: 'Vm = (RT / F) * ln( (P_K[K+]o + P_Na[Na+]o + P_Cl[Cl-]i) / (P_K[K+]i + P_Na[Na+]i + P_Cl[Cl-]o) )',
          description: 'Determines steady-state resting membrane potential accounting for relative ion permeabilities (P_K, P_Na, P_Cl).',
        },
      ],
      modernInVivoRealities: [
        {
          en: 'Membrane Asymmetry: Outer leaflet is enriched in Phosphatidylcholine and Sphingomyelin; inner leaflet is rich in Phosphatidylethanolamine and Phosphatidylserine. Loss of asymmetry (Phosphatidylserine exposure on outer surface) is an apoptosis signal recognized by Annexin V.',
          hinglish: 'Phosphatidylserine normal cell me inner side rehta hai; jab cell apoptotic hoti hai toh bahar expose hota hai jise Annexin V detect karta hai.',
        },
        {
          en: 'Lipid Droplet Biogenesis: Occurs via oil lens nucleation between the leaflets of the Endoplasmic Reticulum membrane catalyzed by seipin and GPAT enzymes.',
          hinglish: 'Lipid droplets ER membrane ke beech neutral lipids accumulate hone se bud off hote hain.',
        },
      ],
      examPitfallsAndTraps: [
        {
          exam: 'CSIR-NET Life Sciences',
          pitfall: 'Assuming Ouabain inhibits the Na+/K+ pump from the intracellular face.',
          correction: 'Ouabain and digitalis bind strictly to the EXTRACELLULAR face of the alpha subunit in the E2-P conformation.',
        },
        {
          exam: 'GATE Biotechnology',
          pitfall: 'Confusing Chloride direction in GHK equation numerator vs denominator.',
          correction: 'Because Chloride is an anion (z = -1), its concentrations are inverted ([Cl-]internal in numerator, [Cl-]external in denominator).',
        },
      ],
      scienceDatabases: {
        pdbId: '1SU4',
        pdbTitle: 'Ca2+-ATPase (SERCA1a) in E1 conformation with two bound calcium ions',
        alphaFoldUniProt: 'P05023',
        alphaFoldProtein: 'Sodium/potassium-transporting ATPase subunit alpha-1',
        pubchemCid: 439501,
        pubchemName: 'Ouabain (Cardiac Glycoside Inhibitor)',
        uniprotId: 'P05023',
      },
    },
    practiceQuestions: [
      {
        question: {
          en: 'Which of the following phospholipids is predominantly localized to the inner (cytoplasmic) leaflet of healthy eukaryotic plasma membranes and triggers phagocytosis when exposed on the outer leaflet?',
          hinglish: 'Healthy eukaryotic cell me kaun sa phospholipid inner leaflet me rehta hai aur outer leaflet pe aane par apoptosis/phagocytosis trigger karta hai?',
        },
        options: [
          'Phosphatidylcholine',
          'Phosphatidylserine',
          'Sphingomyelin',
          'Phosphatidylinositol'
        ],
        correctIndex: 1,
        explanation: {
          en: 'Phosphatidylserine (PS) carries a net negative charge and is restricted to the inner leaflet by ATP-dependent flippases. During apoptosis, scramblases expose PS on the outer surface as an "eat-me" signal for macrophages.',
          hinglish: 'Phosphatidylserine (PS) healthy cell me inner leaflet me rehta hai. Apoptosis me ye bahar aa jata hai aur macrophage phagocytosis trigger karta hai.',
        },
        examSource: 'CSIR-NET Life Sciences Part B',
      },
      {
        question: {
          en: 'If a mammalian neuron has [K+]in = 140 mM and [K+]out = 4 mM at 37°C (where 2.303 RT/F = 61.5 mV), what is the potassium equilibrium potential EK?',
          hinglish: 'Mammalian neuron me [K+]in = 140 mM aur [K+]out = 4 mM hai at 37°C. Potassium equilibrium potential EK kitna hoga?',
        },
        options: [
          '+61.5 mV',
          '-94.9 mV',
          '-70.0 mV',
          '-120.4 mV'
        ],
        correctIndex: 1,
        explanation: {
          en: 'EK = 61.5 * log10(4 / 140) = 61.5 * log10(0.02857) = 61.5 * (-1.544) ≈ -94.9 mV.',
          hinglish: 'Nernst equation formula: EK = 61.5 * log10([K+]out / [K+]in) = 61.5 * log10(4/140) = -94.9 mV.',
        },
        examSource: 'GATE Biotechnology',
      },
    ],
    references: [
      {
        citation: 'Singer S.J. & Nicolson G.L. The Fluid Mosaic Model of the Structure of Cell Membranes. Science 175(4023), 1972.',
        doiOrLink: 'https://doi.org/10.1126/science.175.4023.720',
        type: 'Research Paper',
      },
      {
        citation: 'Lodish H. et al. Molecular Cell Biology. 9th Edition, W. H. Freeman, 2021.',
        type: 'Textbook',
      },
    ],
  },

  // BIOCHEMISTRY
  'enzyme-kinetics-and-inhibition': {
    slug: 'enzyme-kinetics-and-inhibition',
    subjectSlug: 'biochemistry',
    title: {
      en: 'Enzyme Kinetics: Michaelis-Menten Steady-State, Allostery, and Inhibition Dynamics',
      hinglish: 'Enzyme Kinetics: Michaelis-Menten Equation, Lineweaver-Burk, aur Inhibition',
    },
    difficulty: 'Intermediate',
    readTimeMin: 15,
    basicLevel: {
      overview: {
        en: 'Enzymes are biological catalysts that dramatically accelerate biochemical reactions (by factors of 10^6 to 10^17) by lowering the activation energy (ΔG‡) without altering the overall thermodynamic equilibrium (ΔG°).',
        hinglish: 'Enzymes biological catalysts hain jo chemical reactions ki speed millions of times badha dete hain. Ye reaction ki activation energy (ΔG‡) kam karte hain, lekin overall equilibrium (ΔG°) ko change nahi karte.',
      },
      analogy: {
        en: 'Think of activation energy as a steep mountain pass. An enzyme does not move the cities (substrates and products), but carves a low-altitude tunnel through the mountain so travelers cross millions of times faster.',
        hinglish: 'Enzyme ko ek tunnel samajhein: substrate aur product ke beech pahad jaisi barrier (activation energy) hoti hai. Enzyme tunnel bana kar rasta aasan kar deta hai.',
      },
      corePrinciples: [
        {
          en: 'Active site specificity: Formed by tertiary folding, active sites bind substrates via weak non-covalent interactions (hydrogen bonds, ionic bonds, hydrophobic fit).',
          hinglish: 'Active site specificity: Substrate active site me lock-and-key ya induced fit model se bind hota hai.',
        },
        {
          en: 'Substrate Saturation: At low [S], velocity is first-order; at high [S], the enzyme becomes saturated and velocity approaches a constant maximum (Vmax, zero-order).',
          hinglish: 'Low substrate par speed substrate concentration ke proportional hoti hai, high substrate par enzyme saturate hokar Vmax reach karta hai.',
        },
      ],
      basicVocabulary: [
        {
          term: 'Km (Michaelis Constant)',
          en: 'Substrate concentration at which reaction velocity is half of Vmax (Km = [S] at v0 = Vmax / 2). Reflects substrate affinity.',
          hinglish: 'Wo substrate concentration jahan reaction speed Vmax ki aadhi (Vmax/2) hoti hai. Km low matlab affinity high.',
        },
        {
          term: 'kcat (Turnover Number)',
          en: 'The number of substrate molecules converted to product per enzyme active site per unit time (kcat = Vmax / [E]total).',
          hinglish: 'Ek enzyme molecule ek second me kitne substrate molecules ko product me convert karta hai.',
        },
      ],
    },
    intermediateLevel: {
      biochemicalMechanism: [
        {
          en: 'Briggs-Haldane Steady-State Assumption: Assumes the concentration of enzyme-substrate complex [ES] remains constant over the initial measurement period: d[ES]/dt = 0.',
          hinglish: 'Steady-State Assumption: Reaction ke initial stage me [ES] complex banne aur tootne ki speed barabar rehti hai (d[ES]/dt = 0).',
        },
        {
          en: 'Competitive Inhibition: Inhibitor binds exclusively to free enzyme (E) at the active site, competing directly with substrate. Km increases (Km,app = Km * (1 + [I]/Ki)), while Vmax remains unchanged.',
          hinglish: 'Competitive: Inhibitor active site pe bind karta hai. Km badhta hai, Vmax same rehta hai.',
        },
        {
          en: 'Non-Competitive Inhibition: Inhibitor binds equally to free enzyme (E) and enzyme-substrate complex (ES) at an allosteric site. Vmax decreases, while Km remains unchanged.',
          hinglish: 'Non-Competitive: Inhibitor allosteric site pe bind karta hai chahe substrate ho ya na ho. Vmax kam hota hai, Km same rehta hai.',
        },
        {
          en: 'Uncompetitive Inhibition: Inhibitor binds ONLY to the pre-formed enzyme-substrate complex (ES). Both Vmax and Km decrease by the exact same factor alpha.',
          hinglish: 'Uncompetitive: Inhibitor sirf [ES] complex se bind karta hai. Lineweaver-Burk me parallel lines aati hain (dono Km aur Vmax decrease).',
        },
      ],
      reactionSteps: [
        {
          step: 1,
          title: 'Binding',
          en: 'E + S <-> ES (with forward rate k1 and reverse rate k-1).',
          hinglish: 'Enzyme aur substrate bind karke ES complex banate hain.',
        },
        {
          step: 2,
          title: 'Catalysis',
          en: 'ES -> E + P (with catalytic rate k2 or kcat).',
          hinglish: 'ES complex transition state cross karke product aur free enzyme banata hai.',
        },
      ],
      laboratoryTechniques: [
        {
          en: 'Continuous Spectrophotometric Assay: Measures NADH oxidation at 340 nm or p-nitrophenol generation at 405 nm.',
          hinglish: 'Spectrophotometer se product formation ka absorbance vs time slope nikal kar initial velocity v0 calculate karte hain.',
        },
        {
          en: 'Isothermal Titration Calorimetry (ITC): Measures binding enthalpy (ΔH) and dissociation constant (Kd) directly without fluorescent labeling.',
          hinglish: 'ITC se inhibitor binding ki heat release measure karke exact binding affinity nikali jaati hai.',
        },
      ],
      stoichiometryAndCofactors: [
        {
          en: 'Catalytic Efficiency: Defined by the ratio kcat / Km. The upper theoretical ceiling is dictated by aqueous diffusion limits (~10^8 to 10^9 M^-1 s^-1, "catalytic perfection").',
          hinglish: 'Catalytic efficiency = kcat / Km. Upper diffusion limit 10^8 - 10^9 M^-1 s^-1 hoti hai (jaise Carbonic Anhydrase aur Catalase).',
        },
      ],
    },
    advancedLevel: {
      biophysicalThermodynamics: {
        en: 'Transition State Theory (Eyring equation): The catalytic rate constant relates exponentially to activation free energy: kcat = (kB * T / h) * exp(-ΔG‡ / RT). A reduction of just 5.7 kJ/mol in ΔG‡ yields a 10-fold acceleration in reaction rate at 298 K.',
        hinglish: 'Eyring equation se prove hota hai ki ΔG‡ me thoda sa reduction reaction speed ko exponentially increase kar deta hai.',
      },
      mathematicalEquations: [
        {
          name: 'Michaelis-Menten Equation',
          formula: 'v0 = (Vmax * [S]) / (Km + [S])',
          description: 'Fundamental steady-state hyperbolic rate law for unireactant enzyme systems.',
        },
        {
          name: 'Lineweaver-Burk Double Reciprocal Plot',
          formula: '1 / v0 = (Km / Vmax) * (1 / [S]) + (1 / Vmax)',
          description: 'Linear transformation where y-intercept = 1/Vmax, x-intercept = -1/Km, and slope = Km/Vmax.',
        },
        {
          name: 'Hanes-Woolf Transformation',
          formula: '[S] / v0 = (1 / Vmax) * [S] + (Km / Vmax)',
          description: 'Linear kinetic plot with superior statistical error distribution compared to Lineweaver-Burk.',
        },
      ],
      modernInVivoRealities: [
        {
          en: 'Macromolecular Crowding: Living cytoplasm contains 300-400 mg/mL macromolecules. In vivo enzyme kinetics deviate from dilute in vitro cuvettes due to excluded volume effects accelerating association rates.',
          hinglish: 'Living cell ke cytoplasm me 300 mg/mL proteins hote hain jisse crowding hoti hai aur in vivo kinetics dilute cuvette se differ karti hai.',
        },
      ],
      examPitfallsAndTraps: [
        {
          exam: 'GAT-B / IIT-JAM',
          pitfall: 'Thinking an uncompetitive inhibitor decreases enzyme affinity because Km decreases.',
          correction: 'A lower apparent Km mathematically represents HIGHER apparent binding affinity because the inhibitor pulls the E + S <=> ES equilibrium to the right (Le Chatelier principle).',
        },
        {
          exam: 'GATE Biotechnology',
          pitfall: 'Failing to identify parallel lines on a Lineweaver-Burk plot as uncompetitive inhibition.',
          correction: 'Parallel lines indicate slope (Km/Vmax) is constant because Km and Vmax are decreased by the identical factor alpha.',
        },
      ],
      scienceDatabases: {
        pdbId: '1AO6',
        pdbTitle: 'Taq DNA Polymerase complexed with DNA template-primer',
        alphaFoldUniProt: 'P00720',
        alphaFoldProtein: 'DNA Polymerase I (Escherichia coli)',
        pubchemCid: 5957,
        pubchemName: 'Adenosine Triphosphate (ATP)',
        uniprotId: 'P00720',
      },
    },
    practiceQuestions: [
      {
        question: {
          en: 'In a Lineweaver-Burk plot, addition of an unknown inhibitor results in an increased slope, an unchanged y-intercept, and an x-intercept shifted closer to the origin (less negative). What type of inhibition is this?',
          hinglish: 'Lineweaver-Burk plot me inhibitor add karne par y-intercept same rehta hai lekin x-intercept origin ke pass shift ho jata hai (Km badh jata hai). Ye kaun sa inhibition hai?',
        },
        options: [
          'Competitive Inhibition',
          'Non-Competitive Inhibition',
          'Uncompetitive Inhibition',
          'Suicide Inactivation'
        ],
        correctIndex: 0,
        explanation: {
          en: 'Unchanged y-intercept means 1/Vmax is unchanged (Vmax constant). Shifted x-intercept (-1/Km,app) means apparent Km has increased. This is the classical hallmark of Competitive Inhibition.',
          hinglish: 'Y-intercept same matlab Vmax constant hai, x-intercept shift matlab Km badh gaya. Ye Competitive inhibition ka signature hai.',
        },
        examSource: 'GATE Biotechnology',
      },
    ],
    references: [
      {
        citation: 'Cornish-Bowden A. Fundamentals of Enzyme Kinetics. 4th Edition, Wiley-Blackwell, 2012.',
        type: 'Textbook',
      },
    ],
  },

  // GENETICS
  'linkage-mapping-and-three-point-testcross': {
    slug: 'linkage-mapping-and-three-point-testcross',
    subjectSlug: 'genetics',
    title: {
      en: 'Genetic Linkage, Three-Point Testcross, and Chromosome Mapping Mechanics',
      hinglish: 'Gene Linkage, Recombination, aur Three-Point Test Cross Mapping',
    },
    difficulty: 'Advanced',
    readTimeMin: 16,
    basicLevel: {
      overview: {
        en: 'Mendel\'s Law of Independent Assortment applies only when genes are located on different chromosomes or far apart on the same chromosome. When two or more genes reside physically close on the same chromosome, they tend to be inherited together—a phenomenon known as Genetic Linkage.',
        hinglish: 'Mendel ka Independent Assortment law tabhi kaam karta hai jab genes alag chromosomes par hon. Jab do genes ek hi chromosome par paas-paas hote hain toh wo saath inherit hote hain—ise Linkage kehte hain.',
      },
      analogy: {
        en: 'Imagine passengers traveling on the same train car. Unless a severe derailment separates the car, all passengers arrive together at the same station. Linked genes travel together on the chromosome train.',
        hinglish: 'Chromosome ko ek train samjhein: ek hi dabbe me baithe log (linked genes) ek sath safar karte hain, jab tak crossing-over unhe alag na kar de.',
      },
      corePrinciples: [
        {
          en: 'Crossing over in Prophase I of Meiosis: Homologous non-sister chromatids exchange reciprocal segments, producing recombinant non-parental genotypes.',
          hinglish: 'Meiosis ke Pachynema stage me crossing-over hoti hai jisse recombinant progeny banti hai.',
        },
        {
          en: '1 Map Unit (mu) = 1 Centimorgan (cM) = 1% Recombination Frequency.',
          hinglish: '1 centimorgan (cM) map distance ka matlab hota hai 1% recombination frequency.',
        },
      ],
      basicVocabulary: [
        {
          term: 'Syntenic Genes',
          en: 'Genes situated on the same chromosome, regardless of whether they exhibit linkage or independent assortment.',
          hinglish: 'Ek hi chromosome par present saare genes ko syntenic genes kehte hain.',
        },
        {
          term: 'Coefficient of Coincidence (C)',
          en: 'Ratio of observed double crossovers to expected double crossovers: C = Observed DCO / Expected DCO.',
          hinglish: 'Observed double crossovers aur expected double crossovers ka ratio.',
        },
      ],
    },
    intermediateLevel: {
      biochemicalMechanism: [
        {
          en: 'Three-Point Testcross Principle: Crossing a trihybrid heterozygous individual (Aa Bb Cc) with a homozygous recessive tester (aa bb cc) allows the direct visualization of all eight gametic types in the offspring phenotype frequencies.',
          hinglish: 'Trihybrid heterozygote ko homozygous recessive tester se cross karke aathon gamete types ko identify karte hain.',
        },
        {
          en: 'Determining Gene Order: Compare the most frequent class (Parental Types, Non-Crossovers) with the least frequent class (Double Crossovers, DCO). The single gene that is swapped between parental and DCO classes is unambiguously the MIDDLE gene.',
          hinglish: 'Gene order nikalne ka rule: Parental class (sabse zyada) aur DCO class (sabse kam) ko compare karein. Jo single gene flip hota hai, wahi middle gene hota hai.',
        },
      ],
      reactionSteps: [
        {
          step: 1,
          title: 'Identify Parental & DCO Classes',
          en: 'Parental classes possess the highest offspring counts; DCO classes have the two lowest counts.',
          hinglish: 'Highest frequency = Parental, lowest frequency = Double Crossover (DCO).',
        },
        {
          step: 2,
          title: 'Identify Middle Locus',
          en: 'Identify the allele that has swapped partners relative to the parental configuration.',
          hinglish: 'Parental aur DCO me jo allele switch hua hai wo middle gene hai.',
        },
        {
          step: 3,
          title: 'Calculate Region I & Region II Distances',
          en: 'Distance = ((Single Crossovers in Region + DCO) / Total Progeny) * 100 cM.',
          hinglish: 'Har interval ka distance calculate karein including DCO counts.',
        },
        {
          step: 4,
          title: 'Calculate Interference (I)',
          en: 'Interference = 1 - Coefficient of Coincidence = 1 - (Observed DCO / Expected DCO). Positive interference means a crossover in one region suppresses a crossover nearby.',
          hinglish: 'Interference = 1 - C. Positive interference ka matlab ek crossing over doosri ko rok rahi hai.',
        },
      ],
      laboratoryTechniques: [
        {
          en: 'Drosophila Melanogaster Genetic Crosses: Classical Morgan and Sturtevant linkage mapping using eye color, wing shape, and body pigmentation markers.',
          hinglish: 'Drosophila me eye color aur wing shape markers use karke chromosome map banaya gaya tha.',
        },
      ],
      stoichiometryAndCofactors: [],
    },
    advancedLevel: {
      biophysicalThermodynamics: {
        en: 'Recombination is initiated by Spo11-induced double-strand breaks (DSBs) followed by 5\'->3\' resection generating 3\' single-stranded tails. Rad51 and Dmc1 recombinases catalyze strand invasion forming double Holliday junctions (dHJ) resolved by MutLgamma and structure-specific nucleases.',
        hinglish: 'Molecular level par Spo11 protein double strand break banata hai, aur Rad51/Dmc1 Holliday junction banate hain jiska resolution crossing over create karta hai.',
      },
      mathematicalEquations: [
        {
          name: 'Haldane Mapping Function',
          formula: 'w = -0.5 * ln(1 - 2 * RF)',
          description: 'Corrects map distance (w in Morgans) for undetected multiple crossover events over long chromosomal intervals.',
        },
        {
          name: 'Kosambi Mapping Function',
          formula: 'w = 0.25 * ln((1 + 2 * RF) / (1 - 2 * RF))',
          description: 'Incorporates crossover interference into the relationship between recombination frequency and physical map distance.',
        },
      ],
      modernInVivoRealities: [
        {
          en: 'Recombination Hotspots: Crossing over is not uniformly distributed across chromosomes. Hotspots are determined by PRDM9 histone methyltransferase binding to specific 13-mer motifs, catalyzing H3K4me3 and H3K36me3 chromatin opening.',
          hinglish: 'Crossing over random nahi hoti; PRDM9 protein specific hotspots par chromatin open karta hai jahan recombination 100 times higher hoti hai.',
        },
      ],
      examPitfallsAndTraps: [
        {
          exam: 'CSIR-NET / GATE',
          pitfall: 'Forgetting to add DCO numbers when calculating single-crossover map distances.',
          correction: 'Every double crossover event involves a crossover in Region 1 AND Region 2. DCO counts MUST be included in the numerators for both intervals.',
        },
      ],
      scienceDatabases: {
        pdbId: '1TUP',
        pdbTitle: 'Tumor suppressor p53 core domain complexed with DNA',
        alphaFoldUniProt: 'P04637',
        alphaFoldProtein: 'Cellular tumor antigen p53 (Human TP53)',
        pubchemCid: 5862,
        pubchemName: 'D-Glucose',
        uniprotId: 'P04637',
      },
    },
    practiceQuestions: [
      {
        question: {
          en: 'In a three-point testcross involving genes a, b, and c with total 1000 progeny, Parental count is 800, Single crossover Region I is 100, Region II is 80, and DCO count is 20. Expected DCO is 24. What is the genetic interference (I)?',
          hinglish: '1000 progeny me observed DCO = 20 aur expected DCO = 24 hai. Genetic interference (I) kitna hoga?',
        },
        options: [
          '0.167 (16.7%)',
          '0.833 (83.3%)',
          '0.200 (20.0%)',
          'Zero'
        ],
        correctIndex: 0,
        explanation: {
          en: 'Coefficient of Coincidence C = Observed DCO / Expected DCO = 20 / 24 = 0.833. Interference I = 1 - C = 1 - 0.833 = 0.167 (or 16.7%).',
          hinglish: 'C = 20 / 24 = 0.833. Interference I = 1 - C = 1 - 0.833 = 0.167.',
        },
        examSource: 'CSIR-NET Life Sciences Part C',
      },
    ],
    references: [
      {
        citation: 'Griffiths A.J.F. et al. Introduction to Genetic Analysis. 12th Edition, W. H. Freeman, 2020.',
        type: 'Textbook',
      },
    ],
  },
};
