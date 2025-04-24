import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Types
interface Language {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
}

interface Translations {
  headline: string;
  createAlbum: string;
  termsOfService: string;
  privacyPolicy: string;
  support: string;
}

// Define supported languages
const languages: Record<string, Language> = {
  "en-US": { code: "en-US", name: "English (United States)", dir: "ltr" },
  "en": { code: "en", name: "English", dir: "ltr" },
  "zh-CN": { code: "zh-CN", name: "简体中文 (中国)", dir: "ltr" },
  "zh": { code: "zh", name: "中文", dir: "ltr" },
  "fr-FR": { code: "fr-FR", name: "Français (France)", dir: "ltr" },
  "fr": { code: "fr", name: "Français", dir: "ltr" },
  "de-DE": { code: "de-DE", name: "Deutsch (Deutschland)", dir: "ltr" },
  "de": { code: "de", name: "Deutsch", dir: "ltr" },
  "es-ES": { code: "es-ES", name: "Español (España)", dir: "ltr" },
  "es": { code: "es", name: "Español", dir: "ltr" },
  "ru": { code: "ru", name: "Русский", dir: "ltr" },
  "ja": { code: "ja", name: "日本語", dir: "ltr" },
  "pt-BR": { code: "pt-BR", name: "Português (Brasil)", dir: "ltr" },
  "pt": { code: "pt", name: "Português", dir: "ltr" },
  "it": { code: "it", name: "Italiano", dir: "ltr" },
  "ko": { code: "ko", name: "한국어", dir: "ltr" },
  "ar": { code: "ar", name: "العربية", dir: "rtl" },
  "nl": { code: "nl", name: "Nederlands", dir: "ltr" },
  "tr": { code: "tr", name: "Türkçe", dir: "ltr" },
  "pl": { code: "pl", name: "Polski", dir: "ltr" },
  "sv-SE": { code: "sv-SE", name: "Svenska (Sverige)", dir: "ltr" },
  "sv": { code: "sv", name: "Svenska", dir: "ltr" },
  "he": { code: "he", name: "עברית", dir: "rtl" },
  "uk": { code: "uk", name: "Українська", dir: "ltr" },
  "th": { code: "th", name: "ไทย", dir: "ltr" },
  "vi": { code: "vi", name: "Tiếng Việt", dir: "ltr" },
  "cs": { code: "cs", name: "Čeština", dir: "ltr" },
  "ro": { code: "ro", name: "Română", dir: "ltr" },
  "fi": { code: "fi", name: "Suomi", dir: "ltr" },
  "da": { code: "da", name: "Dansk", dir: "ltr" },
  "hu": { code: "hu", name: "Magyar", dir: "ltr" },
  "id": { code: "id", name: "Bahasa Indonesia", dir: "ltr" },
  "no": { code: "no", name: "Norsk", dir: "ltr" },
  "nb": { code: "nb", name: "Norsk Bokmål", dir: "ltr" },
  "sk": { code: "sk", name: "Slovenčina", dir: "ltr" },
  "el": { code: "el", name: "Ελληνικά", dir: "ltr" },
  "hi": { code: "hi", name: "हिन्दी", dir: "ltr" },
  "fa": { code: "fa", name: "فارسی", dir: "rtl" },
  "bn": { code: "bn", name: "বাংলা", dir: "ltr" },
  "ta": { code: "ta", name: "தமிழ்", dir: "ltr" },
  "te": { code: "te", name: "తెలుగు", dir: "ltr" },
  "kn": { code: "kn", name: "ಕನ್ನಡ", dir: "ltr" },
  "ml": { code: "ml", name: "മലയാളം", dir: "ltr" },
  "mr": { code: "mr", name: "मराठी", dir: "ltr" },
  "ur": { code: "ur", name: "اردو", dir: "rtl" },
  "zh-HK": { code: "zh-HK", name: "繁體中文 (香港)", dir: "ltr" },
  "zh-TW": { code: "zh-TW", name: "繁體中文 (台灣)", dir: "ltr" },
  "af": { code: "af", name: "Afrikaans", dir: "ltr" },
  "az": { code: "az", name: "Azərbaycan", dir: "ltr" },
  "eu": { code: "eu", name: "Euskara", dir: "ltr" },
  "bg": { code: "bg", name: "Български", dir: "ltr" },
  "ca": { code: "ca", name: "Català", dir: "ltr" },
  "et": { code: "et", name: "Eesti", dir: "ltr" },
  "gl": { code: "gl", name: "Galego", dir: "ltr" },
  "gu": { code: "gu", name: "ગુજરાતી", dir: "ltr" },
  "is": { code: "is", name: "Íslenska", dir: "ltr" },
  "kk": { code: "kk", name: "Қазақша", dir: "ltr" },
  "ky": { code: "ky", name: "Кыргызча", dir: "ltr" },
  "lo": { code: "lo", name: "ລາວ", dir: "ltr" },
  "lt": { code: "lt", name: "Lietuvių", dir: "ltr" },
  "lv": { code: "lv", name: "Latviešu", dir: "ltr" },
  "mk": { code: "mk", name: "Македонски", dir: "ltr" },
  "mn": { code: "mn", name: "Монгол", dir: "ltr" },
  "ne": { code: "ne", name: "नेपाली", dir: "ltr" },
  "pa": { code: "pa", name: "ਪੰਜਾਬੀ", dir: "ltr" },
  "si": { code: "si", name: "සිංහල", dir: "ltr" },
  "sl": { code: "sl", name: "Slovenščina", dir: "ltr" },
  "sq": { code: "sq", name: "Shqip", dir: "ltr" },
  "sr": { code: "sr", name: "Српски", dir: "ltr" },
  "sw": { code: "sw", name: "Kiswahili", dir: "ltr" },
  "tg": { code: "tg", name: "Тоҷикӣ", dir: "ltr" },
  "tl": { code: "tl", name: "Tagalog", dir: "ltr" },
  "uz": { code: "uz", name: "O'zbek", dir: "ltr" },
  "xh": { code: "xh", name: "isiXhosa", dir: "ltr" },
  "yo": { code: "yo", name: "Yorùbá", dir: "ltr" },
  "zu": { code: "zu", name: "isiZulu", dir: "ltr" },
  "am": { code: "am", name: "አማርኛ", dir: "ltr" },
  "ha": { code: "ha", name: "Hausa", dir: "ltr" },
  "ig": { code: "ig", name: "Igbo", dir: "ltr" },
  "jv": { code: "jv", name: "Jawa", dir: "ltr" },
  "km": { code: "km", name: "ខ្មែរ", dir: "ltr" },
  "my": { code: "my", name: "မြန်မာ", dir: "ltr" },
  "or": { code: "or", name: "ଓଡ଼ିଆ", dir: "ltr" },
  "ps": { code: "ps", name: "پښتو", dir: "rtl" },
  "sd": { code: "sd", name: "سنڌي", dir: "rtl" },
  "so": { code: "so", name: "Soomaali", dir: "ltr" },
  "as": { code: "as", name: "অসমীয়া", dir: "ltr" },
  "bho": { code: "bho", name: "भोजपुरी", dir: "ltr" },
  "br": { code: "br", name: "Brezhoneg", dir: "ltr" },
  "eo": { code: "eo", name: "Esperanto", dir: "ltr" },
  "fy": { code: "fy", name: "Frysk", dir: "ltr" },
  "ga": { code: "ga", name: "Gaeilge", dir: "ltr" },
  "gd": { code: "gd", name: "Gàidhlig", dir: "ltr" },
  "mi": { code: "mi", name: "Māori", dir: "ltr" },
  "mt": { code: "mt", name: "Malti", dir: "ltr" },
  "nn": { code: "nn", name: "Norsk Nynorsk", dir: "ltr" },
  "rw": { code: "rw", name: "Kinyarwanda", dir: "ltr" },
  "sa": { code: "sa", name: "संस्कृतम्", dir: "ltr" },
  "sm": { code: "sm", name: "Samoan", dir: "ltr" },
  "st": { code: "st", name: "Sesotho", dir: "ltr" }
};

