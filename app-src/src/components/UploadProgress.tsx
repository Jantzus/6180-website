import React from "react";
import type { TranslationKey } from "@/lib/i18n/translations";

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
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  style?: React.CSSProperties;
};

export const UploadProgress: React.FC<UploadProgressProps> = ({ 
  progressTracker,
  t,
  isRTL,
  style
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
      direction: isRTL ? "rtl" : "ltr",
      boxSizing: "border-box",
      overflow: "hidden",
      ...style
    }}>
      <h3 style={{ fontSize: "18px", margin: "0 0 12px 0" }}>{t('Upload Progress')}</h3>
      
      <div style={{ marginBottom: "12px" }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          fontSize: "14px", 
          marginBottom: "6px" 
        }}>
          <span>{t('Overall Progress')}: {Math.round(progressTracker.overallProgress * 100)}%</span>
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
        flexDirection: isRTL ? "row-reverse" : "row",
        flexWrap: "wrap",
        overflow: "hidden"
      }}>
        {progressTracker.filesUploading > 0 && (
          <div>📤 {t('Uploading')}: {progressTracker.filesUploading}</div>
        )}
        {progressTracker.filesProcessing > 0 && (
          <div>⚙️ {t('Processing')}: {progressTracker.filesProcessing}</div>
        )}
        {progressTracker.filesComplete > 0 && (
          <div>✅ {t('Complete')}: {progressTracker.filesComplete}</div>
        )}
        {progressTracker.filesWithError > 0 && (
          <div style={{ color: "#e53935" }}>❌ {t('Failed')}: {progressTracker.filesWithError}</div>
        )}
      </div>
    </div>
  );
};