import { useEffect, useState } from "react";
import { useUsernameManagement } from "@/lib/useUsernameManagement"
import { getLanguageDirection } from "@/lib/i18n";

// Import styled components
import { 
  Modal,
  UsernameInput,
  Message,
} from "@/styles/styled-components";

import {
  ModalContent
} from "@/styles/modalStyles";
  

import { Button } from '@/styles/components/buttons'

import { LOCAL_STORAGE_KEYS } from '@/lib/config';

// Username Modal Component
export const UsernamePrompt: React.FC<{
  t: (key: string) => string;
  language: string;
  usernameManager: ReturnType<typeof useUsernameManagement>;
  onSuccess: (newName: string) => void;
}> = ({ t, language, usernameManager, onSuccess }) => {
  const [isClient, setIsClient] = useState(false);

  const {
    showUsernamePrompt,
    setShowUsernamePrompt,
    usernameInput,
    setUsernameInput,
    usernameError,
    validateUsername,
    submitUsername,
    showAltButton,
    appendRandomDigits,
    isSubmittingUsername
  } = usernameManager;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSuccessfulUsernameUpdate = (newName: string) => {
    console.log(`Username successfully updated to: ${newName}`);
    // Only access localStorage on the client
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME, newName);
    }
    setShowUsernamePrompt(false);
    onSuccess(newName);
  };

  const isRTL = getLanguageDirection(language as "en") === "rtl";

  if (!showUsernamePrompt) return null;

  return (
    <Modal $zIndex={9999}>
      <ModalContent 
        $isRTL={isRTL}
        style={{ 
          background: '#fff',
          padding: '30px',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '400px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          direction: isRTL ? 'rtl' : 'ltr'
        }}
      >
        <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>
          {t('Enter Username')}
        </h2>
        <p style={{ fontSize: '14px', marginBottom: '16px', color: '#666' }}>
          {t('Username should contain only letters, numbers and hyphens. Example: john-doe2')}
        </p>
        <UsernameInput
          value={usernameInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameInput(e.target.value)}
          $isRTL={isRTL}
        />
        {usernameError && <Message $type="error" style={{ fontSize: '14px', padding: '8px', marginBottom: '12px' }}>{usernameError}</Message>}
        <Button
          $primary
          disabled={isSubmittingUsername}
          onClick={() => {
            if (!validateUsername(usernameInput)) {
              usernameManager.setUsernameError(t('Username must contain only letters, numbers, and hyphens.'));
              return;
            }
            submitUsername(usernameInput, handleSuccessfulUsernameUpdate);
          }}
          style={{ width: '100%', marginBottom: '10px' }}
        >
          {t('Select Username')}
        </Button>
        {showAltButton && (
          <Button
            disabled={isSubmittingUsername}
            onClick={() => appendRandomDigits(handleSuccessfulUsernameUpdate)}
            style={{ width: '100%' }}
          >
            {t('Add Random Digits to Username')}
          </Button>
        )}
      </ModalContent>
    </Modal>
  );
};