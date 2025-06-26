import { useState, useEffect, useRef, useCallback } from 'react'
import ReactDOM from 'react-dom/client'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, AWS_REGION, COGNITO_CLIENT_ID } from "@/lib/config"
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from '@/lib/i18n';
import { redirectTo, generateUrl } from "@/lib/utils";
import styled from 'styled-components'
import {
  Input
} from "@/styles/components/forms";
import {
  AppContainer,
  Card,
  Message,
  LegalLinksFooter,
  LegalLinkFooterButton,
} from "@/styles/components/layout";
import { 
  Button,
} from "@/styles/components/buttons";
import { GlobalStyle } from "@/styles/globalStyles";
import {
  OtpInput,
  InfoText,
  ResendWrapper,
  ResendButton,
  ContentWrapper
} from "@/styles/loginStyles";
import { LOCAL_STORAGE_KEYS } from '@/lib/config';

const cognito = new CognitoIdentityProviderClient({ region: AWS_REGION })

// ===== SSR-SAFE HOOKS =====

// Hook for safe document API access
const useDocumentAPI = () => {
  const [isClient, setIsClient] = useState(false);
  const [documentObj, setDocumentObj] = useState<Document | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof document !== 'undefined') {
      setDocumentObj(document);
    }
  }, []);

  const setDocumentLang = useCallback((lang: string) => {
    if (isClient && documentObj) {
      documentObj.documentElement.lang = lang;
    }
  }, [isClient, documentObj]);

  const setDocumentDir = useCallback((dir: 'ltr' | 'rtl') => {
    if (isClient && documentObj) {
      documentObj.documentElement.dir = dir;
    }
  }, [isClient, documentObj]);

  return { setDocumentLang, setDocumentDir, isClient };
};

