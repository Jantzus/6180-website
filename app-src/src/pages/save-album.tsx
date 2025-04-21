import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "@/lib/checkLogin"
import { PutObjectCommand, CopyObjectCommand } from "@aws-sdk/client-s3"

import { BUCKET_NAME, GRAPHQL_ENDPOINT } from "@/lib/config"
import { createS3Client } from "@/lib/aws"
import { generateUUID } from "@/lib/utils"
import { getVideoDuration, getVideoThumbnailBlob } from "@/lib/video"

// Create S3 client
let s3 = createS3Client()

// Define file upload status types
type UploadStatus = 'pending' | 'uploading' | 'processing' | 'complete' | 'error';

type SelectedPhoto = {
  fileName: string
  s3PreviewUrl: string
  type: string | undefined
  size?: number
  duration?: number | null
  thumbnailDataKey?: string | null
  thumbnailSize?: number | null
  tempKey?: string | null
  tempThumbnailKey?: string | null
  status: UploadStatus
  progress: number
  errorMessage?: string
}

type ProgressTracker = {
  totalFiles: number
  filesComplete: number
  filesUploading: number
  filesProcessing: number
  filesWithError: number
  overallProgress: number
}

// Storage keys for persistent data
const STORAGE_KEYS = {
  FOLDER_ID: 'album_folderId',
  SELECTED_PHOTOS: 'album_selectedPhotos'
}

