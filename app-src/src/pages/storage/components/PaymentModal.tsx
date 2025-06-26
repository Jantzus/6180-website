import React, { useState, useEffect } from 'react';
import { Button } from '@/styles/components/buttons'
import { 
  FormLabel,
  FormGroup,
} from "@/styles/components/forms";
import { 
  StripeOverlay, 
  StripeContainer, 
  StripeElementContainer,
  LoadingSpinner 
} from './styled/StorageStyledComponents';
import { ProRataDisplay } from './ProRataDisplay';
import { 
  StripeInstance, 
  StripeElement, 
  ProRataInfo,
  SubscriptionInfo 
} from '../types/storageTypes';
import { StripeService } from '../services/StripeService';
import { getTotalStorage, getPrice, selectTierForGB } from '../utils/storageUtils';

interface PaymentModalProps {
  showStripe: boolean;
  loading: boolean;
  selectedTier: number;
  customGB: string;
  albumCount: number;
  subscriptionInfo: SubscriptionInfo | null;
  onClose: () => void;
  onPaymentSuccess: () => void;
  setLoading: (loading: boolean) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  formatCurrency: (amount: number, currency?: string) => string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ 
  showStripe, 
  loading, 
  selectedTier, 
  customGB, 
  albumCount,
  subscriptionInfo,
  onClose, 
  onPaymentSuccess,
  setLoading,
  t,
  formatCurrency
}) => {
  const [proRataInfo, setProRataInfo] = useState<ProRataInfo | null>(null);
  const [stripe, setStripe] = useState<StripeInstance | null>(null);
  const [cardElement, setCardElement] = useState<StripeElement | null>(null);

  const targetTier = customGB && !isNaN(parseFloat(customGB)) 
    ? selectTierForGB(parseFloat(customGB), albumCount) 
    : selectedTier;
  
  const targetGB = getTotalStorage(targetTier);
  const price = getPrice(targetTier);
  const currentTier = subscriptionInfo?.intNumberOfSubscriptions || 0;
  const isUpgrade = targetTier > currentTier;
  const isDowngrade = targetTier < currentTier;

  // Initialize Stripe when modal opens - SSR safe
  useEffect(() => {
    if (!showStripe || stripe) return;
    
    // Only run in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const initStripe = async () => {
      try {
        const stripeInstance = await StripeService.initializeStripe();
        setStripe(stripeInstance);
        
        const elementsInstance = stripeInstance.elements();
        const cardElementInstance = elementsInstance.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#333',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
          },
        });
        setCardElement(cardElementInstance);
        
        // Use setTimeout to ensure DOM element exists
        setTimeout(() => {
          const cardElementDiv = document.getElementById('card-element');
          if (cardElementDiv) {
            cardElementInstance.mount('#card-element');
          }
        }, 100);
      } catch (error) {
        console.error('Failed to initialize Stripe:', error);
      }
    };
    
    initStripe();
  }, [showStripe, stripe]);

  // Get proration info when modal opens for upgrades
  useEffect(() => {
    if (showStripe && isUpgrade && subscriptionInfo) {
      const fetchProRata = async () => {
        try {
          if (subscriptionInfo.intNumberOfSubscriptions > 0) {
            const paymentIntent = await StripeService.createPaymentIntentWithProration(targetTier, ['card']);
            setProRataInfo(paymentIntent.proration);
          } else {
            setProRataInfo(null);
          }
        } catch (error) {
          console.error('Failed to get proration info:', error);
          setProRataInfo(null);
        }
      };
      
      fetchProRata();
    } else {
      setProRataInfo(null);
    }
  }, [showStripe, isUpgrade, currentTier, targetTier, subscriptionInfo]);

  // Cleanup Stripe elements when modal closes
  useEffect(() => {
    return () => {
      if (cardElement) {
        cardElement.unmount();
      }
    };
  }, [cardElement]);

  const handleStripeSubmit = async () => {
    setLoading(true);
    
    try {
      let finalTargetTier: number;
      if (customGB && !isNaN(parseFloat(customGB))) {
        const inputGB = parseFloat(customGB);
        if (inputGB < 10) {
          alert(t('Minimum storage capacity is 10 GB'));
          setLoading(false);
          return;
        }
        finalTargetTier = selectTierForGB(inputGB, albumCount);
      } else {
        finalTargetTier = selectedTier;
        // Only allow upgrades through plan grid
        const currentTier = subscriptionInfo?.intNumberOfSubscriptions || 0;
        if (finalTargetTier <= currentTier) {
          alert(t('Use the custom GB input to select a different plan size.'));
          setLoading(false);
          return;
        }
      }

      const currentTier = subscriptionInfo?.intNumberOfSubscriptions || 0;
      const isDowngrade = finalTargetTier < currentTier;

      // Create payment intent for card payment
      const paymentIntent = await StripeService.createPaymentIntentWithProration(
        finalTargetTier, 
        ['card']
      );

      if (!stripe || !cardElement) {
        throw new Error('Stripe not properly initialized');
      }

      // Confirm card payment
      const result = await StripeService.confirmPayment(
        stripe, 
        'card', 
        paymentIntent.clientSecret, 
        cardElement
      );

      const { error, paymentIntent: confirmedPayment } = result;

      if (error) {
        throw new Error(error.message);
      }

      // Handle payment status
      if (confirmedPayment?.status === 'succeeded') {
        // Payment completed immediately
        const prorationBehavior = isDowngrade ? 'none' : (currentTier > 0) ? 'create_prorations' : 'none';
        await StripeService.updateSubscription(finalTargetTier, prorationBehavior);
        setLoading(false);
        onPaymentSuccess();
      } else if (confirmedPayment?.status === 'requires_action' || confirmedPayment?.status === 'requires_source_action') {
        // For 3D Secure or other authentication requirements
        setLoading(false);
        alert(t('Additional authentication required. Please follow the prompts to complete payment.'));
      } else if (confirmedPayment?.status === 'processing') {
        // Payment is being processed
        setLoading(false);
        alert(t('Payment is being processed. You will receive confirmation once completed.'));
        onClose();
      } else {
        throw new Error('Payment was not successful');
      }

    } catch {
      setLoading(false);
      alert(t('Payment failed. Please try again.'));
    }
  };

  if (!showStripe) return null;

  return (
    <>
      <StripeOverlay onClick={() => !loading && onClose()} />
      <StripeContainer>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, marginBottom: '8px' }}>
            {isDowngrade 
              ? t('Change to {{gb}} GB Plan', { gb: targetGB })
              : t('Upgrade to {{gb}} GB', { gb: targetGB })
            }
          </h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
            {formatCurrency(price)} {t('/ month')}
          </div>
          {isUpgrade && proRataInfo && subscriptionInfo && subscriptionInfo.intNumberOfSubscriptions > 0 && proRataInfo.netAmount > 0 && (
            <div style={{ 
              fontSize: '14px', 
              color: '#666', 
              marginTop: '8px',
              fontStyle: 'italic'
            }}>
              {t('{{amount}} due today (with pro-rata credit)', { amount: formatCurrency(proRataInfo.netAmount) })}
            </div>
          )}
          <div style={{ 
            fontSize: '12px', 
            color: '#666', 
            marginTop: '16px',
            padding: '8px',
            backgroundColor: '#f9fafb',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}>
            {t('You will be automatically billed {{amount}} monthly on this payment method unless you change it.', { amount: formatCurrency(price) })}
          </div>
        </div>

        <ProRataDisplay proRataInfo={proRataInfo} isUpgrade={isUpgrade} t={t} formatCurrency={formatCurrency} />

        <FormGroup>
          <FormLabel>{t('Card Information')}</FormLabel>
          <StripeElementContainer>
            <div id="card-element" />
          </StripeElementContainer>
        </FormGroup>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Button 
            onClick={handleStripeSubmit} 
            disabled={loading || !cardElement}
            $primary
          >
            {loading && <LoadingSpinner />}
            {loading 
              ? t('Processing...') 
              : isDowngrade
                ? t('Confirm Plan Change (End of Period)')
                : isUpgrade && proRataInfo && subscriptionInfo && subscriptionInfo.intNumberOfSubscriptions > 0 && proRataInfo.netAmount > 0
                  ? t('Pay {{amount}} Today', { amount: formatCurrency(proRataInfo.netAmount) })
                  : isUpgrade && proRataInfo && subscriptionInfo && subscriptionInfo.intNumberOfSubscriptions > 0 && proRataInfo.netAmount === 0
                    ? t('Start Subscription (No charge today)')
                    : t('Start {{amount}}/month Subscription', { amount: formatCurrency(price) })
            }
          </Button>
          <Button 
            onClick={onClose}
            disabled={loading}
            style={{ marginLeft: '8px' }}
          >
            {t('Cancel')}
          </Button>
        </div>

        <div style={{ 
          marginTop: '32px', 
          padding: '16px', 
          backgroundColor: '#f9fafb', 
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#666'
        }}>
          {t('🔒 Secure payment powered by Stripe')}
        </div>
      </StripeContainer>
    </>
  );
};