import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { LanguageSelector, Trans, TranslatedContent } from "@/lib/i18n/components";
import { checkTranslationFiles, checkTranslationKey } from "@/lib/i18n/checkTranslations";
import { getLanguageDirection } from '@/lib/i18n/translations';
import { checkLoginWithRefreshOrRedirectToTarget, checkLoginWithoutRedirect } from "@/lib/utils";

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
    <I18nProvider initialLanguage={storedLanguage} preloadLanguages={["en"]}>
      <TranslatedContent fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
        <IndexPage />
      </TranslatedContent>
    </I18nProvider>
  );
}

// Main page component using the new i18n system
const IndexPage: React.FC = () => {
  // Get translation hook with all functions
  const { language, loading } = useTranslation();
  
  // Show loading state if necessary
  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  // Update HTML document properties when language changes
  useEffect(() => {
    // Set language in HTML attributes
    document.documentElement.lang = language;
    
    // Set direction (RTL/LTR)
    const dir = getLanguageDirection(language);
    document.documentElement.dir = dir;
    
    // Save to localStorage (already handled by I18nProvider, but keeping for compatibility)
    localStorage.setItem("user_language", language);
    
    // Run translations check in development mode
    if (process.env.NODE_ENV !== 'production') {
      checkTranslationFiles();
      checkTranslationKey('Create Albums Together');
    }
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
    <>
      <GlobalStyle />
      <AppContainer isRTL={isRTL}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'calc(100vh - 60px)'
        }}>
          <HeaderContainer>
            <LogoContainer isRTL={isRTL}>
              <Logo 
                src="images/logo_no_background.png" 
                alt="6180 Logo" 
              />
              <h1 style={{ 
                fontSize: '1.4em', 
                fontWeight: 'bold', 
                color: '#222',
                margin: 0
              }}>6180</h1>
            </LogoContainer>
            
            <LanguageSelector className="language-selector" />
          </HeaderContainer>

          <div style={{ textAlign: 'center' }}>
            <Headline>
              <Trans k="Create Albums Together" />
            </Headline>
            
            <Button 
              primary
              onClick={goToAlbums}
              className="hover-button"
              style={{ marginTop: '20px', padding: '12px 20px' }}
            >
              <Trans k="Start" />
            </Button>
          </div>

          <LegalLinksFooter>
            <LegalLinkFooterButton 
              href="terms.html" 
              className="hover-link"
            >
              <Trans k="Terms of Service" />
            </LegalLinkFooterButton>
            <LegalLinkFooterButton
              href="privacy.html" 
              className="hover-link"
            >
              <Trans k="Privacy Policy" />
            </LegalLinkFooterButton>
            <LegalLinkFooterButton 
              href="support.html" 
              className="hover-link"
            >
              <Trans k="Support" />
            </LegalLinkFooterButton>
          </LegalLinksFooter>
          
        </div>
      </AppContainer>
    </>
  );
};

// Start the initialization process
initializeApp();