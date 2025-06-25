import React, { useState, useEffect } from "react";
import { StyledLogoutLink } from "@/styles/styled-components"
import { redirectTo } from "@/lib/utils";

type LogoutButtonProps = {
  t: (key: string) => string;
};

// SSR-safe localStorage utilities
const useSSRSafeLocalStorage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const clearLocalStorage = (): void => {
    if (!isClient) return;
    
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  };

  return { clearLocalStorage, isClient };
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ t }) => {
  const { clearLocalStorage, isClient } = useSSRSafeLocalStorage();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Only perform logout actions if we're on the client
    if (isClient) {
      clearLocalStorage();
      redirectTo("index.html");
    }
  };

  return (
    <StyledLogoutLink href="#" onClick={handleLogout}>
      {t('Log Out')}
    </StyledLogoutLink>
  );
};