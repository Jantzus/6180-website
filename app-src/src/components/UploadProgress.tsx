import React from "react";
import { ProgressTracker } from "@/lib/types";
import { useTranslation } from "@/lib/i18n/hooks";

type UploadProgressProps = {
  progressTracker: ProgressTracker;
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
  // Allow parent to explicitly control visibility
  isUploading?: boolean;
  isProcessingFiles?: boolean;
  // NEW: Context for better messaging
  context?: 'uploading' | 'saving' | 'processing';
};

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  progressTracker, 
  isRTL = false,
  onCancel,
  style,
  className,
  variant = 'default',
  showDetailsLabels = true,
  showSuccessMessage = false,
  showErrorMessage = false,
  customMessages = {},
  isUploading = false,
  isProcessingFiles = false,
  context = 'uploading'
}) => {
  const { t } = useTranslation();
  
  const { 
    totalFiles, 
    filesComplete, 
    filesWithError, 
    filesUploading,
    filesProcessing,
    overallProgress 
  } = progressTracker;
  
  // Calculate if all files are complete
  const allFilesComplete = totalFiles > 0 && filesComplete === totalFiles && filesWithError === 0;
  
  // Enhanced visibility logic: Only show when actively processing or when there are incomplete files
  const hasIncompleteFiles = filesUploading > 0 || filesProcessing > 0 || (totalFiles > 0 && !allFilesComplete);
  const isActivelyProcessing = isUploading || isProcessingFiles;
  
  // Show if actively processing OR if there are incomplete files
  // Hide if all files are complete and we're not actively processing
  const shouldShow = isActivelyProcessing || hasIncompleteFiles;
  
  // Don't render anything if we shouldn't show the progress
  if (!shouldShow) {
    return null;
  }
  
  // Determine the progress status text and color
  const getStatusColor = () => {
    if (filesWithError > 0) return "#ff9800"; // Warning color
    if (allFilesComplete) return "#2e7d32"; // Darker green for completion
    return "#4caf50"; // Default green for in progress
  };

  // Improved status text based on context
  const getStatusText = () => {
    // Check if all files are complete first
    if (allFilesComplete) {
      return context === 'saving' ? t('Album Ready') : t('Completed');
    }
    if (filesProcessing > 0 || isProcessingFiles) {
      return context === 'saving' ? t('Preparing Album') : t('Processing');
    }
    if (filesUploading > 0) {
      return t('Uploading');
    }
    if (isUploading && totalFiles === 0) {
      return t('Preparing');
    }
    return context === 'saving' ? t('Preparing Album') : t('Uploading');
  };

  // Improved header text based on context
  const getHeaderText = () => {
    switch (context) {
      case 'saving':
        return allFilesComplete ? t('Album preparation complete') : t('Album preparation');
      case 'processing':
        return allFilesComplete ? t('Processing complete') : t('File processing');
      case 'uploading':
      default:
        return allFilesComplete ? t('Upload complete') : t('Upload in progress');
    }
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
  
  // Handle the case where we're initializing (files selected but not yet processed)
  // If all files are complete, don't show low progress percentages
  const displayProgress = allFilesComplete ? 100 : (totalFiles > 0 ? overallProgress : 0);
  const displayTotal = totalFiles > 0 ? totalFiles : (isUploading ? '...' : 0);
  const displayComplete = totalFiles > 0 ? filesComplete : 0;
  
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
            <strong>{getStatusText()}</strong>: {Math.round(displayProgress)}%
          </span>
          {onCancel && !allFilesComplete && (
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
              aria-label={t('Cancel')}
              title={t('Cancel')}
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
              width: `${displayProgress}%`, 
              height: "100%", 
              backgroundColor: getStatusColor(),
              transition: "width 0.3s ease-in-out",
            }}
          />
          
          {/* Show loading animation when preparing */}
          {(isProcessingFiles || (isUploading && totalFiles === 0)) && displayProgress === 0 && (
            <div 
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.3), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
                pointerEvents: "none",
              }}
            />
          )}
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
            {getHeaderText()}
          </h3>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            marginBottom: 6 
          }}>
            <span style={{ fontSize: 14, color: "#555" }}>
              {t('Album Progress')}: {Math.round(displayProgress)}%
            </span>
            <span style={{ fontSize: 14, color: "#555" }}>
              {t('Complete')}: {displayComplete} / {displayTotal} 
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
              width: `${displayProgress}%`, 
              height: "100%", 
              backgroundColor: getStatusColor(),
              transition: "width 0.3s ease-in-out",
            }}
          />
          
          {/* Show loading animation when preparing */}
          {(isProcessingFiles || (isUploading && totalFiles === 0)) && displayProgress === 0 && (
            <div 
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(90deg, transparent, rgba(76, 175, 80, 0.3), transparent)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
                pointerEvents: "none",
              }}
            />
          )}
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
          {(filesProcessing > 0 || isProcessingFiles) && (
            <div>
              {showDetailsLabels ? `${t('Processing')}: ` : ""}{filesProcessing || '...'}
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
          
          {onCancel && !allFilesComplete && (
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
  
  // Default variant (the original implementation with improved context)
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
          <strong>{getStatusText()}</strong>: {displayComplete}/{displayTotal}

          {filesWithError > 0 && ` (${t('{{count}} failed', { count: filesWithError.toString() })})`}
          {filesUploading > 0 && ` (${t('{{count}} in progress', { count: filesUploading.toString() })})`}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: 14, color: "#555", fontWeight: "bold" }}>
            {Math.round(displayProgress)}%
          </span>
          {onCancel && !allFilesComplete && (
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
              aria-label={t('Cancel')}
              title={t('Cancel')}
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
            width: `${displayProgress}%`, 
            height: "100%", 
            backgroundColor: getStatusColor(),
            transition: "width 0.3s ease-in-out",
          }}
        />
        
        {/* Loading animation for processing state */}
        {(isProcessingFiles || (isUploading && totalFiles === 0) || filesProcessing > 0) && displayProgress < 100 && (
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
          {customMessages.success || 
            (context === 'saving' 
              ? t('Album ready to save!') 
              : t('Upload complete! Preparing to save your album...')
            )
          }
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