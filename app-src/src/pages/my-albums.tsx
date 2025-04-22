import { useEffect, useState, useRef } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "@/lib/checkLogin"
import { formatDate, generateUUID } from "@/lib/utils"
import { GRAPHQL_ENDPOINT, S3_BUCKET_URL, BUCKET_NAME } from "@/lib/config"
import { createS3Client } from "@/lib/aws"
import { PutObjectCommand } from "@aws-sdk/client-s3"
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

// Storage keys for persistent data
const STORAGE_KEYS = {
  FOLDER_ID: 'album_folderId',
  SELECTED_PHOTOS: 'album_selectedPhotos'
}

interface File {
  dataKey: string
  thumbnailDataKey: string | null
  durationInSeconds: number | null
}

interface Folder {
  folderPositionId: string
  folderId: string
  folderName: string | null
  createdAt: number | null
  updatedAt: number | null
  files: File[]
}

type ProgressTracker = {
  totalFiles: number
  filesComplete: number
  filesUploading: number
  filesProcessing: number
  filesWithError: number
  overallProgress: number
}

// Create a new LazyImage component that uses IntersectionObserver
const LazyImage = ({ src, alt, style }: { src: string, alt: string, style: React.CSSProperties }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  
  useEffect(() => {
    // Create an observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        // If the image is intersecting with the viewport
        if (entries[0].isIntersecting) {
          setIsInView(true)
          // Once we've started loading, we can disconnect the observer
          if (imgRef.current) {
            observer.unobserve(imgRef.current)
          }
        }
      },
      {
        // Load images when they're 200px before they appear in viewport
        rootMargin: '200px 0px',
        threshold: 0.01
      }
    )
    
    // Start observing the image element
    if (imgRef.current) {
      observer.observe(imgRef.current)
    }
    
    // Clean up the observer when the component unmounts
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
    }
  }, [])
  
  return (
    <div 
      ref={imgRef}
      style={{
        ...style,
        backgroundColor: '#f0f0f0',
        position: 'relative',
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          style={{
            ...style,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {/* Optional loading indicator */}
      {isInView && !isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
          color: '#666'
        }}>
          Loading...
        </div>
      )}
    </div>
  )
}

