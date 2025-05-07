import React, { useRef, useEffect } from "react";
import { FolderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { getTargetItemIdentifier } from "@/lib/utils";
import { LazyImage } from "./LazyImage";
import { FooterSection } from "./FooterSection";
import { S3_BUCKET_URL } from "@/lib/config";

// AlbumList Component
type AlbumListProps = {
  folders: FolderType[];
  setFolders: React.Dispatch<React.SetStateAction<FolderType[]>>;
  handleDeleteClick: (folderPositionId: string) => void;
  openFilePicker: (folderId: string | null) => void;
  isUploading: boolean;
  cognitoUsername: string | null;
};

export const AlbumList: React.FC<AlbumListProps> = ({ 
  folders, 
  setFolders,
  handleDeleteClick, 
  openFilePicker,
  isUploading,
  cognitoUsername
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";

  // Reference to keep track of active dropdown menu
  const activeDropdownRef = useRef<HTMLElement | null>(null);

  // Function to handle clicks outside dropdown menu and scrolling
  useEffect(() => {
    // Function to close active dropdown
    function closeActiveDropdown() {
      if (activeDropdownRef.current) {
        activeDropdownRef.current.style.display = "none";
        activeDropdownRef.current = null;
      }
    }

    // Handle clicks outside the dropdown
    function handleClickOutside(event: MouseEvent) {
      if (activeDropdownRef.current && !activeDropdownRef.current.contains(event.target as Node)) {
        closeActiveDropdown();
      }
    }

    // Handle scroll events
    function handleScroll() {
      closeActiveDropdown();
    }

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // Use capture phase to detect all scrolling
    
    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  // Function to toggle dropdown visibility
  const toggleDropdown = (e: React.MouseEvent, dropdownElement: HTMLElement) => {
    e.preventDefault();
    e.stopPropagation();
    
    // If there's already an open dropdown and it's not this one, close it
    if (activeDropdownRef.current && activeDropdownRef.current !== dropdownElement) {
      activeDropdownRef.current.style.display = "none";
    }
    
    // Toggle current dropdown
    const isVisible = dropdownElement.style.display === "block";
    dropdownElement.style.display = isVisible ? "none" : "block";
    
    // Update the active dropdown reference
    activeDropdownRef.current = isVisible ? null : dropdownElement;
  };

  // New function to initiate delete process with system dialog
  const handleDeleteButtonClick = (folderPositionId: string) => {
    // Close any open dropdown
    if (activeDropdownRef.current) {
      activeDropdownRef.current.style.display = "none";
      activeDropdownRef.current = null;
    }
    
    // Use the browser's native confirm dialog
    const confirmDelete = window.confirm(t('Are you sure you want to delete this album? This action cannot be undone.'));
    
    if (confirmDelete) {
      handleDeleteClick(folderPositionId);
    }
  };

  // Helper function to update folder profileIds
  const updateFolderProfileIds = (folderId: string, profileIds: string[]) => {
    setFolders(prevFolders => 
      prevFolders.map(folder => 
        folder.folderId === folderId 
          ? { ...folder, profileIds } 
          : folder
      )
    );
  };

  // Helper function to get password policy display text
  const getPasswordPolicyText = (policy?: string) => {
    switch(policy) {
      case "NotVisible":
        return t('Hidden');
      case "Watermark":
        return t('Watermarked');
      case "CannotBeSaved":
        return t('Cannot be saved');
      case "NoPassword":
      default:
        return t('No password');
    }
  };

  if (folders.length === 0 && !isUploading) {
    return <p style={{ fontSize: 16, color: "#555", width: "100%" }}>{t('No albums found')}</p>;
  }

  return (
    <>
      {folders.map((folder) => {
        const showCreated = folder.createdAt != null;
        const showUpdated = folder.updatedAt != null && folder.updatedAt !== folder.createdAt;

        // Check if user is the creator of the album
        const isCreator = folder.creatorId === `${cognitoUsername}_____${cognitoUsername}____Account`;

        // Get password policy from folder data
        const passwordPolicy = folder.folderPassword?.policy || "NoPassword";

        // Get the contacts from the folder's contactsUsingInvite
        const contacts = folder.contacts || {};
        const contactNames = Object.values(contacts).filter(contact => 
          contact && typeof contact === 'string' && !contact.toString().startsWith('Profile-')
        );

        let formattedTargetItemIdentifier = getTargetItemIdentifier(folder.folderId).replace(/-/g, '');
        const inviteLink = `https://6180.io/photos.html?id=${formattedTargetItemIdentifier}`;

        return (
          <div
            key={folder.folderId}
            style={{
              marginBottom: 30,
              width: "100%",
              direction: isRTL ? "rtl" : "ltr"
            }}
          >
            <a
              href={inviteLink}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                width: "100%",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.2s ease",
                  width: "100%",
                  maxWidth: "100%",
                  position: "relative",
                  boxSizing: "border-box",
                  overflow: "hidden"
                }}
                onMouseOver={(e) =>
                  ((e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)"))
                }
                onMouseOut={(e) =>
                  ((e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"))
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end", // Changed from "center" to "flex-end" to bottom-align
                    marginBottom: 16,
                    flexDirection: isRTL ? "row-reverse" : "row"
                  }}
                >
                  <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: isRTL ? "flex-end" : "flex-start" 
                  }}>
                    <h2 style={{ fontSize: 20, margin: 0, color: "#222" }}>
                      {folder.folderName || ""}
                    </h2>
                    {(showCreated || showUpdated) && (
                      <div style={{ 
                        fontSize: 13, 
                        color: "#777", 
                        textAlign: isRTL ? "right" : "left" as const,
                        marginTop: 4
                      }}>
                        {showCreated && <div>{t('Created')}: {formatDate(folder.createdAt)}</div>}
                        {showUpdated && <div>{t('Updated')}: {formatDate(folder.updatedAt)}</div>}
                      </div>
                    )}
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: isRTL ? "flex-start" : "flex-end",
                    justifyContent: "flex-end", // Added to ensure vertical alignment at the bottom
                    gap: "8px"
                  }}>
                    {isCreator ? (
                      <div style={{ position: "relative" }}>
                        <a
                          href="#"
                          onClick={(e) => {
                            const dropdownMenu = e.currentTarget.nextElementSibling as HTMLElement;
                            if (dropdownMenu) {
                              toggleDropdown(e, dropdownMenu);
                            }
                          }}
                          style={{
                            fontSize: "13px",
                            color: "#2196f3",
                            textDecoration: "none",
                          }}
                        >
                          {t('Edit')}
                        </a>
                        <div 
                          style={{
                            display: "none",
                            position: "absolute",
                            top: "100%",
                            right: isRTL ? "auto" : 0,
                            left: isRTL ? 0 : "auto",
                            backgroundColor: "white",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                            zIndex: 10,
                            minWidth: "150px",
                            padding: "8px 0",
                            marginTop: "5px",
                            textAlign: isRTL ? "right" : "left" as const
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <a
                            href={`/save-album.html?folderId=${encodeURIComponent(folder.folderId)}`}
                            style={{
                              display: "block",
                              padding: "8px 16px",
                              color: "#2196f3",
                              textDecoration: "none",
                              fontSize: "13px",
                              whiteSpace: "nowrap"
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            {t('Edit Details')}
                          </a>
                          <a
                            href="#"
                            style={{
                              display: "block",
                              padding: "8px 16px",
                              color: "#d32f2f",
                              textDecoration: "none",
                              fontSize: "13px",
                              whiteSpace: "nowrap"
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteButtonClick(folder.folderPositionId);
                            }}
                          >
                            {t('Delete My Copy')}
                          </a>
                        </div>
                      </div>
                    ) : (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteButtonClick(folder.folderPositionId);
                        }}
                        style={{
                          fontSize: "13px",
                          color: "#d32f2f",
                          textDecoration: "none",
                        }}
                      >
                        {t('Delete')}
                      </a>
                    )}
                  </div>
                </div>
                
                <div 
                  style={{ 
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div 
                    style={{ 
                      display: "flex", 
                      overflowX: "auto",
                      gap: 12,
                      paddingBottom: 8,
                      msOverflowStyle: "none", 
                      scrollbarWidth: "thin",
                      WebkitOverflowScrolling: "touch",
                      maxWidth: "100%",
                      flexDirection: isRTL ? "row-reverse" : "row"
                    }}
                  >
                    {folder.files.map((file, i) => (
                      <LazyImage
                        key={i}
                        thumbnailDataKey={file.thumbnailDataKey}
                        dataKey={file.dataKey}
                        src={`${S3_BUCKET_URL}${file.thumbnailDataKey || file.dataKey}`}
                        alt={t('Thumbnail')}
                        style={{
                          width: 160,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 6,
                          border: "1px solid #ddd",
                          flexShrink: 0,
                        }}
                      />
                    ))}
                  </div>
                  
                  {folder.files.length > 3 && (
                    <div 
                      style={{
                        position: "absolute",
                        [isRTL ? "left" : "right"]: 0,
                        top: 0,
                        bottom: 8,
                        width: 30,
                        background: isRTL 
                          ? "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))"
                          : "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </div>
                
                {/* Password Policy Indicator - moved here under the pictures */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: isRTL ? "flex-start" : "flex-end",
                    marginTop: 8,
                    marginBottom: 8
                  }}
                >
                  {passwordPolicy !== "NoPassword" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "10px",
                        color: "#555",
                        fontStyle: "italic"
                      }}
                    >
                      <span>{getPasswordPolicyText(passwordPolicy)}</span>
                    </div>
                  )}
                </div>
                
                {/* Album description section - updated to use folderDescription if available */}
                <div
                  style={{
                    marginTop: 8,
                    marginBottom: 16,
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 1.5,
                    textAlign: isRTL ? "right" : "left" as const
                  }}
                >
                  {folder.folderDescription && folder.folderDescription.length > 1 
                    ? folder.folderDescription 
                    : ""}
                </div>
                
                {/* Pass the folder to the FooterSection with additional props */}
                <FooterSection
                  folder={folder}
                  openFilePicker={openFilePicker}
                  cognitoUsername={cognitoUsername}
                  updateProfileIds={(profileIds) => updateFolderProfileIds(folder.folderId, profileIds)}
                />

                {/* Display contacts list if available */}
                {contactNames.length > 0 && (
                  <div style={{
                    width: '100%',
                    backgroundColor: '#f0f7ff',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginTop: '16px',
                    boxSizing: 'border-box',
                    border: '1px solid #d0e1f9',
                    direction: isRTL ? "rtl" : "ltr"
                  }}>
                    <p style={{
                      margin: '0',
                      fontSize: '14px',
                      color: '#333',
                      textAlign: isRTL ? "right" : "left" as const
                    }}>
                      {t('Shared with')}: {contactNames.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
};