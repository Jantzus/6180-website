import { useEffect, useState } from "react";
import { checkLoginOrRedirect } from "./checkLogin";

type SelectedPhoto = {
  fileName: string;
  dataUrl: string;
  type: "image" | "video";
};

export default function SaveAlbum() {
  const [folderId, setFolderId] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);

  useEffect(() => {
    // Step 1: Ensure user is logged in
    checkLoginOrRedirect();

    // Step 2: Parse folderId from query string
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("folderId");
    setFolderId(id); // ok if null for now

    // Step 3: Load selectedPhotos from localStorage
    const raw = localStorage.getItem("selectedPhotos");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSelectedPhotos(parsed);
        }
      } catch (err) {
        console.error("Invalid selectedPhotos format in localStorage");
      }
    }
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Save Album</h1>
      {!folderId && (
        <div style={{ color: "gray", marginBottom: "1rem" }}>
          No folder ID provided. Placeholder logic here.
        </div>
      )}

      {selectedPhotos.length === 0 ? (
        <p>No photos or videos selected.</p>
      ) : (
        <div>
          {selectedPhotos.map((item, index) => (
            <div key={index} style={{ marginBottom: "1rem" }}>
              {item.type === "image" ? (
                <img
                  src={item.dataUrl}
                  alt={item.fileName}
                  style={{ maxWidth: "100%", borderRadius: "0.5rem" }}
                />
              ) : (
                <video
                  src={item.dataUrl}
                  controls
                  style={{ maxWidth: "100%", borderRadius: "0.5rem" }}
                />
              )}
              <div style={{ fontSize: "0.9rem", color: "#666" }}>
                {item.fileName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}