/**
 * Custom hook to detect user language preference from localStorage
 * @returns The full language name based on stored language code
 */
export const useLanguageDetector = (): string => {
    // Language mapping for better maintainability
    const LANGUAGE_MAP: Record<string, string> = {
      kiny: "Kinyarwanda",
      en: "English",
      fr: "French"
    };
    
    // Get language from localStorage with fallback handling
    const languageCode = localStorage.getItem("i18nextLng") || "en";
    
    // Return mapped language or default to English if code not found
    return LANGUAGE_MAP[languageCode] || "English";
  };