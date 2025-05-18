import React from "react";
import { StyledLogoutLink } from "@/styles/styled-components"

type LogoutButtonProps = {
  t: (key: string) => string;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ t }) => {
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/index.html";
  };

  return (
    <StyledLogoutLink href="#" onClick={handleLogout}>
      {t('Log Out')}
    </StyledLogoutLink>
  );
};