import React from "react";
import { LogoutButton } from "@/components/LogoutButton";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { ProfileLink } from "@/styles/styled-components";

// Header Component
type MyAlbumsHeaderProps = {
  publicUsername: string | null;
};

export const MyAlbumsHeader: React.FC<MyAlbumsHeaderProps> = ({ 
  publicUsername
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  return (
    <>
      {/* First row with profile name and logout button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          width: "100%",
          direction: isRTL ? "rtl" : "ltr"
        }}
      >
        {publicUsername && (
          <>
            <ProfileLink
              href={`https://6180.io/${publicUsername}`}
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