export interface CalculatorConfig {
  id: string;
  name: {
    en: string;
    hinglish: string;
  };
  category: 'Solutions & Chemistry' | 'Centrifugation' | 'Molecular Biology & Nucleic Acids' | 'Protein Biochemistry';
  formulaDisplay: string;
  description: {
    en: string;
    hinglish: string;
  };
}

export const SCIENTIFIC_CALCULATORS: CalculatorConfig[] = [
  {
    id: 'molarity',
    name: {
      en: 'Molarity Calculator',
      hinglish: 'Molarity (M) Calculator',
    },
    category: 'Solutions & Chemistry',
    formulaDisplay: 'Mass (g) = Molarity (mol/L) × Volume (L) × Molecular Weight (g/mol)',
    description: {
      en: 'Calculates the exact solute mass required to prepare a specific volume of solution at desired molarity.',
      hinglish: 'Target molarity aur volume ke liye required chemical mass (grams) calculate karein.',
    },
  },
  {
    id: 'normality',
    name: {
      en: 'Normality Calculator',
      hinglish: 'Normality (N) Calculator',
    },
    category: 'Solutions & Chemistry',
    formulaDisplay: 'Normality (N) = Molarity (M) × Valence Factor (n)',
    description: {
      en: 'Calculates normality based on gram equivalent weights and valence reactive exchange factor (e.g. n=2 for H2SO4).',
      hinglish: 'Equivalent weight aur n-factor (acid-base valence) ke basis par Normality calculate karein.',
    },
  },
  {
    id: 'dilution',
    name: {
      en: 'Solution Dilution Calculator (C1V1 = C2V2)',
      hinglish: 'Dilution Calculator (C1V1 = C2V2)',
    },
    category: 'Solutions & Chemistry',
    formulaDisplay: 'C1 × V1 = C2 × V2  ⟹  V1 = (C2 × V2) / C1',
    description: {
      en: 'Determines the volume of concentrated stock solution required to dilute to a target working concentration.',
      hinglish: 'Stock solution se working concentration banane ke liye required stock volume calculate karein.',
    },
  },
  {
    id: 'percentage-solution',
    name: {
      en: 'Percentage Solution Calculator (% w/v & % v/v)',
      hinglish: 'Percentage Solution Calculator (% w/v & % v/v)',
    },
    category: 'Solutions & Chemistry',
    formulaDisplay: '% (w/v) = [Mass (g) / Volume (mL)] × 100',
    description: {
      en: 'Computes mass or volume for weight/volume (w/v) and volume/volume (v/v) reagent preparations (e.g. 10% SDS, 70% EtOH).',
      hinglish: 'Reagents jaise 10% SDS ya 70% Ethanol banane ke liye solute amount find karein.',
    },
  },
  {
    id: 'rpm-to-rcf',
    name: {
      en: 'Centrifuge RPM to RCF (g-force) Converter',
      hinglish: 'RPM se RCF (g-force) Converter',
    },
    category: 'Centrifugation',
    formulaDisplay: 'RCF (g) = 1.118 × 10⁻⁵ × r (cm) × (RPM)²',
    description: {
      en: 'Converts revolutions per minute (RPM) to relative centrifugal force (RCF or g-force) using specific rotor radius in centimeters.',
      hinglish: 'Rotor radius (cm) use karke centrifuge RPM ko standard g-force (RCF) me accurately convert karein.',
    },
  },
  {
    id: 'dna-concentration',
    name: {
      en: 'DNA / RNA Concentration & Purity (A260 / A280)',
      hinglish: 'DNA Concentration & Purity Calculator',
    },
    category: 'Molecular Biology & Nucleic Acids',
    formulaDisplay: 'Concentration (μg/mL) = A260 × Extinction Factor (50 for dsDNA, 40 for RNA) × Dilution Factor',
    description: {
      en: 'Computes nucleic acid concentration from UV spectrophotometer A260 readings and assesses purity from A260/A280 ratio.',
      hinglish: 'Spectrophotometer A260 aur A280 values se DNA concentration aur protein contamination ratio calculate karein.',
    },
  },
  {
    id: 'protein-concentration',
    name: {
      en: 'Protein Concentration (Beer-Lambert Law)',
      hinglish: 'Protein Concentration (Beer-Lambert)',
    },
    category: 'Protein Biochemistry',
    formulaDisplay: 'c = A / (ε × l)  [A = Absorbance, ε = Molar Extinction Coeff, l = 1 cm pathlength]',
    description: {
      en: 'Calculates molar and mg/mL protein concentration directly from A280 absorbance using molar extinction coefficient.',
      hinglish: 'Beer-Lambert law apply karke A280 absorbance se pure protein concentration nikalna.',
    },
  },
  {
    id: 'molecular-weight',
    name: {
      en: 'DNA Oligonucleotide Molecular Weight & Tm',
      hinglish: 'DNA Primer MW & Melting Temp (Tm)',
    },
    category: 'Molecular Biology & Nucleic Acids',
    formulaDisplay: 'Tm (°C) = 2(A + T) + 4(G + C)  |  MW (g/mol) = Σ(Nucleotide Weights)',
    description: {
      en: 'Calculates the precise molecular weight (Da), GC content (%), and estimated annealing temperature (Tm) for PCR primers.',
      hinglish: 'Primer sequence enter karke MW, GC percentage, aur annealing temperature (Tm) calculate karein.',
    },
  },
  {
    id: 'buffer-prep',
    name: {
      en: 'Buffer pH (Henderson-Hasselbalch Equation)',
      hinglish: 'Buffer Preparation (Henderson-Hasselbalch)',
    },
    category: 'Solutions & Chemistry',
    formulaDisplay: 'pH = pKa + log₁₀([Conjugate Base A⁻] / [Weak Acid HA])',
    description: {
      en: 'Calculates the required ratio of conjugate base to weak acid to achieve an exact target buffer pH.',
      hinglish: 'Weak acid aur conjugate base ki exact ratio calculate karein target buffer pH achieve karne ke liye.',
    },
  },
];
