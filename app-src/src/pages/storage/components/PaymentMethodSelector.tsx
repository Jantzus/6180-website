import React from 'react';
import { 
  FormLabel,
  FormGroup,
} from "@/styles/components/forms";
import { PaymentMethodGrid, PaymentMethodCard } from './styled/StorageStyledComponents';
import { getPaymentMethodConfig } from '../utils/storageUtils';

interface PaymentMethodSelectorProps {
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ t }) => {
  const config = getPaymentMethodConfig();
  
  return (
    <FormGroup>
      <FormLabel>{t('Payment Method')}</FormLabel>
      <PaymentMethodGrid>
        <PaymentMethodCard $isSelected={true}>
          <div style={{ fontSize: '24px', marginBottom: '4px' }}>
            💳
          </div>
          <div style={{ fontSize: '12px', fontWeight: '500' }}>
            {t('Credit Card')}
          </div>
          <div style={{ 
            fontSize: '10px', 
            color: '#666',
            marginTop: '4px'
          }}>
            {t(config.description)}
          </div>
        </PaymentMethodCard>
      </PaymentMethodGrid>
    </FormGroup>
  );
};