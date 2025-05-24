import React, { useState, useEffect, useRef, useCallback } from "react";
import { API_ENDPOINT_REFRESHTOKEN, COGNITO_CLIENT_ID } from "@/lib/config"
import { AlbumData, SelectedPhoto, ProgressTracker } from "@/lib/types";
import { LOCAL_STORAGE_KEYS } from "@/lib/config";

// Import upload utilities
import { 
  createLogger, 
  updateProgressTracker,
} from "@/lib/file-upload-utils";

/**
 * Clean redirect utility that handles base URL prefixing
 * @param {string} path - The path to redirect to (e.g., 'login.html', 'my-albums.html')
 */
export const redirectTo = (path: string): void => {
  // Handle external URLs - use as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    window.location.href = path;
    return;
  }
  
  // Handle absolute paths - use as-is
  if (path.startsWith('/')) {
    window.location.href = path;
    return;
  }
  
  // Handle relative paths - prepend baseUrl (original behavior)
  const baseUrl = import.meta.env.BASE_URL || '/';
  const fullPath = baseUrl + path;
  window.location.href = fullPath;
};

/**
 * Generate a URL with base path prefixing for href attributes
 * @param {string} path - The path to generate URL for (e.g., 'login.html', 'save-album.html?id=123')
 * @returns {string} - The generated URL with base path
 */
export const generateUrl = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  return baseUrl + path;
};

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
    redirectTo(`login.html?redirect=${redirect}`);
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
        redirectTo(`login.html?redirect=${redirect}`);
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
    redirectTo(`login.html?redirect=${redirect}`);
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
    redirectTo(`login.html?redirect=${redirect}`);
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
        redirectTo(`login.html?redirect=${redirect}`);
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
    redirectTo(`login.html?redirect=${redirect}`);
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

// Updated function to get video thumbnail with resizing
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
    const generateThumbnail = async () => {
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
        
        // First create a full-quality blob of the frame
        canvas.toBlob(
          (blob) => {
            if (blob) {
              try {
                // Resize and compress the thumbnail
                createResizedThumbnail(blob, 800, 0.6)
                  .then((resizedBlob: Blob) => {
                    resolve(resizedBlob);
                    cleanup();
                  })
                  .catch(resizeError => {
                    console.warn("Resize failed, using original frame:", resizeError);
                    resolve(blob); // Fallback to original if resize fails
                    cleanup();
                  });
              } catch (resizeError) {
                console.warn("Resize failed, using original frame:", resizeError);
                resolve(blob); // Fallback to original if resize fails
                cleanup();
              }
            } else {
              reject(new Error("Failed to create blob"));
              cleanup();
            }
          },
          "image/jpeg",
          0.9
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

/**
 * Generates a shareable invite link for a folder
 * @param {string} folderId - The ID of the folder to generate a link for
 * @returns {string} - The generated invite link
 */
export const generateInviteLink = (
  folderId: string | null,
  albumNanoId: string | null | undefined,
  creatorParameter: string | null | undefined,
  folderName: string | null | undefined
): string => {
  if (!folderId) return '';

  const creator = creatorParameter?.trim()
  || localStorage.getItem(LOCAL_STORAGE_KEYS.PUBLIC_USERNAME)?.trim()
  || 'album';

  const formattedTargetItemIdentifier = getTargetItemIdentifier(folderId).replace(/-/g, '');

  // Clean folder name: only keep alphanumeric characters
  const cleanFolderName = folderName?.replace(/[^a-zA-Z0-9]/g, '') || '';

  let queryParameter = '';

  if (albumNanoId) {
    if (cleanFolderName) {
      queryParameter += `${cleanFolderName}-`;
    }
    queryParameter += albumNanoId;
  } else {
    queryParameter += 'id=';
    if (cleanFolderName) {
      queryParameter += `${cleanFolderName}-`;
    }
    queryParameter += formattedTargetItemIdentifier;
  }

  return `https://6180.io/${creator}/${queryParameter}`;
};

// Format time in MM:SS
export const formatTime = (seconds: number = 0): string => {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;
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

// Helper function to resize and compress images
export const createResizedThumbnail = async (
  imageBlob: Blob, 
  maxDimension = 800, 
  compressionQuality = 0.6
): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    try {
      // Create an image element
      const img = new Image();
      const imageUrl = URL.createObjectURL(imageBlob);
      
      img.onload = () => {
        // Calculate aspect ratio
        const aspectRatio = img.width / img.height;
        let newWidth, newHeight;
        
        if (aspectRatio > 1) {
          // Landscape
          newWidth = maxDimension;
          newHeight = maxDimension / aspectRatio;
        } else {
          // Portrait
          newWidth = maxDimension * aspectRatio;
          newHeight = maxDimension;
        }
        
        // Create canvas at new dimensions
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        
        // Draw the resized image
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(imageUrl);
          reject(new Error("Could not get canvas context"));
          return;
        }
        
        // Draw image to canvas with new dimensions
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(imageUrl);
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          "image/jpeg",
          compressionQuality
        );
      };
      
      img.onerror = (e) => {
        URL.revokeObjectURL(imageUrl);
        reject(new Error(`Image loading error: ${e}`));
      };
      
      img.src = imageUrl;
    } catch (error) {
      reject(error);
    }
  });
};


export const updateSaveProgress = (
  progress: number, 
  textElement: HTMLElement,
  progressBar: HTMLElement,
  message: string,
  isError: boolean = false
) => {
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
    if (isError) {
      progressBar.style.backgroundColor = '#f44336';
    }
  }
  
  if (textElement) {
    textElement.textContent = message;
    if (isError) {
      textElement.style.color = '#f44336';
    }
  }
};

