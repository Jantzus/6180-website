import { useState } from "react"
import ReactDOM from "react-dom/client"
import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity"

const REGION = "us-east-1"
const BUCKET_NAME = "i6180-assets-prod-0"
const IDENTITY_POOL_ID = "us-east-1:a5655055-4c58-4173-8d05-af1bb538ec13"
const USER_POOL_ID = "us-east-1_rqcAR61SV"

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

const TestUpload = () => {
  const [status, setStatus] = useState<string>("")

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
  
    const blob = new Blob([file], { type: file.type })
    const arrayBuffer = await blob.arrayBuffer()
    const uint8 = new Uint8Array(arrayBuffer)
  
    const s3Key = `test-uploads/${Date.now()}-${file.name}`
    setStatus(`📤 Uploading ${file.name} to S3 as ${s3Key}...`)
  
    try {
      const result = await s3.send(new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: uint8, // ✅ This avoids Safari's broken ReadableStream
        ContentType: file.type
      }))
  
      const url = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${s3Key}`
      setStatus(`✅ Upload successful! URL: ${url}`)
    } catch (err) {
      console.error(err)
      setStatus(`❌ Upload failed: ${String(err)}`)
    }
  }  
  
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>🚀 Simple S3 Upload Test</h1>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <p>{status}</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<TestUpload />)