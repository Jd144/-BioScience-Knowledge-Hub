import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CheckCircle2, ArrowRight, ArrowLeft, User, GraduationCap, Target, Settings, Check } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { user, completeOnboarding } = useAuth();
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    state: user?.state || '',
    city: user?.city || '',
    educationLevel: 'B.Sc. Biotechnology',
    college: '',
    currentYear: '2nd Year',
    currentSemester: 'Semester 3',
    graduationYear: 2027,
    examGoals: ['GAT-B', 'CSIR-NET'] as string[],
    preferredLanguage: (user?.preferredLanguage || 'en') as 'en' | 'hinglish',
    learningGoals: ['Competitive examination preparation', 'Biotechnology concept building'] as string[],
  });

  useEffect(() => {
    if (user?.onboardingCompleted) {
      navigate('/dashboard');
    }
    if (user?.fullName && !formData.fullName) {
      setFormData((prev) => ({ ...prev, fullName: user.fullName }));
    }
  }, [user, navigate]);

  const toggleExamGoal = (exam: string) => {
    setFormData((prev) => {
      const exists = prev.examGoals.includes(exam);
      if (exists) {
        return { ...prev, examGoals: prev.examGoals.filter((e) => e !== exam) };
      } else {
        return { ...prev, examGoals: [...prev.examGoals, exam] };
      }
    });
  };

  const toggleLearningGoal = (goal: string) => {
    setFormData((prev) => {
      const exists = prev.learningGoals.includes(goal);
      if (exists) {
        return { ...prev, learningGoals: prev.learningGoals.filter((g) => g !== goal) };
      } else {
        return { ...prev, learningGoals: [...prev.learningGoals, goal] };
      }
    });
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    // Sync language preference in context
    setLanguage(formData.preferredLanguage);

    const success = await completeOnboarding({
      fullName: formData.fullName,
      state: formData.state,
      city: formData.city,
      educationLevel: formData.educationLevel,
      college: formData.college,
      currentYear: formData.currentYear,
      graduationYear: Number(formData.graduationYear),
      examGoals: formData.examGoals,
      learningGoals: formData.learningGoals,
      preferredLanguage: formData.preferredLanguage,
    });

    setLoading(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  const allowedExams = [
    { code: 'GAT-B', name: 'Graduate Aptitude Test - Biotechnology' },
    { code: 'DBT-JRF', name: 'DBT-JRF / Biotechnology Eligibility Test (BET)' },
    { code: 'GATE-BT', name: 'GATE Biotechnology' },
    { code: 'IIT-JAM', name: 'IIT JAM Biotechnology' },
    { code: 'CUET-PG', name: 'CUET-PG Life Sciences / Biotechnology' },
    { code: 'CSIR-NET', name: 'CSIR-NET Life Sciences (JRF & LS)' },
  ];

  const educationLevels = [
    'Class 12',
    'B.Sc.',
    'B.Sc. Biotechnology',
    'B.Sc. Life Sciences',
    'B.Tech Biotechnology',
    'M.Sc.',
    'Integrated Biotechnology',
    'Other',
  ];

  const learningGoalOptions = [
    'University examination preparation',
    'Competitive examination preparation',
    'Biotechnology concept building',
    'Research preparation',
    'Laboratory knowledge',
  ];

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Step Indicator Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Student Profile Onboarding</h1>
        <p className="text-xs text-slate-500 mt-1">
          Customize your examination syllabus mapping, language, and curriculum preferences.
        </p>

        {/* 5-Step Visual Progress Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                  step === s
                    ? 'bg-slate-900 text-white ring-4 ring-cyan-500/20'
                    : step > s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-600">
                {s === 1 && 'Personal'}
                {s === 2 && 'Education'}
                {s === 3 && 'Exams'}
                {s === 4 && 'Preferences'}
                {s === 5 && 'Confirm'}
              </span>
              {s < 5 && <div className="w-4 sm:w-8 h-0.5 bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* STEP 1: PERSONAL INFORMATION */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 1 — Personal Information</h2>
              <p className="text-xs text-slate-500">Enter your basic identification details.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Aditi Sharma"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">State / Union Territory</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="e.g. Maharashtra"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Pune"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EDUCATIONAL INFORMATION */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 2 — Educational Information</h2>
              <p className="text-xs text-slate-500">Provide your current academic degree program.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Education Level</label>
              <select
                value={formData.educationLevel}
                onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                {educationLevels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">College / University Name</label>
              <input
                type="text"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                placeholder="e.g. Delhi University / Savitribai Phule Pune University"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Current Year</label>
                <select
                  value={formData.currentYear}
                  onChange={(e) => setFormData({ ...formData, currentYear: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Current Semester</label>
                <input
                  type="text"
                  value={formData.currentSemester}
                  onChange={(e) => setFormData({ ...formData, currentSemester: e.target.value })}
                  placeholder="e.g. Sem 4"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Graduation Year</label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: EXAMINATION GOALS */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 3 — Competitive Examination Goals</h2>
              <p className="text-xs text-slate-500">
                Select the national examinations you are preparing for (strictly restricted to the 6 supported exams).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {allowedExams.map((exam) => {
                const isSelected = formData.examGoals.includes(exam.code);
                return (
                  <div
                    key={exam.code}
                    onClick={() => toggleExamGoal(exam.code)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-cyan-500"
                    />
                    <div>
                      <div className="text-xs font-mono font-bold tracking-tight">{exam.code}</div>
                      <div className={`text-[11px] leading-snug mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {exam.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: LEARNING PREFERENCES */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 4 — Learning Preferences</h2>
              <p className="text-xs text-slate-500">Set your primary language and study focus.</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Preferred Study Language</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setFormData({ ...formData, preferredLanguage: 'en' })}
                  className={`p-3.5 rounded-xl border cursor-pointer ${
                    formData.preferredLanguage === 'en'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">English (Standard Academic)</div>
                  <div className={`text-[11px] mt-1 ${formData.preferredLanguage === 'en' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Standard textbook terminology for international research and universities.
                  </div>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, preferredLanguage: 'hinglish' })}
                  className={`p-3.5 rounded-xl border cursor-pointer ${
                    formData.preferredLanguage === 'hinglish'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold">Hinglish (Roman Script)</div>
                  <div className={`text-[11px] mt-1 ${formData.preferredLanguage === 'hinglish' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Conversational Hindi-English in Latin script for rapid conceptual intuition.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">Primary Learning Goals</label>
              <div className="space-y-2">
                {learningGoalOptions.map((goal) => {
                  const isChecked = formData.learningGoals.includes(goal);
                  return (
                    <label
                      key={goal}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleLearningGoal(goal)}
                        className="rounded text-cyan-600 focus:ring-cyan-500"
                      />
                      <span>{goal}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: CONFIRMATION & SUMMARY */}
        {step === 5 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 5 — Information Confirmation</h2>
              <p className="text-xs text-slate-500">
                Please verify your profile summary. You can modify any details later from your student settings.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Full Name:</span>
                <span className="font-semibold text-slate-900">{formData.fullName || 'Not provided'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-900">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Education Program:</span>
                <span className="text-slate-900 font-medium">{formData.educationLevel} ({formData.currentYear})</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">College / Institution:</span>
                <span className="text-slate-900">{formData.college || 'Self-study'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Graduation Year:</span>
                <span className="font-mono text-slate-900">{formData.graduationYear}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Selected Exam Goals:</span>
                <span className="font-mono text-cyan-800 font-bold">
                  {formData.examGoals.length > 0 ? formData.examGoals.join(', ') : 'None selected'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Preferred Language:</span>
                <span className="font-semibold text-slate-900 uppercase">
                  {formData.preferredLanguage === 'hinglish' ? 'Roman Hinglish' : 'English'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-2 transition-colors"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              disabled={loading}
              onClick={handleFinalSubmit}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>{loading ? 'Saving Profile...' : 'Complete Onboarding & Enter Hub'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
