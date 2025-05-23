import React from "react";
import { StyledLogoutLink } from "@/styles/styled-components"
import { redirectTo } from "@/lib/utils";

type LogoutButtonProps = {
  t: (key: string) => string;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ t }) => {
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.clear();
    redirectTo("index.html");
  };

  return (
    <StyledLogoutLink href="#" onClick={handleLogout}>
      {t('Log Out')}
    </StyledLogoutLink>
  );
};