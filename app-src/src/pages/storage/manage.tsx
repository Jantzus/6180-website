import React, { useState, useMemo, useCallback } from 'react';
import ReactDOM from "react-dom/client";
import styled from 'styled-components';
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { redirectTo, generateUrl, checkLoginWithRefresh } from "@/lib/utils";
import { useFolderManagement } from "../my-albums/utils";
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";

// ===== TYPE DEFINITIONS =====

// Extend Window interface to include Stripe
declare global {
  interface Window {
    Stripe: (publishableKey: string) => any;
  }
}

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
  $variant?: 'danger' | 'secondary' | 'success';
  disabled?: boolean;
  $size?: 'small' | 'medium' | 'large';
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

interface PaymentIntentResponse {
  id: string;
  clientSecret: string;
  proration: ProRataInfo;
}

type PaymentMethod = 'card' | 'alipay' | 'wechat_pay' | 'klarna' | 'ideal' | 'sofort' | 'bancontact' | 'giropay' | 'eps' | 'p24';

interface PaymentMethodConfig {
  requiresElement: boolean;
  redirects: boolean;
  description: string;
  minimumAmount?: number;
  supportedCountries?: string[];
  supportedCurrencies?: string[];
}

// ===== GRAPHQL MUTATIONS =====
const CREATE_PAYMENT_INTENT_MUTATION = `
  mutation CreatePaymentIntentWithProration($input: CreatePaymentIntentWithProrationInput!) {
    changeMySubscription(createPaymentIntentWithProration: $input) {
      ... on PaymentIntentResponse {
        id
        clientSecret
        proration {
          currentMonthlyPrice
          newMonthlyPrice
          daysRemainingInCycle
          totalDaysInCycle
          proRataCredit
          proRataCharge
          netAmount
        }
      }
    }
  }
`;

const UPDATE_SUBSCRIPTION_MUTATION = `
  mutation UpdateSubscription($input: UpdateSubscriptionInput!) {
    changeMySubscription(updateSubscription: $input) {
      ... on SubscriptionInfo {
        id
        intNumberOfSubscriptions
        currentPeriodEndEpochTime
      }
    }
  }
`;

// ===== STRIPE SERVICE =====
class StripeService {
  // Initialize Stripe with publishable key
  static async initializeStripe(publishableKey: string): Promise<any> {
    // Load Stripe.js dynamically
    if (!window.Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      document.head.appendChild(script);
      
      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }
    
    return window.Stripe(publishableKey);
  }

