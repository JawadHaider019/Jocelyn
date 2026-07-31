import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Gift,
  Star,
  CheckCircle2,
  Package,
  Truck,
  Mail,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Heart,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { UserPreferences, GiftBoxItem, RecommendationFeedback } from '../types';

interface UnboxingRevealProps {
  preferences: UserPreferences;
  curatedGiftData?: any;
  giftItems: GiftBoxItem[];
  onRestart: () => void;
  onOpenSupport: () => void;
  isDark?: boolean;
}

const SENTIMENT_TAGS = [
  'Super easy & fast! ⚡',
  'Love the tea options 🍵',
  'Beautiful presentation 🎁',
  'Zero headache filling 📝',
  'Will recommend to friends! ⭐',
];

export const UnboxingReveal: React.FC<UnboxingRevealProps> = ({
  preferences,
  curatedGiftData,
  giftItems,
  onRestart,
  onOpenSupport,
  isDark = false,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Super easy & fast! ⚡']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTracking, setCopiedTracking] = useState(false);

  const { shipping, hobbies, relax, drinks, cravings } = preferences;
  const recipientName = shipping.name || 'Ahmad';
  const apiHostName = 'Muhammad Ahmad';

  // Trigger confetti on render
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#333333', '#666666', '#888888', '#aaaaaa'],
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@jocelynco.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyTracking = () => {
    navigator.clipboard.writeText('GC-2026-98421');
    setCopiedTracking(true);
    setTimeout(() => setCopiedTracking(false), 2500);
  };

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRecommendationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: recipientName,
          rating,
          comment: comment || 'Loved the smooth curation flow and tailored gift selection!',
          tags: selectedTags,
          recipient: apiHostName,
        }),
      });
    } catch (err) {
      console.error('Submit recommendation error:', err);
    }
    setIsSubmitted(true);
  };

  const boxTitle = curatedGiftData?.boxTitle || `The Custom ${drinks[0] || 'Luxury'} & ${cravings[0] || 'Gourmet'} Gift Box`;
  const customNote = curatedGiftData?.customMessage || `Dear ${recipientName}, curated specially for your love of ${drinks.join(', ') || 'Chai Tea'} and ${cravings.join(', ') || 'Sweets'}! We hope every item brings warmth and joy.`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto space-y-4"
    >
      {/* Hero Tada Card */}
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden transition-colors ${isDark
          ? 'bg-zinc-900/50 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-zinc-100'
          : 'bg-white/75 border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-zinc-900'
          }`}
      >
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${isDark ? 'bg-white/[0.04]' : 'bg-zinc-900/[0.03]'
            }`}
        />

        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-xl mb-6 scale-105 animate-bounce ${isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
            }`}
        >
          <Gift className={`w-10 h-10 ${isDark ? 'text-black' : 'text-white'}`} />
        </div>

        <h1
          className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-2 ${isDark ? 'text-white' : 'text-zinc-900'
            }`}
        >
          🎉Tada! All Done!🎉
        </h1>

        <p
          className={`text-base font-medium max-w-lg mx-auto leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'
            }`}
        >
          Your custom gift box has been curated and scheduled for shipping to{' '}
          <span
            className={`underline font-bold ${isDark ? 'text-white decoration-zinc-400' : 'text-zinc-900 decoration-zinc-500'
              }`}
          >
            {shipping.address || 'Yerevan, Armenia'}
          </span>
          !
        </p>

        {/* Quick Order Badge Summary */}
        <div
          className={`mt-6 inline-flex flex-wrap items-center justify-center gap-3 text-xs backdrop-blur-md border px-4 py-2.5 rounded-2xl ${isDark
            ? 'bg-white/[0.05] border-white/10 text-zinc-300'
            : 'bg-black/[0.04] border-black/10 text-zinc-700'
            }`}
        >
          <span
            className={`flex items-center gap-1.5 font-mono ${isDark ? 'text-white' : 'text-zinc-900'
              }`}
          >
            <Package className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} /> Order #GC-2026-98421
          </span>
          <span className={isDark ? 'text-zinc-600' : 'text-zinc-300'}>•</span>
          <span className={`flex items-center gap-1.5 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <Truck className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} /> Ship Date: {shipping.shipDate || '7/29/2026'}
          </span>
          <span className={isDark ? 'text-zinc-600' : 'text-zinc-300'}>•</span>
          <button
            onClick={handleCopyTracking}
            className={`hover:underline cursor-pointer flex items-center gap-1 font-medium ${isDark ? 'text-white' : 'text-zinc-900'
              }`}
          >
            {copiedTracking ? (
              <Check className={`w-3 h-3 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>{copiedTracking ? 'Copied ID' : 'Copy Tracking'}</span>
          </button>
        </div>
      </div>

      {/* Curated Box Showcase */}
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 transition-colors ${isDark
          ? 'bg-zinc-900/50 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]'
          : 'bg-white/75 border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)]'
          }`}
      >
        <div
          className={`flex items-center justify-between gap-4 mb-6 pb-4 border-b ${isDark ? 'border-white/10' : 'border-black/10'
            }`}
        >
          <div>
            <span
              className={`text-xs uppercase tracking-wider font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-500'
                }`}
            >
              Curated Gift Collection
            </span>
            <h2 className={`text-2xl font-serif ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              {boxTitle}
            </h2>
          </div>
          <span
            className={`text-xs px-3 py-1 rounded-full backdrop-blur-md border ${isDark
              ? 'bg-white/10 text-zinc-200 border-white/15'
              : 'bg-black/5 text-zinc-700 border-black/10'
              }`}
          >
            Handcrafted for {recipientName}
          </span>
        </div>

        {/* Personalized Gift Card */}
        <div
          className={`backdrop-blur-md border rounded-2xl p-5 mb-8 relative ${isDark
            ? 'bg-white/[0.04] border-white/10 text-zinc-200'
            : 'bg-black/[0.03] border-black/10 text-zinc-800'
            }`}
        >
          <div
            className={`flex items-center gap-2 text-xs font-semibold mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-600'
              }`}
          >
            <Heart
              className={`w-4 h-4 ${isDark ? 'text-white fill-white/20' : 'text-zinc-900 fill-zinc-900/10'
                }`}
            />
            <span>Personalized Gift Note</span>
          </div>
          <p
            className={`font-serif italic text-sm sm:text-base leading-relaxed ${isDark ? 'text-white' : 'text-zinc-900'
              }`}
          >
            &quot;{customNote}&quot;
          </p>
          <div
            className={`mt-3 text-right text-xs font-serif ${isDark ? 'text-zinc-400' : 'text-zinc-500'
              }`}
          >
            — Jocelyn & Co. Gift Studio
          </div>
        </div>


        {/* <div className="grid grid-cols-1 gap-4">
          {giftItems.slice(0, 1).map((item) => (
            <div
              key={item.id}
              className={`backdrop-blur-md border rounded-2xl flex flex-col sm:flex-row items-center gap-5 sm:gap-6 transition-all group ${isDark
                ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                : 'bg-white/80 border-black/10 hover:bg-white hover:border-black/20 shadow-sm'
                }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className={`w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform ${isDark ? 'bg-black border border-white/10' : 'bg-zinc-100 border border-black/10'
                  }`}
              />
              <div className="flex-1 min-w-0 text-center sm:text-left space-y-2">
                <span
                  className={`text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full inline-block ${isDark ? 'bg-white/10 text-white' : 'bg-zinc-900 text-white'
                    }`}
                >
                  {item.badge || item.category}
                </span>
                <h4
                  className={`text-xl sm:text-2xl font-serif font-bold ${isDark ? 'text-white' : 'text-zinc-900'
                    }`}
                >
                  {item.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-600'
                    }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Recommendation Form Section */}
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 transition-colors ${isDark
          ? 'bg-zinc-900/50 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]'
          : 'bg-white/75 border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)]'
          }`}
      >
        {!isSubmitted ? (
          <form onSubmit={handleRecommendationSubmit} className="space-y-5">
            <div className="text-center sm:text-left">
              <span
                className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
              >
                Your Feedback Matters
              </span>
              <h3
                className={`text-xl sm:text-2xl font-serif mt-1 ${isDark ? 'text-white' : 'text-zinc-900'
                  }`}
              >
                Would you mind leaving a recommendation for {apiHostName}?
              </h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Help us keep this gift curation smooth and headache-free for everyone.
              </p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 py-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-125 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${active
                        ? isDark
                          ? 'fill-white text-white'
                          : 'fill-zinc-900 text-zinc-900'
                        : isDark
                          ? 'text-zinc-700'
                          : 'text-zinc-300'
                        }`}
                    />
                  </button>
                );
              })}
              <span
                className={`ml-2 text-xs font-semibold ${isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
              >
                {rating} / 5 Stars
              </span>
            </div>

            {/* Quick Sentiment Tags */}
            <div>
              <label
                className={`block text-xs font-medium mb-2 ${isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
              >
                Quick Highlight Tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {SENTIMENT_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border cursor-pointer backdrop-blur-md ${isSelected
                        ? isDark
                          ? 'bg-white text-black border-white shadow-sm font-semibold'
                          : 'bg-zinc-900 text-white border-zinc-900 shadow-sm font-semibold'
                        : isDark
                          ? 'bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white'
                          : 'bg-white border-black/10 text-zinc-700 hover:bg-zinc-100 hover:text-black'
                        }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recommendation Comment input */}
            <div>
              <label
                className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-zinc-300' : 'text-zinc-700'
                  }`}
              >
                Your Recommendation / Comment:
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what you loved about this gift setup..."
                className={`w-full backdrop-blur-md border rounded-xl px-4 py-3 text-sm focus:outline-none ${isDark
                  ? 'bg-white/[0.05] border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
                  }`}
              />
            </div>

            <button
              type="submit"
              id="recommendation-submit-btn"
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 ${isDark
                ? 'bg-white hover:bg-zinc-200 text-black'
                : 'bg-zinc-900 hover:bg-black text-white'
                }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isDark ? 'text-black' : 'text-white'}`}
              />
              <span>Submit Recommendation for {recipientName}</span>
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6 space-y-3"
          >
            <div
              className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto backdrop-blur-md ${isDark
                ? 'bg-white/10 text-white border-white/20'
                : 'bg-black/5 text-zinc-900 border-black/15'
                }`}
            >
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className={`text-xl font-serif ${isDark ? 'text-white' : 'text-zinc-900'}`}>
              Thank you for your recommendation!
            </h4>
            <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Your feedback for{' '}
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                {apiHostName}
              </span>{' '}
              has been saved. We appreciate your support!
            </p>
          </motion.div>
        )}
      </div>

      {/* Support & Contact Footer Info */}
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 text-center space-y-4 transition-colors ${isDark
          ? 'bg-zinc-900/50 border-white/10 text-zinc-100'
          : 'bg-white/75 border-black/10 text-zinc-900 shadow-sm'
          }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4
              className={`text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-zinc-200' : 'text-zinc-800'
                }`}
            >
              <Mail className={`w-4 h-4 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
              <span>Need help or changes?</span>
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              If you have any questions, contact us at{' '}
              <a
                href="mailto:hello@jocelynco.com"
                className={`font-medium underline ${isDark ? 'text-white' : 'text-zinc-900'}`}
              >
                hello@jocelynco.com
              </a>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopyEmail}
              type="button"
              id="copy-support-email-btn"
              className={`px-4 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 border ${isDark
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
                : 'bg-white hover:bg-zinc-100 text-zinc-800 border-black/15 shadow-sm'
                }`}
            >
              {copiedEmail ? (
                <Check className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
              ) : (
                <Copy className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`} />
              )}
              <span>{copiedEmail ? 'Copied Email!' : 'Copy Support Email'}</span>
            </button>


          </div>
        </div>
      </div>
    </motion.div>
  );
};
