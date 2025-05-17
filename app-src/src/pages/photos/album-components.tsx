import React from "react";
import { 
  AlbumData, 
  PasswordPolicyEnum,
} from "@/lib/types";
import { 
  SelectionBanner,
  ActionButton
} from "@/styles/styled-components";

// Select Photos Button Component
export const SelectPhotosButton: React.FC<{
  showSelectPhotosButton: boolean;
  albumData: AlbumData | null;
  openFilePicker: () => void;
  t: (key: string) => string;
}> = ({ showSelectPhotosButton, albumData, openFilePicker, t }) => {
  if (!showSelectPhotosButton || !albumData?.usingFolderInviteGrantsRightToAddItems) return null;
  
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      marginTop: '10px'
    }}>
      <button
        onClick={openFilePicker}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '12px 20px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <span>{t('Select Photos To Add To Album')}</span>
      </button>
    </div>
  );
};

// Password Protection Message Component
export const PasswordProtectionMessage: React.FC<{
  isAuthorized: boolean;
  passwordPolicy: PasswordPolicyEnum | undefined;
  passwordError: string | null;
  promptForPassword: () => void;
  t: (key: string) => string;
}> = ({ isAuthorized, passwordPolicy, passwordError, promptForPassword, t }) => {
  if (isAuthorized || passwordPolicy !== 'NotVisible') return null;
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f3f4f6', 
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px'
    }}>
      <h3>{t('This album is password protected')}</h3>
      <p>{t('Please enter the password to view the contents')}</p>
      {passwordError && (
        <div style={{ 
          color: "#d32f2f", 
          fontSize: "14px", 
          margin: "10px 0",
          padding: "5px",
          backgroundColor: "rgba(211, 47, 47, 0.1)",
          borderRadius: "4px"
        }}>
          {passwordError}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <ActionButton onClick={promptForPassword}>
          {t('Enter Password')}
        </ActionButton>
      </div>
    </div>
  );
};

// Selection Banner Component
export const SelectionModeBanner: React.FC<{
  isSelectionMode: boolean;
  t: (key: string) => string;
}> = ({ isSelectionMode, t }) => {
  if (!isSelectionMode) return null;
  
  return (
    <SelectionBanner>
      <p>{t('Select photos and videos to create a sub-album to share')}</p>
    </SelectionBanner>
  );
};