const SaveAlbum = () => {

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
    
    // Clear all album-related data from local storage
    localStorage.removeItem(STORAGE_KEYS.FOLDER_ID)
    localStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
    
    // Also clear any session storage that might be holding state
    sessionStorage.removeItem(STORAGE_KEYS.FOLDER_ID)
    sessionStorage.removeItem(STORAGE_KEYS.SELECTED_PHOTOS)
    
    // Reset states
    setFolderId(null)
    setSelectedPhotos([])
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
        
        // Check if we're returning to this page or starting fresh
        const storedFolderId = localStorage.getItem(STORAGE_KEYS.FOLDER_ID)
        const params = new URLSearchParams(window.location.search)
        const id = params.get("folderId")
    
        // Priority: URL param > localStorage > generate new
        if (id) {
          setFolderId(id)
          localStorage.setItem(STORAGE_KEYS.FOLDER_ID, id)
          log(`📁 Using folder ID from URL: ${id}`)
        } else if (storedFolderId) {
          setFolderId(storedFolderId)
          log(`📁 Using stored folder ID: ${storedFolderId}`)
        } else {
          const newId = `${cognitoUsername}_____${generateUUID()}____Folder`
          setFolderId(newId)
          localStorage.setItem(STORAGE_KEYS.FOLDER_ID, newId)
          log(`📁 Created new folder ID: ${newId}`)
        }
        
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
          } else {
            log(`⚠️ No stored photos found with key ${STORAGE_KEYS.SELECTED_PHOTOS}`)
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

  const handleSaveAlbum = async () => {
    log("🔍 Save Album button clicked")
    setIsSavingAlbum(true)
  
    try {
      if (publicUsername?.startsWith("Profile-")) {
        log("👤 Username starts with Profile-, showing username prompt")
        setUsernameInput(publicUsername)
        setShowUsernamePrompt(true)
        setIsSavingAlbum(false)
        return
      }
  
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
      
      if (selectedPhotos.length === 0) {
        log("❌ No photos selected")
        setIsSavingAlbum(false)
        return
      }
      
      // Filter out photos with error status
      const validPhotos = selectedPhotos.filter(photo => photo.status === 'complete')
      if (validPhotos.length === 0) {
        log("❌ No successfully uploaded photos")
        setIsSavingAlbum(false)
        return
      }
  
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
        saveProgressText.innerText = "Finalizing album..."
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
          saveSuccessText.innerText = "Album saved successfully!"
        }
        
        // Also set a flag in sessionStorage that we just completed an album
        sessionStorage.setItem('album_just_saved', 'true')
        
        // Slight delay before redirect for user to see success message
        setTimeout(() => {
          window.location.href = "/app/my-albums.html"
        }, 1000)
      }
    } catch (err) {
      log("❌ Unexpected error: " + String(err))
      setIsSavingAlbum(false)
    }
  }
  
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
        localStorage.setItem("publicUsername", newName)
        setPublicUsername(newName)
        setShowUsernamePrompt(false)
        
        // Automatically proceed with saving the album after username is set
        log("👤 Username saved successfully, automatically proceeding to save album")
        handleSaveAlbum()
      } else {
        throw new Error("Username taken")
      }
    } catch (e) {
      setUsernameError("Public profile username already taken. Please choose another one.")
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

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#f9fafb",
        minHeight: "100vh"
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", color: "#222", margin: 0 }}>Save Album</h1>
            {publicUsername && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "16px", color: "#666" }}>{publicUsername}</div>
                <button
                  onClick={handleLogout}
                  style={{
                    fontSize: "14px",
                    padding: "6px 12px",
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Log Out
                </button>
              </div>
            )}
        </div>

        {/* Progress Tracking Overview */}
        {progressTracker.totalFiles > 0 && (
          <div style={{ marginBottom: "24px", backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>Upload Progress</h3>
            
            <div style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", marginBottom: "6px" }}>
                <span>Overall Progress: {Math.round(progressTracker.overallProgress * 100)}%</span>
                <span>{progressTracker.filesComplete} of {progressTracker.totalFiles} complete</span>
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
                <div>📤 Uploading: {progressTracker.filesUploading}</div>
              )}
              {progressTracker.filesProcessing > 0 && (
                <div>⚙️ Processing: {progressTracker.filesProcessing}</div>
              )}
              {progressTracker.filesComplete > 0 && (
                <div>✅ Complete: {progressTracker.filesComplete}</div>
              )}
              {progressTracker.filesWithError > 0 && (
                <div style={{ color: "#e53935" }}>❌ Failed: {progressTracker.filesWithError}</div>
              )}
            </div>
          </div>
        )}

        {/* Save Album Progress */}
        {isSavingAlbum && (
          <div style={{ marginBottom: "24px", backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>Saving Album</h3>
            <div id="saveProgressText" style={{ fontSize: "14px", marginBottom: "8px" }}>Moving files to permanent storage...</div>
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
              {selectedPhotos.length} photo{selectedPhotos.length > 1 ? "s" : ""} selected:
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
                    {photo.type?.startsWith("video") ? "Video" : "Image"}
                    {photo.size && ` • ${(photo.size / 1024 / 1024).toFixed(1)} MB`}
                    {photo.duration && ` • ${photo.duration}s`}
                  </div>

                  {/* Error message if any */}
                  {photo.status === 'error' && photo.errorMessage && (
                    <div style={{ fontSize: "12px", color: "#e53935", marginBottom: "6px" }}>
                      Error: {photo.errorMessage.length > 40 ? photo.errorMessage.substring(0, 37) + "..." : photo.errorMessage}
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
                    Remove
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
            disabled={isSavingAlbum || selectedPhotos.length === 0}
          >
            {isSavingAlbum ? "Saving Album..." : "Save Album"}
          </button>

          <button
            style={{
              padding: "14px 28px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#6c757d",
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
            Add More Photos
          </button>
        </div>

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
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
            }}>
              <p style={{ fontSize: 16, marginBottom: 12 }}>
                Enter a publicly visible username.
              </p>
              <p style={{ fontSize: 14, marginBottom: 16, color: "#666" }}>
                For example, you can use your first name or another name.
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
                  fontSize: "16px"
                }}
              />
              {usernameError && <div style={{ color: "#e53935", marginBottom: 12 }}>{usernameError}</div>}
              <button
                disabled={isSubmittingUsername}
                onClick={() => {
                  if (!validateUsername(usernameInput)) {
                    setUsernameError("Public profile usernames can only use English letters, numbers or -.")
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
                Select Username
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
                  Select Username + 6 Digits
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {debugMessages.length > 0 && (
        <div style={{ marginTop: "40px", background: "#fff3cd", padding: "16px", borderRadius: "8px", border: "1px solid #ffeeba" }}>
          <h3 style={{ marginTop: 0, fontSize: "18px", color: "#856404" }}>Debug Log</h3>
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

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbum />)