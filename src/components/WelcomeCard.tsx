import React from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, ArrowRight, ShieldCheck, Heart, Coffee, Utensils, Zap } from 'lucide-react';

interface WelcomeCardProps {
  onStart: () => void;
  onQuickFill: () => void;
  isDark?: boolean;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = ({ onStart, onQuickFill, isDark = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-10 relative overflow-hidden transition-colors ${
          isDark
            ? 'bg-zinc-900/50 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-zinc-100'
            : 'bg-white/75 border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-zinc-900'
        }`}
      >
        {/* Glass reflection glow */}
        <div
          className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-white/[0.04]' : 'bg-zinc-900/[0.03]'
          }`}
        />
        <div
          className={`absolute -bottom-10 -left-10 w-60 h-60 rounded-full blur-2xl pointer-events-none ${
            isDark ? 'bg-zinc-400/[0.03]' : 'bg-zinc-200/40'
          }`}
        />

        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md text-xs font-medium shadow-sm border ${
              isDark
                ? 'bg-white/[0.06] text-zinc-200 border-white/10'
                : 'bg-black/[0.05] text-zinc-800 border-black/10'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
            <span>Zero-Headache Conversational Gift Box Creation</span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1
              className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-zinc-900'
              }`}
            >
              Curate Your Custom Luxury Gift Box
            </h1>
            <p
              className={`text-sm sm:text-base max-w-lg mx-auto leading-relaxed ${
                isDark ? 'text-zinc-300' : 'text-zinc-600'
              }`}
            >
              Answer 4 effortless preference questions, provide shipping details, and unlock your custom gift box in under 60 seconds!
            </p>
          </div>

          {/* 3 Step Micro Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full py-4 text-left">
            <div
              className={`backdrop-blur-md border rounded-2xl p-4 flex flex-col justify-between transition-colors ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                  : 'bg-white/80 border-black/10 hover:bg-white shadow-sm'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs mb-3 shadow-sm ${
                  isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
                }`}
              >
                1
              </div>
              <div>
                <h4
                  className={`text-xs font-semibold ${
                    isDark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  Share Taste Preferences
                </h4>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Tea, coffee, snacks & activities
                </p>
              </div>
            </div>

            <div
              className={`backdrop-blur-md border rounded-2xl p-4 flex flex-col justify-between transition-colors ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                  : 'bg-white/80 border-black/10 hover:bg-white shadow-sm'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs mb-3 shadow-sm ${
                  isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
                }`}
              >
                2
              </div>
              <div>
                <h4
                  className={`text-xs font-semibold ${
                    isDark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  Easy Shipping Details
                </h4>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Name, address & date
                </p>
              </div>
            </div>

            <div
              className={`backdrop-blur-md border rounded-2xl p-4 flex flex-col justify-between transition-colors ${
                isDark
                  ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                  : 'bg-white/80 border-black/10 hover:bg-white shadow-sm'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs mb-3 shadow-sm ${
                  isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
                }`}
              >
                3
              </div>
              <div>
                <h4
                  className={`text-xs font-semibold ${
                    isDark ? 'text-zinc-100' : 'text-zinc-900'
                  }`}
                >
                  Unbox Custom Gift
                </h4>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  🎉Tada reveal & recommendation
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
            <button
              onClick={onStart}
              type="button"
              id="welcome-start-btn"
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white hover:bg-zinc-200 text-black'
                  : 'bg-zinc-900 hover:bg-black text-white'
              }`}
            >
              <span>Ok! I’m ready!</span>
              <ArrowRight
                className={`w-5 h-5 ${isDark ? 'text-black' : 'text-white'}`}
              />
            </button>

            <button
              onClick={onQuickFill}
              type="button"
              id="welcome-quick-fill-btn"
              className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700 hover:border-zinc-500'
                  : 'bg-white hover:bg-zinc-100 text-zinc-900 border-black/15 hover:border-black/30 shadow-sm'
              }`}
            >
              <Zap className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`} />
              <span>Instant Demo Auto-Fill</span>
            </button>
          </div>

          <div
            className={`flex items-center gap-4 text-xs pt-2 ${
              isDark ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            <span className="flex items-center gap-1">
              <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`} /> No credit card needed
            </span>
            <span className={isDark ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
            <span className="flex items-center gap-1">
              <Heart className={`w-4 h-4 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`} /> Jocelyn & Co. Guaranteed
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
