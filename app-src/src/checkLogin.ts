// src/checkLogin.ts
export function checkLoginOrRedirect(): string | null {
  const token = localStorage.getItem("idToken")

  if (!token) {
    const redirect = encodeURIComponent(window.location.pathname.split("/").pop()!)
    window.location.href = `/app/login.html?redirect=${redirect}`
    return null
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < now) {
      localStorage.removeItem("idToken")
      window.location.href = `/app/login.html?redirect=${encodeURIComponent(location.pathname.split("/").pop()!)}`
      return null
    }

    return token
  } catch (e) {
    console.error("Invalid token:", e)
    localStorage.removeItem("idToken")
    window.location.href = `/app/login.html?redirect=${encodeURIComponent(location.pathname.split("/").pop()!)}`
    return null
  }
}
