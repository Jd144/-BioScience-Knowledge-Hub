import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { CAREER_GUIDANCE_ROADMAPS } from '../../data/researchCommunityData.ts';
import {
  Compass,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  Building2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const CareerGuidancePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedRoadmap, setSelectedRoadmap] = useState<string>(CAREER_GUIDANCE_ROADMAPS[0].id);

  const activeRoadmap = CAREER_GUIDANCE_ROADMAPS.find((r) => r.id === selectedRoadmap) || CAREER_GUIDANCE_ROADMAPS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Professional Trajectories & Skill Roadmaps
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Biotechnology Career Guidance & Roadmaps', 'Biotechnology Career Guidance aur Roadmaps')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Objective, realistic career paths for life sciences graduates. Discover concrete skill requirements, compensation benchmarks, month-by-month milestones, and top hiring institutions.',
            'B.Sc., M.Sc. aur B.Tech biotechnology students ke liye structured career roadmaps. Skills, expected salaries, hiring companies aur step-by-step preparation plan.'
          )}
        </p>
      </div>

      {/* Main Container: Selector on Left / Roadmap Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Roadmap Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Select Career Track
          </div>
          <div className="space-y-2">
            {CAREER_GUIDANCE_ROADMAPS.map((roadmap) => {
              const isSelected = roadmap.id === activeRoadmap.id;
              return (
                <button
                  key={roadmap.id}
                  onClick={() => setSelectedRoadmap(roadmap.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-cyan-300' : 'text-cyan-700'}`}>
                      {roadmap.domain}
                    </div>
                    <div className="text-xs sm:text-sm font-bold leading-snug">
                      {roadmap.title}
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Roadmap Details */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
            {/* Header info */}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">
                {activeRoadmap.domain}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {activeRoadmap.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {activeRoadmap.summary}
              </p>
            </div>

            {/* Compensation & Qualification Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Compensation Spectrum</span>
                </div>
                <div className="text-xs text-slate-600 font-mono pt-1">
                  {activeRoadmap.salaryRangeInsight}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                  <GraduationCap className="w-4 h-4 text-cyan-700" />
                  <span>Target Qualifications</span>
                </div>
                <div className="text-xs text-slate-600 pt-1">
                  {activeRoadmap.targetQualifications.join(', ')}
                </div>
              </div>
            </div>

            {/* Step-by-Step Milestones */}
            <div className="space-y-4 pt-2">
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-700">
                Actionable Milestone Roadmap
              </div>
              <div className="space-y-4">
                {activeRoadmap.keyMilestones.map((milestone, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                        {milestone.step}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed pl-8">
                      {milestone.description}
                    </p>

                    <div className="pl-8 pt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 mr-1">Skills:</span>
                      {milestone.recommendedSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Hiring Organizations */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Building2 className="w-4 h-4 text-slate-400" />
                <span>Premier Hiring Institutions & Enterprises</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {activeRoadmap.topHiringOrganizations.map((org, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-lg font-medium"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
