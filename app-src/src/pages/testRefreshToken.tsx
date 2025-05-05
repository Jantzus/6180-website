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

// Token refresh function for testing
async function refreshTokenIfNeeded(forceRefresh = false): Promise<string | null> {
  // Get the current token
  const currentToken = localStorage.getItem('idToken')
  const refreshToken = localStorage.getItem('refreshToken')
  
  // Return null if no token exists
  if (!currentToken) {
    console.log('No ID token found in localStorage')
    return null
  }
  
  if (!refreshToken) {
    console.log('No refresh token found in localStorage')
    return null
  }
  
  try {
    // Parse the token payload to check expiration
    const payload = JSON.parse(atob(currentToken.split('.')[1]))
    const expirationTime = payload.exp * 1000 // Convert to milliseconds
    const currentTime = Date.now()
    
    // Add logging to help diagnose issues
    console.log('Token expiration check:')
    console.log('- Current time:', new Date(currentTime).toISOString())
    console.log('- Token expires:', new Date(expirationTime).toISOString())
    console.log('- Seconds until expiration:', Math.floor((expirationTime - currentTime) / 1000))
    
    // Check if token is still valid (not expired and not forced refresh)
    // Refresh if it expires in less than 5 minutes or if forceRefresh is true
    const fiveMinutesInMs = 5 * 60 * 1000
    if (!forceRefresh && expirationTime - currentTime > fiveMinutesInMs) {
      console.log('Token is still valid, no refresh needed')
      return currentToken
    }
    
    console.log('Token needs refresh. Attempting to refresh...')
    
    // Option 1: Use Cognito Client directly (client-side approach)
    try {
      console.log('Trying direct Cognito refresh...')
      const refreshCommand = new InitiateAuthCommand({
        ClientId: COGNITO_CLIENT_ID,
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      })
      
      console.log('Sending refresh token request to Cognito...')
      const response = await cognito.send(refreshCommand)
      console.log('Received response from Cognito:', Object.keys(response))
      
      if (!response.AuthenticationResult?.IdToken) {
        console.error('No ID token in refresh response')
        throw new Error('Direct refresh failed - no ID token returned')
      }
      
      // Store the new tokens
      console.log('Storing new tokens from direct Cognito refresh')
      const newIdToken = response.AuthenticationResult.IdToken
      localStorage.setItem('idToken', newIdToken)
      
      // Store the new refresh token if provided, otherwise keep using the current one
      if (response.AuthenticationResult.RefreshToken) {
        localStorage.setItem('refreshToken', response.AuthenticationResult.RefreshToken)
      }
      
      return newIdToken
    } catch (directError) {
      console.error('Direct Cognito refresh failed:', directError)
      console.log('Falling back to API endpoint refresh...')
      
      // Option 2: Use your Lambda API endpoint (similar to your Lambda function)
      try {
        // This would be your actual API endpoint for refreshing tokens
        const refreshEndpoint = '/api/refresh-token' // Update this to your actual endpoint
        
        console.log(`Sending refresh request to API endpoint: ${refreshEndpoint}`)
        const refreshResponse = await fetch(refreshEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
            appClientId: COGNITO_CLIENT_ID,
          }),
        })
        
        if (!refreshResponse.ok) {
          const errorText = await refreshResponse.text()
          console.error(`API refresh failed with status ${refreshResponse.status}:`, errorText)
          throw new Error(`API refresh failed: ${refreshResponse.status}`)
        }
        
        const refreshData = await refreshResponse.json()
        console.log('Received token refresh response from API:', Object.keys(refreshData))
        
        if (!refreshData.idToken) {
          console.error('No ID token in API refresh response')
          throw new Error('API refresh failed - no ID token returned')
        }
        
        // Store the new tokens
        console.log('Storing new tokens from API refresh')
        localStorage.setItem('idToken', refreshData.idToken)
        
        return refreshData.idToken
      } catch (apiError) {
        console.error('API endpoint refresh failed:', apiError)
        
        // Both refresh methods failed
        console.error('All refresh methods failed')
        return null
      }
    }
  } catch (error) {
    console.error('Error in token refresh process:', error)
    return null
  }
}

