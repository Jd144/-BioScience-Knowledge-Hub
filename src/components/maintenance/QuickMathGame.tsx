/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Mind-Break Mini Game 3: Quick Math Streak
 * Timed arithmetic questions to sharpen mental focus.
 */

import React, { useState, useEffect } from 'react';
import { RotateCcw, Zap, Flame } from 'lucide-react';

interface Question {
  text: string;
  answer: number;
  options: number[];
}

export const QuickMathGame: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const generateQuestion = (): Question => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    let answer = 0;

    if (op === '+') answer = a + b;
    else if (op === '-') {
      // Keep positive
      if (a < b) [a, b] = [b, a];
      answer = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 9) + 2;
      answer = a * b;
    }

    const wrongOptions = new Set<number>();
    while (wrongOptions.size < 3) {
      const delta = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
      const val = answer + delta;
      if (val !== answer && val >= 0) {
        wrongOptions.add(val);
      }
    }

    const options = [answer, ...Array.from(wrongOptions)].sort(() => Math.random() - 0.5);

    return {
      text: `${a} ${op} ${b}`,
      answer,
      options,
    };
  };

  const nextRound = () => {
    setQuestion(generateQuestion());
    setFeedback(null);
  };

  useEffect(() => {
    nextRound();
  }, []);

  const handleSelectOption = (choice: number) => {
    if (!question || feedback) return;

    if (choice === question.answer) {
      setFeedback('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setTimeout(nextRound, 600);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setStreak(0);
        nextRound();
      }, 900);
    }
  };

  const resetGame = () => {
    setStreak(0);
    nextRound();
  };

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 font-serif text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
            <span>⚡ Quick Math Challenge</span>
          </h3>
          <p className="text-[11px] text-slate-500">Pick the right calculation as fast as you can</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 font-mono text-amber-700 font-bold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Streak: {streak}
          </span>
          <span className="font-mono text-slate-400">Best: {bestStreak}</span>
          <button
            onClick={resetGame}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {question && (
        <div className="space-y-4 max-w-sm mx-auto text-center">
          <div
            className={`py-6 px-4 rounded-2xl border transition-all ${
              feedback === 'correct'
                ? 'bg-emerald-50 border-emerald-400 text-emerald-900 scale-105'
                : feedback === 'wrong'
                ? 'bg-rose-50 border-rose-400 text-rose-900'
                : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
          >
            <div className="text-3xl font-mono font-extrabold tracking-wider">
              {question.text} = ?
            </div>
            {feedback && (
              <div className="text-xs font-bold mt-2 font-mono">
                {feedback === 'correct' ? 'Correct! 🎯 +1 streak' : `Oops! Answer was ${question.answer}`}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {question.options.map((opt, i) => (
              <button
                key={i}
                disabled={feedback !== null}
                onClick={() => handleSelectOption(opt)}
                className="py-3 px-4 rounded-xl bg-white hover:bg-cyan-50 border-2 border-slate-200 hover:border-cyan-500 text-slate-900 font-mono font-bold text-lg shadow-xs active:scale-95 transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
