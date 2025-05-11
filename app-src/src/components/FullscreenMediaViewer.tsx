import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import styled from "styled-components";
import { 
  WatermarkOverlay,
  WatermarkText,
  FullscreenContainer,
  NavigationButton,
  BackButton,
  NavButtonsContainer,
  OwnerProfileLink,
  Image,
  ThumbnailImage,
  VideoElement,
  LoadingIndicator,
  MediaWrapper
} from "@/styles/photos-styled-components";
import { MediaItem } from "@/lib/types";


const Header = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Footer = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
`;

export const MediaContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 10px;
  position: relative;
  touch-action: pan-y; /* Allow vertical scrolling but capture horizontal swipes */
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
  
  // References for touch handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const swipeThreshold = 50; // Minimum distance required for a swipe
  const [isScrolling, setIsScrolling] = useState(false);
  const startScrollTopRef = useRef<number>(0);
  
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

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    // Store the initial touch position
    touchStartXRef.current = e.touches[0].clientX;
    
    // Track if we're scrolling vertically
    if (mediaContainerRef.current) {
      startScrollTopRef.current = mediaContainerRef.current.scrollTop;
    }
    setIsScrolling(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // Skip if no start position
    if (touchStartXRef.current === null) return;
    
    // Check if vertical scrolling is happening
    if (mediaContainerRef.current) {
      if (Math.abs(mediaContainerRef.current.scrollTop - startScrollTopRef.current) > 10) {
        setIsScrolling(true);
      }
    }
    
    // Update the end position
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    // Skip if no start or end position
    if (touchStartXRef.current === null || touchEndXRef.current === null || isScrolling) {
      // Reset touch positions
      touchStartXRef.current = null;
      touchEndXRef.current = null;
      return;
    }

    // Calculate swipe distance
    const swipeDistance = touchEndXRef.current - touchStartXRef.current;
    
    // Determine if swipe was significant enough
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0 && hasPrev) {
        // Swipe right -> go to previous
        onPrev();
      } else if (swipeDistance < 0 && hasNext) {
        // Swipe left -> go to next
        onNext();
      }
    }
    
    // Reset touch positions
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Function to format the owner's Cognito username for the profile link
  const formatCognitoUsername = (ownerId: string) => {
    // Extract username from ownerId if available
    const username = ownerId?.split('_____')[0] || '';
    return username;
  };
  
  return (
    <FullscreenContainer>
      {/* Header with controls */}
      <Header>
        <BackButton onClick={onClose}>
          {t('Back')}
        </BackButton>
        
        <NavButtonsContainer>
          <NavigationButton 
            onClick={hasPrev ? onPrev : undefined}
            disabled={!hasPrev}
            isDisabled={!hasPrev}
          >
            ←
          </NavigationButton>
          <NavigationButton 
            onClick={hasNext ? onNext : undefined}
            disabled={!hasNext}
            isDisabled={!hasNext}
          >
            →
          </NavigationButton>
        </NavButtonsContainer>
      </Header>
      
      {/* Media container with touch handlers */}
      <MediaContainer
        ref={mediaContainerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {item.type === 'image' ? (
          <MediaWrapper>
            <Image 
              src={item.url}
              alt={`Image ${index + 1}`}
              isLoaded={isLoaded}
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
              <ThumbnailImage 
                src={item.thumbnailUrl}
                alt={`Thumbnail ${index + 1}`}
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
              <WatermarkOverlay>
                <WatermarkText>6180 Watermarked</WatermarkText>
              </WatermarkOverlay>
            )}
          </MediaWrapper>
        )}
        
        {isLoading && (
          <LoadingIndicator>
            {item.type === 'image' ? t('Loading full resolution...') : t('Loading video...')}
          </LoadingIndicator>
        )}
      </MediaContainer>
      
      {/* Footer with owner profile link */}
      <Footer>
        {item.ownerContactId && (
          <OwnerProfileLink href={`/profile.html?id=${formatCognitoUsername(item.ownerContactId)}`}>
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