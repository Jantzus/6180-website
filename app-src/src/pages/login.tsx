import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { GRAPHQL_ENDPOINT, REGION, CLIENT_ID } from "@/lib/config"
import { I18nProvider, useTranslation, LanguageSelector } from '@/lib/i18n/react'

const cognito = new CognitoIdentityProviderClient({ region: REGION })

function normalizeEmail(input: string): string {
  const trimmed = input.trim().toLowerCase()
  const gmailSuffix = "@gmail.com"
  if (trimmed.endsWith(gmailSuffix)) {
    const localPart = trimmed.slice(0, -gmailSuffix.length).replace(/\./g, "")
    return `${localPart}${gmailSuffix}`
  }
  return trimmed
}

// We need to add these translation keys to the translations.ts file
// but for this example we'll work with what we have
const LoginContent = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [session, setSession] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'error'>('idle')
  
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

  const redirectTo = new URLSearchParams(location.search).get('redirect') || 'my-albums.html'

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
    const normalizedEmail = normalizeEmail(email)

    try {
      const signUpCommand = new SignUpCommand({
        ClientId: CLIENT_ID,
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
        ClientId: CLIENT_ID,
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
      alert(t('Failed to send code. Please try again.'))
    }
  }

  async function confirmCode() {
    setStatus('verifying')
    const normalizedEmail = normalizeEmail(email)

    try {
      const confirmCommand = new RespondToAuthChallengeCommand({
        ClientId: CLIENT_ID,
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

      const gqlResponse = await fetch(GRAPHQL_ENDPOINT, {
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

      window.location.href = redirectTo

    } catch (e) {
      console.error(e)
      setStatus('error')
      alert(t('Invalid or expired code. Please try again. Consider restarting.'))
    }
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      <div style={{ 
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        zIndex: 100,
        padding: '6px',
      }}>
        <LanguageSelector 
          className="language-selector-login"
        />
      </div>
      
      <div style={{
        maxWidth: 400,
        width: '100%',
        background: '#ffffff',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        textAlign: 'center',
      }}>

        <h2 style={{
          marginBottom: '24px',
          fontSize: '24px',
          fontWeight: 600,
          color: '#333',
        }}>
          {t('Sign in to 6180')}
        </h2>

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
              disabled={status === 'sending'}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'sending' ? t('Sending...') : t('Send Login Code')}
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '16px', color: '#555' }}>
              {t('Check your email for a 6-digit code.')}
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
                cursor: 'pointer',
                opacity: (status === 'verifying' || otpCode.length !== 6) ? 0.7 : 1,
              }}
            >
              {status === 'verifying' ? t('Verifying...') : t('Confirm Code')}
            </button>
          </>
        )}
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