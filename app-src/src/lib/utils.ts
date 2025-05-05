import { LOCAL_STORAGE_KEYS } from "@/lib/config"
import { LanguageCode } from "@/lib/types"
import { myAlbumsTranslations } from "@/lib/translations"
import { API_ENDPOINT_REFRESHTOKEN, COGNITO_CLIENT_ID } from "@/lib/config"

/**
 * Attempts to refresh the token using the refresh token from localStorage
 * @param {boolean} forceRefresh - If true, will refresh regardless of expiration time
 * @returns {Promise<boolean>} - True if refresh succeeded, false otherwise
 */
export async function refreshTokenIfNeeded(forceRefresh = false): Promise<boolean> {
  const refreshToken = localStorage.getItem("refreshToken");
  const idToken = localStorage.getItem("idToken");
  
  if (!refreshToken) {
    console.warn("No refresh token available");
    return false;
  }

  if (!idToken) {
    console.warn("No ID token available");
    return false;
  }
  
  try {
    // Check if current token is about to expire
    const parts = idToken.split(".");
    if (parts.length !== 3) {
      throw new Error("Token does not have 3 parts");
    }

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    // Only refresh if token is expired, about to expire (within 5 minutes), or force refresh is true
    if (!forceRefresh && (!payload.exp || payload.exp > now + 300)) {
      console.log("Token not close to expiration, no refresh needed");
      return true;
    }
    
    console.log("Token requires refresh:", forceRefresh ? "Forced refresh" : "Token expiring soon");
    
    // First try direct Cognito refresh (client-side) if available
    try {
      // This would require the AWS SDK to be available in the browser
      // You would need to import and initialize the CognitoIdentityProviderClient here
      // This code is commented out until you add the AWS SDK to your client
      /*
      const cognito = new CognitoIdentityProviderClient({ region: YOUR_REGION });
      const refreshCommand = new InitiateAuthCommand({
        ClientId: COGNITO_CLIENT_ID,
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        AuthParameters: {
          REFRESH_TOKEN: refreshToken,
        },
      });
      
      console.log('Sending direct refresh token request to Cognito...');
      const response = await cognito.send(refreshCommand);
      
      if (response.AuthenticationResult?.IdToken) {
        // Store the new tokens
        localStorage.setItem("idToken", response.AuthenticationResult.IdToken);
        
        if (response.AuthenticationResult.AccessToken) {
          localStorage.setItem("accessToken", response.AuthenticationResult.AccessToken);
        }
        
        // Store the new refresh token if provided, otherwise keep using the current one
        if (response.AuthenticationResult.RefreshToken) {
          localStorage.setItem("refreshToken", response.AuthenticationResult.RefreshToken);
        }
        
        console.log("Token refreshed successfully via direct Cognito refresh");
        return true;
      }
      */
    } catch (directError) {
      console.warn("Direct Cognito refresh failed, falling back to API endpoint:", directError);
      // Fall back to API endpoint
    }
    
    // Make the refresh token API call
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout
    
    try {
      console.log("Attempting to refresh via API endpoint");
      
      const response = await fetch(API_ENDPOINT_REFRESHTOKEN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
          appClientId: COGNITO_CLIENT_ID,
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => "");
        throw new Error(`Refresh failed with status: ${response.status}, ${errorText}`);
      }
      
      const data = await response.json();
      
      if (!data.idToken) {
        throw new Error("Refresh response missing ID token");
      }
      
      // Store the new tokens
      localStorage.setItem("idToken", data.idToken);
      
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      
      // Store the new refresh token if provided
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      
      console.log("Token refreshed successfully via API endpoint");
      return true;
      
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error("Refresh token request timed out after 10 seconds");
      } else {
        console.error("Error refreshing token via API endpoint:", error);
      }
      clearTimeout(timeoutId);
      return false;
    }
    
  } catch (error) {
    console.error("Error in token refresh process:", error);
    return false;
  }
}

/**
 * Check if the user is logged in, attempt to refresh token if expired,
 * and redirect to login page if refresh fails
 * @returns {Promise<string | null>} - The JWT token if valid, null if redirected
 */
