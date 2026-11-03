/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Mind-Break Mini Game 1: Memory Match Cards
 * Light, clean in-browser biotech emoji matching game.
 */

import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJI_PAIRS = ['🧬', '🔬', '🧪', '🦠', '🌿', '🧫', '🧮', '💊'];

export const MemoryMatchGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    const deck: Card[] = [...EMOJI_PAIRS, ...EMOJI_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (
      flippedIndices.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) {
      return;
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].emoji === cards[secondIdx].emoji) {
        // Matched
        setTimeout(() => {
          setCards((prev) => {
            const copy = [...prev];
            copy[firstIdx].isMatched = true;
            copy[secondIdx].isMatched = true;
            return copy;
          });
          setMatches((m) => {
            const next = m + 1;
            if (next === EMOJI_PAIRS.length) setIsWon(true);
            return next;
          });
          setFlippedIndices([]);
        }, 400);
      } else {
        // Not matched
        setTimeout(() => {
          setCards((prev) => {
            const copy = [...prev];
            copy[firstIdx].isFlipped = false;
            copy[secondIdx].isFlipped = false;
            return copy;
          });
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 font-serif text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
            <span>🃏 Memory Match</span>
          </h3>
          <p className="text-[11px] text-slate-500">Find all 8 scientific pairs</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-slate-600">Moves: <b>{moves}</b></span>
          <span className="font-mono text-cyan-700">Matched: <b>{matches}/8</b></span>
          <button
            onClick={initGame}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isWon ? (
        <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <Trophy className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
          <h4 className="font-bold text-base text-emerald-900">Brilliant Memory! 🎉</h4>
          <p className="text-xs text-emerald-700">
            You matched all science cards in {moves} moves!
          </p>
          <button
            onClick={initGame}
            className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs hover:bg-emerald-800 transition-colors"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-sm mx-auto">
          {cards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-14 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all font-mono select-none ${
                card.isMatched
                  ? 'bg-emerald-50 border-2 border-emerald-400 opacity-90'
                  : card.isFlipped
                  ? 'bg-cyan-50 border-2 border-cyan-500 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 shadow-2xs'
              }`}
            >
              {card.isFlipped || card.isMatched ? card.emoji : '🔬'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
