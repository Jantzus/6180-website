import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from '@/lib/i18n/translations';
import { redirectTo, generateUrl } from "@/lib/utils";
import { API_ENDPOINT_REDEEM_TOKEN, AWS_PRIVATE_GRAPHQL_ENDPOINT, LOCAL_STORAGE_KEYS } from "@/lib/config";
import styled from 'styled-components'
import {
  GlobalStyle,
  AppContainer,
  Button,
  LegalLinksFooter,
  LegalLinkFooterButton,
  Card
} from "@/styles/styled-components";

// Styled components specific to token login page
const TokenLoginCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`;

const LogoImage = styled.img`
  height: 60px;
  margin-bottom: 16px;
`;

const StatusMessage = styled.div<{ $type: 'loading' | 'success' | 'error' }>`
  font-size: 16px;
  margin: 24px 0;
  padding: 16px;
  border-radius: 8px;
  
  ${props => props.$type === 'loading' && `
    color: #666;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
  `}
  
  ${props => props.$type === 'success' && `
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
  `}
  
  ${props => props.$type === 'error' && `
    color: #721c24;
    background-color: #f8d7da;
    border: 1px solid #f5c6cb;
  `}
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
`;

const CenteredContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// API endpoint for token redemption - imported from config
const REDEEM_TOKEN_ENDPOINT = API_ENDPOINT_REDEEM_TOKEN;

type TokenStatus = 'loading' | 'success' | 'error' | 'redirecting'

interface TokenRedemptionResponse {
  success: boolean;
  message: string;
  redirect: string;
  userSub: string;
  idToken: string;
  accessToken: string;
}

interface TokenRedemptionError {
  error: string;
}

const TokenLoginPage = () => {
  const [status, setStatus] = useState<TokenStatus>('loading')
  const [errorMessage, setErrorMessage] = useState('')
  const [hoverLink, setHoverLink] = useState<string | null>(null)
  
  // Use the i18n hook
  const { t, language, loading } = useTranslation()
  
  // Check if current language is RTL
  const isRTL = getLanguageDirection(language) === 'rtl'

  // Update HTML document properties when language changes
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  // Extract token and redirect from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const redirect = urlParams.get('redirect') || '/home'
    
    if (!token) {
      setStatus('error')
      setErrorMessage(t('No login token provided'))
      return
    }
    
    redeemToken(token, redirect)
  }, [t])

  const redeemToken = async (token: string, redirectPath: string) => {
    try {
      setStatus('loading')
      
      // Call the redeem endpoint
      const response = await fetch(`${REDEEM_TOKEN_ENDPOINT}?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        credentials: 'include', // Include cookies for session
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error((data as TokenRedemptionError).error || 'Token redemption failed')
      }

      const result = data as TokenRedemptionResponse
      
      if (result.success) {
        // Store the fresh idToken in localStorage (same as regular login)
        if (result.idToken) {
          localStorage.setItem('idToken', result.idToken)
          
          // Also fetch and store the display name like regular login
          const payload = JSON.parse(atob(result.idToken.split('.')[1]))
          const username = payload['cognito:username']
          const relationId = `${username}_____Public____Profile`

          try {
            const gqlResponse = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${result.idToken}`,
              },
              body: JSON.stringify({
                query: `
                  mutation MyMutation($relationIds: [ID!]) {
                    batchGetItems(relationIds: $relationIds) {
                      items {
                        id
                        item {
                          ... on Profile {
                            anyDisplayName
                          }
                        }
                      }
                      nextToken
                    }
                  }
                `,
                variables: {
                  relationIds: [relationId],
                },
              }),
            })

            const json = await gqlResponse.json()
            const displayName = json?.data?.batchGetItems?.items?.[0]?.item?.anyDisplayName
            if (displayName) {
              localStorage.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, displayName)
            }
          } catch (profileError) {
            console.warn('Failed to fetch profile info:', profileError)
            // Continue with login even if profile fetch fails
          }
        } else {
          throw new Error('No IdToken received from server')
        }
        
        setStatus('redirecting')
        
        // Clean the URL to remove the token
        const newUrl = new URL(window.location.href)
        newUrl.searchParams.delete('token')
        newUrl.searchParams.delete('redirect')
        window.history.replaceState({}, '', newUrl.pathname)
        
        // Use the redirect from the server response, fallback to the original redirectPath
        const finalRedirect = result.redirect || redirectPath
        
        // Redirect to the intended destination
        setTimeout(() => {
          redirectTo(finalRedirect)
        }, 1000) // Short delay to show success message
        
      } else {
        throw new Error(result.message || 'Login failed')
      }
      
    } catch (error) {
      console.error('Token redemption error:', error)
      setStatus('error')
      
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(t('An unexpected error occurred during login'))
      }
    }
  }

  const handleRetryLogin = () => {
    // Redirect to main login page
    redirectTo(generateUrl('login.html'))
  }

  // Show minimal loading state before i18n is ready
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        {t('Loading...')}
      </div>
    )
  }

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Spinner />
            <StatusMessage $type="loading">
              {t('Logging you in...')}
            </StatusMessage>
          </>
        )
        
      case 'success':
      case 'redirecting':
        return (
          <StatusMessage $type="success">
            {t('Login successful! Redirecting...')}
          </StatusMessage>
        )
        
      case 'error':
        return (
          <>
            <StatusMessage $type="error">
              {errorMessage || t('Login failed')}
            </StatusMessage>
            <Button
              $primary
              onClick={handleRetryLogin}
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            >
              {t('Go to Login Page')}
            </Button>
          </>
        )
        
      default:
        return null
    }
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer $isRTL={isRTL}>
        <ContentWrapper>
          <CenteredContent>
            <TokenLoginCard>
              <LogoImage 
                src={generateUrl("images/logo_no_background.png")}
                alt="6180 Logo" 
              />
              
              {renderContent()}
            </TokenLoginCard>
          </CenteredContent>
          
          <LegalLinksFooter>
            <LegalLinkFooterButton 
              href={generateUrl("terms.html")}
              $isHovered={hoverLink === 'terms'}
              onMouseEnter={() => setHoverLink('terms')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t("Terms of Service")}
            </LegalLinkFooterButton>
            <LegalLinkFooterButton 
              href={generateUrl("privacy.html")}
              $isHovered={hoverLink === 'privacy'}
              onMouseEnter={() => setHoverLink('privacy')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t("Privacy Policy")}
            </LegalLinkFooterButton>
            <LegalLinkFooterButton 
              href={generateUrl("support.html")}
              $isHovered={hoverLink === 'support'}
              onMouseEnter={() => setHoverLink('support')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t("Support")}
            </LegalLinkFooterButton>
          </LegalLinksFooter>
        </ContentWrapper>
      </AppContainer>
    </>
  )
}

// Get stored language or default
const storedLanguage = localStorage.getItem("preferred-language") || 
                      localStorage.getItem("user_language") || 
                      "en";

// Render the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <I18nProvider 
    initialLanguage={storedLanguage} 
    preloadLanguages={["en"]}
  >
    <TokenLoginPage />
  </I18nProvider>
);