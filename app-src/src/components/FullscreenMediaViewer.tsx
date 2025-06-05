import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import styled from "styled-components";
import { 
  Overlay,
  WatermarkText,
  FullscreenContainer,
  Button,
  NavButtonsContainer,
  OwnerProfileLink,
  LoadingIndicator,
} from "@/styles/styled-components";
import { MediaItem } from "@/lib/types";

const Header = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  position: relative;
`;

const Footer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  z-index: 10;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  &:hover {
    opacity: 0.8;
  }
`;

export const MediaContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 10px;
  position: relative;
  touch-action: none; /* Prevent default touch behaviors */
`;

const ZoomableWrapper = styled.div<{ $scale: number; $translateX: number; $translateY: number }>`
  transform: scale(${props => props.$scale}) translate(${props => props.$translateX}px, ${props => props.$translateY}px);
  transition: transform 0.1s ease-out;
  transform-origin: center center;
  will-change: transform;
`;

const MediaWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`;

const Image = styled.img<{ $isLoaded: boolean }>`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s ease;
  user-select: none;
  pointer-events: none;
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  opacity: 0.8;
  filter: blur(2px);
  user-select: none;
  pointer-events: none;
`;

const VideoElement = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
`;

const ZoomIndicator = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.3s ease;
  z-index: 5;
  pointer-events: none;
`;

export interface FullscreenMediaViewerProps {
  item: MediaItem;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  ownerName?: string;
  showWatermark?: boolean;
}

interface TouchState {
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  startDistance: number;
  startScale: number;
  startTranslateX: number;
  startTranslateY: number;
}

