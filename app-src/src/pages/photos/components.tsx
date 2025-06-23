import React from "react";
import { 
  SelectionBanner,
} from "@/styles/styled-components";

// Selection Banner Component
export const SelectionModeBanner: React.FC<{
  isSelectionMode: boolean;
  t: (key: string) => string;
}> = ({ isSelectionMode, t }) => {
  if (!isSelectionMode) return null;
  
  return (
    <SelectionBanner>
      <p>{t('Select photos and videos to share')}</p>
    </SelectionBanner>
  );
};