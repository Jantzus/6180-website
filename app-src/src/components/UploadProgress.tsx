import React from "react";
import { ProgressTracker } from "@/lib/types";

type UploadProgressProps = {
  progressTracker: ProgressTracker;
  t: (key: string) => string;
  isRTL: boolean;
  onCancel?: () => void; // Optional cancel handler
  style?: React.CSSProperties; // Support for custom styling
  className?: string; // Support for custom class names
};

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  progressTracker, 
  t,
  isRTL,
  onCancel,
  style,
  className
}) => {
  const { 
    totalFiles, 
    filesComplete, 
    filesWithError, 
    filesUploading,
    filesProcessing,
    overallProgress 
  } = progressTracker;
  
  // Don't render anything if no uploads are in progress
  if (totalFiles === 0) {
    return null;
  }
  
  // Determine the progress status text and color
  const getStatusColor = () => {
    if (filesWithError > 0) return "#ff9800"; // Warning color
    if (overallProgress === 100) return "#2e7d32"; // Darker green for completion
    return "#4caf50"; // Default green for in progress
  };

  const getStatusText = () => {
    if (overallProgress === 100) return t('Complete');
    if (filesProcessing > 0) return t('Processing');
    return t('Uploading');
  };
  
  return (
    <div 
      className={className}
      style={{ 
        marginBottom: 24,
        padding: 16,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        width: "100%",
        boxSizing: "border-box",
        direction: isRTL ? "rtl" : "ltr",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        animation: "fadeIn 0.3s ease-in-out",
        ...style // Merge custom styles
      }}
    >
      <div 
        style={{ 
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 14, color: "#555" }}>
          <strong>{getStatusText()}</strong>: {filesComplete}/{totalFiles} {t('files')}
          {filesWithError > 0 && ` (${filesWithError} ${t('failed')})`}
          {filesUploading > 0 && ` (${filesUploading} ${t('in progress')})`}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: 14, color: "#555", fontWeight: "bold" }}>
            {Math.round(overallProgress)}%
          </span>
          {onCancel && overallProgress < 100 && (
            <button
              onClick={onCancel}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#d32f2f",
                fontSize: 13,
                padding: "4px 8px",
                borderRadius: 4,
              }}
              aria-label={t('Cancel upload')}
              title={t('Cancel upload')}
            >
              {t('Cancel')}
            </button>
          )}
        </div>
      </div>
      
      <div 
        style={{ 
          width: "100%", 
          height: 8, 
          backgroundColor: "#e0e0e0", 
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div 
          style={{ 
            width: `${overallProgress}%`, 
            height: "100%", 
            backgroundColor: getStatusColor(),
            transition: "width 0.3s ease-in-out",
          }}
        />
        
        {/* Optional loading animation for processing state */}
        {filesProcessing > 0 && overallProgress < 100 && (
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
      
      {/* Add global styles for animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}
      </style>
    </div>
  );
};