import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { LanguageSelector } from "@/lib/i18n/components";
import { getLanguageDirection } from '@/lib/i18n/translations';
import { checkLoginWithRefreshOrRedirectToTarget, checkLoginWithoutRedirect, redirectTo, generateUrl } from "@/lib/utils";
import styled from 'styled-components'
import {
  AppContainer,
  HeaderContainer,
  Logo,
  LegalLinksFooter,
  LegalLinkFooterButton
} from "@/styles/components/layout";
import { Button } from '@/styles/components/buttons'
import { GlobalStyle } from "@/styles/globalStyles";
import { theme } from "@/styles/theme";

const Headline = styled.h1`
  font-size: ${theme.fontSizes.xxl};
  margin: ${theme.spacing.sm} 0;
`;

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

  // Update dynamic meta tags based on language
  useEffect(() => {
    const updateMetaTags = () => {
      // Update title based on current language
      document.title = `${t('Save and Share Photos')} - 6180`;
      
      // Update description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', t('Nothing to download. Done in seconds. Save and share photos effortlessly with 6180.'));
      }
      
      // Update OG title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', `${t('Save and Share Photos')} - 6180`);
      }
      
      // Update OG description
      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', t('Nothing to download. Done in seconds. Save and share photos effortlessly with 6180.'));
      }
      
      // Update Twitter title
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', `${t('Save and Share Photos')} - 6180`);
      }
      
      // Update Twitter description
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', t('Nothing to download. Done in seconds. Save and share photos effortlessly with 6180.'));
      }
    };
    
    updateMetaTags();
  }, [t, language]);

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
            {/* Logo moved to main content area */}
            {/* Language selector removed from header */}
          </HeaderContainer>

          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
            <Headline>
              {t('Save and Share Photos')}
            </Headline>
            
            {/* Photo moved below body text and above CTA */}
            <div style={{ 
              marginTop: '50px',     // More spacing between headline and image
              marginBottom: '30px',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '16px',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08), 0 0 20px rgba(102, 126, 234, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.9)',
                // Enhanced elevation with subtle additional shadow
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.04))'
              }}>
                <Logo 
                  src={generateUrl("images/homepage-graphic.jpg")}
                  alt="6180 - Two bears sharing photos"
                  style={{
                    width: '280px',      // Wider golden rectangle
                    height: '173px',     // Height (280 ÷ 1.618 = ~173)
                    borderRadius: '20px', // Increased to better echo the card shape (24px - 4px for visual harmony)
                    objectFit: 'contain' // Show full image without cropping
                  }}
                />
              </div>
            </div>

            <p style={{ 
              fontSize: '0.85em',    // Slightly smaller than subheadline
              color: '#666',
              marginBottom: '30px',
              lineHeight: '1.6',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
              {t('Nothing to download. Done in seconds.')}
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
        checkTranslationKey('Save and Share Photos');
        checkTranslationKey('Nothing to download. Done in seconds.');
        checkTranslationKey('Nothing to download. Done in seconds. Save and share photos effortlessly with 6180.');
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