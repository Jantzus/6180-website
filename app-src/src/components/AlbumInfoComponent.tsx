import { AlbumData } from "@/lib/types";
// Import styled components
import {
  AlbumTitle, 
  AlbumTitleStrong, 
  Card, 
  DescriptionText
} from "@/styles/styled-components";

// Album Information Component
export const AlbumInfoComponent: React.FC<{
  albumData: AlbumData | null;
  t: (key: string) => string;
}> = ({ albumData, t }) => {
  if (!albumData) return null;
  
  return (
    <>
      {albumData.folderName && albumData.folderName !== t('Photos') && albumData.folderName !== 'Photos' && albumData.folderName.trim() !== "" && (
        <AlbumTitle id="album-title">
          <AlbumTitleStrong>{albumData.folderName}</AlbumTitleStrong>
        </AlbumTitle>
      )}
      
      {albumData.folderDescription && albumData.folderDescription.trim() !== "" && (
        <Card id="description-container">
          <DescriptionText>{albumData.folderDescription}</DescriptionText>
        </Card>
      )}
    </>
  );
};