import { LazyImage, VideoThumbnail } from "@/components/MediaComponents";

// Import styled components
import { 
  SelectionCheckbox,
  Checkmark,
  OwnerBadge
} from "@/styles/photos-styled-components";

// Media Item Component
export const MediaItemDisplayComponent: React.FC<{
  item: any;
  index: number;
  isSelectionMode: boolean;
  isSelected: boolean;
  toggleItemSelection: (index: number, event: React.MouseEvent) => void;
  openFullscreenView: (index: number) => void;
  showWatermark: boolean;
  ownerName: string;
}> = ({ 
  item, 
  index, 
  isSelectionMode, 
  isSelected, 
  toggleItemSelection, 
  openFullscreenView, 
  showWatermark,
  ownerName
}) => {
  return (
    <div 
      key={index} 
      style={{ 
        position: 'relative',
        border: isSelectionMode && isSelected ? '3px solid #006adc' : undefined,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: isSelectionMode && isSelected ? '0 0 0 3px rgba(0, 106, 220, 0.3)' : undefined
      }}
      onClick={(e: React.MouseEvent) => isSelectionMode ? 
        toggleItemSelection(index, e) : 
        openFullscreenView(index)}
    >
      {isSelectionMode && (
        <SelectionCheckbox 
          isSelected={isSelected}
          onClick={(e: React.MouseEvent) => toggleItemSelection(index, e)}
        >
          {isSelected && (
            <Checkmark>✓</Checkmark>
          )}
        </SelectionCheckbox>
      )}
      
      {item.type === 'image' ? (
        <LazyImage 
          src={item.url}
          thumbnailSrc={item.thumbnailUrl}
          alt={`Album image ${index + 1}`}
          loadFullResolution={false}
          onFullResolutionLoaded={() => {}}
          onClick={() => isSelectionMode ? undefined : openFullscreenView(index)}
          showWatermark={showWatermark}
        />
      ) : (
        <VideoThumbnail 
          thumbnailUrl={item.thumbnailUrl || ''} 
          videoUrl={item.url} 
          duration={item.duration || '0:00'} 
          index={index}
          onFullResolutionLoaded={() => {}}
          onClick={() => isSelectionMode ? undefined : openFullscreenView(index)}
          showWatermark={showWatermark}
        />
      )}
      
      {/* Display owner badge if owner name exists */}
      {ownerName && (
        <OwnerBadge>{ownerName}</OwnerBadge>
      )}
    </div>
  );
};
