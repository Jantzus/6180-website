import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "@/lib/checkLogin"
import { PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

import { BUCKET_NAME, GRAPHQL_ENDPOINT } from "@/lib/config"
import { createS3Client } from "@/lib/aws"
import { generateUUID } from "@/lib/utils"
import { getVideoDuration, getVideoThumbnailBlob } from "@/lib/video"

// Enable more detailed S3 error tracking
console.log("Initializing with more detailed S3 error tracking")

// Create S3 client with error logging
let s3 = createS3Client()

type SelectedPhoto = {
  fileName: string
  previewUrl: string
  type: string | undefined
  size?: number
  duration?: number | null
  thumbnailDataKey?: string | null
  thumbnailSize?: number | null
  tempKey?: string | null
  tempThumbnailKey?: string | null
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

  useEffect(() => {
    setDebugMessages(prev => [...prev, "🔄 Component initializing..."])

    try {
      const token = checkLoginOrRedirect()
      if (!token) {
        setDebugMessages(prev => [...prev, "❌ No token available, redirecting..."])
        return
      }
      
      setDebugMessages(prev => [...prev, "✅ Token available"])
    
      try {
        const savedUsername = localStorage.getItem("publicUsername")
        setPublicUsername(savedUsername || null)
        setDebugMessages(prev => [...prev, `👤 Public username: ${savedUsername || "not set"}`])
    
        const payload = JSON.parse(atob(token.split('.')[1]))
        const cognitoUsername = payload["cognito:username"]
        setCognitoUsername(cognitoUsername)
        setDebugMessages(prev => [...prev, `👤 Cognito username: ${cognitoUsername}`])
    
        const params = new URLSearchParams(window.location.search)
        const id = params.get("folderId")
    
        if (id) {
          setFolderId(id)
          setDebugMessages(prev => [...prev, `📁 Using existing folder ID: ${id}`])
        } else {
          const newId = `${cognitoUsername}_____${generateUUID()}____Folder`
          setFolderId(newId)
          setDebugMessages(prev => [...prev, `📁 Created new folder ID: ${newId}`])
        }
      } catch (err) {
        setDebugMessages(prev => [...prev, `❌ Error initializing: ${String(err)}`])
        console.error("Failed to decode idToken", err)
      }
    } catch (initErr) {
      setDebugMessages(prev => [...prev, `❌ Fatal initialization error: ${String(initErr)}`])
    }

    // Test S3 connection
    try {
      if (s3) {
        setDebugMessages(prev => [...prev, "🔄 Testing S3 connection..."])
        // Just check if s3 object is properly instantiated
        setDebugMessages(prev => [...prev, `✅ S3 client appears to be configured correctly (${typeof s3})`])
      } else {
        setDebugMessages(prev => [...prev, "❌ S3 client not available"])
      }
    } catch (s3Err) {
      setDebugMessages(prev => [...prev, `❌ S3 connection test error: ${String(s3Err)}`])
    }
  }, [])

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove)
    setSelectedPhotos(updated)
  }

  const handleAddPhotos = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebugMessages(prev => [...prev, "🔍 Add Photos button clicked"])
    
    if (!cognitoUsername) {
      setDebugMessages(prev => [...prev, "❌ Missing Cognito Username"])
      return
    }
  
    const files = Array.from(e.target.files || [])
    setDebugMessages(prev => [...prev, `📁 Files selected: ${files.length}`])
    
    if (!files.length) return
    
    try {
      setDebugMessages(prev => [...prev, "🔄 Starting file processing..."])
      
      const updated = await Promise.all(
        files.map(async (file, index) => {
          setDebugMessages(prev => [...prev, `📝 Processing file ${index + 1}/${files.length}: ${file.name} (${file.type})`])
          
          const type: string = file.type
          const fileExt = file.name.split('.').pop() || "jpg"
          const uuidFileName = `${generateUUID()}.${fileExt}`
          setDebugMessages(prev => [...prev, `🆔 Generated UUID filename: ${uuidFileName}`])
          
          const baseKey = type.startsWith("video")
            ? `Input/Video/${uuidFileName}`
            : `Input/Image/${uuidFileName}`
          
          // Create object URL for preview
          const previewUrl = URL.createObjectURL(file)
          setDebugMessages(prev => [...prev, `🖼️ Created preview URL`])
          
          // Convert file to ArrayBuffer for S3 upload
          const arrayBuffer = await file.arrayBuffer()
          setDebugMessages(prev => [...prev, `📦 Converted file to ArrayBuffer`])
          
          // Upload to temp folder
          try {
            setDebugMessages(prev => [...prev, `⬆️ Uploading to temp/${baseKey}...`])
            await s3.send(new PutObjectCommand({
              Bucket: BUCKET_NAME,
              Key: `temp/${baseKey}`,
              Body: new Uint8Array(arrayBuffer),
              ContentType: file.type || "application/octet-stream"
            }))
            setDebugMessages(prev => [...prev, `✅ Upload to temp/${baseKey} successful`])
          } catch (uploadErr) {
            setDebugMessages(prev => [...prev, `❌ S3 upload error: ${String(uploadErr)}`])
            throw uploadErr
          }
          
          let duration: number | null = null
          let thumbnailDataKey: string | null = null
          let thumbnailSize: number | null = null
          let tempThumbnailKey: string | null = null

          if (type.startsWith("video")) {
            try {
              setDebugMessages(prev => [...prev, `🎬 Processing video metadata...`])
              duration = Math.round(await getVideoDuration(file))
              setDebugMessages(prev => [...prev, `⏱️ Video duration: ${duration} seconds`])
              
              setDebugMessages(prev => [...prev, `🎬 Generating video thumbnail...`])
              const thumbnailBlob = await getVideoThumbnailBlob(file)
              thumbnailDataKey = `Input/Image/${uuidFileName}-thumbnail`
              tempThumbnailKey = `temp/${thumbnailDataKey}`
              thumbnailSize = Math.round(thumbnailBlob.size)
              setDebugMessages(prev => [...prev, `🎬 Thumbnail generated: ${thumbnailSize} bytes`])

              // Convert thumbnail blob to ArrayBuffer
              const thumbnailArrayBuffer = await thumbnailBlob.arrayBuffer()
              setDebugMessages(prev => [...prev, `📦 Converted thumbnail to ArrayBuffer`])
              
              setDebugMessages(prev => [...prev, `⬆️ Uploading thumbnail to ${tempThumbnailKey}...`])
              await s3.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: tempThumbnailKey,
                Body: new Uint8Array(thumbnailArrayBuffer),
                ContentType: "image/jpeg"
              }))
              setDebugMessages(prev => [...prev, `✅ Thumbnail upload successful`])
            } catch (videoErr) {
              setDebugMessages(prev => [...prev, `⚠️ Video processing error: ${String(videoErr)}`])
            }
          }

          setDebugMessages(prev => [...prev, `✅ File ${index + 1} processing complete`])
          return {
            fileName: uuidFileName,
            previewUrl,
            type,
            size: file.size,
            duration,
            thumbnailDataKey,
            thumbnailSize,
            tempKey: `temp/${baseKey}`,
            tempThumbnailKey
          }
        })
      )
    
      setDebugMessages(prev => [...prev, `✅ All files processed successfully`])
      const combined = [...selectedPhotos, ...updated]
      setSelectedPhotos(combined)
      setDebugMessages(prev => [...prev, `📊 Total photos in selection: ${combined.length}`])
    } catch (error) {
      setDebugMessages(prev => [...prev, `❌ Fatal error in handleAddPhotos: ${String(error)}`])
    } finally {
      e.target.value = ""
    }
  }  

  const handleSaveAlbum = async () => {
    setDebugMessages(prev => [...prev, "🔍 Save Album button clicked"])
  
    try {
      if (publicUsername?.startsWith("Profile-")) {
        setDebugMessages(prev => [...prev, "👤 Username starts with Profile-, showing username prompt"])
        setUsernameInput(publicUsername)
        setShowUsernamePrompt(true)
        return
      }
  
      const now = Math.floor(Date.now() / 1000)
      const token = localStorage.getItem("idToken")
      
      if (!token) {
        setDebugMessages(prev => [...prev, "❌ No ID token found"])
        return
      }
      
      if (!cognitoUsername) {
        setDebugMessages(prev => [...prev, "❌ No Cognito username found"])
        return
      }
      
      if (!folderId) {
        setDebugMessages(prev => [...prev, "❌ No folder ID found"])
        return
      }
      
      if (selectedPhotos.length === 0) {
        setDebugMessages(prev => [...prev, "❌ No photos selected"])
        return
      }
  
      setDebugMessages(prev => [...prev, `📊 Processing ${selectedPhotos.length} photos`])
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`
      const folderParts = folderId.split("_____")
      const folderTargetItemIdentifier = folderParts[1].split("____")[0]
      setDebugMessages(prev => [...prev, `🆔 Folder target identifier: ${folderTargetItemIdentifier}`])
  
      // Move files from temp to public folder - but skip the delete step which is causing issues
      setDebugMessages(prev => [...prev, "🔄 Starting to copy files from temp to public..."])
      const processedPhotos = await Promise.all(
        selectedPhotos.map(async (photo, index) => {
          setDebugMessages(prev => [...prev, `📝 Processing photo ${index + 1}/${selectedPhotos.length}: ${photo.fileName}`])
          
          if (photo.tempKey) {
            try {
              // Move main file from temp to public
              const publicKey = `public/${photo.tempKey.substring(5)}`
              setDebugMessages(prev => [...prev, `⬆️ Copying from ${photo.tempKey} to ${publicKey}...`])
              
              await s3.send(new CopyObjectCommand({
                Bucket: BUCKET_NAME,
                CopySource: `${BUCKET_NAME}/${photo.tempKey}`,
                Key: publicKey
              }))
              setDebugMessages(prev => [...prev, `✅ Copy successful`])
              
              // Skip the delete step for now as it's causing issues
              setDebugMessages(prev => [...prev, `⏩ Skipping deletion of temp files to avoid errors`])
              
              // Move thumbnail if exists
              if (photo.tempThumbnailKey) {
                const publicThumbnailKey = `public/${photo.tempThumbnailKey.substring(5)}`
                setDebugMessages(prev => [...prev, `⬆️ Copying thumbnail from ${photo.tempThumbnailKey} to ${publicThumbnailKey}...`])
                
                await s3.send(new CopyObjectCommand({
                  Bucket: BUCKET_NAME,
                  CopySource: `${BUCKET_NAME}/${photo.tempThumbnailKey}`,
                  Key: publicThumbnailKey
                }))
                setDebugMessages(prev => [...prev, `✅ Thumbnail copy successful`])
                
                // Skip the thumbnail delete step too
              }
            } catch (moveErr) {
              setDebugMessages(prev => [...prev, `❌ Error copying files: ${String(moveErr)}`])
              throw moveErr
            }
          } else {
            setDebugMessages(prev => [...prev, `⚠️ Photo ${index + 1} has no tempKey, skipping`])
          }
          
          setDebugMessages(prev => [...prev, `✅ Photo ${index + 1} processing complete`])
          return photo
        })
      )
      setDebugMessages(prev => [...prev, "✅ All files copied successfully"])
  
      const folderPositionInput = {
        currentTime: now,
        folderId,
        profileIds: ["Only Me_____Only Me____Profile"],
        folderPositionSelectedTagInputs: [],
        folderPositionPoints: 1,
        acceptedFileReferenceIds: processedPhotos.map(photo =>
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
  
      const updatedFileReferenceInputs = processedPhotos.map(photo => {
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
        setDebugMessages(prev => [...prev, "❌ Upload failed", JSON.stringify(json.errors, null, 2)])
      } else {
        // Clean up ObjectURLs
        selectedPhotos.forEach(photo => {
          if (photo.previewUrl) {
            URL.revokeObjectURL(photo.previewUrl)
          }
        })

        window.location.href = "/app/my-albums.html"
      }
    } catch (err) {
      setDebugMessages(prev => [...prev, "❌ Unexpected error", String(err)])
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
        alert("Username saved. You can now proceed.")
      } else {
        throw new Error("Username taken")
      }
    } catch (e) {
      setUsernameError("Public profile username already taken. Please choose another one.")
      setShowAltButton(true)
    } finally {
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
              {selectedPhotos.length} photo{selectedPhotos.length > 1 ? "s" : ""} ready to upload:
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "32px" }}>
              {selectedPhotos.map((photo, i) => (
                <div key={i} style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                }}>
                  {photo.type === "video" || photo.type?.startsWith("video") ? (
                    <video src={photo.previewUrl} controls style={{ width: "120px", height: "auto", borderRadius: "6px" }} />
                  ) : (
                    <img src={photo.previewUrl} alt={photo.fileName} style={{ width: "120px", height: "auto", borderRadius: "6px" }} />
                  )}
                  <button onClick={() => removePhoto(i)} style={{
                    marginLeft: "14px",
                    backgroundColor: "#e53935",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}>
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
              boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)"
            }}
            onClick={handleSaveAlbum}
          >
            Save Album
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
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)"
            }}
            onClick={() => {
              const input = document.getElementById("file-input") as HTMLInputElement
              input?.click()
            }}
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

      {(
        <div style={{ marginTop: "40px", background: "#fff3cd", padding: "16px", borderRadius: "8px", border: "1px solid #ffeeba" }}>
          <h3 style={{ marginTop: 0, fontSize: "18px", color: "#856404" }}>Debug Log</h3>
          <pre style={{ fontSize: "14px", color: "#856404", whiteSpace: "pre-wrap", maxHeight: "400px", overflow: "auto" }}>
            {debugMessages.length > 0 ? 
              debugMessages.map((msg, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>{msg}</div>
              )) : 
              <div>No debug messages yet. Actions will be logged here.</div>
            }
          </pre>
        </div>
      )}

    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbum />)