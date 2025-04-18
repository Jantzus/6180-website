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
  files: File[]
}

const MyAlbums = () => {
  const [folders, setFolders] = useState<Folder[]>([])
  const [debugJson, setDebugJson] = useState<any>(null)

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
        setDebugJson(json)

        const items = json?.data?.fetchRelations?.items || []

        const parsed: Folder[] = items.map((item: any) => {
          const folder = item.folder
          const files = folder?.fileReferencesPage?.items?.map((ref: any) => ref.file) || []
          return {
            id: folder.id,
            folderName: folder.folderName,
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

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>My Albums</h1>
      {folders.length === 0 && <p>No albums found or still loading...</p>}
      {folders.map((folder) => (
        <div key={folder.id} style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 10 }}>{folder.folderName || "Untitled Album"}</h2>
          <div style={{ display: "flex", overflowX: "auto", gap: 10 }}>
            {folder.files.map((file, i) => (
              <img
                key={i}
                src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                alt="Thumbnail"
                style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }}
              />
            ))}
          </div>
        </div>
      ))}
      <pre style={{ background: "#f0f0f0", padding: 10, marginTop: 40 }}>
        <strong>Debug Output:</strong>
        <br />
        {JSON.stringify(debugJson, null, 2)}
      </pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<MyAlbums />)