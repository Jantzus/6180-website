import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { LanguageSelector } from "@/lib/i18n/components";
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
    <>
      <GlobalStyle />
      <AppContainer isRTL={isRTL}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 'calc(100vh - 60px)'
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
            <Headline>{t('Create Albums Together')}</Headline>
            
            <Button 
              primary
              isHovered={hoverButtonIndex === 0}
              onClick={goToAlbums}
              onMouseEnter={() => setHoverButtonIndex(0)}
              onMouseLeave={() => setHoverButtonIndex(null)}
              style={{ marginTop: '20px', padding: '12px 20px' }}
            >
              {t('Start')}
            </Button>
          </div>

          <LegalLinksFooter>
            <LegalLinkFooterButton 
              href="terms.html" 
              isHovered={hoverLink === 'terms'}
              onMouseEnter={() => setHoverLink('terms')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t('Terms of Service')}
            </LegalLinkFooterButton>
            <LegalLinkFooterButton
              href="privacy.html" 
              isHovered={hoverLink === 'privacy'}
              onMouseEnter={() => setHoverLink('privacy')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t('Privacy Policy')}
            </LegalLinkFooterButton>
            <LegalLinkFooterButton 
              href="support.html" 
              isHovered={hoverLink === 'support'}
              onMouseEnter={() => setHoverLink('support')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t('Support')}
            </LegalLinkFooterButton>
          </LegalLinksFooter>
        </div>
      </AppContainer>
    </>
  );
};

// Start the initialization process
initializeApp();