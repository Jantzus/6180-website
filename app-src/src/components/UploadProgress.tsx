import React from "react";
import { ProgressTracker } from "@/lib/types";

type UploadProgressProps = {
  progressTracker: ProgressTracker;
  t: (key: string) => string;
  isRTL?: boolean;
  onCancel?: () => void;
  style?: React.CSSProperties;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showDetailsLabels?: boolean;
  showSuccessMessage?: boolean;
  showErrorMessage?: boolean;
  customMessages?: {
    success?: string;
    error?: string;
  };
};

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  progressTracker, 
  t,
  isRTL = false,
  onCancel,
  style,
  className,
  variant = 'default',
  showDetailsLabels = true,
  showSuccessMessage = false,
  showErrorMessage = false,
  customMessages = {}
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
    if (overallProgress === 100) return t('Completed');
    if (filesProcessing > 0) return t('Processing');
    return t('Uploading');
  };

  // Determine if we should show success/error messages
  const shouldShowSuccessMessage = showSuccessMessage && 
    progressTracker.filesComplete > 0 && 
    progressTracker.filesComplete === progressTracker.totalFiles;
  
  const shouldShowErrorMessage = showErrorMessage && progressTracker.filesWithError > 0;
  
  // Common styles that apply to all variants
  const containerStyle: React.CSSProperties = { 
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    width: "100%",
    boxSizing: "border-box",
    direction: isRTL ? "rtl" : "ltr",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.3s ease-in-out",
    ...style
  };
  
  // Render compact variant
  if (variant === 'compact') {
    return (
      <div className={className} style={containerStyle}>
        <div 
          style={{ 
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "#555" }}>
            <strong>{getStatusText()}</strong>: {Math.round(overallProgress)}%
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
              aria-label={t('Cancel Upload')}
              title={t('Cancel Upload')}
            >
              {t('Cancel')}
            </button>
          )}
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
        </div>
      </div>
    );
  }
  
  // Render detailed variant
  if (variant === 'detailed') {
    return (
      <div className={className} style={containerStyle}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: 16, 
            fontWeight: "bold", 
            color: "#333",
            marginBottom: 8
          }}>
            {t('Upload progress')}
          </h3>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            marginBottom: 6 
          }}>
            <span style={{ fontSize: 14, color: "#555" }}>
              {t('Overall progress')}: {Math.round(overallProgress)}%
            </span>
            <span style={{ fontSize: 14, color: "#555" }}>
              {t('Complete')}: {filesComplete} / {totalFiles} 
            </span>
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
            marginBottom: 16
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
        </div>
        
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: 12,
          fontSize: 14,
          color: "#555"
        }}>
          {filesUploading > 0 && (
            <div>
              {showDetailsLabels ? `${t('Uploading')}: ` : ""}{filesUploading}
            </div>
          )}
          {filesProcessing > 0 && (
            <div>
              {showDetailsLabels ? `${t('Processing')}: ` : ""}{filesProcessing}
            </div>
          )}
          {filesComplete > 0 && (
            <div>
              {showDetailsLabels ? `${t('Complete')}: ` : ""}{filesComplete}
            </div>
          )}
          {filesWithError > 0 && (
            <div style={{ color: "#d32f2f" }}>
              {showDetailsLabels ? `${t('Failed')}: ` : ""}{filesWithError}
            </div>
          )}
          
          {onCancel && overallProgress < 100 && (
            <button
              onClick={onCancel}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#d32f2f",
                fontSize: 13,
                padding: "4px 8px",
                borderRadius: 4,
              }}
            >
              {t('Cancel')}
            </button>
          )}
        </div>
      </div>
    );
  }
  
  // Default variant (the original implementation)
  return (
    <div 
      className={className}
      style={containerStyle}
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
          <strong>{getStatusText()}</strong>: {filesComplete}/{totalFiles}

          {filesWithError > 0 && t('({count} failed').replace('{count}', filesWithError.toString())}
          {filesUploading > 0 && t('({count} in progress').replace('{count}', filesUploading.toString())}
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
              aria-label={t('Cancel Upload')}
              title={t('Cancel Upload')}
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
      
      {/* Optional success message */}
      {shouldShowSuccessMessage && (
        <div style={{
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          padding: '10px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          marginTop: '10px',
          textAlign: 'center'
        }}>
          {customMessages.success || t('Upload complete! Preparing to save your album...')}
        </div>
      )}
      
      {/* Optional error message */}
      {shouldShowErrorMessage && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '10px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          marginTop: '10px',
          textAlign: 'center'
        }}>
          {customMessages.error || t('Some files could not be uploaded. You can continue with the successfully uploaded files.')}
        </div>
      )}
      
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