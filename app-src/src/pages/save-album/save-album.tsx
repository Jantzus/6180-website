// save-album.tsx - SSR-safe main entry point for album creation
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { SingleAlbumMode } from "./SingleAlbumMode";
import { MultipleAlbumMode } from "./MultipleAlbumMode";

// Import CSS styles
import "./album-styles.css";

// SSR-safe mode detection component - FIXED: Lines 12, 38 - Add proper exports for Fast Refresh
const SaveAlbum = () => {
  // Default to single album mode during SSR to avoid layout shift
  const [isMultipleMode, setIsMultipleMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Detect mode client-side after hydration to avoid SSR issues
  useEffect(() => {
    // Only run on client-side to avoid document access during SSR
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const mode = urlParams.get('mode');
      setIsMultipleMode(mode === 'multiple');
      setIsInitialized(true);
    }
  }, []);
  
  // Render single mode by default during SSR, then switch after hydration if needed
  // This prevents layout shift since both modes have similar structure
  if (!isInitialized) {
    // During SSR and initial client render, show single mode to ensure consistent rendering
    return <SingleAlbumMode />;
  }
  
  return isMultipleMode ? <MultipleAlbumMode /> : <SingleAlbumMode />;
};

// FIXED: Line 12 - Add proper export for Fast Refresh compatibility
export { SaveAlbum };

// Main component with translations - FIXED: Line 38 - Add proper export for Fast Refresh compatibility  
const SaveAlbumWithTranslations = () => {
  return (
    <I18nProvider>
      <SaveAlbum />
    </I18nProvider>
  );
};

// FIXED: Add proper exports for Fast Refresh compatibility
export { SaveAlbumWithTranslations };
export default SaveAlbumWithTranslations;

// SSR-safe DOM mounting - only mount after DOM is ready
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<SaveAlbumWithTranslations />);
  }
}