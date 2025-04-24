import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Types
interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  duration?: string;
  ownerId?: string;
}

interface Contact {
  [id: string]: string;
}

interface AlbumData {
  mediaItems: MediaItem[];
  folderName: string;
  contacts: Contact;
}

// Constants
const GRAPHQL_ENDPOINT = "https://nmu355vgsbdbjcihhtekwdczxi.appsync-api.us-east-1.amazonaws.com/graphql";
const API_KEY = "da2-45aunjrsbfbdhlaaomrswhsszq";
const BUCKET_URL = "https://i6180-assets-prod-0.s3.amazonaws.com/";

// Supported languages
const supportedLanguages = {
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

// Translations object
const translations: Record<string, Record<string, string>> = {
  'Columns:': {
    'es': 'Columnas:',
    'fr': 'Colonnes:',
    'de': 'Spalten:',
    'ja': '列数:',
    'zh': '列数:',
    'ko': '열 수:',
    'ru': 'Колонки:',
    'pt': 'Colunas:',
    'it': 'Colonne:',
    'nl': 'Kolommen:',
    'ar': 'الأعمدة:',
    'hi': 'कॉलम:',
    'tr': 'Sütunlar:',
  },
  'Save': {
    'es': 'Guardar',
    'fr': 'Enregistrer',
    'de': 'Speichern',
    'ja': '保存',
    'zh': '保存',
    'ko': '저장',
    'ru': 'Сохранить',
    'pt': 'Salvar',
    'it': 'Salva',
    'nl': 'Opslaan',
    'ar': 'حفظ',
    'hi': 'सेव',
    'tr': 'Kaydet',
  },
  'Loading album...': {
    'es': 'Cargando álbum...',
    'fr': 'Chargement de l\'album...',
    'de': 'Album wird geladen...',
    'ja': 'アルバムを読み込み中...',
    'zh': '加载相册中...',
    'ko': '앨범 로딩 중...',
    'ru': 'Загрузка альбома...',
    'pt': 'Carregando álbum...',
    'it': 'Caricamento album...',
    'nl': 'Album laden...',
    'ar': 'جار تحميل الألبوم...',
    'hi': 'एल्बम लोड हो रहा है...',
    'tr': 'Albüm yükleniyor...',
  },
  'Loading album content...': {
    'es': 'Cargando contenido del álbum...',
    'fr': 'Chargement du contenu de l\'album...',
    'de': 'Albuminhalt wird geladen...',
    'ja': 'アルバムのコンテンツを読み込み中...',
    'zh': '加载相册内容中...',
    'ko': '앨범 내용 로딩 중...',
    'ru': 'Загрузка содержимого альбома...',
    'pt': 'Carregando conteúdo do álbum...',
    'it': 'Caricamento contenuto album...',
    'nl': 'Albuminhoud laden...',
    'ar': 'جار تحميل محتوى الألبوم...',
    'hi': 'एल्बम सामग्री लोड हो रही है...',
    'tr': 'Albüm içeriği yükleniyor...',
  },
  'Photos': {
    'es': 'Fotos',
    'fr': 'Photos',
    'de': 'Fotos',
    'ja': '写真',
    'zh': '照片',
    'ko': '사진',
    'ru': 'Фотографии',
    'pt': 'Fotos',
    'it': 'Foto',
    'nl': 'Foto\'s',
    'ar': 'الصور',
    'hi': 'फ़ोटो',
    'tr': 'Fotoğraflar',
  },
  'No media found in this album': {
    'es': 'No se encontraron medios en este álbum',
    'fr': 'Aucun média trouvé dans cet album',
    'de': 'Keine Medien in diesem Album gefunden',
    'ja': 'このアルバムにメディアが見つかりません',
    'zh': '在此相册中未找到媒体',
    'ko': '이 앨범에서 미디어를 찾을 수 없습니다',
    'ru': 'В этом альбоме не найдено медиафайлов',
    'pt': 'Nenhuma mídia encontrada neste álbum',
    'it': 'Nessun media trovato in questo album',
    'nl': 'Geen media gevonden in dit album',
    'ar': 'لم يتم العثور على وسائط في هذا الألبوم',
    'hi': 'इस एल्बम में कोई मीडिया नहीं मिला',
    'tr': 'Bu albümde medya bulunamadı',
  },
  'Error Loading Album': {
    'es': 'Error al cargar el álbum',
    'fr': 'Erreur de chargement de l\'album',
    'de': 'Fehler beim Laden des Albums',
    'ja': 'アルバムの読み込みエラー',
    'zh': '加载相册出错',
    'ko': '앨범 로딩 오류',
    'ru': 'Ошибка загрузки альбома',
    'pt': 'Erro ao carregar álbum',
    'it': 'Errore di caricamento dell\'album',
    'nl': 'Fout bij laden van album',
    'ar': 'خطأ في تحميل الألبوم',
    'hi': 'एल्बम लोड करने में त्रुटि',
    'tr': 'Albüm Yükleme Hatası',
  },
  'Please try refreshing the page or contact support if the problem persists.': {
    'es': 'Intente actualizar la página o póngase en contacto con el soporte si el problema persiste.',
    'fr': 'Veuillez actualiser la page ou contacter le support si le problème persiste.',
    'de': 'Bitte aktualisieren Sie die Seite oder wenden Sie sich an den Support, wenn das Problem weiterhin besteht.',
    'ja': 'ページを更新するか、問題が解決しない場合はサポートに連絡してください。',
    'zh': '请刷新页面，如果问题仍然存在，请联系支持人员。',
    'ko': '페이지를 새로고침하거나 문제가 지속되면 지원팀에 문의하세요.',
    'ru': 'Пожалуйста, обновите страницу или обратитесь в службу поддержки, если проблема не устранена.',
    'pt': 'Tente atualizar a página ou entre em contato com o suporte se o problema persistir.',
    'it': 'Prova ad aggiornare la pagina o contatta l\'assistenza se il problema persiste.',
    'nl': 'Vernieuw de pagina of neem contact op met de ondersteuning als het probleem aanhoudt.',
    'ar': 'يرجى تحديث الصفحة أو الاتصال بالدعم إذا استمرت المشكلة.',
    'hi': 'कृपया पेज को रिफ्रेश करें या यदि समस्या बनी रहती है तो सपोर्ट से संपर्क करें।',
    'tr': 'Lütfen sayfayı yenileyin veya sorun devam ederse destek ile iletişime geçin.',
  },
  'Refresh Page': {
    'es': 'Actualizar página',
    'fr': 'Actualiser la page',
    'de': 'Seite aktualisieren',
    'ja': 'ページを更新',
    'zh': '刷新页面',
    'ko': '페이지 새로고침',
    'ru': 'Обновить страницу',
    'pt': 'Atualizar página',
    'it': 'Aggiorna pagina',
    'nl': 'Pagina vernieuwen',
    'ar': 'تحديث الصفحة',
    'hi': 'पेज रिफ्रेश करें',
    'tr': 'Sayfayı Yenile',
  },
};

// CSS styles as a JavaScript object
const styles = {
  body: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    maxWidth: '1200px',
    margin: 'auto',
    background: '#f9fafb',
    color: '#333',
    lineHeight: 1.5,
    padding: '20px'
  },
  header: {
    position: 'sticky' as const,
    top: 0,
    background: '#fff',
    boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
    zIndex: 10,
    marginBottom: '10px'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px'
  },
  saveButton: { 
    color: '#006adc',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: 'white',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 500,
    minWidth: '80px',
    textAlign: 'center' as const
  },
  albumTitle: {
    fontWeight: 400,
    margin: 0,
    padding: '16px 24px 0 24px',
    fontSize: '24px',
    display: 'none',
    backgroundColor: 'white'
  },
  albumTitleStrong: {
    fontWeight: 700
  },
  mediaContainer: {
    padding: '10px 20px 20px'
  },
  descriptionBlock: {
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderRadius: '4px',
    padding: '20px',
    marginBottom: '20px'
  },
  descriptionText: {
    margin: 0
  },
  mediaGrid: {
    display: 'grid',
    gridGap: '20px'
  },
  onePerRow: {
    gridTemplateColumns: 'repeat(1, 1fr)'
  },
  twoPerRow: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },
  threePerRow: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  fourPerRow: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  fivePerRow: {
    gridTemplateColumns: 'repeat(5, 1fr)'
  },
  mediaBlock: {
    background: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    position: 'relative' as const,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const
  },
  mediaBlockHover: {
    transform: 'translateY(-2px)'
  },
  lazyImageContainer: {
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    width: '100%',
    minHeight: '200px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column' as const
  },
  thumbnailWrapper: {
    position: 'relative' as const,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    width: '100%',
    minHeight: '200px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column' as const
  },
  lazyImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    position: 'relative' as const,
    zIndex: 1,
    transition: 'opacity 0.3s',
    opacity: 0
  },
  lazyImageLoaded: {
    opacity: 1
  },
  loadingPlaceholder: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'loading-animation 1.5s infinite',
    zIndex: 0
  },
  ownerBadge: {
    position: 'absolute' as const,
    bottom: '12px',
    right: '12px',
    background: 'rgba(255,255,255,0.85)',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 500,
    zIndex: 3
  },
  videoContainer: {
    cursor: 'pointer'
  },
  playButton: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: '50%',
    zIndex: 2
  },
  playButtonBefore: {
    content: '""',
    position: 'absolute' as const,
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    borderStyle: 'solid',
    borderWidth: '15px 0 15px 25px',
    borderColor: 'transparent transparent transparent white'
  },
  durationBadge: {
    position: 'absolute' as const,
    bottom: '12px',
    left: '12px',
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 8px',
    fontSize: '14px',
    borderRadius: '4px',
    fontWeight: 500,
    zIndex: 2
  },
  error: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '18px',
    color: '#d32f2f'
  },
  loading: {
    textAlign: 'center' as const,
    padding: '40px',
    fontSize: '18px',
    color: '#666'
  },
  rowSelector: {
    display: 'flex',
    alignItems: 'center'
  },
  rowSelectorLabel: {
    marginRight: '8px',
    fontSize: '14px',
    color: '#555',
    fontWeight: 'normal' as const
  },
  rowSelectorSelect: {
    padding: '5px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '50px'
  },
  languageSelector: {
    padding: '5px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    minWidth: '120px'
  },
  languageSelectorContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0 20px 8px 0'
  }
};

