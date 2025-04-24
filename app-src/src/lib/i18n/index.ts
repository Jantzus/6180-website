// src/lib/i18n/index.ts
import { translations, supportedLanguages } from '@/lib/i18n/translations';
import type { EnglishPhrase, SupportedLanguage } from '@/lib/i18n/translations';

// Current language - defaults to English
let currentLanguage: SupportedLanguage = 'en';

/**
 * Sets the active language
 */
export const setLanguage = (lang: string): void => {
  if (lang === 'en' || lang in supportedLanguages) {
    currentLanguage = lang as SupportedLanguage;
  } else {
    console.warn(`Language ${lang} not supported, falling back to en`);
    currentLanguage = 'en';
  }
};

/**
 * Translates an English phrase to the current language
 */
export const translate = (phrase: EnglishPhrase): string => {
  // If we're using English, just return the phrase itself
  if (currentLanguage === 'en') {
    return phrase;
  }
  
  // Look up translation in the current language
  const translationsByLanguage = translations[phrase];
  if (translationsByLanguage && currentLanguage in translationsByLanguage) {
    return translationsByLanguage[currentLanguage];
  }
  
  // Return original English phrase as fallback
  return phrase;
};

/**
 * Detects the browser language
 */
export const detectBrowserLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return 'en';
  }
  
  const browserLang = window.navigator.language.split('-')[0] as SupportedLanguage;
  return (browserLang in supportedLanguages) ? browserLang : 'en';
};

/**
 * Initializes i18n with browser language or saved preference
 */
export const initializeI18n = (): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedLang = window.localStorage.getItem('preferred-language') as SupportedLanguage;
    if (savedLang && (savedLang in supportedLanguages)) {
      setLanguage(savedLang);
      return;
    }
  }
  
  setLanguage(detectBrowserLanguage());
};

/**
 * Gets all available languages for selectors
 */
export const getAvailableLanguages = (): Array<{ code: SupportedLanguage; name: string }> => {
  return Object.entries(supportedLanguages).map(([code, name]) => ({
    code: code as SupportedLanguage,
    name
  }));
};

// Expose everything needed
export { translations, EnglishPhrase, supportedLanguages, SupportedLanguage };
export default {
  translate,
  setLanguage,
  detectBrowserLanguage,
  initializeI18n,
  getAvailableLanguages,
  supportedLanguages
};