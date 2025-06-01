import React, { useState, useMemo, useCallback } from 'react';
import ReactDOM from "react-dom/client";
import styled from 'styled-components';
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { redirectTo, generateUrl } from "@/lib/utils";
import { useFolderManagement } from "../my-albums/utils";

// ===== TYPE DEFINITIONS =====
interface DirectionalProps {
  $isRTL: boolean;
}

interface StorageProgressProps {
  $percentage: number;
}

interface PlanCardProps {
  $isSelected: boolean;
  $isInsufficient?: boolean;
}

interface ButtonProps {
  variant?: 'danger' | 'secondary' | 'success';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  name: string;
}

interface Plan {
  id: number;
  price: string;
  subscriptions: number;
  storageGB: number;
  isInsufficient: boolean;
  isCurrent: boolean;
  insufficientReason?: string;
}

interface SubscriptionInfo {
  intNumberOfSubscriptions: number;
  bytesOfDataUsed: number;
}

interface ProRataInfo {
  currentMonthlyPrice: number;
  newMonthlyPrice: number;
  daysRemainingInCycle: number;
  totalDaysInCycle: number;
  proRataCredit: number;
  proRataCharge: number;
  netAmount: number;
}

type PaymentMethod = 'card' | 'alipay' | 'wechat_pay' | 'klarna' | 'ideal' | 'sofort' | 'bancontact' | 'giropay' | 'eps' | 'p24';

// ===== STRIPE PLACEHOLDER FUNCTIONS =====
class StripeService {
  // Initialize Stripe with publishable key
  static initializeStripe(publishableKey: string): Promise<any> {
    console.log('Initializing Stripe with key:', publishableKey);
    // Placeholder: return Promise.resolve(stripe instance)
    return Promise.resolve({
      elements: () => ({
        create: (type: string, _options?: any) => ({
          mount: (selector: string) => console.log(`Mounting ${type} to ${selector}`),
          unmount: () => console.log(`Unmounting element`),
          on: (event: string, _callback: Function) => console.log(`Event listener added for ${event}`),
          clear: () => console.log('Element cleared')
        })
      }),
      confirmPayment: (_options: any) => Promise.resolve({ error: null, paymentIntent: { status: 'succeeded' } }),
      confirmAlipayPayment: (_clientSecret: string, _data?: any) => Promise.resolve({ error: null }),
      confirmWechatPayPayment: (_clientSecret: string, _data?: any) => Promise.resolve({ error: null })
    });
  }

  // Create payment intent on backend
  static async createPaymentIntent(amount: number, currency: string = 'usd', paymentMethodTypes: PaymentMethod[] = ['card']): Promise<{clientSecret: string, id: string}> {
    console.log('Creating payment intent:', { amount, currency, paymentMethodTypes });
    
    // Placeholder API call to backend
    // const response = await fetch('/api/create-payment-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ amount, currency, payment_method_types: paymentMethodTypes })
    // });
    // return response.json();
    
    return Promise.resolve({
      clientSecret: `pi_mock_${Date.now()}_secret_mock`,
      id: `pi_mock_${Date.now()}`
    });
  }

  // Create setup intent for saving payment methods
  static async createSetupIntent(customerId: string): Promise<{clientSecret: string}> {
    console.log('Creating setup intent for customer:', customerId);
    
    // Placeholder API call
    // const response = await fetch('/api/create-setup-intent', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ customer_id: customerId })
    // });
    // return response.json();
    
    return Promise.resolve({
      clientSecret: `seti_mock_${Date.now()}_secret_mock`
    });
  }

  // Update subscription with new price
  static async updateSubscription(subscriptionId: string, newPriceId: string, prorationBehavior: 'create_prorations' | 'none' = 'create_prorations'): Promise<any> {
    console.log('Updating subscription:', { subscriptionId, newPriceId, prorationBehavior });
    
    // Placeholder API call
    // const response = await fetch('/api/update-subscription', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ 
    //     subscription_id: subscriptionId, 
    //     price_id: newPriceId,
    //     proration_behavior: prorationBehavior
    //   })
    // });
    // return response.json();
    
    return Promise.resolve({
      id: subscriptionId,
      status: 'active',
      current_period_end: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
    });
  }

  // Cancel subscription
  static async cancelSubscription(subscriptionId: string, at_period_end: boolean = true): Promise<any> {
    console.log('Canceling subscription:', { subscriptionId, at_period_end });
    
    // Placeholder API call
    // const response = await fetch('/api/cancel-subscription', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ subscription_id: subscriptionId, at_period_end })
    // });
    // return response.json();
    
    return Promise.resolve({
      id: subscriptionId,
      status: at_period_end ? 'active' : 'canceled',
      cancel_at_period_end: at_period_end
    });
  }

  // Get customer's payment methods
  static async getPaymentMethods(customerId: string): Promise<any[]> {
    console.log('Getting payment methods for customer:', customerId);
    
    // Placeholder API call
    // const response = await fetch(`/api/payment-methods/${customerId}`);
    // return response.json();
    
    return Promise.resolve([]);
  }

