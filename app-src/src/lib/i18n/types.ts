// src/lib/i18n/types.ts
import { createContext } from 'react';
import type { SupportedLanguage } from '@/lib/i18n/translations';

// Create a context for i18n in React
export interface I18nContextType {
  t: (key: string, params?: Record<string, string | number>) => string;
  loadTranslation: (
    key: string, 
    callback: (translation: string) => void,
    params?: Record<string, string | number>
  ) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => Promise<void>;
  languages: Array<{ code: SupportedLanguage; name: string }>;
  loading: boolean;
  isSSR: boolean;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);