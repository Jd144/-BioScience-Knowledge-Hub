/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Mind-Break Mini Game 2: 3x3 Sliding Number Puzzle
 * Classical 1-8 sliding tile challenge.
 */

import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

export const NumberPuzzleGame: React.FC = () => {
  // Board: 3x3 array where 0 is empty tile
  const [board, setBoard] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 0]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  // Generate a solvable puzzle state
  const shuffleBoard = () => {
    let current = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    let emptyIdx = 8;
    // Perform 80 random valid moves to guarantee solvability
    for (let i = 0; i < 80; i++) {
      const validMoves: number[] = [];
      const row = Math.floor(emptyIdx / 3);
      const col = emptyIdx % 3;

      if (row > 0) validMoves.push(emptyIdx - 3); // Up
      if (row < 2) validMoves.push(emptyIdx + 3); // Down
      if (col > 0) validMoves.push(emptyIdx - 1); // Left
      if (col < 2) validMoves.push(emptyIdx + 1); // Right

      const chosen = validMoves[Math.floor(Math.random() * validMoves.length)];
      current[emptyIdx] = current[chosen];
      current[chosen] = 0;
      emptyIdx = chosen;
    }

    setBoard([...current]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    shuffleBoard();
  }, []);

  const handleTileClick = (index: number) => {
    if (board[index] === 0 || isWon) return;

    const emptyIdx = board.indexOf(0);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;

    // Check if adjacent (same row and col diff 1, or same col and row diff 1)
    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newBoard = [...board];
      newBoard[emptyIdx] = board[index];
      newBoard[index] = 0;
      setBoard(newBoard);
      setMoves((m) => m + 1);

      // Check win condition [1, 2, 3, 4, 5, 6, 7, 8, 0]
      const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0].every((val, i) => newBoard[i] === val);
      if (solved) {
        setIsWon(true);
      }
    }
  };

  return (
    <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 font-serif text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
            <span>🔢 Number Slide Puzzle</span>
          </h3>
          <p className="text-[11px] text-slate-500">Order tiles 1 through 8 in sequence</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono text-slate-600">Moves: <b>{moves}</b></span>
          <button
            onClick={shuffleBoard}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Reset Board"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isWon ? (
        <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <Trophy className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
          <h4 className="font-bold text-base text-emerald-900">Puzzle Solved! 🏆</h4>
          <p className="text-xs text-emerald-700">
            Great job! You arranged 1 through 8 in {moves} moves!
          </p>
          <button
            onClick={shuffleBoard}
            className="px-4 py-1.5 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs hover:bg-emerald-800 transition-colors"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-[240px] mx-auto select-none">
          {board.map((num, idx) => (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              className={`h-16 sm:h-18 rounded-xl font-bold font-mono text-lg sm:text-xl flex items-center justify-center transition-all ${
                num === 0
                  ? 'bg-slate-50 border border-dashed border-slate-200 cursor-default'
                  : 'bg-white hover:bg-cyan-50 border-2 border-slate-300 hover:border-cyan-500 text-slate-900 shadow-xs active:scale-95'
              }`}
            >
              {num !== 0 ? num : ''}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