  // Calculate pro-rata for subscription changes
  static async calculateProRata(currentPriceId: string, newPriceId: string, subscriptionId: string): Promise<ProRataInfo> {
    console.log('Calculating pro-rata:', { currentPriceId, newPriceId, subscriptionId });
    
    // Placeholder calculation - in real implementation, this would call Stripe API
    // const response = await fetch('/api/calculate-proration', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ current_price_id: currentPriceId, new_price_id: newPriceId, subscription_id: subscriptionId })
    // });
    // return response.json();
    
    const currentPrice = parseFloat(currentPriceId) || 1.75; // Mock current price
    const newPrice = parseFloat(newPriceId) || 2.50; // Mock new price
    const daysRemaining = 15; // Mock days remaining in cycle
    const totalDays = 30;
    
    const proRataCredit = (currentPrice / totalDays) * daysRemaining;
    const proRataCharge = (newPrice / totalDays) * daysRemaining;
    const netAmount = proRataCharge - proRataCredit;
    
    return Promise.resolve({
      currentMonthlyPrice: currentPrice,
      newMonthlyPrice: newPrice,
      daysRemainingInCycle: daysRemaining,
      totalDaysInCycle: totalDays,
      proRataCredit,
      proRataCharge,
      netAmount: Math.max(0, netAmount) // Never charge negative amounts
    });
  }
}

// ===== UTILITY FUNCTIONS =====
const bytesToGB = (bytes: number): number => bytes / (1024 * 1024 * 1024);

const formatStorageDisplay = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  const gb = bytes / (1024 * 1024 * 1024);
  const tb = bytes / (1024 * 1024 * 1024 * 1024);

  if (tb >= 1) return `${tb.toFixed(1)} TB`;
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  return `${Math.round(mb)} MB`;
};

const getTotalStorage = (tier: number): number => {
  if (tier <= 1) return 10;
  return tier * 10;
};

const getPrice = (tier: number): number => {
  if (tier === 0) return 0;
  return 1.00 + 0.75 * (tier - 1);
};

const selectTierForGB = (requestedGB: number, albumCount: number): number => {
  if (requestedGB <= 10) {
    return albumCount <= 5 ? 0 : 1;
  }
  return Math.ceil(requestedGB / 10);
};

const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// ===== THEME =====
const theme = {
  colors: {
    primary: "#007bff",
    primaryDark: "#0056b3",
    secondary: "#6c757d",
    success: "#4caf50",
    danger: "#e53935",
    warning: "#ff9800",
    light: "#f9fafb",
    white: "#fff",
    text: {
      primary: "#333",
      secondary: "#666",
      light: "#777"
    },
    background: {
      primary: "#f9fafb",
      card: "#fff",
      highlight: "#f0f7ff"
    },
    border: "#ddd",
    grayLight: "#e0e0e0"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px"
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px"
  },
  boxShadow: {
    sm: "0 1px 2px rgba(0,0,0,0.06)",
    md: "0 1px 3px rgba(0,0,0,0.1)",
    lg: "0 4px 10px rgba(0,0,0,0.08)"
  }
};

// ===== STYLED COMPONENTS =====
const PageContainer = styled.div<DirectionalProps>`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${props => props.$isRTL ? 'rtl' : 'ltr'};
  position: relative;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  padding: 8px 16px;
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
  }
`;

const Card = styled.div`
  background-color: ${theme.colors.background.card};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.boxShadow.md};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: 0 0 ${theme.spacing.md} 0;
  color: ${theme.colors.text.primary};
`;

const StorageBar = styled.div`
  background-color: ${theme.colors.grayLight};
  border-radius: ${theme.borderRadius.small};
  height: 20px;
  overflow: hidden;
  margin: ${theme.spacing.md} 0;
`;

const StorageProgress = styled.div<StorageProgressProps>`
  height: 100%;
  background-color: ${props => {
    if (props.$percentage > 90) return theme.colors.danger;
    if (props.$percentage > 75) return theme.colors.warning;
    return theme.colors.primary;
  }};
  width: ${props => Math.min(props.$percentage, 100)}%;
  transition: width 0.3s ease;
`;

const StorageInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: ${theme.colors.text.secondary};
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const PlanCard = styled.div<PlanCardProps>`
  border: ${props => {
    if (props.$isInsufficient) return `2px solid ${theme.colors.danger}`;
    return props.$isSelected ? `2px solid ${theme.colors.primary}` : `1px solid ${theme.colors.grayLight}`;
  }};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  cursor: ${props => props.$isInsufficient ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  background-color: ${props => {
    if (props.$isInsufficient) return '#ffebee';
    return props.$isSelected ? theme.colors.background.highlight : theme.colors.white;
  }};
  opacity: ${props => props.$isInsufficient ? 0.7 : 1};
  position: relative;
`;

const PlanTitle = styled.h3`
  margin: 0 0 ${theme.spacing.sm} 0;
  font-size: 16px;
  color: ${theme.colors.text.primary};
`;

const PlanPrice = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const InsufficientBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${theme.colors.danger};
  color: white;
  font-size: 10px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: ${theme.boxShadow.sm};
