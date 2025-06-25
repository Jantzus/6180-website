// src/lib/i18n/checkTranslations.ts
// This is a utility script to validate that translation files are accessible

/**
 * SSR-safe function to check if all translation files can be loaded
 * Should only be called on the client-side (e.g., in useEffect)
 */
export const checkTranslationFiles = async () => {
  // Guard against SSR
  if (typeof window === 'undefined') {
    console.warn('checkTranslationFiles called during SSR - skipping');
    return;
  }
  
  console.group('Translation Files Check');
  
  // List of languages to check
  const languages = ['en', 'fr', 'es', 'zh', 'ja', 'de', 'ru'];
  
  console.log('Testing access to translation JSON files...');
  
  for (const lang of languages) {
    try {
      console.log(`Attempting to load ${lang}.json...`);
      
      // Try to load the file
      const module = await import(/* @vite-ignore */ `@/lib/i18n/translations/${lang}.json`);
      
      // Check if it loaded correctly
      if (module && typeof module === 'object') {
        const count = Object.keys(module).length;
        console.log(`✅ Successfully loaded ${lang}.json with ${count} translations`);
      } else {
        console.error(`❌ ${lang}.json loaded but has invalid format:`, module);
      }
    } catch (error) {
      console.error(`❌ Failed to load ${lang}.json:`, error);
    }
  }
  
  console.log('Translation check complete');
  console.groupEnd();
};

/**
 * SSR-safe function to check a specific translation key across all languages
 * Should only be called on the client-side (e.g., in useEffect)
 */
export const checkTranslationKey = async (key: string) => {
  // Guard against SSR
  if (typeof window === 'undefined') {
    console.warn('checkTranslationKey called during SSR - skipping');
    return;
  }
  
  console.group(`Checking Translation Key: "${key}"`);
  
  // List of languages to check
  const languages = ['en', 'fr', 'es', 'zh', 'ja', 'de', 'ru'];
  
  for (const lang of languages) {
    try {
      const module = await import(/* @vite-ignore */ `@/lib/i18n/translations/${lang}.json`);
      
      if (module && typeof module === 'object') {
        if (key in module) {
          console.log(`✅ ${lang}: "${module[key]}"`);
        } else {
          console.warn(`⚠️ ${lang}: Key not found`);
        }
      } else {
        console.error(`❌ ${lang}: Invalid format`);
      }
    } catch (error) {
      console.error(`❌ ${lang}: Failed to load file:`, error);
    }
  }
  
  console.groupEnd();
};

/**
 * React hook for checking translations safely in components
 * This handles SSR automatically and only runs on client-side
 */
export const useTranslationChecker = () => {
  // Return SSR-safe functions that can be called anytime
  return {
    checkFiles: async () => {
      if (typeof window !== 'undefined') {
        await checkTranslationFiles();
      }
    },
    checkKey: async (key: string) => {
      if (typeof window !== 'undefined') {
        await checkTranslationKey(key);
      }
    }
  };
};

// Example usage in a React component:
// import { useTranslationChecker } from '@/lib/i18n/checkTranslations';
// 
// const MyComponent = () => {
//   const { checkFiles, checkKey } = useTranslationChecker();
//   
//   useEffect(() => {
//     checkFiles();
//     checkKey('Create Albums Together');
//   }, []);
//   
//   return <div>...</div>;
// };