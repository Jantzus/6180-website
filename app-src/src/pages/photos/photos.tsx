import React from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { AlbumPageDynamic } from "./AlbumPageDynamic";

// ============================
// Main Photo Album Entry Point
// ============================

// Wrap AlbumPageDynamic with I18nProvider
export const PhotoAlbum: React.FC = () => {
  return (
    <I18nProvider>
      <AlbumPageDynamic />
    </I18nProvider>
  );
};

// Initialize the app - only run on client side
if (typeof document !== "undefined") {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<PhotoAlbum />);
  }
}