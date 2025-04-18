import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider'

const REGION = 'us-east-1'
const CLIENT_ID = '1r1gppqh9cat1debtgpghslvgl'
const cognito = new CognitoIdentityProviderClient({ region: REGION })

function normalizeEmail(input: string): string {
  const trimmed = input.trim().toLowerCase()
  const gmailSuffix = "@gmail.com"
  if (trimmed.endsWith(gmailSuffix)) {
    const localPart = trimmed
      .slice(0, -gmailSuffix.length)
      .replace(/\./g, "")
    return `${localPart}${gmailSuffix}`
  }
  return trimmed
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [session, setSession] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'error'>('idle')

  const redirectTo = new URLSearchParams(location.search).get('redirect') || 'my-albums.html'

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
      alert('Failed to send code. Please try again.')
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

      if (token) {
        localStorage.setItem('idToken', token)
        window.location.href = `/app/${redirectTo}`
      } else {
        throw new Error('No token received')
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
      alert('Invalid code. Please try again.')
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h2>Sign in to 6180</h2>
      {!codeSent ? (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{ width: '100%', padding: '10px', marginBottom: 12 }}
          />
          <button onClick={sendCode} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Login Code'}
          </button>
        </>
      ) : (
        <>
          <p>Check your email for a 6-digit code.</p>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            placeholder="Enter 6-digit code"
            style={{ width: '100%', padding: '10px', marginBottom: 12 }}
          />
          <button onClick={confirmCode} disabled={status === 'verifying'}>
            {status === 'verifying' ? 'Verifying...' : 'Confirm Code'}
          </button>
        </>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Login />)