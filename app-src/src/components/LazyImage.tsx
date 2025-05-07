import React, { useEffect, useState } from "react";
import { S3_BUCKET_URL } from "@/lib/config";

interface LazyImageProps {
  src?: string;
  alt: string;
  style: React.CSSProperties;
  thumbnailDataKey?: string | null;
  dataKey?: string | null;
  bucketUrl?: string;
  [key: string]: any;
}

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
  // const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Reset states when the image source changes
    setLoaded(false);
    // setIsError(false);
    
    // Always try to load the thumbnail first if available
    if (thumbnailDataKey) {
      setCurrentSrc(`${bucketUrl}${thumbnailDataKey}`);
    } else if (dataKey) {
      setCurrentSrc(`${bucketUrl}${dataKey}`);
    } else if (src) {
      // Fallback to the src prop if provided directly
      setCurrentSrc(src);
    }
  }, [thumbnailDataKey, dataKey, src, bucketUrl]);

  // Handle successful image load
  const handleImageLoaded = () => {
    setLoaded(true);
    // setIsError(false);
  };

  // Handle image loading error
  const handleImageError = () => {
    // setIsError(true);
    
    // If thumbnail fails, try loading the full image as a fallback
    if (thumbnailDataKey && dataKey && thumbnailDataKey !== dataKey) {
      console.log(`Thumbnail load failed, trying full image: ${dataKey}`);
      setCurrentSrc(`${bucketUrl}${dataKey}`);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      style={{
        ...style,
        opacity: loaded ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in-out',
        objectFit: "cover",
      }}
      onLoad={handleImageLoaded}
      onError={handleImageError}
      {...props}
    />
  );
};