// FullscreenMediaViewer component
export const FullscreenMediaViewer: React.FC<FullscreenMediaViewerProps> = ({
  item,
  index,
  onClose,
  onPrev,
  onNext,
  hasNext,
  hasPrev,
  ownerName,
  showWatermark = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  
  // Zoom and pan state
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [showZoomIndicator, setShowZoomIndicator] = useState(false);
  
  // Touch handling state
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const touchStateRef = useRef<TouchState | null>(null);
  const lastTapTimeRef = useRef(0);
  const isGestureActiveRef = useRef(false);
  
  const minScale = 0.5;
  const maxScale = 4;
  const doubleTapDelay = 300;

  // Reset zoom when item changes
  useEffect(() => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
    setIsLoaded(false);
    setIsLoading(true);
  }, [item.url]);

  // Show zoom indicator temporarily
  const showZoomIndicatorTemp = useCallback(() => {
    setShowZoomIndicator(true);
    setTimeout(() => setShowZoomIndicator(false), 1500);
  }, []);

  // Constrain translation based on current scale
  const constrainTranslation = useCallback((x: number, y: number, currentScale: number) => {
    if (!mediaContainerRef.current) return { x, y };
    
    const container = mediaContainerRef.current.getBoundingClientRect();
    const maxTranslateX = Math.max(0, (container.width * (currentScale - 1)) / 2);
    const maxTranslateY = Math.max(0, (container.height * (currentScale - 1)) / 2);
    
    return {
      x: Math.max(-maxTranslateX, Math.min(maxTranslateX, x)),
      y: Math.max(-maxTranslateY, Math.min(maxTranslateY, y))
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev && scale <= 1) {
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext && scale <= 1) {
        onNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev, scale]);

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    
    const touches = e.touches;
    const now = Date.now();
    
    if (touches.length === 1) {
      const touch = touches[0];
      
      // Check for double tap
      if (now - lastTapTimeRef.current < doubleTapDelay) {
        // Double tap - toggle zoom
        if (scale > 1) {
          setScale(1);
          setTranslateX(0);
          setTranslateY(0);
        } else {
          setScale(2);
          setTranslateX(0);
          setTranslateY(0);
          showZoomIndicatorTemp();
        }
        lastTapTimeRef.current = 0;
        return;
      }
      
      lastTapTimeRef.current = now;
      
      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        lastX: touch.clientX,
        lastY: touch.clientY,
        startDistance: 0,
        startScale: scale,
        startTranslateX: translateX,
        startTranslateY: translateY
      };
    } else if (touches.length === 2) {
      // Pinch gesture
      const distance = getDistance(touches[0], touches[1]);
      const centerX = (touches[0].clientX + touches[1].clientX) / 2;
      const centerY = (touches[0].clientY + touches[1].clientY) / 2;
      
      touchStateRef.current = {
        startX: centerX,
        startY: centerY,
        lastX: centerX,
        lastY: centerY,
        startDistance: distance,
        startScale: scale,
        startTranslateX: translateX,
        startTranslateY: translateY
      };
      
      isGestureActiveRef.current = true;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (!touchStateRef.current) return;
    
    const touches = e.touches;
    
    if (touches.length === 1 && scale > 1) {
      // Single finger pan when zoomed
      const touch = touches[0];
      const deltaX = touch.clientX - touchStateRef.current.lastX;
      const deltaY = touch.clientY - touchStateRef.current.lastY;
      
      const newTranslateX = translateX + deltaX / scale;
      const newTranslateY = translateY + deltaY / scale;
      
      const constrained = constrainTranslation(newTranslateX, newTranslateY, scale);
      setTranslateX(constrained.x);
      setTranslateY(constrained.y);
      
      touchStateRef.current.lastX = touch.clientX;
      touchStateRef.current.lastY = touch.clientY;
      
      isGestureActiveRef.current = true;
    } else if (touches.length === 2) {
      // Pinch to zoom
      const distance = getDistance(touches[0], touches[1]);
      const scaleChange = distance / touchStateRef.current.startDistance;
      const newScale = Math.max(minScale, Math.min(maxScale, touchStateRef.current.startScale * scaleChange));
      
      setScale(newScale);
      
      // Adjust translation to keep zoom centered
      if (newScale <= 1) {
        setTranslateX(0);
        setTranslateY(0);
      } else {
        const constrained = constrainTranslation(
          touchStateRef.current.startTranslateX,
          touchStateRef.current.startTranslateY,
          newScale
        );
        setTranslateX(constrained.x);
        setTranslateY(constrained.y);
      }
      
      if (newScale > 1.1) {
        showZoomIndicatorTemp();
      }
      
      isGestureActiveRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStateRef.current) return;
    
    const touches = e.touches;
    
    // If this was a single tap and we're not zoomed, check for swipe navigation
    if (touches.length === 0 && !isGestureActiveRef.current && scale <= 1) {
      const deltaX = touchStateRef.current.lastX - touchStateRef.current.startX;
      const deltaY = touchStateRef.current.lastY - touchStateRef.current.startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Only treat as swipe if movement was primarily horizontal and significant
      if (distance > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 2) {
        if (deltaX > 0 && hasPrev) {
          onPrev();
        } else if (deltaX < 0 && hasNext) {
          onNext();
        }
      }
    }
    
    // Reset state
    if (touches.length === 0) {
      touchStateRef.current = null;
      isGestureActiveRef.current = false;
    } else if (touches.length === 1 && touchStateRef.current) {
      // Continue with single touch
      const touch = touches[0];
      touchStateRef.current.lastX = touch.clientX;
      touchStateRef.current.lastY = touch.clientY;
      isGestureActiveRef.current = false;
    }
  };

  return (
    <FullscreenContainer>
      {/* Header with controls */}
      <Header>
        <CloseButton onClick={onClose}>
          ✕
        </CloseButton>
        
        <NavButtonsContainer>
          <Button 
            onClick={hasPrev ? onPrev : undefined}
            disabled={!hasPrev || scale > 1}
            $isDisabled={!hasPrev || scale > 1}
          >
            ←
          </Button>
          <Button 
            onClick={hasNext ? onNext : undefined}
            disabled={!hasNext || scale > 1}
            $isDisabled={!hasNext || scale > 1}
          >
            →
          </Button>
        </NavButtonsContainer>
      </Header>
      
      {/* Zoom indicator */}
      <ZoomIndicator $visible={showZoomIndicator}>
        {Math.round(scale * 100)}%
      </ZoomIndicator>
      
      {/* Media container with touch handlers */}
      <MediaContainer
        ref={mediaContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ZoomableWrapper 
          $scale={scale} 
          $translateX={translateX} 
          $translateY={translateY}
        >
          {item.type === 'image' ? (
            <MediaWrapper>
              <Image 
                src={item.url}
                alt={`Image ${index + 1}`}
                $isLoaded={isLoaded}
                onLoad={() => {
                  setIsLoaded(true);
                  setIsLoading(false);
                }}
                draggable={false}
              />
              {showWatermark && (
                <Overlay $type="watermark">
                  <WatermarkText>6180 Watermarked</WatermarkText>
                </Overlay>
              )}
              {/* Show thumbnail while loading */}
              {!isLoaded && item.thumbnailUrl && (
                <ThumbnailImage 
                  src={item.thumbnailUrl}
                  alt={`Thumbnail ${index + 1}`}
                  draggable={false}
                />
              )}
            </MediaWrapper>
          ) : (
            <MediaWrapper>
              <VideoElement 
                controls 
                autoPlay 
                onLoadedData={() => setIsLoading(false)}
              >
                <source src={item.url} type="video/mp4" />
                {t('Your browser does not support the video tag.')}
              </VideoElement>
              {showWatermark && (
                <Overlay $type="watermark">
                  <WatermarkText>6180 Watermarked</WatermarkText>
                </Overlay>
              )}
            </MediaWrapper>
          )}
        </ZoomableWrapper>
        
        {isLoading && (
          <LoadingIndicator>
            {item.type === 'image' ? t('Loading full resolution...') : t('Loading video...')}
          </LoadingIndicator>
        )}
      </MediaContainer>
      
      {/* Footer with owner profile link */}
      <Footer>
        {item.ownerContactId && ownerName && (
          <OwnerProfileLink href={`https://6180.io/${ownerName}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {ownerName}
          </OwnerProfileLink>
        )}
      </Footer>
    </FullscreenContainer>
  );
};