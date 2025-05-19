// src/lib/i18n/context.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  t,
  tSync,
  setLanguage, 
  getAvailableLanguages,
  SupportedLanguage,
  init,
  preloadTranslations
} from '@/lib/i18n/index';

// Create a context for i18n in React
export interface I18nContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  tAsync: (key: string, params?: Record<string, string | number>) => Promise<string>;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  languages: Array<{ code: SupportedLanguage; name: string }>;
  loading: boolean;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider component
interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: SupportedLanguage;
  preloadLanguages?: SupportedLanguage[];
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLanguage,
  preloadLanguages = [] 
}) => {
  // State for current language
  const [language, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Initialize i18n system
  useEffect(() => {
    async function initializeI18n() {
      setLoading(true);
      try {
        // Initialize with stored language or browser preference
        const detectedLang = await init();
        setCurrentLanguage(detectedLang);
        
        // If initial language is specified and different from detected
        if (initialLanguage && initialLanguage !== detectedLang) {
          const newLang = await setLanguage(initialLanguage);
          setCurrentLanguage(newLang);
        }
        
        // Preload additional languages if specified
        if (preloadLanguages.length > 0) {
          await preloadTranslations(preloadLanguages);
        }
        
        setInitialized(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
      } finally {
        setLoading(false);
      }
    }
    
    initializeI18n();
  }, [initialLanguage]);

  // Handle language changes
  const changeLang = async (lang: SupportedLanguage) => {
    console.log(`Changing language to: ${lang}`); // Debug log
    setLoading(true);
    try {
      const newLang = await setLanguage(lang);
      console.log(`Language changed to: ${newLang}`); // Debug log
      setCurrentLanguage(newLang);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('preferred-language', newLang);
        localStorage.setItem('user_language', newLang); // For compatibility
      }
      
      // Force a re-render by updating state
      setCurrentLanguage(prev => {
        if (prev === newLang) {
          // If the language hasn't changed (e.g., setting same language again)
          // We still want to trigger a re-render, so we'll set it to a temp value and back
          setTimeout(() => setCurrentLanguage(newLang), 0);
          return prev;
        }
        return newLang;
      });
      
    } catch (error) {
      console.error(`Failed to change language to ${lang}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Synchronous translate function that uses the cached translations
  const translate = (key: string, params?: Record<string, string | number>): string => {
    return tSync(key, params);
  };

  // Asynchronous translate function that can load translations on demand
  const translateAsync = async (key: string, params?: Record<string, string | number>): Promise<string> => {
    return await t(key, params);
  };

  // Context value
  const value: I18nContextType = {
    t: translate,
    tAsync: translateAsync,
    language,
    setLanguage: changeLang,
    languages: getAvailableLanguages(),
    loading
  };

  // Show a minimal loading state before initialization completes
  if (!initialized && loading) {
    return <div style={{ display: 'none' }}></div>;
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};