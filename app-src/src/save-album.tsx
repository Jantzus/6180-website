import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "./checkLogin"
import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity"

const REGION = "us-east-1"
const BUCKET_NAME = "i6180-assets-prod-0"
const IDENTITY_POOL_ID = "us-east-1:a5655055-4c58-4173-8d05-af1bb538ec13"
const USER_POOL_ID = "us-east-1_rqcAR61SV"
const GRAPHQL_ENDPOINT = "https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql"

const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    identityPoolId: IDENTITY_POOL_ID,
    clientConfig: { region: REGION },
    logins: {
      [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]: localStorage.getItem("idToken") || "",
    },
  }),
})

type SelectedPhoto = {
  fileName: string
  dataUrl: string
  type: "image" | "video"
  size?: number
  file?: File
  duration?: number | null
  thumbnailDataKey?: string | null
  thumbnailSize?: number | null
}

const generateUUID = () => {
  return crypto.randomUUID?.() || "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >>
      (Number(c) / 4)
    ).toString(16)
  )
}

const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.preload = "metadata"
    video.src = URL.createObjectURL(file)
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      resolve(video.duration)
    }
    video.onerror = () => reject("Could not load video metadata")
  })
}

const getVideoThumbnailBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.src = URL.createObjectURL(file)
    video.crossOrigin = "anonymous"
    video.muted = true
    video.currentTime = 0
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (!ctx) return reject("No canvas context")
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => {
        if (blob) resolve(blob)
        else reject("Failed to create blob")
        URL.revokeObjectURL(video.src)
      }, "image/jpeg", 0.8)
    }
    video.onerror = reject
  })
}

