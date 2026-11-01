import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { SCIENTIFIC_CALCULATORS, CalculatorConfig } from '../../data/calculatorsConfig.ts';
import { Calculator, ArrowRight, RotateCcw, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ScientificCalculator: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCalcId, setSelectedCalcId] = useState<string>('molarity');

  // Deep linking for ?calc=
  useEffect(() => {
    const rawCalc = searchParams.get('calc');
    if (rawCalc) {
      let mapped = rawCalc;
      if (rawCalc === 'centrifuge-rcf') mapped = 'rpm-to-rcf';
      if (rawCalc === 'dna-purity') mapped = 'dna-concentration';

      const exists = SCIENTIFIC_CALCULATORS.some((c) => c.id === mapped);
      if (exists) {
        setSelectedCalcId(mapped);
      }
    }
  }, [searchParams]);

  // Calculator 1: Molarity
  const [molMolarity, setMolMolarity] = useState<string>('0.5');
  const [molVolume, setMolVolume] = useState<string>('500');
  const [molVolUnit, setMolVolUnit] = useState<'mL' | 'L'>('mL');
  const [molMW, setMolMW] = useState<string>('58.44'); // NaCl

  // Calculator 2: Normality
  const [normMolarity, setNormMolarity] = useState<string>('0.1');
  const [normValence, setNormValence] = useState<string>('2'); // e.g. H2SO4

  // Calculator 3: Dilution C1V1 = C2V2
  const [dilC1, setDilC1] = useState<string>('10');
  const [dilC1Unit, setDilC1Unit] = useState<string>('X');
  const [dilC2, setDilC2] = useState<string>('1');
  const [dilV2, setDilV2] = useState<string>('100');
  const [dilV2Unit, setDilV2Unit] = useState<'mL' | 'uL' | 'L'>('mL');

  // Calculator 4: Percentage Solution
  const [percType, setPercType] = useState<'wv' | 'vv'>('wv');
  const [percPercent, setPercPercent] = useState<string>('10');
  const [percVolume, setPercVolume] = useState<string>('250');

  // Calculator 5: RPM to RCF
  const [rpmValue, setRpmValue] = useState<string>('12000');
  const [radiusValue, setRadiusValue] = useState<string>('8.5'); // cm

  // Calculator 6: DNA Concentration & Purity
  const [dnaA260, setDnaA260] = useState<string>('0.42');
  const [dnaA280, setDnaA280] = useState<string>('0.23');
  const [dnaType, setDnaType] = useState<'dsDNA' | 'ssDNA' | 'RNA'>('dsDNA');
  const [dnaDilution, setDnaDilution] = useState<string>('50');

  // Calculator 7: Protein Concentration
  const [protA280, setProtA280] = useState<string>('0.65');
  const [protEpsilon, setProtEpsilon] = useState<string>('43824'); // BSA extinction coeff
  const [protMW, setProtMW] = useState<string>('66463'); // BSA MW

  // Calculator 8: Oligo MW & Tm
  const [oligoSeq, setOligoSeq] = useState<string>('ATGCGATCGATCGATCGATC');

  // Calculator 9: Buffer Preparation
  const [buffPka, setBuffPka] = useState<string>('8.06'); // Tris
  const [buffTargetPh, setBuffTargetPh] = useState<string>('7.5');
  const [buffTotalConc, setBuffTotalConc] = useState<string>('50'); // mM

  const activeCalc = SCIENTIFIC_CALCULATORS.find((c) => c.id === selectedCalcId) || SCIENTIFIC_CALCULATORS[0];

  // Helper computation results
  const computeMolarity = () => {
    const M = parseFloat(molMolarity) || 0;
    const volL = (parseFloat(molVolume) || 0) * (molVolUnit === 'mL' ? 0.001 : 1);
    const mw = parseFloat(molMW) || 0;
    const massG = M * volL * mw;
    return {
      massG: massG.toFixed(4),
      massMg: (massG * 1000).toFixed(2),
      moles: (M * volL).toExponential(3),
    };
  };

  const computeNormality = () => {
    const M = parseFloat(normMolarity) || 0;
    const n = parseFloat(normValence) || 1;
    const N = M * n;
    return {
      normality: N.toFixed(4),
    };
  };

  const computeDilution = () => {
    const c1 = parseFloat(dilC1);
    const c2 = parseFloat(dilC2);
    const v2 = parseFloat(dilV2);

    if (isNaN(c1) || isNaN(c2) || isNaN(v2)) {
      return {
        isValid: false,
        error: 'Please enter valid numeric values for C1, C2, and V2.',
        v1: '0.000',
        dilFactor: '0',
        bufferVol: '0.00'
      };
    }
    if (c1 <= 0 || c2 <= 0 || v2 <= 0) {
      return {
        isValid: false,
        error: 'Concentrations and target volumes must be positive numbers strictly greater than 0.',
        v1: '0.000',
        dilFactor: '0',
        bufferVol: '0.00'
      };
    }
    if (c2 > c1) {
      return {
        isValid: false,
        error: 'Target concentration (C2) cannot exceed stock concentration (C1) in a dilution protocol. Buffer volume would be negative.',
        v1: '0.000',
        dilFactor: '0',
        bufferVol: '0.00'
      };
    }

    const v1 = (c2 * v2) / c1;
    const dilFactor = (c1 / c2).toFixed(2);
    const bufferVol = Math.max(0, v2 - v1).toFixed(2);

    return {
      isValid: true,
      error: null,
      v1: v1.toFixed(3),
      dilFactor,
      bufferVol,
      formulaExplanation: `C1 × V1 = C2 × V2  ⟹  V1 = (${c2} × ${v2}) / ${c1} = ${v1.toFixed(3)} ${dilV2Unit}. Required diluent/buffer = V2 - V1 = ${v2} - ${v1.toFixed(3)} = ${bufferVol} ${dilV2Unit}.`
    };
  };

  const computePercentage = () => {
    const p = parseFloat(percPercent) || 0;
    const v = parseFloat(percVolume) || 0;
    const amount = (p * v) / 100;
    return {
      amount: amount.toFixed(3),
      unit: percType === 'wv' ? 'grams' : 'mL',
    };
  };

  const computeRcf = () => {
    const rpm = parseFloat(rpmValue) || 0;
    const r = parseFloat(radiusValue) || 0;
    const rcf = 1.118e-5 * r * Math.pow(rpm, 2);
    return {
      rcf: Math.round(rcf).toLocaleString(),
    };
  };

  const computeDna = () => {
    const a260 = parseFloat(dnaA260) || 0;
    const a280 = parseFloat(dnaA280) || 0;
    const factor = dnaType === 'dsDNA' ? 50 : dnaType === 'ssDNA' ? 33 : 40;
    const dilution = parseFloat(dnaDilution) || 1;
    const conc = a260 * factor * dilution;
    const ratio = a280 > 0 ? (a260 / a280).toFixed(2) : 'N/A';
    let purityComment = 'Pure nucleic acid preparation';
    let isPurityGood = true;
    const numRatio = parseFloat(ratio);
    if (!isNaN(numRatio)) {
      if (numRatio < 1.7) {
        purityComment = 'Ratio < 1.7 indicates protein or phenol contamination';
        isPurityGood = false;
      } else if (numRatio > 2.0 && dnaType === 'dsDNA') {
        purityComment = 'Ratio > 2.0 indicates residual RNA contamination';
        isPurityGood = false;
      }
    }
    return {
      concUgMl: conc.toFixed(2),
      concNgUl: conc.toFixed(2), // 1 ug/mL = 1 ng/uL
      ratio,
      purityComment,
      isPurityGood,
    };
  };

  const computeProtein = () => {
    const a = parseFloat(protA280) || 0;
    const eps = parseFloat(protEpsilon) || 1;
    const mw = parseFloat(protMW) || 1;
    const molarity = a / eps; // M
    const concMgMl = molarity * mw; // g/L = mg/mL
    return {
      concMolar: molarity.toExponential(3),
      concU_M: (molarity * 1e6).toFixed(2),
      concMgMl: concMgMl.toFixed(3),
    };
  };

  const computeOligo = () => {
    const cleanSeq = oligoSeq.toUpperCase().replace(/[^ATGCN]/g, '');
    const len = cleanSeq.length;
    let aCount = 0, tCount = 0, gCount = 0, cCount = 0, nCount = 0;
    for (const char of cleanSeq) {
      if (char === 'A') aCount++;
      else if (char === 'T') tCount++;
      else if (char === 'G') gCount++;
      else if (char === 'C') cCount++;
      else if (char === 'N') nCount++;
    }

    const definitiveBases = aCount + tCount + gCount + cCount;
    const gcPercent = definitiveBases > 0 ? (((gCount + cCount) / definitiveBases) * 100).toFixed(1) : '0';

    // Wallace rule: 2*(A+T) + 4*(G+C)
    // For ambiguous base N: minimum Tm assumes A/T (2 deg each); maximum assumes G/C (4 deg each)
    const baseTm = 2 * (aCount + tCount) + 4 * (gCount + cCount);
    const minTm = baseTm + 2 * nCount;
    const maxTm = baseTm + 4 * nCount;

    // Molecular weights: dAMP=313.21, dTMP=304.2, dCMP=289.18, dGMP=329.21 (minus 61.96 for terminal OH/phosphate)
    // N range: dCMP (289.18) to dGMP (329.21)
    const baseMW = (aCount * 313.21 + tCount * 304.2 + cCount * 289.18 + gCount * 329.21) - (definitiveBases > 0 ? 61.96 : 0);
    const minMW = baseMW + (nCount * 289.18);
    const maxMW = baseMW + (nCount * 329.21);

    return {
      length: len,
      definitiveBases,
      nCount,
      hasAmbiguity: nCount > 0,
      gcPercent,
      tmWallace: len > 0 ? baseTm.toFixed(1) : '0',
      minTm: minTm.toFixed(1),
      maxTm: maxTm.toFixed(1),
      mw: len > 0 ? Math.max(0, baseMW).toFixed(1) : '0',
      minMW: Math.max(0, minMW).toFixed(1),
      maxMW: Math.max(0, maxMW).toFixed(1),
    };
  };

  const computeBuffer = () => {
    const pka = parseFloat(buffPka) || 7.0;
    const targetPh = parseFloat(buffTargetPh) || 7.0;
    const totalConc = parseFloat(buffTotalConc) || 50; // mM
    // Henderson-Hasselbalch: pH = pKa + log([A-]/[HA])
    // [A-]/[HA] = 10^(pH - pKa)
    const ratio = Math.pow(10, targetPh - pka);
    // [A-] + [HA] = totalConc
    // [HA] * (1 + ratio) = totalConc
    const ha = totalConc / (1 + ratio);
    const aMinus = totalConc - ha;
    return {
      ratio: ratio.toFixed(3),
      aMinusMm: aMinus.toFixed(2),
      haMm: ha.toFixed(2),
    };
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="px-6 py-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white tracking-tight">
              {t('Interactive Scientific Calculators', 'Interactive Scientific Calculators')}
            </h2>
            <p className="text-xs text-slate-400">
              {t('9 Verified Biotechnology & Laboratory Calculation Modules', '9 Verified Biotechnology & Laboratory Calculation Tools')}
            </p>
          </div>
        </div>
      </div>

      {/* Calculator selector tabs */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
        <div className="flex gap-1.5 min-w-max">
          {SCIENTIFIC_CALCULATORS.map((calc) => {
            const isActive = calc.id === selectedCalcId;
            return (
              <button
                key={calc.id}
                onClick={() => setSelectedCalcId(calc.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {t(calc.name.en, calc.name.hinglish)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main calculation workspace */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            {t(activeCalc.name.en, activeCalc.name.hinglish)}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {t(activeCalc.description.en, activeCalc.description.hinglish)}
          </p>
          <div className="mt-3 p-3 bg-slate-100 rounded-lg text-xs font-mono text-slate-700 flex items-center gap-2">
            <span className="text-slate-400 font-sans uppercase tracking-wider text-[11px] font-semibold">Formula:</span>
            <span>{activeCalc.formulaDisplay}</span>
          </div>
        </div>

        {/* Dynamic Calculator UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Molarity */}
            {selectedCalcId === 'molarity' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Target Molarity (M)', 'Target Molarity (M)')}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={molMolarity}
                      onChange={(e) => setMolMolarity(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 0.5"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Volume', 'Volume')}
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        step="any"
                        value={molVolume}
                        onChange={(e) => setMolVolume(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-r-0 border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="e.g. 500"
                      />
                      <select
                        value={molVolUnit}
                        onChange={(e) => setMolVolUnit(e.target.value as any)}
                        className="px-3 py-2 text-sm border border-slate-300 rounded-r-lg bg-slate-50 text-slate-700"
                      >
                        <option value="mL">mL</option>
                        <option value="L">L</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      {t('Molecular Weight (g/mol)', 'Molecular Weight (g/mol)')}
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setMolMW('58.44')}
                        className="text-[11px] text-cyan-600 hover:underline"
                      >
                        NaCl (58.44)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMolMW('180.16')}
                        className="text-[11px] text-cyan-600 hover:underline"
                      >
                        Glucose (180.16)
                      </button>
                      <button
                        type="button"
                        onClick={() => setMolMW('121.14')}
                        className="text-[11px] text-cyan-600 hover:underline"
                      >
                        Tris (121.14)
                      </button>
                    </div>
                  </div>
                  <input
                    type="number"
                    step="any"
                    value={molMW}
                    onChange={(e) => setMolMW(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    placeholder="e.g. 58.44"
                  />
                </div>
              </>
            )}

            {/* 2. Normality */}
            {selectedCalcId === 'normality' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('Molarity (M)', 'Molarity (M)')}
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={normMolarity}
                    onChange={(e) => setNormMolarity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('Valence / n-factor', 'Valence / n-factor')}
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="1"
                    value={normValence}
                    onChange={(e) => setNormValence(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="e.g. 2 for H2SO4, 1 for HCl"
                  />
                </div>
              </div>
            )}

            {/* 3. Dilution */}
            {selectedCalcId === 'dilution' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Stock Concentration (C1)', 'Stock Concentration (C1)')}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={dilC1}
                      onChange={(e) => setDilC1(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 10 (10X or 10 mM)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Target Working Concentration (C2)', 'Target Working Concentration (C2)')}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={dilC2}
                      onChange={(e) => setDilC2(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 1 (1X or 1 mM)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('Target Final Volume (V2)', 'Target Final Volume (V2)')}
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      step="any"
                      value={dilV2}
                      onChange={(e) => setDilV2(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-r-0 border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 100"
                    />
                    <select
                      value={dilV2Unit}
                      onChange={(e) => setDilV2Unit(e.target.value as any)}
                      className="px-3 py-2 text-sm border border-slate-300 rounded-r-lg bg-slate-50 text-slate-700"
                    >
                      <option value="uL">μL</option>
                      <option value="mL">mL</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Percentage Solution */}
            {selectedCalcId === 'percentage-solution' && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="percType"
                      checked={percType === 'wv'}
                      onChange={() => setPercType('wv')}
                      className="text-cyan-600 focus:ring-cyan-500"
                    />
                    % (w/v) Weight / Volume (e.g. 10% SDS, Agarose)
                  </label>
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="percType"
                      checked={percType === 'vv'}
                      onChange={() => setPercType('vv')}
                      className="text-cyan-600 focus:ring-cyan-500"
                    />
                    % (v/v) Volume / Volume (e.g. 70% Ethanol)
                  </label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Target Percentage (%)', 'Target Percentage (%)')}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={percPercent}
                      onChange={(e) => setPercPercent(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {t('Final Solution Volume (mL)', 'Final Solution Volume (mL)')}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={percVolume}
                      onChange={(e) => setPercVolume(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g. 250"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. RPM to RCF */}
            {selectedCalcId === 'rpm-to-rcf' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('Centrifuge Speed (RPM)', 'Centrifuge Speed (RPM)')}
                  </label>
                  <input
                    type="number"
                    step="100"
                    value={rpmValue}
                    onChange={(e) => setRpmValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    placeholder="e.g. 12000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {t('Rotor Radius r (cm)', 'Rotor Radius r (cm)')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={radiusValue}
                    onChange={(e) => setRadiusValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    placeholder="e.g. 8.5"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Check rotor specifications stamped on centrifuge rotor rim</p>
                </div>
              </div>
            )}

            {/* 6. DNA Concentration & Purity */}
            {selectedCalcId === 'dna-concentration' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">A260 Absorbance</label>
                    <input
                      type="number"
                      step="0.001"
                      value={dnaA260}
                      onChange={(e) => setDnaA260(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">A280 Absorbance</label>
                    <input
                      type="number"
                      step="0.001"
                      value={dnaA280}
                      onChange={(e) => setDnaA280(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Dilution Factor</label>
                    <input
                      type="number"
                      step="1"
                      value={dnaDilution}
                      onChange={(e) => setDnaDilution(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                      placeholder="e.g. 50 (1:50)"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Nucleic Acid Form</label>
                  <select
                    value={dnaType}
                    onChange={(e) => setDnaType(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700"
                  >
                    <option value="dsDNA">Double-stranded DNA (dsDNA, Factor = 50 μg/mL per OD)</option>
                    <option value="ssDNA">Single-stranded DNA (ssDNA, Factor = 33 μg/mL per OD)</option>
                    <option value="RNA">Single-stranded RNA (RNA, Factor = 40 μg/mL per OD)</option>
                  </select>
                </div>
              </div>
            )}

            {/* 7. Protein Concentration */}
            {selectedCalcId === 'protein-concentration' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">A280 Absorbance</label>
                  <input
                    type="number"
                    step="0.001"
                    value={protA280}
                    onChange={(e) => setProtA280(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Extinction Coeff (M⁻¹cm⁻¹)</label>
                  <input
                    type="number"
                    step="1"
                    value={protEpsilon}
                    onChange={(e) => setProtEpsilon(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Protein MW (Da)</label>
                  <input
                    type="number"
                    step="1"
                    value={protMW}
                    onChange={(e) => setProtMW(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                </div>
              </div>
            )}

            {/* 8. Oligo MW & Tm */}
            {selectedCalcId === 'molecular-weight' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t('DNA Oligonucleotide / Primer Sequence (5\' to 3\')', 'DNA Primer Sequence (5\' to 3\')')}
                </label>
                <textarea
                  rows={3}
                  value={oligoSeq}
                  onChange={(e) => setOligoSeq(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono tracking-wider uppercase"
                  placeholder="e.g. ATGCGATCGATCGATC"
                />
                <p className="text-[11px] text-slate-400 mt-1">Accepts standard nucleotide characters A, T, G, C</p>
              </div>
            )}

            {/* 9. Buffer Prep */}
            {selectedCalcId === 'buffer-prep' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Buffer pKa</label>
                  <input
                    type="number"
                    step="0.01"
                    value={buffPka}
                    onChange={(e) => setBuffPka(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Tris=8.06, HEPES=7.50, Phosphate=7.20</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Target pH</label>
                  <input
                    type="number"
                    step="0.05"
                    value={buffTargetPh}
                    onChange={(e) => setBuffTargetPh(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Total Concentration (mM)</label>
                  <input
                    type="number"
                    step="1"
                    value={buffTotalConc}
                    onChange={(e) => setBuffTotalConc(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Output Card Column */}
          <div className="lg:col-span-5 bg-slate-900 rounded-xl p-5 text-white">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-medium">
              Calculated Results
            </span>

            {/* Molarity Output */}
            {selectedCalcId === 'molarity' && (() => {
              const res = computeMolarity();
              return (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-xs text-slate-400">Required Solute Mass</div>
                    <div className="text-3xl font-mono font-bold text-white mt-1">
                      {res.massG} <span className="text-sm font-sans text-slate-400 font-normal">grams</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5">
                      (= {res.massMg} mg)
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Total Moles:</span>
                      <span className="font-mono text-white">{res.moles} mol</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dissolve in:</span>
                      <span className="font-mono text-white">{molVolume} {molVolUnit} of solvent</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Normality Output */}
            {selectedCalcId === 'normality' && (() => {
              const res = computeNormality();
              return (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-xs text-slate-400">Calculated Normality</div>
                    <div className="text-3xl font-mono font-bold text-white mt-1">
                      {res.normality} <span className="text-sm font-sans text-slate-400 font-normal">N</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                    <div>1 M solution with valence n={normValence} yields {res.normality} equivalents per liter.</div>
                  </div>
                </div>
              );
            })()}

            {/* Dilution Output */}
            {selectedCalcId === 'dilution' && (() => {
              const res = computeDilution();
              if (!res.isValid) {
                return (
                  <div className="mt-4 p-4 bg-rose-950/50 border border-rose-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-rose-300 font-semibold text-xs">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>Dilution Calculation Error</span>
                    </div>
                    <p className="text-xs text-rose-200 leading-relaxed">{res.error}</p>
                    <div className="pt-2 border-t border-rose-900/60 text-[11px] text-rose-300">
                      Standard formula: C1 × V1 = C2 × V2. Stock concentration C1 must be strictly higher than target concentration C2.
                    </div>
                  </div>
                );
              }
              return (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-xs text-slate-400">Volume of Stock Required (V1)</div>
                    <div className="text-3xl font-mono font-bold text-white mt-1">
                      {res.v1} <span className="text-sm font-sans text-slate-400 font-normal">{dilV2Unit}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Dilution Factor:</span>
                      <span className="font-mono text-cyan-400">{res.dilFactor}X</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Buffer / Diluent Volume:</span>
                      <span className="font-mono text-white">{res.bufferVol} {dilV2Unit}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                      Pipette <strong className="text-white">{res.v1} {dilV2Unit}</strong> of stock and add <strong className="text-white">{res.bufferVol} {dilV2Unit}</strong> of buffer to reach final volume of {dilV2} {dilV2Unit}.
                    </p>
                    <div className="mt-2 p-2.5 bg-slate-800/80 rounded border border-slate-700 text-[11px] font-mono text-cyan-300">
                      {res.formulaExplanation}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Percentage Output */}
            {selectedCalcId === 'percentage-solution' && (() => {
              const res = computePercentage();
              return (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-xs text-slate-400">Required Solute Amount</div>
                    <div className="text-3xl font-mono font-bold text-white mt-1">
                      {res.amount} <span className="text-sm font-sans text-slate-400 font-normal">{res.unit}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pt-3 border-t border-slate-800">
                    Dissolve {res.amount} {res.unit} in solvent and adjust final volume to {percVolume} mL.
                  </p>
                </div>
              );
            })()}

            {/* RPM to RCF Output */}
            {selectedCalcId === 'rpm-to-rcf' && (() => {
              const res = computeRcf();
              return (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-xs text-slate-400">Relative Centrifugal Force (RCF)</div>
                    <div className="text-3xl font-mono font-bold text-cyan-400 mt-1">
                      {res.rcf} <span className="text-sm font-sans text-slate-400 font-normal">× g</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 pt-3 border-t border-slate-800">
                    Rotor spinning at {rpmValue} RPM with {radiusValue} cm radius exerts {res.rcf} g-force on the pellet.
                  </div>
                </div>
              );
            })()}

            {/* DNA Output */}
            {selectedCalcId === 'dna-concentration' && (() => {
              const res = computeDna();
              return (
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-xs text-slate-400">Nucleic Acid Concentration</div>
                    <div className="text-3xl font-mono font-bold text-white mt-1">
                      {res.concUgMl} <span className="text-sm font-sans text-slate-400 font-normal">μg/mL</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5">
                      (= {res.concNgUl} ng/μL)
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">A260 / A280 Purity Ratio:</span>
                      <span className={`font-mono font-semibold ${res.isPurityGood ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {res.ratio}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-start gap-1.5 mt-1">
                      {res.isPurityGood ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <span>{res.purityComment}</span>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Protein Output */}
            {selectedCalcId === 'protein-concentration' && (() => {
              const res = computeProtein();
              return (
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="text-xs text-slate-400">Protein Mass Concentration</div>
                    <div className="text-3xl font-mono font-bold text-white mt-1">
                      {res.concMgMl} <span className="text-sm font-sans text-slate-400 font-normal">mg/mL</span>
                    </div>
                    <div className="text-xs font-mono text-cyan-400 mt-0.5">
                      Molarity: {res.concU_M} μM ({res.concMolar} M)
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 pt-3 border-t border-slate-800">
                    Calculated using standard 1.0 cm pathlength quartz cuvette.
                  </p>
                </div>
              );
            })()}

            {/* Oligo Output */}
            {selectedCalcId === 'molecular-weight' && (() => {
              const res = computeOligo();
              return (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs text-slate-400">Total Length</div>
                      <div className="text-2xl font-mono font-bold text-white">{res.length} nt</div>
                      {res.nCount > 0 && (
                        <div className="text-[10px] text-amber-400 font-mono mt-0.5">
                          ({res.definitiveBases} canonical + {res.nCount} ambiguous N)
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Canonical GC Content</div>
                      <div className="text-2xl font-mono font-bold text-cyan-400">{res.gcPercent} %</div>
                    </div>
                  </div>

                  {res.hasAmbiguity && (
                    <div className="p-3 bg-amber-950/60 border border-amber-800 rounded-lg text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-amber-300 font-semibold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Ambiguous Nucleotide Warning (N Detected)</span>
                      </div>
                      <p className="text-[11px] text-amber-200/90 leading-relaxed">
                        Sequence contains {res.nCount} ambiguous base(s) (N). Because N represents any nucleotide (A/C/G/T), exact molecular weight and Tm cannot be definitively fixed. Estimated ranges are provided below based on pyrimidine (C: 289 Da) to purine (G: 329 Da) and A/T (2°C) to G/C (4°C) substitutions.
                      </p>
                      <div className="pt-1 text-[11px] text-amber-100 font-mono">
                        <div>Tm Range: {res.minTm} °C to {res.maxTm} °C</div>
                        <div>MW Range: {res.minMW} to {res.maxMW} Da</div>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimated Wallace Tm:</span>
                      <span className="font-mono text-white font-semibold">
                        {res.hasAmbiguity ? `${res.minTm} – ${res.maxTm}` : res.tmWallace} °C
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Single-Strand MW:</span>
                      <span className="font-mono text-white font-semibold">
                        {res.hasAmbiguity ? `${res.minMW} – ${res.maxMW}` : res.mw} Da (g/mol)
                      </span>
                    </div>
                  </div>

                  {/* Wallace Rule Limitations Disclaimer */}
                  <div className="mt-3 p-3 bg-slate-800/80 rounded-lg border border-slate-700/80 text-[11px] text-slate-300 leading-relaxed space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
                      <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Thermodynamic Heuristic Limitations:</span>
                    </div>
                    <p className="text-slate-400">
                      The Wallace rule (Tm = 2(A+T) + 4(G+C)) is an empirical rule of thumb valid strictly for short oligonucleotides (14–20 nt) in 1 M monovalent cation (Na⁺) buffer without mismatches.
                    </p>
                    <p className="text-slate-400">
                      For primers &gt;20 nt or real PCR buffers (50 mM K⁺, 1.5–2.5 mM Mg²⁺), nearest-neighbor thermodynamic calculations (SantaLucia 1998) must be employed. Actual PCR annealing temperature (Ta) is typically 3–5°C below thermodynamic Tm.
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* Buffer Prep Output */}
            {selectedCalcId === 'buffer-prep' && (() => {
              const res = computeBuffer();
              return (
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-xs text-slate-400">Base / Acid Molar Ratio [A⁻] / [HA]</div>
                    <div className="text-3xl font-mono font-bold text-white mt-1">
                      {res.ratio}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span>Conjugate Base [A⁻]:</span>
                      <span className="font-mono text-cyan-400 font-semibold">{res.aMinusMm} mM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weak Acid [HA]:</span>
                      <span className="font-mono text-white font-semibold">{res.haMm} mM</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Total Buffer Concentration:</span>
                      <span className="font-mono text-white">{buffTotalConc} mM</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
