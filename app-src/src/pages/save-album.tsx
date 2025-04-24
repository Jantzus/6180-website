// First, I'll create the PasswordDialog component based on the provided code
import { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { PutObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3"

import { BUCKET_NAME, GRAPHQL_ENDPOINT, STORAGE_KEYS } from "@/lib/config"
import { createS3Client } from "@/lib/aws"
import { 
  ProgressTracker,
  UploadStatus,
  SelectedPhoto
} from "@/lib/types"

import { generateUUID } from "@/lib/utils"
import { getVideoDuration, getVideoThumbnailBlob, checkLoginOrRedirect } from "@/lib/utils"
import { I18nProvider, useTranslation } from "@/lib/i18n/react"
import { getLanguageDirection } from "@/lib/i18n/translations"

// Create S3 client
let s3 = createS3Client()

// Password Dialog Component
type ProtectionOption = 'notVisible' | 'watermark' | 'cannotBeSaved' | 'noPassword';

type PasswordDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PasswordDialog: React.FC<PasswordDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Add state for selected protection option
  const [selectedOption, setSelectedOption] = useState<ProtectionOption>('noPassword');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  // Common option style
  const optionStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    fontSize: "14px"
  };

  const radioStyle = {
    marginRight: isRTL ? "0" : "10px",
    marginLeft: isRTL ? "10px" : "0"
  };

  // This function prevents any click events from propagating through the dialog
  const preventPropagation = (e: React.MouseEvent) => {
    e.preventDefault();  // Prevent default behavior
    e.stopPropagation(); // Stop propagation to parent elements
    return false;        // Ensure no further handling
  };

  // Handle radio button change
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, option: ProtectionOption) => {
    preventPropagation(e as unknown as React.MouseEvent);
    setSelectedOption(option);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: "24px",
          width: "90%",
          maxWidth: "400px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          direction: isRTL ? "rtl" : "ltr",
          margin: "20px",
          position: "relative", // Add position relative
        }}
        onClick={preventPropagation} // Use our enhanced prevention function
      >
        <div style={{ marginBottom: "20px", textAlign: isRTL ? "right" : "left" }}>
          {t('Enter a password to protect this album.')}
          <br />
          <br />
          {t('Then, select picture settings prior to being unlocked.')}
        </div>
        
        <input
          type="password"
          style={{
            width: "100%",
            padding: "10px 12px", // More balanced padding on both sides
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            fontSize: "14px",
            boxSizing: "border-box" // Ensure padding is included in width calculation
          }}
          placeholder={t('Enter password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={preventPropagation} // Prevent clicks on input from propagating
        />
        
        <div style={{ marginBottom: "20px" }}>
          <div style={optionStyle}>
            <input 
              type="radio" 
              name="protection" 
              id="notVisible" 
              style={radioStyle}
              checked={selectedOption === 'notVisible'}
              onChange={(e) => handleOptionChange(e, 'notVisible')}
              onClick={preventPropagation} // Prevent clicks on radio buttons from propagating
            />
            <label 
              htmlFor="notVisible"
              onClick={(e) => {
                preventPropagation(e);
                setSelectedOption('notVisible');
              }}
            >
              {t('Not Visible')}
            </label>
          </div>
          
          <div style={optionStyle}>
            <input 
              type="radio" 
              name="protection" 
              id="watermark" 
              style={radioStyle}
              checked={selectedOption === 'watermark'}
              onChange={(e) => handleOptionChange(e, 'watermark')}
              onClick={preventPropagation} // Prevent clicks on radio buttons from propagating
            />
            <label 
              htmlFor="watermark"
              onClick={(e) => {
                preventPropagation(e);
                setSelectedOption('watermark');
              }}
            >
              {t('Watermark')}
            </label>
          </div>
          
          <div style={optionStyle}>
            <input 
              type="radio" 
              name="protection" 
              id="cannotBeSaved" 
              style={radioStyle}
              checked={selectedOption === 'cannotBeSaved'}
              onChange={(e) => handleOptionChange(e, 'cannotBeSaved')}
              onClick={preventPropagation} // Prevent clicks on radio buttons from propagating
            />
            <label 
              htmlFor="cannotBeSaved"
              onClick={(e) => {
                preventPropagation(e);
                setSelectedOption('cannotBeSaved');
              }}
            >
              {t('Cannot Be Saved')}
            </label>
          </div>
          
          <div style={optionStyle}>
            <input 
              type="radio" 
              name="protection" 
              id="noPassword" 
              style={radioStyle}
              checked={selectedOption === 'noPassword'}
              onChange={(e) => handleOptionChange(e, 'noPassword')}
              onClick={preventPropagation} // Prevent clicks on radio buttons from propagating
            />
            <label 
              htmlFor="noPassword"
              onClick={(e) => {
                preventPropagation(e);
                setSelectedOption('noPassword');
              }}
            >
              {t('No Password')}
            </label>
          </div>
        </div>
        
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            flexDirection: isRTL ? "row-reverse" : "row"
          }}
        >
          <button
            onClick={(e) => {
              preventPropagation(e);
              onClose();
            }}
            style={{
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: 6,
              backgroundColor: "#f1f1f1",
              cursor: "pointer",
            }}
          >
            {t('Cancel')}
          </button>
          <button
            onClick={(e) => {
              preventPropagation(e);
              console.log(`Saving with option: ${selectedOption}, password: ${password.length > 0 ? '********' : 'none'}`);
              alert(t('Password protection feature will be implemented soon.'));
              onClose();
            }}
            style={{
              padding: "8px 12px",
              border: "none",
              borderRadius: 6,
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
          >
            {t('Save')}
          </button>
        </div>
      </div>
    </div>
  );
};

