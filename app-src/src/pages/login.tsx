import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { AWS_PRIVATE_GRAPHQL_ENDPOINT, AWS_REGION, COGNITO_CLIENT_ID } from "@/lib/config"
import { I18nProvider, useTranslation } from '@/lib/i18n/react'

const cognito = new CognitoIdentityProviderClient({ region: AWS_REGION })

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

  useEffect(() => {
    // Set HTML dir attribute for RTL languages
    document.documentElement.dir = 
      ['ar', 'he', 'fa', 'ur', 'ps', 'sd'].includes(language.split('-')[0]) ? 'rtl' : 'ltr'
  }, [language])

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
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
        maxWidth: 400,
        width: '100%',
        background: '#ffffff',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        textAlign: 'center',
      }}>
        <div style={{ marginBottom: '24px' }}>
          <img 
            src="images/logo_no_background.png" 
            alt="6180 Logo" 
            style={{ 
              height: '60px', 
              marginBottom: '16px' 
            }} 
          />
          <h2 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#333',
          }}>
            {t('Sign in to 6180')}
          </h2>
        </div>

        {errorMessage && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {errorMessage}
          </div>
        )}

        {!codeSent ? (
          <>
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('Enter your email')}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={sendCode}
              disabled={status === 'sending' || !email.trim()}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: status === 'sending' || !email.trim() ? 'not-allowed' : 'pointer',
                opacity: status === 'sending' || !email.trim() ? 0.7 : 1,
              }}
            >
              {status === 'sending' ? t('Sending...') : t('Send Verification Code')}
            </button>
            <p style={{ 
              fontSize: '13px', 
              color: '#666', 
              marginTop: '16px',
              textAlign: 'center' 
            }}>
              {t('We\'ll send a secure verification code to your email')}
            </p>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '16px', color: '#555' }}>
              {t('Check your email for a 6-digit verification code sent to')} <strong>{email}</strong>
            </p>
            <input
              ref={otpInputRef}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={otpCode}
              onChange={handleOtpChange}
              placeholder={t('Enter 6-digit code')}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
                boxSizing: 'border-box',
                letterSpacing: '2px',
                textAlign: 'center',
              }}
            />
            <button
              onClick={confirmCode}
              disabled={status === 'verifying' || otpCode.length !== 6}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: (status === 'verifying' || otpCode.length !== 6) ? 'not-allowed' : 'pointer',
                opacity: (status === 'verifying' || otpCode.length !== 6) ? 0.7 : 1,
              }}
            >
              {status === 'verifying' ? t('Verifying...') : t('Verify Code')}
            </button>
            <div style={{ 
              marginTop: '16px', 
              fontSize: '14px', 
              color: '#666',
              display: 'flex',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <span>{t("Didn't receive a code?")}</span>
              <button 
                onClick={handleResendCode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#007bff',
                  padding: 0,
                  cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline',
                }}
              >
                {t('Send new code')}
              </button>
            </div>
          </>
        )}
        

      </div>
      </div>
      
      <div style={{ 
        textAlign: 'center',
        padding: '20px',
        fontSize: '0.9em',
        color: '#555',
      }}>
        <a href="terms.html" style={{ margin: '0 10px', color: '#555', textDecoration: 'none' }}>
          Terms of Service
        </a>
        <a href="privacy.html" style={{ margin: '0 10px', color: '#555', textDecoration: 'none' }}>
          Privacy Policy
        </a>
        <a href="support.html" style={{ margin: '0 10px', color: '#555', textDecoration: 'none' }}>
          Support
        </a>
      </div>
    </div>
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