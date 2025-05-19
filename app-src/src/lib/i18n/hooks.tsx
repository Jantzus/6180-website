// src/lib/i18n/hooks.tsx
import { useContext, useState, useEffect } from 'react';
import { I18nContext } from './context';

// Hook to use translations in components
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};

// Hook for asynchronous translations with automatic state management
export const useAsyncTranslation = (key: string, params?: Record<string, string | number>) => {
  const { tAsync, language } = useTranslation();
  const [translation, setTranslation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    
    async function loadTranslation() {
      setLoading(true);
      try {
        const result = await tAsync(key, params);
        if (mounted) {
          setTranslation(result);
        }
      } catch (error) {
        console.error(`Failed to load translation for key: ${key}`, error);
        if (mounted) {
          setTranslation(key); // Fallback to the key itself
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }
    
    loadTranslation();
    
    return () => {
      mounted = false;
    };
  }, [key, params, language, tAsync]);

  return { translation, loading };
};