export async function checkLoginWithRefresh(): Promise<string | null> {
  const token = localStorage.getItem("idToken");

  if (!token) {
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login.html?redirect=${redirect}`;
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token does not have 3 parts");
    }

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    // If token is expired or about to expire (within 5 minutes)
    if (payload.exp && payload.exp < now + 300) {
      console.warn("Token expired or expiring soon");
      
      // Attempt to refresh the token
      const refreshSuccessful = await refreshTokenIfNeeded();
      
      if (!refreshSuccessful) {
        // If refresh failed, redirect to login
        console.warn("Token refresh failed, redirecting to login");
        localStorage.removeItem("idToken");
        const redirect = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/login.html?redirect=${redirect}`;
        return null;
      }
      
      // Return the new token
      return localStorage.getItem("idToken");
    }

    console.log("Valid idToken. Exp:", new Date(payload.exp * 1000).toISOString());
    return token;
  } catch (e) {
    console.error("Invalid token:", e);
    localStorage.removeItem("idToken");
    const redirect = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login.html?redirect=${redirect}`;
    return null;
  }
}

export async function checkLoginWithoutRedirect(): Promise<string | null> {
  const token = localStorage.getItem("idToken");
  
  // If no token exists, simply return null without redirecting
  if (!token) {
    console.log("No token found, user is not authenticated");
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token does not have 3 parts");
    }

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    // If token is expired or about to expire (within 5 minutes)
    if (payload.exp && payload.exp < now + 300) {
      console.warn("Token expired or expiring soon");
      
      // Attempt to refresh the token
      const refreshSuccessful = await refreshTokenIfNeeded();
      
      if (!refreshSuccessful) {
        // If refresh failed, just remove the token and return null
        console.warn("Token refresh failed");
        localStorage.removeItem("idToken");
        return null;
      }
      
      // Return the new token
      return localStorage.getItem("idToken");
    }
    
    console.log("Valid idToken. Exp:", new Date(payload.exp * 1000).toISOString());
    return token;
  } catch (e) {
    console.error("Invalid token:", e);
    localStorage.removeItem("idToken");
    return null;
  }
}

/**
 * Check if the user is logged in, attempt to refresh token if expired,
 * and redirect to login page with a specific target if refresh fails
 * @param {string} targetPath - The path to redirect to after successful login
 * @returns {Promise<string | null>} - The JWT token if valid, null if redirected
 */
export async function checkLoginWithRefreshOrRedirectToTarget(targetPath: string): Promise<string | null> {
  const token = localStorage.getItem("idToken");

  if (!token) {
    const redirect = encodeURIComponent(targetPath);
    window.location.href = `/login.html?redirect=${redirect}`;
    return null;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token does not have 3 parts");
    }

    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    // If token is expired or about to expire (within 5 minutes)
    if (payload.exp && payload.exp < now + 300) {
      console.warn("Token expired or expiring soon");
      
      // Attempt to refresh the token
      const refreshSuccessful = await refreshTokenIfNeeded();
      
      if (!refreshSuccessful) {
        // If refresh failed, redirect to login
        console.warn("Token refresh failed, redirecting to login");
        localStorage.removeItem("idToken");
        const redirect = encodeURIComponent(targetPath);
        window.location.href = `/login.html?redirect=${redirect}`;
        return null;
      }
      
      // Return the new token
      return localStorage.getItem("idToken");
    }

    console.log("Valid idToken. Exp:", new Date(payload.exp * 1000).toISOString());
    return token;
  } catch (e) {
    console.error("Invalid token:", e);
    localStorage.removeItem("idToken");
    const redirect = encodeURIComponent(targetPath);
    window.location.href = `/login.html?redirect=${redirect}`;
    return null;
  }
}

// All the existing utility functions below remain unchanged
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
    // Create video element
    const video = document.createElement("video");
    const videoUrl = URL.createObjectURL(file);
    
    // Set up video properties
    video.preload = "metadata";
    video.playsInline = true;
    video.muted = true;
    video.src = videoUrl;
    
    // Flag to ensure we only resolve once
    let thumbnailGenerated = false;
    
    // Add the video to the DOM temporarily (can help with some browsers)
    video.style.display = "none";
    document.body.appendChild(video);
    
    // Set up event handlers
    video.onloadedmetadata = () => {
      // Try to seek to a point where content is likely visible
      try {
        // Seek to either 1 second or 15% of the duration, whichever is less
        const seekPoint = Math.min(1, video.duration * 0.15);
        video.currentTime = seekPoint;
      } catch (e) {
        console.warn("Error setting video time:", e);
        // If seeking fails, try to play instead
        try {
          video.play().catch(err => console.warn("Play failed:", err));
        } catch (playErr) {
          console.warn("Play attempt failed:", playErr);
        }
      }
    };
    
    // Generate thumbnail when the frame is ready
    const generateThumbnail = () => {
      if (thumbnailGenerated) return;
      thumbnailGenerated = true;
      
      try {
        // Create canvas at video dimensions
        const canvas = document.createElement("canvas");
        const width = video.videoWidth;
        const height = video.videoHeight;
        
        // Handle zero dimensions
        if (width === 0 || height === 0) {
          cleanup();
          reject(new Error("Video has zero dimensions"));
          return;
        }
        
        // Set canvas size
        canvas.width = width;
        canvas.height = height;
        
        // Draw the current frame
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          cleanup();
          reject(new Error("Could not get canvas context"));
          return;
        }
        
        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, width, height);
        
        // Convert to blob and resolve
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
            cleanup();
          },
          "image/jpeg",
          0.85
        );
      } catch (e) {
        cleanup();
        reject(e);
      }
    };
    
    // Clean up resources
    const cleanup = () => {
      video.pause();
      video.removeAttribute("src");
      video.load(); // Resets the media element
      URL.revokeObjectURL(videoUrl);
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
    };
    
    // Listen for multiple events that could indicate a frame is ready
    video.addEventListener("loadeddata", () => {
      // Try after a short delay to ensure frame is rendered
      setTimeout(generateThumbnail, 200);
    });
    
    video.addEventListener("seeked", generateThumbnail);
    video.addEventListener("canplay", generateThumbnail);
    
    // Handle errors
    video.onerror = (e) => {
      cleanup();
      reject(new Error(`Video error: ${video.error?.message || e}`));
    };
    
    // Set a timeout in case nothing triggers
    setTimeout(() => {
      if (!thumbnailGenerated) {
        generateThumbnail();
      }
    }, 2000);
    
    // Start loading the video
    video.load();
  });
};

export const getOwnerItemId = (id: string) => id.split("_____")[0];
export const getTargetItemIdentifier = (id: string) =>
  id.split("_____")[1]?.split("____")[0] || "";


export const detectBrowserLanguage = (): LanguageCode => {
  // First try to get saved language preference
  const savedLanguage = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as LanguageCode | null;
  
  if (savedLanguage && myAlbumsTranslations[savedLanguage]) {
    return savedLanguage;
  }
  
  // Otherwise detect from browser
  const browserLang = navigator.language;
  
  // Check if we have an exact match
  if (browserLang && myAlbumsTranslations[browserLang as LanguageCode]) {
    return browserLang as LanguageCode;
  }
  
  // Check if we have a match for just the language part (e.g., 'en' from 'en-GB')
  const langCode = browserLang.split('-')[0];
  if (langCode && myAlbumsTranslations[langCode as LanguageCode]) {
    return langCode as LanguageCode;
  }
  
  // Default to en-US if no match
  return 'en-US';
};

// Format time in MM:SS
export const formatTime = (seconds: number = 0): string => {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
};

// Get folder ID from URL
export const getIdFromUrl = (): string | null => {
  // Check in query params
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  
  if (id) return id;
  
  // Check in path
  const pathParts = window.location.pathname.split('/');
  const lastPart = pathParts[pathParts.length - 1];
  
  if (lastPart && lastPart.includes('_')) {
    return lastPart;
  }
  
  return null;
};

// Format a UUID string with dashes
export const formatUUID = (uuid: string): string => {
  // Make sure it's exactly 32 characters before formatting
  if (uuid.length === 32) {
    return [
      uuid.slice(0, 8),
      uuid.slice(8, 12),
      uuid.slice(12, 16),
      uuid.slice(16, 20),
      uuid.slice(20)
    ].join('-');
  }
  
  console.error('Invalid UUID format: must be 32 characters after removing dashes');
  return uuid;
};