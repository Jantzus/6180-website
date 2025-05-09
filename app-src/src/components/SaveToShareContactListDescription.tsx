import { AlbumData } from "@/lib/types";

// Contact List Component
export const SaveToShareContactListDescription: React.FC<{
  albumData: AlbumData | null;
  t: (key: string) => string;
}> = ({ albumData, t }) => {
  if (!albumData || Object.keys(albumData.contacts).length === 0) return null;
  
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#f0f7ff',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #d0e1f9'
    }}>
      <p style={{
        margin: '0',
        fontSize: '15px',
        color: '#333',
        textAlign: 'left'
      }}>
        {t('Click "Save" to create a memory with ')}
        <strong>
          {Object.values(albumData.contacts)
            .filter(contact => !contact.toString().startsWith('Profile-'))
            .join(', ')}
        </strong>
        {t(' that you can filter for later')}
      </p>
    </div>
  );
};
