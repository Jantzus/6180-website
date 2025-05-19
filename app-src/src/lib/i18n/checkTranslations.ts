// src/lib/i18n/checkTranslations.ts
// This is a utility script to validate that translation files are accessible

/**
 * Run this function to check if all translation files can be loaded
 */
export const checkTranslationFiles = async () => {
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
 * Run this to check a specific translation key across all languages
 */
export const checkTranslationKey = async (key: string) => {
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

// To use these functions, import them and call them from your component:
// import { checkTranslationFiles, checkTranslationKey } from '@/lib/i18n/checkTranslations';
// 
// useEffect(() => {
//   checkTranslationFiles();
//   checkTranslationKey('Create Albums Together');
// }, []);