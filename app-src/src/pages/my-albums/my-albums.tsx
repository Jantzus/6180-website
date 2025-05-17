import ReactDOM from "react-dom/client";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { SupportedLanguage } from "@/lib/i18n/translations";

// Import components
import {
  GlobalStyle,
  AppContainer,
} from "@/styles/styled-components";
import { Header } from "@/components/Header";
import { CreateAlbumButton } from "@/components/CreateAlbumButton";
import { SearchBar } from "@/components/SearchBar";
import { ContactsFilter } from "@/components/ContactsFilter";
import { UploadProgress } from "@/components/UploadProgress";
import { AlbumList } from "@/components/AlbumList";
import { FileInput } from "@/components/FileInput";
import { DebugLog } from "@/components/DebugLog";

// Import custom hooks and utilities
import { useAlbumUpload } from "./useAlbumUpload";
import { useFolderManagement } from "./albumUtils";

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
  
  // Use the album upload hook
  const {
    fileInputRef,
    isUploading,
    progressTracker,
    debugMessages,
    openFilePicker,
    handleFileSelection,
    log
  } = useAlbumUpload(cognitoUsername);

  return (
    <>
      <GlobalStyle />    
      <AppContainer isRTL={isRTL}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Header 
            publicUsername={publicUsername}
            isUploading={isUploading}
            openFilePicker={openFilePicker}
            cognitoUsername={cognitoUsername}
          />

          {/* Create Album button moved here - before the search bar */}
          <CreateAlbumButton
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
                isRTL={isRTL}
              />
              
              {/* Additional status messages for better user experience */}
              {progressTracker.filesComplete > 0 && progressTracker.filesComplete === progressTracker.totalFiles && (
                <div style={{
                  backgroundColor: '#e8f5e9',
                  color: '#2e7d32',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center'
                }}>
                  {t('Upload complete! Preparing to save your album...')}
                </div>
              )}
              
              {progressTracker.filesWithError > 0 && (
                <div style={{
                  backgroundColor: '#ffebee',
                  color: '#c62828',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  marginTop: '10px',
                  textAlign: 'center'
                }}>
                  {t('Some files could not be uploaded. You can continue with the successfully uploaded files.')}
                </div>
              )}
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
        </div>

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