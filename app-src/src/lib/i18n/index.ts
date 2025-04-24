// src/lib/i18n/index.ts
import { 
  translations, 
  supportedLanguages, 
  rtlLanguages,
  getLanguageDirection
} from '@/lib/i18n/translations';
import type { SupportedLanguage, TranslationKey } from '@/lib/i18n/translations';

// Current language state
let currentLanguage: SupportedLanguage = 'en';

/**
 * Sets the active language
 */
export const setLanguage = (lang: string): SupportedLanguage => {
  if (lang in supportedLanguages) {
    currentLanguage = lang as SupportedLanguage;
    return currentLanguage;
  }
  
  console.warn(`Language ${lang} not supported, falling back to en`);
  currentLanguage = 'en';
  return currentLanguage;
};

/**
 * Translates a key to the current language
 */
export const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
  // For English, just return the key (which is the English phrase)
  if (currentLanguage === 'en') {
    let text = key;
    
    // Handle parameter substitution
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
      });
    }
    
    return text;
  }
  
  // Look up translation in the current language
  const translationSet = translations[key];
  let text = translationSet && currentLanguage in translationSet 
    ? translationSet[currentLanguage] as string 
    : key;
  
  // Handle parameter substitution
  if (params) {
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(new RegExp(`{{${param}}}`, 'g'), String(value));
    });
  }
  
  return text;
};

/**
 * Detects browser language and returns a supported match or fallback
 */
export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = window.navigator.language.split('-')[0];
  return browserLang in supportedLanguages ? browserLang as SupportedLanguage : 'en';
};

/**
 * Gets all available languages for UI selectors
 */
export const getAvailableLanguages = (): Array<{ code: SupportedLanguage; name: string }> => {
  return Object.entries(supportedLanguages).map(([code, name]) => ({
    code: code as SupportedLanguage,
    name
  }));
};

/**
 * Initializes i18n with browser language or saved preference
 */
export const init = (): SupportedLanguage => {
  let language: SupportedLanguage = 'en';
  
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = window.localStorage.getItem('preferred-language') as SupportedLanguage;
    language = saved && (saved in supportedLanguages) ? saved : detectBrowserLanguage();
  }
  
  return setLanguage(language);
};

// Re-export needed types and utilities
export { 
  translations, 
  supportedLanguages, 
  SupportedLanguage, 
  TranslationKey,
  rtlLanguages,
  getLanguageDirection 
};