import React from 'react';

interface CustomCalendarProps {
  month: string; // e.g. "07"
  day: string; // e.g. "29"
  year?: string; // e.g. "1998"
  onSelect: (month: string, day: string, year?: string) => void;
  isDark?: boolean;
}

export const MONTHS = [
  { value: '01', name: 'January', short: 'Jan', days: 31 },
  { value: '02', name: 'February', short: 'Feb', days: 29 },
  { value: '03', name: 'March', short: 'Mar', days: 31 },
  { value: '04', name: 'April', short: 'Apr', days: 30 },
  { value: '05', name: 'May', short: 'May', days: 31 },
  { value: '06', name: 'June', short: 'Jun', days: 30 },
  { value: '07', name: 'July', short: 'Jul', days: 31 },
  { value: '08', name: 'August', short: 'Aug', days: 31 },
  { value: '09', name: 'September', short: 'Sep', days: 30 },
  { value: '10', name: 'October', short: 'Oct', days: 31 },
  { value: '11', name: 'November', short: 'Nov', days: 30 },
  { value: '12', name: 'December', short: 'Dec', days: 31 },
];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonthNum = today.getMonth() + 1; // 1-12
const currentDayNum = today.getDate();

export const YEARS = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  month = '07',
  day = '29',
  year = '1998',
  onSelect,
  isDark = false,
}) => {
  const selYearNum = parseInt(year || currentYear.toString(), 10);
  const isCurrentYear = selYearNum >= currentYear;

  // Filter available months if selected year is current year (or future)
  const availableMonths = isCurrentYear
    ? MONTHS.filter((m) => parseInt(m.value, 10) <= currentMonthNum)
    : MONTHS;

  // Ensure selected month is within available months
  const validMonth = availableMonths.some((m) => m.value === month)
    ? month
    : availableMonths[availableMonths.length - 1].value;

  const selMonthNum = parseInt(validMonth, 10);
  const isCurrentMonthAndYear = isCurrentYear && selMonthNum === currentMonthNum;

  const selectedMonthObj = MONTHS.find((m) => m.value === validMonth) || MONTHS[6];
  const maxDays = isCurrentMonthAndYear
    ? Math.min(selectedMonthObj.days, currentDayNum)
    : selectedMonthObj.days;

  const validDayNum = Math.min(parseInt(day || '29', 10), maxDays);
  const validDay = validDayNum.toString().padStart(2, '0');

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    const newMonthNum = parseInt(newMonth, 10);
    const newMonthObj = MONTHS.find((m) => m.value === newMonth) || MONTHS[0];

    let newMaxDays = newMonthObj.days;
    if (isCurrentYear && newMonthNum === currentMonthNum) {
      newMaxDays = Math.min(newMaxDays, currentDayNum);
    }

    let newDayNum = parseInt(day, 10);
    if (newDayNum > newMaxDays) {
      newDayNum = newMaxDays;
    }

    onSelect(newMonth, newDayNum.toString().padStart(2, '0'), year);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(validMonth, e.target.value, year);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    const newYearNum = parseInt(newYear, 10);
    let newMonth = validMonth;
    let newDayNum = parseInt(validDay, 10);

    if (newYearNum >= currentYear) {
      if (parseInt(newMonth, 10) > currentMonthNum) {
        newMonth = currentMonthNum.toString().padStart(2, '0');
      }
      if (parseInt(newMonth, 10) === currentMonthNum && newDayNum > currentDayNum) {
        newDayNum = currentDayNum;
      }
    }

    onSelect(newMonth, newDayNum.toString().padStart(2, '0'), newYear);
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Month Dropdown */}
      <div>
        <label
          className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
            isDark ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          Month (MM)
        </label>
        <select
          value={validMonth}
          onChange={handleMonthChange}
          className={`w-full border rounded-xl px-2 py-2 text-xs sm:text-sm font-medium focus:outline-none transition-all cursor-pointer backdrop-blur-md ${
            isDark
              ? 'bg-zinc-900 border-white/15 text-white focus:border-white'
              : 'bg-white border-black/15 text-zinc-900 focus:border-zinc-900 shadow-sm'
          }`}
        >
          {availableMonths.map((m) => (
            <option key={m.value} value={m.value} className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Day Dropdown */}
      <div>
        <label
          className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
            isDark ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          Day (DD)
        </label>
        <select
          value={validDay}
          onChange={handleDayChange}
          className={`w-full border rounded-xl px-2 py-2 text-xs sm:text-sm font-medium focus:outline-none transition-all cursor-pointer backdrop-blur-md ${
            isDark
              ? 'bg-zinc-900 border-white/15 text-white focus:border-white'
              : 'bg-white border-black/15 text-zinc-900 focus:border-zinc-900 shadow-sm'
          }`}
        >
          {Array.from({ length: maxDays }, (_, i) => {
            const dStr = (i + 1).toString().padStart(2, '0');
            return (
              <option key={dStr} value={dStr} className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}>
                {dStr}
              </option>
            );
          })}
        </select>
      </div>

      {/* Year Dropdown */}
      <div>
        <label
          className={`block text-[10px] font-bold uppercase tracking-wider mb-1 ${
            isDark ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          Year (YYYY)
        </label>
        <select
          value={year || currentYear.toString()}
          onChange={handleYearChange}
          className={`w-full border rounded-xl px-2 py-2 text-xs sm:text-sm font-medium focus:outline-none transition-all cursor-pointer backdrop-blur-md ${
            isDark
              ? 'bg-zinc-900 border-white/15 text-white focus:border-white'
              : 'bg-white border-black/15 text-zinc-900 focus:border-zinc-900 shadow-sm'
          }`}
        >
          {YEARS.map((y) => (
            <option key={y} value={y} className={isDark ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
