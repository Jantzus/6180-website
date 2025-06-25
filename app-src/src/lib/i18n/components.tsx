// src/lib/i18n/components.tsx
import React, { useEffect, useState } from 'react';
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

// Base select component with responsive design
export const SelectBox = styled.select<{ $isMobile?: boolean }>`
  padding: ${props => props.$isMobile ? '8px 12px' : '6px 10px'};
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
  font-size: ${props => props.$isMobile ? '16px' : '14px'}; /* Prevent zoom on iOS */
  cursor: pointer;
  min-width: ${props => props.$isMobile ? '120px' : '100px'};
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  /* Touch-friendly styling for mobile */
  @media (max-width: 768px) {
    font-size: 16px; /* Prevent zoom on iOS */
    padding: 8px 12px;
    min-width: 120px;
  }
`;

// Variant-specific styled components (created outside the component)
const MinimalSelect = styled(SelectBox)`
  border: none;
  background: transparent;
  padding: ${props => props.$isMobile ? '5px 8px' : '3px 5px'};
`;

const ButtonSelect = styled(SelectBox)`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: ${props => props.$isMobile ? '8px 16px' : '6px 12px'};
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
  
  // SSR-safe mobile detection - default to desktop during SSR
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile after hydration
  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      // Multiple methods to detect mobile for reliability
      const isMobileWidth = window.innerWidth < 768;
      const isTouchDevice = navigator.maxTouchPoints > 0;
      const isMobileUserAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Consider it mobile if any condition is true
      setIsMobile(isMobileWidth || isTouchDevice || isMobileUserAgent);
    };
    
    // Check immediately
    checkMobile();
    
    // Also listen for resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
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
        $isMobile={isMobile}
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
  const { loading, setLanguage, isSSR } = useTranslation();
  const [showFallback, setShowFallback] = useState(false);
  
  // Change language if specified (client-side only)
  useEffect(() => {
    if (language && !isSSR) {
      setLanguage(language);
    }
  }, [language, setLanguage, isSSR]);
  
  // Handle loading state without causing layout shifts
  useEffect(() => {
    if (loading && !isSSR) {
      // Small delay before showing fallback to avoid flicker for quick loads
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setShowFallback(false);
    }
  }, [loading, isSSR]);
  
  // During SSR or if loading is quick, show children immediately
  if (isSSR || !showFallback) {
    return <>{children}</>;
  }
  
  // Only show fallback after delay and during actual loading
  return <>{fallback}</>;
};