// Define translations
const translations: Record<string, Translations> = {
  "en-US": {
    headline: "Create Albums To Share With Others",
    createAlbum: "Create Album",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    support: "Support"
  },
  "en": {
    headline: "Create Albums To Share With Others",
    createAlbum: "Create Album",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    support: "Support"
  },
  "zh-CN": {
    headline: "创建相册与他人分享",
    createAlbum: "创建相册",
    termsOfService: "服务条款",
    privacyPolicy: "隐私政策",
    support: "支持"
  },
  "zh": {
    headline: "创建相册与他人分享",
    createAlbum: "创建相册",
    termsOfService: "服务条款",
    privacyPolicy: "隐私政策",
    support: "支持"
  },
  "fr-FR": {
    headline: "Créez des albums à partager avec d'autres",
    createAlbum: "Créer un album",
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    support: "Assistance"
  },
  "fr": {
    headline: "Créez des albums à partager avec d'autres",
    createAlbum: "Créer un album",
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: "Politique de confidentialité",
    support: "Assistance"
  },
  "de-DE": {
    headline: "Erstellen Sie Alben zum Teilen mit anderen",
    createAlbum: "Album erstellen",
    termsOfService: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    support: "Hilfe"
  },
  "de": {
    headline: "Erstellen Sie Alben zum Teilen mit anderen",
    createAlbum: "Album erstellen",
    termsOfService: "Nutzungsbedingungen",
    privacyPolicy: "Datenschutzrichtlinie",
    support: "Hilfe"
  },
  "es-ES": {
    headline: "Crea álbumes para compartir con otros",
    createAlbum: "Crear álbum",
    termsOfService: "Términos de servicio",
    privacyPolicy: "Política de privacidad",
    support: "Soporte"
  },
  "es": {
    headline: "Crea álbumes para compartir con otros",
    createAlbum: "Crear álbum",
    termsOfService: "Términos de servicio",
    privacyPolicy: "Política de privacidad",
    support: "Soporte"
  },
  "ru": {
    headline: "Создавайте альбомы для обмена с другими",
    createAlbum: "Создать альбом",
    termsOfService: "Условия использования",
    privacyPolicy: "Политика конфиденциальности",
    support: "Поддержка"
  },
  "ja": {
    headline: "他の人と共有するアルバムを作成",
    createAlbum: "アルバムを作成",
    termsOfService: "利用規約",
    privacyPolicy: "プライバシーポリシー",
    support: "サポート"
  },
  "pt-BR": {
    headline: "Crie álbuns para compartilhar com outros",
    createAlbum: "Criar álbum",
    termsOfService: "Termos de serviço",
    privacyPolicy: "Política de privacidade",
    support: "Suporte"
  },
  "pt": {
    headline: "Crie álbuns para partilhar com outros",
    createAlbum: "Criar álbum",
    termsOfService: "Termos de serviço",
    privacyPolicy: "Política de privacidade",
    support: "Suporte"
  },
  "it": {
    headline: "Crea album da condividere con altri",
    createAlbum: "Crea album",
    termsOfService: "Termini di servizio",
    privacyPolicy: "Informativa sulla privacy",
    support: "Supporto"
  },
  "ko": {
    headline: "다른 사람과 공유할 앨범 만들기",
    createAlbum: "앨범 만들기",
    termsOfService: "서비스 약관",
    privacyPolicy: "개인정보 처리방침",
    support: "지원"
  },
  "ar": {
    headline: "إنشاء ألبومات للمشاركة مع الآخرين",
    createAlbum: "إنشاء ألبوم",
    termsOfService: "شروط الخدمة",
    privacyPolicy: "سياسة الخصوصية",
    support: "الدعم"
  },
  "nl": {
    headline: "Maak albums om te delen met anderen",
    createAlbum: "Album maken",
    termsOfService: "Servicevoorwaarden",
    privacyPolicy: "Privacybeleid",
    support: "Ondersteuning"
  },
  "tr": {
    headline: "Başkalarıyla paylaşmak için albümler oluşturun",
    createAlbum: "Albüm oluştur",
    termsOfService: "Hizmet şartları",
    privacyPolicy: "Gizlilik politikası",
    support: "Destek"
  },
  "hi": {
    headline: "दूसरों के साथ साझा करने के लिए एल्बम बनाएं",
    createAlbum: "एल्बम बनाएं",
    termsOfService: "सेवा की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    support: "सहायता"
  },
  "he": {
    headline: "צור אלבומים לשיתוף עם אחרים",
    createAlbum: "צור אלבום",
    termsOfService: "תנאי שירות",
    privacyPolicy: "מדיניות פרטיות",
    support: "תמיכה"
  }
  // Additional languages can be added as needed
};

