// COMBINED i18n MODULE - index.ts
import React, { createContext, useState, ReactNode, useContext } from 'react';

// ============================
// PART 1: Language Definitions
// ============================

// Define supported languages
export const supportedLanguages = {
  "aa": "Afaraf",
  "ab": "Аҧсуа",
  "ace": "Acèh",
  "ady": "Адыгабзэ",
  "af": "Afrikaans",
  "ak": "Akan",
  "als": "Alemannisch",
  "am": "አማርኛ",
  "an": "Aragonés",
  "ang": "Ænglisc",
  "ar": "العربية",
  "arc": "ܐܪܡܝܐ",
  "arz": "مصرى",
  "as": "অসমীয়া",
  "ast": "Asturianu",
  "av": "Авар мацӀ",
  "ay": "Aymar aru",
  "az": "Azərbaycan dili",
  "ba": "Башҡорт теле",
  "bar": "Boarisch",
  "bat-smg": "Žemaitėška",
  "bcl": "Bikol Central",
  "be-x-old": "Беларуская (тарашкевіца)",
  "be": "Беларуская",
  "bg": "Български",
  "bh": "भोजपुरी",
  "bho": "भोजपुरी",
  "bi": "Bislama",
  "bjn": "Bahasa Banjar",
  "bm": "Bamanankan",
  "bn": "বাংলা",
  "bo": "བོད་ཡིག",
  "bpy": "বিষ্ণুপ্রিয়া মণিপুরী",
  "br": "Brezhoneg",
  "brx": "बड़ो",
  "bs": "Bosanski",
  "bug": "ᨅᨔ ᨕᨘᨁᨗ",
  "bxr": "Буряад хэлэн",
  "ca": "Català",
  "cbk-zam": "Chavacano",
  "cdo": "閩東語",
  "ce": "Нохчийн мотт",
  "ceb": "Sinugboanong Binisaya",
  "ch": "Chamoru",
  "cho": "Chahta",
  "chr": "ᏣᎳᎩ",
  "chy": "Tsėhésenėstsestotse",
  "ckb": "کوردیی ناوەندی",
  "co": "Corsu",
  "cr": "ᓀᐦᐃᔭᐍᐏᐣ",
  "crh": "Qırımtatarca",
  "cs": "Čeština",
  "csb": "Kaszëbsczi",
  "cu": "Ѩзыкъ словѣньскъ",
  "cv": "Чӑваш чӗлхи",
  "cy": "Cymraeg",
  "da": "Dansk",
  "de": "Deutsch",
  "diq": "Zazaki",
  "doi": "डोगरी",
  "dsb": "Dolnoserbski",
  "dv": "ދިވެހިބަސް",
  "dz": "རྫོང་ཁ",
  "ee": "Eʋegbe",
  "el": "Ελληνικά",
  "eml": "Emiliàn e rumagnòl",
  "en": "English",
  "eo": "Esperanto",
  "es": "Español",
  "et": "Eesti",
  "eu": "Euskara",
  "ext": "Estremeñu",
  "fa": "فارسی",
  "ff": "Fulfulde",
  "fi": "Suomi",
  "fiu-vro": "Võro",
  "fj": "Vosa Vakaviti",
  "fo": "Føroyskt",
  "fr": "Français",
  "frp": "Arpitan",
  "frr": "Nordfriisk",
  "fur": "Furlan",
  "fy": "Frysk",
  "ga": "Gaeilge",
  "gag": "Gagauz dili",
  "gan": "赣语",
  "gd": "Gàidhlig",
  "gl": "Galego",
  "glk": "گیلکی",
  "gn": "Avañe'ẽ",
  "gom": "गोंयची कोंकणी / Gõychi Konknni",
  "got": "𐌲𐌿𐍄𐌹𐍃𐌺",
  "grt": "Garo",
  "gu": "ગુજરાતી",
  "gv": "Gaelg",
  "ha": "Hausa",
  "hak": "客家語/Hak-kâ-ngî",
  "haw": "ʻŌlelo Hawaiʻi",
  "he": "עברית",
  "hi": "हिन्दी",
  "hif": "Fiji Hindi",
  "hne": "छत्तीसगढ़ी",
  "ho": "Hiri Motu",
  "hr": "Hrvatski",
  "hsb": "Hornjoserbsce",
  "ht": "Kreyòl ayisyen",
  "hu": "Magyar",
  "hy": "Հայերեն",
  "hz": "Otjiherero",
  "ia": "Interlingua",
  "id": "Bahasa Indonesia",
  "ie": "Interlingue",
  "ig": "Asụsụ Igbo",
  "ii": "ꆈꌠ꒿ Nuosuhxop",
  "ik": "Iñupiaq",
  "ilo": "Ilokano",
  "inh": "ГӀалгӀай мотт",
  "io": "Ido",
  "is": "Íslenska",
  "it": "Italiano",
  "iu": "ᐃᓄᒃᑎᑐᑦ",
  "ja": "日本語",
  "jam": "Patois",
  "jbo": "Lojban",
  "jv": "Basa Jawa",
  "ka": "ქართული",
  "kaa": "Qaraqalpaqsha",
  "kab": "Taqbaylit",
  "kbd": "Адыгэбзэ",
  "kg": "Kikongo",
  "kha": "Ka Khasi",
  "ki": "Gĩkũyũ",
  "kj": "Kuanyama",
  "kk": "Қазақ тілі",
  "kl": "Kalaallisut",
  "km": "ភាសាខ្មែរ",
  "kn": "ಕನ್ನಡ",
  "ko": "한국어",
  "koi": "Перем коми",
  "kok": "कोंकणी",
  "kr": "Kanuri",
  "krc": "Къарачай-малкъар",
  "ks": "कश्मीरी / كشميري",
  "ksh": "Ripoarisch",
  "ku": "Kurdî",
  "kv": "Коми кыв",
  "kw": "Kernewek",
  "ky": "Кыргызча",
  "la": "Latina",
  "lad": "Ladino",
  "lb": "Lëtzebuergesch",
  "lbe": "Лакку",
  "lez": "Лезги чӀал",
  "lg": "Luganda",
  "li": "Limburgs",
  "lij": "Ligure",
  "lmo": "Lombard",
  "ln": "Lingála",
  "lo": "ພາສາລາວ",
  "lrc": "لۊری شومالی",
  "lt": "Lietuvių",
  "ltg": "Latgaļu",
  "lus": "Mizo ṭawng",
  "lv": "Latviešu",
  "mag": "मगही",
  "mai": "मैथिली",
  "map-bms": "Basa Banyumasan",
  "mdf": "Мокшень кяль",
  "mg": "Malagasy",
  "mh": "Kajin M̧ajeļ",
  "mhr": "Олык марий",
  "mi": "Te Reo Māori",
  "min": "Baso Minangkabau",
  "mk": "Македонски",
  "ml": "മലയാളം",
  "mn": "Монгол хэл",
  "mni": "ꯃꯅꯤꯄꯨꯔꯤ",
  "mo": "Moldovenească",
  "mr": "मराठी",
  "mrj": "Кырык мары",
  "ms": "Bahasa Melayu",
  "mt": "Malti",
  "mus": "Mvskoke",
  "mwl": "Mirandés",
  "mwr": "मारवाड़ी",
  "my": "မြန်မာဘာသာ",
  "myv": "Эрзянь кель",
  "mzn": "مازِرونی",
  "na": "Dorerin Naoero",
  "nah": "Nāhuatl",
  "nap": "Nnapulitano",
  "nds-nl": "Nedersaksisch",
  "nds": "Plattdüütsch",
  "ne": "नेपाली",
  "new": "नेपाल भाषा",
  "ng": "Oshiwambo",
  "nl": "Nederlands",
  "nn": "Norsk nynorsk",
  "no": "Norsk bokmål",
  "nov": "Novial",
  "nrm": "Normaund",
  "nso": "Sesotho sa Leboa",
  "nv": "Diné bizaad",
  "ny": "ChiCheŵa",
  "oc": "Occitan",
  "olo": "Livvinkarjala",
  "om": "Afaan Oromoo",
  "or": "ଓଡ଼ିଆ",
  "os": "Ирон æвзаг",
  "pa": "ਪੰਜਾਬੀ",
  "pag": "Pangasinan",
  "pam": "Kapampangan",
  "pap": "Papiamentu",
  "pcd": "Picard",
  "pdc": "Deitsch",
  "pfl": "Pfälzisch",
  "pi": "Pāli",
  "pih": "Norfuk",
  "pl": "Polski",
  "pms": "Piemontèis",
  "pnb": "پنجابی",
  "pnt": "Ποντιακά",
  "ps": "پښتو",
  "pt": "Português",
  "qu": "Runa Simi",
  "rm": "Rumantsch",
  "rmy": "Romani",
  "rn": "Ikirundi",
  "ro": "Română",
  "roa-rup": "Armãneashce",
  "roa-tara": "Tarantino",
  "ru": "Русский",
  "rue": "Русиньскый",
  "rw": "Kinyarwanda",
  "sa": "संस्कृतम्",
  "sah": "Саха тыла",
  "sat": "ᱥᱟᱱᱛᱟᱲᱤ",
  "sc": "Sardu",
  "scn": "Sicilianu",
  "sco": "Scots",
  "sd": "سنڌي",
  "se": "Davvisámegiella",
  "sg": "Sängö",
  "sh": "Srpskohrvatski / Српскохрватски",
  "si": "සිංහල",
  "simple": "Simple English",
  "sk": "Slovenčina",
  "sl": "Slovenščina",
  "sm": "Gagana Samoa",
  "sn": "ChiShona",
  "so": "Soomaaliga",
  "sq": "Shqip",
  "sr": "Српски",
  "srn": "Sranantongo",
  "ss": "SiSwati",
  "st": "Sesotho",
  "stq": "Seeltersk",
  "su": "Basa Sunda",
  "sv": "Svenska",
  "sw": "Kiswahili",
  "szl": "Ślōnskŏ gŏdka",
  "ta": "தமிழ்",
  "tcy": "ತುಳು",
  "te": "తెలుగు",
  "tet": "Tetun",
  "tg": "Тоҷикӣ",
  "th": "ไทย",
  "ti": "ትግርኛ",
  "tk": "Türkmençe",
  "tl": "Tagalog",
  "tn": "Setswana",
  "to": "Faka-Tonga",
  "tpi": "Tok Pisin",
  "tr": "Türkçe",
  "ts": "Xitsonga",
  "tt": "Татарча",
  "tum": "Chitumbuka",
  "tw": "Twi",
  "ty": "Reo Tahiti",
  "tyv": "Тыва дыл",
  "udm": "Удмурт кыл",
  "ug": "ئۇيغۇرچە",
  "uk": "Українська",
  "ur": "اردو",
  "uz": "Oʻzbekcha",
  "ve": "Tshivenda",
  "vec": "Vèneto",
  "vep": "Vepsän kel'",
  "vi": "Tiếng Việt",
  "vls": "West-Vlams",
  "vo": "Volapük",
  "wa": "Walon",
  "war": "Winaray",
  "wo": "Wolof",
  "wuu": "吴语",
  "xal": "Хальмг",
  "xh": "isiXhosa",
  "xmf": "მარგალური",
  "yi": "ייִדיש",
  "yo": "Yorùbá",
  "yue": "粵語",
  "za": "Saɯ cueŋƅ",
  "zea": "Zeêuws",
  "zh-classical": "文言",
  "zh-min-nan": "閩南語",
  "zh-yue": "粵語",
  "zh": "中文",
  "zu": "isiZulu"
};

