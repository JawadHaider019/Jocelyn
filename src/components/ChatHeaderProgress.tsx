import React from 'react';
import { ChevronLeft, Check, Sparkles, ListFilter } from 'lucide-react';

interface ChatHeaderProgressProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  onBack: () => void;
  canGoBack: boolean;
  onOpenSummary: () => void;
  completedStepsCount: number;
  isDark?: boolean;
}

export const ChatHeaderProgress: React.FC<ChatHeaderProgressProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  onBack,
  canGoBack,
  onOpenSummary,
  completedStepsCount,
  isDark = false,
}) => {
  // Excluding welcome (step 0) and reveal (step 6) from numerical question count
  const questionTotal = 5;
  const currentQuestionNum = Math.min(Math.max(currentStep, 1), 5);
  const percentage = Math.round((completedStepsCount / questionTotal) * 100);

  if (currentStep === 0 || currentStep === totalSteps - 1) {
    return null;
  }

  return (
    <div
      className={`w-full max-w-2xl mx-auto mb-2 backdrop-blur-xl border rounded-2xl p-4 transition-colors ${isDark
          ? 'bg-zinc-900/50 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-zinc-200'
          : 'bg-white/75 border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.05)] text-zinc-800'
        }`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        {/* Back button & Step info */}
        <div className="flex items-center gap-2.5">
          {canGoBack && (
            <button
              onClick={onBack}
              type="button"
              id="chat-progress-back-btn"
              className={`p-1.5 rounded-xl border backdrop-blur-md transition-all cursor-pointer ${isDark
                  ? 'bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white border-white/10'
                  : 'bg-black/5 hover:bg-black/10 text-zinc-700 hover:text-zinc-900 border-black/10'
                }`}
              aria-label="Go back to previous question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <div>
            <span
              className={`text-xs font-semibold uppercase tracking-wider block ${isDark ? 'text-zinc-300' : 'text-zinc-500'
                }`}
            >
              Step {currentQuestionNum} of {questionTotal}
            </span>
            <h2
              className={`text-sm font-medium leading-tight ${isDark ? 'text-white' : 'text-zinc-900 font-semibold'
                }`}
            >
              {stepTitle}
            </h2>
          </div>
        </div>

        {/* Right side: Time remaining tag & Summary button */}
        <div className="flex items-center gap-2">
          <span
            className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border backdrop-blur-md ${isDark
                ? 'bg-white/10 text-zinc-200 border-white/15'
                : 'bg-black/5 text-zinc-700 border-black/10'
              }`}
          >
            <Sparkles className={`w-3 h-3 ${isDark ? 'text-white' : 'text-zinc-800'}`} />
            <span>&lt; 30 sec left</span>
          </span>

          <button
            onClick={onOpenSummary}
            type="button"
            id="chat-progress-summary-btn"
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-xl border backdrop-blur-md cursor-pointer transition-all ${isDark
                ? 'bg-white/10 hover:bg-white/20 text-zinc-200 border-white/15'
                : 'bg-black/5 hover:bg-black/10 text-zinc-800 border-black/10'
              }`}
            title="View current answers"
          >
            <ListFilter className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
            <span className="hidden sm:inline font-semibold">Choices ({completedStepsCount})</span>
          </button>
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <div
        className={`w-full rounded-full h-2 overflow-hidden flex gap-1 p-0.5 border ${isDark ? 'bg-black/60 border-white/10' : 'bg-zinc-200/80 border-black/5'
          }`}
      >
        {Array.from({ length: questionTotal }).map((_, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < currentQuestionNum;
          const isCurrent = stepNum === currentQuestionNum;

          return (
            <div
              key={idx}
              className={`h-full flex-1 rounded-full transition-all duration-500 ${isDone
                  ? isDark
                    ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                    : 'bg-zinc-900 shadow-sm'
                  : isCurrent
                    ? isDark
                      ? 'bg-zinc-300 animate-pulse'
                      : 'bg-zinc-600 animate-pulse'
                    : isDark
                      ? 'bg-white/10'
                      : 'bg-zinc-300/50'
                }`}
            />
          );
        })}
      </div>
    </div>
  );
};
