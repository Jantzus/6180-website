// ========== Theme Variables and Constants ==========

export const theme = {
  colors: {
    primary: "#007bff",
    primaryDark: "#0056b3",
    secondary: "#6c757d",
    success: "#4caf50",
    danger: "#e53935",
    warning: "#ff9800",
    info: "#2196f3",
    light: "#f9fafb",
    dark: "#333",
    gray: "#8c8c8c",
    grayLight: "#e0e0e0",
    grayLighter: "#f0f0f0",
    white: "#fff",
    black: "#000",
    overlay: "rgba(0, 0, 0, 0.7)",
    overlayLight: "rgba(0, 0, 0, 0.5)",
    border: "#ddd",
    borderLight: "#eaeaea",
    // Enhanced focus colors for visual polish
    focusGlow: "#99caff",
    focusGlowShadow: "rgba(153, 202, 255, 0.4)",
    // New: Soft selection glow colors
    selectionGlow: "rgba(0, 123, 255, 0.3)",
    selectionBorder: "rgba(0, 123, 255, 0.6)",
    text: {
      primary: "#333",
      secondary: "#666",
      light: "#777",
      lighter: "#999",
      subtle: "#aaa", // Even lighter for subtle text
      white: "#fff"
    },
    background: {
      primary: "#f9fafb",
      // Enhanced gradient backgrounds for visual depth
      gradientStart: "#fdfdfd",
      gradientEnd: "#f6f6f6",
      card: "#fff",
      highlight: "#f0f7ff",
      error: "#fdeded"
    },
    highlight: {
      border: "#cce0ff",
      error: "#f7d0d0"
    }
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px", // Main grid spacing - used for consistent alignment
    xl: "32px"
  },
  // Enhanced border radius system for visual polish
  borderRadius: {
    none: "0",
    small: "4px",      // For small UI elements like tags, badges, chips
    medium: "8px",     // For most containers, cards, buttons
    large: "16px",     // For prominent elements, modals, featured cards - enhanced for login card
    full: "999px",     // For pills, tags (nearly circular but works with any height)
    circle: "50%"      // Perfect circles (for avatars, icons)
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px"
  },
  boxShadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 1px 3px rgba(0,0,0,0.1)",
    lg: "0 4px 10px rgba(0,0,0,0.08)",
    xl: "0 8px 24px rgba(0,0,0,0.2)",
    // Enhanced shadows for visual polish
    cardSoft: "0 8px 32px rgba(0,0,0,0.08)", // Softer, more elevated card shadow
    primaryBtn: "0 4px 12px rgba(0, 123, 255, 0.2)",
    selection: "0 2px 4px rgba(0, 0, 0, 0.2)",
    textShadow: "0 0 5px rgba(0, 0, 0, 0.8)",
    // Enhanced focus shadow
    focusGlow: "0 0 0 2px rgba(153, 202, 255, 0.4)",
    // New: Soft selection shadow
    selectionGlow: "0 0 0 3px rgba(0, 123, 255, 0.3), 0 4px 12px rgba(0, 123, 255, 0.15)",
    // New: Input shadows
    inputSoft: "0 2px 8px rgba(0, 0, 0, 0.04)"
  },
  breakpoints: {
    mobile: "767px"
  }
};

// ========== Header Height Constants ==========
// Define header height as a constant to keep it consistent across components
export const HEADER_HEIGHT = '64px'; // Increased from 60px for better slogan visibility
export const HEADER_HEIGHT_MOBILE = '60px'; // Increased from 56px

// ========== Common Interfaces ==========
export interface DirectionalProps {
  $isRTL: boolean;
}

export interface ButtonProps {
  disabled?: boolean;
  $primary?: boolean;
  $isHovered?: boolean;
  $passwordSet?: boolean;
  $isDisabled?: boolean;
}

export interface ImageProps {
  $isLoaded: boolean;
  $objectFit?: 'cover' | 'contain';
}

export interface MessageProps {
  $type?: 'error' | 'loading' | 'info';
}

export interface ModalProps {
  $zIndex?: number;
}

export interface BadgeProps {
  $position: 'bottomLeft' | 'bottomRight';
  $light?: boolean;
}

export interface StateProps {
  $type?: 'empty' | 'error';
}