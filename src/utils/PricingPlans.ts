const BASIC_KINYARWANDA = import.meta.env.VITE_KINYARWANDA_BASIC as string;
const GENERAL_KINYARWANDA = import.meta.env.VITE_KINYARWANDA_GENERAL as string;
const PREMIUM_KINYARWANDA = import.meta.env.VITE_KINYARWANDA_PREMIUM as string;
const PRO_KINYARWANDA = import.meta.env.VITE_KINYARWANDA_PRO as string;
const JUNIOR_EN_FR = import.meta.env.VITE_JUNIOR_EN_FR as string;
const SENIOR_EN_FR = import.meta.env.VITE_SENIOR_EN_FR as string;
const PREMIUM_EN_FR = import.meta.env.VITE_PREMIUM_EN_FR as string;

export const PricingPlans = [
  {
    id: 1,
    subId: GENERAL_KINYARWANDA,
    name: 'General',
    price: 500,
    language: 'Kinyarwanda',
  },
  {
    id: 2,
    subId: BASIC_KINYARWANDA,
    name: 'Basic',
    price: 4000,
    language: 'Kinyarwanda',
  },
  {
    id: 3,
    subId: PREMIUM_KINYARWANDA,
    name: 'Premium',
    price: 5000,
    language: 'Kinyarwanda',
  },
  {
    id: 4,
    subId: PRO_KINYARWANDA,
    name: 'Pro',
    price: 8000,
    language: 'Kinyarwanda',
  },
  {
    id: 5,
    subId: JUNIOR_EN_FR,
    name: 'junior',
    price: 1000,
    language: 'English',
  },
  {
    id: 6,
    subId: SENIOR_EN_FR,
    name: 'senior',
    price: 10000,
    language: 'English',
  },
  {
    id: 7,
    subId: PREMIUM_EN_FR,
    name: 'principal',
    price: 15000,
    language: 'English',
  },
  {
    id: 8,
    subId: JUNIOR_EN_FR,
    name: 'beginner',
    price: 1000,
    language: 'French',
  },
  {
    id: 9,
    subId: SENIOR_EN_FR,
    name: 'experienced',
    price: 10000,
    language: 'French',
  },
  {
    id: 10,
    subId: PREMIUM_EN_FR,
    name: 'master',
    price: 15000,
    language: 'French',
  },
];
