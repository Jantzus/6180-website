import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, AWS_REGION, COGNITO_CLIENT_ID } from "@/lib/config"
import { I18nProvider, useTranslation } from "@/components/LanguageSelector";
import styled from 'styled-components'
import {
  AppContainer,
  Logo
} from "@/styles/styled-components";
import {
  Content,
  Button,
  Footer,
  FooterLink
} from '@/styles/index-styled-components'

const cognito = new CognitoIdentityProviderClient({ region: AWS_REGION })

// Additional styled components specific to login page
const LoginCard = styled.div`
  max-width: 400px;
  width: 100%;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.06);
  text-align: center;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
`;

const LoginHeader = styled.div`
  margin-bottom: 24px;
`;

const LogoImage = styled(Logo)`
  height: 60px;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  box-sizing: border-box;
`;

const OtpInput = styled(Input)`
  letter-spacing: 2px;
  text-align: center;
`;

const InfoText = styled.p`
  font-size: 13px;
  color: #666;
  margin-top: 16px;
  text-align: center;
`;

const ResendWrapper = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  opacity: ${props => props.disabled ? 0.7 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
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

const LoginContent = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [session, setSession] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Use the i18n hook
  const { t, language } = useTranslation()
  
  // Refs for input elements
  const emailInputRef = useRef<HTMLInputElement>(null)
  const otpInputRef = useRef<HTMLInputElement>(null)

  // Check if current language is RTL
  const isRTL = ['ar', 'he', 'fa', 'ur', 'ps', 'sd'].includes(language.split('-')[0])

  useEffect(() => {
    // Set HTML dir attribute for RTL languages
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [language, isRTL])

  // Focus the OTP input when code is sent
  useEffect(() => {
    if (codeSent && otpInputRef.current) {
      otpInputRef.current.focus()
    }
  }, [codeSent])

  // Get the redirect parameter, defaulting to my-albums.html if not provided
  const redirectParam = new URLSearchParams(location.search).get('redirect') || '/my-albums.html'
  
  // Security enhancement: Validate redirect URL to prevent open redirect vulnerabilities
  const isValidRedirect = (url: string): boolean => {
    // Allow relative paths or URLs to your own domain
    return url.startsWith('/') || 
           url.startsWith(window.location.origin) || 
           /^https?:\/\/([\w-]+\.)*6180\.app(\/.*)?$/.test(url)
  }
  
  // Ensure the redirect path is properly formatted and secure
  const redirectTo = isValidRedirect(redirectParam) ? 
                     (redirectParam.startsWith('http') ? redirectParam : 
                     (redirectParam.startsWith('/') ? redirectParam : `/${redirectParam}`)) :
                     '/my-albums.html' // Fallback to safe default if invalid

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
        Password: crypto.randomUUID(),
        UserAttributes: [{ Name: 'email', Value: normalizedEmail }],
      })

      try {
        await cognito.send(signUpCommand)
      } catch (e: any) {
        if (!e.name?.includes('UsernameExistsException')) {
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
      localStorage.setItem('idToken', token)

      const payload = JSON.parse(atob(token.split('.')[1]))
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
        localStorage.setItem('publicUsername', displayName)
      }

      // Redirect to the specified page after successful login
      window.location.href = redirectTo

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
    <AppContainer isRTL={isRTL}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoginCard>
          <LoginHeader>
            <LogoImage 
              src="images/logo_no_background.png" 
              alt="6180 Logo" 
            />
            <LoginTitle>
              {t('Sign in to 6180')}
            </LoginTitle>
          </LoginHeader>

          {errorMessage && (
            <ErrorMessage>
              {errorMessage}
            </ErrorMessage>
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
              <LoginButton
                primary
                onClick={sendCode}
                disabled={status === 'sending' || !email.trim()}
              >
                {status === 'sending' ? t('Sending...') : t('Send Verification Code')}
              </LoginButton>
              <InfoText>
                {t('We\'ll send a secure verification code to your email')}
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
              <LoginButton
                primary
                onClick={confirmCode}
                disabled={status === 'verifying' || otpCode.length !== 6}
                style={{ backgroundColor: '#28a745' }}
              >
                {status === 'verifying' ? t('Verifying...') : t('Verify Code')}
              </LoginButton>
              <ResendWrapper>
                <span>{t("Didn't receive a code?")}</span>
                <ResendButton onClick={handleResendCode}>
                  {t('Send new code')}
                </ResendButton>
              </ResendWrapper>
            </>
          )}
        </LoginCard>
      </Content>
      
      <Footer>
        <FooterLink href="terms.html">
          Terms of Service
        </FooterLink>
        <FooterLink href="privacy.html">
          Privacy Policy
        </FooterLink>
        <FooterLink href="support.html">
          Support
        </FooterLink>
      </Footer>
    </AppContainer>
  )
}

const Login = () => {
  return (
    <I18nProvider>
      <LoginContent />
    </I18nProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Login />)