const TestRefreshTokenContent = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [session, setSession] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'refreshing' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [logMessages, setLogMessages] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [tokenInfo, setTokenInfo] = useState<{
    token: string | null;
    expiresAt: string | null;
    username: string | null;
    refreshToken: string | null;
  }>({
    token: null,
    expiresAt: null,
    username: null,
    refreshToken: null
  })
  
  // Use the i18n hook
  const { t } = useTranslation()
  
  // Refs for input elements
  const emailInputRef = useRef<HTMLInputElement>(null)
  const otpInputRef = useRef<HTMLInputElement>(null)
  const logContainerRef = useRef<HTMLDivElement>(null)

  // Add to log function
  const addLog = (message: string) => {
    const timestamp = new Date().toISOString().split('T')[1].slice(0, 8)
    const logEntry = `[${timestamp}] ${message}`
    setLogMessages(prev => [...prev, logEntry])
    
    // Scroll to bottom of log container
    setTimeout(() => {
      if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
      }
    }, 100)
  }

  // Check login status on load
  useEffect(() => {
    checkLoginStatus()
  }, [])
  
  // Function to check if user is logged in
  const checkLoginStatus = () => {
    const token = localStorage.getItem('idToken')
    const refreshToken = localStorage.getItem('refreshToken')
    
    if (token) {
      try {
        // Parse token to get info
        const payload = JSON.parse(atob(token.split('.')[1]))
        const expirationTime = payload.exp * 1000 // Convert to milliseconds
        const username = payload['cognito:username'] || payload.email
        
        setTokenInfo({
          token: token,
          expiresAt: new Date(expirationTime).toISOString(),
          username: username,
          refreshToken: refreshToken || null
        })
        
        // Check if token is expired
        if (expirationTime > Date.now()) {
          setIsLoggedIn(true)
          addLog(`Logged in as ${username}`)
          addLog(`Token expires at ${new Date(expirationTime).toLocaleString()}`)
          if (refreshToken) {
            addLog('Refresh token is available')
          } else {
            addLog('WARNING: No refresh token found in localStorage')
          }
        } else {
          addLog('Token is expired')
          setIsLoggedIn(false)
        }
      } catch (e) {
        addLog('Error parsing token')
        setIsLoggedIn(false)
      }
    } else {
      addLog('No token found')
      setIsLoggedIn(false)
    }
  }

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
    addLog(`Sending code to ${email}`)
    const normalizedEmail = normalizeEmail(email)
    
    // Basic email validation
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus('error')
      setErrorMessage(t('Please enter a valid email address'))
      addLog('Invalid email address')
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
        addLog('User signed up successfully')
      } catch (e: any) {
        if (!e.name?.includes('UsernameExistsException')) {
          throw e
        }
        addLog('User already exists, continuing to authentication')
      }

      const signInCommand = new InitiateAuthCommand({
        ClientId: COGNITO_CLIENT_ID,
        AuthFlow: 'CUSTOM_AUTH',
        AuthParameters: { USERNAME: normalizedEmail },
      })

      addLog('Initiating auth flow')
      const response = await cognito.send(signInCommand)

      if (response.Session) {
        setSession(response.Session)
        setCodeSent(true)
        setStatus('idle')
        addLog('Verification code sent successfully')
      } else {
        throw new Error('No session returned from InitiateAuth')
      }
    } catch (e) {
      console.error(e)
      setStatus('error')
      setErrorMessage(t('Unable to send verification code. Please try again later.'))
      addLog(`Error sending code: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
  }

  async function confirmCode() {
    setStatus('verifying')
    setErrorMessage('')
    addLog('Verifying code...')
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
      const idToken = response.AuthenticationResult?.IdToken
      const refreshToken = response.AuthenticationResult?.RefreshToken
      const accessToken = response.AuthenticationResult?.AccessToken

      if (!idToken) {
        throw new Error('No ID token received')
      }
      
      // Store tokens
      localStorage.setItem('idToken', idToken)
      
      // Log what tokens we received
      addLog('Authentication successful')
      addLog(`ID Token received: ${!!idToken}`)
      addLog(`Access Token received: ${!!accessToken}`)
      addLog(`Refresh Token received: ${!!refreshToken}`)
      
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
        addLog('Refresh token stored in localStorage')
      } else {
        addLog('WARNING: No refresh token received from Cognito')
      }
      
      // Store access token if received
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        addLog('Access token stored in localStorage')
      }

      const payload = JSON.parse(atob(idToken.split('.')[1]))
      const username = payload['cognito:username'] || payload.email
      const expiresAt = new Date(payload.exp * 1000).toISOString()
      
      addLog(`User authenticated: ${username}`)
      addLog(`Token expires at: ${expiresAt}`)
      
      setTokenInfo({
        token: idToken,
        expiresAt: expiresAt,
        username: username,
        refreshToken: refreshToken || null
      })
      
      const relationId = `${username}_____Public____Profile`

      addLog('Fetching user profile information')
      const gqlResponse = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
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
      
      // Log the GraphQL response
      addLog(`GraphQL response: ${JSON.stringify(json).substring(0, 200)}...`)
      
      if (json.errors) {
        addLog(`GraphQL errors: ${JSON.stringify(json.errors)}`)
      }
      
      const displayName = json?.data?.batchGetItems?.items?.[0]?.item?.anyDisplayName
      
      if (displayName) {
        localStorage.setItem('publicUsername', displayName)
        addLog(`Display name: ${displayName}`)
      } else {
        addLog('No display name found')
      }

      setIsLoggedIn(true)
      setStatus('idle')
      
    } catch (e) {
      console.error(e)
      setStatus('error')
      setErrorMessage(t('Invalid or expired verification code. Please try again or request a new code.'))
      addLog(`Error verifying code: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
  }

  // Function to test token refresh
  async function testRefreshToken(forceRefresh = false) {
    setStatus('refreshing')
    addLog(`Testing token refresh (Force: ${forceRefresh})`)
    
    // Create function to intercept console logs
    const originalLog = console.log
    const originalError = console.error
    
    console.log = (...args) => {
      originalLog(...args)
      addLog(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' '))
    }
    
    console.error = (...args) => {
      originalError(...args)
      addLog(`ERROR: ${args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ')}`)
    }
    
    try {
      // Display what tokens we have before refreshing
      const currentRefreshToken = localStorage.getItem('refreshToken')
      const currentIdToken = localStorage.getItem('idToken')
      const currentAccessToken = localStorage.getItem('accessToken')
      
      addLog('Current tokens in localStorage:')
      addLog(`- ID Token: ${currentIdToken ? 'Present' : 'Missing'}`)
      addLog(`- Refresh Token: ${currentRefreshToken ? 'Present' : 'Missing'}`)
      addLog(`- Access Token: ${currentAccessToken ? 'Present' : 'Missing'}`)
      
      if (currentIdToken) {
        try {
          const payload = JSON.parse(atob(currentIdToken.split('.')[1]))
          const tokenType = payload.token_use || 'unknown'
          addLog(`- ID Token type: ${tokenType}`)
          addLog(`- ID Token expires: ${new Date(payload.exp * 1000).toLocaleString()}`)
        } catch (e) {
          addLog('- Error parsing ID token')
        }
      }
      
      // Test the refresh process
      const newToken = await refreshTokenIfNeeded(forceRefresh)
      
      if (newToken) {
        addLog('Token refresh successful')
        const payload = JSON.parse(atob(newToken.split('.')[1]))
        const expiresAt = new Date(payload.exp * 1000).toISOString()
        const storedRefreshToken = localStorage.getItem('refreshToken')
        
        setTokenInfo({
          token: newToken,
          expiresAt: expiresAt,
          username: payload['cognito:username'] || payload.email,
          refreshToken: storedRefreshToken || null
        })
        
        // Test if the new token works with an API call
        addLog('Testing new token with API call...')
        try {
          // Use the fetchFolder query from your apiService.ts as a test
          const fetchRelationsInput = {
            targetItemIdentifier____RelationType: `test____Folder`,
            index: "targetItemIdentifier____RelationType",
            limit: 1,
            scanIndexForward: false,
            nextToken: null
          }
          
          const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`
            },
            body: JSON.stringify({
              query: `
                mutation FetchFolders($fetchRelationsInput: FetchRelationsInput!) {
                  fetchRelations(input: $fetchRelationsInput) {
                    items {
                      id
                      folderName
                      folderDescription
                    }
                    nextToken
                  }
                }
              `,
              variables: {
                fetchRelationsInput: fetchRelationsInput
              }
            })
          })
          
          const json = await response.json()
          addLog(`API call response: ${JSON.stringify(json).substring(0, 200)}...`)
          
          if (json.errors) {
            addLog(`API call errors: ${JSON.stringify(json.errors)}`)
          } else if (json.data?.fetchRelations?.items) {
            addLog(`API call successful, retrieved ${json.data.fetchRelations.items.length} items`)
          }
        } catch (apiError) {
          addLog(`API call failed: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`)
        }
      } else {
        addLog('Token refresh failed or not needed')
      }
    } catch (error) {
      addLog(`Token refresh error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      // Restore original console functions
      console.log = originalLog
      console.error = originalError
      setStatus('idle')
    }
  }

  // Function to logout
  function handleLogout() {
    localStorage.removeItem('idToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('publicUsername')
    setIsLoggedIn(false)
    setTokenInfo({
      token: null,
      expiresAt: null,
      username: null,
      refreshToken: null
    })
    addLog('Logged out')
  }

  // Function to resend code if needed
  function handleResendCode() {
    setCodeSent(false)
    setOtpCode('')
    setStatus('idle')
    addLog('Resending code...')
  }

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '15px',
        backgroundColor: '#007bff',
        color: 'white',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: '0', fontSize: '24px' }}>Token Refresh Testing Page</h1>
      </div>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '15px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        overflow: 'auto',
      }}>
        {/* Authentication section */}
        <div style={{
          background: '#ffffff',
          padding: '15px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '15px',
        }}>
          <h2>Authentication</h2>
          
          {!isLoggedIn ? (
            !codeSent ? (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('Enter your email')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>
                <button
                  onClick={sendCode}
                  disabled={status === 'sending' || !email.trim()}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: status === 'sending' || !email.trim() ? 'not-allowed' : 'pointer',
                    opacity: status === 'sending' || !email.trim() ? 0.7 : 1,
                  }}
                >
                  {status === 'sending' ? t('Sending...') : t('Send Verification Code')}
                </button>
              </>
            ) : (
              <>
                <p>Check your email for a 6-digit verification code sent to <strong>{email}</strong></p>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>Verification Code</label>
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
                      padding: '10px',
                      borderRadius: '4px',
                      border: '1px solid #ccc',
                      textAlign: 'center',
                      letterSpacing: '2px',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={confirmCode}
                    disabled={status === 'verifying' || otpCode.length !== 6}
                    style={{
                      padding: '10px 15px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: (status === 'verifying' || otpCode.length !== 6) ? 'not-allowed' : 'pointer',
                      opacity: (status === 'verifying' || otpCode.length !== 6) ? 0.7 : 1,
                    }}
                  >
                    {status === 'verifying' ? t('Verifying...') : t('Verify Code')}
                  </button>
                  <button 
                    onClick={handleResendCode}
                    style={{
                      padding: '10px 15px',
                      backgroundColor: '#6c757d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {t('Resend Code')}
                  </button>
                </div>
              </>
            )
          ) : (
            <>
              <div style={{ 
                backgroundColor: '#d4edda', 
                color: '#155724', 
                padding: '10px', 
                borderRadius: '4px',
                marginBottom: '15px'
              }}>
                Logged in as <strong>{tokenInfo.username}</strong>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <h3>Token Information:</h3>
                <p><strong>Expires:</strong> {tokenInfo.expiresAt ? new Date(tokenInfo.expiresAt).toLocaleString() : 'Unknown'}</p>
                <p><strong>Time until expiration:</strong> {
                  tokenInfo.expiresAt ? 
                    Math.max(0, Math.floor((new Date(tokenInfo.expiresAt).getTime() - Date.now()) / 1000)) + ' seconds' : 
                    'Unknown'
                }</p>
                <p><strong>Refresh token:</strong> {tokenInfo.refreshToken ? 'Available' : 'Not available'}</p>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <h3>Token Tools:</h3>
                <div>
                  <button
                    onClick={() => {
                      const token = localStorage.getItem('idToken')
                      if (token) {
                        const payload = JSON.parse(atob(token.split('.')[1]))
                        addLog('ID Token payload:')
                        addLog(JSON.stringify(payload, null, 2))
                      } else {
                        addLog('No ID token available')
                      }
                    }}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#6c757d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    View Token Payload
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('refreshToken')
                      addLog('Refresh token removed from localStorage')
                      checkLoginStatus()
                    }}
                    style={{
                      padding: '8px 12px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove Refresh Token
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button
                  onClick={() => testRefreshToken(false)}
                  disabled={status !== 'idle'}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: status !== 'idle' ? 'not-allowed' : 'pointer',
                    opacity: status !== 'idle' ? 0.7 : 1,
                  }}
                >
                  {status === 'refreshing' ? 'Refreshing...' : 'Test Auto-Refresh'}
                </button>
                
                <button
                  onClick={() => testRefreshToken(true)}
                  disabled={status !== 'idle'}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#17a2b8',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: status !== 'idle' ? 'not-allowed' : 'pointer',
                    opacity: status !== 'idle' ? 0.7 : 1,
                  }}
                >
                  {status === 'refreshing' ? 'Refreshing...' : 'Force Refresh'}
                </button>
                
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          )}
          
          {errorMessage && (
            <div style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '10px',
              borderRadius: '4px',
              marginTop: '10px',
            }}>
              {errorMessage}
            </div>
          )}
        </div>
        
        {/* Log console */}
        <div style={{
          background: '#2d2d2d',
          color: '#e6e6e6',
          padding: '10px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: '200px',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            color: '#a4b1cd',
          }}>
            <span>Log Console</span>
            <button
              onClick={() => setLogMessages([])}
              style={{
                padding: '2px 8px',
                backgroundColor: '#3a3a3a',
                color: '#e6e6e6',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Clear
            </button>
          </div>
          <div 
            ref={logContainerRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '5px',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
            }}
          >
            {logMessages.length === 0 ? (
              <div style={{ color: '#6c757d', fontStyle: 'italic' }}>Logs will appear here...</div>
            ) : (
              <>
                {logMessages.map((msg, i) => (
                  <div key={i} style={{ 
                    padding: '2px 0',
                    borderBottom: i !== logMessages.length - 1 ? '1px solid #333' : 'none',
                    color: msg.includes('ERROR:') ? '#f77' : 
                           msg.includes('WARNING:') ? '#fc6' : 
                           msg.includes('success') ? '#7d7' : '#ddd',
                    wordBreak: 'break-word'
                  }}>
                    {msg}
                  </div>
                ))}
                <div style={{ height: '20px' }}></div> {/* Extra padding at bottom */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const TestRefreshToken = () => {
  return (
    <I18nProvider>
      <TestRefreshTokenContent />
    </I18nProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<TestRefreshToken />)