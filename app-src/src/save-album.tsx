import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "./checkLogin"

type SelectedPhoto = {
  fileName: string
  dataUrl: string
  type: "image" | "video"
}

const GRAPHQL_ENDPOINT = "https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql"

const generateUUID = () =>
  crypto.randomUUID?.() || "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >>
      (Number(c) / 4)
    ).toString(16)
  )

const SaveAlbum = () => {
  const [folderId, setFolderId] = useState<string | null>(null)
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([])
  const [publicUsername, setPublicUsername] = useState<string | null>(null)
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false)
  const [usernameInput, setUsernameInput] = useState("")
  const [usernameError, setUsernameError] = useState("")
  const [showAltButton, setShowAltButton] = useState(false)
  const [isSubmittingUsername, setIsSubmittingUsername] = useState(false)
  const [shouldSaveAfterUsername, setShouldSaveAfterUsername] = useState(false)

  useEffect(() => {
    const token = checkLoginOrRedirect()
    if (!token) return

    try {
      const savedUsername = localStorage.getItem("publicUsername")
      setPublicUsername(savedUsername || null)

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

  useEffect(() => {
    if (shouldSaveAfterUsername) {
      setShouldSaveAfterUsername(false)
      handleSaveAlbum()
    }
  }, [shouldSaveAfterUsername])

  const removePhoto = (indexToRemove: number) => {
    const updated = selectedPhotos.filter((_, i) => i !== indexToRemove)
    setSelectedPhotos(updated)
    localStorage.setItem("selectedPhotos", JSON.stringify(updated))
  }

  const handleAddPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const readerPromises = files.map(file => {
      return new Promise<SelectedPhoto>((resolve) => {
        const reader = new FileReader()
        reader.onload = event => {
          resolve({
            fileName: file.name,
            dataUrl: event.target?.result as string,
            type: file.type.startsWith("video") ? "video" : "image"
          })
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readerPromises).then(results => {
      const combined = [...selectedPhotos, ...results]
      setSelectedPhotos(combined)
      localStorage.setItem("selectedPhotos", JSON.stringify(combined))
    })

    e.target.value = ""
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
        setShouldSaveAfterUsername(true)
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

  const handleSaveAlbum = () => {
    if (publicUsername?.startsWith("Profile-")) {
      setUsernameInput(publicUsername)
      setShowUsernamePrompt(true)
    } else {
      alert("Save logic coming soon")
    }
  }

  const appendRandomDigits = () => {
    const digits = Math.floor(100000 + Math.random() * 900000).toString()
    const modified = `${usernameInput}${digits}`
    setUsernameInput(modified)
    submitUsername(modified)
  }

  return (
    <div style={{ padding: "40px 20px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "28px", color: "#222", margin: 0 }}>Save Album</h1>
            {publicUsername && (
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ fontSize: "16px", color: "#666" }}>{publicUsername}</div>
                <button
                  onClick={() => {
                    localStorage.removeItem("idToken")
                    localStorage.removeItem("publicUsername")
                    localStorage.removeItem("selectedPhotos")
                    window.location.href = "/app/login.html"
                  }}
                  style={{
                    fontSize: "14px",
                    padding: "6px 12px",
                    backgroundColor: "#e53935",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Log out
                </button>
              </div>
            )}
        </div>

        {/* ... other unchanged render logic for file upload UI ... */}

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          <button
            style={{ padding: "14px 28px", fontSize: "16px", borderRadius: "8px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer", boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)" }}
            onClick={handleSaveAlbum}
          >
            Save Album
          </button>

          <button
            style={{ padding: "14px 28px", fontSize: "16px", borderRadius: "8px", border: "none", backgroundColor: "#6c757d", color: "white", cursor: "pointer", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)" }}
            onClick={() => {
              const input = document.getElementById("file-input") as HTMLInputElement
              input?.click()
            }}
          >
            Add More Photos
          </button>
        </div>

        {showUsernamePrompt && (
          <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999 }}>
            <div style={{ background: "#fff", padding: 30, borderRadius: 12, width: "90%", maxWidth: 400, boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
              <p style={{ fontSize: 16, marginBottom: 12 }}>Enter a publicly visible username.</p>
              <p style={{ fontSize: 14, marginBottom: 16, color: "#666" }}>For example, you can use your first name or another name.</p>
              <input
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" }}
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
                style={{ width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", fontSize: "16px", border: "none", borderRadius: "6px", cursor: "pointer", opacity: isSubmittingUsername ? 0.6 : 1, marginBottom: showAltButton ? 10 : 0 }}
              >
                Select Username
              </button>
              {showAltButton && (
                <button
                  disabled={isSubmittingUsername}
                  onClick={appendRandomDigits}
                  style={{ width: "100%", padding: "12px", backgroundColor: "#6c757d", color: "white", fontSize: "16px", border: "none", borderRadius: "6px", cursor: "pointer", opacity: isSubmittingUsername ? 0.6 : 1 }}
                >
                  Select Username + 6 Digits
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<SaveAlbum />)
