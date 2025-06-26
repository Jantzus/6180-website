import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import { 
  LoadingPlaceholder,
  Overlay,
} from "@/styles/components/layout";
import { 
  LazyImageContainer, 
  Image, 
  WatermarkText
} from "@/styles/components/media";
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
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // First load the thumbnail if available
  useEffect(() => {
    if (thumbnailSrc && isClient) {
      const img = new globalThis.Image();
      img.src = thumbnailSrc;
      img.onload = () => {
        setImageSrc(thumbnailSrc);
        setIsLoaded(true);
      };
    }
  }, [thumbnailSrc, isClient]);
  
  // Load the full resolution image when requested
  useEffect(() => {
    if (loadFullResolution && !fullResLoaded && isClient) {
      setIsLoadingFullRes(true);
      
      const img = new globalThis.Image();
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
  }, [loadFullResolution, src, fullResLoaded, onFullResolutionLoaded, isClient]);

  // MEMOIZED: Prevent right-click context menu
  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  }, []);

  // MEMOIZED: Prevent dragging
  const handleDragStart = useCallback((e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    return false;
  }, []);
  
  return (
    <LazyImageContainer onClick={onClick}>
      <Image 
        src={imageSrc} 
        alt={alt} 
        className={className}
        $isLoaded={isLoaded}
        $objectFit="cover"
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        draggable={false}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      />
      {!isLoaded && <LoadingPlaceholder />}
      {isLoadingFullRes && (
        <Overlay $type="loading">
          {t('Loading full resolution...')}
        </Overlay>
      )}
      {showWatermark && isLoaded && (
        <Overlay $type="watermark">
          <WatermarkText>6180 Watermarked</WatermarkText>
        </Overlay>
      )}
    </LazyImageContainer>
  );
};