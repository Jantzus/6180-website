// src/lib/i18n/react.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  t,
  setLanguage, 
  getAvailableLanguages,
  SupportedLanguage,
  TranslationKey,
  init
} from './index';

// Create a context for i18n in React
interface I18nContextType {
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: Array<{ code: SupportedLanguage; name: string }>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Custom styles for the language selector component
const languageSelectorStyles = {
  container: {
    position: 'relative' as const,
    display: 'inline-block'
  },
  select: {
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1em',
    cursor: 'pointer',
    minWidth: '150px'
  }
};

// CSS for language selector that will be injected globally
const languageSelectorCss = `
  .language-selector select {
    padding: 5px 10px;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
    cursor: pointer;
    min-width: 150px;
  }
`;

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

  // Inject the language selector CSS styles
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      // Check if the style already exists
      const existingStyle = document.getElementById('language-selector-styles');
      if (!existingStyle) {
        const style = document.createElement('style');
        style.id = 'language-selector-styles';
        style.innerHTML = languageSelectorCss;
        document.head.appendChild(style);
      }
    }
  }, []);

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

// Translation component 
interface TransProps {
  k: TranslationKey;
  params?: Record<string, string | number>;
}

export const Trans: React.FC<TransProps> = ({ k, params }) => {
  const { t } = useTranslation();
  return <>{t(k, params)}</>;
};

// Language selector component
export const LanguageSelector: React.FC<{
  className?: string;
  label?: string;
}> = ({ className }) => {
  const { language, setLanguage, languages } = useTranslation();
  
  // Updated container styles to support label and selector alignment
  const containerWithLabelStyle = {
    ...languageSelectorStyles.container,
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };
  
  return (
    <div className={className || "language-selector"} style={containerWithLabelStyle}>
      <label style={{ fontWeight: 'normal', fontSize: '1em' }}>
        A 文:
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        aria-label="Language"
        style={languageSelectorStyles.select}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};