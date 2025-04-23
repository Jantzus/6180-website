export function checkLoginOrRedirect(): string | null {
  const token = localStorage.getItem("idToken");

  if (!token) {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/app/login.html?redirect=${redirect}`;
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token does not have 3 parts");
    }

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      console.warn("Token expired at", new Date(payload.exp * 1000).toISOString());
      localStorage.removeItem("idToken");
      const redirect = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/app/login.html?redirect=${redirect}`;
      return null;
    }

    console.log("Valid idToken. Exp:", new Date(payload.exp * 1000).toISOString());
    return token;
  } catch (e) {
    console.error("Invalid token:", e);
    localStorage.removeItem("idToken");
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/app/login.html?redirect=${redirect}`;
    return null;
  }
}

export const generateUUID = () =>
  crypto.randomUUID?.() || "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (
      Number(c) ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & 15) >>
      (Number(c) / 4)
    ).toString(16)
  )

export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject("Failed to convert file to data URL")
    reader.readAsDataURL(file)
  })
}

export const dataUrlToFile = (dataUrl: string, filename: string): File => {
  const arr = dataUrl.split(",")
  const mime = arr[0].match(/:(.*?);/)?.[1] || "application/octet-stream"
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new File([u8arr], filename, { type: mime })
}

export const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return ""
  const date = new Date(timestamp * 1000)
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}
export const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.preload = "metadata"
    video.src = URL.createObjectURL(file)
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src)
      resolve(video.duration)
    }
    video.onerror = () => reject("Could not load video metadata")
  })
}

export const getVideoThumbnailBlob = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video")
    video.src = URL.createObjectURL(file)
    video.crossOrigin = "anonymous"
    video.muted = true
    video.currentTime = 0
    video.onloadeddata = () => {
      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (!ctx) return reject("No canvas context")
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(blob => {
        if (blob) resolve(blob)
        else reject("Failed to create blob")
        URL.revokeObjectURL(video.src)
      }, "image/jpeg", 0.8)
    }
    video.onerror = reject
  })
}
