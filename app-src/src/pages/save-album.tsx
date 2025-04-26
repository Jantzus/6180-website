import { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"

// Import styles
import "@/styles/styles.css"

import { GRAPHQL_ENDPOINT, STORAGE_KEYS } from "@/lib/config"
import { 
  ProgressTracker,
  UploadStatus,
  SelectedPhoto,
  ProtectionOption
} from "@/lib/types"

import { generateUUID } from "@/lib/utils"
import { checkLoginOrRedirect } from "@/lib/utils"
import { I18nProvider, useTranslation } from "@/lib/i18n/react"
import { getLanguageDirection } from "@/lib/i18n/translations"
import { PasswordDialog } from "@/components/PasswordDialog"
import { LogoutButton } from "@/components/LogoutButton"

// Import utility functions from file-upload-utils
import { 
  createLogger,
  createPhotoStatusUpdater,
  updateProgressTracker,
  processFiles,
  moveFilesToPublic,
  clearAlbumData,
  s3
} from "@/lib/file-upload-utils"

// Password Policy Enum matching the GraphQL API schema
enum PasswordPolicyEnum {
  NotVisible = "NotVisible",
  Watermark = "Watermark",
  CannotBeSaved = "CannotBeSaved",
  NoPassword = "NoPassword"
}

// GraphQL query for fetching folder details
const FETCH_FOLDER_QUERY = `
  query FetchFolders($folderIds: [String!]!) {
    fetchFolders(folderIds: $folderIds) {
      items {
        folderName
        folderDescription
        folderPassword {
          password
          policy
        }
        fileReferencesPage {
          items {
            file {
              ownerContactId
              dataKey
              thumbnailDataKey
              durationInSeconds
            }
          }
        }
        contactsUsingInvite {
          items {
            id
            item {
              ... on Persona {
                publicDisplayName
              }
            }
          }
        }
        folderPosition {
          id
        }          
      }
    }
  }
`;

const SaveAlbum = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Core state
  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [debugMessages, setDebugMessages] = useState<string[]>([])
  
  // User state
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null)
  
  // Username modal state
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [showAltButton, setShowAltButton] = useState(false)
  const [isSubmittingUsername, setIsSubmittingUsername] = useState(false)
  
  // Progress tracking state
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  })
  const [isSavingAlbum, setIsSavingAlbum] = useState(false)
  
  // Album details state
  const [folderName, setFolderName] = useState("")
  const [folderDescription, setFolderDescription] = useState("")
  const [showFolderDetails, setShowFolderDetails] = useState(false)
  
  // Password protection state
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [passwordProtectionOption, setPasswordProtectionOption] = useState<ProtectionOption>('noPassword')
  const [albumPassword, setAlbumPassword] = useState("")

  // Create utility instances
  const log = createLogger(setDebugMessages)
  const updatePhotoStatus = createPhotoStatusUpdater(setSelectedPhotos)

  // ---------- EFFECTS ----------

  // Initialize component
  useEffect(() => {
    initializeComponent()
  }, [])

  // Save selected photos to localStorage
  useEffect(() => {
    if (selectedPhotos.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(selectedPhotos))
    }
  }, [selectedPhotos])

  // Update progress tracker
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker)
  }, [selectedPhotos])

  // ---------- INITIALIZATION ----------

  const initializeComponent = async () => {
    setIsSavingAlbum(false)
    
    try {
      const token = checkLoginOrRedirect()
      if (!token) {
        return
      }
      
      // Extract username directly here instead of in a separate function
      try {
        // Get public username
        const savedUsername = localStorage.getItem("publicUsername")
        setPublicUsername(savedUsername || null)
        
        // Extract Cognito username directly from token
        const payload = JSON.parse(atob(token.split('.')[1]))
        const username = payload["cognito:username"]
        
        if (username) {
          // Set the username in state
          setCognitoUsername(username)
          
          // Now that we have the username, we can proceed with folder initialization
          await initializeFolderIdWithUsername(username)
        }
      } catch (err) {
        console.error("User data initialization error:", err)
      }
      
      restorePhotosFromStorage()
      testS3Connection()
    } catch (initErr) {
      console.error("Initialization error:", initErr)
    }
  }

  // Adapted initializeFolderId that takes username directly as parameter
  const initializeFolderIdWithUsername = async (username: string) => {
    try {
      // Get folderId from URL query parameter
      const params = new URLSearchParams(window.location.search)
      const id = params.get("folderId")
      
      if (id) {
        setFolderId(id)
        
        // Always show folder details, whether creating new or editing existing
        setShowFolderDetails(true)
        
        // Since this is an existing album, fetch its details
        try {
          const folderDetails = await fetchFolderDetails(id)
          
          if (folderDetails) {
            // Update album details in state
            setFolderName(folderDetails.folderName)
            setFolderDescription(folderDetails.folderDescription)
            
            // Handle password policy with proper enum mapping
            const policy = folderDetails.passwordPolicy
            
            // Map the PasswordPolicyEnum values to our local state options
            switch(policy) {
              case 'NoPassword':
                setPasswordProtectionOption('noPassword')
                break
              case 'NotVisible':
                setPasswordProtectionOption('notVisible')
                setAlbumPassword(folderDetails.password)
                break
              case 'Watermark':
                setPasswordProtectionOption('watermark')
                setAlbumPassword(folderDetails.password)
                break
              case 'CannotBeSaved':
                setPasswordProtectionOption('cannotBeSaved')
                setAlbumPassword(folderDetails.password)
                break
              default:
                setPasswordProtectionOption('noPassword')
            }
          }
        } catch (fetchErr) {
          console.error("Error fetching folder details:", fetchErr)
        }
      } else {
        // If no ID in URL, create a new one
        const newId = `${username}_____${generateUUID()}____Folder`
        setFolderId(newId)
        
        // Show folder details for new albums
        setShowFolderDetails(true)
      }
    } catch (err) {
      console.error("Folder ID initialization error:", err)
    }
  }

  const fetchFolderDetails = async (folderId: string) => {
    try {
      const token = localStorage.getItem("idToken")
      if (!token) {
        return null
      }
      
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          query: FETCH_FOLDER_QUERY,
          variables: { folderIds: [folderId] }
        })
      })
      
      const result = await response.json()
      
      if (result.errors) {
        console.error("GraphQL errors:", result.errors)
        return null
      }
      
      const items = result?.data?.fetchFolders?.items || []
      
      if (items.length === 0) {
        return null
      }
      
      const folder = items[0]
      
      return {
        folderName: folder.folderName || '',
        folderDescription: folder.folderDescription || '',
        passwordPolicy: folder.folderPassword?.policy || 'NoPassword',
        password: folder.folderPassword?.password || ''
      }
    } catch (error) {
      console.error("Error in fetchFolderDetails:", error)
      return null
    }
  }

  const restorePhotosFromStorage = () => {
    try {
      const storedPhotos = localStorage.getItem(STORAGE_KEYS.SELECTED_PHOTOS)
      
      if (storedPhotos) {
        try {
          const parsedPhotos = JSON.parse(storedPhotos) as SelectedPhoto[]
          
          if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
            setSelectedPhotos(parsedPhotos)
          }
        } catch (parseErr) {
          console.error("Error parsing stored photos:", parseErr)
        }
      }
    } catch (storageErr) {
      console.error("Error restoring photos from storage:", storageErr)
    }
  }

  const testS3Connection = () => {
    try {
      if (!s3) {
        console.error("S3 client not available")
      }
    } catch (s3Err) {
      console.error("S3 connection test error:", s3Err)
    }
  }

  // ---------- PHOTO MANAGEMENT ----------

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove)
    setSelectedPhotos(updated)
    
    // Update localStorage
    if (updated.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(updated))
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
    }
  }

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cognitoUsername) {
      return
    }
  
    const files = Array.from(e.target.files || [])
    
    if (!files.length) return
    
    try {
      // Add pending photos to state first
      const initialPhotos = createInitialPhotoObjects(files)
      setSelectedPhotos(prev => [...prev, ...initialPhotos])
      
      // Process files and update photo status
      const currentIndex = selectedPhotos.length
      const processedPhotos = await processFiles(
        files,
        cognitoUsername,
        (index, status, progress, errorMessage) => {
          // Adjust index to account for existing photos
          updatePhotoStatus(currentIndex + index, status, progress, errorMessage)
        },
        log
      )
      
      // Update selected photos with processed info
      updatePhotosWithProcessedInfo(currentIndex, processedPhotos)
    } catch (error) {
      console.error("Error in handleAddPhotos:", error)
    } finally {
      e.target.value = ""
    }
  }
  
  const createInitialPhotoObjects = (files: File[]): SelectedPhoto[] => {
    return files.map(file => {
      const type: string = file.type
      const fileExt = file.name.split('.').pop() || "jpg"
      const uuidFileName = `${generateUUID()}.${fileExt}`
      
      return {
        fileName: uuidFileName,
        s3PreviewUrl: URL.createObjectURL(file), // Use local object URL initially
        type,
        size: file.size,
        status: 'pending' as UploadStatus,
        progress: 0
      } as SelectedPhoto
    })
  }
  
  const updatePhotosWithProcessedInfo = (startIndex: number, processedPhotos: SelectedPhoto[]) => {
    setSelectedPhotos(prev => {
      const updated = [...prev]
      
      // Update each processed photo
      processedPhotos.forEach((processedPhoto, i) => {
        const index = startIndex + i
        if (index < updated.length) {
          updated[index] = processedPhoto
        }
      })
      
      return updated
    })
  }

  // ---------- ALBUM SAVING ----------

  const handleSaveAlbum = async () => {
    setIsSavingAlbum(true)

    try {
      if (publicUsername?.startsWith("Profile-")) {
        setUsernameInput(publicUsername)
        setShowUsernamePrompt(true)
        setIsSavingAlbum(false)
        return
      }

      // If we have a valid username, proceed directly to saving
      saveAlbumDirectly()
    } catch (err) {
      console.error("Error in handleSaveAlbum:", err)
      setIsSavingAlbum(false)
    }
  }

  const saveAlbumDirectly = async () => {
    setIsSavingAlbum(true)

    try {
      // Validate required data
      if (!validateRequiredData()) {
        setIsSavingAlbum(false)
        return
      }
      
      // Filter out photos with error status
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete')
      
      // Prepare folder and account IDs
      const now = Math.floor(Date.now() / 1000)
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`
      const folderParts = folderId!.split("_____")
      const folderTargetItemIdentifier = folderParts[1].split("____")[0]

      // Move files from temp to public folder
      await moveFilesToPublic(
        validPhotos, 
        updateSaveProgress,
        log
      )

      // Prepare GraphQL input data
      const folderPositionInput = createFolderPositionInput(now, accountId, folderTargetItemIdentifier, validPhotos)
      const updatedFileReferenceInputs = createFileReferenceInputs(validPhotos, now, accountId)
      
      // Send GraphQL mutation
      await sendAlbumSaveMutation(folderPositionInput, updatedFileReferenceInputs)
    } catch (err) {
      console.error("Error in saveAlbumDirectly:", err)
      setIsSavingAlbum(false)
    }
  }
  
  const validateRequiredData = () => {
    const token = localStorage.getItem("idToken")
    
    if (!token) {
      return false
    }
    
    if (!cognitoUsername) {
      return false
    }
    
    if (!folderId) {
      return false
    }
    
    return true
  }
  
  const updateSaveProgress = (progress: number) => {
    // Update progress in UI
    document.getElementById('saveProgress')?.style.setProperty('width', `${progress}%`)
  }
  
  const createFolderPositionInput = (
    timestamp: number, 
    accountId: string, 
    folderTargetItemIdentifier: string, 
    validPhotos: SelectedPhoto[]
  ) => {
    return {
      currentTime: timestamp,
      folderId,
      profileIds: ["Only Me_____Only Me____Profile"],
      folderPositionSelectedTagInputs: [],
      folderPositionPoints: 1,
      acceptedFileReferenceIds: validPhotos.map(photo =>
        `${folderTargetItemIdentifier}_____${photo.fileName}____FileReference`
      ),
      hiddenFileReferenceIds: [],
      folderInput: {
        folderSelectedTagInputs: [],
        folderAboutContactIds: [accountId],
        folderName: folderName,
        folderDescription: folderDescription,
        folderPasswordInput: {
          password: passwordProtectionOption !== 'noPassword' ? albumPassword : null,
          policy: PasswordPolicyEnum[passwordProtectionOption.charAt(0).toUpperCase() + passwordProtectionOption.slice(1) as keyof typeof PasswordPolicyEnum]
        },
        folderInviteParametersInput: {
          folderIsOnlyVisibleThroughCode: true,
          folderInviteHasBeenDisabled: false,
          usingFolderInviteGrantsRightToRemoveItems: false,
          tagContactIdUsingFolderInviteAsFolderAboutContact: true,
          usingFolderInviteGrantsRightToAddItems: true,
          addedItemsNeedFolderCreatorApproval: false
        }
      }
    }
  }
  
  const createFileReferenceInputs = (
    validPhotos: SelectedPhoto[], 
    timestamp: number, 
    accountId: string
  ) => {
    return validPhotos.map(photo => {
      const dataKey = photo.type === "video" || photo.type?.startsWith("video")
        ? `Input/Video/${photo.fileName}`
        : `Input/Image/${photo.fileName}`

      const fileId = `${cognitoUsername}_____${photo.fileName}____File`

      return {
        fileReferencesHolderId: folderId,
        currentTime: timestamp,
        points: 1,
        hasBeenDeleted: false,
        selectedTagInputs: [],
        fileId,
        fileInput: {
          fileId,
          ownerFileInput: {
            editorContactIds: [accountId],
            FileSharingOptionsEnum: "Anyone",
            dataKey,
            thumbnailDataKey: photo.thumbnailDataKey,
            dataInBytes: photo.size!,
            thumbnailDataInBytes: photo.thumbnailSize || 0,
            s3UploadedAt: timestamp,
            durationInSeconds: photo.duration
          },
          editorFileInput: {
            aboutContactIds: [accountId],
            captionText: "",
            numericFilterInputs: [],
          }
        }
      }
    })
  }
  
  const sendAlbumSaveMutation = async (folderPositionInput: any, updatedFileReferenceInputs: any[]) => {
    const saveProgressText = document.getElementById('saveProgressText')
    if (saveProgressText) {
      saveProgressText.innerText = t('Finalizing album...')
    }

    const token = localStorage.getItem("idToken")
    const mutation = `
      mutation MyMutation(
        $folderPositionInputs: [FolderPositionInput!],
        $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
      ) {
        changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
          items {
            ... on FileReference { id createdAt updatedAt fileId file { dataKey thumbnailDataKey } }
          }
        }
        changeFiles(folderPositionInputs: $folderPositionInputs) {
          items { id }
        }
      }
    `

    const variables = {
      folderPositionInputs: [folderPositionInput],
      updatedFileReferenceInputs,
    }

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: mutation, variables }),
    })

    const json = await response.json()

    if (json.errors) {
      console.error("Upload failed:", json.errors)
      setIsSavingAlbum(false)
    } else {
      handleSuccessfulSave()
    }
  }
  
  const handleSuccessfulSave = () => {
    // Clear all album data before redirecting
    clearAlbumData(setSelectedPhotos, setProgressTracker, [STORAGE_KEYS.SELECTED_PHOTOS], log)
    
    const saveSuccessText = document.getElementById('saveProgressText')
    if (saveSuccessText) {
      saveSuccessText.innerText = t('Album saved successfully!')
    }
    
    // Set a flag in sessionStorage that we just completed an album
    sessionStorage.setItem('album_just_saved', 'true')
    
    // Slight delay before redirect for user to see success message
    setTimeout(() => {
      window.location.href = "/my-albums.html"
    }, 1000)
  }

  // ---------- USERNAME MANAGEMENT ----------
  
  const validateUsername = (username: string) => /^[a-zA-Z0-9-]+$/.test(username)

  const submitUsername = async (proposedName: string) => {
    setIsSubmittingUsername(true)
    setUsernameError("")

    const token = localStorage.getItem("idToken")
    if (!token) return

    const mutation = `
      mutation MyMutation($savePublicProfileDisplayNameInput: SavePublicProfileDisplayNameInput) {
        changeMyAccountItem(savePublicProfileDisplayNameInput: $savePublicProfileDisplayNameInput) {
          ... on Profile {
            anyDisplayName
          }
        }
      }
    `

    const variables = {
      savePublicProfileDisplayNameInput: {
        anyDisplayName: proposedName,
      },
    }

    try {
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: mutation, variables }),
      })

      const json = await res.json()
      const newName = json?.data?.changeMyAccountItem?.anyDisplayName

      if (newName) {
        handleSuccessfulUsernameUpdate(newName)
      } else {
        throw new Error("Username taken")
      }
    } catch (e) {
      setUsernameError(t('Username is already taken. Please try a different one.'))
      setShowAltButton(true)
      setIsSubmittingUsername(false)
    }
  }
  
  const handleSuccessfulUsernameUpdate = (newName: string) => {
    localStorage.setItem("publicUsername", newName)
    setPublicUsername(newName)
    setShowUsernamePrompt(false)
    
    // Automatically proceed with saving the album
    saveAlbumDirectly()
  }

  const appendRandomDigits = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString()
    const modified = `${usernameInput}${digits}`
    setUsernameInput(modified)
    submitUsername(modified)
  }

  // ---------- PASSWORD MANAGEMENT ----------

  const handleClosePasswordDialog = (option?: ProtectionOption, password?: string) => {
    if (option) {
      setPasswordProtectionOption(option)
    }
    
    if (password !== undefined) {
      setAlbumPassword(password)
    }
    
    setShowPasswordDialog(false)
  }
  
  const getPasswordPolicyButtonText = () => {
    if (passwordProtectionOption === 'noPassword') {
      return t('Album Password Policy')
    }
    
    const optionText = 
      passwordProtectionOption === 'notVisible' ? t('Not Visible') :
      passwordProtectionOption === 'watermark' ? t('Watermark') :
      t('Cannot Be Saved')
    
    return `${optionText} ${albumPassword ? `(${albumPassword})` : ''}`
  }

  const handleOpenPasswordDialog = () => {
    setShowPasswordDialog(true)
  }

  // ---------- RENDER METHODS ----------
  
  const renderHeader = () => (
    <div className="header-section">
      <div className="back-link-container">
        <a href="/my-albums.html" className="back-link">
          {t('My Albums')}
        </a>
      </div>
      
      {publicUsername && (
        <div className="user-info">
          <div className="username">{publicUsername}</div>
          <LogoutButton t={t} />
        </div>
      )}
    </div>
  )
  
  const renderProgressTracking = () => (
    progressTracker.totalFiles > 0 && (
      <div className="progress-container">
        <h3 className="progress-title">{t('Upload Progress')}</h3>
        
        <div className="overall-progress">
          <div className="progress-stats">
            <span>{t('Overall Progress')}: {Math.round(progressTracker.overallProgress * 100)}%</span>
            <span>{progressTracker.filesComplete} {t('of')} {progressTracker.totalFiles} {t('complete')}</span>
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar"
              style={{ width: `${progressTracker.overallProgress * 100}%` }}
            />
          </div>
        </div>
        
        <div className="progress-details">
          {progressTracker.filesUploading > 0 && (
            <div className="progress-item">{t('Uploading')}: {progressTracker.filesUploading}</div>
          )}
          {progressTracker.filesProcessing > 0 && (
            <div className="progress-item">{t('Processing')}: {progressTracker.filesProcessing}</div>
          )}
          {progressTracker.filesComplete > 0 && (
            <div className="progress-item">{t('Complete')}: {progressTracker.filesComplete}</div>
          )}
          {progressTracker.filesWithError > 0 && (
            <div className="progress-item error">{t('Failed')}: {progressTracker.filesWithError}</div>
          )}
        </div>
      </div>
    )
  )
  
  const renderSavingProgress = () => (
    isSavingAlbum && (
      <div className="saving-progress-container">
        <h3 className="saving-progress-title">{t('Saving Album')}</h3>
        <div id="saveProgressText" className="saving-progress-text">{t('Moving files...')}</div>
        <div className="saving-progress-bar-bg">
          <div 
            id="saveProgress"
            className="saving-progress-bar"
            style={{ width: "5%" }}
          />
        </div>
      </div>
    )
  )
  
  const renderPhotoGrid = () => (
    selectedPhotos.length > 0 && (
      <>
        <p className="selected-count">
          {selectedPhotos.length} {selectedPhotos.length > 1 ? t('photos selected') : t('photo selected')}:
        </p>

        <div className="photo-grid">
          {selectedPhotos.map((photo, i) => renderPhotoCard(photo, i))}
        </div>
      </>
    )
  )
  
  const renderPhotoCard = (photo: SelectedPhoto, index: number) => (
    <div key={index} className="photo-card">
      {/* Status indicator */}
      <div className={`status-indicator ${photo.status}`}>
        {photo.status === 'complete' ? '✓' : 
         photo.status === 'error' ? '✕' :
         photo.status === 'uploading' ? '↑' :
         photo.status === 'processing' ? '⚙️' : '•'}
      </div>

      {/* Media preview */}
      <div className="media-preview">
        {photo.type === "video" || photo.type?.startsWith("video") ? (
          <video src={photo.s3PreviewUrl} controls className="media-item" />
        ) : (
          <img src={photo.s3PreviewUrl} alt={photo.fileName} className="media-item" />
        )}
        
        {/* Upload progress bar for in-progress items */}
        {(photo.status === 'uploading' || photo.status === 'processing') && (
          <div className="upload-progress-bar-bg">
            <div 
              className={`upload-progress-bar ${photo.status}`}
              style={{ width: `${photo.progress * 100}%` }}
            />
          </div>
        )}
      </div>
      
      {/* File info */}
      <div className="file-info">
        {photo.type?.startsWith("video") ? t('Video') : t('Image')}
        {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} MB`}
        {photo.duration && ` • ${photo.duration}s`}
      </div>

      {/* Error message if any */}
      {photo.status === 'error' && photo.errorMessage && (
        <div className="error-message">
          {t('Error')}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
        </div>
      )}
      
      {/* Remove button */}
      <button 
        onClick={() => removePhoto(index)} 
        className="remove-button"
        disabled={isSavingAlbum}
      >
        {t('Remove')}
      </button>
    </div>
  )
  
  const renderActionButtons = () => (
    <div className="action-buttons">
      <button
        className={`primary-button ${isSavingAlbum ? 'disabled' : ''}`}
        onClick={handleSaveAlbum}
        disabled={isSavingAlbum}
      >
        {isSavingAlbum ? t('Saving Album...') : t('Save Album')}
      </button>
      
      {renderFolderDetails()}
      
      <button
        className={`secondary-button ${isSavingAlbum ? 'disabled' : ''}`}
        onClick={() => {
          const input = document.getElementById("file-input") as HTMLInputElement
          input?.click()
        }}
        disabled={isSavingAlbum}
      >
        {t('Add More Photos')}
      </button>
      
      <button
        className={`secondary-button password-button ${passwordProtectionOption !== 'noPassword' ? 'password-set' : ''} ${isSavingAlbum ? 'disabled' : ''}`}
        onClick={handleOpenPasswordDialog}
        disabled={isSavingAlbum}
      >
        {getPasswordPolicyButtonText()}
      </button>
    </div>
  )
  
  const renderFolderDetails = () => (
    showFolderDetails && (
      <div className="folder-details">
        <div className="form-group">
          <label htmlFor="folderName" className="form-label">
            {t('Album Name (Optional)')}
          </label>
          <input
            id="folderName"
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder={t('Enter album name')}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="folderDescription" className="form-label">
            {t('Album Description (Optional)')}
          </label>
          <textarea
            id="folderDescription"
            value={folderDescription}
            onChange={(e) => setFolderDescription(e.target.value)}
            placeholder={t('Enter album description')}
            rows={4}
            className="form-textarea"
          />
        </div>
      </div>
    )
  )
  
  const renderUsernamePrompt = () => (
    showUsernamePrompt && (
      <div className="modal-overlay">
        <div className={`username-modal ${isRTL ? 'rtl' : 'ltr'}`}>
          <p className="username-title">
            {t('Enter Username')}
          </p>
          <p className="username-description">
            {t('Username should contain only letters, numbers and hyphens. Example: john-doe2')}
          </p>
          <input
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            className={`username-input ${isRTL ? 'rtl' : 'ltr'}`}
          />
          {usernameError && <div className="username-error">{usernameError}</div>}
          <button
            disabled={isSubmittingUsername}
            onClick={() => {
              if (!validateUsername(usernameInput)) {
                setUsernameError(t('Username must contain only letters, numbers, and hyphens.'))
                return
              }
              submitUsername(usernameInput)
            }}
            className={`username-button ${isSubmittingUsername ? 'disabled' : ''}`}
          >
            {t('Select Username')}
          </button>
          {showAltButton && (
            <button
              disabled={isSubmittingUsername}
              onClick={appendRandomDigits}
              className={`username-alt-button ${isSubmittingUsername ? 'disabled' : ''}`}
            >
              {t('Add Random Digits to Username')}
            </button>
          )}
        </div>
      </div>
    )
  )
  
  const renderPasswordDialog = () => (
    showPasswordDialog && (
      <PasswordDialog 
        isOpen={showPasswordDialog} 
        onClose={handleClosePasswordDialog}
        initialOption={passwordProtectionOption}
        initialPassword={albumPassword} 
      />
    )
  )
  
  const renderDebugLog = () => (
    debugMessages.length > 0 && (
      <div className="debug-container">
        <h3 className="debug-title">{t('Debug Log')}</h3>
        <pre className="debug-messages">
          {debugMessages.map((msg, i) => (
            <div key={i} className="debug-message">{msg}</div>
          ))}
        </pre>
      </div>
    )
  )

  // ---------- MAIN RENDER ----------
  
  return (
    <div className={`app-container ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="content-container">
        {renderHeader()}
        {renderProgressTracking()}
        {renderSavingProgress()}

        <input
          type="file"
          id="file-input"
          accept="image/*,video/*"
          multiple
          onChange={handleAddPhotos}
          style={{ display: "none" }}
        />

        {renderPhotoGrid()}
        {renderActionButtons()}
        {renderUsernamePrompt()}
        {renderPasswordDialog()}
      </div>

      {renderDebugLog()}
    </div>
  )
}

// Wrap the SaveAlbum component with I18nProvider
const SaveAlbumWithTranslations = () => {
  return (
    <I18nProvider>
      <SaveAlbum />
    </I18nProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbumWithTranslations />)