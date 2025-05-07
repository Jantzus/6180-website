import React from "react";

// Search Bar Component
type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
};

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  t, 
  isRTL 
}) => {
  return (
    <div 
      style={{
        width: "100%", 
        marginBottom: 24,
        boxSizing: "border-box", // Include padding in width calculation
        direction: isRTL ? "rtl" : "ltr"
      }}
    >
      <input
        type="text"
        placeholder={t('Search album title or description')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 16px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          outline: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          boxSizing: "border-box", // Include padding in width calculation
        }}
      />
    </div>
  );
};