export type SupportedLanguage = keyof typeof supportedLanguages;

// Define RTL languages
export const rtlLanguages: SupportedLanguage[] = [
  'ar',  // Arabic
  'arc', // Aramaic
  'arz', // Egyptian Arabic
  'ckb', // Central Kurdish
  'dv',  // Divehi
  'fa',  // Persian (Farsi)
  'he',  // Hebrew
  'ks',  // Kashmiri
  'ps',  // Pashto
  'sd',  // Sindhi
  'ug',  // Uyghur
  'ur',  // Urdu
  'yi',  // Yiddish
];

// Define direction mapping function
export const getLanguageDirection = (langCode: SupportedLanguage): "ltr" | "rtl" => {
  return rtlLanguages.includes(langCode) ? "rtl" : "ltr";
};

// ============================
// PART 2: Translations
// ============================

// This is a placeholder for the actual translations
// The original code references this but it's not included in the files
export const translations: Record<string, Partial<Record<SupportedLanguage, string>>> = {};
export type TranslationKey = string;

// ============================
// PART 3: Core i18n functionality
// ============================

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

// ============================
// PART 4: React Context and Hook
// ============================

// Create a context for i18n in React
export interface I18nContextType {
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: Array<{ code: SupportedLanguage; name: string }>;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

// Provider component
interface I18nProviderProps {
  children: ReactNode;
  initialLanguage?: SupportedLanguage;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLanguage 
}) => {
  // Set initial language with priority: localStorage > props > browser detection
  const [language, setCurrentLanguage] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred-language') as SupportedLanguage;
      if (saved) return setLanguage(saved);
    }
    return initialLanguage ? setLanguage(initialLanguage) : init();
  });

  // Save and sync language changes
  const changeLang = (lang: SupportedLanguage) => {
    const newLang = setLanguage(lang);
    setCurrentLanguage(newLang);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', newLang);
    }
  };

  // Context value
  const value: I18nContextType = {
    t,
    language,
    setLanguage: changeLang,
    languages: getAvailableLanguages(),
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook to use translations in components
export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
};