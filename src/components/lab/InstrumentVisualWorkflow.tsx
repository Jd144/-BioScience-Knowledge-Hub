import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import {
  Eye,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Sliders,
  Layers,
  Zap,
  Info,
  ChevronRight
} from 'lucide-react';

interface InstrumentVisualWorkflowProps {
  slug: string;
  name: { en: string; hinglish: string };
  category: string;
}

export const InstrumentVisualWorkflow: React.FC<InstrumentVisualWorkflowProps> = ({
  slug,
  name,
  category,
}) => {
  const { language } = useLanguage();
  const [activeWorkflowStage, setActiveWorkflowStage] = useState<number>(0);
  const [viewTab, setViewTab] = useState<'appearance' | 'workflow'>('appearance');

  // Render authentic hardware blueprint ("Kaisa Dikhta Hai") for all 18 instruments
  const renderInstrumentGraphic = (instrumentSlug: string) => {
    switch (instrumentSlug) {
      case 'uv-vis-spectrophotometer':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="40" width="660" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            <rect x="40" y="270" width="660" height="30" rx="4" fill="#0f172a" />
            
            {/* Cuvette Compartment Left Door */}
            <rect x="70" y="70" width="190" height="180" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="135" y="60" width="60" height="12" rx="4" fill="#64748b" />
            <rect x="125" y="110" width="80" height="100" rx="6" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" />
            <rect x="145" y="130" width="40" height="60" rx="3" fill="#38bdf8" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="1.5" />
            <text x="165" y="165" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">1 cm</text>
            <text x="165" y="180" fill="#bae6fd" fontSize="9" textAnchor="middle">Quartz</text>
            <text x="165" y="235" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Sample Chamber (Dual Cell)</text>

            {/* Central Touchscreen Display */}
            <rect x="290" y="70" width="270" height="180" rx="10" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <path d="M 315 210 L 350 205 L 385 195 L 415 130 L 435 95 L 455 150 L 485 205 L 535 210" stroke="#06b6d4" strokeWidth="3" fill="none" />
            <circle cx="435" cy="95" r="4" fill="#f43f5e" />
            <text x="315" y="100" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">A260: 0.524 AU</text>
            <text x="315" y="118" fill="#a5f3fc" fontSize="10" fontFamily="monospace">A280: 0.288 | Ratio: 1.82</text>
            <text x="315" y="134" fill="#86efac" fontSize="9" fontFamily="monospace">Conc: 26.2 µg/mL dsDNA</text>
            <text x="535" y="230" fill="#64748b" fontSize="9" textAnchor="end">λ: 190–1100 nm</text>

            {/* Right Control Keypad */}
            <rect x="585" y="70" width="95" height="180" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <circle cx="615" cy="100" r="10" fill="#334155" />
            <circle cx="650" cy="100" r="10" fill="#334155" />
            <circle cx="615" cy="130" r="10" fill="#334155" />
            <circle cx="650" cy="130" r="10" fill="#334155" />
            <circle cx="633" cy="180" r="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="633" y="185" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">READ</text>
            <text x="633" y="235" fill="#94a3b8" fontSize="10" textAnchor="middle">Keypad</text>

            {/* Indicator Badges */}
            <circle cx="80" cy="55" r="4" fill="#22c55e" />
            <text x="92" y="58" fill="#cbd5e1" fontSize="10" fontWeight="bold">UV-VIS DUAL BEAM BENCHTOP SPECTROPHOTOMETER</text>
          </svg>
        );

      case 'centrifuge':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="620" height="260" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Bowl Chamber */}
            <circle cx="250" cy="165" r="95" fill="#0f172a" stroke="#475569" strokeWidth="3" />
            <circle cx="250" cy="165" r="45" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <circle cx="250" cy="165" r="14" fill="#0284c7" />
            {/* Tubes positioned at 45 deg angle */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const tx = 250 + 68 * Math.cos(rad);
              const ty = 165 + 68 * Math.sin(rad);
              return (
                <g key={i}>
                  <circle cx={tx} cy={ty} r="8" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx={tx} cy={ty} r="4" fill={i % 2 === 0 ? '#38bdf8' : '#0284c7'} />
                </g>
              );
            })}
            <text x="250" y="285" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Titanium Fixed-Angle Rotor (12 × 1.5 mL)
            </text>

            {/* Right Display Console */}
            <rect x="400" y="70" width="250" height="190" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="425" y="110" fill="#38bdf8" fontSize="24" fontWeight="bold" fontFamily="monospace">14,000</text>
            <text x="625" y="110" fill="#94a3b8" fontSize="12" textAnchor="end">RPM</text>
            <text x="425" y="145" fill="#22c55e" fontSize="18" fontWeight="bold" fontFamily="monospace">20,817 × g</text>
            <text x="425" y="180" fill="#f59e0b" fontSize="15" fontWeight="bold" fontFamily="monospace">04°C | 15:00 MIN</text>
            
            <rect x="425" y="205" width="95" height="34" rx="8" fill="#0284c7" />
            <text x="472" y="227" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">START</text>
            <rect x="535" y="205" width="95" height="34" rx="8" fill="#ef4444" />
            <text x="582" y="227" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">STOP</text>
          </svg>
        );

      case 'micropipette':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="620" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            <g transform="translate(100, 160)">
              {/* Plunger Push Button */}
              <rect x="0" y="-18" width="40" height="36" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="20" y="4" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">P1000</text>
              {/* Handle Body */}
              <rect x="40" y="-15" width="220" height="30" rx="8" fill="#334155" stroke="#475569" strokeWidth="2" />
              {/* Digital Volume Window */}
              <rect x="120" y="-10" width="70" height="20" rx="4" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="155" y="4" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">100.0</text>
              {/* Ejector button & Shaft */}
              <rect x="260" y="-9" width="160" height="18" fill="#94a3b8" />
              <polygon points="420,-9 510,-3 510,3 420,9" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
              {/* Disposable Polypropylene Tip */}
              <polygon points="510,-8 570,-2 570,2 510,8" fill="#38bdf8" fillOpacity="0.6" stroke="#0284c7" strokeWidth="1.5" />
              <polygon points="530,-5 570,-2 570,2 530,5" fill="#0284c7" />
            </g>

            <text x="120" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">① Two-Stop Plunger</text>
            <text x="255" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">② Volume Counter</text>
            <text x="420" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">③ Stainless Steel Shaft</text>
            <text x="610" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold">④ Polypropylene Tip</text>

            <text x="370" y="275" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
              Air-Displacement Precision Pipette (Certified ISO 8655-2)
            </text>
          </svg>
        );

      case 'ph-meter':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="620" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Stand & Glass Combination Electrode */}
            <rect x="130" y="70" width="10" height="190" fill="#64748b" />
            <rect x="110" y="250" width="60" height="12" rx="3" fill="#475569" />
            <line x1="135" y1="100" x2="220" y2="100" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            {/* Glass Probe */}
            <rect x="215" y="100" width="14" height="90" rx="7" fill="#38bdf8" fillOpacity="0.3" stroke="#0284c7" strokeWidth="2" />
            <circle cx="222" cy="195" r="9" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="222" y="199" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">pH</text>
            {/* Beaker with Buffer */}
            <rect x="195" y="180" width="54" height="65" rx="4" fill="#0284c7" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="222" y="235" fill="#94a3b8" fontSize="9" textAnchor="middle">pH 7.00 Buffer</text>

            {/* Benchtop Digital Display */}
            <rect x="320" y="70" width="330" height="190" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="345" y="125" fill="#22c55e" fontSize="38" fontWeight="bold" fontFamily="monospace">7.02</text>
            <text x="500" y="110" fill="#38bdf8" fontSize="16" fontWeight="bold" fontFamily="monospace">pH</text>
            <text x="345" y="165" fill="#94a3b8" fontSize="14" fontFamily="monospace">mV: -1.2 mV | TEMP: 25.0°C (ATC)</text>
            <text x="345" y="195" fill="#f59e0b" fontSize="12" fontFamily="monospace">Calibrated: 4.01, 7.00, 10.01 (Slope: 99.4%)</text>
            
            <rect x="345" y="215" width="80" height="30" rx="6" fill="#0284c7" />
            <text x="385" y="234" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">CAL</text>
            <rect x="435" y="215" width="80" height="30" rx="6" fill="#334155" />
            <text x="475" y="234" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">MODE</text>
            <rect x="525" y="215" width="80" height="30" rx="6" fill="#334155" />
            <text x="565" y="234" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">HOLD</text>
          </svg>
        );

      case 'pcr-machine':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="70" y="40" width="600" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Heated Lid Section */}
            <rect x="100" y="70" width="220" height="190" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="120" y="85" width="180" height="24" rx="4" fill="#b91c1c" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1.5" />
            <text x="210" y="101" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">HEATED LID: 105°C</text>

            {/* 96-well block layout */}
            <g transform="translate(125, 125)">
              {[0, 1, 2, 3, 4, 5].map((r) =>
                [0, 1, 2, 3, 4, 5, 6].map((c) => (
                  <circle
                    key={`${r}-${c}`}
                    cx={c * 23 + 12}
                    cy={r * 18 + 10}
                    r="6"
                    fill="#334155"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                  />
                ))
              )}
            </g>
            <text x="210" y="250" fill="#94a3b8" fontSize="10" textAnchor="middle">Silver Gold-Plated 96-Well Block</text>

            {/* Color Display */}
            <rect x="350" y="70" width="290" height="190" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="370" y="100" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">CYCLER: 3-STEP PCR</text>
            <path d="M 370 190 L 410 120 L 440 120 L 465 200 L 495 200 L 525 155 L 565 155 L 590 220" stroke="#f59e0b" strokeWidth="3" fill="none" />
            <text x="425" y="112" fill="#fca5a5" fontSize="9" textAnchor="middle">95°C (30s)</text>
            <text x="480" y="215" fill="#93c5fd" fontSize="9" textAnchor="middle">55°C (30s)</text>
            <text x="545" y="145" fill="#86efac" fontSize="9" textAnchor="middle">72°C (60s)</text>
            <text x="370" y="240" fill="#22c55e" fontSize="11" fontWeight="bold">Cycle: 28/35 | 4°C Hold Armed</text>
          </svg>
        );

      case 'real-time-pcr':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="620" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Optical Scanning Head and Peltier Block */}
            <rect x="90" y="70" width="240" height="190" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            {/* Fiber Optic Shuttle */}
            <rect x="110" y="85" width="200" height="30" rx="4" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="210" y="104" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Multiplex Optical Shutter (5-Channel)</text>
            {/* Emission filter colors */}
            <circle cx="140" cy="135" r="8" fill="#22c55e" stroke="#86efac" strokeWidth="1.5" />
            <text x="140" y="153" fill="#86efac" fontSize="8" textAnchor="middle">FAM</text>
            <circle cx="175" cy="135" r="8" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />
            <text x="175" y="153" fill="#fef08a" fontSize="8" textAnchor="middle">VIC</text>
            <circle cx="210" cy="135" r="8" fill="#f97316" stroke="#fed7aa" strokeWidth="1.5" />
            <text x="210" y="153" fill="#fed7aa" fontSize="8" textAnchor="middle">ROX</text>
            <circle cx="245" cy="135" r="8" fill="#ef4444" stroke="#fca5a5" strokeWidth="1.5" />
            <text x="245" y="153" fill="#fca5a5" fontSize="8" textAnchor="middle">CY5</text>
            <text x="210" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle">0.1 mL Optical 96-Well Reaction Plate</text>

            {/* Real-time Amplification Curve Screen */}
            <rect x="360" y="70" width="290" height="190" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="380" y="98" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">qPCR AMPLIFICATION PLOT</text>
            {/* Sigmoid amplification curve */}
            <path d="M 380 200 L 440 198 Q 470 195 490 145 T 530 110 L 620 108" stroke="#22c55e" strokeWidth="3" fill="none" />
            {/* Threshold line */}
            <line x1="380" y1="160" x2="620" y2="160" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="620" y="155" fill="#ef4444" fontSize="9" textAnchor="end">Ct Threshold</text>
            <text x="380" y="235" fill="#38bdf8" fontSize="11" fontFamily="monospace">Ct Value: 18.42 | Eff: 98.7%</text>
          </svg>
        );

      case 'gel-electrophoresis-system':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="40" width="640" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Transparent Gel Tank Body */}
            <rect x="80" y="70" width="370" height="195" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="2" />
            {/* Buffer Liquid Blue Tint */}
            <rect x="90" y="80" width="350" height="175" rx="6" fill="#0284c7" fillOpacity="0.15" />
            
            {/* Cathode Black (-) on left */}
            <rect x="95" y="85" width="8" height="165" rx="4" fill="#000000" stroke="#64748b" strokeWidth="1" />
            <text x="110" y="100" fill="#94a3b8" fontSize="10" fontWeight="bold">Cathode (-)</text>
            
            {/* Agarose Gel Slab */}
            <rect x="140" y="95" width="230" height="145" rx="4" fill="#38bdf8" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="1.5" />
            
            {/* Sample Wells */}
            {[0, 1, 2, 3, 4, 5].map((w) => (
              <g key={w}>
                <rect x="155" y={105 + w * 22} width="16" height="12" rx="2" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
                {/* Migrating DNA band */}
                <rect x={190 + (w * 15) % 80} y={108 + w * 22} width="8" height="6" rx="1" fill="#f59e0b" />
                <rect x={240 + (w * 22) % 60} y={108 + w * 22} width="6" height="6" rx="1" fill="#f59e0b" />
              </g>
            ))}

            {/* Anode Red (+) on right */}
            <rect x="420" y="85" width="8" height="165" rx="4" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
            <text x="415" y="100" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="end">Anode (+)</text>

            {/* Power Supply Box on Right */}
            <rect x="480" y="70" width="180" height="195" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="500" y="105" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">POWER SUPPLY</text>
            <text x="500" y="140" fill="#22c55e" fontSize="24" fontWeight="bold" fontFamily="monospace">100 V</text>
            <text x="500" y="170" fill="#f59e0b" fontSize="16" fontWeight="bold" fontFamily="monospace">75 mA</text>
            <text x="500" y="195" fill="#94a3b8" fontSize="11" fontFamily="monospace">TIME: 45 MIN</text>
            
            <circle cx="530" cy="230" r="12" fill="#22c55e" />
            <text x="530" y="234" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">RUN</text>
          </svg>
        );

      case 'biosafety-cabinet':
      case 'laminar-air-flow':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="120" y="30" width="500" height="280" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Exhaust HEPA on top */}
            <rect x="280" y="45" width="180" height="25" rx="4" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="370" y="62" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">Exhaust HEPA (30% Recirculated)</text>
            
            {/* Supply HEPA Plenum */}
            <rect x="150" y="80" width="440" height="30" rx="4" fill="#0284c7" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
            <text x="370" y="100" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Supply HEPA Downflow (70% Laminar)</text>

            {/* Downflow arrows */}
            {[200, 260, 320, 380, 440, 500].map((x) => (
              <g key={x}>
                <line x1={x} y1="115" x2={x} y2="175" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points={`${x-3},175 ${x+3},175 ${x},182`} fill="#38bdf8" />
              </g>
            ))}

            {/* Glass Sash window */}
            <rect x="150" y="120" width="440" height="90" fill="#38bdf8" fillOpacity="0.08" stroke="#0ea5e9" strokeWidth="2" />
            <text x="170" y="145" fill="#38bdf8" fontSize="10">8-inch Sash Opening Height</text>
            
            {/* Front Inward Air Grille */}
            <rect x="150" y="235" width="440" height="25" rx="3" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <text x="370" y="252" fill="#22c55e" fontSize="10" fontWeight="bold" textAnchor="middle">
              Intake Grille (Inflow Air Curtain ≥ 0.51 m/s)
            </text>

            <text x="370" y="295" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Class II Type A2 Biosafety Workstation / Sterile Enclosure
            </text>
          </svg>
        );

      case 'autoclave':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="100" y="40" width="540" height="260" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Cylindrical Pressure Vessel Center */}
            <rect x="140" y="70" width="240" height="190" rx="16" fill="#0f172a" stroke="#64748b" strokeWidth="3" />
            
            {/* Locking Radial Lugs on Top */}
            <rect x="180" y="55" width="160" height="18" rx="6" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Inside Water & Steam */}
            <rect x="160" y="195" width="200" height="50" rx="6" fill="#0284c7" fillOpacity="0.5" />
            <text x="260" y="225" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Water Reservoir & Heaters</text>
            <text x="260" y="145" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">Saturated Steam: 121°C</text>

            {/* Pressure Gauge & Digital Control Panel */}
            <circle cx="450" cy="120" r="35" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <line x1="450" y1="120" x2="470" y2="105" stroke="#ef4444" strokeWidth="2.5" />
            <text x="450" y="145" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">15.2 PSI</text>

            {/* Digital Parameters Display */}
            <rect x="405" y="175" width="205" height="85" rx="8" fill="#020617" stroke="#475569" strokeWidth="1.5" />
            <text x="425" y="200" fill="#22c55e" fontSize="14" fontWeight="bold" fontFamily="monospace">TEMP: 121.5°C</text>
            <text x="425" y="220" fill="#38bdf8" fontSize="11" fontFamily="monospace">PRESSURE: 103 kPa</text>
            <text x="425" y="240" fill="#f59e0b" fontSize="11" fontFamily="monospace">HOLD TIME: 20:00 MIN</text>

            <text x="370" y="285" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
              High-Pressure Steam Sterilizer (Autoclave)
            </text>
          </svg>
        );

      case 'elisa-reader':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="620" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Sliding 96-well plate tray */}
            <rect x="90" y="80" width="250" height="170" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <rect x="110" y="100" width="210" height="130" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            {/* 8x12 well matrix */}
            {[0, 1, 2, 3, 4].map((r) =>
              [0, 1, 2, 3, 4, 5, 6].map((c) => (
                <circle
                  key={`${r}-${c}`}
                  cx={128 + c * 25}
                  cy={115 + r * 20}
                  r="7"
                  fill={(r + c) % 3 === 0 ? '#eab308' : (r + c) % 3 === 1 ? '#38bdf8' : '#334155'}
                  fillOpacity="0.8"
                />
              ))
            )}
            <text x="215" y="245" fill="#94a3b8" fontSize="10" textAnchor="middle">Motorized 96-Well Microplate Carrier</text>

            {/* Display showing OD Readout Matrix */}
            <rect x="370" y="80" width="280" height="170" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="390" y="110" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">MICROPLATE SPECTROPHOTOMETER</text>
            <text x="390" y="135" fill="#22c55e" fontSize="16" fontWeight="bold" fontFamily="monospace">FILTER: 450 nm / 630 nm</text>
            <text x="390" y="160" fill="#f59e0b" fontSize="12" fontFamily="monospace">Std Curve R² = 0.9982</text>
            <text x="390" y="185" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Sample OD Range: 0.045 – 3.250</text>
            
            <rect x="390" y="205" width="100" height="30" rx="6" fill="#0284c7" />
            <text x="440" y="224" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">READ PLATE</text>
          </svg>
        );

      case 'fluorescence-microscope':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="620" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Microscope Stand */}
            <g transform="translate(110, 50)">
              {/* Eyepieces */}
              <polygon points="120,30 110,60 130,60" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
              <polygon points="150,30 140,60 160,60" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Epifluorescence filter turret */}
              <rect x="105" y="75" width="60" height="25" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="135" y="91" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">FILTER CUBE</text>
              {/* Objective turret */}
              <circle cx="135" cy="120" r="16" fill="#334155" stroke="#64748b" strokeWidth="2" />
              <rect x="130" y="125" width="10" height="30" fill="#94a3b8" />
              <text x="135" y="145" fill="#020617" fontSize="8" fontWeight="bold" textAnchor="middle">100x</text>
              {/* Stage and slide */}
              <rect x="80" y="160" width="110" height="10" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
              <rect x="115" y="157" width="40" height="4" fill="#86efac" />
              {/* Stand body */}
              <rect x="60" y="70" width="25" height="150" rx="6" fill="#475569" />
              <rect x="40" y="215" width="150" height="18" rx="4" fill="#334155" />
            </g>

            {/* Digital Sensor Display */}
            <rect x="360" y="70" width="300" height="195" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Render cell fluorescence image on screen */}
            <circle cx="430" cy="140" r="30" fill="#22c55e" fillOpacity="0.4" stroke="#4ade80" strokeWidth="2" />
            <circle cx="430" cy="140" r="12" fill="#3b82f6" fillOpacity="0.7" stroke="#60a5fa" strokeWidth="1.5" />
            <circle cx="510" cy="155" r="24" fill="#22c55e" fillOpacity="0.4" stroke="#4ade80" strokeWidth="2" />
            <circle cx="510" cy="155" r="9" fill="#3b82f6" fillOpacity="0.7" stroke="#60a5fa" strokeWidth="1.5" />
            
            <text x="380" y="100" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">EPIFLUORESCENCE DIGITAL CAPTURE</text>
            <text x="380" y="215" fill="#86efac" fontSize="10" fontFamily="monospace">Channel 1 (GFP): 488 nm Ex / 509 nm Em</text>
            <text x="380" y="235" fill="#93c5fd" fontSize="10" fontFamily="monospace">Channel 2 (DAPI): 358 nm Ex / 461 nm Em</text>
          </svg>
        );

      case 'bioreactor':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="40" width="620" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Bioreactor Glass/Steel Vessel */}
            <rect x="100" y="70" width="220" height="190" rx="20" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Top drive motor */}
            <rect x="180" y="50" width="60" height="25" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="210" y="66" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">MOTOR</text>
            {/* Central Agitator Shaft */}
            <rect x="207" y="75" width="6" height="160" fill="#94a3b8" />
            {/* Rushton turbine impellers */}
            <rect x="165" y="140" width="90" height="10" rx="2" fill="#38bdf8" />
            <rect x="165" y="190" width="90" height="10" rx="2" fill="#38bdf8" />
            {/* Aeration sparger ring */}
            <circle cx="210" cy="235" r="15" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="3 3" />
            {/* Liquid broth */}
            <rect x="110" y="120" width="200" height="130" rx="10" fill="#0284c7" fillOpacity="0.2" />

            {/* Industrial PLC SCADA Controller Panel */}
            <rect x="350" y="70" width="300" height="195" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="370" y="100" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">BIOREACTOR FERMENTATION PLC</text>
            <text x="370" y="130" fill="#22c55e" fontSize="16" fontWeight="bold" fontFamily="monospace">pH: 7.20 | DO: 45.0%</text>
            <text x="370" y="160" fill="#f59e0b" fontSize="14" fontWeight="bold" fontFamily="monospace">TEMP: 37.0°C | AGITATION: 350 RPM</text>
            <text x="370" y="190" fill="#38bdf8" fontSize="12" fontFamily="monospace">Air Flow: 1.5 VVM | Foam: Normal</text>
            <text x="370" y="235" fill="#cbd5e1" fontSize="11" fontFamily="monospace">Feeding Mode: Exponential Fed-Batch</text>
          </svg>
        );

      case 'incubator':
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="70" y="40" width="600" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Dual Door Chamber */}
            <rect x="100" y="70" width="240" height="190" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="2.5" />
            {/* Perforated Stainless Shelves */}
            <line x1="110" y1="120" x2="330" y2="120" stroke="#64748b" strokeWidth="3" strokeDasharray="6 3" />
            <line x1="110" y1="165" x2="330" y2="165" stroke="#64748b" strokeWidth="3" strokeDasharray="6 3" />
            <line x1="110" y1="210" x2="330" y2="210" stroke="#64748b" strokeWidth="3" strokeDasharray="6 3" />
            {/* Culture flasks inside */}
            <rect x="130" y="145" width="30" height="18" rx="3" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1" />
            <rect x="220" y="145" width="30" height="18" rx="3" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1" />
            <text x="220" y="245" fill="#94a3b8" fontSize="10" textAnchor="middle">Water-Jacketed Stainless Interior</text>

            {/* PID Environmental Controller */}
            <rect x="370" y="70" width="270" height="190" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="390" y="105" fill="#38bdf8" fontSize="13" fontWeight="bold" fontFamily="monospace">CO2 INCUBATOR CONTROL</text>
            <text x="390" y="140" fill="#22c55e" fontSize="22" fontWeight="bold" fontFamily="monospace">37.0 °C</text>
            <text x="390" y="175" fill="#f59e0b" fontSize="18" fontWeight="bold" fontFamily="monospace">5.0% CO2 (IR Sensor)</text>
            <text x="390" y="205" fill="#38bdf8" fontSize="13" fontFamily="monospace">Humidity: 95% RH (Water Pan)</text>
            <text x="390" y="235" fill="#86efac" fontSize="11" fontFamily="monospace">Sterilization Cycle: 180°C Ready</text>
          </svg>
        );

      default:
        // High-precision scientific laboratory console blueprint
        return (
          <svg viewBox="0 0 740 340" className="w-full h-auto drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="70" y="40" width="600" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="3" />
            {/* Analytical Hardware Core */}
            <rect x="100" y="70" width="260" height="190" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />
            <circle cx="230" cy="165" r="55" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="5 5" />
            <circle cx="230" cy="165" r="28" fill="#0284c7" fillOpacity="0.4" />
            <path d="M 210 165 L 250 165 M 230 145 L 230 185" stroke="#38bdf8" strokeWidth="2" />
            <text x="230" y="245" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Precision Analytical Interface
            </text>

            {/* Display & Controller */}
            <rect x="390" y="70" width="250" height="190" rx="12" fill="#020617" stroke="#38bdf8" strokeWidth="2.5" />
            <rect x="415" y="95" width="200" height="60" rx="6" fill="#0f172a" />
            <text x="430" y="125" fill="#22c55e" fontSize="16" fontWeight="bold" fontFamily="monospace">SYSTEM READY</text>
            <text x="430" y="142" fill="#64748b" fontSize="9" fontFamily="monospace">NIST-TRACEABLE CALIBRATION</text>
            
            <rect x="415" y="175" width="95" height="32" rx="6" fill="#0284c7" />
            <text x="462" y="195" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">EXECUTE</text>
            <rect x="520" y="175" width="95" height="32" rx="6" fill="#334155" />
            <text x="567" y="195" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">CONFIG</text>

            <text x="370" y="285" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">
              {name.en} (Certified Research Hardware Architecture)
            </text>
          </svg>
        );
    }
  };

  // Structured 5-stage workflow pipeline for each instrument
  const getWorkflowPipeline = (instrumentSlug: string) => {
    switch (instrumentSlug) {
      case 'uv-vis-spectrophotometer':
        return [
          {
            stepNumber: 1,
            title: { en: 'Light Emission', hinglish: 'Light Source Ignition' },
            description: {
              en: 'Deuterium arc lamp emits continuous UV spectrum (190–380 nm); Tungsten lamp emits visible spectrum (380–1100 nm).',
              hinglish: 'Deuterium lamp UV aur Tungsten lamp visible spectrum light generate karta hai.',
            },
            badge: 'Photon Source',
            metric: '190–1100 nm',
          },
          {
            stepNumber: 2,
            title: { en: 'Monochromator & Diffraction', hinglish: 'Monochromator Grating' },
            description: {
              en: 'Diffraction grating rotates to isolate narrow monochromatic wavelength band (e.g. 260 nm for DNA, 280 nm for protein).',
              hinglish: 'Diffraction grating ghum kar exact single wavelength (e.g. 260 nm) isolate karta hai.',
            },
            badge: 'Wavelength Filter',
            metric: 'Bandwidth ≤ 1.0 nm',
          },
          {
            stepNumber: 3,
            title: { en: 'Cuvette Passage & Absorption', hinglish: 'Cuvette me Absorption' },
            description: {
              en: 'Monochromatic beam travels through 1 cm quartz cuvette. Molecules absorb photons proportional to concentration: A = ε · c · l.',
              hinglish: 'Quartz cuvette se light pass hoti hai jahan DNA/protein photons absorb karte hain.',
            },
            badge: 'Sample Chamber',
            metric: '1 cm Quartz Cell',
          },
          {
            stepNumber: 4,
            title: { en: 'Photodiode Detection', hinglish: 'Photodetector Transduction' },
            description: {
              en: 'Photodiode array converts transmitted light photons into micro-amperes electrical current.',
              hinglish: 'Transmitted light detector par padti hai aur electric signal me convert hoti hai.',
            },
            badge: 'Sensor',
            metric: 'Current: I < I0',
          },
          {
            stepNumber: 5,
            title: { en: 'Digital Signal & Concentration', hinglish: 'Digital Output Calculation' },
            description: {
              en: 'Microprocessor calculates Absorbance = -log10(I / I0) and outputs exact concentration (µg/mL) and purity ratio.',
              hinglish: 'ADC microprocessor Absorbance calculate karke digital concentration display karta hai.',
            },
            badge: 'Readout',
            metric: 'A260 = 0.524 AU',
          },
        ];

      case 'centrifuge':
        return [
          {
            stepNumber: 1,
            title: { en: 'Gravimetric Balancing', hinglish: 'Counterbalance Loading' },
            description: {
              en: 'Tubes are weighed on an analytical balance to ± 0.05 g and placed in diametrically opposing rotor buckets.',
              hinglish: 'Tubes ko exact same weight me balance karke aamne-saamne rotor buckets me load kiya jata hai.',
            },
            badge: 'Sample Prep',
            metric: 'Δm < 0.05 g',
          },
          {
            stepNumber: 2,
            title: { en: 'Motor Acceleration', hinglish: 'Speed Ramp Phase' },
            description: {
              en: 'Brushless induction motor accelerates titanium rotor to 14,000 RPM, establishing centrifugal G-force.',
              hinglish: 'Heavy motor rotor ko 14,000 RPM tak accelerate karta hai.',
            },
            badge: 'Kinetic Drive',
            metric: '14,000 RPM',
          },
          {
            stepNumber: 3,
            title: { en: 'Centrifugal Sedimentation', hinglish: 'Phase Separation Vector' },
            description: {
              en: 'Centrifugal force (20,800 × g) overcomes buoyant force, driving dense particles along outward vectors to the tube bottom.',
              hinglish: 'Centrifugal force particles ko tube bottom me pellet ke roop me sediment karti hai.',
            },
            badge: 'Separation',
            metric: '20,817 × g',
          },
          {
            stepNumber: 4,
            title: { en: 'Refrigerated Thermal Control', hinglish: 'Thermal Chamber Cooling' },
            description: {
              en: 'CFC-free compressor circulates cooling around rotor chamber, maintaining constant 4°C to prevent enzymatic degradation.',
              hinglish: 'Compressor rotor bowl ko 4°C par maintain rakhta hai taaki enzymes degrade na hon.',
            },
            badge: 'Temperature',
            metric: '4.0°C ± 1.0°C',
          },
          {
            stepNumber: 5,
            title: { en: 'Deceleration & Pellet Harvest', hinglish: 'Pellet Collection' },
            description: {
              en: 'Smooth dynamic braking brings rotor to rest without disturbing pellet; supernatant is aspirated cleanly.',
              hinglish: 'Smooth stop ke baad supernatant aspirate karke clean pellet harvest kiya jata hai.',
            },
            badge: 'Harvest',
            metric: '0 RPM (At Rest)',
          },
        ];

      case 'micropipette':
        return [
          {
            stepNumber: 1,
            title: { en: 'Volume Setting & Tip Seating', hinglish: 'Volume Dial & Tip Mount' },
            description: {
              en: 'Micrometer wheel adjusts piston stroke volume; tip is firmly mounted onto shaft via single straight press.',
              hinglish: 'Volume counter dial set kiya jata hai aur polypropylene tip shaft par firmly attach ki jaati hai.',
            },
            badge: 'Setup',
            metric: 'P1000: 100–1000 µL',
          },
          {
            stepNumber: 2,
            title: { en: 'First Stop Depression', hinglish: 'First Stop Press' },
            description: {
              en: 'Plunger is depressed with thumb until positive resistance (first stop) is reached before entering liquid.',
              hinglish: 'Liquid me tip daalne se pehle plunger ko pehle stop tak smooth press kiya jata hai.',
            },
            badge: 'Air Displacement',
            metric: 'Displace Vol V',
          },
          {
            stepNumber: 3,
            title: { en: 'Liquid Aspiration', hinglish: 'Sample Aspiration' },
            description: {
              en: 'Tip is immersed 2–3 mm vertically into reagent; plunger is released slowly to pull accurate liquid volume without bubbles.',
              hinglish: 'Tip liquid me 2-3 mm immerse karke plunger dheere-dheere release kiya jata hai.',
            },
            badge: 'Draw Phase',
            metric: '100.0 µL ± 0.6%',
          },
          {
            stepNumber: 4,
            title: { en: 'Blow-Out to Second Stop', hinglish: 'Second Stop Dispense' },
            description: {
              en: 'Tip touches receiving vessel wall at 45°; plunger is pressed past first stop to second stop (blow-out) to eject all droplets.',
              hinglish: 'Dispense karte waqt plunger ko second stop tak press karke aakhiri boond eject ki jaati hai.',
            },
            badge: 'Dispense',
            metric: 'Zero Residual',
          },
          {
            stepNumber: 5,
            title: { en: 'Tip Ejection to Biohazard', hinglish: 'Tip Ejection' },
            description: {
              en: 'Ejector button is pressed over hazardous waste container to prevent cross-contamination.',
              hinglish: 'Ejector button se used tip ko biohazard container me discard kiya jata hai.',
            },
            badge: 'Cleanup',
            metric: 'Cross-Contam Free',
          },
        ];

      case 'ph-meter':
        return [
          {
            stepNumber: 1,
            title: { en: 'Electrode Hydration & Rinse', hinglish: 'Electrode Wash' },
            description: {
              en: 'Glass combination bulb is removed from 3M KCl storage solution and rinsed thoroughly with deionized Milli-Q water.',
              hinglish: 'Glass electrode ko storage solution se nikaal kar deionized water se rinse kiya jata hai.',
            },
            badge: 'Prep',
            metric: '3M KCl Storage',
          },
          {
            stepNumber: 2,
            title: { en: '2-Point / 3-Point Calibration', hinglish: 'Buffer Calibration' },
            description: {
              en: 'Probe is placed in standard pH 7.00 and pH 4.01 buffers; microprocessor calibrates zero-offset and slope response.',
              hinglish: 'Standard buffers (pH 7 aur 4) me probe calibrate karke 95-102% slope verify kiya jata hai.',
            },
            badge: 'Calibration',
            metric: 'Slope ≥ 98.0%',
          },
          {
            stepNumber: 3,
            title: { en: 'Sample Immersion & Stirring', hinglish: 'Sample Immersion' },
            description: {
              en: 'Electrode and ATC temperature probe are immersed into test solution with constant gentle magnetic stirring.',
              hinglish: 'Sample me electrode immerse karke magnetic stirrer par steady mix kiya jata hai.',
            },
            badge: 'Measurement',
            metric: '25.0°C (ATC)',
          },
          {
            stepNumber: 4,
            title: { en: 'Nernst Potential Development', hinglish: 'Nernstian Voltage' },
            description: {
              en: 'H+ ions establish potential difference across glass bulb membrane: E = E0 - (2.303 RT/F) * pH (59.16 mV/pH unit).',
              hinglish: 'H+ ions glass membrane par potential generate karte hain jo Nernst equation follow karta hai.',
            },
            badge: 'Sensing',
            metric: '59.16 mV / pH Unit',
          },
          {
            stepNumber: 5,
            title: { en: 'Stabilization & Logging', hinglish: 'Stable pH Readout' },
            description: {
              en: 'High-impedance electrometer displays final stabilized pH to 2 decimal places alongside temperature.',
              hinglish: 'Stable reading lock ho kar screen par exact pH aur temperature display hoti hai.',
            },
            badge: 'Readout',
            metric: 'pH 7.02 ± 0.01',
          },
        ];

      case 'pcr-machine':
        return [
          {
            stepNumber: 1,
            title: { en: 'Reaction Assembly on Ice', hinglish: 'Master Mix Prep' },
            description: {
              en: 'Buffer, MgCl2, dNTPs, forward/reverse primers, template DNA, and Taq polymerase are mixed in 0.2 mL thin-walled tubes.',
              hinglish: 'Ice par buffer, dNTPs, primers, DNA template aur Taq polymerase assemble kiya jata hai.',
            },
            badge: 'Assembly',
            metric: '25–50 µL Reaction',
          },
          {
            stepNumber: 2,
            title: { en: 'Denaturation (95°C)', hinglish: 'Denaturation Phase' },
            description: {
              en: 'Peltier element heats block to 95°C. Hydrogen bonds break, separating double-stranded DNA into single strands.',
              hinglish: '95°C par hydrogen bonds break ho kar dsDNA single strands me unwind ho jata hai.',
            },
            badge: 'Step 1',
            metric: '95.0°C (30 sec)',
          },
          {
            stepNumber: 3,
            title: { en: 'Primer Annealing (55°C)', hinglish: 'Annealing Phase' },
            description: {
              en: 'Block cools at 4°C/s to 55°C. Oligonucleotide primers bind complementary flanking sequences on single strands.',
              hinglish: 'Block 55°C cool hota hai aur primers specific target sequence se hybridize karte hain.',
            },
            badge: 'Step 2',
            metric: '55.0°C (30 sec)',
          },
          {
            stepNumber: 4,
            title: { en: 'Polymerase Extension (72°C)', hinglish: 'Extension Phase' },
            description: {
              en: 'Block warms to 72°C. Thermostable Taq DNA polymerase adds complementary dNTPs in the 5\' to 3\' direction.',
              hinglish: 'Taq polymerase 72°C par naye nucleotides add karke complementary strand synthesize karta hai.',
            },
            badge: 'Step 3',
            metric: '72.0°C (60 sec/kb)',
          },
          {
            stepNumber: 5,
            title: { en: 'Exponential Amplification', hinglish: 'Product Amplified' },
            description: {
              en: 'Cycles repeat 30–35 times, yielding billions of amplicon copies: N = N0 × 2^35, followed by safe 4°C storage hold.',
              hinglish: '35 cycles me single copy se billions of DNA fragments amplify hokar 4°C hold par save hote hain.',
            },
            badge: 'Output',
            metric: '2^35 Copies (~34 Billion)',
          },
        ];

      case 'real-time-pcr':
        return [
          {
            stepNumber: 1,
            title: { en: 'Fluorophore Reaction Assembly', hinglish: 'TaqMan / SYBR Assembly' },
            description: {
              en: 'TaqMan fluorogenic dual-labeled probe or SYBR Green I dye is mixed with cDNA and gene-specific primers.',
              hinglish: 'TaqMan fluorescent probe ya SYBR Green dye cDNA template ke sath mix kiya jata hai.',
            },
            badge: 'Chemistry',
            metric: '96-Well Optical Plate',
          },
          {
            stepNumber: 2,
            title: { en: 'Thermal Cycling Progression', hinglish: 'Peltier Cycling' },
            description: {
              en: 'Automated rapid Peltier ramping cycles through Denaturation (95°C) and Annealing/Extension (60°C).',
              hinglish: 'Rapid Peltier ramping fast cycling execute karti hai.',
            },
            badge: 'Cycling',
            metric: 'Ramp Rate 5.5°C/s',
          },
          {
            stepNumber: 3,
            title: { en: 'Real-Time Fluorophore Excitation', hinglish: 'Laser / LED Excitation' },
            description: {
              en: 'LED/Laser source fires through optical fiber bundle at the end of each extension cycle.',
              hinglish: 'Har cycle ke end par LED light sample wells par padti hai.',
            },
            badge: 'Optics',
            metric: '470 nm / 520 nm',
          },
          {
            stepNumber: 4,
            title: { en: 'Fluorescence Emission Detection', hinglish: 'CCD Signal Capture' },
            description: {
              en: 'Cooled CCD camera records emitted fluorescent photon bursts, subtracting passive reference dye (ROX).',
              hinglish: 'High-sensitivity CCD camera emitted fluorescence capture karti hai.',
            },
            badge: 'Detector',
            metric: 'Multiplex (5 Colors)',
          },
          {
            stepNumber: 5,
            title: { en: 'Cycle Threshold (Ct) Quantification', hinglish: 'Ct & Relative Fold Change' },
            description: {
              en: 'Software determines the exact cycle number (Ct) where fluorescence crosses baseline, computing 2^-ΔΔCt fold expression.',
              hinglish: 'Ct value identify hoti hai aur 2^-ΔΔCt formula se relative gene expression calculate hoti hai.',
            },
            badge: 'Quantification',
            metric: 'Ct = 18.42 (R² > 0.99)',
          },
        ];

      case 'gel-electrophoresis-system':
        return [
          {
            stepNumber: 1,
            title: { en: 'Agarose Gel Casting', hinglish: 'Gel Casting with Comb' },
            description: {
              en: '1.0% agarose dissolved in 1× TAE/TBE buffer with EtBr/GelRed is poured into casting tray with well-forming comb.',
              hinglish: 'Agarose buffer me melt karke gel tray me pour kiya jata hai comb laga kar.',
            },
            badge: 'Polymerization',
            metric: '1.0% Agarose Slab',
          },
          {
            stepNumber: 2,
            title: { en: 'Comb Removal & Submersion', hinglish: 'Submersion in Buffer' },
            description: {
              en: 'Comb is pulled straight up; gel tray is placed in electrophoresis tank submerged beneath 3–5 mm of 1× TAE buffer.',
              hinglish: 'Comb nikaal kar gel ko buffer tank me fully immerse kiya jata hai.',
            },
            badge: 'Submarine Tank',
            metric: '1× TAE Running Buffer',
          },
          {
            stepNumber: 3,
            title: { en: 'Sample Loading with Dye', hinglish: 'Sample Loading' },
            description: {
              en: 'DNA ladder and samples mixed with 6× loading dye (glycerol + bromophenol blue) are loaded into wells with P20 pipette.',
              hinglish: 'Density loading dye ke sath DNA ladder aur samples wells me carefully load kiye jaate hain.',
            },
            badge: 'Loading',
            metric: '5–10 µL per Well',
          },
          {
            stepNumber: 4,
            title: { en: 'Electric Field Migration', hinglish: 'Electric Field Run' },
            description: {
              en: '100 V DC applied across platinum electrodes. Negatively charged DNA phosphate backbones migrate towards positive anode (+).',
              hinglish: 'Power supply se voltage lagte hi negative DNA anode (+) ki taraf move karta hai.',
            },
            badge: 'Separation',
            metric: '100 V (5 V/cm)',
          },
          {
            stepNumber: 5,
            title: { en: 'UV / Blue Light Transillumination', hinglish: 'Band Visualization' },
            description: {
              en: 'Gel is illuminated under 302 nm UV or 470 nm Blue LED to visualize fluorescing DNA bands according to molecular weight.',
              hinglish: 'Transilluminator par DNA bands molecular weight ke according clearly visible hote hain.',
            },
            badge: 'Imaging',
            metric: 'Resolution: 100–10,000 bp',
          },
        ];

      case 'biosafety-cabinet':
      case 'laminar-air-flow':
        return [
          {
            stepNumber: 1,
            title: { en: 'UV Germicidal Decontamination', hinglish: 'UV Germicidal Cycle' },
            description: {
              en: 'Sash is closed completely; 254 nm UV lamp is turned ON for 15–20 minutes to sterilize internal stainless surfaces.',
              hinglish: 'Sash band karke 20 minute tak UV light on rakh kar cabinet sterilize kiya jata hai.',
            },
            badge: 'Sterilization',
            metric: '254 nm UV (20 min)',
          },
          {
            stepNumber: 2,
            title: { en: 'Blower Start & Air Purge', hinglish: 'HEPA Blower Purge' },
            description: {
              en: 'Blower fan is activated; sash is set to certified 8-inch working height; cabinet runs for 5 minutes to sweep airborne particulates.',
              hinglish: 'Blower on karke sash 8 inch par set kiya jata hai taaki air curtain stabilize ho sake.',
            },
            badge: 'Air Purge',
            metric: 'Velocity: 0.51 m/s',
          },
          {
            stepNumber: 3,
            title: { en: 'Surface Disinfection with 70% EtOH', hinglish: '70% Ethanol Wipe' },
            description: {
              en: 'Stainless steel work surface, side walls, and all introduced apparatus are wiped with 70% sterile ethanol.',
              hinglish: 'Worksurface aur sabhi tools ko 70% ethanol se thoroughly wipe kiya jata hai.',
            },
            badge: 'Aseptic Prep',
            metric: '70% v/v Ethanol',
          },
          {
            stepNumber: 4,
            title: { en: 'Laminar Air Curtain Filtration', hinglish: 'Laminar Flow Protection' },
            description: {
              en: 'HEPA filter removes 99.97% of 0.3 µm particles, delivering unidirectional ISO Class 5 sterile downflow over culture vessels.',
              hinglish: 'HEPA filter 99.97% microbes filter karke continuous sterile air curtain maintain karta hai.',
            },
            badge: 'Containment',
            metric: '99.97% @ 0.3 µm',
          },
          {
            stepNumber: 5,
            title: { en: 'Post-Work Wipe & Safe Shutdown', hinglish: 'Decon & Shutdown' },
            description: {
              en: 'Biohazard waste is sealed; surface is cleaned with disinfectant; sash is closed and cabinet returned to secure standby.',
              hinglish: 'Kaam ke baad surface clean karke waste safe discard kiya jata hai.',
            },
            badge: 'Standby',
            metric: 'Zero Contamination',
          },
        ];

      case 'autoclave':
        return [
          {
            stepNumber: 1,
            title: { en: 'Water Fill & Item Wrapping', hinglish: 'Water Reservoir Setup' },
            description: {
              en: 'Chamber is filled with deionized water to heater level; glassware/media bottles have loose caps and autoclave indicator tape.',
              hinglish: 'Chamber me deionized water fill kiya jata hai aur bottles ke caps thode loose rakhe jaate hain.',
            },
            badge: 'Preparation',
            metric: 'Milli-Q Water Fill',
          },
          {
            stepNumber: 2,
            title: { en: 'Radial Door Latch & Air Purge', hinglish: 'Radial Door Seal' },
            description: {
              en: 'Heavy radial locking lugs are engaged tightly. Vent valve remains open during initial heating to purge cold air pockets.',
              hinglish: 'Door lock kiya jata hai aur vent valve se cold air bahar nikali jaati hai.',
            },
            badge: 'Door Lock',
            metric: 'Airtight Pressure Seal',
          },
          {
            stepNumber: 3,
            title: { en: 'Steam Pressurization (15 PSI)', hinglish: 'Steam Pressurization' },
            description: {
              en: 'Vent valve closes. Trapped saturated steam builds internal pressure to 103 kPa (15 PSI), raising temperature to 121°C.',
              hinglish: 'Saturated steam pressure 15 PSI tak build hota hai jisse temperature 121°C pahunch jata hai.',
            },
            badge: 'Pressurization',
            metric: '103 kPa (15.0 PSI)',
          },
          {
            stepNumber: 4,
            title: { en: 'Sterilization Hold (121°C, 20 min)', hinglish: 'Sterilization Hold' },
            description: {
              en: 'Timer counts down 20 minutes at 121°C, denaturing all bacterial proteins and killing heat-resistant endospores (G. stearothermophilus).',
              hinglish: '121°C par 20 minute hold se saare bacterial endospores kill ho jaate hain.',
            },
            badge: 'Sterilization',
            metric: '121.0°C (20 min)',
          },
          {
            stepNumber: 5,
            title: { en: 'Slow Exhaust & Pressure Release', hinglish: 'Exhaust & Safe Unload' },
            description: {
              en: 'Steam exhausts slowly until pressure gauge reads zero (0 PSI) and temperature drops below 80°C before door is unlocked.',
              hinglish: 'Pressure zero hone aur temperature 80°C se niche aane par hi door safely open kiya jata hai.',
            },
            badge: 'Safe Unload',
            metric: '0 PSI / < 80°C',
          },
        ];

      default:
        return [
          {
            stepNumber: 1,
            title: { en: 'Sample Preparation & Calibration', hinglish: 'Sample Prep & Baseline' },
            description: {
              en: 'Analytical calibration with verified standards and sample mounting into certified chamber.',
              hinglish: 'Sample ko standard procedure ke according calibrate aur chamber me load kiya jata hai.',
            },
            badge: 'Input',
            metric: 'Calibrated NIST',
          },
          {
            stepNumber: 2,
            title: { en: 'Physical / Optical Excitation', hinglish: 'Active Energy Drive' },
            description: {
              en: 'Direct energy transfer, illumination, or mechanical drive is applied under controlled setpoints.',
              hinglish: 'Laser light, heat, ya motor force sample par precisely apply ki jaati hai.',
            },
            badge: 'Drive',
            metric: 'Regulated Input',
          },
          {
            stepNumber: 3,
            title: { en: 'Biophysical Reaction & Transduction', hinglish: 'Assay Transduction' },
            description: {
              en: 'Biomolecules interact with the sensing interface, generating measurable physical changes.',
              hinglish: 'Sample physical interaction execute karke signal generate karta hai.',
            },
            badge: 'Process',
            metric: 'Active Transducing',
          },
          {
            stepNumber: 4,
            title: { en: 'Digital Microprocessor Processing', hinglish: 'Signal Processing' },
            description: {
              en: 'High-speed analog-to-digital converters filter noise and compute quantitative parameters.',
              hinglish: 'Sensors se signal computer me compute hokar accurate data banata hai.',
            },
            badge: 'Compute',
            metric: 'Filtered SNR > 40dB',
          },
          {
            stepNumber: 5,
            title: { en: 'Standard Operating Result & Compliance', hinglish: 'Validated Readout' },
            description: {
              en: 'Final validated assay readout is logged with standard deviation and compliance metrics.',
              hinglish: 'Final quantitative reading screen par display hoti hai.',
            },
            badge: 'Output',
            metric: 'Assay Complete',
          },
        ];
    }
  };

  const workflow = getWorkflowPipeline(slug);

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-5 sm:p-7 space-y-6 shadow-xl">
      {/* Top Controller: Appearance ("Kaisa Dikhta Hai") vs Visual Workflow ("Kaise Kaam Karta Hai") */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Instrument Real Visuals & Interactive Workflow
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            {language === 'hinglish' ? name.hinglish : name.en}
          </h3>
          <p className="text-xs text-slate-400">
            {viewTab === 'appearance'
              ? 'Exact Hardware Blueprint: Real chassis, sample compartment, display & controls'
              : 'End-to-End Operational Workflow: Input -> Physical Mechanism -> Output'}
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-800/90 p-1 rounded-xl border border-slate-700/60 self-start sm:self-auto">
          <button
            onClick={() => setViewTab('appearance')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewTab === 'appearance'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Kaisa Dikhta Hai (Hardware)</span>
          </button>

          <button
            onClick={() => setViewTab('workflow')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              viewTab === 'workflow'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Kaise Kaam Karta Hai (Workflow)</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: KAISA DIKHTA HAI (REAL HARDWARE BLUEPRINT & CHASSIS) */}
      {viewTab === 'appearance' && (
        <div className="space-y-4">
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 sm:p-6 flex items-center justify-center">
            {renderInstrumentGraphic(slug)}
          </div>

          {/* Labeled Structural Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block font-bold">HOUSING CHASSIS</span>
              <span className="text-white font-semibold mt-0.5 block">Heavy-Gauge Corrosion Resistant</span>
            </div>
            <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block font-bold">DIGITAL DISPLAY</span>
              <span className="text-white font-semibold mt-0.5 block">High-Resolution Touch Interface</span>
            </div>
            <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block font-bold">SAMPLE CHAMBER</span>
              <span className="text-white font-semibold mt-0.5 block">Light-Tight Sealed Compartment</span>
            </div>
            <div className="p-3 bg-slate-800/70 rounded-xl border border-slate-700/60">
              <span className="text-[10px] font-mono text-cyan-400 uppercase block font-bold">CALIBRATION STANDARD</span>
              <span className="text-emerald-400 font-semibold mt-0.5 block">ISO 9001 / NIST-Traceable</span>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: KAISE KAAM KARTA HAI (COMPLETE STEP-BY-STEP PROCESS WORKFLOW) */}
      {viewTab === 'workflow' && (
        <div className="space-y-6">
          {/* Workflow Interactive Step Selector Pipeline */}
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Complete 5-Stage Operational Process Flow</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Click any step to inspect</span>
            </div>

            {/* Visual Process Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {workflow.map((item, idx) => {
                const isSelected = activeWorkflowStage === idx;
                return (
                  <div
                    key={item.stepNumber}
                    onClick={() => setActiveWorkflowStage(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 shadow-lg ring-1 ring-cyan-400/50'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold">
                        {item.stepNumber}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase">{item.badge}</span>
                    </div>

                    <h5 className="text-xs font-bold text-white mb-0.5 truncate">
                      {language === 'hinglish' ? item.title.hinglish : item.title.en}
                    </h5>
                    <div className="text-[10px] font-mono text-cyan-300 truncate font-semibold">
                      {item.metric}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Step Deep-Dive Card */}
          <div className="p-6 bg-slate-950 rounded-xl border border-cyan-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-cyan-900/60 text-cyan-300 border border-cyan-700/60 px-2 py-0.5 rounded font-bold uppercase">
                  Active Workflow Stage {workflow[activeWorkflowStage].stepNumber} of 5
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Target Parameter: <strong className="text-white">{workflow[activeWorkflowStage].metric}</strong>
                </span>
              </div>

              <h4 className="text-base font-bold text-white font-mono">
                {language === 'hinglish'
                  ? workflow[activeWorkflowStage].title.hinglish
                  : workflow[activeWorkflowStage].title.en}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {language === 'hinglish'
                  ? workflow[activeWorkflowStage].description.hinglish
                  : workflow[activeWorkflowStage].description.en}
              </p>
            </div>

            {/* Step navigation toggles */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() =>
                  setActiveWorkflowStage((prev) => (prev - 1 + workflow.length) % workflow.length)
                }
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
              >
                ← Prev
              </button>
              <button
                onClick={() =>
                  setActiveWorkflowStage((prev) => (prev + 1) % workflow.length)
                }
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-bold"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
