import React from "react";

// FileInput Component
type FileInputProps = {
  onFileSelection: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ onFileSelection }, ref) => {
    return (
      <input 
        type="file" 
        id="file-input" 
        ref={ref}
        accept="image/*,video/*" 
        multiple 
        style={{ display: "none" }}
        onChange={onFileSelection}
      />
    );
  }
);