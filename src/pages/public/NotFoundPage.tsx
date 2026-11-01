import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, BookOpen, Briefcase, GraduationCap } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 mx-auto">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <div className="text-xs uppercase font-mono tracking-wider font-bold text-cyan-800">
          404 — Knowledge Page Not Found
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          The requested page could not be located.
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          The scientific resource, examination portal, or opportunity listing you are looking for may have been updated, archived, or moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Hub Home</span>
        </Link>
        <Link
          to="/subjects"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
          <span>11 Core Subjects</span>
        </Link>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Briefcase className="w-3.5 h-3.5 text-blue-600" />
          <span>Biotech Jobs</span>
        </Link>
      </div>
    </div>
  );
};