  // Create payment intent with proration through GraphQL
  static async createPaymentIntentWithProration(targetTier: number, paymentMethodTypes: string[] = ['card']): Promise<PaymentIntentResponse> {
    const token = await checkLoginWithRefresh();
    if (!token) {
      throw new Error('Authentication failed');
    }

    const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: CREATE_PAYMENT_INTENT_MUTATION,
        variables: {
          input: {
            targetTier,
            currency: 'usd',
            paymentMethodTypes
          }
        }
      }),
    });

    const json = await response.json();
    
    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      throw new Error(json.errors[0]?.message || "Failed to create payment intent");
    }

    return json.data?.changeMySubscription;
  }

  // Update subscription through GraphQL
  static async updateSubscription(newTier: number, prorationBehavior: string = 'create_prorations'): Promise<any> {
    const token = await checkLoginWithRefresh();
    if (!token) {
      throw new Error('Authentication failed');
    }

    const response = await fetch(AWS_PRIVATE_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: UPDATE_SUBSCRIPTION_MUTATION,
        variables: {
          input: {
            newTier,
            prorationBehavior
          }
        }
      }),
    });

    const json = await response.json();
    
    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      throw new Error(json.errors[0]?.message || "Failed to update subscription");
    }

    return json.data?.changeMySubscription;
  }

  // Confirm payment based on payment method type
  static async confirmPayment(stripe: any, paymentMethod: PaymentMethod, clientSecret: string, cardElement?: any): Promise<any> {
    const returnUrl = `${window.location.origin}${window.location.pathname}?payment_return=true`;

    switch (paymentMethod) {
      case 'card':
        if (!cardElement) {
          throw new Error('Card element not initialized');
        }
        return await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: cardElement }
        });

      case 'alipay':
        return await stripe.confirmAlipayPayment(clientSecret, {
          return_url: returnUrl
        });

      case 'wechat_pay':
        return await stripe.confirmWechatPayPayment(clientSecret, {
          payment_method_options: {
            wechat_pay: { client: 'web' }
          }
        });

      case 'klarna':
        return await stripe.confirmKlarnaPayment(clientSecret, {
          payment_method: {
            billing_details: {
              email: 'customer@example.com' // You should collect this from user
            }
          },
          return_url: returnUrl
        });

      case 'ideal':
        return await stripe.confirmIdealPayment(clientSecret, {
          payment_method: {
            ideal: { bank: 'abn_amro' } // You could let user select bank
          },
          return_url: returnUrl
        });

      case 'sofort':
        return await stripe.confirmSofortPayment(clientSecret, {
          payment_method: {
            sofort: { country: 'DE' } // Should be determined by user location
          },
          return_url: returnUrl
        });

      case 'bancontact':
        return await stripe.confirmBancontactPayment(clientSecret, {
          payment_method: {
            billing_details: { name: 'Customer Name' } // Collect from user
          },
          return_url: returnUrl
        });

      case 'giropay':
        return await stripe.confirmGiropayPayment(clientSecret, {
          payment_method: {
            billing_details: { name: 'Customer Name' } // Collect from user
          },
          return_url: returnUrl
        });

      case 'eps':
        return await stripe.confirmEpsPayment(clientSecret, {
          payment_method: {
            eps: { bank: 'arzte_und_apotheker_bank' } // Let user select bank
          },
          return_url: returnUrl
        });

      case 'p24':
        return await stripe.confirmP24Payment(clientSecret, {
          payment_method: {
            billing_details: {
              email: 'customer@example.com' // Collect from user
            }
          },
          return_url: returnUrl
        });

      default:
        throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }
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

const getPaymentMethodConfig = (method: PaymentMethod): PaymentMethodConfig => {
  const configs: Record<PaymentMethod, PaymentMethodConfig> = {
    card: {
      requiresElement: true,
      redirects: false,
      description: 'Credit or debit card',
    },
    alipay: {
      requiresElement: false,
      redirects: true,
      description: 'Popular in China',
      minimumAmount: 0.50,
      supportedCurrencies: ['usd', 'eur', 'gbp', 'cad', 'aud', 'sgd'],
    },
    wechat_pay: {
      requiresElement: false,
      redirects: false,
      description: 'Popular in China',
      minimumAmount: 0.50,
      supportedCurrencies: ['usd', 'cny'],
    },
    klarna: {
      requiresElement: false,
      redirects: true,
      description: 'Buy now, pay later',
      minimumAmount: 1.00,
      supportedCountries: ['AT', 'BE', 'DK', 'FI', 'FR', 'DE', 'IT', 'NL', 'NO', 'ES', 'SE', 'GB', 'US'],
    },
    ideal: {
      requiresElement: false,
      redirects: true,
      description: 'Dutch bank transfer',
      supportedCountries: ['NL'],
      minimumAmount: 0.50,
    },
    sofort: {
      requiresElement: false,
      redirects: true,
      description: 'German bank transfer',
      supportedCountries: ['DE', 'AT'],
      minimumAmount: 0.50,
    },
    bancontact: {
      requiresElement: false,
      redirects: true,
      description: 'Belgian bank transfer',
      supportedCountries: ['BE'],
      minimumAmount: 0.50,
    },
    giropay: {
      requiresElement: false,
      redirects: true,
      description: 'German bank transfer',
      supportedCountries: ['DE'],
      minimumAmount: 0.50,
    },
    eps: {
      requiresElement: false,
      redirects: true,
      description: 'Austrian bank transfer',
      supportedCountries: ['AT'],
      minimumAmount: 0.50,
    },
    p24: {
      requiresElement: false,
      redirects: true,
      description: 'Polish bank transfer',
      supportedCountries: ['PL'],
      minimumAmount: 0.50,
    },
  };
  
  return configs[method];
};