export const showDetailedError = (
  errorElement: HTMLElement, 
  errorMessage: string, 
  textElement: HTMLElement, 
  progressBar: HTMLElement
) => {
  if (progressBar) {
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#f44336';
  }
  
  if (textElement) {
    textElement.textContent = 'Error registering album';
    textElement.style.color = '#f44336';
  }
  
  // Show detailed error message
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.display = 'block';
    
    // Add retry button
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.style.marginTop = '15px';
    retryButton.style.padding = '8px 16px';
    retryButton.style.backgroundColor = '#2196f3';
    retryButton.style.color = 'white';
    retryButton.style.border = 'none';
    retryButton.style.borderRadius = '4px';
    retryButton.style.cursor = 'pointer';
    retryButton.onclick = function() {
      // Remove the modal and try again
      const modalElement = errorElement.closest('div[style*="position: fixed"]');
      if (modalElement && modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
      }
      // Give a slight delay before retrying
      setTimeout(() => {
        // This is a hack - the real saveAlbumDirectly will be provided by closure
        window.location.reload();
      }, 500);
    };
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '15px';
    closeButton.style.marginLeft = '10px';
    closeButton.style.padding = '8px 16px';
    closeButton.style.backgroundColor = '#757575';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
      const modalElement = errorElement.closest('div[style*="position: fixed"]');
      if (modalElement && modalElement.parentNode) {
        modalElement.parentNode.removeChild(modalElement);
      }
    };
    
    // Add buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.appendChild(retryButton);
    buttonsContainer.appendChild(closeButton);
    
    errorElement.parentNode?.appendChild(buttonsContainer);
  }
};

// Hook for file upload management
export const useFileUpload = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileProcessingComplete, setFileProcessingComplete] = useState(false);
  const [progressTracker, setProgressTracker] = useState<ProgressTracker>({
    totalFiles: 0,
    filesComplete: 0,
    filesUploading: 0,
    filesProcessing: 0,
    filesWithError: 0,
    overallProgress: 0
  });

  const log = createLogger(() => {
    // Empty function since we don't need to display debug messages in UI
  });

  // Update progress tracker when selectedPhotos changes
  useEffect(() => {
    updateProgressTracker(selectedPhotos, setProgressTracker);
  }, [selectedPhotos]);

  return {
    fileInputRef,
    selectedPhotos,
    setSelectedPhotos,
    isUploading,
    setIsUploading,
    fileProcessingComplete,
    setFileProcessingComplete,
    progressTracker,
    setProgressTracker,
    log
  };
};

// Hook for fullscreen view management
export const useFullscreenView = () => {
  const [fullscreenItem, setFullscreenItem] = useState<number | null>(null);
  const [loadingFullResolution, setLoadingFullResolution] = useState<Record<number, boolean>>({});

  const openFullscreenView = useCallback((index: number) => {
    setFullscreenItem(index);
    // Pre-load the full resolution of the selected item
    setLoadingFullResolution(prev => ({
      ...prev,
      [index]: true
    }));
    
    // Lock body scroll when fullscreen is open
    document.body.style.overflow = 'hidden';
  }, []);
  
  const closeFullscreenView = useCallback(() => {
    setFullscreenItem(null);
    // Restore body scroll when fullscreen is closed
    document.body.style.overflow = '';
  }, []);
  
  const goToPrevItem = useCallback(() => {
    if (fullscreenItem !== null && fullscreenItem > 0) {
      setFullscreenItem(fullscreenItem - 1);
      setLoadingFullResolution(prev => ({
        ...prev,
        [fullscreenItem - 1]: true
      }));
    }
  }, [fullscreenItem]);
  
  const goToNextItem = useCallback((totalItems: number) => {
    if (fullscreenItem !== null && fullscreenItem < totalItems - 1) {
      setFullscreenItem(fullscreenItem + 1);
      setLoadingFullResolution(prev => ({
        ...prev,
        [fullscreenItem + 1]: true
      }));
    }
  }, [fullscreenItem]);

  const handleFullResolutionLoaded = useCallback((index: number, albumData: AlbumData, setAlbumData: React.Dispatch<React.SetStateAction<AlbumData | null>>) => {
    if (albumData) {
      const updatedMediaItems = [...albumData.mediaItems];
      updatedMediaItems[index] = {
        ...updatedMediaItems[index],
        loaded: true
      };
      
      setAlbumData({
        ...albumData,
        mediaItems: updatedMediaItems
      });
      
      // Clear loading state
      setLoadingFullResolution(prev => {
        const updated = { ...prev };
        delete updated[index];
        return updated;
      });
    }
  }, []);

  return {
    fullscreenItem,
    setFullscreenItem,
    loadingFullResolution,
    setLoadingFullResolution,
    openFullscreenView,
    closeFullscreenView,
    goToPrevItem,
    goToNextItem,
    handleFullResolutionLoaded
  };
};

export function createNanoIdFromUUID(
  uuid: string
) {
  // Step 1: Remove dashes
  const hex = uuid.replace(/-/g, "");
  
  // Step 2: Take first 12 hex characters (48 bits)
  const hex48 = hex.substring(0, 12);
  
  // Step 3: Convert hex to integer
  // Note: JavaScript can't handle very large integers with standard parseInt
  // so we use BigInt for reliable conversion of potentially large hex values
  const decimal = BigInt("0x" + hex48);
  
  // Step 4: Convert to base36
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let base36 = "";
  let num = decimal;
  
  do {
      const remainder = Number(num % 36n);
      base36 = digits[remainder] + base36;
      num = num / 36n;
  } while (num > 0);
  
  return base36;
}