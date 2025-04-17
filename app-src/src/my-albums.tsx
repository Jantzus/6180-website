import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "./checkLogin"

const MyAlbums = () => {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const t = checkLoginOrRedirect()
    if (t) setToken(t)
  }, [])

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>My Albums</h1>
      {token ? <p>You are logged in.</p> : <p>Checking login...</p>}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<MyAlbums />)
