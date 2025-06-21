// save-album.tsx - Main entry point for album creation (refactored)
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { SingleAlbumMode } from "./SingleAlbumMode";
import { MultipleAlbumMode } from "./MultipleAlbumMode";

// Import CSS styles
import "./album-styles.css";

// Main component with proper mode detection
const SaveAlbum = () => {
  // Initialize mode synchronously based on URL
  const urlParams = new URLSearchParams(window.location.search);
  const isMultipleMode = urlParams.get('mode') === 'multiple';
  
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