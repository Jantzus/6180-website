import React from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { AlbumPageDynamic } from "./AlbumPageDynamic";

// ============================
// Main Photo Album Entry Point
// ============================

// Wrap AlbumPageDynamic with I18nProvider
const PhotoAlbum: React.FC = () => {
  return (
    <I18nProvider>
      <AlbumPageDynamic />
    </I18nProvider>
  );
};

// Initialize the app
ReactDOM.createRoot(document.getElementById("root")!).render(<PhotoAlbum />);