// Updated PhotoLoginModal.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { COGNITO_CLIENT_ID, AWS_REGION, AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { LOCAL_STORAGE_KEYS } from '@/lib/config';
import { 
  Modal,
  ModalContent,
  TwoFactorAuthLabel,
  Button,
  FormInput,
  FormGroup,
} from "@/styles/styled-components";

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
    <Modal>
      <ModalContent style={{ maxWidth: "400px", textAlign: "center", padding: "32px" }}>
        <img 
          src="images/logo_no_background.png" 
          alt="6180 Logo" 
          style={{ 
            height: '60px', 
            marginBottom: '24px' 
          }} 
        />

        {/* Login Explanation Message */}
        <h3 style={{ margin: '0 0 24px 0', lineHeight: '1.6' }}>
          {t('{ownerName} only shared this album with friends and family').replace('{ownerName}', ownerName)}
        </h3>

        {errorMessage && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            textAlign: 'left'
          }}>
            {errorMessage}
          </div>
        )}

        {!codeSent ? (
          <form style={{ width: "100%" }}>
            <FormGroup>
              <FormInput
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('Email address...')}
                style={{ 
                  padding: "12px",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              />
            </FormGroup>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <Button
                onClick={sendCode}
                disabled={status === 'sending' || !email.trim()}
                primary
                style={{ width: "100%" }}
              >
                {status === 'sending' ? t('Sending...') : t('Send Verification Code')}
              </Button>
              
              <Button
                onClick={onClose}
                style={{
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                  border: "1px solid #ccc"
                }}
              >
                {t('Cancel')}
              </Button>
            </div>
          </form>
        ) : (
          <form style={{ width: "100%" }}>
            <p style={{ marginBottom: '16px', color: '#555', textAlign: 'left' }}>
              {t('Check your email for a 6-digit verification code sent to')} <strong>{email}</strong>
            </p>
            
            <FormGroup>
              <FormInput
                ref={otpInputRef}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otpCode}
                onChange={handleOtpChange}
                placeholder={t('Enter 6-digit code')}
                style={{
                  letterSpacing: '2px',
                  textAlign: 'center',
                  padding: "12px",
                  width: "100%",
                  boxSizing: "border-box"
                }}
              />
            </FormGroup>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
              <Button
                onClick={confirmCode}
                disabled={status === 'verifying' || otpCode.length !== 6}
                primary
                style={{ 
                  width: "100%",
                  backgroundColor: "#28a745"
                }}
              >
                {status === 'verifying' ? t('Verifying...') : t('Verify Code')}
              </Button>
              
              <div style={{ 
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
              
              <Button
                onClick={onClose}
                style={{
                  width: "100%",
                  backgroundColor: "#f8f9fa",
                  color: "#555",
                  border: "1px solid #ccc"
                }}
              >
                {t('Cancel')}
              </Button>
            </div>
          </form>
        )}
        
        {/* Two-Factor Authentication label */}
        <TwoFactorAuthLabel>
          {t('Two-Factor Authentication')}
        </TwoFactorAuthLabel>
      </ModalContent>
    </Modal>
  );
};

export default PhotoLoginModal;