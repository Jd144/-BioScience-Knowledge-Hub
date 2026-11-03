/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Mind-Break Mini Game 4: Biotech Word Scramble
 * Unscramble foundational biology & biotechnology vocabulary.
 */

import React, { useState, useEffect } from 'react';
import { RotateCcw, HelpCircle, CheckCircle, Sparkles } from 'lucide-react';

interface WordItem {
  word: string;
  hint: string;
}

const BIOTECH_WORDS: WordItem[] = [
  { word: 'CRISPR', hint: 'Clustered Regularly Interspaced Short Palindromic Repeats for gene editing' },
  { word: 'ENZYME', hint: 'Biological protein catalyst speeding up biochemical reactions' },
  { word: 'PLASMID', hint: 'Circular extrachromosomal DNA molecule commonly used as cloning vector' },
  { word: 'GENOME', hint: 'Complete set of genetic information encoded within an organism' },
  { word: 'RIBOSOME', hint: 'Cellular ribonucleoprotein complex responsible for protein translation' },
  { word: 'PCR', hint: 'Polymerase Chain Reaction technique for amplifying specific DNA targets' },
  { word: 'TELOMERE', hint: 'Repetitive nucleotide sequences capping chromosome terminal ends' },
  { word: 'CODONS', hint: 'Triplets of mRNA nucleotides that specify amino acid residues' },
  { word: 'ANTIBODY', hint: 'Immunoglobulin protein that binds specific foreign antigens' },
  { word: 'BLOTTING', hint: 'Analytical molecular technique: Southern, Northern, or Western' },
];

function scramble(word: string): string {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const result = arr.join('');
  return result === word && word.length > 2 ? scramble(word) : result;
}

export const WordScrambleGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  const currentItem = BIOTECH_WORDS[currentIndex];

  const loadWord = (idx: number) => {
    const item = BIOTECH_WORDS[idx];
    setScrambled(scramble(item.word));
    setGuess('');
    setShowHint(false);
    setFeedback(null);
  };

  useEffect(() => {
    loadWord(0);
  }, []);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;

    if (guess.trim().toUpperCase() === currentItem.word.toUpperCase()) {
      setFeedback('correct');
      setScore((s) => s + 1);
      setTimeout(() => {
        const next = (currentIndex + 1) % BIOTECH_WORDS.length;
        setCurrentIndex(next);
        loadWord(next);
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const skipWord = () => {
    const next = (currentIndex + 1) % BIOTECH_WORDS.length;
    setCurrentIndex(next);
    loadWord(next);
  };

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 font-serif text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
            <span>🧬 Biotech Word Scramble</span>
          </h3>
          <p className="text-[11px] text-slate-500">Unscramble key molecular biology terms</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-cyan-700 font-bold">Solved: {score}</span>
          <button
            onClick={skipWord}
            className="text-slate-500 hover:text-slate-900 text-xs font-semibold hover:underline"
          >
            Skip Word →
          </button>
        </div>
      </div>

      <div className="space-y-4 max-w-sm mx-auto text-center">
        {/* Scrambled Letters Card */}
        <div className="py-4 px-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-1">
            Scrambled Word ({currentItem.word.length} letters)
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold tracking-widest text-slate-900 select-all">
            {scrambled}
          </div>
        </div>

        {/* Hint Section */}
        <div className="text-xs">
          {showHint ? (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed animate-in fade-in">
              <b>Hint:</b> {currentItem.hint}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-cyan-700"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Show Academic Clue</span>
            </button>
          )}
        </div>

        {/* Guess Input Form */}
        <form onSubmit={handleCheck} className="space-y-2.5">
          <div className="relative">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value.toUpperCase())}
              placeholder="Type your answer..."
              className={`w-full px-4 py-2.5 rounded-xl border-2 text-center text-base font-mono font-bold uppercase tracking-widest outline-none transition-all ${
                feedback === 'correct'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                  : feedback === 'wrong'
                  ? 'border-rose-400 bg-rose-50 text-rose-900'
                  : 'border-slate-300 focus:border-cyan-600 bg-white text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs shadow-xs transition-colors"
          >
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  );
};
