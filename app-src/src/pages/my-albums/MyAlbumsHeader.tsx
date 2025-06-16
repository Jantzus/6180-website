import React from "react";
import { PremiumHeader } from "./PremiumHeader"; // Import the new premium header

// Updated Header Component
type MyAlbumsHeaderProps = {
  publicUsername: string | null;
  subscriptionInfo: { 
    intNumberOfSubscriptions: number; 
    bytesOfDataUsed: number; 
  } | null;
  calculatedBytesUsed: number;
  onNewAlbum?: () => void;
};

export const MyAlbumsHeader: React.FC<MyAlbumsHeaderProps> = ({ 
  publicUsername,
  subscriptionInfo,
  calculatedBytesUsed,
  onNewAlbum
}) => {
  return (
    <PremiumHeader
      publicUsername={publicUsername}
      subscriptionInfo={subscriptionInfo}
      calculatedBytesUsed={calculatedBytesUsed}
      onNewAlbum={onNewAlbum}
    />
  );
};