import React from "react";
import { LogoutButton } from "@/components/LogoutButton";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { ProfileLink } from "@/styles/styled-components";

// Header Component
type HeaderProps = {
  publicUsername: string | null;
};

export const Header: React.FC<HeaderProps> = ({ 
  publicUsername,
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

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
              href={`/${publicUsername}`}
            >
              {`👤 ${publicUsername}`}
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