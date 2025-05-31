// src/lib/i18n/components.tsx
import React, { useEffect } from 'react';
import { useTranslation } from './hooks';
import styled from 'styled-components';
import { SupportedLanguage } from '@/lib/i18n/translations';

// Styled components for the language selector
export const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GlobeIcon = styled.span`
  font-size: 16px;
`;

// Base select component
export const SelectBox = styled.select`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

// Variant-specific styled components (created outside the component)
const MinimalSelect = styled(SelectBox)`
  border: none;
  background: transparent;
  padding: 3px 5px;
  min-width: 100px;
`;

const ButtonSelect = styled(SelectBox)`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 6px 12px;
  font-weight: 500;
`;

export const Option = styled.option`
  padding: 8px;
`;

// Language selector component
interface LanguageSelectorProps {
  className?: string;
  label?: string;
  variant?: 'default' | 'minimal' | 'button';
  onChange?: (language: SupportedLanguage) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className,
  label = '🌐', 
  variant = 'default',
  onChange
}) => {
  const { language, setLanguage, languages, loading } = useTranslation();
  
  // Handle language change
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as SupportedLanguage;
    await setLanguage(newLang);
    
    if (onChange) {
      onChange(newLang);
    }
  };
  
  // Select the appropriate component based on variant
  const SelectComponent = variant === 'minimal' 
    ? MinimalSelect 
    : variant === 'button' 
    ? ButtonSelect 
    : SelectBox;
  
  return (
    <SelectorContainer className={className}>
      <GlobeIcon>
        {label}
      </GlobeIcon>
      <SelectComponent
        value={language}
        onChange={handleChange}
        aria-label="Language"
        disabled={loading}
      >
        {languages.map((lang) => (
          <Option key={lang.code} value={lang.code}>
            {lang.name}
          </Option>
        ))}
      </SelectComponent>
      {loading && <span style={{ fontSize: '12px', color: '#666' }}>•</span>}
    </SelectorContainer>
  );
};

// Lazy loaded content component that ensures translations are loaded
interface TranslatedContentProps {
  language?: SupportedLanguage;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const TranslatedContent: React.FC<TranslatedContentProps> = ({
  language,
  fallback = <div>Loading translations...</div>,
  children
}) => {
  const { loading, setLanguage } = useTranslation();
  
  // Change language if specified
  useEffect(() => {
    if (language) {
      setLanguage(language);
    }
  }, [language, setLanguage]);
  
  if (loading) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};