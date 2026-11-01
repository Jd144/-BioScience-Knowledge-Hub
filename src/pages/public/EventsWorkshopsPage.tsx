import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { SCIENTIFIC_EVENTS_WORKSHOPS } from '../../data/researchCommunityData.ts';
import {
  CalendarDays,
  Search,
  MapPin,
  Building,
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const EventsWorkshopsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const types = ['All', 'Hands-on Workshop', 'International Symposium', 'Scientific Award'];

  const filteredEvents = SCIENTIFIC_EVENTS_WORKSHOPS.filter((item) => {
    const matchesType = selectedType === 'All' || item.eventType === selectedType;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.organizer.toLowerCase().includes(q) ||
      item.venueCity.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
          Academic Gatherings & Skill Intensives
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('Conferences, Hands-on Workshops & Awards', 'Conferences, Hands-on Workshops aur Awards')}
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {t(
            'Verified calendar of premier national symposia (NGBT Genomics), wet-lab hands-on workshops (CRISPR-Cas9 at inStem, Bioreactors at ICT Mumbai), and distinguished scientific honors.',
            'Premier national conferences, practical wet-lab training workshops aur prestigious scientific awards ke schedule aur registration portals.'
          )}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search events, workshops, or host cities...', 'Event, workshop ya city search karein...')}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
          />
        </div>

        {/* Type Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                selectedType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>Showing {filteredEvents.length} upcoming events & calls</span>
          <span>Verified schedules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-xs transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {event.eventType}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Event
                  </span>
                </div>

                <h2 className="text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {event.title}
                </h2>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{event.organizer}</span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                    {event.dates}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {event.venueCity} ({event.mode})
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Registration Deadline</div>
                  <div className="text-xs font-semibold text-rose-600">
                    {event.registrationDeadline}
                  </div>
                </div>

                <a
                  href={event.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
                >
                  <span>Official Registration</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
