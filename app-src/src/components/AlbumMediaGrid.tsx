import { AlbumData } from "@/lib/types";
import { 
  Message
} from "@/styles/styled-components";
import { 
  MediaGrid, 
} from "@/styles/components/layout";
import { MediaItemDisplayComponent } from "@/components/MediaItemDisplayComponent";

// Media Grid Component
export const AlbumMediaGrid: React.FC<{
  isLoading: boolean;
  error: string | null;
  albumData: AlbumData | null;
  columns: string;
  shouldShowContent: () => boolean;
  shouldShowWatermark: () => boolean;
  isSelectionMode: boolean;
  selectedItems: Set<number>;
  toggleItemSelection: (index: number, event: React.MouseEvent) => void;
  openFullscreenView: (index: number) => void;
  t: (key: string) => string;
}> = ({
  isLoading,
  error,
  albumData,
  columns,
  shouldShowContent,
  shouldShowWatermark,
  isSelectionMode,
  selectedItems,
  toggleItemSelection,
  openFullscreenView,
  t
}) => {
  if (isLoading) {
    return (
      <Message $type="loading" id="loading-message">
        {t('Loading album content...')}
      </Message>
    );
  }
  
  if (error) {
    return <Message $type="error">{error}</Message>;
  }
  
  if (!shouldShowContent()) {
    return (
      <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
        <Message $type="error">{t('Enter the password to view album contents')}</Message>
      </div>
    );
  }
  
  if (!albumData || albumData.mediaItems.length === 0) {
    return <Message $type="error">{t('No media found in this album')}</Message>;
  }
  
  return (
    <MediaGrid id="media-grid" $columns={columns}>
      {albumData.mediaItems.map((item, index) => {
        // Restore the ownerName extraction from the contacts map
        const ownerName = item.ownerContactId && albumData.contacts[item.ownerContactId] 
          ? albumData.contacts[item.ownerContactId] 
          : '';
        
        const isSelected = selectedItems.has(index);
        const showWatermark = shouldShowWatermark();
        
        return (
          <MediaItemDisplayComponent
            key={index}
            item={item}
            index={index}
            isSelectionMode={isSelectionMode}
            isSelected={isSelected}
            toggleItemSelection={toggleItemSelection}
            openFullscreenView={openFullscreenView}
            showWatermark={showWatermark}
            ownerName={ownerName}
          />
        );
      })}
    </MediaGrid>
  );
};