import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import { 
  LazyImageContainer, 
  StyledImage, 
  LoadingPlaceholder,
  LoadingOverlay,
  WatermarkOverlay,
  WatermarkText
} from "@/styles/photos-styled-components";
import { PhotoPageLazyImageProps } from "@/lib/types";

// LazyImage component with watermark support
export const PhotoPageLazyImage: React.FC<PhotoPageLazyImageProps> = ({ 
  src, 
  thumbnailSrc, 
  alt, 
  className = '', 
  loadFullResolution = false,
  onFullResolutionLoaded,
  onClick,
  showWatermark = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullResLoaded, setFullResLoaded] = useState(false);
  const [isLoadingFullRes, setIsLoadingFullRes] = useState(false);
  const [imageSrc, setImageSrc] = useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E");
  const { t } = useTranslation();
  
  // First load the thumbnail if available
  useEffect(() => {
    if (thumbnailSrc) {
      const img = new Image();
      img.src = thumbnailSrc;
      img.onload = () => {
        setImageSrc(thumbnailSrc);
        setIsLoaded(true);
      };
    }
  }, [thumbnailSrc]);
  
  // Load the full resolution image when requested
  useEffect(() => {
    if (loadFullResolution && !fullResLoaded) {
      setIsLoadingFullRes(true);
      
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setFullResLoaded(true);
        setIsLoadingFullRes(false);
        if (onFullResolutionLoaded) {
          onFullResolutionLoaded();
        }
      };
    }
  }, [loadFullResolution, src, fullResLoaded, onFullResolutionLoaded]);
  
  return (
    <LazyImageContainer onClick={onClick}>
      <StyledImage 
        src={imageSrc} 
        alt={alt} 
        className={className}
        isLoaded={isLoaded}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
      {!isLoaded && <LoadingPlaceholder />}
      {isLoadingFullRes && (
        <LoadingOverlay>
          {t('Loading full resolution...')}
        </LoadingOverlay>
      )}
      {showWatermark && isLoaded && (
        <WatermarkOverlay>
          <WatermarkText>6180 Watermarked</WatermarkText>
        </WatermarkOverlay>
      )}
    </LazyImageContainer>
  );
};
