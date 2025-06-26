// src/lib/i18n/context.tsx
import React, { useState, useEffect, ReactNode } from 'react';
import { 
  t,
  tSync,
  setLanguage, 
  getAvailableLanguages,
  SupportedLanguage,
  preloadTranslations,
  getStoredLanguage,
  setStoredLanguage,
  detectBrowserLanguage
} from '@/lib/i18n/index';
import { I18nContext, I18nContextType } from './types';

// Provider component
interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: SupportedLanguage;
  preloadLanguages?: SupportedLanguage[];
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLanguage = 'en', // Default to English for SSR
  preloadLanguages = [] 
}) => {
  // SSR-safe defaults - assume desktop/English during SSR
  const [language, setCurrentLanguage] = useState<SupportedLanguage>(initialLanguage);
  const [loading, setLoading] = useState<boolean>(false); // Start with false for SSR
  const [isSSR, setIsSSR] = useState<boolean>(true); // Track SSR state

  // Initialize i18n system on client-side only
  useEffect(() => {
    let isMounted = true;
    
    async function initializeI18n() {
      // Mark as client-side
      setIsSSR(false);
      setLoading(true);
      
      try {
        // Get stored language preference
        const storedLang = getStoredLanguage();
        
        // Get browser language preference
        const browserLang = detectBrowserLanguage();
        
        // Determine initial language priority:
        // 1. Explicitly passed initialLanguage (if different from default)
        // 2. Stored preference
        // 3. Browser language
        // 4. Default 'en'
        let targetLang: SupportedLanguage = 'en';
        
        if (initialLanguage !== 'en') {
          targetLang = initialLanguage;
        } else if (storedLang) {
          targetLang = storedLang;
        } else if (browserLang) {
          targetLang = browserLang;
        }
        
        // Set language and wait for it to load
        if (isMounted) {
          const newLang = await setLanguage(targetLang);
          setCurrentLanguage(newLang);
          
          // Save to localStorage if different from stored
          if (storedLang !== newLang) {
            setStoredLanguage(newLang);
          }
        }
        
        // Preload additional languages if specified
        if (preloadLanguages.length > 0 && isMounted) {
          await preloadTranslations(preloadLanguages);
        }
        
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        // Fallback to English on error
        if (isMounted) {
          setCurrentLanguage('en');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    initializeI18n();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [initialLanguage, preloadLanguages]); // Added preloadLanguages to dependency array

  // Handle language changes
  const changeLang = async (lang: SupportedLanguage) => {
    console.log(`Changing language to: ${lang}`); // Debug log
    setLoading(true);
    
    try {
      const newLang = await setLanguage(lang);
      console.log(`Language changed to: ${newLang}`); // Debug log
      setCurrentLanguage(newLang);
      
      // Save to localStorage (SSR-safe)
      setStoredLanguage(newLang);
      
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
    loading,
    isSSR
  };

  // Always render children - no loading states that delay SSR
  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};