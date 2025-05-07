import React, { useState, useEffect } from "react";
import { FolderType } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/react";
import { getLanguageDirection } from "@/lib/i18n";

// ContactsFilter Component with multi-select filtering
type ContactsFilterProps = {
  folders: FolderType[];
  onFilterChange: (filteredFolders: FolderType[]) => void;
  resetFilter: () => void;
};

export const ContactsFilter: React.FC<ContactsFilterProps> = ({
  folders,
  onFilterChange,
  resetFilter,
}) => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // State to track all unique contacts across albums
  const [allContacts, setAllContacts] = useState<string[]>([]);
  
  // State to track the currently selected contacts (now an array instead of a single string)
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  
  // State to track all contacts from the currently visible albums
  const [visibleContacts, setVisibleContacts] = useState<string[]>([]);
  
  // Extract all unique contacts from folders and sort by most recent appearance
  useEffect(() => {
    // Create a map to track the most recent timestamp for each contact
    const contactsMap = new Map<string, { name: string; timestamp: number }>();
    
    folders.forEach(folder => {
      if (folder.contacts) {
        // Get the folder's timestamp (use updatedAt if available, otherwise createdAt)
        const folderTimestamp = folder.updatedAt 
          ? new Date(folder.updatedAt).getTime() 
          : folder.createdAt 
            ? new Date(folder.createdAt).getTime()
            : 0;
        
        Object.values(folder.contacts).forEach(contact => {
          if (typeof contact === 'string' && !contact.toString().startsWith('Profile-')) {
            // If this contact isn't in the map yet, or this appearance is more recent
            const existingEntry = contactsMap.get(contact);
            if (!existingEntry || folderTimestamp > existingEntry.timestamp) {
              contactsMap.set(contact, { 
                name: contact, 
                timestamp: folderTimestamp 
              });
            }
          }
        });
      }
    });
    
    // Convert Map to array and sort by timestamp (most recent first)
    const contactsArray = Array.from(contactsMap.values())
      .sort((a, b) => b.timestamp - a.timestamp)
      .map(entry => entry.name);
    
    setAllContacts(contactsArray);
    setVisibleContacts(contactsArray);
  }, [folders]);
  
  // Filter folders when contact selection changes
  const handleContactClick = (contact: string) => {
    let newSelectedContacts: string[];
    
    if (selectedContacts.includes(contact)) {
      // If clicking an already selected contact, remove it from selection
      newSelectedContacts = selectedContacts.filter(c => c !== contact);
    } else {
      // Otherwise add it to the selection
      newSelectedContacts = [...selectedContacts, contact];
    }
    
    // Update the selected contacts state
    setSelectedContacts(newSelectedContacts);
    
    if (newSelectedContacts.length === 0) {
      // If no contacts selected, reset the filter
      resetFilter();
      setVisibleContacts(allContacts); // Reset to show all contacts
    } else {
      // Filter folders to only those containing ALL selected contacts
      const newFilteredFolders = folders.filter(folder => {
        if (!folder.contacts) return false;
        
        // Get all contact names in this folder
        const folderContactNames = Object.values(folder.contacts)
          .filter(c => typeof c === 'string' && !c.toString().startsWith('Profile-'));
        
        // Check if ALL selected contacts exist in this folder's contacts
        return newSelectedContacts.every(selectedContact => 
          folderContactNames.includes(selectedContact)
        );
      });
      
      // Update visible contacts based on the filtered folders
      updateVisibleContacts(newFilteredFolders);
      
      onFilterChange(newFilteredFolders);
    }
  };
  
  // Helper function to update visible contacts based on filtered folders
  const updateVisibleContacts = (filteredFolders: FolderType[]) => {
    // Extract all unique contacts from the filtered folders
    const contactsSet = new Set<string>();
    
    filteredFolders.forEach(folder => {
      if (folder.contacts) {
        Object.values(folder.contacts).forEach(contact => {
          if (typeof contact === 'string' && !contact.toString().startsWith('Profile-')) {
            contactsSet.add(contact);
          }
        });
      }
    });
    
    // Make sure all selected contacts remain visible
    selectedContacts.forEach(contact => {
      contactsSet.add(contact);
    });
    
    // Filter and sort the contacts based on the original all contacts order
    // to maintain the same sorting (most recent first)
    const newVisibleContacts = allContacts.filter(contact => 
      contactsSet.has(contact)
    );
    
    setVisibleContacts(newVisibleContacts);
  };
  
  // If no contacts found, don't render the component
  if (allContacts.length === 0) {
    return null;
  }
  
  return (
    <div
      style={{
        width: "100%",
        marginBottom: 24,
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      {/* Scrollable container that includes both the label and buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: isRTL ? "row-reverse" : "row",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 8,
          WebkitOverflowScrolling: "touch",
          flexWrap: "nowrap", // Prevent wrapping to new lines
        }}
      >
        {/* Filter label - now inside the scrollable area */}
        <div
          style={{
            fontSize: 14,
            color: "#555",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            height: "40px",
            flexShrink: 0,
            padding: isRTL ? "0 0 0 4px" : "0 4px 0 0",
          }}
        >
          {t('Filter Albums')}:
        </div>
        
        {/* Contact buttons - now allowing multi-selection */}
        {visibleContacts.map(contact => (
          <button
            key={contact}
            onClick={() => handleContactClick(contact)}
            style={{
              padding: "6px 12px",
              borderRadius: 16,
              fontSize: 13,
              cursor: "pointer",
              border: "1px solid #ddd",
              backgroundColor: selectedContacts.includes(contact) ? "#2196f3" : "#fff",
              color: selectedContacts.includes(contact) ? "#fff" : "#333",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              flexShrink: 0, // Prevent buttons from shrinking
              height: "40px", // Consistent height
            }}
          >
            {contact}
          </button>
        ))}
      </div>
      
      {/* Show selection summary if multiple contacts are selected */}
      {selectedContacts.length > 1 && (
        <div
          style={{
            marginTop: 8,
            fontSize: 13,
            color: "#555",
            fontStyle: "italic",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t('Showing albums with all')} {selectedContacts.length} {t('selected contacts')}
        </div>
      )}
      
      {/* Hide scrollbar for WebKit browsers */}
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};