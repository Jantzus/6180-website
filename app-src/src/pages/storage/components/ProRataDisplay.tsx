import React from 'react';
import { ProRataInfo as StyledProRataInfo } from './styled/StorageStyledComponents';
import { ProRataInfo } from '../types/storageTypes';

interface ProRataDisplayProps {
  proRataInfo: ProRataInfo | null;
  isUpgrade: boolean;
  t: (key: string, vars?: Record<string, string | number>) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

export const ProRataDisplay: React.FC<ProRataDisplayProps> = ({ 
  proRataInfo, 
  isUpgrade,
  t,
  formatCurrency
}) => {
  if (!proRataInfo || !isUpgrade) return null;

  return (
    <StyledProRataInfo>
      <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#4caf50' }}>
        {t('✓ Today\'s Charge Calculation')}
      </div>
      <div style={{ fontSize: '14px', color: '#666' }}>
        <div>{t('Current plan credit: {{credit}}', { credit: formatCurrency(proRataInfo.proRataCredit) })}</div>
        <div>{t('New plan charge: {{charge}}', { charge: formatCurrency(proRataInfo.proRataCharge) })}</div>
        <div style={{ fontWeight: 'bold', marginTop: '4px', color: '#333' }}>
          {proRataInfo.netAmount > 0 
            ? t('Amount due today: {{amount}}', { amount: formatCurrency(proRataInfo.netAmount) })
            : t('No charge today (credit covers upgrade)')
          }
        </div>
        <div style={{ fontSize: '12px', marginTop: '4px' }}>
          {t('({{days}} days remaining in billing cycle)', { days: proRataInfo.daysRemainingInCycle })}
        </div>
      </div>
    </StyledProRataInfo>
  );
};