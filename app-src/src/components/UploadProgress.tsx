type ProgressTrackerType = {
  totalFiles: number;
  filesComplete: number;
  filesUploading: number;
  filesProcessing: number;
  filesWithError: number;
  overallProgress: number;
};

type UploadProgressProps = {
  progressTracker: ProgressTrackerType;
  t: (key: string) => string;
  isRTL: boolean;
};

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  progressTracker,
  t,
  isRTL
}) => {
  if (progressTracker.totalFiles === 0) return null;
  
  return (
    <div style={{ 
      marginBottom: "24px", 
      backgroundColor: "#fff", 
      padding: "16px", 
      borderRadius: "8px", 
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)", 
      width: "100%",
      direction: isRTL ? "rtl" : "ltr"
    }}>
      <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>{t('uploadProgress')}</h3>
      
      <div style={{ marginBottom: "12px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          fontSize: "14px", 
          marginBottom: "6px" 
        }}>
          <span>{t('overallProgress')}: {Math.round(progressTracker.overallProgress * 100)}%</span>
          <span>{progressTracker.filesComplete} {t('of')} {progressTracker.totalFiles} {t('complete')}</span>
        </div>
        <div style={{ 
          height: "8px", 
          backgroundColor: "#e0e0e0", 
          borderRadius: "4px", 
          overflow: "hidden" 
        }}>
          <div 
            style={{ 
              height: "100%", 
              width: `${progressTracker.overallProgress * 100}%`, 
              backgroundColor: "#4caf50",
              borderRadius: "4px",
              transition: "width 0.3s ease",
              float: isRTL ? "right" : "left"
            }}
          />
        </div>
      </div>
      
      <div style={{ 
        display: "flex", 
        gap: "12px", 
        fontSize: "14px", 
        color: "#666",
        flexDirection: isRTL ? "row-reverse" : "row"
      }}>
        {progressTracker.filesUploading > 0 && (
          <div>📤 {t('uploading')}: {progressTracker.filesUploading}</div>
        )}
        {progressTracker.filesProcessing > 0 && (
          <div>⚙️ {t('processing')}: {progressTracker.filesProcessing}</div>
        )}
        {progressTracker.filesComplete > 0 && (
          <div>✅ {t('complete')}: {progressTracker.filesComplete}</div>
        )}
        {progressTracker.filesWithError > 0 && (
          <div style={{ color: "#e53935" }}>❌ {t('failed')}: {progressTracker.filesWithError}</div>
        )}
      </div>
    </div>
  );
};