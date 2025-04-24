// src/lib/i18n/react.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  EnglishPhrase, 
  translate, 
  setLanguage, 
  getAvailableLanguages,
  SupportedLanguage
} from './index';

// Create a context for i18n in React
interface I18nContextType {
  translate: (phrase: EnglishPhrase) => string;
  currentLanguage: SupportedLanguage;
  changeLanguage: (lang: SupportedLanguage) => void;
  availableLanguages: Array<{ code: SupportedLanguage; name: string }>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider component
interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: SupportedLanguage;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLanguage 
}) => {
  // Try to get language from localStorage first, then from props, then detect
  const getInitialLanguage = (): SupportedLanguage => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language') as SupportedLanguage;
      if (saved) return saved;
    }
    
    return initialLanguage || 'en';
  };

  const [language, setCurrentLanguage] = useState<SupportedLanguage>(getInitialLanguage());

  useEffect(() => {
    setLanguage(language);
  }, [language]);

  const changeLanguage = (lang: SupportedLanguage) => {
    setCurrentLanguage(lang);
    setLanguage(lang);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  };

  const value = {
    translate,
    currentLanguage: language,
    changeLanguage,
    availableLanguages: getAvailableLanguages(),
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook to use translations in components
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

// Shorthand component for translation
interface TransProps {
  phrase: EnglishPhrase;
  params?: Record<string, string | number>;
}

export const Trans: React.FC<TransProps> = ({ phrase, params }) => {
  const { translate } = useTranslation();
  let text = translate(phrase);

  // Handle parameter substitution if needed
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      text = text.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    });
  }

  return <>{text}</>;
};

// Language selector component for easy use
export const LanguageSelector: React.FC<{
  className?: string;
  label?: string;
}> = ({ className, label }) => {
  const { currentLanguage, changeLanguage, availableLanguages, translate } = useTranslation();
  
  return (
    <div className={className || "language-selector"}>
      {label && <label>{label}</label>}
      <select
        value={currentLanguage}
        onChange={(e) => changeLanguage(e.target.value as SupportedLanguage)}
        aria-label={translate('Language')}
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};