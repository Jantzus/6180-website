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
