import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { supportedLanguages } from "@/lib/languages"
import { GRAPHQL_ENDPOINT, REGION, CLIENT_ID, STORAGE_KEYS } from "@/lib/config"

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

// Define the translation interface
interface Translation {
  signIn: string;
  enterEmail: string;
  sendLoginCode: string;
  sending: string;
  checkEmail: string;
  enterCode: string;
  confirm: string;
  verifying: string;
  errorSending: string;
  errorVerifying: string;
  language: string;
}

// Translation object for all supported languages
const translations: Record<string, Translation> = {
  'en-US': {
    signIn: 'Sign in to 6180',
    enterEmail: 'Enter your email',
    sendLoginCode: 'Send Login Code',
    sending: 'Sending...',
    checkEmail: 'Check your email for a 6-digit code.',
    enterCode: 'Enter 6-digit code',
    confirm: 'Confirm Code',
    verifying: 'Verifying...',
    errorSending: 'Failed to send code. Please try again.',
    errorVerifying: 'Invalid or expired code. Please try again. Consider restarting.',
    language: 'Language',
  },
  'en': {
    signIn: 'Sign in to 6180',
    enterEmail: 'Enter your email',
    sendLoginCode: 'Send Login Code',
    sending: 'Sending...',
    checkEmail: 'Check your email for a 6-digit code.',
    enterCode: 'Enter 6-digit code',
    confirm: 'Confirm Code',
    verifying: 'Verifying...',
    errorSending: 'Failed to send code. Please try again.',
    errorVerifying: 'Invalid or expired code. Please try again. Consider restarting.',
    language: 'Language',
  },
  'zh-CN': {
    signIn: '登录到 6180',
    enterEmail: '输入您的电子邮件',
    sendLoginCode: '发送登录代码',
    sending: '发送中...',
    checkEmail: '请检查您的电子邮件，查收 6 位数代码。',
    enterCode: '输入 6 位数代码',
    confirm: '确认代码',
    verifying: '验证中...',
    errorSending: '发送代码失败。请重试。',
    errorVerifying: '无效或已过期的代码。请重试。考虑重新开始。',
    language: '语言',
  },
  'zh': {
    signIn: '登录到 6180',
    enterEmail: '输入您的电子邮件',
    sendLoginCode: '发送登录代码',
    sending: '发送中...',
    checkEmail: '请检查您的电子邮件，查收 6 位数代码。',
    enterCode: '输入 6 位数代码',
    confirm: '确认代码',
    verifying: '验证中...',
    errorSending: '发送代码失败。请重试。',
    errorVerifying: '无效或已过期的代码。请重试。考虑重新开始。',
    language: '语言',
  },
  'fr-FR': {
    signIn: 'Connectez-vous à 6180',
    enterEmail: 'Entrez votre email',
    sendLoginCode: 'Envoyer le code de connexion',
    sending: 'Envoi en cours...',
    checkEmail: 'Vérifiez votre email pour un code à 6 chiffres.',
    enterCode: 'Entrez le code à 6 chiffres',
    confirm: 'Confirmer le code',
    verifying: 'Vérification...',
    errorSending: 'Échec de l\'envoi du code. Veuillez réessayer.',
    errorVerifying: 'Code invalide ou expiré. Veuillez réessayer. Envisagez de redémarrer.',
    language: 'Langue',
  },
  'fr': {
    signIn: 'Connectez-vous à 6180',
    enterEmail: 'Entrez votre email',
    sendLoginCode: 'Envoyer le code de connexion',
    sending: 'Envoi en cours...',
    checkEmail: 'Vérifiez votre email pour un code à 6 chiffres.',
    enterCode: 'Entrez le code à 6 chiffres',
    confirm: 'Confirmer le code',
    verifying: 'Vérification...',
    errorSending: 'Échec de l\'envoi du code. Veuillez réessayer.',
    errorVerifying: 'Code invalide ou expiré. Veuillez réessayer. Envisagez de redémarrer.',
    language: 'Langue',
  },
  'de-DE': {
    signIn: 'Bei 6180 anmelden',
    enterEmail: 'Geben Sie Ihre E-Mail ein',
    sendLoginCode: 'Anmeldecode senden',
    sending: 'Wird gesendet...',
    checkEmail: 'Überprüfen Sie Ihre E-Mail auf einen 6-stelligen Code.',
    enterCode: '6-stelligen Code eingeben',
    confirm: 'Code bestätigen',
    verifying: 'Überprüfung...',
    errorSending: 'Code konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    errorVerifying: 'Ungültiger oder abgelaufener Code. Bitte versuchen Sie es erneut. Erwägen Sie einen Neustart.',
    language: 'Sprache',
  },
  'de': {
    signIn: 'Bei 6180 anmelden',
    enterEmail: 'Geben Sie Ihre E-Mail ein',
    sendLoginCode: 'Anmeldecode senden',
    sending: 'Wird gesendet...',
    checkEmail: 'Überprüfen Sie Ihre E-Mail auf einen 6-stelligen Code.',
    enterCode: '6-stelligen Code eingeben',
    confirm: 'Code bestätigen',
    verifying: 'Überprüfung...',
    errorSending: 'Code konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
    errorVerifying: 'Ungültiger oder abgelaufener Code. Bitte versuchen Sie es erneut. Erwägen Sie einen Neustart.',
    language: 'Sprache',
  },
  'es-ES': {
    signIn: 'Iniciar sesión en 6180',
    enterEmail: 'Introduzca su correo electrónico',
    sendLoginCode: 'Enviar código de inicio de sesión',
    sending: 'Enviando...',
    checkEmail: 'Compruebe su correo electrónico para un código de 6 dígitos.',
    enterCode: 'Introduzca el código de 6 dígitos',
    confirm: 'Confirmar código',
    verifying: 'Verificando...',
    errorSending: 'Error al enviar el código. Por favor, inténtelo de nuevo.',
    errorVerifying: 'Código inválido o caducado. Por favor, inténtelo de nuevo. Considere reiniciar.',
    language: 'Idioma',
  },
  'es': {
    signIn: 'Iniciar sesión en 6180',
    enterEmail: 'Introduzca su correo electrónico',
    sendLoginCode: 'Enviar código de inicio de sesión',
    sending: 'Enviando...',
    checkEmail: 'Compruebe su correo electrónico para un código de 6 dígitos.',
    enterCode: 'Introduzca el código de 6 dígitos',
    confirm: 'Confirmar código',
    verifying: 'Verificando...',
    errorSending: 'Error al enviar el código. Por favor, inténtelo de nuevo.',
    errorVerifying: 'Código inválido o caducado. Por favor, inténtelo de nuevo. Considere reiniciar.',
    language: 'Idioma',
  },
  'ru': {
    signIn: 'Вход в 6180',
    enterEmail: 'Введите вашу электронную почту',
    sendLoginCode: 'Отправить код входа',
    sending: 'Отправка...',
    checkEmail: 'Проверьте вашу электронную почту на наличие 6-значного кода.',
    enterCode: 'Введите 6-значный код',
    confirm: 'Подтвердить код',
    verifying: 'Проверка...',
    errorSending: 'Не удалось отправить код. Пожалуйста, попробуйте снова.',
    errorVerifying: 'Недействительный или просроченный код. Пожалуйста, попробуйте снова. Рассмотрите возможность перезапуска.',
    language: 'Язык',
  },
  'ja': {
    signIn: '6180にサインイン',
    enterEmail: 'メールアドレスを入力してください',
    sendLoginCode: 'ログインコードを送信',
    sending: '送信中...',
    checkEmail: '6桁のコードをメールで確認してください。',
    enterCode: '6桁のコードを入力',
    confirm: 'コードを確認',
    verifying: '確認中...',
    errorSending: 'コードの送信に失敗しました。もう一度お試しください。',
    errorVerifying: '無効または期限切れのコードです。もう一度お試しください。再起動をご検討ください。',
    language: '言語',
  },
  'pt-BR': {
    signIn: 'Entrar no 6180',
    enterEmail: 'Digite seu email',
    sendLoginCode: 'Enviar código de login',
    sending: 'Enviando...',
    checkEmail: 'Verifique seu email para um código de 6 dígitos.',
    enterCode: 'Digite o código de 6 dígitos',
    confirm: 'Confirmar código',
    verifying: 'Verificando...',
    errorSending: 'Falha ao enviar o código. Por favor, tente novamente.',
    errorVerifying: 'Código inválido ou expirado. Por favor, tente novamente. Considere reiniciar.',
    language: 'Idioma',
  },
  'pt': {
    signIn: 'Entrar no 6180',
    enterEmail: 'Digite seu email',
    sendLoginCode: 'Enviar código de login',
    sending: 'Enviando...',
    checkEmail: 'Verifique seu email para um código de 6 dígitos.',
    enterCode: 'Digite o código de 6 dígitos',
    confirm: 'Confirmar código',
    verifying: 'Verificando...',
    errorSending: 'Falha ao enviar o código. Por favor, tente novamente.',
    errorVerifying: 'Código inválido ou expirado. Por favor, tente novamente. Considere reiniciar.',
    language: 'Idioma',
  },
}