const MyAlbums = () => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  })
  const [debugMessages, setDebugMessages] = useState<string[]>([])
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

  // Add a log function that updates both console and debug state
  const log = (message: string) => {
    console.log(message)
    
    // Only add to debug messages if it's an error (starts with ❌)
    if (message.includes("❌") || message.includes("⚠️")) {
      setDebugMessages(prev => [...prev, message])
    }
  }

  useEffect(() => {
    setPublicUsername(localStorage.getItem("publicUsername") || null)

    const token = checkLoginOrRedirect()
    if (!token) return

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const username = payload["cognito:username"]
      setCognitoUsername(username)
    } catch (err) {
      console.error("Failed to decode token", err)
    }

    const fetchData = async () => {
      const query = `
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
                id
                folder {
                  id
                  folderName
                  createdAt
                  updatedAt
                  fileReferencesPage {
                    items {
                      file {
                        dataKey
                        thumbnailDataKey
                        durationInSeconds
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `

      const variables = {
        fetchRelationsInput: {
          ownerItemId: "myAccountOwnerItemId",
          rangeKeyPrefix: "FolderPosition",
          index: "ownerItemId_____RelationType____sortParameter",
          limit: 50,
          scanIndexForward: false,
        },
      }

      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query, variables }),
        })

        const json = await res.json()

        const items = json?.data?.fetchRelations?.items || []

        const parsed: Folder[] = items.map((item: any) => {
          const folder = item.folder
          const files = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || []
          return {
            folderPositionId: item.id,
            folderId: folder.id,
            folderName: folder.folderName,
            createdAt: folder.createdAt,
            updatedAt: folder.updatedAt,
            files: files.filter((f: File) => f && f.dataKey),
          }
        })

        setFolders(parsed)
      } catch (err) {
        console.error("Failed to load folders:", err)
      }
    }

    fetchData()
  }, [])

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

  const clearAlbumData = () => {
    log("🧹 Clearing all album data...")
    
    setIsUploading(false)

    // Reset states
    setSelectedPhotos([])
    setProgressTracker({
      totalFiles: 0,
      filesComplete: 0,
      filesUploading: 0,
      filesProcessing: 0,
      filesWithError: 0,
      overallProgress: 0
    })
    
    log("✅ Album data cleared successfully")
  }

  // Function to open file picker
  const openFilePicker = (folderId: string | null = null) => {

    // Set current folder ID if adding to existing folder
    setCurrentFolderId(folderId)
    
    // Clear current selected photos before opening file picker
    setSelectedPhotos([])
    fileInputRef.current?.click()
    
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

  // Handle file selection
  const handleFileSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    setIsUploading(true)
    log(`📁 Files selected: ${files.length}`)
    
    if (!cognitoUsername) {
      log("❌ Missing Cognito Username")
      setIsUploading(false)
      return
    }
  
    try {
      log("🔄 Starting file processing...")
      
      // Generate a new folder ID or use existing one
      const newFolderId = currentFolderId || `${cognitoUsername}_____${generateUUID()}____Folder`
      localStorage.setItem(STORAGE_KEYS.FOLDER_ID, newFolderId)
      log(`📁 Using folder ID: ${newFolderId}`)
      
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
      setSelectedPhotos(initialPhotos)
      
      // Array to collect processed photos info
      const processedPhotos: SelectedPhoto[] = []
      
      // Now process each file one by one, updating its status as we go
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const photo = initialPhotos[i]
        
        try {
          updatePhotoStatus(i, 'uploading', 0.1)
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
          updatePhotoStatus(i, 'uploading', 0.3)
          
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
            updatePhotoStatus(i, 'uploading', 0.6)
          } catch (uploadErr) {
            log(`❌ S3 upload error: ${String(uploadErr)}`)
            updatePhotoStatus(i, 'error', 0, String(uploadErr))
            continue
          }
          
          // Create S3 preview URL
          const s3PreviewUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${tempS3Key}`
          log(`🔗 Generated S3 preview URL: ${s3PreviewUrl}`)
          
          let duration: number | null = null
          let thumbnailDataKey: string | null = null
          let thumbnailSize: number | null = null
          let tempThumbnailKey: string | null = null

          if (type.startsWith("video")) {
            updatePhotoStatus(i, 'processing', 0.7)
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
              updatePhotoStatus(i, 'processing', 0.8)

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
              updatePhotoStatus(i, 'processing', 0.9)
            } catch (videoErr) {
              log(`⚠️ Video processing error: ${String(videoErr)}`)
              // Don't fail the whole upload if just the thumbnail fails
            }
          }

          // Update the photo status to complete
          updatePhotoStatus(i, 'complete', 1)
          
          // Add processed photo info to our collection
          processedPhotos.push({
            fileName: uuidFileName,
            s3PreviewUrl, 
            type,
            size: file.size,
            duration,
            thumbnailDataKey,
            thumbnailSize,
            tempKey: tempS3Key,
            tempThumbnailKey,
            status: 'complete',
            progress: 1
          })
          
          log(`✅ File ${i + 1} processing complete`)
        } catch (fileErr) {
          log(`❌ Error processing file ${i + 1}: ${String(fileErr)}`)
          updatePhotoStatus(i, 'error', 0, String(fileErr))
        }
      }
    
      log(`✅ All files processed`)
      
      // Save to localStorage - ONLY the keys and metadata, not the file data
      localStorage.setItem(STORAGE_KEYS.SELECTED_PHOTOS, JSON.stringify(processedPhotos))
      log(`📸 Saved ${processedPhotos.length} photos metadata to storage`)
      
      // Revoke object URLs to prevent memory leaks
      initialPhotos.forEach(photo => {
        if (photo.s3PreviewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(photo.s3PreviewUrl)
        }
      })
      
      // Redirect to save-album page with folder ID parameter if adding to existing album
      if (currentFolderId) {
        window.location.href = `/app/save-album.html?folderId=${encodeURIComponent(currentFolderId)}`
      } else {
        window.location.href = "/app/save-album.html"
      }

      clearAlbumData()

    } catch (error) {
      log(`❌ Fatal error in handleFileSelection: ${String(error)}`)
      setIsUploading(false)
    } finally {
      e.target.value = ""
    }
  }

  // Handle deletion confirmation dialog
  const handleDeleteClick = async (e: React.MouseEvent, folderPositionId: string) => {
    e.preventDefault()
    const confirmText = window.prompt("Please type \"delete\" to confirm that you want to permanently delete this album")
    
    if (confirmText && confirmText.toLowerCase() === "delete") {
      try {
        console.log("Deleting album with id:", folderPositionId)
        
        const token = localStorage.getItem("token") || checkLoginOrRedirect()
        if (!token) {
          console.error("No token found")
          return
        }
        
        const deleteQuery = `
          mutation DeleteFolderPosition($deletedFolderPositionIds: [ID!]) {
            changeFiles(deletedFolderPositionIds: $deletedFolderPositionIds) {
              items {
                ... on IdObject {
                  id
                }
              }
            }
          }
        `
        
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            query: deleteQuery, 
            variables: { 
              deletedFolderPositionIds: [folderPositionId] 
            } 
          }),
        })
        
        const json = await res.json()
        
        if (json?.data?.changeFiles?.items) {
          log(`✅ Successfully deleted folder position ${folderPositionId}`)
          // Remove folder from the state
          setFolders(prevFolders => prevFolders.filter(folder => folder.folderPositionId !== folderPositionId))
        } else if (json.errors) {
          const errorMessage = json.errors[0]?.message || "Unknown GraphQL error"
          log(`❌ Failed to delete folder: ${errorMessage}`)
          throw new Error(errorMessage)
        }
      } catch (err) {
        log(`❌ Failed to delete folder: ${String(err)}`)
        console.error("Failed to delete folder:", err)
        alert("Failed to delete this album. Please try again later.")
      }
    }
  }

  const getOwnerItemId = (id: string) => id.split("_____")[0]
  const getTargetItemIdentifier = (id: string) =>
    id.split("_____")[1]?.split("____")[0] || ""

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/index.html"
  }

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Container for all content with consistent width */}
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end", // Changed from space-between to flex-end
              alignItems: "center",
              marginBottom: 16,
              width: "100%",
            }}
          >
            {publicUsername && (
              <div style={{ fontSize: "16px", color: "#666" }}>{publicUsername}</div>
            )}
          </div>
          
          {/* Second row: New Album and Log Out buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              width: "100%",
            }}
          >
            <div>
              <button
                onClick={() => openFilePicker()}
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  opacity: isUploading ? 0.6 : 1,
                  pointerEvents: isUploading ? "none" : "auto"
                }}
                disabled={isUploading}
              >
                {isUploading ? "Creating Album..." : "Create Album"}
              </button>
              <input 
                type="file" 
                id="file-input" 
                ref={fileInputRef}
                accept="image/*,video/*" 
                multiple 
                style={{ display: "none" }}
                onChange={handleFileSelection}
              />
            </div>

            {publicUsername && (
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
                Log Out
              </a>
            )}
          </div>

          {/* Progress Tracking Overview */}
          {progressTracker.totalFiles > 0 && (
            <div style={{ marginBottom: "24px", backgroundColor: "#fff", padding: "16px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", width: "100%" }}>
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

          {folders.length === 0 && !isUploading && (
            <p style={{ fontSize: 16, color: "#555", width: "100%" }}>No albums found or still loading...</p>
          )}

          {folders.map((folder) => {
            const showCreated = folder.createdAt != null
            const showUpdated = folder.updatedAt != null && folder.updatedAt !== folder.createdAt

            const folderInvite = `${getOwnerItemId(folder.folderId)}_${getTargetItemIdentifier(folder.folderId)}`
            const inviteLink = `https://6180.io/photos/${folderInvite}`

            const handleCopy = (e: React.MouseEvent) => {
              e.preventDefault()
              navigator.clipboard.writeText(inviteLink)
                .then(() => {
                  alert("Link has been copied to your clipboard.")
                })
                .catch(err => {
                  console.error("Failed to copy link:", err)
                  alert("Failed to copy link to clipboard.")
                })
            }

            return (
              <div
                key={folder.folderId}
                style={{
                  marginBottom: 30,
                  width: "100%",
                }}
              >
                <a
                  href={inviteLink}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    width: "100%",
                    overflow: "hidden" // Add overflow hidden to prevent content from extending beyond container
                  }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      padding: 20,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      transition: "box-shadow 0.2s ease",
                      width: "100%",
                      maxWidth: "100%", // Ensure it doesn't exceed parent width
                      position: "relative",
                      boxSizing: "border-box", // Include padding in width calculation
                      overflow: "hidden" // Prevent content from extending beyond the card
                    }}
                    onMouseOver={(e) =>
                      ((e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)"))
                    }
                    onMouseOut={(e) =>
                      ((e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"))
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <h2 style={{ fontSize: 20, margin: 0, color: "#222" }}>
                        {folder.folderName || ""}
                      </h2>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        {(showCreated || showUpdated) && (
                          <div style={{ fontSize: 13, color: "#777", textAlign: "right" }}>
                            {showCreated && <div>Created: {formatDate(folder.createdAt)}</div>}
                            {showUpdated && <div>Updated: {formatDate(folder.updatedAt)}</div>}
                          </div>
                        )}
                        <a
                          href="#"
                          onClick={(e) => handleDeleteClick(e, folder.folderPositionId)}
                          style={{
                            fontSize: "13px",
                            color: "#d32f2f",
                            textDecoration: "none",
                          }}
                        >
                          Delete
                        </a>
                      </div>
                    </div>

                    <div 
                      style={{ 
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <div 
                        style={{ 
                          display: "flex", 
                          overflowX: "auto",
                          gap: 12,
                          paddingBottom: 8,
                          msOverflowStyle: "none", 
                          scrollbarWidth: "thin",
                          WebkitOverflowScrolling: "touch",
                          maxWidth: "100%", // Ensure content doesn't exceed container width
                        }}
                      >
                        {folder.files.map((file, i) => (
                          <LazyImage
                            key={i}
                            src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                            alt="Thumbnail"
                            style={{
                              width: 160,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 6,
                              border: "1px solid #ddd",
                              flexShrink: 0,
                            }}
                          />
                        ))}
                      </div>
                      
                      {folder.files.length > 3 && (
                        <div 
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            bottom: 8,
                            width: 30,
                            background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Footer section with Add Photos and Copy Link buttons */}
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 16
                    }}>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={(e) => {
                            e.preventDefault(); 
                            e.stopPropagation();
                            openFilePicker(folder.folderId);
                          }}
                          style={{
                            padding: "8px 12px",
                            backgroundColor: "#4caf50",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontSize: 14,
                            textAlign: "center"
                          }}
                        >
                          Add Photos
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault(); 
                            e.stopPropagation();
                            handleCopy(e);
                          }}
                          style={{
                            padding: "8px 12px",
                            backgroundColor: "#e0e0e0",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                            fontSize: 14,
                            textAlign: "center"
                          }}
                        >
                          Copy Link
                        </button>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {debugMessages.length > 0 && (
        <div style={{ marginTop: "40px", background: "#fff3cd", padding: "16px", borderRadius: "8px", border: "1px solid #ffeeba", maxWidth: 900, margin: "0 auto" }}>
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

ReactDOM.createRoot(document.getElementById("root")!).render(<MyAlbums />)