// CSS Styles as JavaScript object
const styles = {
  body: {
    fontFamily: 'sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    marginBottom: '10px'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logoContainerRTL: {
    flexDirection: 'row-reverse' as const
  },
  appName: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#222',
    marginLeft: '10px'
  },
  appNameRTL: {
    marginRight: '10px',
    marginLeft: 0
  },
  logo: {
    height: '32px'
  },
  languageSelector: {
    position: 'relative' as const,
    display: 'inline-block'
  },
  languageButton: {
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  languageOptions: {
    display: 'none',
    position: 'absolute' as const,
    right: 0,
    backgroundColor: 'white',
    minWidth: '200px',
    maxHeight: '300px',
    overflowY: 'auto' as const,
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
    borderRadius: '4px'
  },
  languageOptionsRTL: {
    left: 0,
    right: 'auto'
  },
  languageOptionsShow: {
    display: 'block'
  },
  languageOption: {
    color: 'black',
    padding: '8px 12px',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'left' as const
  },
  languageOptionRTL: {
    textAlign: 'right' as const
  },
  languageOptionHover: {
    backgroundColor: '#f1f1f1'
  },
  content: {
    flex: 1,
    textAlign: 'center' as const,
    padding: '20px'
  },
  headline: {
    fontSize: '1.8em',
    margin: '40px 0'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    maxWidth: '300px',
    margin: '0 auto'
  },
  button: {
    padding: '12px 20px',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1em',
    cursor: 'pointer',
    textAlign: 'center' as const,
    display: 'inline-block'
  },
  buttonPrimary: {
    backgroundColor: '#007bff',
    color: 'white'
  },
  buttonPrimaryHover: {
    backgroundColor: '#0056b3',
  },
  footer: {
    textAlign: 'center' as const,
    padding: '20px',
    fontSize: '0.9em',
    color: '#555'
  },
  footerLink: {
    margin: '0 10px',
    color: '#555',
    textDecoration: 'none'
  },
  footerLinkHover: {
    textDecoration: 'underline'
  }
};

const IndexPage: React.FC = () => {
  // State
  const [currentLang, setCurrentLang] = useState<string>("en-US");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [hoverButtonIndex, setHoverButtonIndex] = useState<number | null>(null);

  // Get translation function
  const getTranslation = (langCode: string): Translations => {
    // If translation doesn't exist, fall back to generic or English
    let translationSet = translations[langCode];
    
    // If specific language version doesn't exist, try generic
    if (!translationSet) {
      const genericLang = langCode.split('-')[0];
      translationSet = translations[genericLang];
    }
    
    // If still no translation, use English
    if (!translationSet) {
      translationSet = translations["en"];
    }
    
    return translationSet;
  };

  // Change language function
  const changeLanguage = (langCode: string) => {
    // Update current language
    setCurrentLang(langCode);
    
    // Set language in HTML attributes
    document.documentElement.lang = langCode;
    
    // Set direction (RTL/LTR)
    const dir = languages[langCode].dir;
    document.documentElement.dir = dir;
    
    // Save preference
    localStorage.setItem("user_language", langCode);
    
    // Hide dropdown
    setShowDropdown(false);
  };

  // Toggle language dropdown
  const toggleLanguageDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Go to albums page
  const goToAlbums = () => {
    // Pass the language parameter to the next page
    window.location.href = `/my-albums.html?lang=${currentLang}`;
  };

  // Initialize language on component mount
  useEffect(() => {
    // Function to load saved language preference
    const loadLanguagePreference = () => {
      const savedLang = localStorage.getItem("user_language");
      if (savedLang && languages[savedLang]) {
        changeLanguage(savedLang);
      } else {
        // Try to detect browser language
        detectBrowserLanguage();
      }
    };
    
    // Detect browser language
    const detectBrowserLanguage = () => {
      const browserLang = navigator.language; // Using the correct property
      
      // Check if we have an exact match
      if (languages[browserLang]) {
        changeLanguage(browserLang);
        return;
      }
      
      // Check if we have a generic match (e.g., "en" for "en-US")
      const genericLang = browserLang.split('-')[0];
      if (languages[genericLang]) {
        changeLanguage(genericLang);
        return;
      }
      
      // Default to English
      changeLanguage("en-US");
    };

    loadLanguagePreference();
    
    // Add event listener to close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-button') && !target.closest('.language-options')) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current translations
  const t = getTranslation(currentLang);
  
  // Check if RTL
  const isRTL = languages[currentLang]?.dir === 'rtl';

  return (
    <div style={styles.body}>
      <div style={styles.header}>
        <div style={{
          ...styles.logoContainer,
          ...(isRTL ? styles.logoContainerRTL : {})
        }}>
          <img 
            src="images/logo_no_background.png" 
            alt="6180 Logo" 
            style={styles.logo}
          />
          <div style={{
            ...styles.appName,
            ...(isRTL ? styles.appNameRTL : {})
          }}>
            6180
          </div>
        </div>
        <div style={styles.languageSelector}>
          <button 
            className="language-button"
            style={styles.languageButton}
            onClick={toggleLanguageDropdown}
          >
            <span>{languages[currentLang]?.name || "English"}</span>
            <span>▼</span>
          </button>
          <div 
            style={{
              ...styles.languageOptions,
              ...(showDropdown ? styles.languageOptionsShow : {}),
              ...(isRTL ? styles.languageOptionsRTL : {})
            }}
          >
            {Object.values(languages)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((lang) => (
                <a
                  key={lang.code}
                  href="#"
                  style={{
                    ...styles.languageOption,
                    ...(isRTL ? styles.languageOptionRTL : {}),
                    ...(hoverLink === lang.code ? styles.languageOptionHover : {})
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    changeLanguage(lang.code);
                  }}
                  onMouseEnter={() => setHoverLink(lang.code)}
                  onMouseLeave={() => setHoverLink(null)}
                >
                  {lang.name}
                </a>
              ))
            }
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <h1 style={styles.headline}>{t.headline}</h1>
        
        <div style={styles.buttonGroup}>
          <button 
            style={{
              ...styles.button, 
              ...styles.buttonPrimary,
              ...(hoverButtonIndex === 0 ? styles.buttonPrimaryHover : {})
            }}
            onClick={goToAlbums}
            onMouseEnter={() => setHoverButtonIndex(0)}
            onMouseLeave={() => setHoverButtonIndex(null)}
          >
            {t.createAlbum}
          </button>
        </div>
      </div>

      <div style={styles.footer}>
        <a 
          href="terms.html" 
          style={{
            ...styles.footerLink,
            ...(hoverLink === 'terms' ? styles.footerLinkHover : {})
          }}
          onMouseEnter={() => setHoverLink('terms')}
          onMouseLeave={() => setHoverLink(null)}
        >
          {t.termsOfService}
        </a>
        <a 
          href="privacy.html" 
          style={{
            ...styles.footerLink,
            ...(hoverLink === 'privacy' ? styles.footerLinkHover : {})
          }}
          onMouseEnter={() => setHoverLink('privacy')}
          onMouseLeave={() => setHoverLink(null)}
        >
          {t.privacyPolicy}
        </a>
        <a 
          href="support.html" 
          style={{
            ...styles.footerLink,
            ...(hoverLink === 'support' ? styles.footerLinkHover : {})
          }}
          onMouseEnter={() => setHoverLink('support')}
          onMouseLeave={() => setHoverLink(null)}
        >
          {t.support}
        </a>
      </div>
    </div>
  );
};

// Initialize the app
ReactDOM.createRoot(document.getElementById("root")!).render(<IndexPage />);