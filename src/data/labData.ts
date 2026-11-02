/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BioScience Hub - Laboratory Instruments Data
 * Comprehensive data structure with verified image URLs, high-resolution working diagrams,
 * and step-by-step operating principles for all 18 laboratory instruments.
 */

export interface DetailedLabInstrument {
  id: string;
  slug: string;
  name: {
    en: string;
    hinglish: string;
  };
  category: 'Spectroscopy' | 'Separation & Centrifugation' | 'Molecular & PCR' | 'Sterilization & Culture' | 'Microscopy & Imaging' | 'Bioprocess & Advanced';
  imageUrl: string;
  imageAlt: string;
  modelDesignation: string;
  workingPrincipleSummary: {
    en: string;
    hinglish: string;
  };
  highResDiagram: {
    title: string;
    diagramType: string;
    description: {
      en: string;
      hinglish: string;
    };
    opticalOrMechanicalPath: {
      stage: number;
      component: string;
      action: string;
      scientificSignificance: string;
    }[];
  };
  stepByStepOperatingPrinciples: {
    step: number;
    title: { en: string; hinglish: string };
    instruction: { en: string; hinglish: string };
    criticalSOP: { en: string; hinglish: string };
  }[];
  hardwareComponents: {
    name: string;
    specification: string;
    function: string;
  }[];
  biotechApplications: string[];
  safetyPrecautions: string[];
  scientificFormulas?: {
    name: string;
    equation: string;
    explanation: string;
  }[];
}

