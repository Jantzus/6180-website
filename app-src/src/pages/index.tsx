import React, { useEffect } from "react";
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

// Only run in development
if (import.meta.env.MODE !== 'production') {
  import('@/lib/i18n/checkTranslations').then(({ checkTranslationFiles, checkTranslationKey }) => {
    checkTranslationFiles();
    checkTranslationKey('Create Albums Together');
  });
}

// Main page component
const IndexPage: React.FC = () => {
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
              <h1 style={{ 
                fontSize: '1.4em',
                fontWeight: 'bold',
                color: '#222',
                margin: 0
              }}>6180</h1>
            </LogoContainer>
            
            {/* Language selector removed from header */}
          </HeaderContainer>

          <div style={{ textAlign: 'center' }}>
            <Headline>
              {t('Create Albums Together')}
            </Headline>
            
            <Button 
              $primary
              onClick={goToAlbums}
              className="hover-button"
              style={{ marginTop: '20px', padding: '12px 20px' }}
            >
              {t('Create Album')}
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

// Main initialization function - needed for async operations
(async function() {
  const storedLanguage = localStorage.getItem("preferred-language") || 
  localStorage.getItem("user_language") || 
  "en";
  
  // Check if user is already logged in
  const token = await checkLoginWithoutRedirect();
  
  if (token) {
    // User is logged in, redirect to albums page
    redirectTo(`my-albums.html?lang=${storedLanguage}`);
    return;
  }
  
  // User is not logged in, render the homepage
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <I18nProvider 
      initialLanguage={storedLanguage} 
      preloadLanguages={["en"]}
    >
      <IndexPage />
    </I18nProvider>
  );
})();