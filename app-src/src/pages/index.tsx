import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider, useTranslation, LanguageSelector } from '@/lib/i18n/react';
import { getLanguageDirection } from '@/lib/i18n/translations';
import { checkLoginWithRefreshOrRedirectToTarget, checkLoginWithoutRedirect } from "@/lib/utils";

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

// Check login before rendering
async function initializeApp() {
  // Get stored language or default
  const storedLanguage = localStorage.getItem("user_language") || "en";
  
  // Check if user is already logged in
  const token = await checkLoginWithoutRedirect();
  
  if (token) {
    // User is logged in, redirect to albums page without rendering the homepage
    window.location.href = `/my-albums.html?lang=${storedLanguage}`;
    return;
  }
  
  // User is not logged in, render the homepage
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <I18nProvider>
      <IndexPage />
    </I18nProvider>
  );
}

// Main page component using the new i18n system
const IndexPage: React.FC = () => {
  // Get translation function from the hook
  const { t, language } = useTranslation();
  
  // State for hover effects
  const [hoverLink, setHoverLink] = useState<string | null>(null);
  const [hoverButtonIndex, setHoverButtonIndex] = useState<number | null>(null);

  // Update HTML document properties when language changes
  useEffect(() => {
    // Set language in HTML attributes
    document.documentElement.lang = language;
    
    // Set direction (RTL/LTR)
    const dir = getLanguageDirection(language);
    document.documentElement.dir = dir;
    
    // Save to localStorage (already handled by I18nProvider, but keeping for compatibility)
    localStorage.setItem("user_language", language);
  }, [language]);

  // Go to albums page
  const goToAlbums = async () => {
    let targetPath = `/my-albums.html?lang=${language}`

    const token = await checkLoginWithRefreshOrRedirectToTarget(targetPath);
    
    if (token) {
      window.location.href = targetPath;
    }
  };

  // Check if RTL
  const isRTL = getLanguageDirection(language) === 'rtl';

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
        
        {/* Using the LanguageSelector component from react.tsx */}
        <LanguageSelector className="language-selector" />
      </div>

      <div style={styles.content}>
        <h1 style={styles.headline}>{t('Create Albums With Your Friends')}</h1>
        
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
            {t('Start')}
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
          {t('Terms of Service')}
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
          {t('Privacy Policy')}
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
          {t('Support')}
        </a>
      </div>
    </div>
  );
};

// Start the initialization process
initializeApp();