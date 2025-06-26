import styled, { css } from "styled-components";
import { theme } from "../theme";

// ========== Image & Video Components ==========

export const LazyImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${theme.colors.grayLighter};
  width: 100%;
  padding-bottom: 75%;
  height: 0;
  border-radius: ${theme.borderRadius.medium};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-bottom: 100%;
  }
`;

// Image styles
interface ImageProps {
  $isLoaded: boolean;
  $objectFit?: 'cover' | 'contain';
}

export const Image = styled.img<ImageProps>`
  opacity: ${props => props.$isLoaded ? 1 : 0};
  transition: opacity 0.3s;
  max-width: 100%;
  max-height: 100%;
  object-fit: ${props => props.$objectFit || 'contain'};
  border-radius: ${theme.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto; /* Keep pointer events for click handlers */
  
  ${props => props.$objectFit === 'cover' && css`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `}
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: ${theme.colors.grayLighter};
  width: 100%;
  min-height: 200px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-radius: ${theme.borderRadius.medium};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    min-height: 120px;
    aspect-ratio: 1/1;
    height: 0;
    padding-bottom: 100%;
  }
`;

export const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: ${theme.colors.overlayLight};
  border-radius: ${theme.borderRadius.circle};
  z-index: 2;
  
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    border-style: solid;
    border-width: 15px 0 15px 25px;
    border-color: transparent transparent transparent ${theme.colors.white};
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    
    &::before {
      border-width: 10px 0 10px 16px;
    }
  }
`;

export const MediaPreview = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.sm};
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MediaItem = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${theme.borderRadius.medium};
  /* Image protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  pointer-events: auto;
`;

export const VideoItem = styled.video`
  max-width: 100%;
  max-height: 100%;
  border-radius: ${theme.borderRadius.medium};
  /* Video protection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
`;

export const MediaWrapper = styled.div`
  position: relative;
`;
