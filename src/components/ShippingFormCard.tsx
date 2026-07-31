import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, Sparkles, Check, Calendar, Phone, MapPin, Gift, AlertCircle, RefreshCw } from 'lucide-react';
import { ShippingDetails } from '../types';

interface ShippingFormCardProps {
  shipping: ShippingDetails;
  onChange: (updated: ShippingDetails) => void;
  onSubmit: () => void;
  onQuickFill: () => void;
  recipientName: string;
  isDark?: boolean;
}

const MONTHS = [
  { value: '01', label: 'Jan' },
  { value: '02', label: 'Feb' },
  { value: '03', label: 'Mar' },
  { value: '04', label: 'Apr' },
  { value: '05', label: 'May' },
  { value: '06', label: 'Jun' },
  { value: '07', label: 'Jul' },
  { value: '08', label: 'Aug' },
  { value: '09', label: 'Sep' },
  { value: '10', label: 'Oct' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dec' },
];

const ALLERGY_OPTIONS = [
  { id: 'no', label: 'No allergies' },
  { id: 'nuts', label: 'Nut-free' },
  { id: 'gluten', label: 'Gluten-free' },
  { id: 'dairy', label: 'Dairy-free' },
  { id: 'vegan', label: 'Vegan' },
];

const DATE_OPTIONS = [
  { id: 'custom_preset', label: '7/29/2026' },
  { id: 'asap', label: 'Ship ASAP' },
  { id: 'next_week', label: 'Next Monday' },
];

export const ShippingFormCard: React.FC<ShippingFormCardProps> = ({
  shipping,
  onChange,
  onSubmit,
  onQuickFill,
  recipientName,
  isDark = false,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof ShippingDetails, value: string) => {
    onChange({
      ...shipping,
      [field]: value,
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!shipping.name.trim()) newErrors.name = 'Please enter your name';
    if (!shipping.email.trim()) newErrors.email = 'Please enter your email';
    if (!shipping.address.trim()) newErrors.address = 'Please enter shipping address';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div
        className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-colors ${
          isDark
            ? 'bg-zinc-900/50 border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-zinc-100'
            : 'bg-white/75 border-black/10 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-zinc-900'
        }`}
      >
        {/* Decorative Top Glass Glow */}
        <div
          className={`absolute top-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isDark ? 'bg-white/[0.04]' : 'bg-zinc-900/[0.03]'
          }`}
        />

        {/* Card Header */}
        <div
          className={`flex items-start justify-between gap-4 mb-6 pb-6 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold shadow-md flex-shrink-0 ${
                isDark ? 'bg-white text-black' : 'bg-zinc-900 text-white'
              }`}
            >
              <Truck className={`w-5 h-5 ${isDark ? 'text-black' : 'text-white'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-zinc-300' : 'text-zinc-500'
                  }`}
                >
                  Final Step • Shipping Details
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md border ${
                    isDark
                      ? 'bg-white/10 text-zinc-200 border-white/15'
                      : 'bg-black/5 text-zinc-700 border-black/10'
                  }`}
                >
                  Zero Hassle
                </span>
              </div>
              <h2
                className={`text-xl sm:text-2xl font-serif ${
                  isDark ? 'text-white' : 'text-zinc-900'
                }`}
              >
                One more thing and you&apos;re done
              </h2>
              <p
                className={`text-xs mt-1 font-sans ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}
              >
                We need to know where to ship your custom gift box.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onQuickFill}
            id="shipping-quick-fill-btn"
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer flex-shrink-0 shadow-sm ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                : 'bg-black/5 hover:bg-black/10 text-zinc-800 border-black/10'
            }`}
            title="Auto-fill with sample test details"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-zinc-300' : 'text-zinc-600'}`} />
            <span className="hidden sm:inline">Auto-Fill Test Info</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={validateAndSubmit} className="space-y-6">
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-xs font-medium mb-1.5 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="shipping-name-input"
                value={shipping.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Ahmad test"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all backdrop-blur-md ${
                  errors.name
                    ? 'border-red-500 bg-red-50'
                    : isDark
                    ? 'bg-white/[0.05] border-white/15 text-white placeholder-zinc-500 focus:border-white'
                    : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block text-xs font-medium mb-1.5 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="shipping-email-input"
                value={shipping.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="test@example.com"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all backdrop-blur-md ${
                  errors.email
                    ? 'border-red-500 bg-red-50'
                    : isDark
                    ? 'bg-white/[0.05] border-white/15 text-white placeholder-zinc-500 focus:border-white'
                    : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Allergies or food sensitivities */}
          <div>
            <label
              className={`block text-xs font-medium mb-2 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Allergies or food sensitivities?
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {ALLERGY_OPTIONS.map((opt) => {
                const isSelected =
                  shipping.allergies.toLowerCase() === opt.label.toLowerCase() ||
                  (opt.id === 'no' && shipping.allergies.toLowerCase() === 'no');
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleChange('allergies', opt.id === 'no' ? 'no' : opt.label)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md transition-all border cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-white text-black border-white shadow-sm font-semibold'
                          : 'bg-zinc-900 text-white border-zinc-900 shadow-sm font-semibold'
                        : isDark
                        ? 'bg-white/[0.04] border-white/10 text-zinc-300 hover:bg-white/[0.08] hover:text-white'
                        : 'bg-white border-black/10 text-zinc-700 hover:bg-zinc-100 hover:text-black'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              id="shipping-allergies-input"
              value={shipping.allergies}
              onChange={(e) => handleChange('allergies', e.target.value)}
              placeholder="Or type custom (e.g. no, peanut allergy)..."
              className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none backdrop-blur-md ${
                isDark
                  ? 'bg-white/[0.05] border-white/15 text-zinc-200 placeholder-zinc-500 focus:border-white'
                  : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
              }`}
            />
          </div>

          {/* Phone Number with Country Code */}
          <div>
            <label
              className={`block text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
              <span>Phone number</span>
            </label>
            <div className="flex gap-2">
              <select
                value={shipping.phoneCountry}
                onChange={(e) => {
                  const country = e.target.value;
                  let code = '+1';
                  if (country === 'Armenia') code = '+374';
                  if (country === 'United Kingdom') code = '+44';
                  if (country === 'UAE') code = '+971';
                  onChange({ ...shipping, phoneCountry: country, phoneCode: code });
                }}
                className={`border rounded-xl px-3 py-2.5 text-xs focus:outline-none backdrop-blur-md ${
                  isDark
                    ? 'bg-zinc-900 border-white/15 text-zinc-200 focus:border-white'
                    : 'bg-white border-black/15 text-zinc-800 focus:border-zinc-900'
                }`}
              >
                <option value="United States">United States +1</option>
                <option value="Armenia">Armenia +374</option>
                <option value="Canada">Canada +1</option>
                <option value="United Kingdom">United Kingdom +44</option>
                <option value="UAE">UAE +971</option>
              </select>

              <div className="relative flex-1">
                <span
                  className={`absolute left-3.5 top-3 text-xs font-mono ${
                    isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}
                >
                  {shipping.phoneCode}
                </span>
                <input
                  type="text"
                  id="shipping-phone-input"
                  value={shipping.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="345-678-9789"
                  className={`w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none font-mono backdrop-blur-md ${
                    isDark
                      ? 'bg-white/[0.05] border-white/15 text-white placeholder-zinc-500 focus:border-white'
                      : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Schedule ship date */}
          <div>
            <label
              className={`block text-xs font-medium mb-2 flex items-center gap-1.5 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
              <span>Schedule the ship date for your gift</span>
            </label>

            <div className="flex flex-wrap gap-2 mb-2">
              {DATE_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleChange('shipDate', d.label)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md transition-all border cursor-pointer ${
                    shipping.shipDate === d.label
                      ? isDark
                        ? 'bg-white text-black border-white shadow-sm font-semibold'
                        : 'bg-zinc-900 text-white border-zinc-900 shadow-sm font-semibold'
                      : isDark
                      ? 'bg-white/[0.04] border-white/10 text-zinc-300 hover:bg-white/[0.08] hover:text-white'
                      : 'bg-white border-black/10 text-zinc-700 hover:bg-zinc-100 hover:text-black'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              id="shipping-date-input"
              value={shipping.shipDate}
              onChange={(e) => handleChange('shipDate', e.target.value)}
              placeholder="MM/DD/YYYY e.g. 7/29/2026"
              className={`w-full border rounded-xl px-4 py-2 text-xs focus:outline-none font-mono backdrop-blur-md ${
                isDark
                  ? 'bg-white/[0.05] border-white/15 text-zinc-200 placeholder-zinc-500 focus:border-white'
                  : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
              }`}
            />
          </div>

          {/* Shipping Address */}
          <div>
            <label
              className={`block text-xs font-medium mb-1.5 flex items-center gap-1.5 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
              <span>
                Shipping Address <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              id="shipping-address-input"
              value={shipping.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="e.g. Yerevan, Armenia or full street address"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all backdrop-blur-md ${
                errors.address
                  ? 'border-red-500 bg-red-50'
                  : isDark
                  ? 'bg-white/[0.05] border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  : 'bg-white border-black/15 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900'
              }`}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.address}
              </p>
            )}
          </div>

          {/* Birthday MM/DD */}
          <div>
            <label
              className={`block text-xs font-medium mb-1 flex items-center gap-1.5 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              <Gift className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-zinc-900'}`} />
              <span>Birthday MM/DD (you never know!)</span>
            </label>
            <p className={`text-[11px] mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Select Month & Day only
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <select
                  value={shipping.birthdayMonth}
                  onChange={(e) => handleChange('birthdayMonth', e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none backdrop-blur-md ${
                    isDark
                      ? 'bg-zinc-900 border-white/15 text-zinc-200 focus:border-white'
                      : 'bg-white border-black/15 text-zinc-800 focus:border-zinc-900'
                  }`}
                >
                  <option value="">Month</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.value} - {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={shipping.birthdayDay}
                  onChange={(e) => handleChange('birthdayDay', e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none font-mono backdrop-blur-md ${
                    isDark
                      ? 'bg-zinc-900 border-white/15 text-zinc-200 focus:border-white'
                      : 'bg-white border-black/15 text-zinc-800 focus:border-zinc-900'
                  }`}
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => {
                    const dayVal = (i + 1).toString().padStart(2, '0');
                    return (
                      <option key={dayVal} value={dayVal}>
                        {dayVal}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            <button
              type="submit"
              id="shipping-submit-btn"
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-base shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-white hover:bg-zinc-200 text-black'
                  : 'bg-zinc-900 hover:bg-black text-white'
              }`}
            >
              <Sparkles className={`w-5 h-5 ${isDark ? 'text-black' : 'text-white'}`} />
              <span>Create My Custom Gift Box</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
