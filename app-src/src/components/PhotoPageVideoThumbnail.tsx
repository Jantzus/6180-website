import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/hooks";

import { 
  ThumbnailWrapper,
  PlayButton,
  Badge,
  Overlay,
  WatermarkText
} from "@/styles/styled-components";

import { PhotoPageLazyImage } from "@/components/PhotoPageLazyImage"

export interface PhotoPageVideoThumbnailProps {
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  index: number;
  onFullResolutionLoaded?: () => void;
  onClick?: () => void;
  showWatermark?: boolean;
}

// VideoThumbnail component with watermark support
export const PhotoPageVideoThumbnail: React.FC<PhotoPageVideoThumbnailProps> = ({ 
  thumbnailUrl, 
  videoUrl, 
  duration, 
  index,
  onFullResolutionLoaded,
  onClick,
  showWatermark = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadFullVideo, setLoadFullVideo] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    
    if (!isVideoLoaded) {
      setLoadFullVideo(true);
    } else {
      setIsPlaying(true);
    }
  };
  
  // When full video is loaded, mark as ready to play
  const handleFullVideoLoaded = () => {
    setIsVideoLoaded(true);
    setIsPlaying(true);
    if (onFullResolutionLoaded) {
      onFullResolutionLoaded();
    }
  };
  
  // Load video when the video element is available
  useEffect(() => {
    if (loadFullVideo && videoRef.current && !isVideoLoaded && isClient) {
      const video = videoRef.current;
      
      // Set up event listeners for video loading
      const handleCanPlayThrough = () => {
        handleFullVideoLoaded();
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
      
      video.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // Start loading the video
      video.load();
      
      return () => {
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }
  }, [loadFullVideo, isVideoLoaded, isClient]);

  // MEMOIZED: Prevent right-click context menu
  const handleContextMenu = useCallback((e: React.MouseEvent<HTMLVideoElement>) => {
    e.preventDefault();
    return false;
  }, []);

  // MEMOIZED: Prevent dragging
  const handleDragStart = useCallback((e: React.DragEvent<HTMLVideoElement>) => {
    e.preventDefault();
    return false;
  }, []);
  
  if (isPlaying && isClient) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <video 
          ref={videoRef} 
          controls 
          style={{ 
            width: '100%', 
            height: '100%',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          draggable={false}
        >
          <source src={videoUrl} type="video/mp4" />
          {t('Your browser does not support the video tag.')}
        </video>
        {showWatermark && (
          <Overlay $type="watermark">
            <WatermarkText>6180 Watermarked</WatermarkText>
          </Overlay>
        )}
      </div>
    );
  }
  
  if (loadFullVideo && !isVideoLoaded) {
    return (
      <ThumbnailWrapper>
        <PhotoPageLazyImage 
          src={videoUrl}
          thumbnailSrc={thumbnailUrl} 
          alt={`Video thumbnail ${index + 1}`}
          showWatermark={showWatermark}
        />
        <Overlay $type="loading">
          {t('Loading video...')}
        </Overlay>
        {isClient && (
          <video 
            ref={videoRef} 
            style={{ 
              display: 'none',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              WebkitTouchCallout: 'none'
            }} 
            preload="auto"
            onContextMenu={handleContextMenu}
            onDragStart={handleDragStart}
            draggable={false}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </ThumbnailWrapper>
    );
  }
  
  return (
    <ThumbnailWrapper onClick={handleClick}>
      <PhotoPageLazyImage 
        src={videoUrl}
        thumbnailSrc={thumbnailUrl} 
        alt={`Video thumbnail ${index + 1}`}
        showWatermark={showWatermark}
      />
      <PlayButton />
      <Badge $position="bottomLeft">{duration}</Badge>
    </ThumbnailWrapper>
  );
};