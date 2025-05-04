import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/react";
import { 
  LazyImageContainer, 
  StyledImage, 
  LoadingPlaceholder,
  ThumbnailWrapper,
  PlayButton,
  DurationBadge,
  LoadingOverlay,
  WatermarkOverlay,
  WatermarkText
} from "@/styles/photos-styled-components";
import { LazyImageProps, VideoThumbnailProps, FullscreenMediaViewerProps } from "@/lib/types";

// LazyImage component with watermark support
export const LazyImage: React.FC<LazyImageProps> = ({ 
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

// VideoThumbnail component with watermark support
export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ 
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
        <LazyImage 
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
      <LazyImage 
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

// FullscreenMediaViewer component
export const FullscreenMediaViewer: React.FC<FullscreenMediaViewerProps> = ({
  item,
  index,
  onClose,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
  albumName,
  showWatermark = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 2000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header with controls */}
      <div style={{
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}>
        <button 
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '16px',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
          onClick={onClose}
        >
          {t('Back')}
        </button>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              padding: '5px 10px',
              cursor: hasPrev ? 'pointer' : 'not-allowed',
              opacity: hasPrev ? 1 : 0.5
            }}
            onClick={hasPrev ? onPrev : undefined}
            disabled={!hasPrev}
          >
            ←
          </button>
          <button 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '16px',
              padding: '5px 10px',
              cursor: hasNext ? 'pointer' : 'not-allowed',
              opacity: hasNext ? 1 : 0.5
            }}
            onClick={hasNext ? onNext : undefined}
            disabled={!hasNext}
          >
            →
          </button>
        </div>
      </div>
      
      {/* Media container */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '10px',
        position: 'relative'
      }}>
        {item.type === 'image' ? (
          <div style={{ position: 'relative' }}>
            <img 
              src={item.url}
              alt={`Image ${index + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s'
              }}
              onLoad={() => {
                setIsLoaded(true);
                setIsLoading(false);
              }}
            />
            {showWatermark && (
              <WatermarkOverlay>
                <WatermarkText>6180 Watermarked</WatermarkText>
              </WatermarkOverlay>
            )}
            {/* Show thumbnail while loading */}
            {!isLoaded && item.thumbnailUrl && (
              <img 
                src={item.thumbnailUrl}
                alt={`Thumbnail ${index + 1}`}
                style={{
                  position: 'absolute',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  opacity: 0.5
                }}
              />
            )}
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <video controls autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }} onLoadedData={() => setIsLoading(false)}>
              <source src={item.url} type="video/mp4" />
              {t('Your browser does not support the video tag.')}
            </video>
            {showWatermark && (
              <WatermarkOverlay>
                <WatermarkText>6180 Watermarked</WatermarkText>
              </WatermarkOverlay>
            )}
          </div>
        )}
        
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            zIndex: 10
          }}>
            {item.type === 'image' ? t('Loading full resolution...') : t('Loading video...')}
          </div>
        )}
      </div>
      
      {/* Footer with options */}
      <div style={{
        padding: '15px',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white'
      }}>
        <a 
          href={item.url} 
          download={`${albumName}-${index + 1}.${item.type === 'image' ? 'jpg' : 'mp4'}`}
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#006adc',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '14px'
          }}
        >
          {item.type === 'image' ? t('Download Photo') : t('Download Video')}
        </a>
      </div>
    </div>
  );
};