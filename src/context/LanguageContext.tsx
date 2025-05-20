import React, { createContext, useReducer, useEffect, PropsWithChildren } from 'react';
import i18n from '../utils/i18n';

// Define types
type Language = 'kiny' | 'en' | 'fr';
type LanguageState = {
  currentCode: Language;
  currentName: string;
};

type LanguageAction = 
  | { type: 'SET_LANGUAGE'; payload: Language }
  | { type: 'INITIALIZE' };

// Create initial state
const getLanguageName = (code: Language): string => {
  const map: Record<Language, string> = {
    kiny: "Kinyarwanda",
    en: "English",
    fr: "French"
  };
  return map[code];
};

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem("i18nextLng") as Language;
  return (stored && ['kiny', 'en', 'fr'].includes(stored)) ? stored : 'en';
};

const initialState: LanguageState = {
  currentCode: getInitialLanguage(),
  currentName: getLanguageName(getInitialLanguage())
};

// Create reducer
const languageReducer = (state: LanguageState, action: LanguageAction): LanguageState => {
  switch (action.type) {
    case 'SET_LANGUAGE': {
      const code = action.payload;
      return {
        currentCode: code,
        currentName: getLanguageName(code)
      };
    }
    case 'INITIALIZE': {
      const code = getInitialLanguage();
      return {
        currentCode: code,
        currentName: getLanguageName(code)
      };
    }
    default:
      return state;
  }
};

// Create context
type LanguageContextType = {
  state: LanguageState;
  setLanguage: (code: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create provider
export const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(languageReducer, initialState);

  // Effect to handle storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'i18nextLng') {
        const newLang = e.newValue as Language;
        if (newLang && ['kiny', 'en', 'fr'].includes(newLang)) {
          dispatch({ type: 'SET_LANGUAGE', payload: newLang });
          i18n.changeLanguage(newLang);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Initialize i18n on mount
  useEffect(() => {
    i18n.changeLanguage(state.currentCode);
  }, []);

  const setLanguage = (code: Language) => {
    i18n.changeLanguage(code);
    dispatch({ type: 'SET_LANGUAGE', payload: code });
  };

  return (
    <LanguageContext.Provider value={{ state, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};