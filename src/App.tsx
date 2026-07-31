import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { ChatHeaderProgress } from './components/ChatHeaderProgress';
import { WelcomeCard } from './components/WelcomeCard';
import { QuestionCard } from './components/QuestionCard';
import { ShippingFormCard } from './components/ShippingFormCard';
import { UnboxingReveal } from './components/UnboxingReveal';
import { SummaryDrawer } from './components/SummaryDrawer';
import { SupportModal } from './components/SupportModal';

import { QUESTION_STEPS, INITIAL_SHIPPING, GIFT_CATALOG } from './data/questions';
import { UserPreferences, ShippingDetails, GiftBoxItem } from './types';
import { Sparkles, Gift } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    hobbies: ['Fitness 🏃🏽', 'Gaming 🎮'],
    relax: ['Sleep & Rest 💤'],
    drinks: ['Green Tea 🍵', 'Chai Tea ☕'],
    cravings: ['Sweets 🍫 🍪', 'Savory Snacks & Spreads 🧀🌿', 'Pizza & Pasta 🍕🍝'],
    shipping: INITIAL_SHIPPING,
  });

  const [aiGiftData, setAiGiftData] = useState<any>(null);
  const [isCuratingLoading, setIsCuratingLoading] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const currentStep = QUESTION_STEPS[currentStepIndex];

  // Helper to toggle options in multi-select or single-select steps
  const handleToggleOption = (label: string) => {
    if (
      currentStep.key === 'hobbies' ||
      currentStep.key === 'drinks' ||
      currentStep.key === 'cravings' ||
      currentStep.key === 'relax'
    ) {
      const currentList = (preferences[currentStep.key] as string[]) || [];
      const exists = currentList.includes(label);
      const updated = exists
        ? currentList.filter((item) => item !== label)
        : [...currentList, label];

      setPreferences((prev) => ({
        ...prev,
        [currentStep.key]: updated,
      }));
    }
  };

  // Instant Quick Demo Fill matching prompt's exact scenario
  const handleQuickFillDemo = () => {
    setPreferences({
      hobbies: ['Fitness 🏃🏽', 'Gaming 🎮'],
      relax: ['Sleep & Rest 💤'],
      drinks: ['Green Tea 🍵', 'Chai Tea ☕'],
      cravings: ['Sweets 🍫 🍪', 'Savory Snacks & Spreads 🧀🌿', 'Pizza & Pasta 🍕🍝'],
      shipping: INITIAL_SHIPPING,
    });
    // Jump to shipping form (Step 5) so user can immediately see the form prefilled
    setCurrentStepIndex(5);
  };

  // Reset whole flow
  const handleReset = () => {
    setPreferences({
      hobbies: [],
      relax: [],
      drinks: [],
      cravings: [],
      shipping: {
        name: '',
        email: '',
        allergies: 'no',
        phoneCountry: 'United States',
        phoneCode: '+1',
        phone: '',
        shipDate: '7/29/2026',
        address: '',
        birthdayMonth: '07',
        birthdayDay: '29',
      },
    });
    setAiGiftData(null);
    setCurrentStepIndex(0);
  };

  // Submit shipping form and fetch gift curation API
  const handleShippingSubmit = async () => {
    setIsCuratingLoading(true);
    setCurrentStepIndex(6); // Step 6 is reveal

    try {
      const res = await fetch('/api/curate-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hobbies: preferences.hobbies,
          relax: preferences.relax,
          drinks: preferences.drinks,
          cravings: preferences.cravings,
          name: preferences.shipping.name || 'Ahmad test',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setAiGiftData(data.gift);
      }
    } catch (err) {
      console.error('Curate gift API error:', err);
    } finally {
      setIsCuratingLoading(false);
    }
  };

  // Calculate selected count for header progress
  const completedStepsCount = [
    preferences.hobbies.length > 0,
    preferences.relax.length > 0,
    preferences.drinks.length > 0,
    preferences.cravings.length > 0,
    Boolean(preferences.shipping.name && preferences.shipping.email),
  ].filter(Boolean).length;

  // Build curated gift item (only 1 product shown at the end)
  const getCuratedItems = (): GiftBoxItem[] => {
    const items: GiftBoxItem[] = [];
    const allText = [
      ...preferences.drinks,
      ...preferences.cravings,
      ...preferences.hobbies,
      ...preferences.relax,
    ].join(' ').toLowerCase();

    if (allText.includes('green tea')) items.push(GIFT_CATALOG.green_tea);
    if (allText.includes('chai tea')) items.push(GIFT_CATALOG.chai_tea);
    if (allText.includes('sweets')) items.push(GIFT_CATALOG.sweets);
    if (allText.includes('savory')) items.push(GIFT_CATALOG.savory);
    if (allText.includes('pizza') || allText.includes('pasta')) items.push(GIFT_CATALOG.pizza_pasta);
    if (allText.includes('fitness')) items.push(GIFT_CATALOG.fitness);
    if (allText.includes('gaming')) items.push(GIFT_CATALOG.gaming);
    if (allText.includes('sleep')) items.push(GIFT_CATALOG.sleep);

    if (items.length === 0) {
      items.push(GIFT_CATALOG.chai_tea);
    }

    // Return only 1 product at the end
    return items.slice(0, 1);
  };

  return (
    <div
      className={`min-h-screen font-sans flex flex-col antialiased transition-colors duration-300 relative ${isDark
          ? 'bg-black text-zinc-100 selection:bg-white selection:text-black'
          : 'bg-zinc-50 text-zinc-900 selection:bg-zinc-900 selection:text-white'
        }`}
    >
      {/* Background Soft Glass Glow Orbs */}
      <div
        className={`fixed top-1/4 left-10 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-opacity ${isDark ? 'bg-white/[0.02]' : 'bg-zinc-300/40'
          }`}
      />
      <div
        className={`fixed bottom-10 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-opacity ${isDark ? 'bg-zinc-700/[0.04]' : 'bg-zinc-200/60'
          }`}
      />

      {/* App Header */}
      <Header
        currentStep={currentStepIndex}
        totalSteps={QUESTION_STEPS.length}
        onReset={handleReset}
        onQuickFill={handleQuickFillDemo}
        onOpenSupport={() => setIsSupportOpen(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col justify-center relative z-10">
        {/* Progress Header */}
        <ChatHeaderProgress
          currentStep={currentStepIndex}
          totalSteps={QUESTION_STEPS.length}
          stepTitle={currentStep.title}
          onBack={() => setCurrentStepIndex((prev) => Math.max(prev - 1, 0))}
          canGoBack={currentStepIndex > 0}
          onOpenSummary={() => setIsSummaryOpen(true)}
          completedStepsCount={completedStepsCount}
          isDark={isDark}
        />

        {/* Step Views Transition */}
        <AnimatePresence mode="wait">
          {currentStepIndex === 0 && (
            <WelcomeCard
              key="welcome"
              onStart={() => setCurrentStepIndex(1)}
              onQuickFill={handleQuickFillDemo}
              isDark={isDark}
            />
          )}

          {currentStepIndex >= 1 && currentStepIndex <= 4 && (
            <QuestionCard
              key={`question-${currentStepIndex}`}
              step={currentStep}
              selectedValues={
                (preferences[currentStep.key as keyof Omit<UserPreferences, 'shipping'>] as string[]) || []
              }
              onToggleOption={handleToggleOption}
              onNext={() => setCurrentStepIndex((prev) => prev + 1)}
              recipientName={preferences.shipping.name}
              isDark={isDark}
            />
          )}

          {currentStepIndex === 5 && (
            <ShippingFormCard
              key="shipping-form"
              shipping={preferences.shipping}
              onChange={(updated) => setPreferences((prev) => ({ ...prev, shipping: updated }))}
              onSubmit={handleShippingSubmit}
              onQuickFill={handleQuickFillDemo}
              recipientName={preferences.shipping.name}
              isDark={isDark}
            />
          )}

          {currentStepIndex === 6 && (
            <div>
              {isCuratingLoading ? (
                <div className="text-center py-20 space-y-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto animate-spin ${isDark
                        ? 'bg-zinc-900 text-white border border-zinc-700'
                        : 'bg-white text-zinc-900 border border-black/10 shadow-md'
                      }`}
                  >
                    <Sparkles className={`w-8 h-8 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
                  </div>
                  <h3
                    className={`text-xl font-serif ${isDark ? 'text-white' : 'text-zinc-900'}`}
                  >
                    Curating Your Custom Gift Box...
                  </h3>
                  <p
                    className={`text-xs max-w-sm mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                  >
                    Matching your Chai Tea, Sweets & Fitness preferences with handcrafted artisanal gifts.
                  </p>
                </div>
              ) : (
                <UnboxingReveal
                  key="reveal"
                  preferences={preferences}
                  aiGiftData={aiGiftData}
                  giftItems={getCuratedItems()}
                  onRestart={handleReset}
                  onOpenSupport={() => setIsSupportOpen(true)}
                  isDark={isDark}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Summary Drawer */}
      <SummaryDrawer
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        preferences={preferences}
        onJumpToStep={(stepId) => setCurrentStepIndex(stepId)}
        onReset={handleReset}
      />

      {/* Support Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
