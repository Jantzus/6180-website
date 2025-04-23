import React from "react";
import { useEffect, useState, useRef } from "react"

type LazyImageProps = {
  src: string;
  alt: string;
  style: React.CSSProperties;
};

export const LazyImage = ({ src, alt, style }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    // Create an observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        // If the image is intersecting with the viewport
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // Once we've started loading, we can disconnect the observer
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        // Load images when they're 200px before they appear in viewport
        rootMargin: '200px 0px',
        threshold: 0.01
      }
    );
    
    // Start observing the image element
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    // Clean up the observer when the component unmounts
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={imgRef}
      style={{
        ...style,
        backgroundColor: '#f0f0f0',
        position: 'relative',
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          style={{
            ...style,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      
      {/* Optional loading indicator */}
      {isInView && !isLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
          color: '#666'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
};
