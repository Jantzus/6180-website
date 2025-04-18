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
        const newId = `${cognitoUsername}_____${generateUUID()}____Folder`
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
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Save Album</h1>

      {folderId?.includes("_____") && (
        <p style={{ color: "#333" }}>
          {window.location.search.includes("folderId")
            ? `Provided folderId: ${folderId}`
            : `Generated folderId: ${folderId}`}
        </p>
      )}

      {selectedPhotos.length === 0 ? (
        <p>No selected photos found in localStorage.</p>
      ) : (
        <>
          <p>{selectedPhotos.length} photo(s) ready to upload:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {selectedPhotos.map((photo, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "8px",
                  width: "fit-content",
                  backgroundColor: "#fff",
                }}
              >
                {photo.type === "video" ? (
                  <video
                    src={photo.dataUrl}
                    controls
                    style={{ width: "120px", height: "auto", borderRadius: "4px" }}
                  />
                ) : (
                  <img
                    src={photo.dataUrl}
                    alt={photo.fileName}
                    style={{ width: "120px", height: "auto", borderRadius: "4px" }}
                  />
                )}
                <button
                  onClick={() => removePhoto(i)}
                  style={{
                    marginLeft: "12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    fontSize: "14px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            style={{
              marginTop: "24px",
              padding: "12px 24px",
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
