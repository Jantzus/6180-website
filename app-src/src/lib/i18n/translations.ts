// src/lib/i18n/translations.ts
// Define translations object
export const translations: Record<string, Record<string, string>> = {
  'Welcome': {
    'es': 'Bienvenido',
    'fr': 'Bienvenue',
    // other languages...
  },
  // other phrases...
};

// Use explicit 'export type' for type exports
export type EnglishPhrase = keyof typeof translations;

// Export the supported languages object
export const supportedLanguages = {
  'en': 'English',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
};

// Use explicit 'export type' for type aliases
export type SupportedLanguage = keyof typeof supportedLanguages;