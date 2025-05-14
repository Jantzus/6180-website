import styled from "styled-components";

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
  z-index: 100;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  margin-top: 4px;
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

