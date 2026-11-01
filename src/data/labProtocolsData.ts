import { LabProtocol } from '../types/index.ts';

export const LAB_PROTOCOLS: LabProtocol[] = [
  {
    slug: 'alkaline-lysis-plasmid-isolation',
    title: {
      en: 'Plasmid DNA Isolation by Alkaline Lysis (Birnboim & Doly)',
      hinglish: 'Alkaline Lysis se Plasmid DNA Isolation (Birnboim & Doly Method)',
    },
    category: 'Molecular Biology',
    objective: {
      en: 'Isolate high-purity covalently closed circular (ccc) plasmid DNA from recombinant Escherichia coli bacterial cultures.',
      hinglish: 'E. coli bacterial culture se closed circular plasmid DNA ko high purity me separate aur purify karna.',
    },
    principle: {
      en: 'Based on differential alkaline denaturation of high-molecular-weight chromosomal DNA versus small covalently closed supercoiled plasmid DNA. Treatment with SDS-NaOH lyses cells and denatures all DNA. Neutralization with Potassium Acetate (pH 4.8-5.2) precipitates chromosomal DNA and SDS-protein complexes while plasmids rapidly renature and remain in solution.',
      hinglish: 'Alkaline conditions (NaOH + SDS) me chromosomal aur plasmid dono DNA denature hote hain. Acidic potassium acetate add karne par small circular plasmid DNA rapidly renature ho jata hai jabki giant genomic DNA protein complex ke sath precipitate banata hai.',
    },
    materials: [
      'Overnight recombinant E. coli culture in LB broth with selective antibiotic',
      '1.5 mL microcentrifuge tubes and microcentrifuge',
      'Micropipettes (P1000, P200, P20) and aerosol-resistant tips',
      'Vortex mixer and ice bucket',
    ],
    reagents: [
      'Solution I (Resuspension Buffer): 50 mM Glucose, 25 mM Tris-Cl (pH 8.0), 10 mM EDTA (pH 8.0), optional RNase A (100 ug/mL)',
      'Solution II (Lysis Solution - prepare fresh): 0.2 N NaOH, 1% (w/v) SDS',
      'Solution III (Neutralization Solution): 3 M Potassium Acetate, glacial acetic acid (chilled to 4°C, pH 4.8-5.2)',
      'Isopropanol (100%) and 70% (v/v) Ethanol',
      'TE Buffer: 10 mM Tris-Cl (pH 8.0), 1 mM EDTA',
    ],
    procedure: [
      {
        step: 1,
        instruction: {
          en: 'Pellet 1.5-3.0 mL of overnight bacterial culture by centrifugation at 12,000 x g for 2 minutes at room temperature. Decant and discard supernatant completely.',
          hinglish: 'Overnight bacterial culture ko 12,000 g par 2 minute centrifuge karke bacterial pellet banayein aur supernatant discard karein.',
        },
      },
      {
        step: 2,
        instruction: {
          en: 'Resuspend the bacterial pellet thoroughly in 200 uL of ice-cold Solution I by vigorous vortexing until no clumps remain.',
          hinglish: 'Pellet ko 200 uL chilled Solution I me vortex karke completely dissolve karein.',
        },
        criticalNote: 'Incomplete resuspension causes uneven lysis and lowers plasmid yield.',
      },
      {
        step: 3,
        instruction: {
          en: 'Add 200 uL of freshly prepared Solution II. Invert the tube gently 4-6 times to mix. DO NOT VORTEX.',
          hinglish: '200 uL Solution II daalein aur tube ko 4-6 baar gently invert karein. Vortex BILKUL NA KAREIN.',
        },
        criticalNote: 'Vortexing will shear chromosomal DNA, causing genomic DNA contamination in plasmid prep.',
      },
      {
        step: 4,
        instruction: {
          en: 'Incubate at room temperature for no more than 3-5 minutes until the suspension becomes clear and viscous.',
          hinglish: 'Room temperature par 3-5 minute incubate karein jab tak solution clear aur viscous na ho jaye.',
        },
        criticalNote: 'Prolonged alkaline incubation (>5 min) leads to irreversible denaturation of plasmid DNA.',
      },
      {
        step: 5,
        instruction: {
          en: 'Add 200 uL of ice-cold Solution III. Invert tube immediately 6-8 times to disperse. A flocculent white precipitate of SDS-protein-chromosomal DNA complexes will form.',
          hinglish: 'Chilled 200 uL Solution III add karein aur turant 6-8 baar invert karein. White precipitate ban jayega.',
        },
      },
      {
        step: 6,
        instruction: {
          en: 'Incubate on ice for 5 minutes, then centrifuge at 14,000 x g for 10 minutes at 4°C. Transfer the clear supernatant to a fresh microfuge tube.',
          hinglish: '5 minute ice par rakhein, fir 14,000 g par 10 min centrifuge karein aur clear supernatant fresh tube me lein.',
        },
      },
      {
        step: 7,
        instruction: {
          en: 'Precipitate plasmid by adding 0.7 volumes of isopropanol (~350 uL). Mix by inversion and centrifuge at 14,000 x g for 10 minutes at 4°C.',
          hinglish: 'Isopropanol (0.7 volume) daal kar 14,000 g par 10 minute centrifuge karein to pellet plasmid DNA.',
        },
      },
      {
        step: 8,
        instruction: {
          en: 'Discard supernatant. Wash pellet with 500 uL of 70% ice-cold ethanol, centrifuge for 5 minutes, air-dry pellet for 10 minutes, and dissolve in 40 uL of TE buffer or sterile nuclease-free water.',
          hinglish: '70% ethanol se wash karein, air-dry karein aur 40 uL TE buffer me dissolve karein.',
        },
      },
    ],
    troubleshooting: [
      {
        problem: 'Low plasmid DNA yield',
        probableCause: 'Low copy number plasmid, poor cell growth, or incomplete resuspension in Solution I.',
        solution: 'Use high-copy vectors (pUC series), ensure antibiotic selection potency, and extend growth to OD600 ~2.5.',
      },
      {
        problem: 'Contamination with high molecular weight smear (Genomic DNA)',
        probableCause: 'Vigorous shaking or vortexing after adding Solution II.',
        solution: 'Always invert tubes gently by hand after adding Solution II and Solution III; never vortex.',
      },
      {
        problem: 'Irreversibly denatured plasmid (running fast on agarose gel)',
        probableCause: 'Alkaline lysis in Solution II exceeded 5 minutes.',
        solution: 'Strictly monitor lysis incubation; neutralize with Solution III within 3-4 minutes.',
      },
    ],
    safetyPrecautions: [
      'NaOH in Solution II is corrosive; wear chemical safety splash goggles and gloves.',
      'Potassium Acetate in Solution III contains glacial acetic acid; handle in fume hood.',
    ],
    references: [
      'Birnboim H.C. & Doly J. A rapid alkaline extraction procedure for screening recombinant plasmid DNA. Nucleic Acids Res.',
    ],
  },
  {
    slug: 'sds-page-protein-electrophoresis',
    title: {
      en: 'SDS-PAGE: Denaturing Polyacrylamide Gel Electrophoresis (Laemmli)',
      hinglish: 'SDS-PAGE: Denaturing Polyacrylamide Gel Electrophoresis',
    },
    category: 'Biochemistry',
    objective: {
      en: 'Separate and determine the subunit molecular weight of proteins using a discontinuous SDS-polyacrylamide gel system.',
      hinglish: 'Proteins ko unke molecular weight ke basis par separate aur subunit size determine karna using SDS-PAGE.',
    },
    principle: {
      en: 'Sodium Dodecyl Sulfate (SDS) binds proteins uniformly (~1.4 g SDS per g protein), conferring an overwhelming uniform negative charge density and eliminating native tertiary conformation. Beta-mercaptoethanol or DTT reduces disulfide crosslinks. In Laemmli discontinuous system, proteins stack between fast chloride and slow glycine ions in the stacking gel (pH 6.8), then resolve by molecular sieving in the resolving gel (pH 8.8).',
      hinglish: 'SDS protein par uniform negative charge deta hai aur secondary/tertiary structure ko unfold karta hai. Beta-mercaptoethanol disulfide bonds break karta hai. Stacking gel (pH 6.8) me proteins concentrate hote hain aur resolving gel (pH 8.8) me molecular weight ke according separate hote hain.',
    },
    materials: [
      'Vertical gel electrophoresis cassette and glass plates (1.0 or 1.5 mm spacers)',
      '10-well or 15-well Teflon combs',
      'DC power supply and heat block (95-100°C)',
      'Pre-stained protein molecular weight ladder (10 to 250 kDa)',
    ],
    reagents: [
      '30% Acrylamide / Bis-acrylamide (29:1 or 37.5:1 ratio)',
      '1.5 M Tris-HCl buffer (pH 8.8) for Resolving gel',
      '0.5 M Tris-HCl buffer (pH 6.8) for Stacking gel',
      '10% (w/v) Sodium Dodecyl Sulfate (SDS)',
      '10% (w/v) Ammonium Persulfate (APS - fresh) and TEMED',
      '4X Laemmli Sample Buffer (Tris-HCl pH 6.8, 8% SDS, 40% Glycerol, 0.04% Bromophenol Blue, 20% beta-mercaptoethanol)',
      '1X Running Buffer: 25 mM Tris, 192 mM Glycine, 0.1% SDS (pH 8.3)',
      'Coomassie Brilliant Blue R-250 staining and destaining solutions',
    ],
    procedure: [
      {
        step: 1,
        instruction: {
          en: 'Assemble clean glass plates and casting stand. Test for leaks with deionized water.',
          hinglish: 'Glass plates ko align karke casting stand me lock karein aur distilled water daal kar leak check karein.',
        },
      },
      {
        step: 2,
        instruction: {
          en: 'Prepare 10% or 12% Resolving Gel mixture. Add APS and TEMED last, swirl gently, and pour into cassette up to 2 cm below top of short plate. Overlay with 1 mL isopropanol or water-saturated butanol.',
          hinglish: 'Resolving gel mix banayein, APS aur TEMED add karke pour karein aur surface flat karne ke liye isopropanol ki layer daalein.',
        },
      },
      {
        step: 3,
        instruction: {
          en: 'Allow 30-45 minutes for polymerization. Pour off isopropanol overlay and rinse with deionized water.',
          hinglish: '30-45 minute me gel set ho jayegi. Isopropanol pour out karke water se rinse karein.',
        },
      },
      {
        step: 4,
        instruction: {
          en: 'Prepare 4% Stacking Gel mixture, pour on top of resolving gel, and immediately insert clean well comb. Polymerize for 30 minutes.',
          hinglish: 'Stacking gel mix pour karein aur comb insert karein. 30 minute polymerize hone dein.',
        },
      },
      {
        step: 5,
        instruction: {
          en: 'Mix protein samples with 4X Laemmli sample buffer, denature at 95°C for 5 minutes, and spin down briefly.',
          hinglish: 'Sample me 4X buffer mix karein aur 95 C par 5 minute boil karke denature karein.',
        },
      },
      {
        step: 6,
        instruction: {
          en: 'Mount gel cassette into electrode tank, fill inner and outer chambers with 1X Running Buffer, carefully pull comb out, and load 10-20 uL sample and protein ladder per well.',
          hinglish: 'Comb nikaal kar wells me 1X running buffer bharein aur samples + protein ladder load karein.',
        },
      },
      {
        step: 7,
        instruction: {
          en: 'Run at 80 V through stacking gel (~20 min), then increase to 120-140 V through resolving gel until bromophenol blue tracking dye reaches 0.5 cm from bottom.',
          hinglish: 'Stacking gel me 80 V par run karein, fir resolving gel me 120-140 V par run karein jab tak blue dye bottom na pahunch jaye.',
        },
      },
      {
        step: 8,
        instruction: {
          en: 'Disassemble cassette, place gel in Coomassie R-250 stain for 1 hour with gentle rocking, then incubate in destaining solution until sharp blue bands appear against clear background.',
          hinglish: 'Gel ko Coomassie blue me 1 hour stain karein aur destain solution me rinse karke clear protein bands visualize karein.',
        },
      },
    ],
    troubleshooting: [
      {
        problem: 'Gel fails to polymerize',
        probableCause: 'Decomposed ammonium persulfate (APS) or insufficient TEMED; atmospheric oxygen inhibition.',
        solution: 'Always prepare 10% APS freshly or use frozen aliquots; ensure cassette is sealed from ambient air.',
      },
      {
        problem: 'Smiling bands across gel lanes',
        probableCause: 'Excessive voltage causing uneven Joule heating in central lanes.',
        solution: 'Decrease voltage to <= 120 V or run electrophoresis tank with external circulating cooling or in cold room.',
      },
      {
        problem: 'Protein bands smeared or streaked vertically',
        probableCause: 'Overloaded protein mass, residual genomic DNA viscosity, or insoluble aggregates.',
        solution: 'Load <= 20 ug total protein per well; treat sample with Benzonase or pass through 27G syringe needle to shear DNA.',
      },
    ],
    safetyPrecautions: [
      'Unpolymerized Acrylamide is a potent neurotoxin and suspected carcinogen; always weigh powder in certified fume hood and wear nitrile gloves.',
      'Beta-mercaptoethanol possesses volatile stench and toxicity; prepare sample buffer in fume hood.',
    ],
    references: [
      'Laemmli U.K. Cleavage of structural proteins during the assembly of the head of bacteriophage T4. Nature.',
    ],
  },
];
