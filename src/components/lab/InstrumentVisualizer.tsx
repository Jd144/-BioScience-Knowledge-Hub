import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  Eye,
  Activity,
  Maximize2,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  Zap,
  Sliders,
  Layers,
  HelpCircle
} from 'lucide-react';

interface InstrumentVisualizerProps {
  instrumentSlug: string;
  instrumentName: { en: string; hinglish: string };
  category: string;
}

export const InstrumentVisualizer: React.FC<InstrumentVisualizerProps> = ({
  instrumentSlug,
  instrumentName,
  category,
}) => {
  const { language } = useLanguage();
  const [viewMode, setViewMode] = useState<'chassis' | 'mechanism' | 'interactive'>('chassis');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Helper descriptions for each instrument's interactive steps
  const getInstrumentSteps = (slug: string) => {
    switch (slug) {
      case 'uv-vis-spectrophotometer':
        return [
          {
            title: { en: '1. Light Emission', hinglish: '1. Light Emission' },
            detail: {
              en: 'Deuterium lamp emits continuous UV spectrum (190-380 nm); Tungsten-halogen lamp emits visible spectrum (380-900 nm).',
              hinglish: 'Deuterium lamp UV spectrum (190-380 nm) aur Tungsten lamp visible spectrum (380-900 nm) generate karte hain.',
            },
            status: 'Light Source Active (190-800 nm)',
          },
          {
            title: { en: '2. Monochromator & Dispersion', hinglish: '2. Monochromator Grating' },
            detail: {
              en: 'Diffraction grating rotates via stepper motor to select an ultra-narrow monochromatic wavelength band (e.g. 260 nm for DNA, 280 nm for protein).',
              hinglish: 'Diffraction grating ghum kar exact monochromatic wavelength (e.g. 260 nm DNA ke liye) isolate karta hai.',
            },
            status: 'Wavelength Selected: 260 nm',
          },
          {
            title: { en: '3. Cuvette Absorption', hinglish: '3. Cuvette me Absorption' },
            detail: {
              en: 'Monochromatic beam enters Quartz cuvette (1 cm pathlength). Chromophores absorb photons (pi -> pi* transition), decreasing beam intensity from I0 to I.',
              hinglish: 'Quartz cuvette me se light pass hoti hai jahan biomolecules photons absorb karte hain.',
            },
            status: 'Absorption: A = ε · c · l',
          },
          {
            title: { en: '4. Photodetector & Readout', hinglish: '4. Photodiode Detector' },
            detail: {
              en: 'Photodiode Array (PDA) or PMT measures transmitted intensity I. High-speed ADC calculates Absorbance = -log10(I/I0) and converts to mg/mL.',
              hinglish: 'Detector bachi hui light ko electrical signal me convert karke digital screen par Absorbance display karta hai.',
            },
            status: 'Readout: A260 = 0.524 AU (26.2 µg/mL dsDNA)',
          },
        ];

      case 'centrifuge':
        return [
          {
            title: { en: '1. Sample Balancing', hinglish: '1. Counterbalance Loading' },
            detail: {
              en: 'Matched pairs of tubes are weighed on an analytical balance to +/- 0.05 g and placed in diametrically opposing rotor buckets.',
              hinglish: 'Tubes ko exact same weight me balance karke aamne-saamne rotor buckets me load kiya jata hai.',
            },
            status: 'Rotor Balanced: Δm < 0.02 g',
          },
          {
            title: { en: '2. Motor Acceleration', hinglish: '2. High-Speed Acceleration' },
            detail: {
              en: 'Brushless induction motor accelerates titanium rotor to 14,000 RPM. Centrifugal acceleration reaches 20,800 x g.',
              hinglish: 'Heavy motor rotor ko 14,000 RPM tak accelerate karta hai, jisse 20,000+ g force generate hoti hai.',
            },
            status: 'Speed: 14,000 RPM | RCF: 20,800 × g',
          },
          {
            title: { en: '3. Sedimentation Force', hinglish: '3. Phase Separation' },
            detail: {
              en: 'Insoluble cellular debris, unlysed cells, and precipitated proteins sediment outward along centrifugal vectors.',
              hinglish: 'Heavy particles centrifugally move karke tube ke bottom par pellet banate hain.',
            },
            status: 'Sedimentation: Supernatant vs Pellet',
          },
          {
            title: { en: '4. Deceleration & Braking', hinglish: '4. Soft Deceleration' },
            detail: {
              en: 'Dynamic braking brings the rotor to 0 RPM smoothly without disturbing delicate pellet interface boundaries.',
              hinglish: 'Smooth deceleration se rotor stop hota hai bina pellet disturb kiye.',
            },
            status: 'Rotor At Rest (0 RPM) | Ready to Aspirate',
          },
        ];

      case 'pcr-machine':
        return [
          {
            title: { en: '1. Denaturation (95°C)', hinglish: '1. Denaturation (95°C)' },
            detail: {
              en: 'Peltier element heats block to 95°C. Watson-Crick hydrogen bonds break, separating double-stranded DNA into single strands.',
              hinglish: 'Block 95°C par heat hota hai jisse dsDNA ke hydrogen bonds break ho kar single strands ban jate hain.',
            },
            status: 'Block Temp: 95.0°C | Strands Separated',
          },
          {
            title: { en: '2. Primer Annealing (55°C)', hinglish: '2. Annealing (55°C)' },
            detail: {
              en: 'Block rapidly cools at 4°C/s to 55°C. Forward and reverse primers hybridize specifically to complementary flanking sequences.',
              hinglish: 'Block cool hokar 55°C aata hai aur forward/reverse primers target DNA sequence se bind karte hain.',
            },
            status: 'Block Temp: 55.0°C | Primers Hybridized',
          },
          {
            title: { en: '3. Polymerase Extension (72°C)', hinglish: '3. Extension (72°C)' },
            detail: {
              en: 'Taq DNA polymerase incorporates free dNTPs in the 5\' -> 3\' direction starting from primer 3\'-OH ends at ~1000 bp/minute.',
              hinglish: 'Thermostable Taq polymerase 72°C par naye nucleotides add karke complementary strand synthesize karta hai.',
            },
            status: 'Block Temp: 72.0°C | Amplicon Doubled',
          },
          {
            title: { en: '4. Exponential Amplification', hinglish: '4. 35 Cycles Complete' },
            detail: {
              en: 'Thermal cycle repeats 30-35 times. Initial template is amplified exponentially: N = N0 × 2^35 (~34 billion copies).',
              hinglish: 'Cycle 35 baar repeat hota hai aur single DNA molecule se billions of copies generate ho jati hain.',
            },
            status: 'Cycle 35/35 Complete | Final Hold 4°C',
          },
        ];

      case 'real-time-pcr':
        return [
          {
            title: { en: '1. Thermal Cycling & Extension', hinglish: '1. Cycling & Extension' },
            detail: {
              en: 'Tubes undergo denaturation, annealing, and extension in a 96-well precision optical block.',
              hinglish: 'Optical block me thermal cycles run hote hain aur naye DNA amplicons bante hain.',
            },
            status: 'Cycle 18 | Extension Phase',
          },
          {
            title: { en: '2. Fluorophore Excitation', hinglish: '2. Optical Laser Excitation' },
            detail: {
              en: 'High-power LED/laser excites intercalating SYBR Green I (488 nm) or TaqMan reporter fluorophore.',
              hinglish: 'Laser beam har well me light throw karti hai jisse fluorescent dye excite hota hai.',
            },
            status: 'Excitation: 488 nm Blue LED Active',
          },
          {
            title: { en: '3. Emission Collection', hinglish: '3. Fluorescence Detection' },
            detail: {
              en: 'Cooled CCD sensor records emitted photon intensity (520 nm) directly proportional to double-stranded DNA mass.',
              hinglish: 'Sensor emitted green light ko capture karta hai jo DNA quantity ke directly proportional hoti hai.',
            },
            status: 'Emission: 520 nm Green Collected',
          },
          {
            title: { en: '4. Real-Time Ct Plotting', hinglish: '4. Ct Value Calculation' },
            detail: {
              en: 'Software fits sigmoidal curve and determines Cycle Threshold (Ct). Lower Ct indicates higher starting copy number.',
              hinglish: 'Graph real-time me plot hota hai. Cycle Threshold (Ct = 21.4) se initial copy number calculate hota hai.',
            },
            status: 'Ct Value: 21.4 | Target: 4.8 × 10^5 copies/µL',
          },
        ];

      case 'gel-electrophoresis-system':
        return [
          {
            title: { en: '1. Well Loading', hinglish: '1. Sample Loading' },
            detail: {
              en: 'DNA samples mixed with 6X glycerol loading dye and DNA ladder are pipetted into submerged agarose wells.',
              hinglish: 'DNA sample me loading dye mix karke micropipette se agarose gel ke wells me load kiya jata hai.',
            },
            status: 'Wells Loaded: Ladder + 5 Samples',
          },
          {
            title: { en: '2. Electric Field Application', hinglish: '2. DC Voltage Applied' },
            detail: {
              en: 'Power supply applies 100V DC. Negatively charged phosphate backbones cause DNA to migrate toward the positive anode (Red).',
              hinglish: '100 Volt power on hote hi DNA negative cathode (-) se positive anode (+) ki taraf daudta hai.',
            },
            status: 'Electric Field: 100V DC | 45 mA Running',
          },
          {
            title: { en: '3. Molecular Sieving', hinglish: '3. Size Separation' },
            detail: {
              en: 'Smaller DNA fragments navigate agarose polymer pores faster than bulky high-molecular-weight fragments.',
              hinglish: 'Chote DNA fragments pores me se fast nikalte hain aur neeche band banate hain.',
            },
            status: 'Separation: 100 bp to 10,000 bp Range',
          },
          {
            title: { en: '4. UV / Blue-LED Imaging', hinglish: '4. Band Visualization' },
            detail: {
              en: 'Transilluminator illuminates gel. Intercalated fluorophores (GelGreen/EtBr) fluoresce sharply under UV/Blue light.',
              hinglish: 'Gel doc transilluminator par rakhne par fluorescent DNA bands crystal clear dikhayi dete hain.',
            },
            status: 'Specific Band Confirmed: 1,250 bp Amplicon',
          },
        ];

      case 'biosafety-cabinet':
        return [
          {
            title: { en: '1. Inward Air Curtain Barrier', hinglish: '1. Front Air Curtain' },
            detail: {
              en: 'Room air is drawn into front intake grille at >= 0.51 m/s (100 fpm), creating an impenetrable protective barrier protecting the operator.',
              hinglish: 'Front grille me hawa fast andar khinchti hai jisse koi bhi infectious virus/bacteria bahar nahi aa sakta.',
            },
            status: 'Inflow Velocity: 0.53 m/s (Compliant)',
          },
          {
            title: { en: '2. Downflow HEPA Filtration', hinglish: '2. 70% HEPA Recirculation' },
            detail: {
              en: '70% of internal air passes through the supply HEPA filter (99.97% efficient at 0.3 µm) and cascades down uniformly over the work zone.',
              hinglish: '70% hawa HEPA filter se ultra-clean hokar work surface par continuous laminar flow me girti hai.',
            },
            status: 'Downflow: ISO Class 5 Clean Air',
          },
          {
            title: { en: '3. Exhaust HEPA Discharge', hinglish: '3. 30% Exhaust Filter' },
            detail: {
              en: '30% of air is evacuated through the exhaust HEPA filter into the lab or facility ductwork, balancing pressure.',
              hinglish: '30% air exhaust HEPA filter se purify hokar safely release hoti hai.',
            },
            status: 'Exhaust Air Decontaminated',
          },
          {
            title: { en: '4. Negative Pressure Containment', hinglish: '4. Negative Pressure Plenum' },
            detail: {
              en: 'Contaminated air plenums are completely surrounded by negative pressure, preventing aerosol leakage to room air.',
              hinglish: 'Har duct negative pressure me rehti hai taaki koi leak ho toh hawa andar hi khinche.',
            },
            status: 'Biohazard Safety Level: BSL-2 / BSL-3 Sealed',
          },
        ];

      case 'autoclave':
        return [
          {
            title: { en: '1. Chamber Air Purge', hinglish: '1. Cold Air Purge' },
            detail: {
              en: 'Heating elements boil water into steam. The exhaust valve remains open to purge cool dense air pockets.',
              hinglish: 'Water boil hota hai aur steam banti hai jo cold air ko exhaust valve se bahar fek deti hai.',
            },
            status: 'Air Purged | Steam Filling Chamber',
          },
          {
            title: { en: '2. Pressure Ramp to 15 psi', hinglish: '2. Pressure Ramp' },
            detail: {
              en: 'Exhaust valve seals. Saturated steam pressure rises to 15 psi (1.05 bar), elevating steam temperature to 121°C.',
              hinglish: 'Valve close hokar pressure 15 psi pahunchta hai aur temperature 121°C achieve hota hai.',
            },
            status: 'Pressure: 15.2 psi | Temp: 121.5°C',
          },
          {
            title: { en: '3. Sterilization Hold (20 min)', hinglish: '3. Protein Coagulation' },
            detail: {
              en: 'Latent heat from condensing steam penetrates cells, irreversibly denaturing endospores of Geobacillus stearothermophilus.',
              hinglish: '121°C steam heat bacterial spores aur viruses ke proteins ko coagulate karke destroy karti hai.',
            },
            status: 'Sterilizing Hold: 18 min elapsed',
          },
          {
            title: { en: '4. Slow Exhaust & Cool Down', hinglish: '4. Safe Exhaust' },
            detail: {
              en: 'Chamber slowly decompresses to prevent boiling liquid explosion. Lid unlatches once pressure reaches 0 psi and temp < 80°C.',
              hinglish: 'Slow exhaust se pressure 0 psi hota hai aur media boil-over hone se bachta hai.',
            },
            status: 'Cycle Complete | 100% Sterile Media',
          },
        ];

      case 'bioreactor':
        return [
          {
            title: { en: '1. Sterile Inoculation', hinglish: '1. Inoculation' },
            detail: {
              en: 'Recombinant host cells (e.g. E. coli or CHO) are aseptically transferred into sterile enriched growth medium.',
              hinglish: 'Sterile nutrient broth me recombinant bacterial ya mammalian cells add kiye jaate hain.',
            },
            status: 'Initial OD600: 0.15 | Inoculum Loaded',
          },
          {
            title: { en: '2. Aeration & Oxygen Mass Transfer', hinglish: '2. Microbubble Sparging' },
            detail: {
              en: 'Ring sparger releases fine oxygen bubbles; Rushton turbine impellers shear bubbles to boost kLa mass transfer.',
              hinglish: 'Sparger pure oxygen bubbles release karta hai aur turbine unhe mix karke dissolve oxygen badhata hai.',
            },
            status: 'Dissolved O2: 45% Saturation | kLa: 120 h^-1',
          },
          {
            title: { en: '3. Automated PID Control', hinglish: '3. Automated Feedback' },
            detail: {
              en: 'Sensors monitor pH (7.2), temperature (37°C), and foam. Peristaltic pumps dispense sterile acid/base and antifoam automatically.',
              hinglish: 'Computer sensors continuously pH 7.2 aur temp 37°C maintain karte hain through automatic dosing.',
            },
            status: 'PID Loops Stable | Temp: 37.0°C | pH: 7.20',
          },
          {
            title: { en: '4. Log Growth & Product Harvest', hinglish: '4. Protein Harvest' },
            detail: {
              en: 'Biomass reaches high cell density (OD600 > 60). Inducer (IPTG) activates recombinant therapeutic protein expression.',
              hinglish: 'High density growth ke baad IPTG induction se recombinant protein harvest kiya jata hai.',
            },
            status: 'Yield: 4.8 g/L Recombinant Therapeutic Protein',
          },
        ];

      default:
        return [
          {
            title: { en: '1. Sample Preparation', hinglish: '1. Sample Prep' },
            detail: {
              en: 'Calibration with analytical standards and sample loading according to standard operating protocols.',
              hinglish: 'Sample ko standard operating procedure ke according calibrate aur load kiya jata hai.',
            },
            status: 'Calibrated & Ready',
          },
          {
            title: { en: '2. Physical Interaction', hinglish: '2. Core Processing' },
            detail: {
              en: 'Direct physical, optical, or chemical interaction occurs at the detector or reaction interface.',
              hinglish: 'Sample aur measurement interface ke beech physical interaction execute hota hai.',
            },
            status: 'Processing Reaction Active',
          },
          {
            title: { en: '3. Signal Transduction', hinglish: '3. Sensor Detection' },
            detail: {
              en: 'High-sensitivity sensors convert physical phenomena into calibrated electrical signals.',
              hinglish: 'Sensors signal ko detect karke digital analog converter ko bhejte hain.',
            },
            status: 'Signal Amplified & Filtered',
          },
          {
            title: { en: '4. Data Output', hinglish: '4. Analysis & Result' },
            detail: {
              en: 'Digital microprocessor processes parameters and renders quantitative experimental curves.',
              hinglish: 'Accurate data software me compute hokar output provide karta hai.',
            },
            status: 'Measurement Complete',
          },
        ];
    }
  };

  const steps = getInstrumentSteps(instrumentSlug);

  const handleNextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 sm:p-7 space-y-6 shadow-xl overflow-hidden relative">
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              High-Precision Laboratory Instrumentation
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            {language === 'hinglish' ? instrumentName.hinglish : instrumentName.en}
          </h3>
          <p className="text-xs text-slate-400">
            {viewMode === 'chassis'
              ? 'Physical Chassis & Hardware Architecture View'
              : viewMode === 'mechanism'
              ? 'Optical & Mechanical Ray-Path / Working Diagram'
              : 'Interactive Operational Step Simulator'}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('chassis')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'chassis'
                ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>How it Looks</span>
          </button>

          <button
            onClick={() => setViewMode('mechanism')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'mechanism'
                ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>How it Works</span>
          </button>

          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'interactive'
                ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Step Simulator</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: CHASSIS & REALISTIC SCHEMATIC */}
      {viewMode === 'chassis' && (
        <div className="space-y-4">
          <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-6 flex items-center justify-center min-h-[300px]">
            {/* SVG Renderings tailored for each instrument */}
            {instrumentSlug === 'uv-vis-spectrophotometer' && (
              <svg viewBox="0 0 700 320" className="w-full max-w-xl h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main Chassis Body */}
                <rect x="50" y="60" width="600" height="210" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                <rect x="50" y="245" width="600" height="25" rx="4" fill="#0f172a" />
                
                {/* Cuvette Compartment Hatch */}
                <rect x="80" y="90" width="160" height="135" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <rect x="130" y="80" width="60" height="10" rx="3" fill="#64748b" />
                <rect x="135" y="130" width="50" height="70" rx="4" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="160" y="170" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">1 cm</text>
                <text x="160" y="183" fill="#bae6fd" fontSize="8" textAnchor="middle">Quartz</text>
                <text x="160" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle">Sample Cell Compartment</text>

                {/* Digital Color Touchscreen */}
                <rect x="270" y="90" width="230" height="135" rx="8" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
                {/* Screen Graph */}
                <path d="M 290 200 L 320 195 L 345 190 L 365 140 L 385 115 L 405 155 L 430 195 L 470 200" stroke="#06b6d4" strokeWidth="2.5" fill="none" />
                <text x="290" y="112" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">A260: 0.524 AU</text>
                <text x="290" y="127" fill="#a5f3fc" fontSize="9" fontFamily="monospace">A280: 0.288 AU | Ratio: 1.82</text>
                <text x="470" y="215" fill="#64748b" fontSize="8" textAnchor="end">Wavelength: 200-800 nm</text>

                {/* Keypad Controls */}
                <rect x="525" y="90" width="95" height="135" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
                <circle cx="555" cy="115" r="9" fill="#334155" />
                <circle cx="590" cy="115" r="9" fill="#334155" />
                <circle cx="555" cy="145" r="9" fill="#334155" />
                <circle cx="590" cy="145" r="9" fill="#334155" />
                <circle cx="572" cy="185" r="16" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <text x="572" y="190" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">START</text>

                {/* LED Status & Logo */}
                <circle cx="85" cy="80" r="4" fill="#22c55e" />
                <text x="96" y="83" fill="#cbd5e1" fontSize="10" fontWeight="bold">BIO-SPEC 9000 Dual Beam</text>
              </svg>
            )}

            {instrumentSlug === 'centrifuge' && (
              <svg viewBox="0 0 700 320" className="w-full max-w-xl h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Heavy Benchtop Base */}
                <rect x="80" y="60" width="540" height="210" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                
                {/* Rotor Chamber Bowl (Top view cutaway) */}
                <circle cx="260" cy="165" r="85" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                <circle cx="260" cy="165" r="40" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <circle cx="260" cy="165" r="12" fill="#0284c7" />

                {/* Rotor Tube Holders (Angular 45 deg) */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 260 + 60 * Math.cos(rad);
                  const y = 165 + 60 * Math.sin(rad);
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="10" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                      <circle cx={x} cy={y} r="6" fill={i % 2 === 0 ? '#38bdf8' : '#0284c7'} />
                    </g>
                  );
                })}

                {/* Control Panel */}
                <rect x="390" y="90" width="200" height="150" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="410" y="125" fill="#38bdf8" fontSize="18" fontWeight="bold" fontFamily="monospace">14,000</text>
                <text x="560" y="125" fill="#94a3b8" fontSize="10" textAnchor="end">RPM</text>
                <text x="410" y="150" fill="#22c55e" fontSize="14" fontWeight="bold" fontFamily="monospace">20,817 × g</text>
                <text x="410" y="175" fill="#f59e0b" fontSize="13" fontWeight="bold" fontFamily="monospace">04°C | 15:00 min</text>
                
                {/* Buttons */}
                <rect x="410" y="195" width="70" height="28" rx="6" fill="#0284c7" />
                <text x="445" y="213" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">START</text>
                <rect x="495" y="195" width="70" height="28" rx="6" fill="#ef4444" />
                <text x="530" y="213" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">STOP / OPEN</text>

                <text x="260" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">Titanium Fixed-Angle Rotor (24 × 1.5 mL)</text>
              </svg>
            )}

            {instrumentSlug === 'pcr-machine' && (
              <svg viewBox="0 0 700 320" className="w-full max-w-xl h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer Thermal Cycler Case */}
                <rect x="100" y="50" width="500" height="230" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                
                {/* Heated Lid Assembly (Top section) */}
                <rect x="130" y="75" width="190" height="180" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <rect x="155" y="90" width="140" height="20" rx="4" fill="#b91c1c" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1" />
                <text x="225" y="104" fill="#fca5a5" fontSize="9" fontWeight="bold" textAnchor="middle">HEATED LID: 105°C</text>
                
                {/* 96-Well Microplate Grid */}
                <g transform="translate(155, 125)">
                  {[0, 1, 2, 3, 4, 5].map((row) =>
                    [0, 1, 2, 3, 4, 5, 6].map((col) => (
                      <circle
                        key={`${row}-${col}`}
                        cx={col * 19 + 10}
                        cy={row * 17 + 8}
                        r="5"
                        fill="#334155"
                        stroke="#38bdf8"
                        strokeWidth="1"
                      />
                    ))
                  )}
                </g>
                <text x="225" y="245" fill="#94a3b8" fontSize="10" textAnchor="middle">Silver Gold-Plated 96-Well Block</text>

                {/* Touch Interface Display */}
                <rect x="350" y="75" width="220" height="180" rx="10" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="102" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">PROGRAM: AMPLIFY_35</text>
                
                {/* Thermal Step Profile Curve */}
                <path d="M 370 180 L 400 130 L 430 130 L 450 190 L 480 190 L 500 160 L 530 160 L 550 200" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
                <text x="415" y="122" fill="#fca5a5" fontSize="9" textAnchor="middle">95°C (30s)</text>
                <text x="465" y="202" fill="#93c5fd" fontSize="9" textAnchor="middle">55°C (30s)</text>
                <text x="515" y="152" fill="#86efac" fontSize="9" textAnchor="middle">72°C (60s)</text>
                
                <text x="370" y="235" fill="#22c55e" fontSize="11" fontWeight="bold">Cycle: 24/35 | Est: 28m left</text>
              </svg>
            )}

            {/* Default SVG Chassis representation for all other instruments */}
            {!['uv-vis-spectrophotometer', 'centrifuge', 'pcr-machine'].includes(instrumentSlug) && (
              <svg viewBox="0 0 700 320" className="w-full max-w-xl h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main Enclosure */}
                <rect x="100" y="50" width="500" height="220" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                
                {/* Working Area Chamber */}
                <rect x="130" y="80" width="230" height="160" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                <circle cx="245" cy="160" r="50" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="245" cy="160" r="25" fill="#0284c7" fillOpacity="0.4" />
                <path d="M 230 160 L 260 160 M 245 145 L 245 175" stroke="#38bdf8" strokeWidth="2" />
                <text x="245" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle">Active Reaction / Detection Zone</text>

                {/* Microprocessor Display & Gauges */}
                <rect x="390" y="80" width="180" height="160" rx="8" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
                <rect x="410" y="100" width="140" height="45" rx="4" fill="#0f172a" />
                <text x="420" y="125" fill="#22c55e" fontSize="14" fontWeight="bold" fontFamily="monospace">ONLINE: 100%</text>
                <text x="420" y="137" fill="#64748b" fontSize="8" fontFamily="monospace">STATUS: CALIBRATED</text>
                
                {/* Control Panel Toggles */}
                <rect x="410" y="160" width="60" height="24" rx="4" fill="#0284c7" />
                <text x="440" y="175" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">RUN</text>
                <rect x="485" y="160" width="65" height="24" rx="4" fill="#334155" />
                <text x="517" y="175" fill="#cbd5e1" fontSize="9" textAnchor="middle">CONFIG</text>

                <text x="350" y="290" fill="#64748b" fontSize="11" textAnchor="middle">
                  {instrumentName.en} (Standard Research Workstation)
                </text>
              </svg>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[10px] font-mono">CHASSIS HOUSING</span>
              <span className="text-white font-semibold mt-0.5 block">Corrosion-Resistant Polymer & Steel</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[10px] font-mono">INTERFACE</span>
              <span className="text-cyan-300 font-semibold mt-0.5 block">Digital LCD Touchscreen</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[10px] font-mono">CALIBRATION</span>
              <span className="text-emerald-400 font-semibold mt-0.5 block">NIST-Traceable Standards</span>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <span className="text-slate-400 block text-[10px] font-mono">SAFETY INTERLOCK</span>
              <span className="text-amber-300 font-semibold mt-0.5 block">Auto-Shutdown Chamber Sensors</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: HOW IT WORKS (MECHANICAL / OPTICAL FLOW DIAGRAM) */}
      {viewMode === 'mechanism' && (
        <div className="space-y-5">
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step Internal Working Mechanism</span>
            </h4>

            {/* Mechanism Step Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    idx === activeStep
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md ring-1 ring-cyan-500/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    {idx === activeStep && (
                      <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">
                        Active Step
                      </span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-white mb-1">
                    {language === 'hinglish' ? s.title.hinglish : s.title.en}
                  </h5>
                  <p className="text-[11px] leading-relaxed line-clamp-3">
                    {language === 'hinglish' ? s.detail.hinglish : s.detail.en}
                  </p>
                </div>
              ))}
            </div>

            {/* Expanded Active Step Detail */}
            <div className="mt-5 p-4 bg-slate-900 rounded-lg border border-cyan-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  PHYSICAL STAGE METRIC
                </span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {steps[activeStep].status}
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  {language === 'hinglish' ? steps[activeStep].detail.hinglish : steps[activeStep].detail.en}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrevStep}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextStep}
                  className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-bold"
                >
                  Next Step →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: INTERACTIVE OPERATIONAL SIMULATOR */}
      {viewMode === 'interactive' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">
                  Interactive Instrument Bench Testing
                </span>
                <span className="text-xs text-slate-400">
                  Execute continuous cycle to observe physical parameters
                </span>
              </div>

              <button
                onClick={() => {
                  setIsRunning(!isRunning);
                  if (!isRunning) {
                    const timer = setInterval(() => {
                      setActiveStep((prev) => {
                        if (prev >= steps.length - 1) {
                          clearInterval(timer);
                          setIsRunning(false);
                          return 0;
                        }
                        return prev + 1;
                      });
                    }, 1800);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isRunning
                    ? 'bg-amber-500 text-slate-950 animate-pulse'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                }`}
              >
                {isRunning ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                    <span>Running Cycle...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Simulate Complete Run</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress Bar of Simulation */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Phase Progress: Step {activeStep + 1} of {steps.length}</span>
                <span className="text-cyan-400">{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Live readout card */}
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVE SIMULATION STATE:</span>
              </div>
              <div className="text-sm font-mono text-white font-bold">
                {steps[activeStep].status}
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                {language === 'hinglish' ? steps[activeStep].detail.hinglish : steps[activeStep].detail.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
