import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "./checkLogin"

const GRAPHQL_ENDPOINT = "https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql"
const S3_BUCKET_URL = "https://i6180-assets-prod-0.s3.amazonaws.com/public/"

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

const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return ""
  const date = new Date(timestamp)
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

const MyAlbums = () => {
  const [folders, setFolders] = useState<Folder[]>([])

  useEffect(() => {
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

  const getOwnerItemId = (id: string) => id.split("_____")[0]
  const getTargetItemIdentifier = (id: string) =>
    id.split("_____")[1]?.split("____")[0] || ""

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
        <h1 style={{ fontSize: 28, marginBottom: 24, color: "#333" }}>My Albums</h1>

        {folders.length === 0 && (
          <p style={{ fontSize: 16, color: "#555" }}>No albums found or still loading...</p>
        )}

        {folders.map((folder) => {
          const showCreated = folder.createdAt != null
          const showUpdated =
            folder.updatedAt != null && folder.updatedAt !== folder.createdAt

          const folderInvite = `${getOwnerItemId(folder.id)}_${getTargetItemIdentifier(folder.id)}`
          const inviteLink = `https://6180.io/photos/${folderInvite}`

          return (
            <a
              key={folder.id}
              href={inviteLink}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                marginBottom: 30,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s ease",
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
                    alignItems: "flex-start",
                    marginBottom: 12,
                  }}
                >
                  <h2 style={{ fontSize: 20, margin: 0, color: "#222" }}>
                    {folder.folderName || ""}
                  </h2>
                  {(showCreated || showUpdated) && (
                    <div style={{ fontSize: 13, color: "#777", textAlign: "right" }}>
                      {showCreated && <div>Created: {formatDate(folder.createdAt)}</div>}
                      {showUpdated && <div>Updated: {formatDate(folder.updatedAt)}</div>}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", overflowX: "auto", gap: 12 }}>
                  {folder.files.map((file, i) => (
                    <img
                      key={i}
                      src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                      alt="Thumbnail"
                      style={{
                        width: 140,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 6,
                        border: "1px solid #ddd",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              </div>
            </a>
          )
        })}

      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<MyAlbums />)
