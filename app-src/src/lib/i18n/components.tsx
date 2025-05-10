// src/lib/i18n/components.tsx
import React from 'react';
import { useTranslation } from './hooks';
import { TranslationKey } from '@/lib/i18n/index';
import { 
  SelectorContainer, 
  GlobeIcon, 
  SelectBox, 
  Option 
} from './styled';
import { SupportedLanguage } from '@/lib/i18n/index';

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

// Need to import styled here since it's used in the memoized component
import styled from 'styled-components';