// Add English translations as fallback for all languages
supportedLanguages.forEach(lang => {
  if (!translations[lang.code]) {
    translations[lang.code] = {...translations['en']}
  }
})

// Function to get browser language
function getBrowserLanguage(): string {
  const browserLang = navigator.language || 'en'
  
  // Check if the exact browser language is supported
  if (supportedLanguages.some(lang => lang.code === browserLang)) {
    return browserLang
  }
  
  // Check if the general language is supported (e.g., 'en' from 'en-GB')
  const generalLang = browserLang.split('-')[0]
  if (supportedLanguages.some(lang => lang.code === generalLang)) {
    return generalLang
  }
  
  // Default to English
  return 'en'
}

// We'll remove the custom focus handling since it causes issues
// The browser's default behavior should handle the keyboard appearing appropriately

const Login = () => {
  const [email, setEmail] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [session, setSession] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'error'>('idle')
  const [language, setLanguage] = useState(() => {
    // First check localStorage
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
    if (savedLang && supportedLanguages.some(lang => lang.code === savedLang)) {
      return savedLang
    }
    
    // If no localStorage value, use browser language
    return getBrowserLanguage()
  })
  
  // Refs for input elements
  const emailInputRef = useRef<HTMLInputElement>(null)
  const otpInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Get language from localStorage if available
    const savedLang = localStorage.getItem(STORAGE_KEYS.LANGUAGE)
    if (savedLang && supportedLanguages.some(lang => lang.code === savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language)
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

  // Get translations for current language, falling back to English if not available
  const t: Translation = translations[language] || translations['en']

  function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLanguage(e.target.value)
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
      alert(t.errorSending)
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
      alert(t.errorVerifying)
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
        <label htmlFor="language-select" style={{ color: '#666' }}>
          {t.language}:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          style={{
            padding: '6px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        >
          {supportedLanguages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
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
          {t.signIn}
        </h2>

        {!codeSent ? (
          <>
            <input
              ref={emailInputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.enterEmail}
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
              {status === 'sending' ? t.sending : t.sendLoginCode}
            </button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: '16px', color: '#555' }}>
              {t.checkEmail}
            </p>
            <input
              ref={otpInputRef}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={otpCode}
              onChange={handleOtpChange}
              placeholder={t.enterCode}
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
              {status === 'verifying' ? t.verifying : t.confirm}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Login />)