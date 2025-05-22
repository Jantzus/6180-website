import React, { useState, useEffect, useRef } from "react";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { COGNITO_CLIENT_ID, AWS_REGION, AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { LOCAL_STORAGE_KEYS } from '@/lib/config';
import { TwoFactorAuthLabel } from "@/styles/styled-components";

// Create a new Cognito client for OTP login
const cognito = new CognitoIdentityProviderClient({ region: AWS_REGION });

// Helper function to normalize email (especially for Gmail)
function normalizeEmail(input: string): string {
  const trimmed = input.trim().toLowerCase();
  const gmailSuffix = "@gmail.com";
  if (trimmed.endsWith(gmailSuffix)) {
    const localPart = trimmed.slice(0, -gmailSuffix.length).replace(/\./g, "");
    return `${localPart}${gmailSuffix}`;
  }
  return trimmed;
}

// PhotoLoginModal Component
interface PhotoLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  ownerName?: string;
  t: (key: string) => string;
}

export const PhotoLoginModal: React.FC<PhotoLoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginSuccess, 
  ownerName = 'the album owner',
  t,
}) => {
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [session, setSession] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'verifying' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Refs for input elements
  const emailInputRef = useRef<HTMLInputElement>(null);
  const otpInputRef = useRef<HTMLInputElement>(null);

  // Focus the OTP input when code is sent
  useEffect(() => {
    if (codeSent && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [codeSent]);

  // Focus email input when modal opens
  useEffect(() => {
    if (isOpen && emailInputRef.current && !codeSent) {
      emailInputRef.current.focus();
    }
  }, [isOpen, codeSent]);

  // Only allow numeric input for OTP code
  function handleOtpChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // Only accept numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtpCode(value);
    }
  }

  async function sendCode() {
    setStatus('sending');
    setErrorMessage('');
    const normalizedEmail = normalizeEmail(email);
    
    // Basic email validation
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus('error');
      setErrorMessage(t('Please enter a valid email address'));
      return;
    }

    try {
      const signUpCommand = new SignUpCommand({
        ClientId: COGNITO_CLIENT_ID,
        Username: normalizedEmail,
        Password: crypto.randomUUID(),
        UserAttributes: [{ Name: 'email', Value: normalizedEmail }],
      });

      try {
        await cognito.send(signUpCommand);
      } catch (e: any) {
        if (!e.name?.includes('UsernameExistsException')) {
          throw e;
        }
      }

      const signInCommand = new InitiateAuthCommand({
        ClientId: COGNITO_CLIENT_ID,
        AuthFlow: 'CUSTOM_AUTH',
        AuthParameters: { USERNAME: normalizedEmail },
      });

      const response = await cognito.send(signInCommand);

      if (response.Session) {
        setSession(response.Session);
        setCodeSent(true);
        setStatus('idle');
      } else {
        throw new Error('No session returned from InitiateAuth');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
      setErrorMessage(t('Unable to send verification code. Please try again later.'));
    }
  }

  async function confirmCode() {
    setStatus('verifying');
    setErrorMessage('');
    const normalizedEmail = normalizeEmail(email);

    try {
      const confirmCommand = new RespondToAuthChallengeCommand({
        ClientId: COGNITO_CLIENT_ID,
        ChallengeName: 'CUSTOM_CHALLENGE',
        ChallengeResponses: {
          USERNAME: normalizedEmail,
          ANSWER: otpCode,
        },
        Session: session,
      });

      const response = await cognito.send(confirmCommand);
      const token = response.AuthenticationResult?.IdToken;

      if (!token) throw new Error('No token received');
      localStorage.setItem('idToken', token);

      const payload = JSON.parse(atob(token.split('.')[1]));
      const username = payload['cognito:username'];
      const relationId = `${username}_____Public____Profile`;

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
      });

      const json = await gqlResponse.json();
      const displayName = json?.data?.batchGetItems?.items?.[0]?.item?.anyDisplayName;
      if (displayName) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, displayName);
      }

      // Instead of redirecting, close the modal and notify parent of success
      setStatus('idle');
      onLoginSuccess();
      onClose();

    } catch (e) {
      console.error(e);
      setStatus('error');
      setErrorMessage(t('Invalid or expired verification code. Please try again or request a new code.'));
    }
  }

  // Function to resend code if needed
  function handleResendCode() {
    setCodeSent(false);
    setOtpCode('');
    setStatus('idle');
  }


  if (!isOpen) return null;

  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
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
        <img 
          src="images/logo_no_background.png" 
          alt="6180 Logo" 
          style={{ 
            height: '60px', 
            marginBottom: '30px' 
          }} 
        />

        {/* Login Explanation Message - Split into two lines with space between */}
        <div style={{ 
          margin: '0', 
          lineHeight: '1.6',
          marginBottom: '30px'
        }}>
          <h3 style={{ margin: '0' }}>
            {t('{ownerName} only shared this album with friends and family').replace('{ownerName}', ownerName)}
          </h3>
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
              placeholder={t('Email address...')}
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
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#f8f9fa',
                color: '#555',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '12px',
              }}
            >
              {t('Cancel')}
            </button>
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
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#f8f9fa',
                color: '#555',
                border: '1px solid #ccc',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '12px',
              }}
            >
              {t('Cancel')}
            </button>
          </>
        )}
        
        {/* Two-Factor Authentication label */}
        <TwoFactorAuthLabel>
          {t('Two-Factor Authentication')}
        </TwoFactorAuthLabel>
      </div>
    </div>
  );
};

export default PhotoLoginModal;