// Detect user's country (you might want to use a more sophisticated method)
const getUserCountry = (): string => {
  // This is a simple fallback - you might want to use IP geolocation or user profile
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone.includes('Europe/Amsterdam')) return 'NL';
  if (timezone.includes('Europe/Berlin')) return 'DE';
  if (timezone.includes('Europe/Vienna')) return 'AT';
  if (timezone.includes('Europe/Brussels')) return 'BE';
  if (timezone.includes('Europe/Warsaw')) return 'PL';
  return 'US'; // Default to US
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
    if (props.$variant === 'danger') return theme.colors.danger;
    if (props.$variant === 'secondary') return 'transparent';
    if (props.$variant === 'success') return theme.colors.success;
    return theme.colors.primary;
  }};
  color: ${props => {
    if (props.$variant === 'secondary') return theme.colors.primary;
    return theme.colors.white;
  }};
  border: ${props => {
    if (props.$variant === 'secondary') return `1px solid ${theme.colors.primary}`;
    return 'none';
  }};
  padding: ${props => {
    if (props.$size === 'small') return '8px 16px';
    if (props.$size === 'large') return '16px 32px';
    return '12px 24px';
  }};
  border-radius: ${theme.borderRadius.medium};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: ${props => {
    if (props.$size === 'small') return '14px';
    if (props.$size === 'large') return '18px';
    return '16px';
  }};
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  margin-right: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${props => {
      if (props.$variant === 'danger') return '#c62828';
      if (props.$variant === 'secondary') return theme.colors.background.highlight;
      if (props.$variant === 'success') return '#388e3c';
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

const StripeElementContainer = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  padding: 10px 12px;
  margin-bottom: ${theme.spacing.md};
  background-color: ${theme.colors.white};

  .StripeElement {
    width: 100%;
  }

  .StripeElement--focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
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
  amount,
  currency = 'usd',
  userCountry = 'US',
  t 
}: { 
  selectedMethod: PaymentMethod; 
  onMethodSelect: (method: PaymentMethod) => void;
  amount: number;
  currency?: string;
  userCountry?: string;
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

  // Filter payment methods based on availability
  const availablePaymentMethods = paymentMethods.filter(method => {
    const config = getPaymentMethodConfig(method.id);
    
    // Check minimum amount
    if (config.minimumAmount && amount < config.minimumAmount) {
      return false;
    }
    
    // Check supported countries
    if (config.supportedCountries && !config.supportedCountries.includes(userCountry)) {
      return false;
    }
    
    // Check supported currencies
    if (config.supportedCurrencies && !config.supportedCurrencies.includes(currency.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <FormGroup>
      <Label>{t('Payment Method')}</Label>
      <PaymentMethodGrid>
        {availablePaymentMethods.map((method) => {
          const config = getPaymentMethodConfig(method.id);
          
          return (
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
              {config.description && (
                <div style={{ 
                  fontSize: '10px', 
                  color: theme.colors.text.secondary,
                  marginTop: '4px'
                }}>
                  {t(config.description)}
                </div>
              )}
            </PaymentMethodCard>
          );
        })}
      </PaymentMethodGrid>
      
      {getPaymentMethodConfig(selectedMethod)?.redirects && (
        <div style={{
          fontSize: '12px',
          color: theme.colors.text.secondary,
          textAlign: 'center',
          marginTop: theme.spacing.sm,
          fontStyle: 'italic'
        }}>
          {t('You will be redirected to complete this payment')}
        </div>
      )}
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
  loading, 
  selectedTier, 
  customGB, 
  albumCount,
  subscriptionInfo,
  onClose, 
  onPaymentSuccess,
  setLoading,
  t 
}: {
  showStripe: boolean;
  loading: boolean;
  selectedTier: number;
  customGB: string;
  albumCount: number;
  subscriptionInfo: SubscriptionInfo | null;
  onClose: () => void;
  onPaymentSuccess: () => void;
  setLoading: (loading: boolean) => void;
  t: any;
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [proRataInfo, setProRataInfo] = useState<ProRataInfo | null>(null);
  const [stripe, setStripe] = useState<any>(null);
  const [cardElement, setCardElement] = useState<any>(null);

  const targetTier = customGB && !isNaN(parseFloat(customGB)) 
    ? selectTierForGB(parseFloat(customGB), albumCount) 
    : selectedTier;
  
  const targetGB = getTotalStorage(targetTier);
  const price = getPrice(targetTier);
  const currentTier = subscriptionInfo?.intNumberOfSubscriptions || 0;
  const isUpgrade = targetTier > currentTier;
  const userCountry = getUserCountry();

  // Initialize Stripe when modal opens
  React.useEffect(() => {
    if (showStripe && !stripe) {
      const initStripe = async () => {
        try {
          const stripeInstance = await StripeService.initializeStripe(
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_51O77MNA5szNEcsv6LqXfWX0BY2V8mBwAXnaBHcmdwsBHUaeXlQjlqRq3ELWFaycPzQvCRYOyz3sg3x2EkZ7ifRnR00QewJDIRL'
          );
          setStripe(stripeInstance);
          
          if (selectedPaymentMethod === 'card') {
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
            
            setTimeout(() => {
              if (document.getElementById('card-element')) {
                cardElementInstance.mount('#card-element');
              }
            }, 100);
          }
        } catch (error) {
          console.error('Failed to initialize Stripe:', error);
        }
      };
      
      initStripe();
    }
  }, [showStripe, stripe, selectedPaymentMethod]);

  // Handle payment method changes
  React.useEffect(() => {
    if (stripe && selectedPaymentMethod === 'card' && !cardElement) {
      const elementsInstance = stripe.elements();
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
      
      setTimeout(() => {
        if (document.getElementById('card-element')) {
          cardElementInstance.mount('#card-element');
        }
      }, 100);
    } else if (selectedPaymentMethod !== 'card' && cardElement) {
      cardElement.unmount();
      setCardElement(null);
    }
  }, [selectedPaymentMethod, stripe, cardElement]);

  // Get proration info when modal opens for upgrades
  React.useEffect(() => {
    if (showStripe && isUpgrade && subscriptionInfo) {
      const fetchProRata = async () => {
        try {
          if (subscriptionInfo.intNumberOfSubscriptions > 0) {
            const paymentIntent = await StripeService.createPaymentIntentWithProration(targetTier, [selectedPaymentMethod]);
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
  }, [showStripe, isUpgrade, currentTier, targetTier, subscriptionInfo, selectedPaymentMethod]);

  // Cleanup Stripe elements when modal closes
  React.useEffect(() => {
    return () => {
      if (cardElement) {
        cardElement.unmount();
      }
    };
  }, [cardElement]);

  // Handle payment completion from redirects
  React.useEffect(() => {
    const handlePaymentCompletion = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentReturn = urlParams.get('payment_return');
      const paymentIntentClientSecret = urlParams.get('payment_intent_client_secret');
      
      if (paymentReturn === 'true' && paymentIntentClientSecret && stripe) {
        try {
          setLoading(true);
          const { paymentIntent } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);
          
          if (paymentIntent.status === 'succeeded') {
            // Get stored target tier
            const storedTargetTier = localStorage.getItem('pendingSubscriptionTier');
            if (storedTargetTier) {
              const prorationBehavior = (currentTier > 0 && parseInt(storedTargetTier) > currentTier) ? 'create_prorations' : 'none';
              await StripeService.updateSubscription(parseInt(storedTargetTier), prorationBehavior);
              localStorage.removeItem('pendingSubscriptionTier');
              
              // Clean up URL parameters
              const cleanUrl = window.location.href.split('?')[0];
              window.history.replaceState({}, document.title, cleanUrl);
              
              onPaymentSuccess();
            }
          } else if (paymentIntent.status === 'requires_payment_method') {
            alert(t('Payment failed. Please try again with a different payment method.'));
          }
        } catch (error) {
          console.error('Error handling payment completion:', error);
          alert(t('There was an issue processing your payment. Please contact support.'));
        } finally {
          setLoading(false);
        }
      }
    };

    if (showStripe) {
      handlePaymentCompletion();
    }
  }, [showStripe, stripe, currentTier, onPaymentSuccess, setLoading, t]);

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
      }

      const currentTier = subscriptionInfo?.intNumberOfSubscriptions || 0;
      const isUpgrade = finalTargetTier > currentTier;

      // Store target tier for redirect-based payments
      if (getPaymentMethodConfig(selectedPaymentMethod)?.redirects) {
        localStorage.setItem('pendingSubscriptionTier', finalTargetTier.toString());
      }

      // Create payment intent with selected payment method
      const paymentIntent = await StripeService.createPaymentIntentWithProration(
        finalTargetTier, 
        [selectedPaymentMethod]
      );

      if (!stripe) {
        throw new Error('Stripe not properly initialized');
      }

      // Confirm payment using the appropriate method
      const result = await StripeService.confirmPayment(
        stripe, 
        selectedPaymentMethod, 
        paymentIntent.clientSecret, 
        cardElement
      );

      const { error, paymentIntent: confirmedPayment } = result;

      if (error) {
        throw new Error(error.message);
      }

      // Handle different payment statuses
      if (confirmedPayment?.status === 'succeeded') {
        // Payment completed immediately
        const prorationBehavior = (currentTier > 0 && isUpgrade) ? 'create_prorations' : 'none';
        await StripeService.updateSubscription(finalTargetTier, prorationBehavior);
        setLoading(false);
        onPaymentSuccess();
      } else if (confirmedPayment?.status === 'requires_action' || confirmedPayment?.status === 'requires_source_action') {
        // For redirect-based payments, user will be redirected
        // Payment completion will be handled when they return
        setLoading(false);
      } else if (confirmedPayment?.status === 'processing') {
        // Payment is being processed (common for bank transfers)
        setLoading(false);
        alert(t('Payment is being processed. You will receive confirmation once completed.'));
        onClose();
      } else {
        throw new Error('Payment was not successful');
      }

    } catch (error) {
      setLoading(false);
      console.error('Payment error:', error);
      alert(t('Payment failed. Please try again.'));
    }
  };

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
          {isUpgrade && proRataInfo && subscriptionInfo && subscriptionInfo.intNumberOfSubscriptions > 0 && proRataInfo.netAmount > 0 && (
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
            {t('You will be automatically billed {{amount}} monthly on this payment method unless you change it.', { amount: formatCurrency(price) })}
          </div>
        </div>

        <ProRataDisplay proRataInfo={proRataInfo} isUpgrade={isUpgrade} t={t} />

        <PaymentMethodSelector 
          selectedMethod={selectedPaymentMethod}
          onMethodSelect={setSelectedPaymentMethod}
          amount={price}
          currency="usd"
          userCountry={userCountry}
          t={t}
        />

        {selectedPaymentMethod === 'card' && (
          <FormGroup>
            <Label>{t('Card Information')}</Label>
            <StripeElementContainer>
              <div id="card-element" />
            </StripeElementContainer>
          </FormGroup>
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
              {selectedPaymentMethod === 'alipay' 
                ? t('You will be redirected to complete payment')
                : t('Scan QR code with WeChat to complete payment')
              }
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
          <Button 
            onClick={handleStripeSubmit} 
            disabled={loading || (selectedPaymentMethod === 'card' && !cardElement)}
            $size="large"
          >
            {loading && <LoadingSpinner />}
            {loading 
              ? t('Processing...') 
              : isUpgrade && proRataInfo && subscriptionInfo && subscriptionInfo.intNumberOfSubscriptions > 0 && proRataInfo.netAmount > 0
                ? t('Pay {{amount}} Today', { amount: formatCurrency(proRataInfo.netAmount) })
                : isUpgrade && proRataInfo && subscriptionInfo && subscriptionInfo.intNumberOfSubscriptions > 0 && proRataInfo.netAmount === 0
                  ? t('Start Subscription (No charge today)')
                  : isUpgrade
                    ? t('Start {{amount}}/month Subscription', { amount: formatCurrency(price) })
                    : t('Confirm Change')
            }
          </Button>
          <Button 
            $variant="secondary" 
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
      await StripeService.updateSubscription(0, 'none');
      
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

  const handlePaymentSuccess = useCallback(() => {
    setShowStripe(false);
    setCustomGB('');
    setIsPlanSelected(false);
    
    alert(t('Payment successful! Your subscription has been updated.'));
    
    // Redirect immediately to my-albums
    redirectTo(generateUrl('my-albums.html'));
  }, [t]);

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
        loading={loading}
        selectedTier={selectedTier}
        customGB={customGB}
        albumCount={albumCount}
        subscriptionInfo={subscriptionInfo}
        onClose={() => setShowStripe(false)}
        onPaymentSuccess={handlePaymentSuccess}
        setLoading={setLoading}
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