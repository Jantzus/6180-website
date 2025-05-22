import ReactDOM from "react-dom/client";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { SupportedLanguage } from "@/lib/i18n/translations";
import { useFileUploadProcessor } from "@/lib/useFileUploadProcessor";

// Import components
import {
  GlobalStyle,
  AppContainer,
} from "@/styles/styled-components";
import { Header } from "@/components/Header";
import { NewAlbumButton } from "@/components/NewAlbumButton";
import { SearchBar } from "@/components/SearchBar";
import { ContactsFilter } from "@/components/ContactsFilter";
import { UploadProgress } from "@/components/UploadProgress";
import { AlbumList } from "@/components/AlbumList";
import { FileInput } from "@/components/FileInput";
import { DebugLog } from "@/components/DebugLog";

// Import custom hooks and utilities
import { useFolderManagement } from "./utils";

const MyAlbums = () => {
  // Get translation function from the hook for the main component
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Use the folder management hook
  const { 
    folders,
    filteredFolders,
    publicUsername,
    cognitoUsername,
    searchQuery,
    setSearchQuery,
    handleContactFilterChange,
    resetContactFilter,
    handleDeleteClick,
    setFolders
  } = useFolderManagement((message: string) => log(message));
  
  // Directly integrate the file upload processor hook
  const fileUploadProcessor = useFileUploadProcessor((folderId) => {
    // Custom navigation callback for the album upload flow
    if (folderId) {
      window.location.href = `save-album.html?folderId=${encodeURIComponent(folderId)}`;
    } else {
      window.location.href = "save-album.html";
    }
  });
  
  // Destructure the file upload processor for easier access
  const {
    fileInputRef,
    isUploading,
    progressTracker,
    debugMessages,
    log
  } = fileUploadProcessor;

  // Specialized open file picker for album upload
  const openFilePicker = (folderId: string | null = null) => {
    // Use the shared file picker
    fileUploadProcessor.openFilePicker(folderId);
  };

  // Specialized file selection handler that passes the cognitoUsername
  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    return await fileUploadProcessor.handleFileSelection(e, cognitoUsername);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer isRTL={isRTL}>
        <Header
          publicUsername={publicUsername}
        />

        {/* Create Album button moved here - before the search bar */}
        <NewAlbumButton
          isUploading={isUploading}
          openFilePicker={openFilePicker}
          t={t}
          isRTL={isRTL}
        />
        
        {/* Search Bar Component */}
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          t={t}
          isRTL={isRTL}
        />
        
        {/* Add the new ContactsFilter component here */}
        <ContactsFilter
          folders={folders}
          onFilterChange={handleContactFilterChange}
          resetFilter={resetContactFilter}
        />
        
        {/* Added conditional rendering for enhanced status messages */}
        {isUploading && (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <UploadProgress 
              progressTracker={progressTracker} 
              t={t} 
              isRTL={getLanguageDirection(language) === "rtl"}
              style={{ marginTop: '20px' }}
              showSuccessMessage={true}
              showErrorMessage={true}
            />
          </div>
        )}

        <AlbumList 
          folders={filteredFolders}
          setFolders={setFolders}
          handleDeleteClick={(folderPositionId: string) => handleDeleteClick(folderPositionId, t)}
          openFilePicker={openFilePicker}
          isUploading={isUploading}
          cognitoUsername={cognitoUsername}
          isProfileView={false}
        />
        
        {/* Use the refactored FileInput component */}
        <FileInput 
          onFileSelection={handleFileSelection} 
          ref={fileInputRef}
        />

        <DebugLog 
          debugMessages={debugMessages}
          t={t}
          isRTL={isRTL}
          textDirection={isRTL ? "rtl" : "ltr"}
        />
      </AppContainer>
    </>
  )
}

// Initialize the app with I18nProvider
ReactDOM.createRoot(document.getElementById("root")!).render(
  <I18nProvider initialLanguage={localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as SupportedLanguage || 'en'}>
    <MyAlbums />
  </I18nProvider>
)