const SaveAlbum = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null)
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [showAltButton, setShowAltButton] = useState(false)
  const [isSubmittingUsername, setIsSubmittingUsername] = useState(false)
  const [debugMessages, setDebugMessages] = useState<string[]>([])
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  })
  const [isSavingAlbum, setIsSavingAlbum] = useState(false)
  
  // New state for folder name and description
  const [folderName, setFolderName] = useState("")
  const [folderDescription, setFolderDescription] = useState("")
  const [showFolderDetails, setShowFolderDetails] = useState(false)
  
  // Add state for the password dialog
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)

  // Add a log function that updates both console and debug state
  const log = (message: string) => {
    console.log(message)
    
    // Only add to debug messages if it's an error (starts with ❌)
    if (message.includes("❌") || message.includes("⚠️")) {
      setDebugMessages(prev => [...prev, message])
    }
  }

  // Clear all album data when leaving the page
  const clearAlbumData = () => {
    log("🧹 Clearing all album data...")
    
    // Clear selected photos from localStorage
    localStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
    
    // Also clear any session storage that might be holding state
    sessionStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
    
    // Reset states
    setFolderId(null)
    setSelectedPhotos([])
    setFolderName("")
    setFolderDescription("")
    setProgressTracker({
      totalFiles: 0,
      filesComplete: 0,
      filesUploading: 0,
      filesProcessing: 0,
      filesWithError: 0,
      overallProgress: 0
    })
    setIsSavingAlbum(false) // Reset saving state
    
    // Reset UI progress elements
    const saveProgress = document.getElementById('saveProgress')
    if (saveProgress) {
      saveProgress.style.setProperty('width', '0%')
    }
    
    const saveProgressText = document.getElementById('saveProgressText')
    if (saveProgressText) {
      saveProgressText.innerText = ""
    }
    
    log("✅ Album data cleared successfully")
  }

  useEffect(() => {
    log("🔄 Component initializing...")
  
    // Clear any leftover UI state first
    setIsSavingAlbum(false)
    
    try {
      const token = checkLoginOrRedirect()
      if (!token) {
        log("❌ No token available, redirecting...")
        return
      }
      
      log("✅ Token available")
    
      try {
        const savedUsername = localStorage.getItem("publicUsername")
        setPublicUsername(savedUsername || null)
        log(`👤 Public username: ${savedUsername || "not set"}`)
    
        const payload = JSON.parse(atob(token.split('.')[1]))
        const cognitoUsername = payload["cognito:username"]
        setCognitoUsername(cognitoUsername)
        log(`👤 Cognito username: ${cognitoUsername}`)
        
        // Get folderId directly from URL query parameter
        const params = new URLSearchParams(window.location.search)
        const id = params.get("folderId")
        
        if (id) {
          setFolderId(id)
          log(`📁 Using folder ID from URL: ${id}`)
          
          // Check if this is an existing album (doesn't contain username)
          const isExistingAlbum = id && !id.includes(cognitoUsername)
          log(`📁 Is existing album: ${isExistingAlbum}`)
          
          // Only show folder details if creating a new album
          setShowFolderDetails(!isExistingAlbum)
        } else {
          // If no ID in URL, create a new one
          const newId = `${cognitoUsername}_____${generateUUID()}____Folder`
          setFolderId(newId)
          log(`📁 Created new folder ID: ${newId}`)
          
          // Show folder details for new albums
          setShowFolderDetails(true)
        }
        
        // Folder name and description will be loaded from the backend when needed
        
        // Try to restore selected photos from localStorage
        try {
          const storedPhotos = localStorage.getItem(STORAGE_KEYS.SELECTED_PHOTOS)
          log(`🔍 Checking for stored photos with key ${STORAGE_KEYS.SELECTED_PHOTOS}`)
          if (storedPhotos) {
            log(`📦 Found stored photos data: ${storedPhotos.substring(0, 100)}...`)
            try {
              const parsedPhotos = JSON.parse(storedPhotos) as SelectedPhoto[]
              log(`📊 Parsed photos data: ${JSON.stringify(parsedPhotos.length)} items`)
              if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
                setSelectedPhotos(parsedPhotos)
                log(`📸 Restored ${parsedPhotos.length} photos from storage`)
              } else {
                log(`⚠️ Parsed photos array is empty or not an array`)
              }
            } catch (parseErr) {
              log(`❌ Error parsing stored photos: ${String(parseErr)}`)
            }
          }
        } catch (storageErr) {
          log(`⚠️ Error restoring photos from storage: ${String(storageErr)}`)
          // Not critical, can continue
        }
      } catch (err) {
        log(`❌ Error initializing: ${String(err)}`)
        console.error("Failed to decode idToken", err)
      }
    } catch (initErr) {
      log(`❌ Fatal initialization error: ${String(initErr)}`)
    }
  
    // Test S3 connection
    try {
      if (s3) {
        log("🔄 Testing S3 connection...")
        log(`✅ S3 client appears to be configured correctly (${typeof s3})`)
      } else {
        log("❌ S3 client not available")
      }
    } catch (s3Err) {
      log(`❌ S3 connection test error: ${String(s3Err)}`)
    }
    
  }, [])

  // Save selected photos to localStorage whenever they change
  useEffect(() => {
    if (selectedPhotos.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(selectedPhotos))
      log(`📸 Saved ${selectedPhotos.length} photos to storage`)
    }
  }, [selectedPhotos])

  // Update progress tracker whenever selectedPhotos changes
  useEffect(() => {
    if (selectedPhotos.length === 0) {
      setProgressTracker({
        totalFiles: 0,
        filesComplete: 0,
        filesUploading: 0,
        filesProcessing: 0,
        filesWithError: 0,
        overallProgress: 0
      })
      return
    }

    const filesUploading = selectedPhotos.filter(p => p.status === 'uploading').length
    const filesProcessing = selectedPhotos.filter(p => p.status === 'processing').length
    const filesComplete = selectedPhotos.filter(p => p.status === 'complete').length
    const filesWithError = selectedPhotos.filter(p => p.status === 'error').length
    
    // Calculate overall progress as a percentage
    const totalProgress = selectedPhotos.reduce((sum, photo) => sum + photo.progress, 0)
    const overallProgress = Math.round((totalProgress / selectedPhotos.length) * 100) / 100

    setProgressTracker({
      totalFiles: selectedPhotos.length,
      filesComplete,
      filesUploading,
      filesProcessing, 
      filesWithError,
      overallProgress
    })
  }, [selectedPhotos])

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove)
    setSelectedPhotos(updated)
    
    // Also update localStorage
    if (updated.length > 0) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(updated))
      log(`📸 Updated localStorage after removing photo at index ${indexToRemove}`)
    } else {
      localStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
      log(`📸 Removed photos from localStorage as none remain`)
    }
  }

  // Update specific photo's status and progress
  const updatePhotoStatus = (index: number, status: UploadStatus, progress: number, errorMessage?: string) => {
    setSelectedPhotos(prev => 
      prev.map((photo, i) => 
        i === index 
          ? { ...photo, status, progress, errorMessage } 
          : photo
      )
    )
  }

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    log("🔍 Add Photos button clicked")
    
    if (!cognitoUsername) {
      log("❌ Missing Cognito Username")
      return
    }
  
    const files = Array.from(e.target.files || [])
    log(`📁 Files selected: ${files.length}`)
    
    if (!files.length) return
    
    try {
      log("🔄 Starting file processing...")
      
      // First, add files to state with pending status
      const initialPhotos = files.map(file => {
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
      
      // Add these pending photos to state
      setSelectedPhotos(prev => [...prev, ...initialPhotos])
      
      // Now process each file one by one, updating its status as we go
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const photo = initialPhotos[i]
        const currentIndex = selectedPhotos.length + i
        
        try {
          updatePhotoStatus(currentIndex, 'uploading', 0.1)
          log(`📝 Processing file ${i + 1}/${files.length}: ${file.name} (${file.type})`)
          
          const type: string = file.type
          // const fileExt = file.name.split('.').pop() || "jpg"
          const uuidFileName = photo.fileName
          log(`🆔 Generated UUID filename: ${uuidFileName}`)
          
          const baseKey = type.startsWith("video")
            ? `Input/Video/${uuidFileName}`
            : `Input/Image/${uuidFileName}`
          
          // Generate S3 key locations
          const tempS3Key = `temp/${baseKey}`
          
          // Convert file to ArrayBuffer for S3 upload
          const arrayBuffer = await file.arrayBuffer()
          log(`📦 Converted file to ArrayBuffer`)
          updatePhotoStatus(currentIndex, 'uploading', 0.3)
          
          // Upload to temp folder
          try {
            log(`⬆️ Uploading to ${tempS3Key}...`)
            await s3.send(new PutObjectCommand({
              Bucket: BUCKET_NAME,
              Key: tempS3Key,
              Body: new Uint8Array(arrayBuffer),
              ContentType: file.type || "application/octet-stream"
            }))
            log(`✅ Upload to ${tempS3Key} successful`)
            updatePhotoStatus(currentIndex, 'uploading', 0.6)
          } catch (uploadErr) {
            log(`❌ S3 upload error: ${String(uploadErr)}`)
            updatePhotoStatus(currentIndex, 'error', 0, String(uploadErr))
            continue
          }
          
          // Create S3 preview URL - this would typically be constructed from your S3 bucket URL
          const s3PreviewUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${tempS3Key}`
          log(`🔗 Generated S3 preview URL: ${s3PreviewUrl}`)
          
          let duration: number | null = null
          let thumbnailDataKey: string | null = null
          let thumbnailSize: number | null = null
          let tempThumbnailKey: string | null = null

          if (type.startsWith("video")) {
            updatePhotoStatus(currentIndex, 'processing', 0.7)
            try {
              log(`🎬 Processing video metadata...`)
              duration = Math.round(await getVideoDuration(file))
              log(`⏱️ Video duration: ${duration} seconds`)
              
              log(`🎬 Generating video thumbnail...`)
              const thumbnailBlob = await getVideoThumbnailBlob(file)
              thumbnailDataKey = `Input/Image/${uuidFileName}-thumbnail`
              tempThumbnailKey = `temp/${thumbnailDataKey}`
              thumbnailSize = Math.round(thumbnailBlob.size)
              log(`🎬 Thumbnail generated: ${thumbnailSize} bytes`)
              updatePhotoStatus(currentIndex, 'processing', 0.8)

              // Convert thumbnail blob to ArrayBuffer
              const thumbnailArrayBuffer = await thumbnailBlob.arrayBuffer()
              log(`📦 Converted thumbnail to ArrayBuffer`)
              
              log(`⬆️ Uploading thumbnail to ${tempThumbnailKey}...`)
              await s3.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: tempThumbnailKey,
                Body: new Uint8Array(thumbnailArrayBuffer),
                ContentType: "image/jpeg"
              }))
              log(`✅ Thumbnail upload successful`)
              updatePhotoStatus(currentIndex, 'processing', 0.9)
            } catch (videoErr) {
              log(`⚠️ Video processing error: ${String(videoErr)}`)
              // Don't fail the whole upload if just the thumbnail fails
            }
          }

          // Update the photo status to complete
          updatePhotoStatus(currentIndex, 'complete', 1)
          
          // Update the photo in selectedPhotos with all the new information
          setSelectedPhotos(prev => {
            const updated = [...prev]
            updated[currentIndex] = {
              ...updated[currentIndex],
              s3PreviewUrl, // Now use the S3 URL
              duration,
              thumbnailDataKey,
              thumbnailSize,
              tempKey: tempS3Key,
              tempThumbnailKey,
              status: 'complete',
              progress: 1
            }
            return updated
          })
          
          log(`✅ File ${i + 1} processing complete`)
        } catch (fileErr) {
          log(`❌ Error processing file ${i + 1}: ${String(fileErr)}`)
          updatePhotoStatus(currentIndex, 'error', 0, String(fileErr))
        }
      }
    
      log(`✅ All files processed`)
      
      // Revoke object URLs to prevent memory leaks
      initialPhotos.forEach(photo => {
        if (photo.s3PreviewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(photo.s3PreviewUrl)
        }
      })
    } catch (error) {
      log(`❌ Fatal error in handleAddPhotos: ${String(error)}`)
    } finally {
      e.target.value = ""
    }
  }  

  // New function that contains just the album saving logic without the username checks
  const saveAlbumDirectly = async () => {
    log("🔍 Executing album save directly after username update")
    setIsSavingAlbum(true)

    try {
      const now = Math.floor(Date.now() / 1000)
      const token = localStorage.getItem("idToken")
      
      if (!token) {
        log("❌ No ID token found")
        setIsSavingAlbum(false)
        return
      }
      
      if (!cognitoUsername) {
        log("❌ No Cognito username found")
        setIsSavingAlbum(false)
        return
      }
      
      if (!folderId) {
        log("❌ No folder ID found")
        setIsSavingAlbum(false)
        return
      }
      
      // Filter out photos with error status
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete')

      log(`📊 Processing ${validPhotos.length} photos`)
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`
      const folderParts = folderId.split("_____")
      const folderTargetItemIdentifier = folderParts[1].split("____")[0]
      log(`🆔 Folder target identifier: ${folderTargetItemIdentifier}`)

      // Move files from temp to public folder
      log("🔄 Starting to copy files from temp to public...")
      
      let completedMoves = 0
      const totalMoves = validPhotos.length
      
      for (let index = 0; index < validPhotos.length; index++) {
        const photo = validPhotos[index]
        log(`📝 Processing photo ${index + 1}/${validPhotos.length}: ${photo.fileName}`)
        
        if (photo.tempKey) {
          try {
            // Move main file from temp to public
            const publicKey = `public/${photo.tempKey.substring(5)}`
            log(`⬆️ Copying from ${photo.tempKey} to ${publicKey}...`)
            
            await s3.send(new CopyObjectCommand({
              Bucket: BUCKET_NAME,
              CopySource: `${BUCKET_NAME}/${photo.tempKey}`,
              Key: publicKey
            }))
            log(`✅ Copy successful`)
            
            // Skip the delete step for now as it's causing issues
            log(`⏩ Skipping deletion of temp files to avoid errors`)
            
            // Move thumbnail if exists
            if (photo.tempThumbnailKey) {
              const publicThumbnailKey = `public/${photo.tempThumbnailKey.substring(5)}`
              log(`⬆️ Copying thumbnail from ${photo.tempThumbnailKey} to ${publicThumbnailKey}...`)
              
              await s3.send(new CopyObjectCommand({
                Bucket: BUCKET_NAME,
                CopySource: `${BUCKET_NAME}/${photo.tempThumbnailKey}`,
                Key: publicThumbnailKey
              }))
              log(`✅ Thumbnail copy successful`)
            }
            
            completedMoves++
            // Update progress in UI
            const moveProgress = (completedMoves / totalMoves) * 100
            document.getElementById('saveProgress')?.style.setProperty('width', `${moveProgress}%`)
          } catch (moveErr) {
            log(`❌ Error copying files: ${String(moveErr)}`)
            throw moveErr
          }
        } else {
          log(`⚠️ Photo ${index + 1} has no tempKey, skipping`)
        }
        
        log(`✅ Photo ${index + 1} processing complete`)
      }
      log("✅ All files copied successfully")

      // Add folder name and description to the folderInput
      const folderPositionInput = {
        currentTime: now,
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
          folderName: folderName, // Add folder name
          folderDescription: folderDescription, // Add folder description
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

      const updatedFileReferenceInputs = validPhotos.map(photo => {
        const dataKey = photo.type === "video" || photo.type?.startsWith("video")
          ? `Input/Video/${photo.fileName}`
          : `Input/Image/${photo.fileName}`

        const fileId = `${cognitoUsername}_____${photo.fileName}____File`

        return {
          fileReferencesHolderId: folderId,
          currentTime: now,
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
              s3UploadedAt: now,
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
      
      log("📊 Sending GraphQL mutation to save album...")
      const saveProgressText = document.getElementById('saveProgressText')
      if (saveProgressText) {
        saveProgressText.innerText = t('Finalizing album...')
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
        log("❌ Upload failed: " + (json.errors ? JSON.stringify(json.errors, null, 2) : "Unknown error"))
        setIsSavingAlbum(false)
      } else {
        log("✅ Album saved successfully!")
        
        // Clear all album data before redirecting
        clearAlbumData()
        
        const saveSuccessText = document.getElementById('saveProgressText')
        if (saveSuccessText) {
          saveSuccessText.innerText = t('Album saved successfully!')
        }
        
        // Also set a flag in sessionStorage that we just completed an album
        sessionStorage.setItem('album_just_saved', 'true')
        
        // Slight delay before redirect for user to see success message
        setTimeout(() => {
          window.location.href = "/my-albums.html"
        }, 1000)
      }
    } catch (err) {
      log("❌ Unexpected error: " + String(err))
      setIsSavingAlbum(false)
    }
  }

  // Modified to check username and either show prompt or call saveAlbumDirectly
  const handleSaveAlbum = async () => {
    log("🔍 Save Album button clicked")
    
    // No need to validate folder name since it's optional
    log("🔍 Proceeding with save - folder name is optional")
    
    setIsSavingAlbum(true)

    try {
      if (publicUsername?.startsWith("Profile-")) {
        log("👤 Username starts with Profile-, showing username prompt")
        setUsernameInput(publicUsername)
        setShowUsernamePrompt(true)
        setIsSavingAlbum(false)
        return
      }

      // If we have a valid username, proceed directly to saving
      saveAlbumDirectly()
    } catch (err) {
      log("❌ Unexpected error in handleSaveAlbum: " + String(err))
      setIsSavingAlbum(false)
    }
  }
  
  const validateUsername = (username: string) => /^[a-zA-Z0-9-]+$/.test(username)

  // Modified to call saveAlbumDirectly instead of handleSaveAlbum
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
        localStorage.setItem("publicUsername", newName)
        setPublicUsername(newName)
        setShowUsernamePrompt(false)
        
        // Automatically proceed with saving the album after username is set
        // Call saveAlbumDirectly instead of handleSaveAlbum to avoid the check loop
        log("👤 Username saved successfully, automatically proceeding to save album")
        saveAlbumDirectly()
      } else {
        throw new Error("Username taken")
      }
    } catch (e) {
      setUsernameError(t('Username is already taken. Please try a different one.'))
      setShowAltButton(true)
      setIsSubmittingUsername(false)
    }
  }

  const appendRandomDigits = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString()
    const modified = `${usernameInput}${digits}`
    setUsernameInput(modified)
    submitUsername(modified)
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/index.html"
  }

  // Handle opening the password dialog
  const handleOpenPasswordDialog = () => {
    log("🔒 Opening password policy dialog")
    setShowPasswordDialog(true)
  }

  // Handle closing the password dialog
  const handleClosePasswordDialog = () => {
    log("🔒 Closing password policy dialog")
    setShowPasswordDialog(false)
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        direction: isRTL ? 'rtl' : 'ltr'
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ marginBottom: "12px" }}>
            <a 
              href="/my-albums.html"
              style={{
                fontSize: "16px",
                color: "#007bff",
                textDecoration: "none",
                fontWeight: "500"
              }}
            >
              {t('My Albums')}
            </a>
          </div>
          
          {publicUsername && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "16px", color: "#666" }}>{publicUsername}</div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
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
            </div>
          )}
        </div>

        {/* Progress Tracking Overview */}
        {progressTracker.totalFiles > 0 && (
          <div style={{ marginBottom: "24px", backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>{t('Upload Progress')}</h3>
            
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                <span>{t('Overall Progress')}: {Math.round(progressTracker.overallProgress * 100)}%</span>
                <span>{progressTracker.filesComplete} {t('of')} {progressTracker.totalFiles} {t('complete')}</span>
              </div>
              <div style={{ height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
                <div 
                  style={{ 
                    height: "100%", 
                    width: `${progressTracker.overallProgress * 100}%`, 
                    backgroundColor: "#4caf50",
                    borderRadius: "4px",
                    transition: "width 0.3s ease"
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: "flex", gap: "12px", fontSize: "14px", color: "#666" }}>
              {progressTracker.filesUploading > 0 && (
                <div>📤 {t('Uploading')}: {progressTracker.filesUploading}</div>
              )}
              {progressTracker.filesProcessing > 0 && (
                <div>⚙️ {t('Processing')}: {progressTracker.filesProcessing}</div>
              )}
              {progressTracker.filesComplete > 0 && (
                <div>✅ {t('Complete')}: {progressTracker.filesComplete}</div>
              )}
              {progressTracker.filesWithError > 0 && (
                <div style={{ color: "#e53935" }}>❌ {t('Failed')}: {progressTracker.filesWithError}</div>
              )}
            </div>
          </div>
        )}

        {/* Save Album Progress */}
        {isSavingAlbum && (
          <div style={{ marginBottom: "24px", backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>{t('Saving Album')}</h3>
            <div id="saveProgressText" style={{ fontSize: "14px", marginBottom: "8px" }}>{t('Moving files...')}</div>
            <div style={{ height: "8px", backgroundColor: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
              <div 
                id="saveProgress"
                style={{ 
                  height: "100%", 
                  width: "5%", 
                  backgroundColor: "#2196f3",
                  borderRadius: "4px",
                  transition: "width 0.3s ease"
                }}
              />
            </div>
          </div>
        )}

        <input
          type="file"
          id="file-input"
          accept="image/*,video/*"
          multiple
          onChange={handleAddPhotos}
          style={{ display: "none" }}
        />

        {selectedPhotos.length > 0 && (
          <>
            <p style={{ fontSize: "16px", marginBottom: "16px", color: "#333" }}>
              {selectedPhotos.length} {selectedPhotos.length > 1 ? t('photos selected') : t('photo selected')}:
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
              {selectedPhotos.map((photo, i) => (
                <div key={i} style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                  width: "160px",
                  position: "relative"
                }}>
                  {/* Status indicator */}
                  <div style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    backgroundColor: 
                      photo.status === 'complete' ? '#4caf50' : 
                      photo.status === 'error' ? '#e53935' :
                      photo.status === 'uploading' ? '#2196f3' :
                      photo.status === 'processing' ? '#ff9800' : '#9e9e9e',
                    color: 'white',
                    zIndex: 1
                  }}>
                    {photo.status === 'complete' ? '✓' : 
                     photo.status === 'error' ? '✕' :
                     photo.status === 'uploading' ? '↑' :
                     photo.status === 'processing' ? '⚙️' : '•'}
                  </div>

                  {/* Media preview */}
                  <div style={{ position: "relative", marginBottom: "8px", height: "120px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {photo.type === "video" || photo.type?.startsWith("video") ? (
                      <video src={photo.s3PreviewUrl} controls style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "6px" }} />
                    ) : (
                      <img src={photo.s3PreviewUrl} alt={photo.fileName} style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "6px" }} />
                    )}
                    
                    {/* Upload progress bar for in-progress items */}
                    {(photo.status === 'uploading' || photo.status === 'processing') && (
                      <div style={{ 
                        position: "absolute", 
                        bottom: "4px", 
                        left: "4px", 
                        right: "4px", 
                        height: "4px", 
                        backgroundColor: "rgba(0,0,0,0.2)",
                        borderRadius: "2px",
                        overflow: "hidden"
                      }}>
                        <div style={{ 
                          height: "100%", 
                          width: `${photo.progress * 100}%`, 
                          backgroundColor: photo.status === 'uploading' ? "#2196f3" : "#ff9800",
                          transition: "width 0.3s ease"
                        }} />
                      </div>
                    )}
                  </div>
                  
                  {/* File info */}
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "6px" }}>
                    {photo.type?.startsWith("video") ? t('Video') : t('Image')}
                    {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} MB`}
                    {photo.duration && ` • ${photo.duration}s`}
                  </div>

                  {/* Error message if any */}
                  {photo.status === 'error' && photo.errorMessage && (
                    <div style={{ fontSize: "12px", color: "#e53935", marginBottom: "6px" }}>
                      {t('Error')}: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
                    </div>
                  )}
                  
                  {/* Remove button */}
                  <button 
                    onClick={() => removePhoto(i)} 
                    style={{
                      backgroundColor: "#e53935",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 8px",
                      fontSize: "12px",
                      cursor: "pointer",
                      marginTop: "auto"
                    }}
                    disabled={isSavingAlbum}
                  >
                    {t('Remove')}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
              opacity: isSavingAlbum ? 0.6 : 1,
              pointerEvents: isSavingAlbum ? "none" : "auto"
            }}
            onClick={handleSaveAlbum}
            disabled={isSavingAlbum}
          >
            {isSavingAlbum ? t('Saving Album...') : t('Save Album')}
          </button>
          
          {/* Folder Details Form - Moved here between Save Album and Add More Photos buttons */}
          {showFolderDetails && (
            <div style={{ marginTop: "12px", marginBottom: "12px", backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <div style={{ marginBottom: "16px" }}>
                <label 
                  htmlFor="folderName" 
                  style={{ 
                    display: "block", 
                    marginBottom: "8px", 
                    fontSize: "14px", 
                    fontWeight: "500", 
                    color: "#333" 
                  }}
                >
                  {t('Album Name (Optional)')}
                </label>
                <input
                  id="folderName"
                  type="text"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder={t('Enter album name')}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    boxSizing: "border-box"
                  }}
                />
              </div>
              
              <div style={{ marginBottom: "16px" }}>
                <label 
                  htmlFor="folderDescription" 
                  style={{ 
                    display: "block", 
                    marginBottom: "8px", 
                    fontSize: "14px", 
                    fontWeight: "500", 
                    color: "#333" 
                  }}
                >
                  {t('Album Description (Optional)')}
                </label>
                <textarea
                  id="folderDescription"
                  value={folderDescription}
                  onChange={(e) => setFolderDescription(e.target.value)}
                  placeholder={t('Enter album description')}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "16px",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                    boxSizing: "border-box",
                    resize: "vertical"
                  }}
                />
              </div>
            </div>
          )}

          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#8c8c8c", // More neutral gray color
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
              opacity: isSavingAlbum ? 0.6 : 1,
              pointerEvents: isSavingAlbum ? "none" : "auto"
            }}
            onClick={() => {
              const input = document.getElementById("file-input") as HTMLInputElement
              input?.click()
            }}
            disabled={isSavingAlbum}
          >
            {t('Add More Photos')}
          </button>
          
          {/* Select Photos To Delete button - only visible for existing folderIds */}
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#dc3545", // Red color
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(220, 53, 69, 0.2)",
              opacity: isSavingAlbum ? 0.6 : 1,
              pointerEvents: isSavingAlbum ? "none" : "auto"
            }}
            onClick={() => {
              // Redirect to delete photos page with this folderId
              window.location.href = `/delete-photos.html?folderId=${folderId}`
            }}
            disabled={isSavingAlbum}
          >
            {t('Select Photos To Delete')}
          </button>
          
          {/* Album Password Policy button */}
          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#8c8c8c", // More neutral gray color
              color: "white",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(140, 140, 140, 0.2)",
              opacity: isSavingAlbum ? 0.6 : 1,
              pointerEvents: isSavingAlbum ? "none" : "auto"
            }}
            onClick={handleOpenPasswordDialog}
            disabled={isSavingAlbum}
          >
            {t('Album Password Policy')}
          </button>
        </div>

        {/* Username Prompt Dialog */}
        {showUsernamePrompt && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}>
            <div style={{
              background: "#fff",
              padding: 30,
              borderRadius: 12,
              width: "90%",
              maxWidth: 400,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              direction: isRTL ? 'rtl' : 'ltr' // RTL support for the modal
            }}>
              <p style={{ fontSize: 16, marginBottom: 12 }}>
                {t('Enter Username')}
              </p>
              <p style={{ fontSize: 14, marginBottom: 16, color: "#666" }}>
                {t('Username should contain only letters, numbers and hyphens. Example: john-doe2')}
              </p>
              <input
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  textAlign: isRTL ? 'right' : 'left' // Text alignment for RTL
                }}
              />
              {usernameError && <div style={{ color: "#e53935", marginBottom: 12 }}>{usernameError}</div>}
              <button
                disabled={isSubmittingUsername}
                onClick={() => {
                  if (!validateUsername(usernameInput)) {
                    setUsernameError(t('Username must contain only letters, numbers, and hyphens.'))
                    return
                  }
                  submitUsername(usernameInput)
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  opacity: isSubmittingUsername ? 0.6 : 1,
                  marginBottom: showAltButton ? 10 : 0
                }}
              >
                {t('Select Username')}
              </button>
              {showAltButton && (
                <button
                  disabled={isSubmittingUsername}
                  onClick={appendRandomDigits}
                  style={{
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    opacity: isSubmittingUsername ? 0.6 : 1
                  }}
                >
                  {t('Add Random Digits to Username')}
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Password Dialog Component */}
        {showPasswordDialog && (
          <PasswordDialog 
            isOpen={showPasswordDialog} 
            onClose={handleClosePasswordDialog} 
          />
        )}
      </div>

      {debugMessages.length > 0 && (
        <div style={{ marginTop: "40px", background: "#fff3cd", padding: "16px", borderRadius: "8px", border: "1px solid #ffeeba" }}>
          <h3 style={{ marginTop: 0, fontSize: "18px", color: "#856404" }}>{t('Debug Log')}</h3>
          <pre style={{ fontSize: "14px", color: "#856404", whiteSpace: "pre-wrap", maxHeight: "400px", overflow: "auto" }}>
            {debugMessages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "8px" }}>{msg}</div>
            ))}
          </pre>
        </div>
      )}

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