export const LAB_INSTRUMENTS_DATA: DetailedLabInstrument[] = [
  // 1. UV-Visible Spectrophotometer
  {
    id: 'uv-vis-spectrophotometer',
    slug: 'uv-vis-spectrophotometer',
    name: {
      en: 'UV-Visible Spectrophotometer',
      hinglish: 'UV-Visible Spectrophotometer',
    },
    category: 'Spectroscopy',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High-precision research UV-Visible Spectrophotometer in analytical laboratory',
    modelDesignation: 'Dual-Beam Scanning Spectrophotometer (190–1100 nm)',
    workingPrincipleSummary: {
      en: 'Governed by the Beer-Lambert Law (A = ε · c · l). Determines the concentration of solutes by quantifying light absorption when a monochromatic beam passes through a liquid sample in quartz/optical glass cuvettes.',
      hinglish: 'Beer-Lambert Law (A = ε · c · l) par kaam karta hai. Monochromatic light beam sample cuvette se pass hoti hai aur absorbed light ke basis par nucleic acid aur protein concentration calculate karti hai.',
    },
    highResDiagram: {
      title: 'Dual-Beam Optical Geometry & Ray-Path Diagram',
      diagramType: 'Czerny-Turner Monochromator Optical Path',
      description: {
        en: 'Light from dual Deuterium (UV) and Tungsten-Halogen (Visible) lamps reflects through a Czerny-Turner grating monochromator, splitting via a rotating chopper mirror through sample and reference cells onto dual matched photomultiplier detectors.',
        hinglish: 'Deuterium aur Tungsten lamps se light monochromator me enter karti hai, rotating chopper mirror se reference aur sample cuvette me divide hokar dual photodiode detectors par padti hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Dual Light Source', action: 'Emits continuous UV (Deuterium 190–380 nm) and Visible (Tungsten 380–1100 nm) radiation', scientificSignificance: 'Provides full spectral coverage for biological molecules' },
        { stage: 2, component: 'Entrance Slit & Grating', action: 'Diffraction grating (1200 lines/mm) disperses radiation into discrete monochromatic wavelength bands', scientificSignificance: 'Ensures high spectral resolution (bandwidth ≤ 1.0 nm)' },
        { stage: 3, component: 'Chopper Beam Splitter', action: 'Rotating sector mirror alternates light beam between Sample and Solvent Reference cuvettes at 60 Hz', scientificSignificance: 'Compensates continuously for lamp drift and solvent absorption' },
        { stage: 4, component: 'Matched Photodetectors', action: 'Converts transmitted photon flux into micro-current; ADC outputs Absorbance = -log10(I / I0)', scientificSignificance: 'Linear dynamic range from 0.001 to 3.500 AU' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Warm-up & Lamp Alignment', hinglish: 'Warm-up aur Lamp Initialization' },
        instruction: { en: 'Power on instrument 20 minutes prior to assay to stabilize lamp thermal emission and allow internal self-calibration baseline scan.', hinglish: 'Instrument ko 20 minute pehle on karein taaki Deuterium lamp thermally stabilize ho sake.' },
        criticalSOP: { en: 'Verify baseline flatness across 200–800 nm within ± 0.002 AU.', hinglish: 'Blank scan me baseline flat honi chahiye.' },
      },
      {
        step: 2,
        title: { en: 'Blank Zero Calibration', hinglish: 'Blank Buffer se Zeroing' },
        instruction: { en: 'Fill clean Quartz cuvette with the exact matching assay buffer (e.g. 10 mM Tris-HCl, pH 8.0) and press Auto-Zero at the target wavelength.', hinglish: 'Quartz cuvette me assay buffer fill karke Auto-Zero button press karein.' },
        criticalSOP: { en: 'Always use Quartz for UV (<340 nm). Polystyrene plastic absorbs UV light and causes total signal saturation.', hinglish: 'UV range me hamesha Quartz cuvette use karein, plastic cuvette UV light block kar deti hai.' },
      },
      {
        step: 3,
        title: { en: 'Sample Loading & Optical Inspection', hinglish: 'Sample Loading aur Inspection' },
        instruction: { en: 'Pipette 1.0 mL sample slowly against cuvette wall to prevent bubble entrapment. Wipe two optical faces with lint-free lens paper.', hinglish: 'Sample bina air bubbles ke load karein aur cuvette ke clear faces ko lint-free paper se wipe karein.' },
        criticalSOP: { en: 'Fingerprints on optical faces cause artificial absorbance artifacts of 0.2–0.5 AU.', hinglish: 'Cuvette ke optical faces ko haath se kabhi na chhuein.' },
      },
      {
        step: 4,
        title: { en: 'Absorbance Readout & Ratio Analysis', hinglish: 'Readout aur Purity Ratio' },
        instruction: { en: 'Measure A260, A280, and A230. Compute nucleic acid concentration: dsDNA (µg/mL) = A260 × 50; assess purity ratio A260/A280 (1.8 for pure DNA, 2.0 for pure RNA).', hinglish: 'A260 aur A280 measure karein. dsDNA conc = A260 × 50 µg/mL. Purity ratio 1.8 pure DNA represent karta hai.' },
        criticalSOP: { en: 'Dilute sample if A260 > 1.5 AU to remain within the certified Beer-Lambert linear range.', hinglish: 'Agar Absorbance > 1.5 AU ho toh sample dilute karein.' },
      },
      {
        step: 5,
        title: { en: 'Rinsing & Cuvette Storage', hinglish: 'Cuvette Cleaning aur Storage' },
        instruction: { en: 'Immediately aspirate sample. Rinse cuvette 5 times with Milli-Q water followed by absolute ethanol. Invert on lint-free tissue to air dry.', hinglish: 'Sample nikal kar cuvette ko Milli-Q water aur ethanol se rinse karein.' },
        criticalSOP: { en: 'Never sonicate quartz cuvettes; thermal micro-shocks crack optical bond lines.', hinglish: 'Quartz cuvettes ko kabhi sonicate na karein.' },
      },
    ],
    hardwareComponents: [
      { name: 'Deuterium Arc Lamp', specification: '30W pre-aligned lamp, 190–380 nm spectral output', function: 'UV light source for nucleic acids and peptide bonds' },
      { name: 'Tungsten-Halogen Lamp', specification: '20W halogen lamp, 350–1100 nm spectral output', function: 'Visible/NIR light source for colorimetric Bradford, BCA, and OD600 assays' },
      { name: 'Holographic Grating', specification: '1200 lines/mm blazed at 250 nm', function: 'Isolates monochromatic wavelength bands' },
      { name: 'Silicon Photodiode Array', specification: 'Multi-element detector with low dark current (<0.1 pA)', function: 'Quantifies transmitted light intensity' },
    ],
    biotechApplications: [
      'Quantification of DNA, RNA, and synthetic oligonucleotides (A260).',
      'Determination of nucleic acid purity ratios (A260/A280 and A260/A230).',
      'Total protein estimation via direct A280 or colorimetric assays (Bradford 595 nm, BCA 562 nm, Lowry 660 nm).',
      'Continuous enzyme kinetics (e.g. NAD+/NADH redox cycling at 340 nm).',
      'Microbial cell growth density monitoring at OD600.',
    ],
    safetyPrecautions: [
      'Never stare into the Deuterium lamp aperture; intense UV emission causes acute photokeratitis.',
      'Always dispose of hazardous solvents (phenol, chloroform) in designated toxic waste containers.',
    ],
    scientificFormulas: [
      { name: 'Beer-Lambert Law', equation: 'A = ε · c · l = -log10(I / I0)', explanation: 'Relates absorbance (A) directly to molar extinction coefficient (ε), concentration (c), and pathlength (l).' },
    ],
  },

  // 2. Centrifuge & Ultracentrifuge
  {
    id: 'centrifuge',
    slug: 'centrifuge',
    name: {
      en: 'Refrigerated High-Speed Centrifuge',
      hinglish: 'Refrigerated Centrifuge',
    },
    category: 'Separation & Centrifugation',
    imageUrl: 'https://images.unsplash.com/photo-1579165466791-78822d31e050?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Laboratory benchtop refrigerated centrifuge with rotor bowl and digital interface',
    modelDesignation: 'Refrigerated Floor/Benchtop Microcentrifuge (Up to 21,000 × g)',
    workingPrincipleSummary: {
      en: 'Exploits artificial centrifugal acceleration (RCF = 1.118 × 10^-5 · r · RPM^2) to dramatically amplify gravitational sedimentation, fractionating cellular components, organelles, and macromolecules based on size, shape, and buoyant density.',
      hinglish: 'Centrifugal force ke through particles ko unke molecular weight aur density ke basis par separate karta hai. Heavy particles pellet banate hain aur light molecules supernatant me rehte hain.',
    },
    highResDiagram: {
      title: 'Centrifugal Radial Force Vectors & Rotor Geometry',
      diagramType: 'Fixed-Angle vs. Swinging-Bucket Sedimentation Mechanics',
      description: {
        en: 'Rotor spinning at angular velocity omega generates radial centrifugal force F_c = m · omega^2 · r opposing buoyant force F_b and frictional drag F_d, driving particles along outward vectors to form a tightly packed pellet at the tube bottom.',
        hinglish: 'Fast rotating rotor centrifugal force generate karta hai jo buoyant force aur friction ko overcome karke biological particles ko tube bottom me precipitate kar deta hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Brushless Induction Motor', action: 'Direct-drive frequency-controlled motor accelerates smoothly to preset RPM (up to 15,000 RPM)', scientificSignificance: 'Eliminates carbon brush particulate contamination' },
        { stage: 2, component: 'Armored Steel Containment Bowl', action: 'Heavy-gauge steel shield absorbs kinetic energy in the event of rare catastrophic rotor failure', scientificSignificance: 'Protects laboratory personnel from high-velocity projectile damage' },
        { stage: 3, component: 'CFC-Free Refrigeration System', action: 'High-capacity compressor circulates refrigerant around rotor bowl maintaining 4°C ± 1°C under high vacuum', scientificSignificance: 'Prevents thermal denaturation of sensitive enzymes and RNA' },
        { stage: 4, component: 'Dynamic Electronic Braking', action: 'Microprocessor calculates smooth deceleration curves without fluid shear disruption of pellet', scientificSignificance: 'Prevents resuspension of delicate mitochondrial or bacterial pellets' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Symmetric Gravimetric Balancing', hinglish: 'Analytical Counterbalance Loading' },
        instruction: { en: 'Weigh opposing tubes on an analytical balance with liquid volumes matched to within ± 0.05 grams. Insert tubes strictly across 180° diametric positions in the rotor.', hinglish: 'Opposing tubes ko balance par weigh karein (difference < 0.05 g) aur 180 degree aamne-saamne load karein.' },
        criticalSOP: { en: 'Imbalanced rotors spinning at >10,000 RPM cause catastrophic shaft spindle fracture and fatal rotor burst.', hinglish: 'Imbalanced rotor high speed par explode ho sakta hai.' },
      },
      {
        step: 2,
        title: { en: 'Aerosol-Tight Rotor Lid Locking', hinglish: 'Rotor Lid Tightening' },
        instruction: { en: 'Screw down the aluminum aerosol-tight containment lid until the torque-limiting clutch clicks securely in place.', hinglish: 'Aerosol-tight lid ko tightly lock karein taaki biohazard aerosols bahar na aayein.' },
        criticalSOP: { en: 'Never spin an open rotor without its certified biocontainment lid.', hinglish: 'Bina lid ke rotor kabhi na chalayein.' },
      },
      {
        step: 3,
        title: { en: 'Parameter Programming (RCF, Temp, Time)', hinglish: 'Parameters Set Karna' },
        instruction: { en: 'Program target Relative Centrifugal Force (e.g. 14,000 × g rather than raw RPM), chamber temperature (4°C for RNA/proteins), and run duration (10 min).', hinglish: 'Target RCF (e.g. 14,000 g), temperature (4°C), aur timer set karein.' },
        criticalSOP: { en: 'Always program RCF rather than RPM when replicating protocols; different rotor radii yield vastly different G-forces at the same RPM.', hinglish: 'Protocols me hamesha RCF (g) note karein, RPM rotor radius ke sath change hota hai.' },
      },
      {
        step: 4,
        title: { en: 'Acceleration & Run Monitoring', hinglish: 'Run Start aur Observation' },
        instruction: { en: 'Press Start. Remain next to instrument during the initial 60-second ramp-up until full operating speed is reached without abnormal vibration.', hinglish: 'Start dabayein aur full speed aane tak pass khade rehkar abnormal vibration check karein.' },
        criticalSOP: { en: 'If excessive vibration or rattling sound occurs, hit EMERGENCY STOP immediately.', hinglish: 'Abnormal sound aane par turant Emergency Stop dabayein.' },
      },
      {
        step: 5,
        title: { en: 'Deceleration & Immediate Harvest', hinglish: 'Deceleration aur Sample Aspiration' },
        instruction: { en: 'Wait until tachometer reaches 0 RPM and safety solenoid clicks open. Remove tubes carefully without tilting and aspirate supernatant.', hinglish: 'Rotor complete stop hone par lid open karein aur bina hilaye supernatant nikal lein.' },
        criticalSOP: { en: 'Never defeat the lid safety interlock pin with a screwdriver or bypass tool.', hinglish: 'Lid interlock pin ko manually bypass na karein.' },
      },
    ],
    hardwareComponents: [
      { name: 'Fixed-Angle Titanium Rotor', specification: '24 × 1.5/2.0 mL positions, 45° tube bore angle', function: 'Provides rapid pelleting of DNA and bacterial lysates' },
      { name: 'Induction Spindle Motor', specification: 'High-torque brushless DC motor, 200–15,000 RPM range', function: 'Drives rotational acceleration' },
      { name: 'Chamber Temperature Sensor', specification: 'Platinum RTD Pt100 probe accurate to ± 0.5°C', function: 'Monitors bowl cooling' },
      { name: 'Safety Lid Interlock', specification: 'Dual electromagnetic solenoid catch pin', function: 'Prevents lid opening while rotor is in motion' },
    ],
    biotechApplications: [
      'Pelleting recombinant bacterial cultures (E. coli, Pichia pastoris).',
      'Precipitation and harvesting of plasmid DNA, genomic DNA, and total RNA.',
      'Subcellular organelle fractionation (nuclei, mitochondria, microsomes).',
      'Clarification of cell culture media prior to chromatography column loading.',
    ],
    safetyPrecautions: [
      'Check titanium rotors every 6 months for pitting corrosion or stress micro-fractures.',
      'Never exceed maximum rated speed etched on rotor body for the specific tube adapter density.',
    ],
    scientificFormulas: [
      { name: 'Relative Centrifugal Force (RCF)', equation: 'RCF = 1.118 × 10^-5 × r × RPM^2', explanation: 'Calculates centrifugal acceleration as a multiple of Earth gravitational acceleration (g), where r is radius in cm.' },
    ],
  },

  // 3. Precision Micropipette
  {
    id: 'micropipette',
    slug: 'micropipette',
    name: {
      en: 'Air-Displacement Precision Micropipette',
      hinglish: 'Precision Micropipette',
    },
    category: 'Separation & Centrifugation',
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Scientist aspirating liquid with multi-channel and single-channel precision micropipettes',
    modelDesignation: 'Variable-Volume Air-Displacement Pipette (0.1–1000 µL)',
    workingPrincipleSummary: {
      en: 'Operates via an internal spring-loaded piston that displaces an exact calibrated volume of air, creating a partial vacuum that aspirates an equivalent volume of liquid into a disposable polypropylene tip.',
      hinglish: 'Air-displacement piston principle par work karta hai. Piston compress karne se air displace hoti hai aur exact calibrated volume liquid tip me draw hota hai.',
    },
    highResDiagram: {
      title: 'Internal Mechanical Anatomy & Two-Stop Plunger Travel',
      diagramType: 'Cross-Sectional Mechanical Piston Schematic',
      description: {
        en: 'Spring-loaded piston travel with calibrated volume micrometer, fluoropolymer O-ring seal, and stainless steel piston cylinder displaying First Stop (calibrated volume aspirate/dispense) and Second Stop (blowout capillary clearance).',
        hinglish: 'Internal micrometer se volume set hota hai; first stop calibrated volume aspirate karta hai aur second stop blowout droplet clear karta hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Digital Volume Micrometer', action: 'Precision counter mechanism sets piston stroke length down to 0.02 µL increments', scientificSignificance: 'Ensures systematic volume reproducibility (CV < 0.6%)' },
        { stage: 2, component: 'Fluoropolymer Seal & O-Ring', action: 'Creates airtight pneumatic seal between polished stainless steel piston and tip cone', scientificSignificance: 'Maintains vacuum column without capillary liquid creep' },
        { stage: 3, component: 'Two-Stage Plunger Spring', action: 'Initial spring resistance defines exact stroke; secondary heavy spring permits blowout', scientificSignificance: 'Prevents residual droplet retention inside the tip orifice' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Volume Setting & Locking', hinglish: 'Volume Dial Set Karna' },
        instruction: { en: 'Turn volume dial slightly above target volume then descend down to the calibrated line to eliminate mechanical backlash. Engage the lock ring.', hinglish: 'Volume dial ko set karein aur lock ring engage karein taaki setting change na ho.' },
        criticalSOP: { en: 'Never rotate the dial past the certified maximum or below the minimum limit; this strips the internal micrometer threads.', hinglish: 'Pipette range ke bahar dial kabhi na ghumayein.' },
      },
      {
        step: 2,
        title: { en: 'Tip Seating & Pre-Wetting', hinglish: 'Tip Attachment aur Pre-wetting' },
        instruction: { en: 'Press tip cone firmly into the tip box with a slight rotational twist. Aspirate and dispense the assay liquid 3 times to equilibrate tip vapor pressure.', hinglish: 'Tip tightly lagayein aur 3 baar liquid aspirate-dispense karke pre-wet karein.' },
        criticalSOP: { en: 'Pre-wetting is essential for accurate delivery of volatile solvents, ethanol, and warm buffers.', hinglish: 'Pre-wetting se capillary evaporation aur volume error eliminate hota hai.' },
      },
      {
        step: 3,
        title: { en: 'Aspiration at 90° Vertical Meniscus', hinglish: 'Vertical Aspiration' },
        instruction: { en: 'Depress plunger to FIRST STOP outside liquid. Immerse tip 2–3 mm below liquid surface strictly vertically (90°). Release plunger smoothly over 1–2 seconds.', hinglish: 'First stop tak press karke liquid me 2-3 mm dip karein aur 90 degree vertical release karein.' },
        criticalSOP: { en: 'Releasing plunger abruptly causes liquid to shoot up into the barrel, corroding the internal piston and contaminating future assays.', hinglish: 'Plunger ko jhatke se mat chodiye, slow release karein.' },
      },
      {
        step: 4,
        title: { en: 'Dispensing & Second Stop Blowout', hinglish: 'Dispense aur Blowout' },
        instruction: { en: 'Touch tip at a 45° angle against the inner wall of the recipient tube. Depress plunger smoothly to the FIRST STOP, wait 1 second, then push through to SECOND STOP to purge final droplet.', hinglish: 'Tube wall se touch karke 1st stop tak press karein fir 2nd blowout stop tak press karke drop nikal dein.' },
        criticalSOP: { en: 'Do not release plunger until the tip has been lifted completely clear of the liquid meniscus.', hinglish: 'Tip bahar nikalne ke baad hi plunger release karein.' },
      },
      {
        step: 5,
        title: { en: 'Tip Ejection & Stand Storage', hinglish: 'Tip Eject aur Stand par Rakhna' },
        instruction: { en: 'Press tip ejector button over biohazard waste. Hang pipette vertically on a carousel stand.', hinglish: 'Tip ejector se tip waste me dispose karein aur pipette stand par hang karein.' },
        criticalSOP: { en: 'NEVER lay a micropipette horizontally on the bench with liquid in the tip. Liquid will flow into the piston cylinder.', hinglish: 'Liquid bhare tip ke sath pipette bench par flat kabhi na rakhein.' },
      },
    ],
    hardwareComponents: [
      { name: 'Stainless Steel Piston', specification: 'Ultra-polished 316 stainless steel with ceramic coating', function: 'Displaces exact volume of air' },
      { name: 'Tip Cone', specification: 'Autoclavable PVDF with chemical-resistant O-ring', function: 'Seats disposable polypropylene tips' },
      { name: 'Tip Ejector Arm', specification: 'Spring-assisted stainless steel ejection sleeve', function: 'Releases contaminated tips without manual touch' },
    ],
    biotechApplications: [
      'Assembling nanoliter-to-microliter PCR and qPCR reaction master mixes.',
      'Loading SDS-PAGE and agarose electrophoresis gel wells.',
      'Serial dilutions for ELISA antibody titers and bacterial colony counting.',
      'Aseptic cell culture media supplementation with cytokines and antibiotics.',
    ],
    safetyPrecautions: [
      'Always use dedicated aerosol-barrier filter tips when handling radioactive isotopes, viral vectors, or PCR amplicons.',
    ],
  },

  // 4. Digital pH Meter
  {
    id: 'ph-meter',
    slug: 'ph-meter',
    name: {
      en: 'Digital Benchtop pH Meter & Combination Electrode',
      hinglish: 'Digital pH Meter',
    },
    category: 'Spectroscopy',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Precision benchtop digital pH meter with glass combination electrode and buffer standards',
    modelDesignation: 'Multi-Parameter Benchtop pH/mV/Temp Meter (0.001 Resolution)',
    workingPrincipleSummary: {
      en: 'Potentiometrically measures hydrogen ion thermodynamic activity (aH+) across a hydrated lithium silicate glass bulb membrane based on the Nernst Equation: E = E0 - (2.303 · R · T / F) · pH.',
      hinglish: 'Hydrogen ion activity ko potentiometrically measure karta hai. Glass bulb membrane aur reference Ag/AgCl electrode ke beech electrical voltage difference se pH display hota hai.',
    },
    highResDiagram: {
      title: 'Combination Glass/Reference Electrode Electrochemistry',
      diagramType: 'Nernstian Electrochemical Half-Cell Schematic',
      description: {
        en: 'Diagram shows internal Ag/AgCl reference half-cell immersed in 3M KCl electrolyte, porous ceramic liquid junction wick, hydrated gel layer on both surfaces of the glass bulb, and millivolt delta transmission to the high-impedance voltmeter.',
        hinglish: 'Glass bulb membrane ke dono taraf H+ ions ke exchange se potential difference banta hai jise millivoltmeter calibrated pH me convert karta hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Hydrated Glass Bulb Gel Layer', action: 'Outer and inner surfaces of thin glass membrane hydrate, permitting selective H+ ion exchange with solution', scientificSignificance: 'Generates boundary phase potential proportional to pH' },
        { stage: 2, component: 'Porous Ceramic Junction', action: 'Allows slow, steady diffusion of 3M KCl electrolyte to complete electrical circuit with reference wire', scientificSignificance: 'Provides stable reference potential without sample poisoning' },
        { stage: 3, component: 'Automatic Temperature Compensation (ATC)', action: 'Pt100 RTD probe continuously corrects the Nernstian slope factor (59.16 mV/pH at 25°C vs 61.54 mV/pH at 37°C)', scientificSignificance: 'Eliminates temperature-dependent measurement skew' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Electrode Inspection & Hydration Check', hinglish: 'Electrode Inspection' },
        instruction: { en: 'Remove electrode from 3M KCl storage sleeve. Inspect glass bulb for air bubbles (flick gently like a clinical thermometer) and check that internal KCl level is full.', hinglish: 'Electrode ko 3M KCl sleeve se nikalein aur glass bulb me koi air bubble na ho check karein.' },
        criticalSOP: { en: 'Never allow glass electrode to dry out. A dry membrane requires 24 hours of rehydration in 3M KCl.', hinglish: 'Glass bulb ko dry mat hone dein, hamesha 3M KCl me store karein.' },
      },
      {
        step: 2,
        title: { en: 'Three-Point Standard Calibration', hinglish: '3-Point Buffer Calibration' },
        instruction: { en: 'Calibrate using fresh NIST-traceable standard buffers: pH 7.00 (Zero point), followed by pH 4.01 (Acidic slope) and pH 10.01 (Basic slope).', hinglish: 'Fresh buffers pH 7.00, 4.01, aur 10.01 se meter calibrate karein.' },
        criticalSOP: { en: 'Electrode slope MUST be between 95% and 102% (56.2 to 60.3 mV/pH). If slope is <95%, clean electrode in 0.1M HCl.', hinglish: 'Electrode slope 95% se 102% ke beech hona chahiye.' },
      },
      {
        step: 3,
        title: { en: 'Rinsing & Blotting Technique', hinglish: 'Rinsing aur Blotting' },
        instruction: { en: 'Rinse electrode with a stream of deionized water between buffers. Blot gently with a lint-free Kimwipe.', hinglish: 'Har buffer ke baad deionized water se rinse karein aur Kimwipe se softly blot karein.' },
        criticalSOP: { en: 'NEVER wipe or rub the glass bulb vigorously; rubbing creates static electrical charges that cause erratic pH drift for hours.', hinglish: 'Glass bulb ko ragad kar saaf mat karein, static charge develop ho sakta hai.' },
      },
      {
        step: 4,
        title: { en: 'Sample Measurement under Moderate Stirring', hinglish: 'Sample Testing' },
        instruction: { en: 'Immerse electrode and ATC temperature probe into sample beaker. Stir moderately with a magnetic stir bar without hitting the glass bulb. Wait for stable readout indicator.', hinglish: 'Sample me electrode dip karein, magnetic stirrer slow run karein aur stable sign aane par reading lein.' },
        criticalSOP: { en: 'Ensure the porous ceramic junction (1 cm above bulb) is fully submerged in the liquid.', hinglish: 'Ceramic junction liquid me completely submerge hona chahiye.' },
      },
      {
        step: 5,
        title: { en: 'Storage in 3M KCl Solution', hinglish: 'Proper Storage' },
        instruction: { en: 'Rinse electrode thoroughly with DI water and return to protective storage cap filled with 3M KCl electrolyte.', hinglish: 'Test complete hone par DI water se dho kar 3M KCl storage cap me rakh dein.' },
        criticalSOP: { en: 'NEVER store electrode in deionized or distilled water; pure water leaches lithium/potassium ions out of the membrane glass.', hinglish: 'Distilled water me kabhi store na karein, ions leach out ho jate hain.' },
      },
    ],
    hardwareComponents: [
      { name: 'Lithium Silicate Glass Bulb', specification: 'H+ selective thin-walled glass membrane, 0–14 pH range', function: 'Translates [H+] activity into electrical potential' },
      { name: 'Internal Ag/AgCl Reference Half-Cell', specification: 'Silver wire coated with AgCl immersed in saturated 3M KCl', function: 'Maintains constant reference potential' },
      { name: 'Porous Ceramic Junction', specification: 'Flow rate: 15–20 µL/hour', function: 'Completes electrical circuit with sample solution' },
      { name: 'ATC Temperature Probe', specification: 'Pt100 Platinum resistance thermometer', function: 'Compensates temperature fluctuations' },
    ],
    biotechApplications: [
      'Formulation of biological buffers (Tris-HCl, Phosphate Buffered Saline, HEPES, MOPS).',
      'Monitoring fermentation medium pH during microbial bioprocessing in bioreactors.',
      'Checking isoelectric precipitation points of recombinant proteins.',
      'Quality control testing of chemical reagents and intravenous pharmaceuticals.',
    ],
    safetyPrecautions: [
      'Handle fragile glass electrode bulb with care; cracked glass releases concentrated KCl into samples.',
    ],
    scientificFormulas: [
      { name: 'Nernst Equation for pH', equation: 'E = E0 - (2.303 · R · T / F) · pH', explanation: 'At 25°C (298.15 K), the theoretical slope is 59.16 mV per pH unit change.' },
    ],
  },

  // 5. Thermal Cycler (PCR Machine)
  {
    id: 'pcr-machine',
    slug: 'pcr-machine',
    name: {
      en: 'Thermal Cycler (Conventional PCR Machine)',
      hinglish: 'Thermal Cycler (PCR Machine)',
    },
    category: 'Molecular & PCR',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Molecular biology thermal cycler with heated lid and 96-well block',
    modelDesignation: '96-Well Gradient Thermal Cycler (Ramp Rate up to 5°C/sec)',
    workingPrincipleSummary: {
      en: 'Amplifies specific DNA sequences billions of times in vitro through repetitive cycles of thermal denaturation (~95°C), oligonucleotide primer annealing (~50–65°C), and enzymatic primer extension (~72°C) catalyzed by thermostable DNA polymerase.',
      hinglish: 'DNA target sequence ko millions of times amplify karne ke liye 3 steps follow karta hai: Denaturation (95°C), Annealing (55°C), aur Extension (72°C) using thermostable Taq polymerase.',
    },
    highResDiagram: {
      title: 'Peltier Heat Pump & 3-Step Thermocycling Profile',
      diagramType: 'Solid-State Thermoelectric Heating/Cooling Architecture',
      description: {
        en: 'Diagram illustrates semiconductor Peltier junctions creating rapid heating and active cooling across the gold-plated silver block, motorized heated lid maintained at 105°C preventing condensation, and exponential 2^n amplicon expansion curve.',
        hinglish: 'Peltier elements rapidly block ko heat aur cool karte hain; 105°C heated lid tube cap par condensation rokta hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Solid-State Peltier Elements', action: 'Directs electric current across semiconductor junctions to rapidly pump heat into or out of the sample block (up to 5°C/sec)', scientificSignificance: 'Ensures tight thermal uniformity (± 0.2°C across all 96 wells)' },
        { stage: 2, component: 'Motorized Heated Lid (105°C)', action: 'Heats upper air cavity of reaction tubes to 105°C, higher than the reaction liquid temperature', scientificSignificance: 'Completely eliminates vapor condensation on tube caps, preserving reaction volume' },
        { stage: 3, component: 'Thermal Gradient Engine', action: 'Establishes precise temperature gradient across columns (e.g. 50°C to 65°C) simultaneously', scientificSignificance: 'Permits empirical determination of optimal primer annealing temperature in a single run' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Reaction Assembly on Ice', hinglish: 'Reaction Mix Preparation' },
        instruction: { en: 'Assemble PCR cocktail on ice: 1X Taq buffer (with 1.5–2.5 mM MgCl2), 200 µM dNTPs, 0.4 µM forward primer, 0.4 µM reverse primer, 10–50 ng template DNA, and 1.25 U Taq polymerase.', hinglish: 'Ice par PCR reagents assemble karein: Buffer, MgCl2, dNTPs, Primers, Template DNA aur Taq polymerase.' },
        criticalSOP: { en: 'Always assemble in a designated pre-PCR laminar clean hood with aerosol-barrier filter tips to prevent amplicon contamination.', hinglish: 'Filter tips use karein taaki carryover contamination na ho.' },
      },
      {
        step: 2,
        title: { en: 'Spin Down & Inspection', hinglish: 'Centrifuge Spin Down' },
        instruction: { en: 'Cap 0.2 mL strip tubes tightly. Pulse-spin in a mini-centrifuge for 5 seconds to collect all droplets at the tube bottom and dislodge bubbles.', hinglish: 'Mini-centrifuge me 5 second spin karein taaki sara liquid tube bottom me collect ho jaye.' },
        criticalSOP: { en: 'Air bubbles at the tube bottom insulate reaction mix from block heat transfer, causing failed amplification.', hinglish: 'Tube bottom me koi air bubble nahi hona chahiye.' },
      },
      {
        step: 3,
        title: { en: 'Heated Lid Pre-Heating', hinglish: 'Heated Lid Pre-heating' },
        instruction: { en: 'Load tubes into the 96-well block. Close and latch lid. Verify heated lid is set to 105°C.', hinglish: 'Tubes load karke lid band karein aur confirm karein heated lid 105°C par set hai.' },
        criticalSOP: { en: 'If the heated lid is left off, reaction volume evaporates and condenses on the cap, concentrating salts and halting polymerase activity.', hinglish: 'Heated lid off hone par reaction evaporate ho jayegi.' },
      },
      {
        step: 4,
        title: { en: 'Executing 3-Step PCR Program', hinglish: 'Program Execution' },
        instruction: { en: 'Run program: Initial Denaturation (95°C for 3 min); 30–35 Cycles of [95°C for 30s -> Annealing (Tm - 5°C) for 30s -> 72°C for 1 min/kb]; Final Extension (72°C for 5 min); Hold at 4°C.', hinglish: 'Program run karein: 95°C (3 min) -> 30-35 cycles [95°C 30s -> Annealing 30s -> 72°C 1 min] -> 72°C final extension -> 4°C hold.' },
        criticalSOP: { en: 'Verify annealing temperature matches calculated primer Tm; too high prevents binding, too low causes non-specific off-target bands.', hinglish: 'Annealing temperature primer Tm ke mutabiq accurately set karein.' },
      },
      {
        step: 5,
        title: { en: 'Unloading & Gel Electrophoresis Verification', hinglish: 'Gel Loading Verification' },
        instruction: { en: 'Remove tubes once run enters 4°C hold. Store at -20°C or proceed directly to 1.2% agarose gel electrophoresis to confirm specific amplicon band size.', hinglish: 'Run complete hone par 1.2% agarose gel par band size verify karein.' },
        criticalSOP: { en: 'Never leave amplified tubes sitting at 4°C over a weekend; residual polymerase exonuclease activity degrades product.', hinglish: 'Samples ko 4°C par lambe samay tak mat chodiye, -20°C me store karein.' },
      },
    ],
    hardwareComponents: [
      { name: 'Silver Gold-Plated 96-Well Block', specification: 'High thermal conductivity silver core with inert gold plating', function: 'Holds 0.2 mL thin-walled PCR tubes' },
      { name: 'Semiconductor Peltier Elements', specification: 'Bismuth telluride thermoelectric modules (6 zones)', function: 'Drives rapid heating and cooling' },
      { name: 'Heated Motorized Lid', specification: 'Independent heating plate maintained at 105°C', function: 'Prevents sample condensation' },
    ],
    biotechApplications: [
      'Gene cloning, insert amplification, and restriction site incorporation.',
      'Clinical diagnostic screening for genetic mutations, viral pathogens, and hereditary diseases.',
      'Forensic STR profiling and parentage analysis.',
      'Site-directed mutagenesis and template preparation for Sanger/NGS sequencing.',
    ],
    safetyPrecautions: [
      'Do not touch block or underside of heated lid immediately after opening; surface temperatures reach 105°C.',
    ],
    scientificFormulas: [
      { name: 'Exponential Amplification Formula', equation: 'N = N0 × (1 + E)^n', explanation: 'Yields final copy number (N) from initial template copies (N0), efficiency (E ≈ 1.0), and number of cycles (n).' },
    ],
  },

  // 6. Quantitative Real-Time PCR (qPCR)
  {
    id: 'real-time-pcr',
    slug: 'real-time-pcr',
    name: {
      en: 'Quantitative Real-Time PCR (qPCR)',
      hinglish: 'Real-Time Quantitative PCR (qPCR)',
    },
    category: 'Molecular & PCR',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Quantitative Real-Time PCR machine with optical multi-channel fluorescence detection',
    modelDesignation: 'Multi-Plex 5-Channel Real-Time PCR Detection System',
    workingPrincipleSummary: {
      en: 'Combines thermal cycling with continuous optical fluorescence measurement in real time. Employs intercalating dyes (SYBR Green I) or fluorophore-quencher probes (TaqMan) to quantify amplicon accumulation during the exponential phase via Cycle Threshold (Ct).',
      hinglish: 'Thermal cycling ke sath real-time fluorescence detection combine karta hai. Har cycle me bante hue DNA amplicons ko SYBR Green ya TaqMan probe se detect karke exact initial copy number (Ct value) calculate karta hai.',
    },
    highResDiagram: {
      title: 'Confocal Optical Shuttle & Multi-Channel Fluorophore System',
      diagramType: 'Real-Time Optical Excitation/Emission Scanner',
      description: {
        en: 'Optical scanning head shuttles over 96 optical wells, firing discrete LED wavelengths (FAM, HEX, ROX, Cy5) and focusing emitted photons through emission filters into a cooled scientific CCD/CMOS sensor, plotting sigmoidal amplification curves and post-run derivative melting curves (-dF/dT).',
        hinglish: 'Optical shuttle LEDs se excite karke fluorescence emission measure karta hai aur real-time me amplification curve aur melt curve plot karta hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'High-Power Multi-Wavelength LEDs', action: 'Delivers filtered excitation light (450–680 nm) focused vertically into optical wells', scientificSignificance: 'Zero cross-talk between multiplexed reporter channels' },
        { stage: 2, component: 'Optical Fiber Collection Bundle', action: 'Gathers fluorescence emission at the exact completion of each 72°C extension step', scientificSignificance: 'Eliminates positional edge-effect optical bias' },
        { stage: 3, component: 'Scientific CMOS Sensor Array', action: 'Converts fluorescence flux into calibrated relative fluorescence units (RFU)', scientificSignificance: 'Dynamic range exceeding 9 logarithmic orders of magnitude' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Optical Plate Preparation & Sealing', hinglish: 'Optical Plate Sealing' },
        instruction: { en: 'Pipette qPCR reactions (typically 10–20 µL) into white-walled optical 96-well plates. Seal with optical-grade transparent adhesive film using a rubber roller.', hinglish: 'Optical plate me 10-20 µL reaction load karein aur optical adhesive film se tightly seal karein.' },
        criticalSOP: { en: 'Never touch the top surface of the optical seal with bare fingers; oil fingerprints scatter laser light and generate spurious Ct spikes.', hinglish: 'Optical film par fingerprints bilkul na lagayein.' },
      },
      {
        step: 2,
        title: { en: 'Plate Centrifugation (Bubble Elimination)', hinglish: 'Plate Centrifugation' },
        instruction: { en: 'Centrifuge the sealed plate in a swing-out plate rotor at 1000 × g for 1 minute at room temperature.', hinglish: 'Plate ko swing-bucket centrifuge me 1000 g par 1 minute spin karein.' },
        criticalSOP: { en: 'Every meniscus must be perfectly flat and 100% free of micro-bubbles before initiating optical scanning.', hinglish: 'Wells me micro-bubbles nahi hone chahiye.' },
      },
      {
        step: 3,
        title: { en: 'Plate Layout & Fluorophore Assignment', hinglish: 'Software me Plate Setup' },
        instruction: { en: 'Assign well types in software: Standards (known dilution series), Unknowns, and No-Template Controls (NTC). Define fluorophores (e.g. FAM for target gene, VIC/HEX for reference housekeeping gene).', hinglish: 'Software me Standards, Unknowns, aur NTC assign karein; FAM aur reference dye set karein.' },
        criticalSOP: { en: 'Always include triplicate NTC wells to establish absence of primer-dimers or reagent contamination.', hinglish: 'Triplicate NTC controls zaroor include karein.' },
      },
      {
        step: 4,
        title: { en: 'Run Cycling with Melt Curve Stage', hinglish: 'Melt Curve Stage Run Karna' },
        instruction: { en: 'Execute standard 40-cycle run followed immediately by a continuous Dissociation / Melt Curve Stage (65°C to 95°C at 0.5°C increments with continuous fluorescence acquisition).', hinglish: '40 cycles ke baad continuous Dissociation / Melt Curve stage (65°C se 95°C) zaroor run karein.' },
        criticalSOP: { en: 'For SYBR Green assays, a single sharp derivative melt peak (-dF/dT) confirms specific amplicon amplification; multiple peaks indicate non-specific amplification or primer-dimers.', hinglish: 'Single melt peak specific product confirm karta hai.' },
      },
      {
        step: 5,
        title: { en: 'Baseline & Threshold Analysis (ΔΔCt Method)', hinglish: 'Ct Threshold aur ΔΔCt Analysis' },
        instruction: { en: 'Set baseline (typically cycles 3–15) and position threshold line in the exponential phase. Calculate relative expression fold-change using the Livak 2^(-ΔΔCt) method.', hinglish: 'Threshold line exponential phase me set karein aur 2^(-ΔΔCt) method se fold-change nikal lein.' },
        criticalSOP: { en: 'Check that standard curve amplification efficiency (E) is between 90% and 110% (slope between -3.58 and -3.10; R^2 > 0.99).', hinglish: 'Standard curve efficiency 90% se 110% ke beech honi chahiye.' },
      },
    ],
    hardwareComponents: [
      { name: 'Multi-Color Filter Carousel', specification: '5 excitation and 5 emission interference optical filters', function: 'Isolates FAM, SYBR, VIC, ROX, and Cy5 wavelengths' },
      { name: 'Cooled CCD/sCMOS Camera', specification: 'Back-illuminated sensor cooled to -20°C', function: 'Captures faint fluorescence emission photons' },
      { name: 'Peltier Block with Gradient', specification: 'Ramp rate 4.5°C/sec, thermal precision ± 0.1°C', function: 'Performs rapid cycling' },
    ],
    biotechApplications: [
      'Gene expression profiling and mRNA transcript quantification.',
      'Absolute quantification of viral loads (HIV, Hepatitis B, SARS-CoV-2).',
      'Copy Number Variation (CNV) and single nucleotide polymorphism (SNP) genotyping.',
      'Validation of RNA interference (RNAi) and CRISPR knockdown efficiency.',
    ],
    safetyPrecautions: [
      'Never open plate seals post-amplification; qPCR plates contain trillions of amplicons that permanently contaminate laboratory air.',
    ],
    scientificFormulas: [
      { name: 'Livak 2^(-ΔΔCt) Method', equation: 'Fold Change = 2^-(ΔCt_treated - ΔCt_control)', explanation: 'Where ΔCt = Ct_target - Ct_reference housekeeping gene (GAPDH/Actin).' },
    ],
  },

  // 7. Horizontal & Vertical Gel Electrophoresis
  {
    id: 'gel-electrophoresis-system',
    slug: 'gel-electrophoresis-system',
    name: {
      en: 'Gel Electrophoresis System (Horizontal & Vertical)',
      hinglish: 'Gel Electrophoresis System',
    },
    category: 'Separation & Centrifugation',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Agarose gel electrophoresis submarine unit and SDS-PAGE vertical apparatus under electric current',
    modelDesignation: 'Horizontal Submarine Mini-Gel & Vertical Mini-PROTEAN Unit',
    workingPrincipleSummary: {
      en: 'Separates charged biomolecules (DNA, RNA, proteins) through a porous polymer mesh (agarose or polyacrylamide) driven by an electric field. Negatively charged nucleic acids migrate toward the positive anode (Red) at rates inversely proportional to log10(Molecular Weight).',
      hinglish: 'Charged biomolecules (DNA, proteins) ko electric field apply karke porous matrix (Agarose ya Polyacrylamide) ke through unke size ke basis par separate karta hai. DNA cathode (-) se anode (+) ki taraf move karta hai.',
    },
    highResDiagram: {
      title: 'Electrophoretic Chamber Electrical Field & Molecular Sieving',
      diagramType: 'Submarine Agarose Tank & Pore Sieve Dynamics',
      description: {
        en: 'Diagram shows platinum wire electrodes immersed in 1X TAE/TBE buffer, negative cathode (Black) to positive anode (Red) potential gradient, agarose random coiled fiber mesh, and migration velocity profile where compact low-MW fragments outpace bulky high-MW fragments.',
        hinglish: 'DC voltage apply karne par DNA molecules agarose gel mesh me se pass hote hain; chote fragments fast travel karte hain.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Regulated DC Power Supply', action: 'Generates constant voltage (80–120 V DC) driving electrophoretic mobility: v = µ_e · E', scientificSignificance: 'Maintains steady velocity without buffer overheating' },
        { stage: 2, component: 'Platinum Wire Electrodes', action: 'Transfers electrons to buffer ions; generates H2 gas at cathode (-) and O2 gas at anode (+)', scientificSignificance: 'Pure platinum avoids heavy metal sample poisoning' },
        { stage: 3, component: 'Agarose Gel Polymer Mesh', action: 'Crosslinked polysaccharide matrix forms sieving pores ranging from 100 to 500 nm', scientificSignificance: 'Resolves DNA fragments spanning 100 bp to 20 kb' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Agarose Melting & Casting', hinglish: 'Agarose Gel Casting' },
        instruction: { en: 'Dissolve agarose powder (e.g. 1.0% w/v = 1.0 g in 100 mL 1X TAE buffer) by microwave heating until crystal clear. Cool to ~55°C, add 5 µL GelRed/SYBR Safe dye, and cast into taped tray with comb.', hinglish: '1% agarose TAE buffer me boil karke dissolve karein, 55°C tak cool karke GelRed stain add karein aur comb laga kar cast karein.' },
        criticalSOP: { en: 'Never add fluorescent intercalating dyes to boiling agarose (>70°C); thermal degradation releases hazardous aerosolized vapors.', hinglish: 'Boiling agarose me dye na daalein, 55°C cool hone ke baad hi add karein.' },
      },
      {
        step: 2,
        title: { en: 'Submerging & Comb Removal', hinglish: 'Comb Removal aur Tank Setup' },
        instruction: { en: 'Once solidified (~30 min), place gel into tank. Submerge under 1X TAE running buffer to 2–3 mm above gel surface. Pull comb vertically and smoothly.', hinglish: 'Solidify hone par gel tank me rakhein, 1X TAE buffer 2-3 mm cover karein aur comb softly nikal lein.' },
        criticalSOP: { en: 'Pulling comb aggressively rips well dividing walls, causing sample cross-contamination between lanes.', hinglish: 'Comb jhatke se mat khinchein, well walls phat sakti hain.' },
      },
      {
        step: 3,
        title: { en: 'Sample Loading with Density Dye', hinglish: 'Sample Loading' },
        instruction: { en: 'Mix DNA sample with 6X glycerol/Bromophenol blue loading dye. Lower micropipette tip into well without puncturing the bottom; dispense slowly.', hinglish: 'DNA me 6X loading dye mix karein aur micropipette se well me softly load karein bina bottom puncture kiye.' },
        criticalSOP: { en: 'Puncturing the bottom of the well causes sample to leak beneath the gel, resulting in missing or ghost bands.', hinglish: 'Well ka bottom puncture na karein.' },
      },
      {
        step: 4,
        title: { en: 'Electrophoresis Execution (Run Towards Red)', hinglish: 'Electric Field Run' },
        instruction: { en: 'Connect safety leads: Black (-) to cathode at the top; Red (+) to anode at the bottom ("Run to Red"). Apply 100 V DC. Verify bubbles at platinum wires.', hinglish: 'Black wire cathode par aur Red wire anode par lagayein ("Run to Red"). 100V DC set karein aur bubbles check karein.' },
        criticalSOP: { en: 'Reversing polarity drives all DNA samples out of the top of the wells into the upper buffer reservoir within 5 minutes.', hinglish: 'Polarity reverse hone par DNA upar buffer me nikal jayega.' },
      },
      {
        step: 5,
        title: { en: 'Transilluminator Band Imaging', hinglish: 'UV / Blue LED Imaging' },
        instruction: { en: 'Turn off power when Bromophenol blue dye front reaches 75% down the gel. Transfer to Blue-light or UV transilluminator (Gel Doc) to image bands against standard ladder.', hinglish: 'Dye front 75% pahunchne par power off karein aur UV/Blue transilluminator par photo capture karein.' },
        criticalSOP: { en: 'Always wear certified UV face shield and nitrile gloves when using UV transilluminators to prevent severe eye and skin burns.', hinglish: 'UV transilluminator use karte waqt UV safety face shield zaroor pehnein.' },
      },
    ],
    hardwareComponents: [
      { name: 'UV-Transparent Gel Casting Tray', specification: 'Clear acrylic tray transmitting 300 nm light', function: 'Allows direct imaging without removing gel' },
      { name: 'Platinum Wire Electrodes', specification: '99.99% pure platinum wire (0.2 mm diameter)', function: 'Maintains electrochemical current' },
      { name: 'Regulated DC Power Pack', specification: '0–300 V, 0–400 mA constant voltage/current modes', function: 'Provides controlled DC potential' },
    ],
    biotechApplications: [
      'Verification of PCR amplicon size and restriction digest fragment mapping.',
      'Isolation and purification of DNA bands for cloning (gel extraction).',
      'SDS-PAGE resolution of cellular proteins and molecular weight estimation.',
      'Analysis of total cellular RNA integrity (28S and 18S ribosomal RNA bands).',
    ],
    safetyPrecautions: [
      'High shock hazard: Never insert fingers into running buffer while the power supply is energized.',
    ],
    scientificFormulas: [
      { name: 'Electrophoretic Migration Law', equation: 'Distance = -k · log10(MW) + c', explanation: 'Migration distance is inversely proportional to the logarithm of DNA molecular weight in base pairs.' },
    ],
  },

  // 8. Laminar Air Flow (LAF) Cabinet
  {
    id: 'laminar-air-flow',
    slug: 'laminar-air-flow',
    name: {
      en: 'Laminar Air Flow (LAF) Clean Bench',
      hinglish: 'Laminar Air Flow (LAF)',
    },
    category: 'Sterilization & Culture',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Aseptic horizontal laminar air flow clean bench with stainless steel workbed and HEPA filtration',
    modelDesignation: 'Horizontal / Vertical Laminar Clean Bench (ISO Class 5)',
    workingPrincipleSummary: {
      en: 'Creates an aseptic, particle-free environment by drawing room air through a coarse pre-filter, pressurizing it with a centrifugal blower, and driving it through a HEPA filter (99.97% efficient at 0.3 µm) in uniform parallel streamlines at 0.45 m/s across the work surface.',
      hinglish: 'Blower aur HEPA filter (99.97% efficiency at 0.3 µm) ke through parallel sterile air flow provide karta hai bina turbulence ke, jisse microbial media aur plant tissue cultures contaminate hone se bachte hain.',
    },
    highResDiagram: {
      title: 'Aerodynamic Laminar Streamlines & HEPA Plenum',
      diagramType: 'Horizontal Clean Air Vector Flow Dynamics',
      description: {
        en: 'Diagram shows room air intake through pre-filter at bottom/top, blower pressurization into plenum, laminar streamlines emerging horizontally from HEPA filter face at 0.45 m/s (90 fpm) washing over the stainless steel workbed toward the operator.',
        hinglish: 'Pre-filter se air clean hokar blower ke through HEPA filter se guzarti hai aur horizontal parallel lines me sterile air provide karti hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Polyester Pre-Filter', action: 'Captures large airborne dust particles (>5 µm)', scientificSignificance: 'Extends operating lifespan of expensive downstream HEPA filter' },
        { stage: 2, component: 'Centrifugal Blower Motor', action: 'Generates positive static plenum pressure (0.8–1.2 inches water gauge)', scientificSignificance: 'Drives air uniformly through dense borosilicate glass microfibers' },
        { stage: 3, component: 'HEPA Filter (H14 Class)', action: 'Traps 99.99% of 0.3 µm particles via impaction, interception, and Brownian diffusion', scientificSignificance: 'Establishes ISO Class 5 (Class 100) sterile operating conditions' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'UV-C Surface Decontamination', hinglish: 'UV-C Sterilization' },
        instruction: { en: 'Close front acrylic sash. Turn on shortwave germicidal UV-C lamp (254 nm) for 20 minutes to photochemically sterilize the stainless steel workbench surface.', hinglish: 'Sash band karke 20 minute ke liye UV-C lamp (254 nm) on karein surface sterilize karne ke liye.' },
        criticalSOP: { en: 'NEVER operate or look at the UV lamp while personnel are in the room; UV-C causes acute corneal photokeratitis and skin erythema.', hinglish: 'UV lamp on rehte hue kabhi andar na dekhein aur na haath daalein.' },
      },
      {
        step: 2,
        title: { en: 'Blower Purge Initialization', hinglish: 'Blower Fan Start' },
        instruction: { en: 'Switch off UV lamp. Turn on fluorescent light and centrifugal blower motor. Open sash and allow sterile air to purge chamber for 15 minutes before introducing materials.', hinglish: 'UV off karke blower on karein aur 15 minute chamber purge hone dein.' },
        criticalSOP: { en: 'Working immediately after starting the blower introduces airborne room contaminants before laminar lines stabilize.', hinglish: 'Blower start hote hi turant kaam shuru na karein.' },
      },
      {
        step: 3,
        title: { en: 'Ethanol Swabbing of Work Surface', hinglish: '70% Ethanol Disinfection' },
        instruction: { en: 'Swab the entire 304 stainless steel surface from back to front using a lint-free wipe saturated with 70% v/v isopropanol or ethanol.', hinglish: '70% ethanol se back se front ki taraf surface wipe karein.' },
        criticalSOP: { en: '70% ethanol is vastly more bactericidal than 100% absolute ethanol because water allows penetration across bacterial cell walls.', hinglish: '70% ethanol hi use karein, 100% ethanol se bacterial cell wall penetrate nahi hoti.' },
      },
      {
        step: 4,
        title: { en: 'Aseptic Manipulation in Clean Zone', hinglish: 'Aseptic Technique' },
        instruction: { en: 'Position items so sterile air from the HEPA filter is never blocked by unsterile hands or racks. Keep open containers downstream of the airflow.', hinglish: 'HEPA filter se aane wali direct sterile air ke beech apne haath ya unsterile bottles na rakhein.' },
        criticalSOP: { en: 'Horizontal LAF cabinets protect the PRODUCT ONLY. Air blows straight at the operator; NEVER use for pathogenic bacteria, viruses, or hazardous drugs.', hinglish: 'Horizontal LAF sirf product protect karta hai; biohazardous pathogens ke liye kabhi use na karein.' },
      },
      {
        step: 5,
        title: { en: 'Shutdown & Cleanout', hinglish: 'Cleanup aur Shutdown' },
        instruction: { en: 'Remove all culture plates and pipette tips. Wipe benchtop with 70% ethanol. Turn off blower and lower sash.', hinglish: 'Saara material nikal kar surface 70% ethanol se wipe karein aur sash close karein.' },
        criticalSOP: { en: 'Never leave open flammable ethanol beakers inside the cabinet with UV turned on.', hinglish: 'Cabinet me open ethanol beakers chhod kar UV on na karein.' },
      },
    ],
    hardwareComponents: [
      { name: 'H14 Deep-Pleat HEPA Filter', specification: '99.995% efficiency at MPPS (0.3 µm)', function: 'Eliminates spores, bacteria, and dust' },
      { name: 'Direct-Drive Blower Fan', specification: 'Forward-curved centrifugal fan with multi-speed tap', function: 'Delivers 0.45 m/s face velocity' },
      { name: 'Germicidal UV-C Tube', specification: '254 nm mercury-vapor tube (30W)', function: 'Crosslinks DNA/RNA of surface pathogens' },
    ],
    biotechApplications: [
      'Inoculation and subculturing of non-pathogenic bacteria and fungal stocks.',
      'Plant tissue culture micropropagation (callus induction, explant plating).',
      'Sterile preparation of agar plates, liquid growth media, and stock antibiotics.',
      'Aseptic assembly of sterile medical devices and disposable packaging.',
    ],
    safetyPrecautions: [
      'Strict limitation: Never use horizontal laminar benches for Biosafety Level 2+ agents or human blood specimens.',
    ],
  },

  // 9. Steam Sterilizer (Autoclave)
  {
    id: 'autoclave',
    slug: 'autoclave',
    name: {
      en: 'High-Pressure Steam Sterilizer (Autoclave)',
      hinglish: 'Autoclave (Steam Sterilizer)',
    },
    category: 'Sterilization & Culture',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Industrial laboratory vertical top-loading autoclave pressure vessel',
    modelDesignation: 'Top-Loading Vertical High-Pressure Steam Sterilizer (50–100 L)',
    workingPrincipleSummary: {
      en: 'Utilizes saturated steam under elevated pressure (typically 121°C at 15 psi / 103 kPa for 15–20 min). High-pressure steam transfers latent heat of vaporization rapidly, irreversibly coagulating and denaturing structural proteins, enzymes, and bacterial endospores (Geobacillus stearothermophilus).',
      hinglish: 'High pressure saturated steam (121°C at 15 psi pressure for 15-20 min) se micro-organisms aur bacterial endospores ko destroy karta hai through protein coagulation.',
    },
    highResDiagram: {
      title: 'Pressure Chamber Thermodynamics & Latent Heat Transfer',
      diagramType: 'Steam Cycle Pressure-Temperature S-Curve',
      description: {
        en: 'Diagram illustrates boiler immersion heating elements, air purge solenoid valve exhausting cool dense air, chamber pressure ramping to 15.2 psi (121.5°C), spring-loaded safety pressure relief valve, and condensate return drain.',
        hinglish: 'Boiler water boil karta hai; air exhaust hone ke baad pressure 15 psi tak badhta hai aur 121°C steam latent heat transfer karke sterilization complete karti hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Electric Immersion Heaters', action: 'Boils deionized water in chamber reservoir producing high-volume steam', scientificSignificance: 'Generates saturated steam vapor phase' },
        { stage: 2, component: 'Exhaust Purge Solenoid', action: 'Permits cold, dense air pockets to discharge outward via bottom manifold', scientificSignificance: 'Air pockets insulate and drop effective steam temperature by up to 20°C' },
        { stage: 3, component: 'Pressure Vessel Clamping Ring', action: 'Seals heavy silicone gasket under radial locking lugs', scientificSignificance: 'Withstands up to 35 psi internal working pressure safely' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Water Level Verification', hinglish: 'Water Reservoir Level Check' },
        instruction: { en: 'Check that chamber reservoir is filled with clean deionized water covering the immersion heating elements up to the marked fill plate.', hinglish: 'Chamber me heating elements ke upar tak deionized water fill hona chahiye.' },
        criticalSOP: { en: 'Running an autoclave dry burns out expensive heating elements in less than 3 minutes.', hinglish: 'Dry autoclave kabhi na chalayein, elements burn out ho jayenge.' },
      },
      {
        step: 2,
        title: { en: 'Bottle Cap Loosening & Autoclave Tape', hinglish: 'Caps Loosen Karna' },
        instruction: { en: 'Loosen all screw caps on liquid media bottles by one half-turn. Apply a 5 cm strip of lead-carbonate autoclave indicator tape to each vessel.', hinglish: 'Glass bottles ke screw caps ko aadha turn dheet/loose karein aur autoclave tape lagayein.' },
        criticalSOP: { en: 'Tightly sealed glass bottles EXPLODE violently under internal steam pressure, destroying the chamber and injuring staff.', hinglish: 'Tightly sealed bottle pressure me blast ho jayegi.' },
      },
      {
        step: 3,
        title: { en: 'Cycle Selection (Liquids vs. Gravity Waste)', hinglish: 'Cycle Select Karna' },
        instruction: { en: 'Select "Liquids / Slow Exhaust" (121°C for 20 min) for agar broths and buffers; select "Gravity / Fast Exhaust" (121°C for 30 min) for dry glassware and biohazard waste bags.', hinglish: 'Liquid media ke liye "Slow Exhaust" cycle select karein; dry glassware ke liye "Fast Exhaust".' },
        criticalSOP: { en: 'Selecting fast exhaust for liquids causes violent superheated boiling, blowing molten media out of bottles.', hinglish: 'Liquids ke liye fast exhaust select karne par sara media ubal kar bahar gir jayega.' },
      },
      {
        step: 4,
        title: { en: 'Sterilization Hold at 121°C / 15 psi', hinglish: '121°C / 15 psi Hold Stage' },
        instruction: { en: 'The microprocessor locks lid, exhausts cold air, ramps pressure to 15 psi (121°C), and executes the 20-minute sterilization countdown.', hinglish: 'Microprocessor automatic pressure 15 psi aur temp 121°C maintain karke 20 minute count karega.' },
        criticalSOP: { en: 'Verify monthly using biological spore ampoules of Geobacillus stearothermophilus (10^6 spores).', hinglish: 'Monthly biological spore indicator se validation zaroor karein.' },
      },
      {
        step: 5,
        title: { en: 'Safe Decompression & Thermal Unloading', hinglish: 'Safe Opening & PPE' },
        instruction: { en: 'Wait until chamber pressure gauge drops completely to 0.0 psi and temperature drops below 80°C. Don heavy thermal heat-resistant gloves, crack lid slightly, and allow steam to vent away from face before removing items.', hinglish: 'Pressure 0 psi aur temp <80°C hone par heat-resistant gloves pehan kar lid softly open karein.' },
        criticalSOP: { en: 'Never force open a pressurized autoclave door. Escaping 120°C steam causes catastrophic third-degree scalding burns.', hinglish: 'Pressure rehte hue door kabhi na kholein.' },
      },
    ],
    hardwareComponents: [
      { name: '316L Stainless Steel Vessel', specification: 'Deep-drawn ASME-certified pressure chamber', function: 'Contains high-pressure steam' },
      { name: 'Spring-Loaded Safety Relief Valve', specification: 'Calibrated to pop open automatically at 28 psi', function: 'Failsafe overpressure release' },
      { name: 'Digital PID Controller', specification: 'Dual thermocouple sensors accurate to ± 0.2°C', function: 'Regulates heating and exhaust timings' },
    ],
    biotechApplications: [
      'Sterilization of nutrient agar plates, broths, and microbiological media.',
      'Decontamination of biohazardous infectious culture waste prior to disposal.',
      'Sterilization of laboratory glassware, pipette tips, spatulas, and surgical tools.',
      'Preparation of physiological saline solutions and formulation buffers.',
    ],
    safetyPrecautions: [
      'Never autoclave flammable solvents, bleach, or corrosive volatile acids (corrodes stainless steel chamber).',
    ],
    scientificFormulas: [
      { name: 'Thermal Death Inactivation (Del Factor)', equation: 'Del = ln(N0 / N) = k · t', explanation: 'Relates initial microbial bioburden (N0) and surviving spore fraction (N) to exposure time (t) and death rate constant (k).' },
    ],
  },

  // 10. Biosafety Cabinet (Class II Type A2/B2)
  {
    id: 'biosafety-cabinet',
    slug: 'biosafety-cabinet',
    name: {
      en: 'Biological Safety Cabinet (Class II Type A2/B2)',
      hinglish: 'Biological Safety Cabinet (BSC)',
    },
    category: 'Sterilization & Culture',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Class II Type A2 Biosafety Cabinet in BSL-2 biological containment facility',
    modelDesignation: 'Class II Type A2 Biological Containment Hood (NSF/ANSI 49 Certified)',
    workingPrincipleSummary: {
      en: 'Provides three levels of biocontainment: Personnel protection, Product protection, and Environmental protection. Uses laminar HEPA downflow air combined with an air curtain inward face velocity (≥ 0.51 m/s) to isolate infectious biohazardous aerosols.',
      hinglish: 'Three-way protection deta hai: Researcher, Sample, aur Lab Environment. Front inward air curtain infectious aerosols ko bahar aane se rokta hai aur HEPA downflow sample ko sterile rakhta hai.',
    },
    highResDiagram: {
      title: 'Class II Type A2 Airflow Circulation & Negative Pressure Plenum',
      diagramType: '70% Recirculation / 30% Exhaust HEPA Schematic',
      description: {
        en: 'Diagram shows room air drawn into front intake grille creating an inward barrier, internal blower directing air through positive/negative pressure plenums, 70% recirculated through supply HEPA down onto work surface, and 30% discharged through exhaust HEPA.',
        hinglish: 'Front intake grille room air ko pull karke air barrier banata hai; 70% air supply HEPA se recirculate hoti hai aur 30% air exhaust HEPA se safely bahar nikal jati hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Front Air Intake Grille', action: 'Draws room air inward at minimum 0.51 m/s (100 fpm) creating protective barrier', scientificSignificance: 'Prevents pathogenic aerosols from escaping toward the operator' },
        { stage: 2, component: 'Supply HEPA Downflow Filter', action: 'Filters recirculated air delivering uniform vertical laminar downflow at 0.30 m/s', scientificSignificance: 'Bathes work surface in ISO Class 5 sterile air, preventing sample contamination' },
        { stage: 3, component: 'Exhaust HEPA Filter', action: 'Cleans 30% exhaust air before releasing into laboratory room or external duct', scientificSignificance: 'Ensures zero environmental release of infectious viral or bacterial droplets' },
        { stage: 4, component: 'Negative Pressure Plenum Wrap', action: 'All contaminated air ducts are surrounded by negative pressure spaces', scientificSignificance: 'Any accidental duct leak is pulled inward rather than spewing outward' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Sash Height & Velocity Alarm Check', hinglish: 'Sash Height Set Karna' },
        instruction: { en: 'Adjust the front sliding glass sash to the certified operating height (typically 8 or 10 inches marked by arrows). Verify that the visual and audible airflow alarms are silent.', hinglish: 'Front glass sash ko certified line (8 ya 10 inch) par set karein aur alarm silent hone ka wait karein.' },
        criticalSOP: { en: 'Working with sash raised above certified height breaks the inward air barrier, exposing the operator to infectious aerosols.', hinglish: 'Sash ko certified height se upar karke kaam na karein.' },
      },
      {
        step: 2,
        title: { en: 'Airflow Stabilization Purge', hinglish: 'Airflow Stabilization' },
        instruction: { en: 'Turn on blower 15 minutes before starting work to purge room particulates and establish steady laminar streamline velocity.', hinglish: 'Blower on karke 15 minute chamber purge hone dein.' },
        criticalSOP: { en: 'Check magnehelic differential pressure gauge reading matches the certified calibration sticker (typically 1.2–1.8 in. w.g.).', hinglish: 'Pressure gauge reading certified level se match honi chahiye.' },
      },
      {
        step: 3,
        title: { en: 'Loading & Grille Clearance', hinglish: 'Grille ko Block Na Karna' },
        instruction: { en: 'Load all required supplies at once. Place supplies toward the center and rear of the workbed. Never cover or block the front intake grilles with notebooks, elbows, or pipettes.', hinglish: 'Saara material pehle hi load karein; front grille par kabhi notebook ya haath na rakhein.' },
        criticalSOP: { en: 'Blocking front grilles creates room air turbulence that sucks pathogens straight out into the operator face.', hinglish: 'Front grille block karne se air curtain break ho jati hai.' },
      },
      {
        step: 4,
        title: { en: 'Slow Movement & Aseptic Segregation', hinglish: 'Slow Movement aur Clean/Dirty Separation' },
        instruction: { en: 'Segregate work into "Clean" (left) and "Contaminated / Waste" (right) zones. Move arms slowly straight in and out perpendicular to the opening; avoid sudden sideways sweeping arm gestures.', hinglish: 'Left side clean rakhein aur right side waste; haathon ko dheere se seedha andar-bahar karein.' },
        criticalSOP: { en: 'Rapid arm sweeping disrupts the laminar air curtain, causing air exchange with the room.', hinglish: 'Tez haath hilane se air curtain disrupt ho jati hai.' },
      },
      {
        step: 5,
        title: { en: 'Surface Decontamination & Sash Closure', hinglish: 'Disinfection aur Shutdown' },
        instruction: { en: 'Seal biohazard waste containers inside the cabinet. Wipe workbed, side walls, and drain pan with appropriate disinfectant (e.g. 70% ethanol or 0.5% sodium hypochlorite followed by sterile water). Allow blower to run 5 minutes before turning off.', hinglish: 'Biohazard waste seal karein, surface disinfectant se wipe karein aur 5 min blower chalane ke baad off karein.' },
        criticalSOP: { en: 'If bleach is used, always rinse with sterile water; chlorine pits and destroys 304 stainless steel.', hinglish: 'Bleach use karne ke baad sterile water se rinse zaroor karein.' },
      },
    ],
    hardwareComponents: [
      { name: 'Supply & Exhaust HEPA Filters', specification: 'ULPA/HEPA filters, 99.99% at 0.3 µm', function: 'Biocontainment filtration' },
      { name: 'Sliding Tempered Glass Sash', specification: '6 mm laminated safety glass with micro-switch sensor', function: 'Physical barrier against splashes and aerosol' },
      { name: 'Magnehelic Pressure Differential Gauge', specification: '0–3.0 inches water gauge analog manometer', function: 'Indicates HEPA filter loading status' },
    ],
    biotechApplications: [
      'Culturing mammalian cell lines, primary human tissues, and organoids.',
      'Handling Biosafety Level 2 pathogens (Staphylococcus aureus, Hepatitis B, Influenza).',
      'Propagating recombinant lentiviral and retroviral gene delivery vectors.',
      'Processing clinical diagnostic biopsy and blood samples.',
    ],
    safetyPrecautions: [
      'Class II Type A2 recirculates 70% air; NEVER use for volatile toxic chemicals or radionuclides (requires Class II Type B2 full exhaust).',
    ],
  },

  // 11. Microplate ELISA Reader
  {
    id: 'elisa-reader',
    slug: 'elisa-reader',
    name: {
      en: 'Microplate ELISA Reader / Spectrophotometer',
      hinglish: 'Microplate ELISA Reader',
    },
    category: 'Spectroscopy',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High-throughput 96-well microplate absorbance ELISA reader with robotic tray carrier',
    modelDesignation: 'Multi-Mode 96/384-Well Absorbance Microplate Reader',
    workingPrincipleSummary: {
      en: 'Photometrically measures optical density (OD) simultaneously across standard 96-well microplates. Quantifies antigen-antibody enzyme conjugates (e.g. HRP with TMB substrate at 450 nm) following colorimetric substrate turnover.',
      hinglish: '96-well microplates me antibody-antigen binding ko enzyme catalyzed color change (HRP-TMB reaction at 450 nm) ke through high speed me measure karta hai.',
    },
    highResDiagram: {
      title: '96-Channel Optical Fiber Bundle & Vertical Absorbance Path',
      diagramType: 'Vertical Optical Beam Absorbance Geometry',
      description: {
        en: 'Diagram shows xenon flash lamp pulsing light through wheel-mounted interference filters (405, 450, 492, 630 nm), bifurcated optical fiber bundles directing light vertically through bottom of all 96 wells simultaneously into silicon photodetector array.',
        hinglish: 'Xenon lamp 450 nm filter se light bhejta hai; 96 fiber optic cables plate ke saare wells me se vertically light pass karke photodiodes par measure karti hain.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Pulsed Xenon Flash Lamp', action: 'Delivers high-energy microsecond pulses of broad-spectrum light', scientificSignificance: 'Eliminates warm-up drift and preserves multi-year lifespan' },
        { stage: 2, component: 'Motorized Filter Wheel', action: 'Positions high-transmission interference filters (405, 450, 492, 570, 630 nm)', scientificSignificance: 'Isolates exact absorption peaks for HRP, Alkaline Phosphatase, and reference subtraction' },
        { stage: 3, component: 'Vertical Microplate Stage', action: 'Aligns 96-well plate with precision stepper motor in less than 6 seconds', scientificSignificance: 'High-speed automated screening of entire 96-well arrays' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Reaction Quenching (Stop Solution)', hinglish: 'Reaction Stop Karna' },
        instruction: { en: 'After 15-minute TMB substrate incubation, add 50 µL of 1M H2SO4 (Stop Solution) to each well. Color shifts sharply from blue to yellow.', hinglish: '15 min TMB incubation ke baad 50 µL 1M H2SO4 add karein; color blue se yellow convert ho jayega.' },
        criticalSOP: { en: 'Read plate within 15 minutes of adding stop solution; yellow diimine product degrades over time.', hinglish: 'Stop solution add karne ke 15 minute ke andar reading lein.' },
      },
      {
        step: 2,
        title: { en: 'Plate Bottom Inspection & Smudge Check', hinglish: 'Plate Bottom Clean Check' },
        instruction: { en: 'Invert plate slightly and inspect optical underside. Wipe bottom dry with a lint-free tissue to remove condensation or buffer droplets.', hinglish: 'Plate bottom ko dry Kimwipe se softly wipe karein taaki koi pani ya fingerprints na rahein.' },
        criticalSOP: { en: 'A single water droplet on the well bottom acts as a concave lens, producing massive false absorbance spikes of >1.0 OD.', hinglish: 'Plate bottom par droplet lens ki tarah light deflect karta hai.' },
      },
      {
        step: 3,
        title: { en: 'Filter & Dual-Wavelength Programming', hinglish: 'Wavelength Programming' },
        instruction: { en: 'Select measurement filter at 450 nm (TMB absorption peak) and reference wavelength at 620 or 630 nm (optical plastic scattering correction).', hinglish: 'Primary filter 450 nm aur reference correction filter 630 nm set karein.' },
        criticalSOP: { en: 'Dual-wavelength subtraction (A450 - A630) cancels out optical imperfections, fingerprints, and plastic variations.', hinglish: 'Dual wavelength subtraction se plastic artifacts cancel out hote hain.' },
      },
      {
        step: 4,
        title: { en: 'Shaking & Absorbance Acquisition', hinglish: 'Orbital Shaking aur Read' },
        instruction: { en: 'Place plate on carrier tray. Program 5 seconds of medium orbital shaking to homogenize meniscus, then press Read.', hinglish: 'Plate carrier par rakhein, 5 second orbital shake karein aur Read button dabayein.' },
        criticalSOP: { en: 'Ensure plate is seated squarely against registration corner pegs before carrier retracts.', hinglish: 'Plate alignment pins me perfectly baiti honi chahiye.' },
      },
      {
        step: 5,
        title: { en: 'Standard Curve 4PL Regression Fitting', hinglish: '4PL Curve Fitting' },
        instruction: { en: 'Software automatically subtracts blank well OD and fits a 4-Parameter Logistic (4PL) sigmoidal curve to interpolate unknown serum concentrations.', hinglish: 'Software blank subtract karke 4PL curve fit karega aur unknown antigen concentrations calculate karega.' },
        criticalSOP: { en: 'Verify R^2 coefficient of standard curve is > 0.990 and coefficient of variation (%CV) among triplicates is < 10%.', hinglish: 'Standard curve R^2 > 0.99 hona zaroori hai.' },
      },
    ],
    hardwareComponents: [
      { name: 'Xenon Flash Bulb', specification: 'High-power strobe flash lamp (10^9 flashes)', function: 'Pulsed broad-spectrum light emission' },
      { name: 'Multi-Channel Photodiode Matrix', specification: '8-channel or 96-channel silicon photodiode array', function: 'Simultaneous vertical absorbance measurement' },
      { name: 'Orbital Microplate Shaker', specification: 'Software-controlled 100–1200 RPM shaking motor', function: 'Mixes reagent solutions' },
    ],
    biotechApplications: [
      'Quantification of cytokines, interleukins, and growth factors (ELISA).',
      'Clinical diagnostic screening (HIV p24 antigen, Hepatitis B HBsAg, anti-SARS-CoV-2 IgG).',
      'Monoclonal antibody hybridoma screening and titer evaluation.',
      'High-throughput cell viability and cytotoxicity assays (MTT, MTS, CCK-8).',
    ],
    safetyPrecautions: [
      'Wear nitrile gloves when handling sulfuric acid stop solution and human serum specimens.',
    ],
    scientificFormulas: [
      { name: 'Four-Parameter Logistic (4PL) Curve', equation: 'y = d + (a - d) / (1 + (x / c)^b)', explanation: 'Where a = minimum asymptote, d = maximum asymptote, c = inflection point (EC50), and b = Hill slope.' },
    ],
  },

  // 12. Fluorescence & Confocal Microscope
  {
    id: 'fluorescence-microscope',
    slug: 'fluorescence-microscope',
    name: {
      en: 'Epifluorescence & Confocal Laser Microscope',
      hinglish: 'Fluorescence & Confocal Microscope',
    },
    category: 'Microscopy & Imaging',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Inverted research epifluorescence microscope with digital imaging camera and multi-color laser lines',
    modelDesignation: 'Inverted Research Epifluorescence Microscope with sCMOS Camera',
    workingPrincipleSummary: {
      en: 'Employs short-wavelength excitation light to excite fluorophores into high electronic states; during vibrational relaxation and decay to the ground state, longer-wavelength fluorescent photons are emitted (Stokes shift). A dichroic beam splitter cleanly separates excitation and emission light.',
      hinglish: 'Fluorophores ko short wavelength light se excite karta hai. Molecules relax hote waqt higher wavelength (Stokes shift) light emit karte hain jo dichroic filter se separate hokar dark background par bright image banati hai.',
    },
    highResDiagram: {
      title: 'Filter Cube Dichroic Optics & Stokes Shift Separation',
      diagramType: 'Epifluorescence Light Path & Beam Splitter Optics',
      description: {
        en: 'Diagram shows excitation filter isolating specific fluorophore excitation band (e.g. 488 nm), 45° dichroic beam-splitter mirror reflecting excitation light downward through high-NA objective onto specimen, and transmitting emitted longer-wavelength Stokes-shifted photons (520 nm) through emission filter to the sCMOS camera.',
        hinglish: 'Excitation filter blue light pass karta hai jo dichroic mirror se deflect hokar sample par girti hai; emitted green light dichroic mirror cross karke camera par image banati hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Solid-State LED / Laser Module', action: 'Emits intense narrow-spectrum light (e.g. 405 nm DAPI, 488 nm GFP, 561 nm RFP)', scientificSignificance: 'High photon flux for faint intracellular fluorophores' },
        { stage: 2, component: 'Dichroic Mirror (Beamsplitter)', action: 'Reflects wavelengths shorter than cutoff; transmits wavelengths longer than cutoff at 45° angle', scientificSignificance: 'Eliminates blinding excitation light from entering detector' },
        { stage: 3, component: 'Plan-Apochromat Objective Lens', action: 'High numerical aperture (NA 1.40 Oil) focuses light to diffraction limit (d = 0.61 λ / NA)', scientificSignificance: 'Resolves subcellular organelles down to 200 nm' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Dark Adaptation & Slide Mounting', hinglish: 'Dark Room Setup' },
        instruction: { en: 'Dim room lighting. Place stained slide onto microscope mechanical stage with coverslip facing the objective lens.', hinglish: 'Room lights dim karein aur slide stage par coverslip upar rakh kar mount karein.' },
        criticalSOP: { en: 'Fluorophores (GFP, Alexa Fluor) photobleach permanently when exposed to ambient room light; keep slides covered with aluminum foil.', hinglish: 'Fluorophores room light me photobleach ho jate hain, slide cover rakhein.' },
      },
      {
        step: 2,
        title: { en: 'Immersion Oil Application (100X Objective)', hinglish: 'Immersion Oil Lagana' },
        instruction: { en: 'For 100X high-resolution imaging, place one drop of synthetic immersion oil (refractive index n = 1.518) directly onto coverslip. Swing 100X oil objective into place.', hinglish: '100X objective ke liye coverslip par 1 drop immersion oil lagayein aur lens position karein.' },
        criticalSOP: { en: 'Never get immersion oil on dry 40X or 20X air objectives; oil dissolves cement adhesives on non-sealed lenses.', hinglish: 'Dry 40X objective par oil kabhi na lagne dein.' },
      },
      {
        step: 3,
        title: { en: 'Filter Cube Selection (DAPI, FITC, TRITC)', hinglish: 'Filter Cube Switch Karna' },
        instruction: { en: 'Rotate filter turret to Blue (DAPI, 405 nm) to identify nuclei. Focus using fine adjustment knob. Switch to Green (GFP/FITC, 488 nm) and Red (RFP/mCherry, 561 nm).', hinglish: 'Pehle DAPI filter se nuclei focus karein, fir GFP (green) aur mCherry (red) filter select karein.' },
        criticalSOP: { en: 'Minimize laser shutter open time to under 5 seconds per field of view to prevent reactive oxygen species (ROS) phototoxicity.', hinglish: 'Laser shutter zyada der open na rakhein, photobleaching hoti hai.' },
      },
      {
        step: 4,
        title: { en: 'Digital Exposure & Gain Tuning', hinglish: 'Camera Exposure Adjust' },
        instruction: { en: 'In imaging software, set exposure time (typically 50–200 ms) and analog gain so fluorescence intensity histogram occupies 70% of dynamic range without pixel saturation.', hinglish: 'Software me exposure 50-200 ms set karein taaki pixels over-saturate na hon.' },
        criticalSOP: { en: 'Never evaluate colocalization on over-saturated images where pixel values reach 255 (8-bit limit).', hinglish: 'Saturated pixels par co-localization evaluate na karein.' },
      },
      {
        step: 5,
        title: { en: 'Objective Lens Cleaning', hinglish: 'Lens Cleaning' },
        instruction: { en: 'Lower stage, remove slide, and gently wipe immersion oil off the 100X objective front lens using pure lens paper moistened with optical cleaning fluid (isopropanol).', hinglish: 'Kaam khatam hone par lens paper se 100X objective ka oil gently wipe karein.' },
        criticalSOP: { en: 'Never use facial tissue (Kleenex) or paper towels; wood fibers severely scratch precision fluorite lens coatings.', hinglish: 'Rough tissue lens par use na karein, scratch pad sakta hai.' },
      },
    ],
    hardwareComponents: [
      { name: 'Fluorescence Filter Cube Turret', specification: '6-position motorized turret with Hard-Coated filters', function: 'Houses DAPI, GFP, RFP, and Cy5 filter sets' },
      { name: '100X Plan-Apochromat Oil Objective', specification: '100X magnification, Numerical Aperture (NA) 1.45', function: 'Captures highest light angle for diffraction-limited resolution' },
      { name: 'Cooled sCMOS Camera', specification: '2048 × 2048 pixels, 82% quantum efficiency, Peltier cooled', function: 'Captures high-frame-rate low-noise images' },
    ],
    biotechApplications: [
      'Subcellular localization of GFP/mCherry fusion proteins in living cells.',
      'Immunofluorescence detection of cytoskeletal tubulin, actin, and nuclear transcription factors.',
      'Fluorescence in situ hybridization (FISH) for gene mapping and chromosomal translocations.',
      'Monitoring cellular apoptosis via Annexin V-FITC / Propidium Iodide dual staining.',
    ],
    safetyPrecautions: [
      'High-energy UV/Laser light hazard: Never look directly into open objective light cone without protective barrier filters.',
    ],
    scientificFormulas: [
      { name: 'Airy Disk Diffraction Resolution (Abbe Limit)', equation: 'd = 0.61 · λ / NA = 0.61 · λ / (n · sin α)', explanation: 'Calculates the minimum resolvable distance (d) between two fluorescent emitters.' },
    ],
  },

  // 13. Electron Microscope (TEM & SEM)
  {
    id: 'electron-microscope',
    slug: 'electron-microscope',
    name: {
      en: 'Transmission & Scanning Electron Microscope (TEM / SEM)',
      hinglish: 'Electron Microscope (TEM / SEM)',
    },
    category: 'Microscopy & Imaging',
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High-voltage field-emission Transmission Electron Microscope (TEM) column in research facility',
    modelDesignation: '200 kV Field Emission Gun (FEG) Cryo-TEM & Analytical SEM',
    workingPrincipleSummary: {
      en: 'Replaces visible light with an accelerated relativistic beam of electrons (de Broglie wavelength λ < 0.0037 nm at 100 kV), yielding atomic and sub-nanometer resolving power (>1000-fold greater than optical diffraction limits).',
      hinglish: 'Light ki jagah high-voltage accelerated electrons ki beam use karta hai. Electron ki de Broglie wavelength bohot short hoti hai jisse viruses, ribosomes, aur membrane bilayers sub-nanometer level par dikhte hain.',
    },
    highResDiagram: {
      title: 'Electromagnetic Lens Column & Ultra-High Vacuum Column',
      diagramType: 'Relativistic Electron Beam Optics & Detector Geometry',
      description: {
        en: 'Diagram shows Schottky Field Emission Gun cathode accelerating electrons at 200 kV down an ultra-high vacuum column (10^-7 Pa), focused by magnetic condenser and objective coils through an ultrathin specimen (<80 nm), captured by a Direct Electron Detector camera.',
        hinglish: '200 kV electron gun se electrons vacuum column me nikalte hain; magnetic lenses beam focus karke specimen ke organelle structure ko direct electron detector par render karti hain.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Field Emission Gun (FEG) Cathode', action: 'Extracts coherent electrons from a sharp tungsten-zirconia tip at 200 kV potential', scientificSignificance: 'Generates monoenergetic electron beam with high spatial coherence' },
        { stage: 2, component: 'Electromagnetic Condenser Lenses', action: 'Magnetic coils create Lorentz forces (F = q[E + v × B]) focusing electron trajectories', scientificSignificance: 'Controls beam spot diameter down to sub-nanometer probe sizes' },
        { stage: 3, component: 'Direct Electron Detector (DED)', action: 'Incident electrons interact directly with CMOS pixels without phosphor conversion', scientificSignificance: 'High Detective Quantum Efficiency (DQE) for near-atomic Cryo-EM reconstruction' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Ultra-Thin Sectioning & Staining', hinglish: 'Specimen Prep' },
        instruction: { en: 'Biological samples fixed in glutaraldehyde and embedded in epoxy resin must be cut into 60–80 nm ultrathin sections on an ultramicrotome with a diamond knife. Collect sections on carbon-coated copper grids and stain with 2% Uranyl Acetate and Lead Citrate.', hinglish: 'Sample ko resin me embed karke diamond knife se 60-80 nm thin cut karein aur Uranyl Acetate heavy metal se stain karein.' },
        criticalSOP: { en: 'Sections thicker than 100 nm cause severe chromatic aberration and beam scattering, producing dark blurry silhouettes.', hinglish: '100 nm se moti section me electron beam pass nahi ho sakti.' },
      },
      {
        step: 2,
        title: { en: 'Specimen Holder Loading & Airlock Pumping', hinglish: 'Airlock Loading' },
        instruction: { en: 'Insert copper grid into the tip of the goniometer specimen holder. Insert holder into column airlock and initiate differential vacuum pumping (wait for vacuum < 10^-5 Pa).', hinglish: 'Grid ko holder me load karein aur airlock pump hone dein.' },
        criticalSOP: { en: 'Never advance the holder into the column until the airlock vacuum light turns green.', hinglish: 'Vacuum create hone se pehle holder advance na karein.' },
      },
      {
        step: 3,
        title: { en: 'High Voltage Ramp (HT 200 kV)', hinglish: 'High Tension On' },
        instruction: { en: 'Step up High Tension (HT) slowly to 200 kV. Turn on filament beam current. Align condenser and objective apertures.', hinglish: 'High tension 200 kV ramp karein aur beam align karein.' },
        criticalSOP: { en: 'Verify cold trap dewar is filled with liquid nitrogen to cryo-pump residual moisture.', hinglish: 'Liquid nitrogen dewar hamesha filled hona chahiye.' },
      },
      {
        step: 4,
        title: { en: 'Eucentric Height & Astigmatism Correction', hinglish: 'Focus aur Astigmatism' },
        instruction: { en: 'Adjust stage Z-height to the eucentric plane. Correct objective stigmator coils using Thon rings on amorphous carbon film FFT.', hinglish: 'Stage ko eucentric height par le jayein aur astigmatism correct karein.' },
        criticalSOP: { en: 'Uncorrected astigmatism distorts spherical viral capsids into stretched ellipsoids.', hinglish: 'Astigmatism correct na hone par image distort ho jati hai.' },
      },
      {
        step: 5,
        title: { en: 'Low-Dose Digital Exposure', hinglish: 'Low-Dose Imaging' },
        instruction: { en: 'Switch to Low-Dose exposure mode (<20 e-/Å^2 total dose) to record high-resolution micrographs on the direct detector.', hinglish: 'Low-dose mode use karke micrograph capture karein taaki biological sample burn na ho.' },
        criticalSOP: { en: 'Biological samples are damaged rapidly by beam radiolysis at electron doses exceeding 50 e-/Å^2.', hinglish: 'High electron dose se sample destroy ho jata hai.' },
      },
    ],
    hardwareComponents: [
      { name: 'Field Emission Electron Source', specification: 'Schottky FEG emitter at 80–300 kV accelerating voltage', function: 'Produces high-brightness electron beam' },
      { name: 'Electromagnetic Lens System', specification: 'Water-cooled magnetic polepieces with sub-micron alignment', function: 'Focuses relativistic electrons' },
      { name: 'Turbomolecular & Ion Getter Pumps', specification: 'Ultra-high vacuum system maintaining 10^-7 Pa', function: 'Prevents electron-gas scattering' },
    ],
    biotechApplications: [
      'Resolving viral architecture (capsids, envelope spikes) and bacteriophages.',
      'Cryo-EM single-particle 3D reconstruction of ribosome complexes and membrane channels.',
      'Ultrastructural pathology of kidney glomerular basement membranes and mitochondrial cristae.',
      'Characterization of lipid nanoparticles (LNPs) and liposomal drug delivery vesicles.',
    ],
    safetyPrecautions: [
      'Lead-lined column shields laboratory from bremsstrahlung X-ray radiation produced by electron deceleration.',
    ],
    scientificFormulas: [
      { name: 'De Broglie Wavelength of Relativistic Electrons', equation: 'λ = h / sqrt(2 · m0 · e · V · (1 + e · V / (2 · m0 · c^2)))', explanation: 'At 200 kV accelerating potential, electron wavelength λ = 0.00251 nm (0.025 Å).' },
    ],
  },

  // 14. Stirred Tank Bioreactor (Fermenter)
  {
    id: 'bioreactor',
    slug: 'bioreactor',
    name: {
      en: 'Stirred Tank Bioreactor (Fermenter)',
      hinglish: 'Stirred Tank Bioreactor (Fermenter)',
    },
    category: 'Bioprocess & Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Stainless steel automated stirred-tank pilot fermenter with Rushton impellers and sensors',
    modelDesignation: 'Benchtop-to-Pilot Autoclavable Stirred Tank Bioreactor (5–10 L)',
    workingPrincipleSummary: {
      en: 'Maintains an optimal biomechanical and chemical microenvironment (pH, dissolved oxygen, temperature, nutrient feed, and agitation shear) for microbial or mammalian cell growth and recombinant protein synthesis.',
      hinglish: 'Recombinant cells aur micro-organisms ke mass growth ke liye controlled environment (Dissolved Oxygen, pH, Temperature, Agitation) provide karta hai for commercial bioproduction.',
    },
    highResDiagram: {
      title: 'Bioreactor Geometry, Impeller Hydrodynamics & Mass Transfer',
      diagramType: 'Rushton Turbine Aeration & Mass Transfer Vector Schematic',
      description: {
        en: 'Diagram shows borosilicate glass vessel, top-mounted motor driving 6-blade Rushton turbine impellers, ring sparger dispersing sterile oxygen microbubbles, heating/cooling water jacket, polarographic DO probe, glass pH probe, and automated peristaltic feed pumps.',
        hinglish: 'Motor Rushton turbine ko rotate karta hai jo oxygen bubbles ko break karke liquid me dissolve karta hai; sensors real time me pH aur DO maintain karte hain.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Rushton Turbine Impeller', action: 'Six-blade radial turbine shears incoming sparged air bubbles into fine microbubbles', scientificSignificance: 'Maximizes interfacial surface area (a), elevating oxygen mass transfer kLa' },
        { stage: 2, component: 'Micro-Porous Ring Sparger', action: 'Disperses sterile air/O2 gas mixture beneath lower impeller at 0.5–2.0 vvm', scientificSignificance: 'Provides continuous dissolved oxygen tension above critical threshold (Ccrit)' },
        { stage: 3, component: 'Automated PID Feedback Loop', action: 'Real-time telemetry commands peristaltic pumps (acid/base dosing) and heating jacket', scientificSignificance: 'Maintains tight setpoints (e.g. 37.0°C ± 0.1°C, pH 7.20 ± 0.05)' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Vessel Assembly & Mechanical Seal Inspection', hinglish: 'Vessel Assembly' },
        instruction: { en: 'Assemble glass vessel with stainless steel top plate. Inspect O-rings, mechanical drive shaft seals, and baffle cages. Mount polarographic DO probe, pH probe, and sampling pipe.', hinglish: 'Glass vessel aur top plate assemble karein, O-rings check karein aur pH/DO probes mount karein.' },
        criticalSOP: { en: 'A pinched or dried O-ring results in sterility failure during prolonged 72-hour fermentation runs.', hinglish: 'O-ring damage hone par contamination aa jayegi.' },
      },
      {
        step: 2,
        title: { en: 'In Situ Autoclaving / Sterilization in Place', hinglish: 'SIP / Autoclave Sterilization' },
        instruction: { en: 'Fill vessel with nutrient broth. Wrap exhaust gas filter in aluminum foil with clamp open. Autoclave entire vessel at 121°C for 30 minutes.', hinglish: 'Media fill karke exhaust filter wrap karein aur 121°C par 30 min autoclave karein.' },
        criticalSOP: { en: 'Never autoclave with exhaust filter clamped shut; steam pressure will burst the hydrophobic PTFE membrane.', hinglish: 'Exhaust filter clamp band karke autoclave na karein.' },
      },
      {
        step: 3,
        title: { en: 'Probe Calibration (DO & pH)', hinglish: 'DO & pH Probe Calibration' },
        instruction: { en: 'Connect probes to controller. Calibrate pH probe. Polarize DO probe for 6 hours; calibrate 0% (nitrogen sparging) and 100% (air sparging at maximum RPM).', hinglish: 'DO probe ko 6 ghante polarize karein aur 0% (N2) aur 100% (Air) par calibrate karein.' },
        criticalSOP: { en: 'Calibrate DO 100% only after media has reached full operating temperature (37°C); oxygen solubility drops at higher temperatures.', hinglish: 'Temperature stabilize hone ke baad hi 100% DO calibrate karein.' },
      },
      {
        step: 4,
        title: { en: 'Aseptic Inoculation & Growth Phase', hinglish: 'Inoculation aur Growth' },
        instruction: { en: 'Inoculate mid-log seed culture (5–10% v/v) aseptically via septum injection port using a flame. Engage automated DO cascade (agitation 200–800 RPM, O2 enrichment).', hinglish: '5-10% seed culture aseptically inoculate karein aur DO cascade start karein.' },
        criticalSOP: { en: 'If excessive foaming occurs, antifoam probe automatically triggers peristaltic injection of sterile silicone antifoam.', hinglish: 'Foam aane par antifoam pump automatic silicone oil dispense karta hai.' },
      },
      {
        step: 5,
        title: { en: 'Induction & Broth Harvest', hinglish: 'Induction aur Harvest' },
        instruction: { en: 'At target cell density (OD600 = 0.8–1.2 for shake-flask seed, or >50 for fed-batch), add IPTG inducer. After 6 hours of expression, chill vessel to 15°C and harvest broth via bottom harvest valve.', hinglish: 'Target OD par IPTG add karke protein express karein aur harvest valve se broth collect karein.' },
        criticalSOP: { en: 'Aseptically sample 5 mL every 2 hours to monitor glucose consumption and check Gram-stain purity under the microscope.', hinglish: 'Gram stain se check karein ki culture pure hai ya contaminate ho gayi.' },
      },
    ],
    hardwareComponents: [
      { name: 'Rushton Turbine Agitator', specification: 'Dual 6-blade disk turbine on 316L stainless steel shaft', function: 'Shears bubbles and promotes liquid mixing' },
      { name: 'Optical / Polarographic DO Sensor', specification: 'Clark-type or optical fluorescence quenching probe', function: 'Measures dissolved oxygen saturation (0–100%)' },
      { name: 'Four-Peristaltic Pump Bank', specification: 'Variable-speed stepper pumps for Acid, Base, Feed, Antifoam', function: 'Automated chemical dosing' },
    ],
    biotechApplications: [
      'Industrial production of therapeutic recombinant proteins (Insulin, Monoclonal antibodies, EPO).',
      'Microbial fermentation of primary and secondary metabolites (Ethanol, Citric acid, Penicillin).',
      'High-cell-density cultivation of bacterial and yeast vaccine antigens.',
      'Scale-up kinetics modeling and bioprocess optimization.',
    ],
    safetyPrecautions: [
      'Ensure exhaust gas condenser is active; hot moist exhaust air clogs sterile vent filters, building dangerous overpressure.',
    ],
    scientificFormulas: [
      { name: 'Volumetric Oxygen Transfer Rate (OTR)', equation: 'OTR = kLa · (C* - CL)', explanation: 'Where kLa is volumetric mass transfer coefficient (h^-1), C* is equilibrium saturation DO, and CL is actual DO.' },
    ],
  },

  // 15. CO2 Incubator & BOD Incubator
  {
    id: 'incubator',
    slug: 'incubator',
    name: {
      en: 'CO2 Incubator & BOD Incubator',
      hinglish: 'CO2 Incubator (Cell Culture)',
    },
    category: 'Sterilization & Culture',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mammalian cell culture CO2 incubator with stainless steel chamber and infrared sensor',
    modelDesignation: 'Direct-Heat / Water-Jacketed CO2 Cell Culture Incubator (150–200 L)',
    workingPrincipleSummary: {
      en: 'Maintains optimal in vivo-like physiological conditions for mammalian cell growth: constant temperature (37.0°C), saturated humidity (>95% to prevent osmotic evaporation), and 5.0% CO2 gas tension to balance sodium bicarbonate buffering in media at pH 7.2–7.4.',
      hinglish: 'Mammalian cells ke liye natural body jaisa environment banata hai: 37°C temperature, 95% humidity, aur 5% CO2 jo medium ke bicarbonate buffer ko pH 7.4 par balance rakhti hai.',
    },
    highResDiagram: {
      title: 'CO2-Bicarbonate Buffer Equilibrium & Internal Circulation',
      diagramType: 'Gas Tension & Humidity Chamber Thermodynamics',
      description: {
        en: 'Diagram shows direct-heat 6-sided heating elements, internal heated glass door preventing condensation, stainless steel water pan creating 95% humidity, infrared (IR) optical CO2 sensor, and CO2 injection solenoid valve maintaining equilibrium: CO2 + H2O <=> H2CO3 <=> H+ + HCO3-.',
        hinglish: 'IR sensor CO2 level detect karke 5% level maintain karta hai; dissolved CO2 sodium bicarbonate ke sath react karke pH balance rakhti hai.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Infrared (IR) Optical CO2 Sensor', action: 'Single-beam dual-wavelength IR sensor quantifies 4.2 µm CO2 absorption peak', scientificSignificance: 'Immune to humidity and temperature fluctuations unlike old thermal sensors' },
        { stage: 2, component: 'Direct-Heat Multi-Zone Mantle', action: 'Surrounds all 6 inner chamber faces with independent heating circuits', scientificSignificance: 'Ensures rapid temperature recovery (<5 min post door opening)' },
        { stage: 3, component: 'Heated Inner Glass Sub-Door', action: 'Maintained 0.5°C above chamber temperature to prevent moisture condensation', scientificSignificance: 'Eliminates drip pools that foster fungal mold growth' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Water Pan Filling (Sterile Water)', hinglish: 'Water Pan Fill Karna' },
        instruction: { en: 'Fill clean stainless steel humidity pan with 2.0 L of sterile deionized water supplemented with 0.05% copper sulfate or laboratory water-conditioner.', hinglish: 'Pan me 2 liter sterile water daalein jisme fungal conditioner mixed ho.' },
        criticalSOP: { en: 'Never use tap water or pure distilled water without biocide; standing warm water is a primary breeding ground for Aspergillus mold.', hinglish: 'Tap water kabhi use na karein, mold grow ho sakti hai.' },
      },
      {
        step: 2,
        title: { en: 'Gas Supply Pressure Verification', hinglish: 'CO2 Cylinder Check' },
        instruction: { en: 'Verify medical-grade (99.9% pure) CO2 cylinder regulator delivers steady 15 psi (1.0 bar) inlet pressure. Check dual-stage automatic cylinder switchover valve.', hinglish: 'CO2 cylinder regulator 15 psi par set karein aur cylinder me gas check karein.' },
        criticalSOP: { en: 'If CO2 runs out overnight, media turns basic (bright magenta/purple) and mammalian cells detach and die.', hinglish: 'CO2 khatam hone par media ka pH basic ho kar cells mar jayengi.' },
      },
      {
        step: 3,
        title: { en: 'Parameter Verification (37.0°C / 5.0% CO2)', hinglish: 'Parameter Stabilization' },
        instruction: { en: 'Allow incubator to equilibrate for 12 hours after filling. Verify chamber temp is 37.0°C and CO2 is 5.0% on digital readout.', hinglish: '12 ghante stabilize hone ke baad check karein ki temp 37°C aur CO2 5% par constant hai.' },
        criticalSOP: { en: 'Verify CO2 calibration monthly using a certified Fyrite or handheld IR gas analyzer.', hinglish: 'External handheld IR analyzer se monthly cross-verify karein.' },
      },
      {
        step: 4,
        title: { en: 'Minimizing Door Opening Duration', hinglish: 'Door Open Time Kam Rakhna' },
        instruction: { en: 'Open outer and inner doors smoothly. Load culture flasks with filter caps loosened by half-turn. Close immediately (<10 seconds).', hinglish: 'Door jaldi se open-close karein (<10 seconds) aur flasks load karein.' },
        criticalSOP: { en: 'Leaving doors open for 60 seconds drops CO2 to room levels (0.04%), requiring up to 30 minutes to recover physiological equilibrium.', hinglish: 'Door zyada der khula rakhne se sara CO2 escape ho jata hai.' },
      },
      {
        step: 5,
        title: { en: 'High-Temperature Decontamination Cycle', hinglish: 'Decontamination Cycle' },
        instruction: { en: 'Every 3 months, remove cells, empty water pan, and initiate the automated 160°C dry-heat or 90°C moist-heat overnight decontamination cycle.', hinglish: 'Har 3 mahine me automated 160°C heat decontamination cycle run karein.' },
        criticalSOP: { en: 'Remove sensitive CO2 sensors prior to heat cycles if specified by manufacturer.', hinglish: 'Sensor instructions follow karein.' },
      },
    ],
    hardwareComponents: [
      { name: 'Infrared (IR) CO2 Detector', specification: 'Solid-state optical sensor with auto-zero baseline calibration', function: 'Maintains 5.0% CO2 gas tension' },
      { name: 'Stainless Steel Water Reservoir Pan', specification: 'Passivated 304 stainless steel pan (95% relative humidity)', function: 'Prevents culture media evaporation' },
      { name: 'Dual Heating Doors', specification: 'Tempered glass inner viewing door with perimeter heater', function: 'Prevents condensation dripping' },
    ],
    biotechApplications: [
      'Culture of continuous cancer cell lines (HeLa, HEK293, CHO, Jurkat).',
      'Propagation of primary human dermal fibroblasts, cardiomyocytes, and hepatocytes.',
      'Induced pluripotent stem cell (iPSC) differentiation and organoid generation.',
      'In vitro preclinical drug toxicity assays and viral plaque assays.',
    ],
    safetyPrecautions: [
      'Ensure room has adequate ventilation; catastrophic CO2 cylinder leak in small closed rooms poses asphyxiation hazard.',
    ],
    scientificFormulas: [
      { name: 'Henderson-Hasselbalch Bicarbonate Buffer System', equation: 'pH = pKa + log10([HCO3-] / (α · pCO2))', explanation: 'At 37°C with pKa = 6.1 and 5% CO2 (pCO2 ≈ 35 mmHg), 24 mM sodium bicarbonate maintains physiological pH 7.4.' },
    ],
  },

  // 16. Rotational & Oscillatory Rheometer
  {
    id: 'rheometer',
    slug: 'rheometer',
    name: {
      en: 'Rotational & Oscillatory Rheometer',
      hinglish: 'Rotational Rheometer',
    },
    category: 'Bioprocess & Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Precision air-bearing research rotational and oscillatory rheometer with cone-and-plate geometry',
    modelDesignation: 'Air-Bearing Stress-Controlled Research Rheometer',
    workingPrincipleSummary: {
      en: 'Quantifies deformation and flow behavior (viscosity η, elastic storage modulus G\', and viscous loss modulus G\'\') of non-Newtonian biological fluids, hydrogels, and fermentation broths under controlled rotational shear or sinusoidal oscillation.',
      hinglish: 'Biological solutions, hydrogels, aur fermentation broths ki viscosity aur viscoelastic properties (elastic storage modulus G\' vs liquid loss modulus G\'\') measure karta hai.',
    },
    highResDiagram: {
      title: 'Cone-Plate Geometry & Oscillatory Viscoelastic Vectors',
      diagramType: 'Air-Bearing Drag-Cup Motor & Phase Shift Angle Schematic',
      description: {
        en: 'Diagram shows low-friction porous carbon air bearing, drag-cup torque motor, upper measuring geometry (cone angle 1° or 2°), lower Peltier thermal plate (-40°C to +200°C), and optical angular deflection encoder recording phase angle shift delta: delta = 0° (pure elastic solid), delta = 90° (pure viscous liquid).',
        hinglish: 'Air bearing motor torque apply karta hai; phase angle delta se pata chalta hai biomaterial solid-like hai ya liquid-like.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Porous Carbon Air Bearing', action: 'Floats motor spindle on compressed air cushion with virtually zero friction (<1 nN·m residual torque)', scientificSignificance: 'Resolves delicate hydrogel network elasticity' },
        { stage: 2, component: 'Peltier Lower Stage', action: 'Maintains sample temperature from -40°C to 200°C with 0.01°C stability', scientificSignificance: 'Tracks thermal gelation and protein denaturation transitions' },
        { stage: 3, component: 'Optical Angular Encoder', action: 'Measures angular deflection with sub-nanoradian resolution', scientificSignificance: 'Measures minute strain amplitudes without breaking delicate bio-scaffolds' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'Air Bearing Pressure & Zero Gap Calibration', hinglish: 'Zero Gap Set Karna' },
        instruction: { en: 'Verify compressed air supply is 6.0 bar. Clean lower plate and upper cone. Run automated Zero Gap calibration routine at assay temperature.', hinglish: 'Compressed air 6 bar check karein aur automated zero-gap calibration run karein.' },
        criticalSOP: { en: 'Never spin the motor spindle when compressed air is turned off; unfloated bearings suffer immediate permanent damage.', hinglish: 'Bina compressed air ke motor spindle kabhi na ghumayein.' },
      },
      {
        step: 2,
        title: { en: 'Precise Sample Volume Loading', hinglish: 'Sample Loading' },
        instruction: { en: 'Pipette exact calculated volume (e.g. 52 µL for 40 mm 1° cone) onto center of lower plate without bubbles. Lower geometry to trim gap.', hinglish: 'Exact volume (e.g. 52 µL) center me load karein bina kisi bubble ke.' },
        criticalSOP: { en: 'Underfilling or overfilling causes severe mathematical errors in shear stress calculations.', hinglish: 'Volume na kam hona chahiye na zyada.' },
      },
      {
        step: 3,
        title: { en: 'Trimming & Solvent Trap Placement', hinglish: 'Trimming aur Solvent Trap' },
        instruction: { en: 'Trim excess fluid with a clean plastic spatula at the trim gap. Lower to final measurement gap. Place solvent trap cover with moistened sponge.', hinglish: 'Extra liquid trim karein aur evaporation rokne ke liye solvent trap cover lagayein.' },
        criticalSOP: { en: 'Without a solvent trap, micro-volume biological samples dehydrate within 10 minutes, generating false high viscosity readings.', hinglish: 'Solvent trap ke bina sample dehydrate ho jayega.' },
      },
      {
        step: 4,
        title: { en: 'Amplitude Sweep (Linear Viscoelastic Region)', hinglish: 'Strain Sweep (LVR)' },
        instruction: { en: 'Perform dynamic strain amplitude sweep (0.01% to 100% strain at 1 Hz frequency) to identify the Linear Viscoelastic Region (LVR) where G\' and G\'\' are strain-independent.', hinglish: 'Strain sweep run karke Linear Viscoelastic Region (LVR) find karein.' },
        criticalSOP: { en: 'All subsequent frequency and temperature sweeps MUST be performed at a strain amplitude inside the identified LVR.', hinglish: 'Test LVR region ke andar hi hona chahiye.' },
      },
      {
        step: 5,
        title: { en: 'Frequency Sweep & Gel Point Determination', hinglish: 'Gel Point Analysis' },
        instruction: { en: 'Run oscillatory frequency sweep (0.1 to 100 rad/s). The crossover point where storage modulus G\' exceeds loss modulus G\'\' marks the sol-gel transition point.', hinglish: 'Frequency sweep run karein; jahan G\' loss modulus G\'\' ko cross karta hai wahi Gelation point hota hai.' },
        criticalSOP: { en: 'Clean geometries immediately post-run with warm DI water and isopropanol; crosslinked hydrogels cure rock-hard on titanium surfaces.', hinglish: 'Run khatam hote hi cone aur plate ko clean karein.' },
      },
    ],
    hardwareComponents: [
      { name: 'Porous Carbon Air Bearing', specification: 'Radial/axial air bearing, torque range 0.5 nN·m to 200 mN·m', function: 'Zero-friction spindle suspension' },
      { name: 'Titanium Cone-and-Plate Geometry', specification: '40 mm diameter, 1° cone angle with truncation gap 27 µm', function: 'Produces uniform shear rate across entire radius' },
      { name: 'Peltier Temperature Control Stage', specification: '-40°C to +200°C, ramp rates up to 30°C/min', function: 'Regulates sample temperature' },
    ],
    biotechApplications: [
      'Characterizing injectability and gelation kinetics of 3D bioprinting bio-inks.',
      'Viscosity and pseudoplastic shear-thinning profiling of fungal fermentation broths.',
      'Stability and aggregation monitoring of high-concentration monoclonal antibody formulations.',
      'Measuring mechanical stiffness (storage modulus G\') of tissue engineering scaffolds.',
    ],
    safetyPrecautions: [
      'Keep fingers clear during automated geometry descent; motor drives down with up to 50 N axial force.',
    ],
    scientificFormulas: [
      { name: 'Complex Modulus (Viscoelasticity)', equation: 'G* = G\' + i · G\'\'  ;  tan(δ) = G\'\' / G\'', explanation: 'Where G\' is elastic storage modulus, G\'\' is viscous loss modulus, and δ is phase angle.' },
    ],
  },

  // 17. 3D Bioprinter
  {
    id: '3d-bioprinter',
    slug: '3d-bioprinter',
    name: {
      en: '3D Bioprinter (Extrusion & Photopolymerization)',
      hinglish: '3D Bioprinter',
    },
    category: 'Bioprocess & Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High-precision multi-head pneumatic extrusion 3D bioprinter in tissue engineering laboratory',
    modelDesignation: 'Multi-Head Pneumatic / Mechanical Micro-Extrusion Bioprinter',
    workingPrincipleSummary: {
      en: 'Computer-controlled additive layer-by-layer spatial deposition of living cells encapsulated within biomimetic hydrogel bio-inks (alginate, gelatin-methacryloyl GelMA, collagen) to fabricate tissue-engineered constructs with sub-millimeter anatomical micro-architecture.',
      hinglish: 'Living cells ko biocompatible hydrogel (bio-ink) ke sath mix karke layer-by-layer 3D patterns me print karta hai to build artificial tissues aur organ scaffolds.',
    },
    highResDiagram: {
      title: 'Cartesian Robotic Gantry & Pneumatic Micro-Extrusion Printhead',
      diagramType: 'Microfluidic Dispensing & Photocrosslinking Schematic',
      description: {
        en: 'Diagram shows sub-micron stepper-driven Cartesian XYZ gantry, temperature-controlled syringe barrel, precision pneumatic pressure controller (0–100 psi), micro-nozzle dispensing cell-laden bio-ink filament, and 365/405 nm photocrosslinking ring solidifying polymer chains.',
        hinglish: 'XYZ robotic motors nozzle ko move karte hain; pneumatic pressure bio-ink dispense karti hai aur UV/blue light use solidify karti hai bina cells ko kill kiye.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'Pneumatic Pressure Controller', action: 'Applies regulated air pulses (5–80 psi) to syringe piston without mechanical pulsing', scientificSignificance: 'Achieves steady, continuous filament extrusion' },
        { stage: 2, component: 'Temperature-Regulated Printhead', action: 'Maintains bio-ink thermal state (e.g. 15–20°C for GelMA physical gelation prior to print)', scientificSignificance: 'Controls viscosity for optimal filament shape fidelity' },
        { stage: 3, component: 'Integrated UV/Blue Photocrosslinker', action: 'Emits 405 nm visible or 365 nm UV light with intensity-controlled LEDs', scientificSignificance: 'Activates photoinitiator (LAP/Irgacure) crosslinking polymers without damaging cellular DNA' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'CAD Modeling & G-Code Slicing', hinglish: '3D Design & Slicing' },
        instruction: { en: 'Design 3D porous tissue scaffold in CAD software. Slice model into G-code toolpaths with defined layer height (e.g. 150 µm), print speed (5–15 mm/s), and infill density (40%).', hinglish: 'CAD me 3D structure design karein aur slicing software me layer height aur speed set karein.' },
        criticalSOP: { en: 'Pore size must be between 150 and 300 µm to allow nutrient diffusion and vascular capillary ingrowth.', hinglish: 'Pore size 150-300 µm hona chahiye taaki cells ko oxygen milti rahe.' },
      },
      {
        step: 2,
        title: { en: 'Bio-Ink Cell Mixing (Under Laminar Flow)', hinglish: 'Cells & Bio-ink Mixing' },
        instruction: { en: 'In a sterile laminar flow hood, gently mix cell pellet (e.g. 5 × 10^6 cells/mL) with warmed GelMA bio-ink containing 0.1% LAP photoinitiator using sterile luer-lock dual-syringes.', hinglish: 'Laminar hood me cells ko GelMA bio-ink aur photoinitiator ke sath bubble-free mix karein.' },
        criticalSOP: { en: 'Mix gently back and forth without shearing cells or introducing micro-bubbles.', hinglish: 'Fast mix na karein, cells shear ho sakti hain.' },
      },
      {
        step: 3,
        title: { en: 'Nozzle Caliper & Print Bed Calibrating', hinglish: 'Nozzle Calibration' },
        instruction: { en: 'Mount syringe into printhead. Attach 25G or 27G conical dispensing tip. Execute automated 3-point surface probing to calibrate nozzle-to-bed offset.', hinglish: 'Nozzle attach karein aur 3-point calibration se bed distance set karein.' },
        criticalSOP: { en: 'Use conical nozzles rather than straight cylindrical needles; conical geometry minimizes shear stress on cell membranes.', hinglish: 'Conical nozzles use karein taaki cell mortality kam ho.' },
      },
      {
        step: 4,
        title: { en: 'Layer-by-Layer Extrusion Printing', hinglish: 'Printing Execution' },
        instruction: { en: 'Initiate print job. Adjust pneumatic extrusion pressure (typically 15–35 kPa) in real time until a continuous, uniform filament extrudes without dragging or balling.', hinglish: 'Print start karein aur pressure adjust karein jab tak uniform continuous filament na bane.' },
        criticalSOP: { en: 'Excessive extrusion pressure (>50 psi) causes lethal mechanical shear, dropping cell viability below 50%.', hinglish: 'Zyada pressure cells ko burst kar deta hai.' },
      },
      {
        step: 5,
        title: { en: 'Post-Print Photocrosslinking & Culture', hinglish: 'Photocrosslinking & Incubation' },
        instruction: { en: 'Expose printed construct to 405 nm blue light (10 mW/cm^2) for 30–60 seconds to crosslink covalent bonds. Submerge immediately in warm complete cell culture medium and transfer to 37°C CO2 incubator.', hinglish: '405 nm light se 30-60 second crosslink karein aur culture medium me rakh kar incubator me shift karein.' },
        criticalSOP: { en: 'Do not over-cure; prolonged light exposure elevates free radicals and hardens matrix excessively, halting cellular migration.', hinglish: 'Zyada der light na daalein, free radicals se cell death ho sakti hai.' },
      },
    ],
    hardwareComponents: [
      { name: 'Cartesian XYZ Stepper Gantry', specification: 'Positional accuracy: X/Y 5 µm, Z 2.5 µm', function: 'Precise spatial toolpath positioning' },
      { name: 'Pneumatic Micro-Extruder Head', specification: 'Digitally regulated pressure 0–700 kPa (0–100 psi)', function: 'Dispenses viscous cell-laden hydrogels' },
      { name: 'Dual Wavelength LED Ring', specification: '365 nm UV and 405 nm Blue light modules', function: 'Photo-cures hydrogel constructs' },
    ],
    biotechApplications: [
      'Fabricating vascularized tissue constructs and artificial skin graft substitutes.',
      'Constructing 3D in vitro organ-on-a-chip models for preclinical drug screening.',
      'Printing patient-specific porous osteochondral bone scaffolds.',
      'High-throughput 3D tumor spheroid modeling for oncology therapeutics.',
    ],
    safetyPrecautions: [
      'Always operate inside a certified biosafety enclosure when printing human primary cells or viral-transduced lines.',
    ],
    scientificFormulas: [
      { name: 'Hagen-Poiseuille Hydrodynamic Wall Shear Stress', equation: 'τ_wall = (4 · Q · η) / (π · r^3)', explanation: 'Calculates shear stress on cell membranes as a function of volumetric flow rate (Q), viscosity (η), and nozzle radius (r).' },
    ],
  },

  // 18. Circular Dichroism (CD) Spectropolarimeter
  {
    id: 'cd-spectrometer',
    slug: 'cd-spectrometer',
    name: {
      en: 'Circular Dichroism (CD) Spectropolarimeter',
      hinglish: 'Circular Dichroism (CD) Spectrometer',
    },
    category: 'Spectroscopy',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High-end Circular Dichroism Spectropolarimeter with continuous nitrogen gas purge manifold',
    modelDesignation: 'Far-UV & Near-UV Research CD Spectropolarimeter (163–900 nm)',
    workingPrincipleSummary: {
      en: 'Measures the difference in absorption between left-handed (AL) and right-handed (AR) circularly polarized light (ΔA = AL - AR) by optically active asymmetric chiral molecules. Serves as the gold standard for quantifying protein secondary structure (alpha-helices, beta-sheets, random coils) and thermal folding/unfolding transitions.',
      hinglish: 'Chiral molecules dwara left-handed aur right-handed circularly polarized light ki absorption difference (Delta A = AL - AR) ko measure karta hai. Protein secondary structure (alpha-helix, beta-sheet) analyze karne ka gold standard hai.',
    },
    highResDiagram: {
      title: 'Photoelastic Modulator (PEM) & Circular Polarization Optics',
      diagramType: 'Far-UV Circular Polarization & Ellipticity Schematic',
      description: {
        en: 'Diagram shows Xenon lamp with pure nitrogen gas purge manifold, double-prism monochromator, Photoelastic Modulator (PEM) oscillating quartz crystal at 50 kHz converting plane-polarized light into alternating left/right circular polarization, Far-UV cuvette (0.1 mm pathlength), and lock-in amplifier detector displaying alpha-helical twin negative minima at 208 nm and 222 nm.',
        hinglish: 'PEM 50 kHz par oscillate karke left aur right circularly polarized light banata hai; alpha-helix protein me 208 nm aur 222 nm par twin negative peaks aate hain.',
      },
      opticalOrMechanicalPath: [
        { stage: 1, component: 'High-Power Xenon Arc Lamp (150W)', action: 'Produces intense continuum from deep Far-UV (163 nm) to near-infrared', scientificSignificance: 'Enables measurement across amide backbone absorption bands' },
        { stage: 2, component: 'Continuous N2 Gas Purge Manifold', action: 'Purges atmospheric oxygen with pure nitrogen at ≥ 5 L/min', scientificSignificance: 'Prevents formation of toxic corrosive ozone and eliminates oxygen UV absorption below 200 nm' },
        { stage: 3, component: 'Photoelastic Modulator (PEM 50 kHz)', action: 'Applies dynamic alternating sinusoidal quarter-wave retardation', scientificSignificance: 'Generates left and right circularly polarized light 50,000 times per second' },
        { stage: 4, component: 'Lock-In Amplifier Detector', action: 'Demodulates alternating signal into differential absorbance ΔA and molar ellipticity [θ]', scientificSignificance: 'Resolves differential absorbance deltas down to 0.00001 AU' },
      ],
    },
    stepByStepOperatingPrinciples: [
      {
        step: 1,
        title: { en: 'High-Purity Nitrogen Purge (Vital Step)', hinglish: 'Nitrogen Purge On Karna' },
        instruction: { en: 'Open high-purity (99.999%) Nitrogen gas cylinder. Adjust flow rate to 5 L/min for optics and 3 L/min for lamp housing. Purge for 20 minutes BEFORE igniting the Xenon lamp.', hinglish: 'Xenon lamp on karne se 20 minute pehle Nitrogen gas (5 L/min) on karein.' },
        criticalSOP: { en: 'Never ignite Xenon lamp without Nitrogen flow; deep-UV radiation converts ambient oxygen into toxic ozone which destroys expensive optical mirrors in minutes.', hinglish: 'Bina N2 flow ke lamp on karne par ozone banegi jo optical mirrors ko destroy kar degi.' },
      },
      {
        step: 2,
        title: { en: 'Buffer Selection & Chloride Exclusion', hinglish: 'Buffer Selection (No Chloride)' },
        instruction: { en: 'Prepare protein in 10–20 mM Potassium Phosphate buffer (pH 7.4) or 10 mM Sodium Borate. Exclude absorbing species: Tris-HCl, NaCl, DTT, glycerol, and EDTA.', hinglish: '10 mM Phosphate buffer use karein; Tris-HCl aur NaCl avoid karein.' },
        criticalSOP: { en: 'Chloride ions (Cl-) absorb heavily below 200 nm, causing detector voltage saturation (high HT voltage > 600V) and total data invalidation.', hinglish: 'Chloride ions Far-UV me light absorb karke data corrupt kar dete hain.' },
      },
      {
        step: 3,
        title: { en: 'Short Pathlength Cuvette Loading (0.1 mm)', hinglish: '0.1 mm Quartz Cuvette' },
        instruction: { en: 'Pipette 200–300 µL of purified protein solution (0.1–0.5 mg/mL) into a precision 0.1 mm or 1.0 mm Far-UV quartz cuvette. Ensure zero bubble formation.', hinglish: '0.1 mm quartz cuvette me 200-300 µL protein sample load karein.' },
        criticalSOP: { en: 'Always acquire a blank buffer baseline scan under identical parameters before scanning protein sample.', hinglish: 'Sample se pehle exact buffer baseline scan zaroor run karein.' },
      },
      {
        step: 4,
        title: { en: 'Far-UV Spectral Acquisition (190–260 nm)', hinglish: 'Far-UV Scan Run' },
        instruction: { en: 'Run Far-UV scan from 260 nm down to 190 nm with scan speed 50 nm/min, bandwidth 1.0 nm, and digital integration time 2 seconds. Average 3 consecutive scans.', hinglish: '190 se 260 nm tak scan karein, speed 50 nm/min, aur 3 scans average karein.' },
        criticalSOP: { en: 'Monitor Dynode (HT) voltage channel continuously; discard any spectral data recorded where HT voltage exceeds 600–700 Volts.', hinglish: 'HT voltage > 600V hone par detector saturated hota hai, wo data reject karein.' },
      },
      {
        step: 5,
        title: { en: 'Mean Residue Ellipticity [θ]_MRE & Deconvolution', hinglish: 'Ellipticity & Deconvolution' },
        instruction: { en: 'Subtract buffer baseline. Convert raw millidegrees (mdeg) to Mean Residue Ellipticity [θ]_MRE. Submit spectrum to CD secondary structure deconvolution algorithms (e.g. BeStSel, CONTIN-LL, CDSSTR).', hinglish: 'Buffer subtract karke [θ]_MRE calculate karein aur BeStSel algorithm se alpha-helix/beta-sheet % nikal lein.' },
        criticalSOP: { en: 'Alpha-helix proteins show distinctive negative double minima at 208 nm and 222 nm, and positive maximum at 193 nm.', hinglish: 'Alpha-helix me 208 nm aur 222 nm par twin negative peaks aate hain.' },
      },
    ],
    hardwareComponents: [
      { name: '150W Ozone-Free Xenon Lamp', specification: 'Air-cooled short-arc Xenon burner with N2 purge jacket', function: 'Generates intense Far-UV continuum' },
      { name: 'Photoelastic Modulator (PEM)', specification: 'Piezoelectric transducer bonded to quartz crystal (50 kHz)', function: 'Generates circularly polarized light' },
      { name: 'High-Sensitivity End-Window PMT', specification: 'Low-noise photomultiplier with wide spectral response', function: 'Detects micro-ellipticity phase differences' },
    ],
    biotechApplications: [
      'Quantifying protein secondary structure composition (% alpha-helix, beta-sheet, turns, random coil).',
      'Thermal denaturation melting curves (Tm determination) to evaluate biopharmaceutical thermal stability.',
      'Monitoring ligand/substrate-induced conformational folding transitions.',
      'Comparability and biosimilarity testing of therapeutic monoclonal antibodies.',
    ],
    safetyPrecautions: [
      'Never operate instrument without exhaust ventilation and verified continuous nitrogen purge.',
    ],
    scientificFormulas: [
      { name: 'Mean Residue Ellipticity (MRE)', equation: '[θ]_MRE = (θ_obs × MRW) / (10 × c × l)', explanation: 'Where θ_obs is in millidegrees, MRW is Mean Residue Weight (MW / num amino acids ≈ 110 Da), c is mg/mL, and l is pathlength in cm.' },
    ],
  },
];
