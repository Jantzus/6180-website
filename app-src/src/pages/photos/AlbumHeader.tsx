import React from "react";
import { AlbumData, PasswordPolicyEnum } from "@/lib/types";
// Import styled components - removed Header and HeaderContent since buttons are now standalone
import { 
  Button
} from "@/styles/styled-components";

// Album Header Component - Now only handles password entry functionality
export const AlbumHeader: React.FC<{
  t: (key: string) => string;
  promptForPassword: () => void;
  passwordPolicy: PasswordPolicyEnum | undefined;
  isAuthorized: boolean;
  saveAlbumDirectly: () => void;
  albumData: AlbumData | null;
}> = ({
  t,
  promptForPassword,
  passwordPolicy,
  isAuthorized,
}) => {

  // Render the main content area based on password protection
  const renderMainContent = () => {
    return (
      !isAuthorized && 
      passwordPolicy && 
      passwordPolicy !== 'NoPassword' && 
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', // Changed from space-between to flex-end since Share button moved
        width: '100%', 
        flexWrap: 'nowrap', 
        alignItems: 'center',
        marginBottom: '24px', // Reduced from 32px to 24px
        paddingLeft: '24px',
        paddingRight: '24px'
      }}>        
        {/* Right side - actions group */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '16px' // Consistent 16px spacing between buttons
        }}>
          <Button 
            onClick={promptForPassword} 
            $passwordSet={true}
            style={{ 
              padding: '8px 16px', // Reduced vertical padding by 4px
            }}
          >
            {t('Enter Password')}
          </Button>
        </div>
      </div>
    );
  };

  // Return buttons directly without Header container
  return renderMainContent();
};