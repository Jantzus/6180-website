// src/lib/i18n/translations.ts
// Define translations object with a phrase-first approach
export const translations: Record<string, Record<string, string>> = {
  // Original example
  'Welcome': {
    'es': 'Bienvenido',
    'fr': 'Bienvenue',
    'de': 'Willkommen',
  },
  
  // UI Elements
  'Columns:': {
    'es': 'Columnas:',
    'fr': 'Colonnes:',
    'de': 'Spalten:',
    'ja': '列数:',
  },
  'Save': {
    'es': 'Guardar',
    'fr': 'Enregistrer',
    'de': 'Speichern',
    'ja': '保存',
  },
  'Loading album...': {
    'es': 'Cargando álbum...',
    'fr': 'Chargement de l\'album...',
    'de': 'Album wird geladen...',
    'ja': 'アルバムを読み込み中...',
  },
  'Loading album content...': {
    'es': 'Cargando contenido del álbum...',
    'fr': 'Chargement du contenu de l\'album...',
    'de': 'Albuminhalt wird geladen...',
    'ja': 'アルバムのコンテンツを読み込み中...',
  },
  'Photos': {
    'es': 'Fotos',
    'fr': 'Photos',
    'de': 'Fotos',
    'ja': '写真',
  },
  
  // Error messages
  'No media found in this album': {
    'es': 'No se encontraron medios en este álbum',
    'fr': 'Aucun média trouvé dans cet album',
    'de': 'Keine Medien in diesem Album gefunden',
    'ja': 'このアルバムにメディアが見つかりません',
  },
  'Error Loading Album': {
    'es': 'Error al cargar el álbum',
    'fr': 'Erreur de chargement de l\'album',
    'de': 'Fehler beim Laden des Albums',
    'ja': 'アルバムの読み込みエラー',
  },
  'Please try refreshing the page or contact support if the problem persists.': {
    'es': 'Intente actualizar la página o póngase en contacto con el soporte si el problema persiste.',
    'fr': 'Veuillez actualiser la page ou contacter le support si le problème persiste.',
    'de': 'Bitte aktualisieren Sie die Seite oder wenden Sie sich an den Support, wenn das Problem weiterhin besteht.',
    'ja': 'ページを更新するか、問題が解決しない場合はサポートに連絡してください。',
  },
  'Refresh Page': {
    'es': 'Actualizar página',
    'fr': 'Actualiser la page',
    'de': 'Seite aktualisieren',
    'ja': 'ページを更新',
  },
};

// Use explicit 'export type' for type exports
export type EnglishPhrase = keyof typeof translations;

// Export the supported languages object
export const supportedLanguages = {
  'en': 'English',
  'es': 'Español',
  'fr': 'Français',
  'de': 'Deutsch',
  'ja': '日本語',
  'zh': '中文',
  'ko': '한국어',
  'ru': 'Русский',
  'pt': 'Português',
  'it': 'Italiano',
  'nl': 'Nederlands',
  'ar': 'العربية',
  'hi': 'हिन्दी',
  'tr': 'Türkçe',
};

// Use explicit 'export type' for type aliases
export type SupportedLanguage = keyof typeof supportedLanguages;