// GraphQL query
const FETCH_FOLDERS_QUERY = `
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        folderName
        fileReferencesPage {
          items {
            file {
              ownerContactId
              dataKey
              thumbnailDataKey
              durationInSeconds
            }
          }
        }
        contactsUsingInvite {
          items {
            id
            item {
              ... on Persona {
                publicDisplayName
              }
            }
          }
        }
      }
    }
  }
`;

// Add keyframes for loading animation
const keyframesStyle = `
  @keyframes loading-animation {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

// LazyImage component
const LazyImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E");
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
  }, [src]);
  
  return (
    <div style={styles.lazyImageContainer}>
      <img 
        style={{
          ...styles.lazyImage,
          ...(isLoaded ? styles.lazyImageLoaded : {})
        }}
        src={imageSrc} 
        alt={alt} 
        className={className}
      />
      {!isLoaded && <div style={styles.loadingPlaceholder}></div>}
    </div>
  );
};

// VideoThumbnail component
const VideoThumbnail: React.FC<{ 
  thumbnailUrl: string; 
  videoUrl: string; 
  duration: string; 
  index: number 
}> = ({ thumbnailUrl, videoUrl, duration, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleClick = () => {
    setIsPlaying(true);
  };
  
  if (isPlaying) {
    return (
      <video controls style={{ width: '100%' }}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }
  
  return (
    <div style={styles.thumbnailWrapper} onClick={handleClick}>
      <LazyImage 
        src={thumbnailUrl} 
        alt={`Video thumbnail ${index + 1}`} 
      />
      <div style={styles.playButton}>
        <div style={styles.playButtonBefore}></div>
      </div>
      <div style={styles.durationBadge}>{duration}</div>
    </div>
  );
};

const PhotoAlbum: React.FC = () => {
  // State
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [columns, setColumns] = useState<string>('1');
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive state
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  // Helper function to translate text
  const translate = (phrase: string): string => {
    if (currentLanguage === 'en') {
      return phrase;
    }
    
    const translatedPhrase = translations[phrase]?.[currentLanguage];
    return translatedPhrase || phrase;
  };

  // Format folder ID
  const formatFolderId = (rawId: string | null): string | null => {
    if (!rawId || !rawId.includes('_')) {
      return null;
    }
    
    const [prefix, suffix] = rawId.split('_');
    return `${prefix}_____${suffix}____Folder`;
  };

  // Get folder ID from URL
  const getFolderIdFromUrl = (): string | null => {
    // Check in query params
    const urlParams = new URLSearchParams(window.location.search);
    const folderId = urlParams.get('id');
    
    if (folderId) return folderId;
    
    // Check in path
    const pathParts = window.location.pathname.split('/');
    const lastPart = pathParts[pathParts.length - 1];
    
    if (lastPart && lastPart.includes('_')) {
      return lastPart;
    }
    
    return null;
  };

  // Format time in MM:SS
  const formatTime = (seconds: number = 0): string => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  // Process data returned from API
  const processData = (json: any): AlbumData => {
    const items = json?.data?.fetchFolders?.items || [];
    const mediaItems: MediaItem[] = [];
    const contacts: Contact = {};
    let folderName = translate('Photos');
    
    if (items.length > 0) {
      // Get folder name if available
      if (items[0]?.folderName && items[0].folderName.length > 0) {
        folderName = items[0].folderName;
      }
      
      // Build contacts map
      (items[0]?.contactsUsingInvite?.items || []).forEach((contact: any) => {
        if (contact?.id && contact?.item?.publicDisplayName) {
          contacts[contact.id] = contact.item.publicDisplayName;
        }
      });
      
      // Get media items
      (items[0]?.fileReferencesPage?.items || []).forEach((ref: any) => {
        const file = ref?.file;
        if (!file?.dataKey) return;

        const { dataKey, thumbnailDataKey, durationInSeconds, ownerContactId } = file;
        const url = `${BUCKET_URL}public/${dataKey}`;

        if (dataKey.startsWith("Input/Image/")) {
          mediaItems.push({ 
            type: "image", 
            url,
            ownerId: ownerContactId
          });
        } else if (dataKey.startsWith("Input/Video/")) {
          mediaItems.push({
            type: "video",
            url,
            thumbnailUrl: `${BUCKET_URL}public/${thumbnailDataKey}`,
            duration: formatTime(durationInSeconds),
            ownerId: ownerContactId
          });
        }
      });
    }
    
    return { mediaItems, folderName, contacts };
  };

  // Fetch folder data
  const fetchFolder = async (folderId: string): Promise<AlbumData | null> => {
    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          query: FETCH_FOLDERS_QUERY,
          variables: { folderIds: [folderId] }
        })
      });
      
      const result = await response.json();
      return processData(result);
    } catch (error) {
      console.error('Error fetching folder data:', error);
      setError(translate('Please try refreshing the page or contact support if the problem persists.'));
      return null;
    }
  };

  // Save album function
  const saveAlbum = () => {
    const folderId = getFolderIdFromUrl();
    const formattedFolderId = formatFolderId(folderId);
    
    if (formattedFolderId) {
      window.location.href = `/save-album.html?folderId=${formattedFolderId}`;
    } else {
      alert(translate('Please try refreshing the page or contact support if the problem persists.'));
    }
  };

  // Change language
  const changeLanguage = (lang: string) => {
    if (lang in supportedLanguages) {
      setCurrentLanguage(lang);
      localStorage.setItem('preferred-language', lang);
      
      // Set RTL for Arabic, Hebrew, etc.
      const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
      if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
      
      document.documentElement.setAttribute('lang', lang);
    }
  };

  // Change columns
  const changeColumns = (value: string) => {
    setColumns(value);
    localStorage.setItem('columns', value);
  };

  // Add keyframes to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = keyframesStyle;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Initialize language settings
  useEffect(() => {
    // Try to get language from localStorage
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && savedLang in supportedLanguages) {
      setCurrentLanguage(savedLang);
    } else {
      // Otherwise detect from browser
      const browserLang = navigator.language.split('-')[0];
      const detectedLang = browserLang in supportedLanguages ? browserLang : 'en';
      setCurrentLanguage(detectedLang);
    }

    // Set RTL for Arabic and Hebrew
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    if (rtlLanguages.includes(currentLanguage)) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }

    document.documentElement.setAttribute('lang', currentLanguage);
    
    // Set default columns
    const savedColumnsValue = localStorage.getItem('columns') || '1';
    setColumns(savedColumnsValue);
    
  }, []);

  // Fetch album data
  useEffect(() => {
    const initAlbum = async () => {
      const rawFolderId = getFolderIdFromUrl();
      
      if (!rawFolderId) {
        setError(translate('Please try refreshing the page or contact support if the problem persists.'));
        setIsLoading(false);
        return;
      }
      
      const folderId = formatFolderId(rawFolderId);
      
      if (!folderId) {
        setError(translate('Please try refreshing the page or contact support if the problem persists.'));
        setIsLoading(false);
        return;
      }
      
      const data = await fetchFolder(folderId);
      
      if (data) {
        setAlbumData(data);
      }
      
      setIsLoading(false);
    };

    initAlbum();
  }, []);

  // Set page title
  useEffect(() => {
    if (albumData?.folderName) {
      document.title = albumData.folderName;
    } else {
      document.title = translate('Photos');
    }
  }, [albumData, currentLanguage]);

  // Get column-specific grid style
  const getGridStyle = () => {
    switch(columns) {
      case '1': return { ...styles.mediaGrid, ...styles.onePerRow };
      case '2': return { ...styles.mediaGrid, ...styles.twoPerRow };
      case '3': return { ...styles.mediaGrid, ...styles.threePerRow };
      case '4': return { ...styles.mediaGrid, ...styles.fourPerRow };
      case '5': return { ...styles.mediaGrid, ...styles.fivePerRow };
      default: return { ...styles.mediaGrid, ...styles.onePerRow };
    }
  };

  // Render
  return (
    <div style={styles.body}>
      <div style={styles.header}>
        {albumData?.folderName && albumData.folderName !== translate('Photos') && albumData.folderName.trim() !== "" && (
          <h2 id="album-title" style={{
            ...styles.albumTitle,
            display: 'block'
          }}>
            <strong style={styles.albumTitleStrong}>{albumData.folderName}</strong>
          </h2>
        )}
        <div style={styles.headerContent}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={styles.rowSelector}>
              <label htmlFor="columns" id="columns-label" style={styles.rowSelectorLabel}>
                <strong>{translate('Columns:')}</strong>
              </label>
              <select 
                id="columns" 
                value={columns} 
                onChange={(e) => changeColumns(e.target.value)}
                style={styles.rowSelectorSelect}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div>
            <button 
              id="save-button" 
              onClick={saveAlbum}
              style={styles.saveButton}
            >
              {translate('Save')}
            </button>
          </div>
        </div>
      </div>

      <div style={styles.languageSelectorContainer}>
        <select 
          id="language-selector" 
          style={styles.languageSelector}
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>

      <div id="media-container" style={styles.mediaContainer}>
        <div id="description-container" style={styles.descriptionBlock}>
          <p style={styles.descriptionText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
        </div>
        
        <div id="media-grid" style={getGridStyle()}>
          {isLoading ? (
            <div id="loading-message" style={styles.loading}>
              {translate('Loading album content...')}
            </div>
          ) : error ? (
            <div style={styles.error}>{error}</div>
          ) : albumData && albumData.mediaItems.length === 0 ? (
            <div style={styles.error}>{translate('No media found in this album')}</div>
          ) : (
            albumData?.mediaItems.map((item, index) => {
              const ownerName = item.ownerId && albumData.contacts[item.ownerId] 
                ? albumData.contacts[item.ownerId] 
                : '';
              
              return (
                <div 
                  key={index} 
                  style={{
                    ...styles.mediaBlock,
                    ...(item.type === 'video' ? styles.videoContainer : {}),
                    ...(hoverIdx === index ? styles.mediaBlockHover : {})
                  }}
                  onMouseEnter={() => setHoverIdx(index)}
                  onMouseLeave={() => setHoverIdx(null)}
                >
                  {item.type === 'image' ? (
                    <LazyImage 
                      src={item.url} 
                      alt={`Album image ${index + 1}`} 
                    />
                  ) : (
                    <VideoThumbnail 
                      thumbnailUrl={item.thumbnailUrl || ''} 
                      videoUrl={item.url} 
                      duration={item.duration || '0:00'} 
                      index={index} 
                    />
                  )}
                  {ownerName && <div style={styles.ownerBadge}>{ownerName}</div>}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

// Initialize the app
ReactDOM.createRoot(document.getElementById("root")!).render(<PhotoAlbum />);