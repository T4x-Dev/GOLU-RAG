import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Flashcard } from '../types';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());

  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-12 text-slate-500">
        <p>No flashcards generated for this unit yet.</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const isMastered = masteredIds.has(currentCard.id);

  const toggleMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentCard.id)) next.delete(currentCard.id);
      else next.add(currentCard.id);
      return next;
    });
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Recall Mode</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100">
          Last-Minute Flashcard Drill
        </h2>
        <p className="text-xs text-slate-400">
          Click the card to reveal the exact university definition and formula.
        </p>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <span>Card {currentIndex + 1} of {flashcards.length}</span>
        <span>
          Mastered: <span className="font-bold text-emerald-400">{masteredIds.size}</span>/{flashcards.length}
        </span>
      </div>

      {/* Interactive 3D Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[300px] cursor-pointer perspective-1000 group"
      >
        <div
          className={`relative w-full min-h-[300px] rounded-2xl p-8 transition-transform duration-500 shadow-2xl flex flex-col justify-between border select-none ${
            isFlipped
              ? 'bg-slate-900 border-emerald-500/50 text-slate-100 shadow-emerald-500/10'
              : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-slate-200 shadow-blue-500/10'
          }`}
        >
          {/* Card Top Category & Status */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700">
              {currentCard.category || 'Core Concept'}
            </span>
            <button
              onClick={toggleMastered}
              className={`text-xs px-2.5 py-1 rounded-full font-semibold border flex items-center gap-1 transition-all ${
                isMastered
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-400' : ''}`} />
              <span>{isMastered ? 'Mastered' : 'Mark as Known'}</span>
            </button>
          </div>

          {/* Card Center Content */}
          <div className="my-auto text-center py-6">
            {!isFlipped ? (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 uppercase tracking-widest block font-mono">
                  QUESTION / PROMPT
                </span>
                <p className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                  {currentCard.front}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <span className="text-xs text-emerald-400 uppercase tracking-widest block font-mono">
                  ANSWER / DEFINITION
                </span>
                <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed whitespace-pre-wrap">
                  {currentCard.back}
                </p>
              </div>
            )}
          </div>

          {/* Card Bottom Hint */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Click card to {isFlipped ? 'flip back to question' : 'reveal answer'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="Previous Card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs text-slate-400 font-mono">
          Use ← and → to navigate
        </span>
        <button
          onClick={handleNext}
          className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
          title="Next Card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
