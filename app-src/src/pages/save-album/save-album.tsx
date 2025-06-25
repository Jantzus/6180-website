// save-album.tsx - SSR-safe main entry point for album creation
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { SingleAlbumMode } from "./SingleAlbumMode";
import { MultipleAlbumMode } from "./MultipleAlbumMode";

// Import CSS styles
import "./album-styles.css";

// SSR-safe mode detection component
const SaveAlbum = () => {
  // Default to single album mode during SSR
  const [isMultipleMode, setIsMultipleMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Detect mode client-side after hydration
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    setIsMultipleMode(mode === 'multiple');
    setIsInitialized(true);
  }, []);
  
  // Render single mode by default, then switch after hydration if needed
  // This prevents layout shift since both modes have similar structure
  if (!isInitialized) {
    // During SSR and initial client render, show single mode
    return <SingleAlbumMode />;
  }
  
  return isMultipleMode ? <MultipleAlbumMode /> : <SingleAlbumMode />;
};

const SaveAlbumWithTranslations = () => {
  return (
    <I18nProvider>
      <SaveAlbum />
    </I18nProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbumWithTranslations />);