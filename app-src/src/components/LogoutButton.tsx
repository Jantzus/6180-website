import React from "react";

type LogoutButtonProps = {
  t: (key: string) => string;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  t
}) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = "/index.html";
      }}
      style={{
        fontSize: "14px",
        color: "#666",
        textDecoration: "underline",
        cursor: "pointer"
      }}
    >
      {t('Log Out')}
    </a>
  );
};