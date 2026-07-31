import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Edit2, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { UserPreferences } from '../types';

interface SummaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onJumpToStep: (stepId: number) => void;
  onReset: () => void;
}

export const SummaryDrawer: React.FC<SummaryDrawerProps> = ({
  isOpen,
  onClose,
  preferences,
  onJumpToStep,
  onReset,
}) => {
  if (!isOpen) return null;

  const { hobbies, relax, drinks, cravings, shipping } = preferences;

  const sections = [
    { title: 'Hobbies & Activities', values: hobbies, stepId: 1 },
    { title: 'Relaxation', values: relax, stepId: 2 },
    { title: 'Favorite Drinks', values: drinks, stepId: 3 },
    { title: 'Food Cravings', values: cravings, stepId: 4 },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 text-zinc-100 h-full flex flex-col shadow-2xl"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <h3 className="text-lg font-serif text-white">Your Selections</h3>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {sections.map((sec) => (
              <div
                key={sec.title}
                className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-zinc-300">
                    {sec.title}
                  </span>
                  <button
                    onClick={() => {
                      onJumpToStep(sec.stepId);
                      onClose();
                    }}
                    type="button"
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>

                {sec.values.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sec.values.map((val) => (
                      <span
                        key={val}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white text-black font-medium"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500 italic">Not selected yet</p>
                )}
              </div>
            ))}

            {/* Shipping Summary preview if filled */}
            {shipping.name && (
              <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-zinc-300">
                    Shipping Details
                  </span>
                  <button
                    onClick={() => {
                      onJumpToStep(5);
                      onClose();
                    }}
                    type="button"
                    className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-xs text-white font-medium">{shipping.name}</p>
                <p className="text-xs text-zinc-400">{shipping.email}</p>
                <p className="text-xs text-zinc-400">{shipping.address}</p>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-zinc-800 flex items-center gap-3">
            <button
              onClick={onReset}
              type="button"
              className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium cursor-pointer transition-all flex items-center justify-center gap-1.5 border border-zinc-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Start Over
            </button>
            <button
              onClick={onClose}
              type="button"
              className="flex-1 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold cursor-pointer transition-all"
            >
              Close Drawer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
