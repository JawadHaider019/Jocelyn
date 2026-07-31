import React from 'react';
import { Sparkles, RefreshCw, Mail, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  currentStep: number;
  totalSteps: number;
  onReset: () => void;
  onQuickFill: () => void;
  onOpenSupport: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  totalSteps,
  onReset,
  onQuickFill,
  onOpenSupport,
  isDark,
  onToggleTheme,
}) => {
  const isComplete = currentStep >= totalSteps - 1;

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-xl border-b py-3.5 px-4 sm:px-6 transition-colors ${isDark
        ? 'bg-black/75 border-white/10 text-zinc-100'
        : 'bg-white/75 border-black/10 text-zinc-900'
        }`}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center cursor-pointer group" onClick={onReset}>
          <img
            src="/JCo new logo.avif"
            alt="JCo Logo"
            className="w-auto h-10 " />
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-semibold text-lg tracking-tight font-serif ${isDark ? 'text-white' : 'text-zinc-900'
                  }`}
              >
                Jocelyn & Co.
              </span>

            </div>
            <p className={`text-xs font-sans ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Effortless Preference & Gift Curation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">

          {/* Light / Dark Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            type="button"
            id="header-theme-toggle-btn"
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${isDark
              ? 'bg-white/[0.07] hover:bg-white/15 text-zinc-200 border-white/10'
              : 'bg-black/[0.05] hover:bg-black/10 text-zinc-800 border-black/10'
              }`}
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )}
            <span className="hidden md:inline">{isDark ? 'Dark' : 'Light'}</span>
          </button>

          <button
            onClick={onOpenSupport}
            type="button"
            id="header-support-btn"
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${isDark
              ? 'bg-white/[0.07] hover:bg-white/15 text-zinc-300 hover:text-white border-white/10'
              : 'bg-black/[0.05] hover:bg-black/10 text-zinc-700 hover:text-zinc-900 border-black/10'
              }`}
          >
            <Mail className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span className="hidden sm:inline">Support</span>
          </button>

          <button
            onClick={onReset}
            type="button"
            id="header-reset-btn"
            className={`p-1.5 rounded-xl backdrop-blur-md transition-all cursor-pointer border ${isDark
              ? 'bg-white/[0.07] hover:bg-white/15 text-zinc-400 hover:text-zinc-200 border-white/10'
              : 'bg-black/[0.05] hover:bg-black/10 text-zinc-600 hover:text-zinc-900 border-black/10'
              }`}
            title="Start Over"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
