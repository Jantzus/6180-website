import React, { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/react";
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
      
      {/* Media container */}
      <MediaContainer>
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