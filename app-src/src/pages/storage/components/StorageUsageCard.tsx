import React from 'react';
import { Card } from '@/styles/components/layout';
import { 
  StorageInfo, 
  StorageBar, 
  StorageProgress,
  LoadingSpinner 
} from './styled/StorageStyledComponents';
import { SubscriptionInfo } from '../types/storageTypes';
import { getTotalStorage, getPrice, formatStorageDisplay } from '../utils/storageUtils';

interface StorageUsageCardProps {
  subscriptionInfo: SubscriptionInfo | null;
  calculatedBytesUsed: number;
  t: (key: string, vars?: Record<string, string | number>) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

export const StorageUsageCard: React.FC<StorageUsageCardProps> = ({ 
  subscriptionInfo, 
  calculatedBytesUsed, 
  t, 
  formatCurrency 
}) => {
  if (!subscriptionInfo) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <LoadingSpinner />
          <span style={{ marginLeft: '8px', color: '#666' }}>
            {t('Loading account information...')}
          </span>
        </div>
      </Card>
    );
  }

  const totalGB = getTotalStorage(subscriptionInfo.intNumberOfSubscriptions);
  const usagePercentage = (calculatedBytesUsed / (totalGB * 1024 * 1024 * 1024)) * 100;
  const price = getPrice(subscriptionInfo.intNumberOfSubscriptions);

  return (
    <Card>
      <StorageInfo>
        <strong><span>{formatStorageDisplay(totalGB * 1024 * 1024 * 1024)}</span></strong>
        <span>{subscriptionInfo.intNumberOfSubscriptions === 0 ? t('Free') : formatCurrency(price)}</span>
      </StorageInfo>
      <StorageInfo>
        <span>{t('Used: {{used}}', { used: formatStorageDisplay(calculatedBytesUsed) })}</span>
        <span>{t('Total: {{total}}', { total: formatStorageDisplay(totalGB * 1024 * 1024 * 1024) })}</span>
      </StorageInfo>
      <StorageBar>
        <StorageProgress $percentage={usagePercentage} />
      </StorageBar>
    </Card>
  );
};