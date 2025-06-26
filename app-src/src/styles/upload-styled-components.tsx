import styled from "styled-components";
import { theme } from "./theme";

import { UploadStatus } from "@/lib/types";

// Progress components
interface ProgressProps {
  $progress?: number;
  $status?: UploadStatus;
  $isError?: boolean;
}

export const ProgressTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const ProgressBarBg = styled.div<{ $bottom?: string; $left?: string; $right?: string; $height?: string }>`
  height: ${props => props.$height || '8px'};
  background-color: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.small};
  overflow: hidden;
  ${props => props.$bottom && `bottom: ${props.$bottom};`}
  ${props => props.$left && `left: ${props.$left};`}
  ${props => props.$right && `right: ${props.$right};`}
  ${props => props.$bottom && props.$left && props.$right && 'position: absolute;'}
`;

export const ProgressBar = styled.div<ProgressProps>`
  height: 100%;
  background-color: ${props => {
    if (props.$status === 'processing') return theme.colors.warning;
    if (props.$status === 'error') return theme.colors.danger;
    if (props.$status === 'complete') return theme.colors.success;
    return theme.colors.info; // Default or uploading
  }};
  border-radius: ${theme.borderRadius.small};
  transition: width 0.3s ease;
  width: ${props => (props.$progress || 0) * 100}%;
`;

export const ProgressText = styled.div`
  font-size: ${theme.fontSizes.sm};
  margin-bottom: ${theme.spacing.sm};
`;

export const StatusIndicator = styled.div<{ $status: UploadStatus }>`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  width: 24px;
  height: 24px;
  border-radius: ${theme.borderRadius.circle};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.white};
  z-index: 1;
  background-color: ${props => {
    switch(props.$status) {
      case 'complete': return theme.colors.success;
      case 'error': return theme.colors.danger;
      case 'uploading': return theme.colors.info;
      case 'processing': return theme.colors.warning;
      default: return theme.colors.gray;
    }
  }};
`;