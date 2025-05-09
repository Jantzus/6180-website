import { AlbumData } from "@/lib/types";
// Import styled components
import {
  AlbumTitle, 
  AlbumTitleStrong, 
  DescriptionBlock, 
  DescriptionText
} from "@/styles/photos-styled-components";

// Album Information Component
export const AlbumInfoComponent: React.FC<{
  albumData: AlbumData | null;
  t: (key: string) => string;
}> = ({ albumData, t }) => {
  if (!albumData) return null;
  
  return (
    <>
      {albumData.folderName && albumData.folderName !== t('Photos') && albumData.folderName.trim() !== "" && (
        <AlbumTitle id="album-title">
          <AlbumTitleStrong>{albumData.folderName}</AlbumTitleStrong>
        </AlbumTitle>
      )}
      
      {albumData.folderDescription && albumData.folderDescription.trim() !== "" && (
        <DescriptionBlock id="description-container">
          <DescriptionText>{albumData.folderDescription}</DescriptionText>
        </DescriptionBlock>
      )}
    </>
  );
};
