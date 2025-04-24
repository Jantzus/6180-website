// src/lib/i18n/html.ts
import { 
  EnglishPhrase, 
  translate, 
  setLanguage, 
  detectBrowserLanguage, 
  initializeI18n,
  getAvailableLanguages,
  SupportedLanguage,
  translations
} from './index';

// Initialize i18n when the script loads
initializeI18n();

/**
 * Translates all elements with i18n data attributes in the page
 */
export const translatePage = (): void => {
  if (typeof document === 'undefined') return;

  // Find all elements with data-i18n attribute
  const elements = document.querySelectorAll('[data-i18n]');
  
  elements.forEach(element => {
    const phrase = element.getAttribute('data-i18n');
    if (phrase && isValidPhrase(phrase)) {
      element.textContent = translate(phrase as EnglishPhrase);
    }
  });

  // Handle placeholders in input elements
  const inputElements = document.querySelectorAll('[data-i18n-placeholder]');
  inputElements.forEach(element => {
    const phrase = element.getAttribute('data-i18n-placeholder');
    if (phrase && isValidPhrase(phrase) && element instanceof HTMLInputElement) {
      element.placeholder = translate(phrase as EnglishPhrase);
    }
  });

  // Handle attributes like title, alt, etc.
  const attrElements = document.querySelectorAll('[data-i18n-attr]');
  attrElements.forEach(element => {
    const attrData = element.getAttribute('data-i18n-attr');
    if (attrData) {
      try {
        const [attr, phrase] = attrData.split(':');
        if (attr && phrase && isValidPhrase(phrase)) {
          element.setAttribute(attr, translate(phrase as EnglishPhrase));
        }
      } catch (e) {
        console.error('Invalid data-i18n-attr format', attrData);
      }
    }
  });
};

// Helper to check if a phrase is valid
function isValidPhrase(phrase: string): boolean {
  // Check if the phrase exists in our translations object
  return phrase in translations || phrase.trim() !== '';
}

/**
 * Creates a language selector in the specified container
 */
export const createLanguageSelector = (targetId: string): void => {
  if (typeof document === 'undefined') return;

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  // Get current language
  const currentLang = localStorage.getItem('preferred-language') || detectBrowserLanguage();

  // Create the selector
  const select = document.createElement('select');
  select.id = 'language-selector';
  select.className = 'language-selector';
  // Add some styling for better visibility
  select.style.position = 'fixed';
  select.style.bottom = '20px';
  select.style.right = '20px';
  select.style.zIndex = '1000';
  select.style.padding = '8px';
  select.style.borderRadius = '4px';
  select.style.border = '1px solid #ccc';
  
  // Add options
  getAvailableLanguages().forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    select.appendChild(option);
  });
  
  // Set current value
  select.value = currentLang as string;
  
  // Add event listener
  select.addEventListener('change', (e) => {
    const newLanguage = (e.target as HTMLSelectElement).value as SupportedLanguage;
    setLanguage(newLanguage);
    
    // Save preference
    localStorage.setItem('preferred-language', newLanguage);
    
    // Apply RTL/LTR direction based on language
    setDirectionForLanguage(newLanguage);
    
    // Translate the page again
    translatePage();
  });
  
  // Clear and append
  targetElement.innerHTML = '';
  targetElement.appendChild(select);
};

/**
 * Sets the text direction (LTR/RTL) based on the language
 */
export const setDirectionForLanguage = (langCode: string): void => {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
  const baseCode = langCode.split('-')[0];
  
  if (rtlLanguages.includes(baseCode)) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
};

/**
 * Exposes i18n functions globally for HTML pages
 */
export const exposeGlobally = (): void => {
  if (typeof window !== 'undefined') {
    (window as any).i18n = {
      translate,
      setLanguage,
      translatePage,
      createLanguageSelector,
      getAvailableLanguages,
      detectBrowserLanguage,
      initializeI18n,
      setDirectionForLanguage
    };
  }
};

// Auto-initialization
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize with saved language if available
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang) {
      setLanguage(savedLang as SupportedLanguage);
    }

    // Set language direction
    setDirectionForLanguage(savedLang || detectBrowserLanguage());
    
    // Set document language attribute
    document.documentElement.setAttribute('lang', savedLang || detectBrowserLanguage());

    // Translate the page on load
    translatePage();

    // Create language selector if target element exists
    createLanguageSelector('language-selector-container');
    
    // Expose functions globally
    exposeGlobally();
  });
}

// Export for explicit imports
export { translate, getAvailableLanguages };