import React from "react";
import { LogoutButton } from "@/components/LogoutButton";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { ProfileLink } from "@/styles/styled-components";

// Header Component
type HeaderProps = {
  publicUsername: string | null;
  isUploading: boolean;
  openFilePicker: (folderId: string | null) => void;
  cognitoUsername: string | null;
};

export const Header: React.FC<HeaderProps> = ({ 
  publicUsername,
  cognitoUsername
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Format the cognito username correctly for the profile redirect
  const formattedCognitoUsername = cognitoUsername ? encodeURIComponent(cognitoUsername) : '';

  return (
    <>
      {/* First row with profile name and logout button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between", // This spaces items to far ends
          alignItems: "center",
          marginBottom: 24,
          width: "100%",
          direction: isRTL ? "rtl" : "ltr"
        }}
      >
        {publicUsername && (
          <>
            <ProfileLink
              href={`profile.html?id=${formattedCognitoUsername}`}
            >
              <span style={{ 
                fontSize: "16px", 
                lineHeight: 1,
                marginRight: "6px"
              }}>
                👤
              </span>
              {publicUsername || t('Profile')}
            </ProfileLink>
            
            {/* Logout button - on the right (or left in RTL) */}
            <LogoutButton 
              t={t}
            />
          </>
        )}
      </div>
    </>
  );
};