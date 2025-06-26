import React, { useState, useEffect } from "react";
import { redirectTo } from "@/lib/utils";
import styled from 'styled-components'
import { theme } from "@/styles/theme";

type LogoutButtonProps = {
  t: (key: string) => string;
};

const StyledLogoutLink = styled.a`
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.text.secondary};
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

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