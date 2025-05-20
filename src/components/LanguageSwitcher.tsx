import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { language_options } from '../utils/languageOptions';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const LanguageSwitcher = () => {
  const { state, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const [userAllowedLanguages, setUserAllowedLanguages] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user?.subscriptions) return;

    const langs: ('en' | 'fr' | 'kiny')[] = [];
    let activeLang: 'en' | 'fr' | 'kiny' | null = null;

    user.subscriptions.forEach((sub: any) => {
      const lang = sub.language?.toLowerCase();
      if (lang === 'ki' && !langs.includes('kiny')) langs.push('kiny');
      else if (lang === 'fr' && !langs.includes('fr')) langs.push('fr');
      else if (lang === 'en' && !langs.includes('en')) langs.push('en');
    });

    // Get preferred language from active_subscription
    const actLang = user.active_subscription?.language?.toLowerCase();
    if (actLang === 'ki') activeLang = 'kiny';
    else if (actLang === 'fr') activeLang = 'fr';
    else if (actLang === 'en') activeLang = 'en';

    setUserAllowedLanguages(langs);

    // Set preferred language based on active subscription (if different from current)
    if (activeLang && langs.includes(activeLang) && state.currentCode !== activeLang) {
      setLanguage(activeLang);
    }
  }, [user]);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (languageName: string) => {
    let selectedCode: 'en' | 'fr' | 'kiny' = 'en';
    if (languageName === 'Kinyarwanda') selectedCode = 'kiny';
    if (languageName === 'French') selectedCode = 'fr';

    if (!userAllowedLanguages.includes(selectedCode)) {
      setShowWarning(true);
      setIsOpen(false);
      return;
    }

    setLanguage(selectedCode);
    setIsOpen(false);
  };

  // Get current language display info using your existing logic
  const getCurrentLanguage = () => {
    const currentCode = state.currentCode;
    let name = 'English';
    let icon = '🇬🇧';

    if (currentCode === 'kiny') {
      name = 'Kinyarwanda';
      icon = '🇷🇼';
    } else if (currentCode === 'fr') {
      name = 'French';
      icon = '🇫🇷';
    } else if (currentCode === 'en') {
      name = 'English';
      icon = '🇬🇧';
    }

    return { name, icon };
  };

  const currentLang = getCurrentLanguage();

  const navigate = useNavigate();

  const handleUpgrade = () => {
    navigate('/', { state: { scrollTo: 'pricing' } });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 px-4 py-2 text-sm font-medium 
                  text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-md 
                  shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      >
        <span className="flex items-center">
          <span className="mr-2 text-lg">{currentLang.icon}</span>
          <span>{currentLang.name}</span>
        </span>
        <svg
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white 
                      shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none 
                      divide-y divide-gray-100 transform transition-all duration-200 ease-out"
        >
          <div className="py-1">
            {language_options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectLanguage(option.name)}
                className={`group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 
                          ${
                            state.currentCode ===
                            (option.value === 'kinyarwanda' ? 'kiny' : option.value.substring(0, 2))
                              ? 'bg-blue-50 text-blue-700 font-medium'
                              : 'text-gray-700'
                          }`}
              >
                <span className="mr-3 text-lg">{option.icon}</span>
                <span>{option.name}</span>
                {state.currentCode ===
                  (option.value === 'kinyarwanda' ? 'kiny' : option.value.substring(0, 2)) && (
                  <svg
                    className="ml-auto h-5 w-5 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {showWarning && (
        <div
          className="absolute top-full mt-2 right-0 w-80 bg-white shadow-xl rounded-md p-4 border border-red-200 
                   animate-slide-in flex flex-col gap-2 z-50"
        >
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
            <span>{t('language_mismatch_title')}</span>
          </div>
          <p className="text-sm text-gray-700">{t('language_mismatch_body')}</p>
          <div className="flex justify-between">
            <button
              onClick={handleUpgrade}
              className="self-end text-md text-green-600 hover:underline mt-2"
            >
              ✅ {t('buy_new')}
            </button>
            <button
              onClick={() => setShowWarning(false)}
              className="self-end text-md text-blue-600 hover:underline mt-2"
            >
              {t('language_mismatch_close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
