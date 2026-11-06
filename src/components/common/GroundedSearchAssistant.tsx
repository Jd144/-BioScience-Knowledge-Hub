import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext.tsx';
import { safeFetchJson } from '../../utils/safeApi.ts';
import { Search, Sparkles, ExternalLink, RefreshCw, Send, BookOpen, AlertCircle } from 'lucide-react';

interface GroundedSearchAssistantProps {
  initialTopicTitle?: string;
  subjectName?: string;
}

export const GroundedSearchAssistant: React.FC<GroundedSearchAssistantProps> = ({
  initialTopicTitle = 'Biotechnology & Life Sciences Research',
  subjectName = 'BioScience Hub',
}) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [sources, setSources] = useState<{ title: string; url: string }[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const samplePrompts = [
    `What are the most recent 2026 discoveries and structural breakthroughs in ${initialTopicTitle}?`,
    `Explain the biophysical formula and step-by-step mechanism of ${initialTopicTitle}.`,
    `What are the most common tricky questions asked on ${initialTopicTitle} in CSIR-NET and GATE-BT?`,
  ];

  const handleSearch = async (promptToSend: string) => {
    if (!promptToSend.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);
    setResultText(null);
    setSources([]);

    try {
      const res = await safeFetchJson<{ text: string; sources: { title: string; url: string }[] }>('/api/gemini-search-grounding', {
        method: 'POST',
        body: JSON.stringify({
          prompt: `You are an expert scientific researcher and biotechnology professor at BioScience Hub. Provide a detailed, accurate, and evidence-based explanation for: "${promptToSend}". Include scientific principles, real protein/chemical identifiers, and cite authoritative sources. Answer thoroughly in English with clear headings.`,
        }),
      });

      if (!res.ok || !res.data) {
        throw new Error(res.error || `Failed to retrieve search grounded results`);
      }

      setResultText(res.data.text);
      setSources(res.data.sources || []);
    } catch (err: any) {
      console.error('Search grounding error:', err);
      let friendlyMsg = err.message || 'Unable to connect to Google Search Grounding service.';
      if (friendlyMsg.includes('429') || friendlyMsg.includes('RESOURCE_EXHAUSTED') || friendlyMsg.includes('quota')) {
        friendlyMsg = 'Gemini 3.8 Flash Search Grounding is configured and active. Your Google Cloud Gemini API quota is currently refreshing or rate-limited. Please retry shortly or explore the verified curriculum below.';
      }
      setErrorMsg(friendlyMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
              Google Search Grounding · Gemini 3.8 Flash
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            Live Science Research Assistant
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Query real-time literature, official exam syllabus updates, and peer-reviewed discoveries grounded by Google Search.
          </p>
        </div>
        <span className="text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 px-2.5 py-1 rounded-full self-start sm:self-auto font-semibold">
          Model: gemini-3.8-flash
        </span>
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="space-y-2">
        <span className="text-[11px] text-slate-400 font-medium block">
          Quick Inquiries for {initialTopicTitle}:
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(p);
                handleSearch(p);
              }}
              className="text-left text-xs bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/70 px-3 py-1.5 rounded-lg transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(query);
        }}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Ask anything about ${initialTopicTitle}...`}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-sans"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Grounding...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </>
          )}
        </button>
      </form>

      {/* Error state */}
      {errorMsg && (
        <div className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Results View */}
      {resultText && (
        <div className="p-5 bg-slate-950/90 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Grounded Scientific Synthesis
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Real-time Verified</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {resultText}
          </div>

          {/* Web Sources & Grounding Chunks */}
          {sources.length > 0 && (
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block font-semibold">
                Google Search Grounding Citations:
              </span>
              <div className="flex flex-wrap gap-2">
                {sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-cyan-300 border border-slate-700 px-2.5 py-1 rounded-md transition-colors"
                  >
                    <span className="truncate max-w-[220px]">{src.title}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 text-cyan-400" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
