import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/hooks";

import { 
  ThumbnailWrapper,
  PlayButton,
  DurationBadge,
  LoadingOverlay,
  WatermarkOverlay,
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
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  
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
    if (loadFullVideo && videoRef.current && !isVideoLoaded) {
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
  }, [loadFullVideo, isVideoLoaded]);
  
  if (isPlaying) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <video ref={videoRef} controls style={{ width: '100%', height: '100%' }}>
          <source src={videoUrl} type="video/mp4" />
          {t('Your browser does not support the video tag.')}
        </video>
        {showWatermark && (
          <WatermarkOverlay>
            <WatermarkText>6180 Watermarked</WatermarkText>
          </WatermarkOverlay>
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
        <LoadingOverlay>
          {t('Loading video...')}
        </LoadingOverlay>
        <video 
          ref={videoRef} 
          style={{ display: 'none' }} 
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
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
      <DurationBadge>{duration}</DurationBadge>
    </ThumbnailWrapper>
  );
};