// Hook for safe localStorage access
const useLocalStorage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const setItem = useCallback((key: string, value: string): void => {
    if (!isClient || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail if localStorage is not available
      console.warn('localStorage not available');
    }
  }, [isClient]);

  const getItem = useCallback((key: string): string | null => {
    if (!isClient || typeof localStorage === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [isClient]);

  return { setItem, getItem, isClient };
};

// Hook for safe crypto API access with fallback
const useCryptoAPI = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateUUID = useCallback((): string => {
    if (isClient && typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    
    // Fallback UUID generation for SSR or when crypto is not available
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }, [isClient]);

  return { generateUUID, isClient };
};

// Additional styled components specific to login page
const LoginCard = styled(Card)`
  max-width: 450px;
  width: 100%;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`;

const LoginHeader = styled.div`
  margin-bottom: 24px;
`;

const LogoImage = styled.img`
  height: 60px;
  margin-bottom: 16px;
`;

const CenteredContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function normalizeEmail(input: string): string {
  const trimmed = input.trim().toLowerCase()
  const gmailSuffix = "@gmail.com"
  if (trimmed.endsWith(gmailSuffix)) {
    const localPart = trimmed.slice(0, -gmailSuffix.length).replace(/\./g, "")
    return `${localPart}${gmailSuffix}`
  }
  return trimmed
}

export const StorageLoginPageContent = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [session, setSession] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [hoverLink, setHoverLink] = useState<string | null>(null)
  
  // Use the i18n hook
  const { t, language } = useTranslation()
  
  // Use SSR-safe hooks
  const { setDocumentLang, setDocumentDir } = useDocumentAPI();
  const localStorageHook = useLocalStorage();
  const { generateUUID } = useCryptoAPI();
  
  // Refs for input elements
  const emailInputRef = useRef<HTMLInputElement>(null)
  const otpInputRef = useRef<HTMLInputElement>(null)

  // Check if current language is RTL (SSR-safe default)
  const isRTL = getLanguageDirection(language) === 'rtl'

  // Update HTML document properties when language changes - SSR safe
  useEffect(() => {
    setDocumentLang(language);
    setDocumentDir(isRTL ? 'rtl' : 'ltr');
  }, [language, isRTL, setDocumentLang, setDocumentDir])

  // Focus the OTP input when code is sent
  useEffect(() => {
    if (codeSent && otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [codeSent])

  // Always redirect to storage/manage.html after successful login
  const redirectPath = "storage/manage.html"

  // Only allow numeric input for OTP code
  function handleOtpChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    // Only accept numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtpCode(value)
    }
  }

  async function sendCode() {
    setStatus('sending')
    setErrorMessage('')
    const normalizedEmail = normalizeEmail(email)
    
    // Basic email validation
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus('error')
      setErrorMessage(t('Please enter a valid email address'))
      return
    }

    try {
      const signUpCommand = new SignUpCommand({
        ClientId: COGNITO_CLIENT_ID,
        Username: normalizedEmail,
        Password: generateUUID(), // Use SSR-safe UUID generation
        UserAttributes: [{ Name: 'email', Value: normalizedEmail }],
      })

      try {
        await cognito.send(signUpCommand)
      } catch (e: unknown) {
        // Fix: Properly type the error parameter
        const error = e as { name?: string }
        if (!error.name?.includes('UsernameExistsException')) {
          throw e
        }
      }

      const signInCommand = new InitiateAuthCommand({
        ClientId: COGNITO_CLIENT_ID,
        AuthFlow: 'CUSTOM_AUTH',
        AuthParameters: { USERNAME: normalizedEmail },
      })

      const response = await cognito.send(signInCommand)

      if (response.Session) {
        setSession(response.Session)
        setCodeSent(true)
        setStatus('idle')
      } else {
        throw new Error('No session returned from InitiateAuth')
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
      setErrorMessage(t('Unable to send verification code. Please try again later.'))
    }
  }

  async function confirmCode() {
    setStatus('verifying')
    setErrorMessage('')
    const normalizedEmail = normalizeEmail(email)

    try {
      const confirmCommand = new RespondToAuthChallengeCommand({
        ClientId: COGNITO_CLIENT_ID,
        ChallengeName: 'CUSTOM_CHALLENGE',
        ChallengeResponses: {
          USERNAME: normalizedEmail,
          ANSWER: otpCode,
        },
        Session: session,
      })

      const response = await cognito.send(confirmCommand)
      const token = response.AuthenticationResult?.IdToken

      if (!token) throw new Error('No token received')
      
      // Use SSR-safe localStorage from hook
      localStorageHook.setItem('idToken', token)

      // SSR-safe token parsing
      let payload;
      try {
        if (typeof atob !== 'undefined') {
          payload = JSON.parse(atob(token.split('.')[1]))
        } else {
          // Fallback for environments without atob
          payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        }
      } catch {
        throw new Error('Failed to parse token')
      }

      const username = payload['cognito:username']
      const relationId = `${username}_____Public____Profile`

      const gqlResponse = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
        localStorageHook.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, displayName)
      }

      // Redirect to storage management page after successful login
      redirectTo(generateUrl(redirectPath))

    } catch (e) {
      console.error(e)
      setStatus('error')
      setErrorMessage(t('Invalid or expired verification code. Please try again or request a new code.'))
    }
  }

  // Function to resend code if needed
  function handleResendCode() {
    setCodeSent(false)
    setOtpCode('')
    setStatus('idle')
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer $isRTL={isRTL}>
        <ContentWrapper>
          <CenteredContent>
            <LoginCard>
              <LoginHeader>
                <LogoImage 
                  src={generateUrl("images/logo_no_background.png")}
                  alt="6180 Logo" 
                />
                <div style={{ fontSize: '18px', color: '#333', lineHeight: '1.5', marginBottom: '24px', textAlign: 'center' }}>
                  {t('Upgrade your subscription to continue uploading files.')}
                </div>
              </LoginHeader>

              {errorMessage && (
                <Message $type="error">
                  {errorMessage}
                </Message>
              )}

              {!codeSent ? (
                <>
                  <Input
                    ref={emailInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('Enter your email')}
                  />
                  <Button
                    $primary
                    onClick={sendCode}
                    disabled={status === 'sending' || !email.trim()}
                    style={{ width: '100%', padding: '12px', fontSize: '16px' }}
                  >
                    {status === 'sending' ? 
                      t('Sending...') : 
                      t('Send Verification Code')
                    }
                  </Button>
                  <InfoText>
                    {t("We'll send a secure verification code to your email")}
                  </InfoText>
                </>
              ) : (
                <>
                  <InfoText style={{ marginBottom: '16px', color: '#555' }}>
                    {t('Check your email for a 6-digit verification code sent to')} <strong>{email}</strong>
                  </InfoText>
                  <OtpInput
                    ref={otpInputRef}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otpCode}
                    onChange={handleOtpChange}
                    placeholder={t('Enter 6-digit code')}
                  />
                  <Button
                    $primary
                    onClick={confirmCode}
                    disabled={status === 'verifying' || otpCode.length !== 6}
                    style={{ width: '100%', padding: '12px', fontSize: '16px', backgroundColor: '#28a745' }}
                  >
                    {status === 'verifying' ? 
                      t('Verifying...') : 
                      t('Storage Management')
                    }
                  </Button>
                  <ResendWrapper>
                    <span>{t("Didn't receive a code?")}</span>
                    <ResendButton onClick={handleResendCode}>
                      {t('Send new code')}
                    </ResendButton>
                  </ResendWrapper>
                </>
              )}
            </LoginCard>
          </CenteredContent>
          
          <LegalLinksFooter>
            <LegalLinkFooterButton 
              href={generateUrl("terms.html")}
              $isHovered={hoverLink === 'terms'}
              onMouseEnter={() => setHoverLink('terms')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t('Terms of Service')}
            </LegalLinkFooterButton>
            <LegalLinkFooterButton 
              href={generateUrl("privacy.html")}
              $isHovered={hoverLink === 'privacy'}
              onMouseEnter={() => setHoverLink('privacy')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t('Privacy Policy')}
            </LegalLinkFooterButton>
            <LegalLinkFooterButton 
              href={generateUrl("support.html")}
              $isHovered={hoverLink === 'support'}
              onMouseEnter={() => setHoverLink('support')}
              onMouseLeave={() => setHoverLink(null)}
            >
              {t('Support')}
            </LegalLinkFooterButton>
          </LegalLinksFooter>
        </ContentWrapper>
      </AppContainer>
    </>
  )
}

// Wrap StorageLoginPageContent with I18nProvider
export const StorageLoginPage = () => {
  return (
    <I18nProvider>
      <StorageLoginPageContent />
    </I18nProvider>
  );
};

// SSR-safe rendering
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<StorageLoginPage />);
  }
}