import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Sparkles, MessageSquare, Plus } from 'lucide-react';
import { QuestionStep, OptionItem } from '../types';

interface QuestionCardProps {
  step: QuestionStep;
  selectedValues: string[];
  onToggleOption: (value: string) => void;
  onNext: () => void;
  recipientName?: string;
  isDark?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  step,
  selectedValues,
  onToggleOption,
  onNext,
  recipientName = 'Ahmad',
  isDark = false,
}) => {
  const [customNote, setCustomNote] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Replace bot message placeholders if needed
  const formattedBotMessage = step.botMessage.replace('Thanks, that’s perfect', `Thanks ${recipientName || 'friend'}, that’s perfect`);

  const handleSelect = (label: string) => {
    onToggleOption(label);
  };

  const isMulti = step.type === 'multi-select';
  const hasSelections = selectedValues.length > 0;

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Bot Chat Bubble Frame */}
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-colors ${
          isDark
            ? 'bg-zinc-900/50 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-zinc-100'
            : 'bg-white/75 border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-zinc-900'
        }`}
      >
        {/* Decorative Glass Background Accent */}
        <div
          className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-white/[0.04]' : 'bg-zinc-900/[0.03]'
          }`}
        />
        <div
          className={`absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-2xl pointer-events-none ${
            isDark ? 'bg-zinc-300/[0.02]' : 'bg-zinc-200/30'
          }`}
        />

        {/* Bot Message Header */}
        <div className="flex items-start gap-3.5 mb-6">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-md flex-shrink-0 ${
              isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${isDark ? 'text-black' : 'text-white'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${
                  isDark ? 'text-zinc-300' : 'text-zinc-500'
                }`}
              >
                Jocelyn Gift AI Assistant
              </span>
              <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Just now
              </span>
            </div>
            <p
              className={`text-lg sm:text-xl font-serif leading-snug ${
                isDark ? 'text-white' : 'text-zinc-900 font-medium'
              }`}
            >
              {formattedBotMessage}
            </p>
            {isMulti && (
              <p
                className={`text-xs mt-1 flex items-center gap-1.5 font-sans ${
                  isDark ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block ${
                    isDark ? 'bg-white' : 'bg-zinc-900'
                  }`}
                />
                Select as many as you like! (Tap to select)
              </p>
            )}
          </div>
        </div>

        {/* Options Grid */}
        {step.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
            {step.options.map((opt: OptionItem) => {
              const isSelected = selectedValues.includes(opt.label);

              return (
                <button
                  key={opt.id}
                  type="button"
                  id={`option-${opt.id}`}
                  onClick={() => handleSelect(opt.label)}
                  className={`group relative text-left p-4 rounded-2xl border backdrop-blur-md transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? isDark
                        ? 'bg-white border-white text-black shadow-[0_4px_20px_0_rgba(255,255,255,0.2)] scale-[1.01]'
                        : 'bg-zinc-900 border-zinc-900 text-white shadow-md font-semibold scale-[1.01]'
                      : isDark
                      ? 'bg-white/[0.04] hover:bg-white/[0.09] border-white/10 hover:border-white/25 text-zinc-200'
                      : 'bg-white/70 hover:bg-white border-black/10 hover:border-black/30 text-zinc-800 hover:text-black shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs transition-all ${
                        isSelected
                          ? isDark
                            ? 'bg-black text-white font-bold shadow-sm scale-105'
                            : 'bg-white text-zinc-900 font-bold shadow-sm scale-105'
                          : isDark
                          ? 'bg-white/10 backdrop-blur-sm text-zinc-400 group-hover:bg-white/20 group-hover:text-zinc-200'
                          : 'bg-black/5 text-zinc-500 group-hover:bg-black/10 group-hover:text-zinc-900'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isDark ? 'bg-zinc-500' : 'bg-zinc-400'
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <span
                        className={`font-medium text-sm sm:text-base block transition-colors ${
                          isSelected
                            ? isDark
                              ? 'text-black'
                              : 'text-white'
                            : isDark
                            ? 'group-hover:text-white'
                            : 'group-hover:text-black'
                        }`}
                      >
                        {opt.label}
                      </span>
                      {opt.description && (
                        <span
                          className={`text-xs block mt-0.5 ${
                            isSelected
                              ? isDark
                                ? 'text-zinc-700'
                                : 'text-zinc-300'
                              : isDark
                              ? 'text-zinc-400 group-hover:text-zinc-300'
                              : 'text-zinc-500 group-hover:text-zinc-700'
                          }`}
                        >
                          {opt.description}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Optional Custom Preference Note toggle */}
        <div
          className={`pt-2 border-t mt-6 flex flex-col gap-3 ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          {!showCustomInput ? (
            <button
              onClick={() => setShowCustomInput(true)}
              type="button"
              id="add-custom-note-btn"
              className={`text-xs flex items-center gap-1.5 self-start cursor-pointer hover:underline py-1 ${
                isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Have a specific favorite item or detail? Add a quick note</span>
            </button>
          ) : (
            <div className="space-y-2">
              <label
                className={`text-xs font-medium flex items-center gap-1.5 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                <MessageSquare
                  className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`}
                />
                <span>Custom detail for this question (Optional):</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g. Mild spice only, organic preferred..."
                  className={`flex-1 backdrop-blur-md rounded-xl px-3.5 py-2 text-sm focus:outline-none ${
                    isDark
                      ? 'bg-white/[0.05] border border-white/15 text-white placeholder-zinc-500 focus:border-white'
                      : 'bg-white border border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customNote.trim() && !selectedValues.includes(customNote.trim())) {
                      onToggleOption(customNote.trim());
                      setCustomNote('');
                    }
                  }}
                  className={`px-3 py-2 font-medium text-xs rounded-xl cursor-pointer transition-colors ${
                    isDark
                      ? 'bg-white hover:bg-zinc-200 text-black'
                      : 'bg-zinc-900 hover:bg-black text-white'
                  }`}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Action Button */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {hasSelections ? (
              <span className={`font-medium ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {selectedValues.length} item{selectedValues.length > 1 ? 's' : ''} selected
              </span>
            ) : (
              <span>Select an option above to proceed</span>
            )}
          </div>

          <button
            onClick={onNext}
            disabled={!hasSelections}
            type="button"
            id={`question-next-btn-${step.id}`}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 cursor-pointer shadow-lg ${
              hasSelections
                ? isDark
                  ? 'bg-white hover:bg-zinc-200 text-black hover:scale-[1.02]'
                  : 'bg-zinc-900 hover:bg-black text-white hover:scale-[1.02]'
                : isDark
                ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
                : 'bg-zinc-200 text-zinc-400 cursor-not-allowed border border-zinc-300'
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
