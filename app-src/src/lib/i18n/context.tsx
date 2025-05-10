// src/lib/i18n/context.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { 
  t,
  setLanguage, 
  getAvailableLanguages,
  SupportedLanguage,
  TranslationKey,
  init
} from '@/lib/i18n/index';

// Create a context for i18n in React
export interface I18nContextType {
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: Array<{ code: SupportedLanguage; name: string }>;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider component
interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: SupportedLanguage;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLanguage 
}) => {
  // Set initial language with priority: localStorage > props > browser detection
  const [language, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language') as SupportedLanguage;
      if (saved) return setLanguage(saved);
    }
    return initialLanguage ? setLanguage(initialLanguage) : init();
  });

  // Save and sync language changes
  const changeLang = (lang: SupportedLanguage) => {
    const newLang = setLanguage(lang);
    setCurrentLanguage(newLang);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLang);
    }
  };

  // Context value
  const value: I18nContextType = {
    t,
    language,
    setLanguage: changeLang,
    languages: getAvailableLanguages(),
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};