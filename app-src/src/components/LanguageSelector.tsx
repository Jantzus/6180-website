// src/lib/i18n/react.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import styled from 'styled-components';
import { 
  t,
  setLanguage, 
  getAvailableLanguages,
  SupportedLanguage,
  TranslationKey,
  init
} from '@/lib/i18n/index';

// Create a context for i18n in React
interface I18nContextType {
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: Array<{ code: SupportedLanguage; name: string }>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Styled components for the language selector
const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  inline-size: fit-content;
`;

const GlobeIcon = styled.label`
  font-weight: normal;
  font-size: 1em;
  cursor: pointer;
`;

const SelectBox = styled.select`
  padding: 5px 10px;
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  min-width: 150px;
  appearance: auto;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: #bbb;
  }
  
  &:focus {
    outline: none;
    border-color: #999;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
  }
`;

const Option = styled.option`
  padding: 5px;
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

// Language selector component with styled-components
interface LanguageSelectorProps {
  className?: string;
  label?: string;
  variant?: 'default' | 'minimal' | 'button';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className,
  label = '🌐', 
  variant = 'default'
}) => {
  const { language, setLanguage, languages } = useTranslation();
  
  // Create a memoized styled component based on the variant prop
  const StyledSelect = React.useMemo(() => {
    return styled(SelectBox)`
      ${variant === 'minimal' && `
        border: none;
        background: transparent;
        padding: 3px 5px;
        min-width: 100px;
      `}
      
      ${variant === 'button' && `
        background-color: #f5f5f5;
        border-radius: 20px;
        padding: 6px 12px;
        font-weight: 500;
      `}
    `;
  }, [variant]);
  
  return (
    <SelectorContainer className={className}>
      <GlobeIcon>
        {label}
      </GlobeIcon>
      <StyledSelect
        value={language}
        onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
        aria-label="Language"
      >
        {languages.map((lang) => (
          <Option key={lang.code} value={lang.code}>
            {lang.name}
          </Option>
        ))}
      </StyledSelect>
    </SelectorContainer>
  );
};