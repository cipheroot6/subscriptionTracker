export const toMonthly = (amount, billingCycle) => {
  if (!amount || amount === 0) return 0;
  switch (billingCycle) {
    case 'yearly':  return +(amount / 12).toFixed(2);
    case 'weekly':  return +(amount * 4.33).toFixed(2);
    default:        return +amount.toFixed(2);
  }
};

export const CATEGORY_LABELS = {
  entertainment: 'Entertainment',
  utilities:    'Utilities',
  health:        'Health & Fitness',
  education:     'Education',
  dev_tools:     'Dev Tools',
  music:         'Music',
  shopping:       'Shopping',
  food:          'Food & Dining',
  travel:        'Travel',
  other:         'Other',
};

export const CATEGORY_COLORS = {
  entertainment: '#ef4444',
  utilities:    '#f59e0b',
  health:        '#10b981',
  education:     '#3b82f6',
  dev_tools:     '#a855f7',
  music:         '#ec4899',
  shopping:       '#06b6d4',
  food:          '#f97316',
  travel:        '#84cc16',
  other:         '#6b7280',
};

export const INITIALS_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#a855f7', '#ec4899', '#06b6d4', '#f97316',
];

export const STATUS_CONFIG = {
  active:   { label: 'Active',   color: '#10b981', bg: 'rgba(16,185,129,0.08)'  },
  canceled: { label: 'Canceled', color: '#ef4444', bg: 'rgba(239,68,68,0.08)'  },
  expired:  { label: 'Expired',  color: '#f59e0b', bg: 'rgba(245,158,11,0.08)'  },
};

export const freqLabel = (f) => {
  const map = { daily: '/day', weekly: '/wk', monthly: '/mo', yearly: '/yr' };
  return map[f] || '';
};

export const FREQ_DAYS = { daily: 1, weekly: 7, monthly: 30, yearly: 365 };

export const addDays = (dateStr, days) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};
