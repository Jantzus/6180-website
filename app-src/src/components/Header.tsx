import React from "react";
import { LogoutButton } from "@/components/LogoutButton";
import { useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n";

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
            {/* Person icon with user's name - on the left (or right in RTL) */}
            <a
              href={`profile.html?id=${formattedCognitoUsername}`}
              style={{
                fontSize: "14px",
                color: "#2196f3",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <span style={{ 
                fontSize: "16px", 
                lineHeight: 1
              }}>
                👤
              </span>
              {publicUsername || t('Profile')}
            </a>
            
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