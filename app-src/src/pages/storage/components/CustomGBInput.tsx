import React from 'react';
import { Input } from '@/styles/components/forms';
import { 
  FormLabel,
} from "@/styles/components/forms";
import { SubscriptionInfo } from '../types/storageTypes';
import { getTotalStorage, getPrice, selectTierForGB, formatStorageDisplay, bytesToGB } from '../utils/storageUtils';

interface CustomGBInputProps {
  customGB: string;
  onCustomGBChange: (value: string) => void;
  subscriptionInfo: SubscriptionInfo | null;
  calculatedBytesUsed: number;
  albumCount: number;
  t: (key: string, vars?: Record<string, string | number>) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

export const CustomGBInput: React.FC<CustomGBInputProps> = ({ 
  customGB, 
  onCustomGBChange, 
  subscriptionInfo,
  calculatedBytesUsed,
  albumCount,
  t,
  formatCurrency
}) => {
  const getRecommendationText = () => {
    if (!customGB || isNaN(parseFloat(customGB)) || !subscriptionInfo) return '';
    
    const inputGB = parseFloat(customGB);
    const currentTier = subscriptionInfo.intNumberOfSubscriptions;
    
    if (inputGB <= 0) {
      return <span style={{ color: '#e53935' }}>{t('Please enter a positive number')}</span>;
    }
    
    if (inputGB < 10) {
      return <span style={{ color: '#ff9800' }}>{t('Minimum: 10 GB')}</span>;
    }
    
    const usedGB = bytesToGB(calculatedBytesUsed);
    
    if (inputGB < usedGB) {
      return (
        <span style={{ color: '#e53935', fontWeight: 'bold' }}>
          {t('Error: You are using {{used}}', { used: formatStorageDisplay(calculatedBytesUsed) })}
        </span>
      );
    }
    
    const targetTier = selectTierForGB(inputGB, albumCount);
    const actualGB = getTotalStorage(targetTier);
    const price = getPrice(targetTier);
    
    if (targetTier === currentTier) {
      return <span style={{ color: '#666' }}>{t('Current Plan')}</span>;
    }
    
    if (targetTier < currentTier) {
      return (
        <span style={{ color: '#ff9800', fontWeight: 'bold' }}>
          {t('{{gb}} GB - {{price}} / month (Smaller Plan)', { gb: actualGB, price: formatCurrency(price) })}
        </span>
      );
    }
    
    if (targetTier === 0) {
      return <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{t('10 GB - Free')}</span>;
    } else {
      return (
        <span style={{ color: '#007bff', fontWeight: 'bold' }}>
          {t('{{gb}} GB - {{price}} / month (Upgrade)', { gb: actualGB, price: formatCurrency(price) })}
        </span>
      );
    }
  };

  const showErrorMessage = customGB && !isNaN(parseFloat(customGB)) && subscriptionInfo && 
                          parseFloat(customGB) < bytesToGB(calculatedBytesUsed);

  const showDowngradeWarning = customGB && !isNaN(parseFloat(customGB)) && subscriptionInfo &&
                              selectTierForGB(parseFloat(customGB), albumCount) < subscriptionInfo.intNumberOfSubscriptions;

  return (
    <div style={{ marginTop: '32px' }}>
      <FormLabel style={{ fontWeight: 'bold' }}>
        {t('Number of GB Needed:')}
      </FormLabel>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
        <Input
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          placeholder={t('e.g. 50')}
          value={customGB}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCustomGBChange(e.target.value)}
          style={{ 
            width: '120px',
            borderColor: showErrorMessage || showDowngradeWarning ? '#ff9800' : '#ddd'
          }}
        />
        <span style={{ fontSize: '14px', color: '#666', minWidth: '200px' }}>
          {getRecommendationText()}
        </span>
      </div>
      {showErrorMessage && (
        <div style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #e53935',
          fontSize: '12px',
          color: '#e53935'
        }}>
          {t('This capacity is insufficient for your current usage. Please select a larger capacity.')}
        </div>
      )}
      {showDowngradeWarning && !showErrorMessage && (
        <div style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: '#fff3e0',
          borderRadius: '4px',
          border: '1px solid #ff9800',
          fontSize: '12px',
          color: '#f57c00'
        }}>
          {t('Plan changes to a smaller capacity take effect at the end of your current billing period.')}
        </div>
      )}
    </div>
  );
};