`;

const Button = styled.button<ButtonProps>`
  background-color: ${props => {
    if (props.variant === 'danger') return theme.colors.danger;
    if (props.variant === 'secondary') return 'transparent';
    if (props.variant === 'success') return theme.colors.success;
    return theme.colors.primary;
  }};
  color: ${props => {
    if (props.variant === 'secondary') return theme.colors.primary;
    return theme.colors.white;
  }};
  border: ${props => {
    if (props.variant === 'secondary') return `1px solid ${theme.colors.primary}`;
    return 'none';
  }};
  padding: ${props => {
    if (props.size === 'small') return '8px 16px';
    if (props.size === 'large') return '16px 32px';
    return '12px 24px';
  }};
  border-radius: ${theme.borderRadius.medium};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => {
    if (props.size === 'small') return '14px';
    if (props.size === 'large') return '18px';
    return '16px';
  }};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  margin-right: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${props => {
      if (props.variant === 'danger') return '#c62828';
      if (props.variant === 'secondary') return theme.colors.background.highlight;
      if (props.variant === 'success') return '#388e3c';
      return theme.colors.primaryDark;
    }};
  }
`;

const LoadingSpinner = styled.div`
  border: 2px solid ${theme.colors.grayLight};
  border-top: 2px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: ${theme.spacing.sm};

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${theme.spacing.sm};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const StripeContainer = styled.div`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.boxShadow.lg};
  padding: 40px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: min(450px, calc(100vw - 64px));
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  
  @media (max-width: 480px) {
    width: calc(100vw - 80px);
    max-height: calc(100vh - 80px);
    padding: ${theme.spacing.lg};
  }
`;

const StripeOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${theme.spacing.sm};
  margin: ${theme.spacing.md} 0;
`;

const PaymentMethodCard = styled.div<{$isSelected: boolean}>`
  border: 2px solid ${props => props.$isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.$isSelected ? theme.colors.background.highlight : theme.colors.white};
`;

const ProRataInfo = styled.div`
  background-color: ${theme.colors.background.primary};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
  border-left: 4px solid ${theme.colors.success};
