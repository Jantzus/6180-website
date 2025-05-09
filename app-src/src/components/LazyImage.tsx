import React, { useEffect, useState } from "react";
import { S3_BUCKET_URL } from "@/lib/config";

// LazyImage Component - Copied to avoid importing from components
interface LazyImageProps {
  src?: string;
  alt: string;
  style: React.CSSProperties;
  thumbnailDataKey?: string | null;
  dataKey?: string | null;
  bucketUrl?: string;
  [key: string]: any;
}

// Updated LazyImage Component to prevent rendering of the question mark placeholder
export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  style, 
  thumbnailDataKey, 
  dataKey, 
  bucketUrl = S3_BUCKET_URL,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [hasValidSource, setHasValidSource] = useState(false);

  useEffect(() => {
    // Reset state when the image source changes
    setLoaded(false);
    
    // Determine the appropriate source for the image
    // Order of priority: thumbnailDataKey -> dataKey -> src
    let imageSrc = '';
    let isValid = false;
    
    if (thumbnailDataKey && thumbnailDataKey.length > 0) {
      imageSrc = `${bucketUrl}${thumbnailDataKey}`;
      isValid = true;
    } else if (dataKey && dataKey.length > 0) {
      imageSrc = `${bucketUrl}${dataKey}`;
      isValid = true;
    } else if (src && src.length > 0) {
      imageSrc = src;
      isValid = true;
    }
    
    setCurrentSrc(imageSrc);
    setHasValidSource(isValid);
  }, [thumbnailDataKey, dataKey, src, bucketUrl]);

  // Handle successful image load
  const handleImageLoaded = () => {
    setLoaded(true);
  };

  // Handle image loading error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error("Image load error:", e);
    
    // If thumbnail fails, try loading the full image as a fallback
    if (thumbnailDataKey && dataKey && thumbnailDataKey !== dataKey) {
      // Only change source if we're currently using the thumbnail
      if (currentSrc === `${bucketUrl}${thumbnailDataKey}`) {
        console.log("Falling back to full image");
        setCurrentSrc(`${bucketUrl}${dataKey}`);
      } else {
        // If even the fallback fails, mark as invalid
        setHasValidSource(false);
      }
    } else {
      // If there's no fallback option, mark as invalid
      setHasValidSource(false);
    }
  };

  // Don't render anything if there's no valid source
  if (!hasValidSource) {
    return null;
  }

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
      {...props}
    />
  );
};
