import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "./checkLogin"

type SelectedPhoto = {
  fileName: string
  dataUrl: string
  type: "image" | "video"
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

const SaveAlbum = () => {
  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])

  useEffect(() => {
    const token = checkLoginOrRedirect()
    if (!token) return

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const cognitoUsername = payload["cognito:username"]

      const params = new URLSearchParams(window.location.search)
      const id = params.get("folderId")

      if (id) {
        setFolderId(id)
      } else {
        const newId = ${cognitoUsername}_____${generateUUID()}____Folder
        setFolderId(newId)
      }

      const saved = localStorage.getItem("selectedPhotos")
      if (saved) {
        try {
          const parsed: SelectedPhoto[] = JSON.parse(saved)
          setSelectedPhotos(parsed)
        } catch (e) {
          console.error("Failed to parse selectedPhotos from localStorage")
        }
      }
    } catch (err) {
      console.error("Failed to decode idToken", err)
    }
  }, [])

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove)
    setSelectedPhotos(updated)
    localStorage.setItem("selectedPhotos", JSON.stringify(updated))
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
        <h1 style={{ fontSize: "28px", marginBottom: "20px", color: "#222" }}>Save Album</h1>

        {folderId?.includes("_____") && (
          <p style={{ fontSize: "16px", color: "#555", marginBottom: "24px" }}>
            {window.location.search.includes("folderId")
              ? Provided folderId: ${folderId}
              : Generated folderId: ${folderId}}
          </p>
        )}

        {selectedPhotos.length === 0 ? (
          <p style={{ fontSize: "16px", color: "#666" }}>
            No selected photos found in localStorage.
          </p>
        ) : (
          <>
            <p style={{ fontSize: "16px", marginBottom: "16px", color: "#333" }}>
              {selectedPhotos.length} photo{selectedPhotos.length > 1 ? "s" : ""} ready to upload:
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              {selectedPhotos.map((photo, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.03)"
                  }}
                >
                  {photo.type === "video" ? (
                    <video
                      src={photo.dataUrl}
                      controls
                      style={{
                        width: "120px",
                        height: "auto",
                        borderRadius: "6px"
                      }}
                    />
                  ) : (
                    <img
                      src={photo.dataUrl}
                      alt={photo.fileName}
                      style={{
                        width: "120px",
                        height: "auto",
                        borderRadius: "6px"
                      }}
                    />
                  )}
                  <button
                    onClick={() => removePhoto(i)}
                    style={{
                      marginLeft: "14px",
                      backgroundColor: "#e53935",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "6px 12px",
                      fontSize: "14px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

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
              onClick={() => alert("Upload logic coming soon")}
            >
              Upload to Album
            </button>
          </>
        )}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbum />)