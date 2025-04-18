import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "./checkLogin"

type SelectedPhoto = {
  fileName: string
  dataUrl: string
  type: "image" | "video"
}

const SaveAlbum = () => {
  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [cognitoUsername, setCognitoUsername] = useState<string | null>(null)

  useEffect(() => {
    const token = checkLoginOrRedirect()
    if (!token) return

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      setCognitoUsername(payload["cognito:username"] || null)
    } catch (err) {
      console.error("Failed to decode idToken", err)
    }

    const params = new URLSearchParams(window.location.search)
    const id = params.get("folderId")
    setFolderId(id)

    const saved = localStorage.getItem("selectedPhotos")
    if (saved) {
      try {
        const parsed: SelectedPhoto[] = JSON.parse(saved)
        setSelectedPhotos(parsed)
      } catch (e) {
        console.error("Failed to parse selectedPhotos from localStorage")
      }
    }
  }, [])

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Save Album</h1>

      {cognitoUsername && (
        <p style={{ color: "#555" }}>
          Logged in as: <strong>{cognitoUsername}</strong>
        </p>
      )}

      {!folderId && (
        <p style={{ color: "red" }}>Missing folderId in URL</p>
      )}

      {selectedPhotos.length === 0 ? (
        <p>No selected photos found in localStorage.</p>
      ) : (
        <>
          <p>{selectedPhotos.length} photo(s) ready to upload:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {selectedPhotos.map((photo, i) => (
              <img
                key={i}
                src={photo.dataUrl}
                alt={photo.fileName}
                style={{ width: "120px", height: "auto", borderRadius: "8px", border: "1px solid #ccc" }}
              />
            ))}
          </div>
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => alert("Upload logic coming soon")}
          >
            Upload to Album
          </button>
        </>
      )}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbum />)