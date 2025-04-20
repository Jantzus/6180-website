import { useEffect, useState, useRef } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "@/lib/checkLogin"
import { formatDate } from "@/lib/utils"
import { GRAPHQL_ENDPOINT, S3_BUCKET_URL } from "@/lib/config"

interface File {
  dataKey: string
  thumbnailDataKey: string | null
  durationInSeconds: number | null
}

interface Folder {
  id: string
  folderName: string | null
  createdAt: number | null
  updatedAt: number | null
  files: File[]
}

const MyAlbums = () => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setPublicUsername(localStorage.getItem("publicUsername") || null)

    const token = checkLoginOrRedirect()
    if (!token) return

    const fetchData = async () => {
      const query = `
        mutation FetchRelations($fetchRelationsInput: FetchRelationsInput!) {
          fetchRelations(fetchRelationsInput: $fetchRelationsInput) {
            items {
              ... on FolderPosition {
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
            id: folder.id,
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

  // Function to open file picker
  const openFilePicker = () => {
    fileInputRef.current?.click()
  }

  // Handle file selection
  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const readerPromises = files.map(file => {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.onload = function (event) {
          if (event.target) {
            resolve({
              fileName: file.name,
              mimeType: file.type,
              dataUrl: event.target.result,
              type: file.type
            })
          }
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readerPromises).then(results => {
      localStorage.setItem("selectedPhotos", JSON.stringify(results))
      window.location.href = "/app/save-album.html"
    })
  }

  // Handle deletion confirmation dialog
  const handleDeleteClick = (e: React.MouseEvent, folderId: string) => {
    e.preventDefault()
    const confirmText = window.prompt("Please type \"delete\" to confirm that you want to permanently delete this album")
    
    if (confirmText && confirmText.toLowerCase() === "delete") {
      try {
        // Delete logic here
        console.log("Deleting album with id:", folderId)
        
        // Example delete request - replace with your actual implementation
        /*
        const token = localStorage.getItem("token")
        const deleteQuery = `
          mutation DeleteFolder($folderId: ID!) {
            deleteFolder(id: $folderId) {
              success
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
            variables: { folderId } 
          }),
        })
        
        const json = await res.json()
        
        if (json?.data?.deleteFolder?.success) {
          // Remove folder from the state
          setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId))
        }
        */
        
        // For now, just remove the folder from state
        setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId))
      } catch (err) {
        console.error("Failed to delete folder:", err)
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <h1 style={{ fontSize: 28, margin: 0, color: "#333" }}>My Albums</h1>
            <button
              onClick={openFilePicker}
              style={{
                fontSize: "14px",
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              New Album
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

        {folders.length === 0 && (
          <p style={{ fontSize: 16, color: "#555" }}>No albums found or still loading...</p>
        )}

        {folders.map((folder) => {
          const showCreated = folder.createdAt != null
          const showUpdated = folder.updatedAt != null && folder.updatedAt !== folder.createdAt

          const folderInvite = `${getOwnerItemId(folder.id)}_${getTargetItemIdentifier(folder.id)}`
          const inviteLink = `https://6180.io/photos/${folderInvite}`
          
          // No longer need folderState with the standard browser prompt

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
              key={folder.id}
              style={{
                display: "flex",
                alignItems: "center", // Changed from flex-start to center for vertical alignment
                marginBottom: 30,
              }}
            >
              <div style={{ 
                marginRight: 16, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center"
              }}>
                <button
                  onClick={handleCopy}
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

              <a
                href={inviteLink}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  flex: 1,
                  maxWidth: "80%", // Limit the entire album container to 70% width
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    padding: 20,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "box-shadow 0.2s ease",
                    width: "100%", // Take full width of the parent (which is limited to 70%)
                    position: "relative", // For positioning the delete link
                  }}
                  onMouseOver={(e) =>
                    ((e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)"))
                  }
                  onMouseOut={(e) =>
                    ((e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"))
                  }
                >
                  {/* Delete link removed from top-right corner since it's now under the Copy Link button */}

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
                        onClick={(e) => handleDeleteClick(e, folder.id)}
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
                      width: "100%", // Full width of parent (which is already constrained)
                      position: "relative", // For scroll indicator
                    }}
                  >
                    <div 
                      style={{ 
                        display: "flex", 
                        overflowX: "auto",
                        gap: 12,
                        paddingBottom: 8, // Space for scrollbar
                        msOverflowStyle: "none", 
                        scrollbarWidth: "thin",
                        WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
                      }}
                    >
                      {folder.files.map((file, i) => (
                        <img
                          key={i}
                          src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                          alt="Thumbnail"
                          style={{
                            width: 160, // Slightly larger thumbnails
                            height: 100, // Maintain aspect ratio
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
                          bottom: 8, // Match padding of container
                          width: 30,
                          background: "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",
                          pointerEvents: "none", // Allow clicks to pass through
                        }}
                      />
                    )}
                  </div>

                  {/* Delete Album link is now positioned relative to the date section */}
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<MyAlbums />)