`;

// ===== CUSTOM HOOKS =====
const useSubscriptionLogic = (subscriptionInfo: SubscriptionInfo | null, calculatedBytesUsed: number, albumCount: number, t: any) => {
  const canDowngrade = useCallback((targetTier: number) => {
    if (!subscriptionInfo) {
      return { canDowngrade: false, reason: t('Loading subscription information...') };
    }

    const targetStorageGB = getTotalStorage(targetTier);
    const targetStorageBytes = targetStorageGB * 1024 * 1024 * 1024;
    const hasEnoughStorage = calculatedBytesUsed <= targetStorageBytes;
    
    if (targetTier === 0) {
      const hasEnoughAlbumSlots = albumCount <= 5;
      
      if (!hasEnoughStorage && !hasEnoughAlbumSlots) {
        return { canDowngrade: false, reason: t('Insufficient storage and too many albums (max 5 for free)') };
      } else if (!hasEnoughStorage) {
        return { canDowngrade: false, reason: t('Insufficient storage capacity') };
      } else if (!hasEnoughAlbumSlots) {
        return { canDowngrade: false, reason: t('Too many albums (free tier allows max 5 albums)') };
      }
      
      return { canDowngrade: true };
    }
    
    return { canDowngrade: hasEnoughStorage, reason: hasEnoughStorage ? undefined : t('Insufficient storage capacity') };
  }, [subscriptionInfo, calculatedBytesUsed, albumCount, t]);

  const generatePlans = useCallback((): Plan[] => {
    if (!subscriptionInfo) return [];

    const currentTier = subscriptionInfo.intNumberOfSubscriptions;
    const plans: Plan[] = [];
    
    const addPlan = (tier: number, isCurrent = false) => {
      const gb = getTotalStorage(tier);
      const price = getPrice(tier);
      const downgradeResult = canDowngrade(tier);
      
      plans.push({
        id: tier,
        price: tier === 0 ? t('Free') : t('US${{price}} / month', { price: price.toFixed(2) }),
        subscriptions: tier,
        storageGB: gb,
        isInsufficient: !downgradeResult.canDowngrade,
        isCurrent,
        insufficientReason: downgradeResult.reason
      });
    };
    
    // Current tier
    addPlan(currentTier, true);
    
    // 2 tiers above current
    const maxTierToShow = currentTier + 2;
    for (let tier = currentTier + 1; tier <= maxTierToShow; tier++) {
      addPlan(tier, false);
    }
    
    return plans.sort((a, b) => a.subscriptions - b.subscriptions);
  }, [subscriptionInfo, canDowngrade, t]);

  return { canDowngrade, generatePlans };
};

// ===== COMPONENTS =====
const StorageUsageCard = ({ subscriptionInfo, calculatedBytesUsed, t }: { subscriptionInfo: SubscriptionInfo | null; calculatedBytesUsed: number; t: any }) => {
  if (!subscriptionInfo) {
    return (
      <Card>
        <div style={{ textAlign: 'center', padding: theme.spacing.lg }}>
          <LoadingSpinner />
          <span style={{ marginLeft: theme.spacing.sm, color: theme.colors.text.secondary }}>
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

const CustomGBInput = ({ 
  customGB, 
  onCustomGBChange, 
  subscriptionInfo, 
  calculatedBytesUsed,
  albumCount,
  t 
}: { 
  customGB: string; 
  onCustomGBChange: (value: string) => void; 
  subscriptionInfo: SubscriptionInfo | null;
  calculatedBytesUsed: number;
  albumCount: number;
  t: any;
}) => {
  const getRecommendationText = () => {
    if (!customGB || isNaN(parseFloat(customGB)) || !subscriptionInfo) return '';
    
    const inputGB = parseFloat(customGB);
    const currentTier = subscriptionInfo.intNumberOfSubscriptions;
    
    if (inputGB <= 0) {
      return <span style={{ color: theme.colors.danger }}>{t('Please enter a positive number')}</span>;
    }
    
    if (inputGB < 10) {
      const minTargetTier = selectTierForGB(10, albumCount);
      if (minTargetTier === currentTier) {
        return <span style={{ color: theme.colors.text.secondary }}>{t('Current Plan')}</span>;
      } else {
        return <span style={{ color: theme.colors.warning }}>{t('Minimum: 10 GB')}</span>;
      }
    }
    
    const usedGB = bytesToGB(calculatedBytesUsed);
    
    if (inputGB < usedGB) {
      return (
        <span style={{ color: theme.colors.danger, fontWeight: 'bold' }}>
          {t('Error: You are using {{used}}', { used: formatStorageDisplay(calculatedBytesUsed) })}
        </span>
      );
    }
    
    const targetTier = selectTierForGB(inputGB, albumCount);
    const actualGB = getTotalStorage(targetTier);
    const price = getPrice(targetTier);
    
    if (targetTier === currentTier) {
      return <span style={{ color: theme.colors.text.secondary }}>{t('Current Plan')}</span>;
    }
    
    if (targetTier === 0) {
      return <span style={{ color: theme.colors.success, fontWeight: 'bold' }}>{t('10 GB - Free')}</span>;
    } else {
      return (
        <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
          {t('{{gb}} GB - {{price}} / month', { gb: actualGB, price: formatCurrency(price) })}
        </span>
      );
    }
  };

  const showErrorMessage = customGB && !isNaN(parseFloat(customGB)) && subscriptionInfo && 
                          parseFloat(customGB) < bytesToGB(calculatedBytesUsed);

  return (
    <div style={{ marginTop: theme.spacing.lg }}>
      <Label style={{ fontWeight: 'bold' }}>
        {t('Number of GB Needed:')}
      </Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
        <Input
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          placeholder={t('e.g. 50')}
          value={customGB}
          onChange={(e) => onCustomGBChange(e.target.value)}
          style={{ 
            width: '120px',
            borderColor: showErrorMessage ? theme.colors.danger : theme.colors.border
          }}
        />
        <span style={{ fontSize: '14px', color: theme.colors.text.secondary, minWidth: '200px' }}>
          {getRecommendationText()}
        </span>
      </div>
      {showErrorMessage && (
        <div style={{
          marginTop: theme.spacing.sm,
          padding: theme.spacing.sm,
          backgroundColor: '#ffebee',
          borderRadius: theme.borderRadius.small,
          border: `1px solid ${theme.colors.danger}`,
          fontSize: '12px',
          color: theme.colors.danger
        }}>
          {t('This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.')}
        </div>
      )}
    </div>
  );
};

const PlanSelectionGrid = ({ 
  plans, 
  selectedTier, 
  isPlanSelected, 
  customGB, 
  onPlanSelect,
  t 
}: { 
  plans: Plan[]; 
  selectedTier: number; 
  isPlanSelected: boolean; 
  customGB: string; 
  onPlanSelect: (plan: Plan) => void;
  t: any;
}) => {
  return (
    <PlanGrid>
      {plans.map((plan) => (
        <PlanCard
          key={plan.id}
          $isSelected={isPlanSelected && selectedTier === plan.subscriptions && !customGB && !plan.isInsufficient}
          $isInsufficient={plan.isInsufficient}
          onClick={() => onPlanSelect(plan)}
        >
          <PlanTitle>
            {t('{{gb}} GB', { gb: plan.storageGB })}
            {plan.subscriptions === 0 && (
              <span style={{ 
                marginLeft: '8px', 
                fontSize: '12px', 
                color: theme.colors.text.secondary,
                fontWeight: 'normal'
              }}>
                ({t('Max 5 albums')})
              </span>
            )}
            {plan.isCurrent && (
              <span style={{ 
                marginLeft: '8px', 
                fontSize: '12px', 
                color: theme.colors.primary,
                fontWeight: 'normal'
              }}>
                ({t('Current')})
              </span>
            )}
          </PlanTitle>
          <PlanPrice style={{ 
            color: plan.isInsufficient ? theme.colors.text.secondary : theme.colors.primary 
          }}>
            {plan.price}
          </PlanPrice>
          {plan.isInsufficient && (
            <>
              <div style={{
                fontSize: '12px',
                color: theme.colors.danger,
                fontWeight: 'bold',
                marginTop: '8px'
              }}>
                {plan.insufficientReason || t('Insufficient Capacity')}
              </div>
              <InsufficientBadge>⚠️</InsufficientBadge>
            </>
          )}
        </PlanCard>
      ))}
    </PlanGrid>
  );
};

const PaymentMethodSelector = ({ 
  selectedMethod, 
  onMethodSelect,
  t 
}: { 
  selectedMethod: PaymentMethod; 
  onMethodSelect: (method: PaymentMethod) => void;
  t: any;
}) => {
  const paymentMethods: { id: PaymentMethod; name: string; icon: string }[] = [
    { id: 'card', name: t('Credit Card'), icon: '💳' },
    { id: 'alipay', name: t('Alipay'), icon: '🇨🇳' },
    { id: 'wechat_pay', name: t('WeChat Pay'), icon: '💬' },
    { id: 'klarna', name: t('Klarna'), icon: '🛍️' },
    { id: 'ideal', name: t('iDEAL'), icon: '🇳🇱' },
    { id: 'sofort', name: t('SOFORT'), icon: '🏦' },
    { id: 'bancontact', name: t('Bancontact'), icon: '🇧🇪' },
    { id: 'giropay', name: t('Giropay'), icon: '🇩🇪' },
    { id: 'eps', name: t('EPS'), icon: '🇦🇹' },
    { id: 'p24', name: t('Przelewy24'), icon: '🇵🇱' }
  ];

  return (
    <FormGroup>
      <Label>{t('Payment Method')}</Label>
      <PaymentMethodGrid>
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            $isSelected={selectedMethod === method.id}
            onClick={() => onMethodSelect(method.id)}
          >
            <div style={{ fontSize: '24px', marginBottom: theme.spacing.xs }}>
              {method.icon}
            </div>
            <div style={{ fontSize: '12px', fontWeight: '500' }}>
              {method.name}
            </div>
          </PaymentMethodCard>
        ))}
      </PaymentMethodGrid>
    </FormGroup>
  );
};

const ProRataDisplay = ({ 
  proRataInfo, 
  isUpgrade,
  t 
}: { 
  proRataInfo: ProRataInfo | null; 
  isUpgrade: boolean;
  t: any;
}) => {
  if (!proRataInfo || !isUpgrade) return null;

  return (
    <ProRataInfo>
      <div style={{ fontWeight: 'bold', marginBottom: theme.spacing.sm, color: theme.colors.success }}>
        {t('✓ Today\'s Charge Calculation')}
      </div>
      <div style={{ fontSize: '14px', color: theme.colors.text.secondary }}>
        <div>{t('Current plan credit: {{credit}}', { credit: formatCurrency(proRataInfo.proRataCredit) })}</div>
        <div>{t('New plan charge: {{charge}}', { charge: formatCurrency(proRataInfo.proRataCharge) })}</div>
        <div style={{ fontWeight: 'bold', marginTop: theme.spacing.xs, color: theme.colors.text.primary }}>
          {proRataInfo.netAmount > 0 
            ? t('Amount due today: {{amount}}', { amount: formatCurrency(proRataInfo.netAmount) })
            : t('No charge today (credit covers upgrade)')
          }
        </div>
        <div style={{ fontSize: '12px', marginTop: theme.spacing.xs }}>
          {t('({{days}} days remaining in billing cycle)', { days: proRataInfo.daysRemainingInCycle })}
        </div>
      </div>
    </ProRataInfo>
  );
};

const PaymentModal = ({ 
  showStripe, 
  paymentData, 
  loading, 
  selectedTier, 
  customGB, 
  albumCount,
  subscriptionInfo,
  onClose, 
  onSubmit, 
  onInputChange,
  t 
}: {
  showStripe: boolean;
  paymentData: PaymentData;
  loading: boolean;
  selectedTier: number;
  customGB: string;
  albumCount: number;
  subscriptionInfo: SubscriptionInfo | null;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (field: string, value: string) => void;
  t: any;
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [proRataInfo, setProRataInfo] = useState<ProRataInfo | null>(null);

  const targetTier = customGB && !isNaN(parseFloat(customGB)) 
    ? selectTierForGB(parseFloat(customGB), albumCount) 
    : selectedTier;
  
  const targetGB = getTotalStorage(targetTier);
  const price = getPrice(targetTier);
  const currentTier = subscriptionInfo?.intNumberOfSubscriptions || 0;
  const isUpgrade = targetTier > currentTier;

  // Calculate pro-rata when modal opens for upgrades
  React.useEffect(() => {
    if (showStripe && isUpgrade && subscriptionInfo) {
      StripeService.calculateProRata(
        currentTier.toString(), 
        targetTier.toString(), 
        'sub_mock_subscription_id'
      ).then(setProRataInfo);
    } else {
      setProRataInfo(null);
    }
  }, [showStripe, isUpgrade, currentTier, targetTier, subscriptionInfo]);

  if (!showStripe) return null;

  return (
    <>
      <StripeOverlay onClick={() => !loading && onClose()} />
      <StripeContainer>
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
          <h3 style={{ margin: 0, marginBottom: theme.spacing.sm }}>
            {isUpgrade ? t('Upgrade to {{gb}} GB', { gb: targetGB }) : t('Change to {{gb}} GB', { gb: targetGB })}
          </h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: theme.colors.primary }}>
            {formatCurrency(price)} {t('/ month')}
          </div>
          {isUpgrade && proRataInfo && proRataInfo.netAmount > 0 && (
            <div style={{ 
              fontSize: '14px', 
              color: theme.colors.text.secondary, 
              marginTop: theme.spacing.sm,
              fontStyle: 'italic'
            }}>
              {t('{{amount}} due today (with pro-rata credit)', { amount: formatCurrency(proRataInfo.netAmount) })}
            </div>
          )}
          <div style={{ 
            fontSize: '12px', 
            color: theme.colors.text.secondary, 
            marginTop: theme.spacing.md,
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.background.primary,
            borderRadius: theme.borderRadius.small,
            border: `1px solid ${theme.colors.border}`
          }}>
            {t('You will be automatically billed {{amount}} monthly on this card unless you change your payment method.', { amount: formatCurrency(price) })}
          </div>
        </div>

        <ProRataDisplay proRataInfo={proRataInfo} isUpgrade={isUpgrade} t={t} />

        <PaymentMethodSelector 
          selectedMethod={selectedPaymentMethod}
          onMethodSelect={setSelectedPaymentMethod}
          t={t}
        />

        {selectedPaymentMethod === 'card' && (
          <div>
            <FormGroup>
              <Label>{t('Card Number')}</Label>
              <Input
                type="text"
                placeholder={t('1234 5678 9012 3456')}
                value={paymentData.cardNumber}
                onChange={(e) => onInputChange('cardNumber', e.target.value)}
                required
                disabled={loading}
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: theme.spacing.md }}>
              <FormGroup style={{ flex: 1 }}>
                <Label>{t('Expiry Date')}</Label>
                <Input
                  type="text"
                  placeholder={t('MM/YY')}
                  value={paymentData.expiryDate}
                  onChange={(e) => onInputChange('expiryDate', e.target.value)}
                  required
                  disabled={loading}
                />
              </FormGroup>

              <FormGroup style={{ flex: 1 }}>
                <Label>{t('CVC')}</Label>
                <Input
                  type="text"
                  placeholder={t('123')}
                  value={paymentData.cvc}
                  onChange={(e) => onInputChange('cvc', e.target.value)}
                  required
                  disabled={loading}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Label>{t('Cardholder Name')}</Label>
              <Input
                type="text"
                placeholder={t('John Doe')}
                value={paymentData.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                required
                disabled={loading}
              />
            </FormGroup>
          </div>
        )}

        {(selectedPaymentMethod === 'alipay' || selectedPaymentMethod === 'wechat_pay') && (
          <div style={{
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.background.primary,
            borderRadius: theme.borderRadius.medium,
            textAlign: 'center',
            margin: `${theme.spacing.md} 0`
          }}>
            <div style={{ fontSize: '48px', marginBottom: theme.spacing.md }}>
              {selectedPaymentMethod === 'alipay' ? '🇨🇳' : '💬'}
            </div>
            <div style={{ fontWeight: 'bold', marginBottom: theme.spacing.sm }}>
              {selectedPaymentMethod === 'alipay' ? t('Alipay Payment') : t('WeChat Pay')}
            </div>
            <div style={{ fontSize: '14px', color: theme.colors.text.secondary }}>
              {t('You will be redirected to complete payment')}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
          <Button 
            onClick={onSubmit} 
            disabled={loading || (selectedPaymentMethod === 'card' && (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.name))}
            size="large"
          >
            {loading && <LoadingSpinner />}
            {loading 
              ? t('Processing...') 
              : isUpgrade && proRataInfo && proRataInfo.netAmount > 0
                ? t('Pay {{amount}} Today', { amount: formatCurrency(proRataInfo.netAmount) })
                : isUpgrade && proRataInfo && proRataInfo.netAmount === 0
                  ? t('Start Subscription (No charge today)')
                  : isUpgrade
                    ? t('Start {{amount}}/month Subscription', { amount: formatCurrency(price) })
                    : t('Confirm Change')
            }
          </Button>
          <Button 
            variant="secondary" 
            onClick={onClose}
            disabled={loading}
          >
            {t('Cancel')}
          </Button>
        </div>

        <div style={{ 
          marginTop: theme.spacing.lg, 
          padding: theme.spacing.md, 
          backgroundColor: theme.colors.background.primary, 
          borderRadius: theme.borderRadius.small,
          textAlign: 'center',
          fontSize: '12px',
          color: theme.colors.text.secondary 
        }}>
          {t('🔒 Secure payment powered by Stripe')}
        </div>
      </StripeContainer>
    </>
  );
};

// ===== MAIN COMPONENT =====
const StorageManagePageContent = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  const { folders, subscriptionInfo, calculatedBytesUsed } = useFolderManagement((message: string) => console.log(message));
  const albumCount = folders.length;
  const isSubscriptionInfoLoaded = subscriptionInfo !== null;
  
  // State
  const [selectedTier, setSelectedTier] = useState<number>(subscriptionInfo?.intNumberOfSubscriptions || 0);
  const [isPlanSelected, setIsPlanSelected] = useState<boolean>(false);
  const [showStripe, setShowStripe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [customGB, setCustomGB] = useState<string>('');
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '', expiryDate: '', cvc: '', name: ''
  });

  // Custom hooks
  const { canDowngrade, generatePlans } = useSubscriptionLogic(subscriptionInfo, calculatedBytesUsed, albumCount, t);
  const plans = useMemo(() => isSubscriptionInfoLoaded ? generatePlans() : [], [isSubscriptionInfoLoaded, generatePlans]);

  // Handlers
  const handleCustomGBChange = useCallback((value: string): void => {
    setCustomGB(value);
    const gbValue = parseFloat(value);
    if (value && !isNaN(gbValue) && gbValue > 0) {
      const targetTier = selectTierForGB(Math.max(gbValue, 10), albumCount);
      setSelectedTier(targetTier);
      setIsPlanSelected(false);
    } else if (!value) {
      setSelectedTier(subscriptionInfo?.intNumberOfSubscriptions || 0);
      setIsPlanSelected(false);
    }
  }, [subscriptionInfo, albumCount]);

  const handlePlanSelect = useCallback((plan: Plan): void => {
    if (plan.isInsufficient) return;
    
    // Check if this plan is currently selected
    const isCurrentlySelected = isPlanSelected && 
                                selectedTier === plan.subscriptions && 
                                !customGB;
    
    if (isCurrentlySelected) {
      // Deselect the plan - revert to current subscription tier
      setSelectedTier(subscriptionInfo?.intNumberOfSubscriptions || 0);
      setIsPlanSelected(false);
    } else {
      // Select the new plan
      setSelectedTier(plan.subscriptions);
      setIsPlanSelected(true);
    }
    
    // Always clear custom GB when clicking on a plan
    setCustomGB('');
  }, [isPlanSelected, selectedTier, customGB, subscriptionInfo]);

  const handleCancelSubscription = useCallback(async () => {
    setLoading(true);
    try {
      // Call Stripe to cancel subscription without pro-rata refund
      await StripeService.cancelSubscription('sub_mock_subscription_id', true);
      
      setTimeout(() => {
        setSelectedTier(0);
        setCustomGB('');
        setIsPlanSelected(false);
        setLoading(false);
        alert(t('Successfully scheduled downgrade to free plan at end of billing period.'));
      }, 2000);
    } catch (error) {
      setLoading(false);
      alert(t('Error processing downgrade. Please try again.'));
    }
  }, [t]);

  const handleSubscriptionChange = useCallback(() => {
    if (!subscriptionInfo) return;

    let targetTier: number;
    
    if (customGB && !isNaN(parseFloat(customGB))) {
      const inputGB = parseFloat(customGB);
      if (inputGB <= 0) {
        alert(t('Please enter a positive number'));
        return;
      }
      if (inputGB < 10) {
        alert(t('Minimum storage capacity is 10 GB'));
        return;
      }
      targetTier = selectTierForGB(inputGB, albumCount);
    } else {
      targetTier = selectedTier;
    }
    
    if (targetTier === subscriptionInfo.intNumberOfSubscriptions) return;

    const downgradeResult = canDowngrade(targetTier);
    if (!downgradeResult.canDowngrade) {
      alert(downgradeResult.reason || t('Cannot select this plan'));
      return;
    }

    if (targetTier === 0) {
      if (window.confirm(t('Are you sure you want to downgrade to the free plan? This will take effect at the end of your current billing period.'))) {
        handleCancelSubscription();
      }
    } else {
      setShowStripe(true);
    }
  }, [subscriptionInfo, customGB, selectedTier, albumCount, canDowngrade, handleCancelSubscription, t]);

  const handleStripeSubmit = useCallback(async () => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.name) {
      alert(t('Please fill in all payment fields.'));
      return;
    }
    
    setLoading(true);
    
    try {
      let targetTier: number;
      if (customGB && !isNaN(parseFloat(customGB))) {
        const inputGB = parseFloat(customGB);
        if (inputGB < 10) {
          alert(t('Minimum storage capacity is 10 GB'));
          setLoading(false);
          return;
        }
        targetTier = selectTierForGB(inputGB, albumCount);
      } else {
        targetTier = selectedTier;
      }

      const currentTier = subscriptionInfo?.intNumberOfSubscriptions || 0;
      const isUpgrade = targetTier > currentTier;
      const finalPrice = getPrice(targetTier);

      // Create payment intent
      const paymentIntent = await StripeService.createPaymentIntent(
        Math.round(finalPrice * 100), // Convert to cents
        'usd',
        ['card', 'alipay', 'wechat_pay']
      );

      console.log('Payment intent created:', paymentIntent.clientSecret);

      // Update subscription with pro-rata for upgrades, none for downgrades
      const prorationBehavior = isUpgrade ? 'create_prorations' : 'none';
      await StripeService.updateSubscription(
        'sub_mock_subscription_id',
        `price_${targetTier}`,
        prorationBehavior
      );

      setTimeout(() => {
        console.log('Subscription updated to tier:', targetTier);
        setLoading(false);
        setShowStripe(false);
        setCustomGB('');
        setIsPlanSelected(false);
        
        if (isUpgrade) {
          alert(t('Payment successful! Your subscription has been upgraded with pro-rata credit applied.'));
        } else {
          alert(t('Subscription updated successfully! Changes take effect immediately.'));
        }
        
        setTimeout(() => {
          redirectTo(generateUrl('my-albums.html'));
        }, 1500);
      }, 3000);
    } catch (error) {
      setLoading(false);
      alert(t('Payment failed. Please try again.'));
    }
  }, [paymentData, customGB, selectedTier, albumCount, subscriptionInfo, t]);

  const handleInputChange = useCallback((field: string, value: string): void => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    }
    
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
    }
    
    if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setPaymentData(prev => ({ ...prev, [field]: formattedValue }));
  }, []);

  const getButtonText = useCallback(() => {
    if (!subscriptionInfo) return t('Change Plan');
    
    const currentTier = subscriptionInfo.intNumberOfSubscriptions;
    let targetTier: number;
    
    if (customGB && !isNaN(parseFloat(customGB))) {
      const inputGB = parseFloat(customGB);
      
      if (inputGB < bytesToGB(calculatedBytesUsed)) {
        return t('Change Plan');
      }
      
      targetTier = selectTierForGB(Math.max(inputGB, 10), albumCount);
    } else {
      targetTier = selectedTier;
    }
    
    if (targetTier === currentTier) return t('Current Plan');
    if (targetTier > currentTier) return t('Upgrade (Pro-rata Credit)');
    if (targetTier === 0) return t('Downgrade To Free (End of Period)');
    return t('Change Plan (Immediate)');
  }, [subscriptionInfo, customGB, selectedTier, calculatedBytesUsed, albumCount, t]);

  const isButtonDisabled = useMemo(() => {
    if (!subscriptionInfo) return true;
    
    if (customGB && !isNaN(parseFloat(customGB))) {
      const inputGB = parseFloat(customGB);
      if (inputGB <= 0) return true;
      
      const targetTier = selectTierForGB(Math.max(inputGB, 10), albumCount);
      const currentTier = subscriptionInfo.intNumberOfSubscriptions;
      
      if (targetTier === currentTier) return true;
      if (inputGB < bytesToGB(calculatedBytesUsed)) return true;
    }
    
    return (
      (!isPlanSelected && !customGB) ||
      (selectedTier === subscriptionInfo.intNumberOfSubscriptions && !customGB) ||
      loading ||
      Boolean(customGB && (isNaN(parseFloat(customGB)) || parseFloat(customGB) <= 0)) ||
      Boolean(plans.find(p => p.subscriptions === selectedTier)?.isInsufficient)
    );
  }, [subscriptionInfo, isPlanSelected, customGB, selectedTier, loading, plans, calculatedBytesUsed, albumCount]);

  return (
    <PageContainer $isRTL={isRTL}>
      <div style={{ marginBottom: theme.spacing.md, textAlign: 'right' }}>
        <BackButton onClick={() => redirectTo(generateUrl('my-albums.html'))}>
          {t('← Back To Albums')}
        </BackButton>
      </div>

      <StorageUsageCard subscriptionInfo={subscriptionInfo} calculatedBytesUsed={calculatedBytesUsed} t={t} />

      <Card>
        <SectionTitle>{t('Select Storage Capacity')}</SectionTitle>
        <div style={{ 
          fontSize: '14px', 
          color: theme.colors.text.secondary, 
          marginBottom: theme.spacing.md,
          fontStyle: 'italic'
        }}>
          {t('Paid tiers have unlimited albums and are limited only by storage. Upgrades include pro-rata credit for unused time.')}
        </div>

        {isSubscriptionInfoLoaded ? (
          <>
            <PlanSelectionGrid 
              plans={plans}
              selectedTier={selectedTier}
              isPlanSelected={isPlanSelected}
              customGB={customGB}
              onPlanSelect={handlePlanSelect}
              t={t}
            />

            <CustomGBInput 
              customGB={customGB}
              onCustomGBChange={handleCustomGBChange}
              subscriptionInfo={subscriptionInfo}
              calculatedBytesUsed={calculatedBytesUsed}
              albumCount={albumCount}
              t={t}
            />

            <div style={{ marginTop: theme.spacing.lg, textAlign: 'center' }}>
              <Button onClick={handleSubscriptionChange} disabled={isButtonDisabled}>
                {loading && <LoadingSpinner />}
                {getButtonText()}
              </Button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: theme.spacing.lg }}>
            <LoadingSpinner />
            <span style={{ marginLeft: theme.spacing.sm, color: theme.colors.text.secondary }}>
              {t('Loading subscription plans...')}
            </span>
          </div>
        )}
      </Card>

      <PaymentModal
        showStripe={showStripe}
        paymentData={paymentData}
        loading={loading}
        selectedTier={selectedTier}
        customGB={customGB}
        albumCount={albumCount}
        subscriptionInfo={subscriptionInfo}
        onClose={() => setShowStripe(false)}
        onSubmit={handleStripeSubmit}
        onInputChange={handleInputChange}
        t={t}
      />
    </PageContainer>
  );
};

const StorageManagePage = () => (
  <I18nProvider>
    <StorageManagePageContent />
  </I18nProvider>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<StorageManagePage />);