const SaveAlbum = () => {

  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [showAltButton, setShowAltButton] = useState(false)
  const [isSubmittingUsername, setIsSubmittingUsername] = useState(false)
  const [debugMessages, setDebugMessages] = useState<string[]>([])

  useEffect(() => {

    const token = checkLoginOrRedirect()
    if (!token) return
  
    try {
      const savedUsername = localStorage.getItem("publicUsername")
      setPublicUsername(savedUsername || null)
  
      const stored = localStorage.getItem("selectedPhotos")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setSelectedPhotos(parsed)
        } catch (err) {
          console.warn("Failed to parse selectedPhotos from localStorage", err)
        }
      }
  
      const payload = JSON.parse(atob(token.split('.')[1]))
      const cognitoUsername = payload["cognito:username"]
  
      const params = new URLSearchParams(window.location.search)
      const id = params.get("folderId")
  
      if (id) {
        setFolderId(id)
      } else {
        const newId = `${cognitoUsername}_____${generateUUID()}____Folder`
        setFolderId(newId)
      }
    } catch (err) {
      console.error("Failed to decode idToken", err)
    }
  }, [])

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove)
    setSelectedPhotos(updated)
  }

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebugMessages(prev => [...prev, `🟢 handleAddPhotos called with ${e.target.files?.length || 0} files`]);
  
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
  
    const uploadPromises = files.map(async file => {
      const type: "image" | "video" = file.type.startsWith("video") ? "video" : "image";
      const s3Key = `public/Input/${type.charAt(0).toUpperCase() + type.slice(1)}/${file.name}`;
  
      setDebugMessages(prev => [...prev, `📤 Uploading to S3: ${s3Key}`]);
  
      try {
        await s3.send(new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: s3Key,
          Body: file,
          ContentType: file.type,
          ACL: "public-read",
        }));
  
        setDebugMessages(prev => [...prev, `✅ Upload success: ${s3Key}`]);
  
        return {
          fileName: file.name,
          dataUrl: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`,
          type,
          size: file.size,
          file,
        };
      } catch (err) {
        setDebugMessages(prev => [...prev, `❌ Upload failed for ${s3Key}`, String(err)]);
        throw err;
      }
    });
  
    Promise.all(uploadPromises).then(results => {
      const combined = [...selectedPhotos, ...results];
      setSelectedPhotos(combined);
      localStorage.setItem("selectedPhotos", JSON.stringify(combined));
    });
  
    e.target.value = "";

  };  

  const handleSaveAlbum = async () => {
    setDebugMessages(prev => [...prev, "🟡 Save Album button clicked"])
  
    try {
      if (publicUsername?.startsWith("Profile-")) {
        setDebugMessages(prev => [...prev, "🔒 Username starts with Profile-, prompting user..."])
        setUsernameInput(publicUsername)
        setShowUsernamePrompt(true)
        return
      }
  
      const now = Math.floor(Date.now() / 1000)
      setDebugMessages(prev => [...prev, `📍 Now timestamp: ${now}`])
  
      const token = localStorage.getItem("idToken")
      if (!token) {
        setDebugMessages(prev => [...prev, "❌ No idToken found"])
        return
      }
  
      const payload = JSON.parse(atob(token.split('.')[1]))
      const cognitoUsername = payload["cognito:username"]
      setDebugMessages(prev => [...prev, `👤 Cognito username: ${cognitoUsername}`])
  
      const accountId = `${cognitoUsername}_____${cognitoUsername}____Account`
      if (!folderId) {
        setDebugMessages(prev => [...prev, "❌ folderId is null"])
        return
      }
  
      const folderParts = folderId.split("_____")
      const folderTargetItemIdentifier = folderParts[1].split("____")[0]
      setDebugMessages(prev => [...prev, `📂 folderTargetItemIdentifier: ${folderTargetItemIdentifier}`])
  
      if (selectedPhotos.length === 0) {
        setDebugMessages(prev => [...prev, "⚠️ No selected photos to upload"])
        return
      }
  
      setDebugMessages(prev => [...prev, `📸 ${selectedPhotos.length} selected photos to upload`])
  
      const movedPhotos = await Promise.all(
        selectedPhotos.map(async (photo) => {
          setDebugMessages(prev => [...prev, `🗂 Already uploaded: ${photo.fileName}`]);
      
          let duration: number | null = null;
          let thumbnailBlob: Blob | null = null;
          let thumbnailDataKey: string | null = null;
          let thumbnailSize: number | null = null;
      
          if (photo.type === "video") {
            try {
              setDebugMessages(prev => [...prev, `🎞 Extracting video metadata for ${photo.fileName}`]);
              duration = Math.round(await getVideoDuration(photo.file!));
              thumbnailBlob = await getVideoThumbnailBlob(photo.file!);
              thumbnailDataKey = `Input/Image/${photo.fileName}-thumbnail`;
              thumbnailSize = Math.round(thumbnailBlob.size);
      
              await s3.send(new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: `public/${thumbnailDataKey}`,
                Body: thumbnailBlob,
                ContentType: "image/jpeg",
                ACL: "public-read"
              }));
      
              setDebugMessages(prev => [...prev, `🖼 Uploaded thumbnail for ${photo.fileName}`]);
            } catch (err) {
              console.warn("Video metadata or thumbnail error", err);
              setDebugMessages(prev => [...prev, `⚠️ Error extracting metadata or thumbnail: ${String(err)}`]);
            }
          }
      
          return {
            ...photo,
            duration,
            thumbnailDataKey,
            thumbnailSize
          };
        })
      );      
  
      setDebugMessages(prev => [...prev, "✅ All files moved to public S3"])
      setSelectedPhotos(movedPhotos)
  
      const folderPositionInput = {
        currentTime: now,
        folderId,
        profileIds: ["Only Me_____Only Me____Profile"],
        folderPositionSelectedTagInputs: [],
        folderPositionPoints: 1,
        acceptedFileReferenceIds: movedPhotos.map(photo =>
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
  
      const updatedFileReferenceInputs = movedPhotos.map(photo => {
        const s3Key = photo.dataUrl.split("/").pop()!
        const baseKey = `Input/Image/${s3Key}`
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
              dataKey: baseKey,
              thumbnailDataKey: photo.thumbnailDataKey || `${baseKey}-thumbnail`,
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
  
      setDebugMessages(prev => [...prev, "🚀 Sending GraphQL mutation..."])
  
      const mutation = `
        mutation MyMutation(
          $folderPositionInputs: [FolderPositionInput!],
          $updatedFileReferenceInputs: [UpdatedFileReferenceInput!]
        ) {
          changeFiles0(updatedFileReferenceInputs: $updatedFileReferenceInputs) {
            items {
                ... on FileReference {
                  id
                  createdAt
                  updatedAt
                  fileReferencesHolderId
                  originAccountId
                  points
                  fileId
                  file {
                    id
                    createdAt
                    updatedAt
                    ownerContactId
                    editorContactIds
                    aboutContactIds
                    FileSharingOptionsEnum
                    captionText
                    filterEnvironmentNumberSetId
                    dataKey
                    thumbnailDataKey
                    dataInBytes
                    thumbnailDataInBytes
                    durationInSeconds
                    s3UploadedAt
                  }
                  hasBeenDeleted
                }
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
        setDebugMessages(prev => [...prev, "✅ Album successfully saved!", JSON.stringify(json, null, 2)])
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

        {folderId?.includes("_____") && (
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "24px" }}>
            {window.location.search.includes("folderId")
              ? `Provided folderId: ${folderId}`
              : `Generated folderId: ${folderId}`}
          </p>
        )}

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
                  {photo.type === "video" ? (
                    <video src={photo.dataUrl} controls style={{ width: "120px", height: "auto", borderRadius: "6px" }} />
                  ) : (
                    <img src={photo.dataUrl} alt={photo.fileName} style={{ width: "120px", height: "auto", borderRadius: "6px" }} />
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

      {debugMessages.length > 0 && (
        <div style={{ marginTop: "40px", background: "#fff3cd", padding: "16px", borderRadius: "8px", border: "1px solid #ffeeba" }}>
          <h3 style={{ marginTop: 0, fontSize: "18px", color: "#856404" }}>Debug Log</h3>
          <pre style={{ fontSize: "14px", color: "#856404", whiteSpace: "pre-wrap" }}>
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
