import React, { useEffect, useState, useMemo, useCallback } from "react";
import { S3_BUCKET_URL } from "@/lib/config";

// LazyImage Component - Optimized to prevent unnecessary re-renders and bandwidth usage
interface LazyImageProps {
  src?: string;
  alt: string;
  style: React.CSSProperties;
  thumbnailDataKey?: string | null;
  dataKey?: string | null;
  bucketUrl?: string;
  [key: string]: any;
}

// Optimized LazyImage Component with better dependency management and error handling
export const LazyImage: React.FC<LazyImageProps> = React.memo(({ 
  src, 
  alt, 
  style, 
  thumbnailDataKey, 
  dataKey, 
  bucketUrl = S3_BUCKET_URL,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fallbackAttempted, setFallbackAttempted] = useState(false);

  // MEMOIZED: Calculate the image source based on priority
  // This prevents recalculation on every render unless the actual values change
  const imageSrc = useMemo(() => {
    // Order of priority: thumbnailDataKey -> dataKey -> src
    if (thumbnailDataKey && thumbnailDataKey.length > 0) {
      return `${bucketUrl}${thumbnailDataKey}`;
    } else if (dataKey && dataKey.length > 0) {
      return `${bucketUrl}${dataKey}`;
    } else if (src && src.length > 0) {
      return src;
    }
    return '';
  }, [thumbnailDataKey, dataKey, src, bucketUrl]);

  // MEMOIZED: Fallback source calculation
  const fallbackSrc = useMemo(() => {
    // Only provide fallback if we have both thumbnail and data keys and they're different
    if (thumbnailDataKey && dataKey && thumbnailDataKey !== dataKey) {
      return `${bucketUrl}${dataKey}`;
    }
    return null;
  }, [thumbnailDataKey, dataKey, bucketUrl]);

  // Reset states when the image source changes
  useEffect(() => {
    if (imageSrc) {
      setLoaded(false);
      setImageError(false);
      setFallbackAttempted(false);
    }
  }, [imageSrc]);

  // MEMOIZED: Handle successful image load
  const handleImageLoaded = useCallback(() => {
    setLoaded(true);
    setImageError(false);
  }, []);

  // MEMOIZED: Handle image loading error with smart fallback logic
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Image load error:", e);
    
    // If we have a fallback available and haven't tried it yet
    if (fallbackSrc && !fallbackAttempted) {
      console.log("Attempting fallback to full image");
      setFallbackAttempted(true);
      // The fallback will be handled by changing the src in the render
    } else {
      // No fallback available or fallback also failed
      setImageError(true);
      setLoaded(false);
    }
  }, [fallbackSrc, fallbackAttempted]);

  // Don't render anything if there's no valid source
  if (!imageSrc) {
    return null;
  }

  // Don't render anything if image failed to load and there's no fallback
  if (imageError && (!fallbackSrc || fallbackAttempted)) {
    return null;
  }

  // Determine which source to use
  const currentSrc = fallbackAttempted && fallbackSrc ? fallbackSrc : imageSrc;

  return (
    <img
      src={currentSrc}
      alt={alt}
      style={{
        ...style,
        opacity: loaded ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in-out',
      }}
      onLoad={handleImageLoaded}
      onError={handleImageError}
      loading="lazy" // BANDWIDTH OPTIMIZATION: Native lazy loading
      decoding="async" // PERFORMANCE: Non-blocking image decoding
      {...props}
    />
  );
});

// Add display name for debugging
LazyImage.displayName = 'LazyImage';