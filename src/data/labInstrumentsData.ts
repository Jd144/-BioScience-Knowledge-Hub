import { LabInstrument } from '../types/index.ts';

export const LAB_INSTRUMENTS: LabInstrument[] = [
  {
    slug: 'uv-vis-spectrophotometer',
    name: {
      en: 'UV-Visible Spectrophotometer',
      hinglish: 'UV-Visible Spectrophotometer',
    },
    category: 'Spectroscopy',
    principle: {
      en: 'Based on Beer-Lambert Law (A = epsilon * c * l). Measures light attenuation caused by absorption as a beam passes through a liquid sample within the ultraviolet (190-380 nm) and visible (380-800 nm) spectrum.',
      hinglish: 'Beer-Lambert Law (A = epsilon * c * l) par based hai. UV (190-380 nm) aur Visible (380-800 nm) light range me sample dwara absorb hone wali light intensity ko measure karke concentration batata hai.',
    },
    components: [
      'Deuterium lamp (UV 190-380 nm) and Tungsten-halogen lamp (Visible 380-900 nm)',
      'Monochromator with diffraction grating and entry/exit optical slits',
      'Cuvette holder (Quartz cuvettes for UV <340 nm; optical glass/plastic for visible)',
      'Photodiode array or Photomultiplier tube (PMT) detector',
      'Microprocessor analog-to-digital readout unit',
    ],
    workingMechanism: {
      en: [
        'Light from the dual-source lamp is directed through a diffraction grating monochromator to isolate a narrow monochromatic wavelength band.',
        'The monochromatic beam splits (in dual-beam instruments) through reference and sample cuvettes.',
        'Photons excite ground-state electrons (pi->pi* and n->pi* transitions) in chromophores (e.g. aromatic rings, peptide bonds).',
        'Transmitted light intensity (I) is detected and converted to Absorbance: A = -log10(I / I0).',
      ],
      hinglish: [
        'Lamp se light monochromator me jaati hai jahan specific single wavelength select hoti hai.',
        'Beam sample solution me se pass hoti hai jahan molecules photons absorb karte hain.',
        'Detector bachi hui transmitted light ko measure karta hai aur formula A = -log10(I/I0) se Absorbance nikalta hai.',
      ],
    },
    applications: [
      'Quantification of nucleic acids (DNA/RNA at 260 nm) and determination of purity (A260/A280 ratio).',
      'Estimation of total protein concentration via direct A280 absorption (tyrosine, tryptophan) or colorimetric assays (Bradford, BCA, Lowry).',
      'Monitoring microbial cell density at OD600 during fermentation growth curves.',
      'Enzyme kinetic assays monitoring substrate depletion or product generation (e.g. NADH oxidation at 340 nm).',
    ],
    advantages: [
      'Non-destructive, rapid measurement requiring small sample volumes (100 uL to 1 mL).',
      'High quantitative accuracy across calibrated linear absorbance ranges (0.1 to 1.5 AU).',
    ],
    limitations: [
      'Requires transparent solutions; suspended particulates cause scattering artifact and turbidity errors.',
      'Deviations from Beer\'s law occur at high solute concentrations (>2.0 AU) due to electrostatic molecular interactions.',
    ],
    precautions: [
      'Always use Quartz cuvettes for UV measurements (<340 nm); standard plastic/glass blocks UV light.',
      'Never touch optical clear faces of cuvettes; wipe with lint-free lens paper before insertion.',
      'Ensure zero bubbles in cuvette optical path.',
    ],
    references: [
      'Skoog D.A. et al. Fundamentals of Analytical Chemistry. 9th Edition, Cengage Learning.',
    ],
  },
  {
    slug: 'centrifuge',
    name: {
      en: 'Laboratory Centrifuge & Ultracentrifuge',
      hinglish: 'Laboratory Centrifuge & Ultracentrifuge',
    },
    category: 'Separation & Centrifugation',
    principle: {
      en: 'Separation of particles based on size, shape, density, and viscosity of the medium under artificial centrifugal force (RCF = 1.118 x 10^-5 x r x RPM^2).',
      hinglish: 'Centrifugal force ke through particles ko unke size aur density ke basis par separate karta hai. Heavy particles bottom me pellet banate hain aur liquid supernatant rehta hai.',
    },
    components: [
      'Heavy-duty induction motor with speed sensor',
      'Fixed-angle or Swinging-bucket rotor forged from titanium or aerospace aluminum',
      'Refrigeration compressor (cooling down to -20°C for temperature-sensitive enzymes)',
      'Armored steel containment chamber with safety interlock lid lock',
      'Digital tachometer, timer, and deceleration brake control',
    ],
    workingMechanism: {
      en: [
        'Centrifugal acceleration exerts an outward buoyant sedimenting force exceeding gravitational acceleration by thousands of times.',
        'In differential centrifugation, whole cells pellet first at low RCF (~1,000 g), followed by mitochondria/chloroplasts (~10,000 g), microsomes (~100,000 g), and macromolecules in ultracentrifuges (>300,000 g).',
        'In density-gradient centrifugation (CsCl, Sucrose), molecules band at their isopycnic buoyant density equilibrium.',
      ],
      hinglish: [
        'Rotor fast rotate karta hai jisse centrifugal force gravitational force se hazaron guna increase ho jati hai.',
        'Differential centrifugation me pehle heavy cells pellet hoti hain fir higher speeds par organelles aur proteins separate hote hain.',
      ],
    },
    applications: [
      'Pelleting bacterial cultures and recombinant protein harvest.',
      'Isolation of plasmid DNA, genomic DNA, and total cellular RNA.',
      'Fractionation of subcellular organelles (nuclei, mitochondria, endoplasmic reticulum).',
    ],
    advantages: [
      'High-throughput mechanical phase separation with reproducible RCF calibration.',
    ],
    limitations: [
      'High risk of mechanical catastrophic rotor explosion if tubes are improperly counter-balanced.',
    ],
    precautions: [
      'Tubes MUST be counterbalanced using an analytical balance within +/- 0.05 grams opposing each other.',
      'Never open rotor lid until tachometer registers 0 RPM.',
      'Check rotors for micro-cracks or corrosion pitting prior to high-speed runs.',
    ],
    references: [
      'Wilson K. & Walker J. Principles and Techniques of Biochemistry and Molecular Biology. Cambridge University Press.',
    ],
  },
  {
    slug: 'micropipette',
    name: {
      en: 'Precision Air-Displacement Micropipette',
      hinglish: 'Precision Micropipette',
    },
    category: 'Separation & Centrifugation',
    principle: {
      en: 'Operates via positive or air-displacement piston mechanics. Compressing the plunger displaces an exact volume of air, creating a vacuum that draws an equivalent volume of liquid into a disposable polypropylene tip.',
      hinglish: 'Air-displacement piston principle par work karta hai. Piston press karne se air displace hoti hai aur exact calibrated volume liquid tip me draw hota hai.',
    },
    components: [
      'Volume adjustment micrometer with digital volume indicator display',
      'Stainless steel internal piston with fluoropolymer seal',
      'Stainless steel shaft and tip cone',
      'Two-stop plunger button (First stop = aspirate/dispense; Second stop = blow-out)',
      'Tip ejector mechanism',
    ],
    workingMechanism: {
      en: [
        'Set desired volume within the certified operating range (e.g. 2-20 uL, 20-200 uL, 100-1000 uL).',
        'Depress plunger to first stop outside the liquid, immerse tip 2-3 mm below liquid meniscus vertically, and release smoothly to aspirate.',
        'To dispense, press to first stop and continue to second blowout stop to purge capillary droplet.',
      ],
      hinglish: [
        'Volume set karein within range. Pehle stop tak dabakar liquid me 2-3 mm dip karein aur release karein.',
        'Dispense karte waqt tube wall ke sath touch karke second stop tak press karein taaki last drop bhi dispense ho jaye.',
      ],
    },
    applications: [
      'Setting up sensitive enzymatic PCR reactions (1-50 uL volumes).',
      'Serial dilutions for enzyme kinetics, cell culture, and standard curves.',
      'Loading SDS-PAGE and agarose gel wells with sub-microliter precision.',
    ],
    advantages: [
      'High accuracy and precision (CV < 0.8% at nominal volume).',
    ],
    limitations: [
      'Inaccurate for highly viscous liquids (glycerol, blood) or volatile organic solvents (chloroform) unless reverse pipetting is used.',
    ],
    precautions: [
      'Never turn volume micrometer past maximum or below minimum rated limit.',
      'Never lay a micropipette on the bench with liquid inside the tip; liquid will corrode the internal piston.',
      'Calibrate gravimetrically every 6 months using analytical balance and deionized water.',
    ],
    references: [
      'ISO 8655-2: Piston-operated volumetric apparatus — Pipettes.',
    ],
  },
  {
    slug: 'ph-meter',
    name: {
      en: 'Digital pH Meter & Combination Electrode',
      hinglish: 'Digital pH Meter',
    },
    category: 'Spectroscopy',
    principle: {
      en: 'Potentiometric measurement of hydrogen ion activity (aH+) across a thin glass membrane using Nernst equation (E = E0 - (2.303 RT / F) * pH).',
      hinglish: 'Hydrogen ion activity (pH = -log[H+]) ko potentiometrically measure karta hai. Glass electrode aur reference electrode ke beech electrical potential difference Nernstian slope se pH show karta hai.',
    },
    components: [
      'H+ sensitive thin glass bulb membrane (lithium silicate glass)',
      'Internal Ag/AgCl reference half-cell in 3M KCl electrolyte',
      'Porous ceramic liquid junction wick',
      'Automatic Temperature Compensation (ATC) probe',
      'High-input impedance digital millivoltmeter',
    ],
    workingMechanism: {
      en: [
        'Hydrated gel layers develop on outer and inner surfaces of the glass bulb membrane.',
        'Differences in [H+] between internal electrolyte and external test solution produce a phase-boundary electrical potential.',
        'The millivoltmeter measures potential delta (approximately 59.16 mV per pH unit at 25°C) and outputs calibrated pH.',
      ],
      hinglish: [
        'Glass membrane ke dono taraf H+ ions ke exchange se potential difference banta hai.',
        'Har 1 pH unit shift par approx 59.16 mV change detect hota hai at 25 degree C.',
      ],
    },
    applications: [
      'Accurate formulation of biological buffers (Tris-HCl, PBS, HEPES, TAE, TBE).',
      'Monitoring fermentation medium pH in microbial bioprocess bioreactors.',
      'Quality testing of chemical reagents and culture broth.',
    ],
    advantages: [
      'Precision to 0.01 pH units across the full 0 to 14 scale.',
    ],
    limitations: [
      'Alkaline error at pH > 12 due to sodium ion interference.',
    ],
    precautions: [
      'Always store glass electrode immersed in 3M KCl storage solution; never store in distilled water (leaches ions).',
      'Calibrate with fresh standard buffer solutions (pH 4.01, 7.00, 10.01) before every analytical run.',
      'Rinse electrode tip thoroughly with deionized water and blot gently (do not rub) with Kimwipe.',
    ],
    references: [
      'Bates R.G. Determination of pH: Theory and Practice. John Wiley & Sons.',
    ],
  },
  {
    slug: 'pcr-machine',
    name: {
      en: 'Thermal Cycler (Conventional PCR Machine)',
      hinglish: 'PCR Machine (Thermal Cycler)',
    },
    category: 'Molecular & PCR',
    principle: {
      en: 'Enzymatic exponential amplification of specific DNA target sequences in vitro via repetitive cycles of thermal denaturation (~95°C), primer annealing (~50-65°C), and enzymatic primer extension (~72°C) catalyzed by thermostable DNA polymerase.',
      hinglish: 'DNA target sequences ko millions of times amplify karne ke liye 3 steps follow karta hai: Denaturation (~94-95 C), Annealing (~55-60 C), aur Extension (~72 C) using thermostable Taq polymerase.',
    },
    components: [
      'Peltier thermoelectric heating/cooling elements block',
      'Heated motorized lid (typically maintained at 105°C to prevent reaction condensation on tube caps)',
      'Precision temperature microprocessor with ramp rate controller (typically 3-5°C/second)',
      'Interchangeable sample blocks (96-well 0.2 mL, 384-well, or dual blocks)',
    ],
    workingMechanism: {
      en: [
        'Denaturation (94-98°C): Thermal energy breaks Watson-Crick hydrogen bonds, converting double-stranded template into single strands.',
        'Annealing (50-65°C): Temperature drops to allow sequence-specific forward and reverse oligonucleotide primers to hybridize to flanking template regions.',
        'Extension (72°C): Thermostable Taq DNA Polymerase incorporates free dNTPs in the 5\'->3\' direction from primer 3\'-OH ends.',
        'Number of amplicons doubles every cycle: N = N0 * 2^n.',
      ],
      hinglish: [
        '95 C par DNA strands separate hoti hain.',
        '55 C par specific primers complementary sequence par bind karte hain.',
        '72 C par Taq polymerase naye nucleotides add karke complementary strand complete karta hai.',
      ],
    },
    applications: [
      'Gene cloning, insert amplification, and restriction site incorporation.',
      'Diagnostic detection of genetic disorders, viral infections, and forensic profiling (STRs).',
      'Site-directed mutagenesis and DNA sequencing template generation.',
    ],
    advantages: [
      'Generates billions of copies from nanogram or single-molecule DNA inputs within 1-2 hours.',
    ],
    limitations: [
      'Conventional PCR provides end-point qualitative assessment only, unable to determine initial template quantity without electrophoresis.',
    ],
    precautions: [
      'Always use dedicated aerosol-barrier filter tips to prevent cross-contamination.',
      'Prepare master mixes in clean PCR workstations separate from template addition areas.',
      'Keep PCR reagents on ice during assembly.',
    ],
    references: [
      'Mullis K.B. et al. Specific enzymatic amplification of DNA in vitro: the polymerase chain reaction. Cold Spring Harb Symp Quant Biol.',
    ],
  },
  {
    slug: 'real-time-pcr',
    name: {
      en: 'Quantitative Real-Time PCR (qPCR)',
      hinglish: 'Real-Time Quantitative PCR (qPCR)',
    },
    category: 'Molecular & PCR',
    principle: {
      en: 'Combines thermal cycling with continuous optical fluorescence detection in real time. Fluorescent signal is directly proportional to amplicon mass during the exponential amplification phase, allowing precise absolute or relative (delta-delta-Ct) quantification.',
      hinglish: 'Conventional PCR ke sath fluorescence optical system combine karta hai. Har cycle me bante hue DNA amplicons ko real time me fluorescent dye (SYBR Green) ya TaqMan probe se detect karke quantify karta hai.',
    },
    components: [
      'Peltier thermal block with rapid ramp rates',
      'Multi-channel optical excitation source (LEDs or Tungsten-halogen) and emission filter wheels',
      'High-sensitivity CCD/CMOS camera or Photomultiplier tubes',
      'Real-time data acquisition and Ct threshold baseline software',
    ],
    workingMechanism: {
      en: [
        'Employs either intercalating dyes (e.g. SYBR Green I, which fluoresces 1000-fold brighter when bound to double-stranded DNA) or sequence-specific fluorophore-quencher hydrolysis probes (TaqMan 5\'-nuclease assay).',
        'Optical system records fluorescence emission at the end of each extension cycle.',
        'Software identifies the Cycle Threshold (Ct) where signal crosses statistically significant background noise.',
        'Relative fold-change calculated using the 2^(-delta-delta-Ct) Livak method normalized to reference housekeeping gene.',
      ],
      hinglish: [
        'SYBR Green double stranded DNA se bind karke fluorescent light emit karta hai.',
        'TaqMan probes me Taq polymerase ki 5\' exonuclease activity reporter dye ko quencher se free karti hai.',
        'Ct value (Cycle threshold) jitna low hoga, initial sample me target gene ka copy number utna hi high hota hai.',
      ],
    },
    applications: [
      'Gene expression profiling and mRNA transcript quantification.',
      'Viral load quantification (HIV, Hepatitis B, SARS-CoV-2).',
      'Copy number variation (CNV) and single nucleotide polymorphism (SNP) genotyping.',
    ],
    advantages: [
      'Closed-tube system eliminating post-PCR gel electrophoresis cross-contamination; wide 8-log dynamic linear range.',
    ],
    limitations: [
      'SYBR Green binds non-specifically to all dsDNA including primer-dimers, requiring melting curve analysis (Tm peak) for validation.',
    ],
    precautions: [
      'Perform post-amplification melt curve analysis to verify single specific amplicon dissociation peak.',
      'Use optical-grade adhesive film or flat-cap tubes free from fingerprints and dust.',
    ],
    references: [
      'Livak K.J. & Schmittgen T.D. Analysis of relative gene expression data using real-time quantitative PCR and the 2(-Delta Delta C(T)) Method. Methods.',
    ],
  },
  {
    slug: 'gel-electrophoresis-system',
    name: {
      en: 'Horizontal & Vertical Gel Electrophoresis',
      hinglish: 'Gel Electrophoresis System',
    },
    category: 'Separation & Centrifugation',
    principle: {
      en: 'Electrophoretic migration of charged biomolecules (DNA, RNA, proteins) through a porous polymer matrix (agarose or polyacrylamide) under a direct current electric field, separating molecules according to charge-to-mass ratio and molecular sieving size.',
      hinglish: 'Electric field apply karke charged molecules (DNA, proteins) ko porous gel matrix (Agarose ya Polyacrylamide) ke through unke molecular weight ke basis par separate karta hai.',
    },
    components: [
      'Electrophoresis tank with platinum wire cathode (-) and anode (+)',
      'Regulated DC power supply with constant voltage/current modes',
      'Casting tray with well combs (agarose) or glass plate sandwich cassette (PAGE)',
      'Submarine running buffer (TAE, TBE, or Tris-Glycine-SDS)',
      'Gel imaging transilluminator (UV or Blue-light LED)',
    ],
    workingMechanism: {
      en: [
        'DNA possesses a constant negative charge due to its sugar-phosphate backbone and migrates toward the positive anode (Red).',
        'The agarose gel mesh sieves fragments; smaller fragments encounter lower hydrodynamic drag and migrate faster: log(MW) is inversely proportional to distance migrated.',
        'Bands are visualized via intercalation of fluorescent dyes (Ethidium Bromide, GelRed, SYBR Safe).',
      ],
      hinglish: [
        'DNA ka phosphate backbone negatively charged hota hai isliye DNA cathode (-) se anode (+) ki taraf move karta hai.',
        'Chote DNA fragments gel pores me se jaldi nikal jaate hain aur neeche band banate hain.',
      ],
    },
    applications: [
      'Verification of PCR amplicon size and restriction digest fragments.',
      'Separation and purification of DNA fragments for cloning (gel extraction).',
      'SDS-PAGE resolution of cellular protein mixtures and subunit molecular weight determination.',
    ],
    advantages: [
      'Visual, cost-effective confirmation of nucleic acid and protein purity and molecular size.',
    ],
    limitations: [
      'Standard agarose cannot resolve DNA fragments differing by less than 1-2% in size (requires PAGE or Capillary Electrophoresis).',
    ],
    precautions: [
      'Ethidium Bromide (EtBr) is a potent mutagen; handle with nitrile gloves and dispose in dedicated biohazard waste, or use safe dyes (GelGreen/GelRed).',
      'Never touch running buffer when power supply circuit is energized (high shock hazard).',
    ],
    references: [
      'Sambrook J. & Russell D.W. Molecular Cloning: A Laboratory Manual. Cold Spring Harbor Laboratory Press.',
    ],
  },
  {
    slug: 'laminar-air-flow',
    name: {
      en: 'Laminar Air Flow (LAF) Cabinet',
      hinglish: 'Laminar Air Flow (LAF)',
    },
    category: 'Sterilization & Culture',
    principle: {
      en: 'Generates an aseptic work zone by passing room air through a High Efficiency Particulate Air (HEPA) filter (trapping 99.97% of particles >= 0.3 um) and directing a uniform laminar streamline of sterile air across the working surface at constant velocity (0.45 m/s).',
      hinglish: 'HEPA filter (99.97% efficiency at 0.3 um) ke through continuous sterile air flow provide karta hai bina turbulence ke, jisse culture media aur microbial samples contaminate hone se bachte hain.',
    },
    components: [
      'Pre-filter for coarse dust entrapment',
      'HEPA filter (High-Efficiency Particulate Air)',
      'Centrifugal blower motor fan',
      'Shortwave germicidal UV-C lamp (254 nm) for surface sterilization',
      'Fluorescent/LED work area illuminator and transparent acrylic sash window',
    ],
    workingMechanism: {
      en: [
        'Room air is drawn in by the blower through a coarse pre-filter.',
        'Pressurized air passes through the dense pleats of the HEPA filter to eliminate airborne fungal spores, bacteria, and dust.',
        'Sterile air travels either horizontally (toward operator, for clean non-pathogenic product protection) or vertically across the perforated stainless steel workbench.',
      ],
      hinglish: [
        'Blower fan room air ko HEPA filter se push karta hai.',
        'Filtered pure air parallel lines me surface ke upar flow karti hai aur micro-organisms ko enter nahi karne deti.',
      ],
    },
    applications: [
      'Inoculation and subculturing of bacterial, fungal, and plant tissue cultures.',
      'Sterile preparation of agar plates, antibiotics, and reagent solutions.',
      'Aseptic assembly of medical devices and sterile packaging.',
    ],
    advantages: [
      'Provides ISO Class 5 clean air environment directly within standard laboratory rooms.',
    ],
    limitations: [
      'Horizontal LAF cabinets protect the sample ONLY; they blow air directly toward the technician and MUST NEVER be used for biohazardous pathogens or cytotoxic drugs.',
    ],
    precautions: [
      'Turn on blower 15 minutes prior to operation to purge particulates.',
      'NEVER operate or look at the UV-C germicidal light while working; UV-C causes severe photochemical corneal burns and erythema.',
      'Swab workbench with 70% v/v isopropanol or ethanol before and after work.',
    ],
    references: [
      'CDC / NIH. Biosafety in Microbiological and Biomedical Laboratories (BMBL). 6th Edition.',
    ],
  },
  {
    slug: 'autoclave',
    name: {
      en: 'Steam Sterilizer (Autoclave)',
      hinglish: 'Autoclave (Steam Sterilizer)',
    },
    category: 'Sterilization & Culture',
    principle: {
      en: 'Employs saturated steam under elevated pressure (typically 121°C at 15 psi / 103 kPa for 15-20 minutes). High-pressure steam transfers latent heat rapidly, irreversibly coagulating and denaturing structural proteins, enzymes, and heat-resistant bacterial endospores (Geobacillus stearothermophilus).',
      hinglish: 'High pressure saturated steam (121 degree C at 15 psi pressure for 15-20 min) se micro-organisms aur bacterial endospores ko destroy karta hai through protein coagulation.',
    },
    components: [
      'Heavy-gauge stainless steel pressure vessel chamber',
      'Electric immersion heating elements',
      'Safety spring-loaded pressure relief valve and rupture disc',
      'Mechanical pressure gauge and exhaust air solenoid valve',
      'Microprocessor temperature controller with thermocouple sensors',
    ],
    workingMechanism: {
      en: [
        'Air Purge Stage: Steam generated from boiling water purges cool, dense air through the exhaust valve (air pockets insulate and prevent sterilizing temperature).',
        'Sterilization Stage: When exhaust closes, internal pressure rises to 15 psi, raising steam temperature to 121°C for the calibrated hold time.',
        'Exhaust Stage: Slow exhaust for liquids (preventing boil-over) or fast exhaust for dry surgical instruments and glassware.',
      ],
      hinglish: [
        'Pehle chamber se saari thandi hawa purge hoti hai.',
        'Fir steam pressure 15 psi tak badhta hai aur temperature 121 C reach karta hai jahan 15-20 minutes sterilization hota hai.',
      ],
    },
    applications: [
      'Sterilization of nutrient agar media, broths, and physiological saline.',
      'Decontamination of biohazardous infectious culture waste prior to disposal.',
      'Sterilization of laboratory glassware, pipette tips, and surgical tools.',
    ],
    advantages: [
      'Most reliable, rapid, and chemical-free thermal sterilization method.',
    ],
    limitations: [
      'Cannot be used for heat-labile substances (antibiotics, vitamins, urea, serum) or corrosive chemicals.',
    ],
    precautions: [
      'Never tightly seal bottles of liquid before autoclaving (will explode under pressure); loosen screw caps by half a turn.',
      'Wait until chamber pressure reaches zero (0 psi) and temperature drops below 80°C before opening the door.',
      'Verify cycle monthly using biological spore ampoules containing Geobacillus stearothermophilus.',
    ],
    references: [
      'Russell A.D., Hugo W.B., Ayliffe G.A.J. Principles and Practice of Disinfection, Preservation and Sterilization. Blackwell Science.',
    ],
  },
  {
    slug: 'biosafety-cabinet',
    name: {
      en: 'Biological Safety Cabinet (Class II Type A2/B2)',
      hinglish: 'Biosafety Cabinet (BSC)',
    },
    category: 'Sterilization & Culture',
    principle: {
      en: 'Provides three levels of biocontainment: Product protection, Personnel protection, and Environmental protection. Uses laminar HEPA-filtered downflow air combined with an air curtain inward face velocity (minimum 0.51 m/s) to isolate infectious biohazardous aerosols.',
      hinglish: 'Three-way protection deta hai: Sample protection, Researcher protection, aur Lab environment protection. Inward air curtain infectious aerosols ko bahar aane se rokta hai.',
    },
    components: [
      'Supply and Exhaust HEPA/ULPA filters',
      'Negative pressure plenum surrounding contaminated air ducts',
      'Front sliding tempered sash with alarm sensor',
      'Internal airflow anemometers and pressure differential magnehelic gauges',
    ],
    workingMechanism: {
      en: [
        'Room air is drawn into front intake grilles to form a protective air curtain.',
        'Internal blower recirculates approximately 70% of air through the supply HEPA filter down onto the work surface, while 30% is exhausted through an exhaust HEPA filter (Class II A2).',
        'Negative pressure surrounding all contaminated air ducts ensures any leaks are drawn inward.',
      ],
      hinglish: [
        'Front grille room air ko pull karke air curtain banati hai.',
        'HEPA filter se air clean hokar downflow aati hai aur exhaust filter se sterile hokar bahar release hoti hai.',
      ],
    },
    applications: [
      'Handling mammalian viral cultures, human bloodborne pathogens, and recombinant lentiviruses.',
      'Primary human tissue isolation and clinical diagnostic microbiology.',
      'Handling cytotoxic antineoplastic compounds (specifically in Type B2 full exhaust cabinets).',
    ],
    advantages: [
      'Complete operator barrier protection against infectious bioaerosols (Risk Groups 2 and 3).',
    ],
    limitations: [
      'Does not provide protection against high-energy ionizing radiation or volatile toxic vapors unless ducted outside.',
    ],
    precautions: [
      'Never disrupt front grille air curtain with sudden arm sweeps or blocking grilles with notebooks.',
      'Keep sash window at certified operating height (typically 8 or 10 inches).',
    ],
    references: [
      'NSF/ANSI Standard 49: Biosafety Cabinetry: Design, Construction, Performance, and Field Certification.',
    ],
  },
  {
    slug: 'elisa-reader',
    name: {
      en: 'Microplate ELISA Reader / Spectrophotometer',
      hinglish: 'Microplate ELISA Reader',
    },
    category: 'Spectroscopy',
    principle: {
      en: 'Photometric measurement of optical density (OD) across standard 96-well microplates. Quantifies antigen-antibody enzyme conjugates (e.g. HRP with TMB substrate; AP with pNPP) following color development.',
      hinglish: '96-well plates me antibody-antigen binding ko enzyme catalyzed color change (HRP-TMB reaction) ke through measure karta hai.',
    },
    components: [
      'Motorized 96-well microplate carrier stage with programmable orbital shaker',
      'Xenon flash lamp or LED array with narrow bandpass interference filters (405, 450, 492, 630 nm)',
      'Fiber optic light guide bundles focusing light vertically through each well',
      'Multi-channel silicon photodetector array',
    ],
    workingMechanism: {
      en: [
        'Light beam passes vertically through the bottom of each well in the 96-well plate.',
        'Absorbance is logged simultaneously across all 96 wells in 5-10 seconds.',
        'Standard curve fitting algorithms (4-Parameter Logistic 4PL or linear regression) interpolate unknown serum concentrations.',
      ],
      hinglish: [
        'Har well ke through vertical light beam pass hoti hai.',
        'Color intensity absorb ho kar photodetector dwara optical density me convert hoti hai.',
      ],
    },
    applications: [
      'Quantification of cytokines, hormones, and serum antibodies (IgG, IgM).',
      'Clinical diagnostics (HIV p24, Hepatitis B surface antigen HBsAg, autoimmune markers).',
      'High-throughput screening of hybridoma monoclonal clones.',
    ],
    advantages: [
      'Rapid parallel processing of 96 samples in seconds with automated 4PL curve fitting.',
    ],
    limitations: [
      'Requires meticulous plate washing to eliminate non-specifically bound antibodies and prevent false-positive signals.',
    ],
    precautions: [
      'Check plate bottoms for water droplets or smudges prior to reading.',
      'Stop enzymatic reactions promptly with 1-2 M H2SO4 to prevent signal saturation.',
    ],
    references: [
      'Wild D. The Immunoassay Handbook. 4th Edition, Elsevier.',
    ],
  },
  {
    slug: 'fluorescence-microscope',
    name: {
      en: 'Epifluorescence & Confocal Microscope',
      hinglish: 'Fluorescence Microscope',
    },
    category: 'Microscopy & Imaging',
    principle: {
      en: 'Utilizes high-intensity light to excite fluorophores at their excitation wavelength; the fluorophore relaxes back to ground state, emitting lower-energy, longer-wavelength fluorescent photons (Stokes shift) separated by a dichroic mirror filter cube.',
      hinglish: 'Fluorophores ko short wavelength light se excite karta hai. Molecules relax hote waqt higher wavelength (Stokes shift) light emit karte hain jo dichroic filter se separate hokar clear image banati hai.',
    },
    components: [
      'High-pressure Mercury arc lamp, Metal Halide, or solid-state laser lines',
      'Fluorescence filter cube (Excitation filter, Dichroic beam splitter, Emission barrier filter)',
      'High numerical aperture (NA) plan-apochromat objective lenses',
      'Cooled scientific CMOS (sCMOS) or EM-CCD digital camera',
    ],
    workingMechanism: {
      en: [
        'Excitation filter selects specific wavelengths matching fluorophore absorption spectrum (e.g. 488 nm for GFP/FITC).',
        'Dichroic mirror reflects excitation light downward onto sample through objective lens.',
        'Emitted fluorescence photons pass back through objective, transmit through the dichroic mirror, and pass through emission barrier filter to camera.',
      ],
      hinglish: [
        'Excitation filter specific blue/UV light bhejta hai.',
        'Sample fluorescent light emit karta hai jo barrier filter se filter hokar black background par bright image create karti hai.',
      ],
    },
    applications: [
      'Subcellular localization of GFP/mCherry fusion proteins in living cells.',
      'Immunofluorescence detection of cytoskeleton filaments, receptors, and transcription factors.',
      'Fluorescence in situ hybridization (FISH) for chromosomal gene mapping.',
    ],
    advantages: [
      'Exceptional signal-to-noise ratio against pitch-black backgrounds; multi-color co-localization.',
    ],
    limitations: [
      'Fluorophore photobleaching and cellular phototoxicity caused by reactive oxygen species during prolonged laser exposure.',
    ],
    precautions: [
      'Store fluorophore-stained slides in dark slide boxes at 4°C to prevent light photobleaching.',
      'Use antifade mounting media (e.g. ProLong Gold, DAPI).',
    ],
    references: [
      'Lichtman J.W. & Conchello J.A. Fluorescence microscopy. Nature Methods.',
    ],
  },
  {
    slug: 'electron-microscope',
    name: {
      en: 'Transmission & Scanning Electron Microscope (TEM / SEM)',
      hinglish: 'Electron Microscope (TEM / SEM)',
    },
    category: 'Microscopy & Imaging',
    principle: {
      en: 'Replaces visible light with an accelerated relativistic beam of electrons (de Broglie wavelength lambda = h / p < 0.005 nm at 100 kV), yielding sub-nanometer resolving power (>1000-fold greater than optical diffraction limits).',
      hinglish: 'Light ki jagah high-speed electrons ki beam use karta hai. Electron ki de Broglie wavelength bohot short hoti hai jisse sub-nanometer level ultrastructure (viruses, ribosomes, membrane bilayers) clearly dikhti hai.',
    },
    components: [
      'Field emission electron gun (FEG) cathode source',
      'Electromagnetic condenser, objective, and projector lens coils',
      'Ultra-high vacuum column pumping system (turbomolecular + ion getter pumps)',
      'Scintillator phosphor screen with direct electron detector camera',
    ],
    workingMechanism: {
      en: [
        'TEM: Accelerated electrons transmit through ultrathin resin sections (<80 nm) stained with heavy metals (Uranyl Acetate, Lead Citrate); dense regions scatter electrons, producing high-contrast shadowgraphs.',
        'SEM: Focused electron beam raster-scans sputter-coated specimen surface; secondary and backscattered electrons form 3D topographic relief images.',
      ],
      hinglish: [
        'TEM me electrons sample me se pass hokar internal organelle details show karte hain.',
        'SEM me surface se bounce back hone wale electrons sample ka 3D surface architecture reveal karte hain.',
      ],
    },
    applications: [
      'Resolving viral capsid geometries, bacterial pili, and nuclear pore complexes.',
      'Ultrastructural pathology of renal biopsies and mitochondrial cristae alterations.',
      'Nanomaterial characterization (liposomes, nanoparticles, polymer scaffolds).',
    ],
    advantages: [
      'Atomic and sub-nanometer resolution (<0.1 nm in high-end aberration-corrected TEM).',
    ],
    limitations: [
      'Requires ultra-high vacuum; biological specimens must be fixed, dehydrated, resin-embedded, or cryo-vitrified (cannot observe living cells).',
    ],
    precautions: [
      'Samples must be completely dehydrated; residual moisture ruins column high vacuum.',
    ],
    references: [
      'Reimer L. & Kohl H. Transmission Electron Microscopy: Physics of Image Formation. Springer.',
    ],
  },
  {
    slug: 'bioreactor',
    name: {
      en: 'Stirred Tank Bioreactor (Fermenter)',
      hinglish: 'Stirred Tank Bioreactor (Fermenter)',
    },
    category: 'Bioprocess & Advanced',
    principle: {
      en: 'Provides a precisely controlled biomechanical and chemical microenvironment (pH, dissolved oxygen, temperature, nutrient feed rate, agitation shear) for optimal microbial or mammalian cell growth and recombinant product biosynthesis.',
      hinglish: 'Microorganisms aur cell cultures ke optimal growth ke liye controlled environment (DO, pH, Temp, Agitation) provide karta hai for large scale bioproduction.',
    },
    components: [
      'Borosilicate glass or 316L electropolished stainless steel vessel',
      'Agitation drive motor with Rushton turbine impellers and mechanical seals',
      'Sparger ring for sterile air / pure oxygen microbubble dispersion',
      'Probes: Polarographic Dissolved Oxygen (DO), pH, Pt100 temperature, and antifoam probe',
      'Peristaltic pump bank for automatic acid, base, nutrient feed, and antifoam dosing',
    ],
    workingMechanism: {
      en: [
        'Microbial cells are inoculated into sterile medium under continuous mechanical agitation.',
        'Rushton turbine impellers shear incoming gas bubbles to maximize interfacial surface area and oxygen mass transfer (kLa).',
        'Automated PID feedback loops maintain setpoints (e.g. 37°C, pH 7.2, DO > 30% saturation).',
      ],
      hinglish: [
        'Impeller broth ko mix karta hai aur bubbles ko chote size me break karke oxygen dissolve karta hai.',
        'Computerized sensors pH aur dissolved oxygen monitor karke automatically acid/base ya oxygen add karte hain.',
      ],
    },
    applications: [
      'Industrial production of recombinant therapeutics (Insulin, Monoclonal antibodies, Erythropoietin).',
      'Microbial fermentation of primary/secondary metabolites (ethanol, citric acid, penicillin).',
      'Cultivation of recombinant bacterial vaccines and viral vectors.',
    ],
    advantages: [
      'Scalable from benchtop (1-5 L) to industrial commercial volumes (>50,000 L) with automated telemetry.',
    ],
    limitations: [
      'High agitation shear can damage fragile, wall-less mammalian cells (requires marine impellers).',
    ],
    precautions: [
      'Check mechanical shaft seals and O-rings before in situ sterilization (SIP) to prevent contamination breaches.',
    ],
    references: [
      'Doran P.M. Bioprocess Engineering Principles. Academic Press.',
    ],
  },
  {
    slug: 'incubator',
    name: {
      en: 'CO2 Incubator & BOD Incubator',
      hinglish: 'CO2 Incubator & BOD Incubator',
    },
    category: 'Sterilization & Culture',
    principle: {
      en: 'Maintains optimal physiological conditions for cell culture by regulating temperature (37°C), humidity (>95% to prevent media evaporation), and carbon dioxide concentration (typically 5% CO2 to balance bicarbonate buffering in media at pH 7.2-7.4).',
      hinglish: 'Mammalian cells ke liye natural body jaisa environment banata hai: 37 C temperature, 95% humidity, aur 5% CO2 jo medium ke bicarbonate buffer ko pH 7.4 par maintain rakhti hai.',
    },
    components: [
      'Stainless steel sealed inner chamber with rounded corners',
      'Direct-heat or water jacketed thermal insulation mantle',
      'Infrared (IR) or thermal conductivity CO2 sensor',
      'Humidity water reservoir tray',
      'High-temperature decontamination cycle (160°C dry heat or 90°C moist steam)',
    ],
    workingMechanism: {
      en: [
        'IR sensor measures CO2 absorption; solenoid valve injects pure CO2 to maintain 5% setpoint.',
        'CO2 dissolves in liquid culture medium: CO2 + H2O <-> H2CO3 <-> H+ + HCO3-, maintaining physiological pH 7.4 with sodium bicarbonate.',
        'Water pan generates saturated humidity to eliminate osmotic evaporation from microplate wells.',
      ],
      hinglish: [
        'IR sensor CO2 level detect karke 5% level maintain karta hai.',
        'Dissolved CO2 sodium bicarbonate buffer ke sath react karke cell culture medium ka pH balance rakhta hai.',
      ],
    },
    applications: [
      'Mammalian primary cell lines and continuous tumor cell culture.',
      'Stem cell differentiation assays and organoid cultivation.',
      'In vitro drug toxicity testing.',
    ],
    advantages: [
      'Stable, unfluctuating cell growth kinetics and physiological pH stability.',
    ],
    limitations: [
      'High humidity environment is prone to fungal/mold growth if water pan is left neglected.',
    ],
    precautions: [
      'Use only sterile deionized water with antimicrobial conditioner (e.g. copper sulfate) in humidity pan.',
      'Never open doors unnecessarily; minimize door open duration to avoid loss of CO2 tension.',
    ],
    references: [
      'Freshney R.I. Culture of Animal Cells. Wiley-Blackwell.',
    ],
  },
  {
    slug: 'rheometer',
    name: {
      en: 'Rotational & Oscillatory Rheometer',
      hinglish: 'Rotational & Oscillatory Rheometer',
    },
    category: 'Bioprocess & Advanced',
    principle: {
      en: 'Measures deformation and flow behavior (viscosity, storage modulus G\', loss modulus G\'\') of non-Newtonian biological fluids, hydrogels, and fermentation broths under applied shear stress or oscillating strain.',
      hinglish: 'Biological solutions aur hydrogels ki viscosity aur viscoelastic properties (solid-like storage modulus G\' vs liquid-like loss modulus G\'\') measure karta hai.',
    },
    components: [
      'Low-friction air bearing with drag cup motor',
      'Measuring geometries (Cone-and-plate, Parallel plates, Concentric cylinders)',
      'Peltier temperature control stage (-40°C to +200°C)',
      'High-resolution optical angular deflection encoder',
    ],
    workingMechanism: {
      en: [
        'Sample is loaded between lower Peltier plate and upper precision cone or plate geometry.',
        'Motor applies controlled rotational torque or sinusoidal oscillatory torque.',
        'Phase angle shift (delta) between applied strain and resulting stress separates elastic solid behavior from viscous liquid flow.',
      ],
      hinglish: [
        'Sample plate par torque apply karke fluid flow rate aur shear thinning behavior record kiya jata hai.',
      ],
    },
    applications: [
      'Characterizing viscoelasticity of injectable hydrogels for tissue engineering.',
      'Viscosity monitoring of fungal fermentation broths exhibiting pseudoplastic shear-thinning.',
      'Stability profiling of therapeutic monoclonal antibody formulations at high concentrations.',
    ],
    advantages: [
      'Accurate characterization of complex viscoelasticity spanning liquid to solid states.',
    ],
    limitations: [
      'Requires precise geometry gap zeroing and volume loading (+/- 1 microliter error affects data).',
    ],
    precautions: [
      'Avoid air bubbles when loading viscid biomaterial between plates.',
    ],
    references: [
      'Macosko C.W. Rheology: Principles, Measurements, and Applications. Wiley-VCH.',
    ],
  },
  {
    slug: '3d-bioprinter',
    name: {
      en: 'Extrusion & Stereolithography 3D Bioprinter',
      hinglish: '3D Bioprinter',
    },
    category: 'Bioprocess & Advanced',
    principle: {
      en: 'Computer-controlled additive layer-by-layer spatial deposition of living cells encapsulated within biomimetic hydrogel bio-inks (collagen, alginate, gelatin-methacryloyl GelMA) to fabricate tissue-engineered constructs with controlled micro-architecture.',
      hinglish: 'Living cells ko biocompatible hydrogel (bio-ink) ke sath mix karke layer-by-layer 3D patterns me print karta hai to build artificial tissues aur organ scaffolds.',
    },
    components: [
      'Multi-axis Cartesian robotic gantry with sub-micron micro-stepper motors',
      'Pneumatic or mechanical piston syringe printheads with temperature regulation',
      'UV / Blue-light (365 nm / 405 nm) photo-crosslinking modules',
      'Heated and cooled print bed stage enclosed in HEPA containment hood',
    ],
    workingMechanism: {
      en: [
        'CAD geometry model is sliced into g-code coordinates.',
        'Temperature-controlled printhead extrudes cell-laden bioink filament through a micro-nozzle onto the stage.',
        'Photo-initiators (e.g. LAP, Irgacure) crosslink polymers upon light exposure, solidifying the architecture while preserving cell viability.',
      ],
      hinglish: [
        'Computer model se instructions milti hain aur syringe nozzle se bio-ink precise position par deposit hoti hai.',
        'Light exposure se bio-ink solidify ho jati hai aur cells 3D matrix me trap ho kar grow karti hain.',
      ],
    },
    applications: [
      'Fabricating vascularized tissue engineering constructs and skin graft models.',
      '3D in vitro organ-on-a-chip models for preclinical drug screening.',
      'Customized porous bone scaffolding implants.',
    ],
    advantages: [
      'High spatial micro-scale positioning of multiple cell types and bio-inks.',
    ],
    limitations: [
      'High nozzle shear stress can rupture cell membranes; slow fabrication speed.',
    ],
    precautions: [
      'Maintain bioink at physiological osmolarity and temperature to maximize post-print cell viability (>85%).',
    ],
    references: [
      'Murphy S.V. & Atala A. 3D bioprinting of tissues and organs. Nature Biotechnology.',
    ],
  },
  {
    slug: 'cd-spectrometer',
    name: {
      en: 'Circular Dichroism (CD) Spectropolarimeter',
      hinglish: 'Circular Dichroism (CD) Spectrometer',
    },
    category: 'Spectroscopy',
    principle: {
      en: 'Measures the difference in absorption between left-handed (AL) and right-handed (AR) circularly polarized light (delta-A = AL - AR) by optically active asymmetric molecules. Widely used to determine protein secondary structure content (alpha-helices, beta-sheets, random coils).',
      hinglish: 'Chiral molecules dwara left-handed aur right-handed circularly polarized light ki absorption difference (Delta A = AL - AR) ko measure karta hai. Protein secondary structure (alpha-helix, beta-sheet) analyze karne ka gold standard hai.',
    },
    components: [
      'High-power 150-450 W Xenon arc lamp with continuous nitrogen gas purge',
      'Double-grating prism monochromator with low stray light',
      'Photoelastic Modulator (PEM) oscillating at 50 kHz to produce circularly polarized light',
      'Far-UV quartz cuvettes (0.1 mm to 1 mm pathlength)',
      'Lock-in amplifier detector tuned to PEM oscillation frequency',
    ],
    workingMechanism: {
      en: [
        'Plane polarized light passes through the PEM quartz crystal, producing alternating left and right circularly polarized waves.',
        'Peptide bonds in chiral asymmetric environments (alpha-helices) absorb left and right components unequally.',
        'Far-UV spectra (190-250 nm) yield characteristic signatures: alpha-helices exhibit negative double minima at 208 nm and 222 nm and a positive peak at 193 nm; beta-sheets show a single negative minimum at 218 nm.',
      ],
      hinglish: [
        'Polarized light sample me se nikalti hai jahan chiral peptide bonds light absorb karte hain.',
        'Alpha-helix hone par 208 nm aur 222 nm par twin negative peaks aate hain.',
        'Beta-sheet hone par single 218 nm peak banta hai.',
      ],
    },
    applications: [
      'Quantifying protein secondary structure composition and conformational transitions.',
      'Thermal denaturation melting curves (Tm determination) for protein stability.',
      'Monitoring ligand-induced structural changes and folding kinetics.',
    ],
    advantages: [
      'Rapid, non-destructive, requires low microgram protein amounts in dilute solution.',
    ],
    limitations: [
      'Buffer components containing absorbing chlorides or carboxylates (Tris-HCl, DTT) absorb strongly below 200 nm, creating high optical noise.',
    ],
    precautions: [
      'Use 10-20 mM phosphate or fluoride buffers; avoid high chloride salts.',
      'Purge lamp housing with pure nitrogen gas (>= 5 L/min) to prevent ozone generation.',
    ],
    references: [
      'Kelly S.M., Jess T.J., Price N.C. How to study proteins by circular dichroism. Biochim Biophys Acta.',
    ],
  },
];
