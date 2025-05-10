import styled from "styled-components";

// Profile Header Styled Components
export const HeaderContainer = styled.div<{ isRTL: boolean }>`
  margin-bottom: 24px;
  text-align: center;
  direction: ${props => props.isRTL ? "rtl" : "ltr"};
`;

export const ProfileControls = styled.div<{ isRTL: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => props.isRTL ? "flex-start" : "flex-end"};
  margin-bottom: 8px;
  position: relative;
`;

export const ProfileMenu = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #555;
  margin-right: 12px;
`;

export const ProfileName = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: 600;
`;

export const DropdownIndicator = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #555;
  margin-left: 8px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 100;
  min-width: 180px;
  padding: 8px 0;
`;

export const DropdownItem = styled.div<{ hasBorder?: boolean }>`
  padding: 10px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: ${props => props.hasBorder ? "1px solid #eee" : "none"};
`;

export const ProfileNotification = styled.div`
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #f0f7ff;
  border-radius: 8px;
  border: 1px solid #cce0ff;
  max-width: 500px;
  font-size: 13px;
  margin: 0 auto;
  
  p {
    margin: 0;
  }
`;

// Album Footer Styled Components
export const FooterContainer = styled.div<{ isRTL: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  flex-direction: ${props => props.isRTL ? "row-reverse" : "row"};
`;

export const ButtonGroup = styled.div<{ isRTL: boolean }>`
  display: flex;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
  flex-direction: ${props => props.isRTL ? "row-reverse" : "row"};
  gap: 10px;
`;

export const ButtonRow = styled.div<{ isRTL: boolean }>`
  display: flex;
  gap: 10px;
  flex-direction: ${props => props.isRTL ? "row-reverse" : "row"};
`;

export const Button = styled.button<{ variant?: "primary" | "success" | "default" | "active" }>`
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  
  background-color: ${props => {
    switch (props.variant) {
      case "primary": return "#2196f3";
      case "success": return "#4caf50";
      case "active": return "#4caf50";
      default: return "#e0e0e0";
    }
  }};
  
  color: ${props => {
    switch (props.variant) {
      case "primary": 
      case "success":
      case "active": return "white";
      default: return "inherit";
    }
  }};
`;

// Album List Styled Components
export const EmptyState = styled.div`
  text-align: center; 
  padding: 40px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  
  p {
    font-size: 16px;
    color: #666;
  }
`;

export const AlbumCard = styled.div<{ isRTL: boolean }>`
  margin-bottom: 30px;
  width: 100%;
  direction: ${props => props.isRTL ? "rtl" : "ltr"};
`;

export const AlbumLink = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
  overflow: hidden;
`;

export const AlbumContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease;
  width: 100%;
  max-width: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  }
`;

export const AlbumHeader = styled.div<{ isRTL: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-direction: ${props => props.isRTL ? "row-reverse" : "row"};
`;

export const AlbumDetails = styled.div<{ isRTL: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isRTL ? "flex-end" : "flex-start"};
`;

export const AlbumTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #222;
`;

export const AlbumDates = styled.div<{ isRTL: boolean }>`
  font-size: 13px;
  color: #777;
  text-align: ${props => props.isRTL ? "right" : "left"};
  margin-top: 4px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const ImageScroller = styled.div<{ isRTL: boolean }>`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-bottom: 8px;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  max-width: 100%;
  flex-direction: ${props => props.isRTL ? "row-reverse" : "row"};
`;

export const ImageItem = styled.div`
  flex-shrink: 0;
`;

export const ImageShadow = styled.div<{ isRTL: boolean }>`
  position: absolute;
  ${props => props.isRTL ? 'left' : 'right'}: 0;
  top: 0;
  bottom: 8px;
  width: 30px;
  background: ${props => props.isRTL 
    ? "linear-gradient(to left, rgba(255,255,255,0), rgba(255,255,255,0.9))"
    : "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.9))"};
  pointer-events: none;
`;

export const PasswordPolicy = styled.div<{ isRTL: boolean }>`
  display: flex;
  justify-content: ${props => props.isRTL ? "flex-start" : "flex-end"};
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const PolicyIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #555;
`;

export const AlbumDescription = styled.div<{ isRTL: boolean }>`
  margin-top: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  text-align: ${props => props.isRTL ? "right" : "left"};
`;

// Loading and Error States
export const LoadingState = styled(EmptyState)``;

export const ErrorState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background-color: #fdeded;
  border-radius: 12px;
  border: 1px solid #f7d0d0;
  margin-bottom: 20px;
  
  p {
    font-size: 16px;
    color: #d32f2f;
  }
`;

// Main Container
export const MainContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;