import React from "react";
import type { TranslationKey } from "@/lib/i18n/terms";

type DebugLogProps = {
  debugMessages: string[];
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  isRTL: boolean;
  textDirection: string;
};

export const DebugLog: React.FC<DebugLogProps> = ({ 
  debugMessages,
  t,
  isRTL,
  textDirection
}) => {
  if (debugMessages.length === 0) return null;
  
  return (
    <div style={{ 
      marginTop: "40px", 
      background: "#fff3cd", 
      padding: "16px", 
      borderRadius: "8px", 
      border: "1px solid #ffeeba", 
      maxWidth: 900, 
      margin: "0 auto",
      direction: textDirection as "ltr" | "rtl"
    }}>
      <h3 style={{ 
        marginTop: 0, 
        fontSize: "18px", 
        color: "#856404",
        textAlign: isRTL ? "right" : "left"
      }}>
        {t('Debug Log')}
      </h3>
      <pre style={{ 
        fontSize: "14px", 
        color: "#856404", 
        whiteSpace: "pre-wrap", 
        maxHeight: "400px", 
        overflow: "auto",
        textAlign: isRTL ? "right" : "left"
      }}>
        {debugMessages.map((msg, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>{msg}</div>
        ))}
      </pre>
    </div>
  );
};