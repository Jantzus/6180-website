import { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { checkLoginOrRedirect } from "./checkLogin"

const GRAPHQL_ENDPOINT = "https://hhmbamfr3fhjjelhzs5fm7hrki.appsync-api.us-east-1.amazonaws.com/graphql"

export default function TestGraphQL() {
  const [result, setResult] = useState<any>(null)
  const [tokenPayload, setTokenPayload] = useState<any>(null)

  useEffect(() => {
    const token = checkLoginOrRedirect()
    if (!token) return

    const decoded = JSON.parse(atob(token.split(".")[1]))
    setTokenPayload(decoded)

    const testQuery = `
      query {
        getRegisteredEmail
      }
    `

    fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: testQuery }),
    })
      .then((res) => res.json())
      .then(setResult)
      .catch((err) => setResult({ error: err.message }))
  }, [])

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h1>GraphQL Test – getRegisteredEmail</h1>

      <h2>Decoded idToken</h2>
      <pre>{JSON.stringify(tokenPayload, null, 2)}</pre>

      <h2>GraphQL Response</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<TestGraphQL />)
