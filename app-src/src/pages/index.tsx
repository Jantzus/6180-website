import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { LanguageSelector } from "@/lib/i18n/components";
import { getLanguageDirection } from '@/lib/i18n/translations';
import { checkLoginWithRefreshOrRedirectToTarget, checkLoginWithoutRedirect, redirectTo, generateUrl } from "@/lib/utils";

import {
  GlobalStyle,
  AppContainer,
  HeaderContainer,
  LogoContainer,
  Button,
  Logo,
  Headline,
  LegalLinksFooter,
  LegalLinkFooterButton
} from "@/styles/styled-components";

// Main page component
export const IndexPage: React.FC = () => {
  // Get translation hook with all functions
  const { t, language } = useTranslation();
  
  // Check if RTL
  const isRTL = getLanguageDirection(language) === 'rtl';
  
  // Update HTML document properties when language changes
  useEffect(() => {
    // Set language and direction in HTML attributes
    document.documentElement.lang = language;
    document.documentElement.dir = getLanguageDirection(language);
  }, [language]);

  // Go to albums page
  const goToAlbums = async () => {
    const targetPath = `my-albums.html?lang=${language}`;
    const token = await checkLoginWithRefreshOrRedirectToTarget(targetPath);
    
    if (token) {
      redirectTo(targetPath);
    }
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer $isRTL={isRTL}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'calc(100vh - 60px)'
        }}>
          <HeaderContainer>
            <LogoContainer $isRTL={isRTL}>
              <Logo 
                src={generateUrl("images/logo_no_background.png")}
                alt="6180 Logo"
              />
            </LogoContainer>
            
            {/* Language selector removed from header */}
          </HeaderContainer>

          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
            <Headline>
              {t('Best Way to Save and Share Photos')}
            </Headline>
            
            <p style={{ 
              fontSize: '1.1em',
              color: '#666',
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              {t('Tag, revisit and send your favorite moments — by occasion, mood, or location — in seconds.')}
            </p>

            <Button 
              $primary
              onClick={goToAlbums}
              className="hover-button"
              style={{ marginTop: '20px', padding: '12px 20px' }}
            >
              {t('Use 6180')}
            </Button>
          </div>

          <LegalLinksFooter>
            <div style={{ marginBottom: '12px' }}>
              <LegalLinkFooterButton href={generateUrl("terms.html")}>
                {t('Terms of Service')}
              </LegalLinkFooterButton>
              <LegalLinkFooterButton href={generateUrl("privacy.html")}>
                {t('Privacy Policy')}
              </LegalLinkFooterButton>
              <LegalLinkFooterButton href={generateUrl("support.html")}>
                {t('Support')}
              </LegalLinkFooterButton>
            </div>
            
            {/* Language selector moved to footer - less conspicuous */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              opacity: 0.7,
              fontSize: '0.85em'
            }}>
              <LanguageSelector />
            </div>
          </LegalLinksFooter>
        </div>
      </AppContainer>
    </>
  );
};

// SSR-safe App wrapper component
export const App: React.FC = () => {
  const [storedLanguage, setStoredLanguage] = useState("en"); // Default to English for SSR
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app after hydration
    const initializeApp = async () => {
      // Get stored language from localStorage
      const preferredLanguage = localStorage.getItem("preferred-language") || 
                               localStorage.getItem("user_language") || 
                               "en";
      setStoredLanguage(preferredLanguage);

      // Check if user is already logged in
      try {
        const token = await checkLoginWithoutRedirect();
        if (token) {
          // User is logged in, redirect to albums page
          redirectTo(`my-albums.html?lang=${preferredLanguage}`);
          return;
        }
      } catch (error) {
        console.warn('Login check failed:', error);
      }

      setIsInitialized(true);
    };

    initializeApp();
  }, []);

  // Only run translation checks in development and client-side
  useEffect(() => {
    if (typeof window !== 'undefined' && import.meta.env?.MODE !== 'production') {
      import('@/lib/i18n/checkTranslations').then(({ checkTranslationFiles, checkTranslationKey }) => {
        checkTranslationFiles();
        checkTranslationKey('Best Way to Save and Share Photos');
        checkTranslationKey('Tag, revisit and send your favorite moments — by occasion, mood, or location — in seconds.');
      }).catch(console.warn);
    }
  }, []);

  // Show loading state or render main page
  if (!isInitialized) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <I18nProvider 
      initialLanguage={storedLanguage} 
      preloadLanguages={["en"]}
    >
      <IndexPage />
    </I18nProvider>
  );
};

// SSR-safe initialization
if (typeof window !== 'undefined') {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
}