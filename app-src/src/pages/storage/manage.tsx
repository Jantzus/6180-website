import { useState, useMemo, useCallback } from 'react';
import ReactDOM from "react-dom/client";
import styled from 'styled-components';
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { redirectTo, generateUrl } from "@/lib/utils";
import { useFolderManagement } from "../my-albums/utils";

// ===== TYPE DEFINITIONS =====
interface DirectionalProps {
  isRTL: boolean;
}

interface StorageProgressProps {
  percentage: number;
}

interface PlanCardProps {
  isSelected: boolean;
  isInsufficient?: boolean;
}

interface ButtonProps {
  variant?: 'danger' | 'secondary';
  disabled?: boolean;
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
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
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
    if (props.percentage > 90) return theme.colors.danger;
    if (props.percentage > 75) return theme.colors.warning;
    return theme.colors.primary;
  }};
  width: ${props => Math.min(props.percentage, 100)}%;
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
  border: 2px solid ${props => {
    if (props.isInsufficient) return theme.colors.danger;
    return props.isSelected ? theme.colors.primary : theme.colors.border;
  }};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  cursor: ${props => props.isInsufficient ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  background-color: ${props => {
    if (props.isInsufficient) return '#ffebee';
    return props.isSelected ? theme.colors.background.highlight : theme.colors.white;
  }};
  opacity: ${props => props.isInsufficient ? 0.7 : 1};
  position: relative;

  &:hover {
    border-color: ${props => {
      if (props.isInsufficient) return theme.colors.danger;
      return theme.colors.primary;
    }};
  }
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
  padding: 12px 24px;
  border-radius: ${theme.borderRadius.medium};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};
  margin-right: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${props => {
      if (props.variant === 'danger') return '#c62828';
      if (props.variant === 'secondary') return theme.colors.background.highlight;
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
  padding: ${theme.spacing.xl};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  min-width: 400px;
  max-width: 90vw;
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

// ===== CUSTOM HOOKS =====
const useSubscriptionLogic = (subscriptionInfo: SubscriptionInfo | null, albumCount: number, t: any) => {
  const canDowngrade = useCallback((targetTier: number) => {
    if (!subscriptionInfo) {
      return { canDowngrade: false, reason: t('Loading subscription information...') };
    }

    const targetStorageGB = getTotalStorage(targetTier);
    const targetStorageBytes = targetStorageGB * 1024 * 1024 * 1024;
    const hasEnoughStorage = subscriptionInfo.bytesOfDataUsed <= targetStorageBytes;
    
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
  }, [subscriptionInfo, albumCount, t]);

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
const StorageUsageCard = ({ subscriptionInfo, t }: { subscriptionInfo: SubscriptionInfo | null; t: any }) => {
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
  const usagePercentage = (subscriptionInfo.bytesOfDataUsed / (totalGB * 1024 * 1024 * 1024)) * 100;
  const price = getPrice(subscriptionInfo.intNumberOfSubscriptions);

  return (
    <Card>
      <StorageInfo>
        <strong><span>{formatStorageDisplay(totalGB * 1024 * 1024 * 1024)}</span></strong>
        <span>{t('US${{price}} / month', { price: price.toFixed(2) })}</span>
      </StorageInfo>
      <StorageInfo>
        <span>{t('Used: {{used}}', { used: formatStorageDisplay(subscriptionInfo.bytesOfDataUsed) })}</span>
        <span>{t('Total: {{total}}', { total: formatStorageDisplay(totalGB * 1024 * 1024 * 1024) })}</span>
      </StorageInfo>
      <StorageBar>
        <StorageProgress percentage={usagePercentage} />
      </StorageBar>
    </Card>
  );
};

const CustomGBInput = ({ 
  customGB, 
  onCustomGBChange, 
  subscriptionInfo, 
  albumCount,
  t 
}: { 
  customGB: string; 
  onCustomGBChange: (value: string) => void; 
  subscriptionInfo: SubscriptionInfo | null;
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
      // Check if the minimum (10 GB) matches current plan
      const minTargetTier = selectTierForGB(10, albumCount);
      if (minTargetTier === currentTier) {
        return <span style={{ color: theme.colors.text.secondary }}>{t('Current Plan')}</span>;
      } else {
        return <span style={{ color: theme.colors.warning }}>{t('Minimum: 10 GB')}</span>;
      }
    }
    
    const usedGB = bytesToGB(subscriptionInfo.bytesOfDataUsed);
    
    if (inputGB < usedGB) {
      return (
        <span style={{ color: theme.colors.danger, fontWeight: 'bold' }}>
          {t('Error: You are using {{used}}', { used: formatStorageDisplay(subscriptionInfo.bytesOfDataUsed) })}
        </span>
      );
    }
    
    const targetTier = selectTierForGB(inputGB, albumCount);
    const actualGB = getTotalStorage(targetTier);
    const price = getPrice(targetTier);
    
    // Check if target tier matches current tier
    if (targetTier === currentTier) {
      return <span style={{ color: theme.colors.text.secondary }}>{t('Current Plan')}</span>;
    }
    
    if (targetTier === 0) {
      return <span style={{ color: theme.colors.success, fontWeight: 'bold' }}>{t('10 GB - Free')}</span>;
    } else {
      return (
        <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
          {t('{{gb}} GB - US${{price}} / month', { gb: actualGB, price: price.toFixed(2) })}
        </span>
      );
    }
  };

  const showErrorMessage = customGB && !isNaN(parseFloat(customGB)) && subscriptionInfo && 
                          parseFloat(customGB) < bytesToGB(subscriptionInfo.bytesOfDataUsed);

  return (
    <div style={{ marginTop: theme.spacing.lg }}>
      <Label 
        style={{ fontWeight: 'bold' }}
      >
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
          isSelected={isPlanSelected && selectedTier === plan.subscriptions && !customGB && !plan.isInsufficient}
          isInsufficient={plan.isInsufficient}
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

const PaymentModal = ({ 
  showStripe, 
  paymentData, 
  loading, 
  selectedTier, 
  customGB, 
  albumCount,
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
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (field: string, value: string) => void;
  t: any;
}) => {
  if (!showStripe) return null;

  const targetTier = customGB && !isNaN(parseFloat(customGB)) 
    ? selectTierForGB(parseFloat(customGB), albumCount) 
    : selectedTier;
  
  const targetGB = getTotalStorage(targetTier);
  const price = getPrice(targetTier);

  return (
    <>
      <StripeOverlay onClick={() => !loading && onClose()} />
      <StripeContainer>
        <div style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
          <h3 style={{ margin: 0, marginBottom: theme.spacing.sm }}>
            {t('{{gb}} GB - US${{price}} / month', { gb: targetGB, price: price.toFixed(2) })}
          </h3>
        </div>

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

          <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
            <Button 
              onClick={onSubmit} 
              disabled={loading || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.name}
            >
              {loading && <LoadingSpinner />}
              {loading ? t('Processing...') : t('Pay')}
            </Button>
            <Button 
              variant="secondary" 
              onClick={onClose}
              disabled={loading}
            >
              {t('Cancel')}
            </Button>
          </div>
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
          {t('🔒 Demo payment - no real charges')}
        </div>
      </StripeContainer>
    </>
  );
};

// ===== MAIN COMPONENT =====
const StorageManagePageContent = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  const { folders, subscriptionInfo } = useFolderManagement((message: string) => console.log(message));
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
  const { canDowngrade, generatePlans } = useSubscriptionLogic(subscriptionInfo, albumCount, t);
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
    setSelectedTier(plan.subscriptions);
    setCustomGB('');
    setIsPlanSelected(true);
  }, []);

  const handleCancelSubscription = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setSelectedTier(0);
      setCustomGB('');
      setIsPlanSelected(false);
      setLoading(false);
      alert(t('Successfully downgraded to free plan.'));
    }, 2000);
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
      if (window.confirm(t('Are you sure you want to downgrade to the free plan?'))) {
        handleCancelSubscription();
      }
    } else {
      setShowStripe(true);
    }
  }, [subscriptionInfo, customGB, selectedTier, albumCount, canDowngrade, handleCancelSubscription, t]);

  const handleStripeSubmit = useCallback(() => {
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.name) {
      alert(t('Please fill in all payment fields.'));
      return;
    }
    
    setLoading(true);
    
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

    setTimeout(() => {
      console.log('Would update subscription to tier:', targetTier);
      setLoading(false);
      setShowStripe(false);
      setCustomGB('');
      setIsPlanSelected(false);
      alert(t('Payment successful! Your subscription has been updated.'));
      
      setTimeout(() => {
        redirectTo(generateUrl('my-albums.html'));
      }, 1500);
    }, 3000);
  }, [paymentData, customGB, selectedTier, albumCount, t]);

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
      
      if (inputGB < bytesToGB(subscriptionInfo.bytesOfDataUsed)) {
        return t('Change Plan');
      }
      
      targetTier = selectTierForGB(Math.max(inputGB, 10), albumCount);
    } else {
      targetTier = selectedTier;
    }
    
    if (targetTier === currentTier) return t('Current Plan');
    if (targetTier > currentTier) return t('Upgrade');
    if (targetTier === 0) return t('Downgrade To Free');
    return t('Change Plan');
  }, [subscriptionInfo, customGB, selectedTier, albumCount, t]);

  const isButtonDisabled = useMemo(() => {
    if (!subscriptionInfo) return true;
    
    // If custom GB is entered, check if it results in current plan
    if (customGB && !isNaN(parseFloat(customGB))) {
      const inputGB = parseFloat(customGB);
      if (inputGB <= 0) return true;
      
      const targetTier = selectTierForGB(Math.max(inputGB, 10), albumCount);
      const currentTier = subscriptionInfo.intNumberOfSubscriptions;
      
      // If target tier equals current tier, disable button
      if (targetTier === currentTier) return true;
      
      // Check if input is less than currently used storage
      if (inputGB < bytesToGB(subscriptionInfo.bytesOfDataUsed)) return true;
    }
    
    return (
      (!isPlanSelected && !customGB) ||
      (selectedTier === subscriptionInfo.intNumberOfSubscriptions && !customGB) ||
      loading ||
      Boolean(customGB && (isNaN(parseFloat(customGB)) || parseFloat(customGB) <= 0)) ||
      Boolean(plans.find(p => p.subscriptions === selectedTier)?.isInsufficient)
    );
  }, [subscriptionInfo, isPlanSelected, customGB, selectedTier, loading, plans, albumCount]);

  return (
    <PageContainer isRTL={isRTL}>
      <div style={{ marginBottom: theme.spacing.md, textAlign: 'right' }}>
        <BackButton onClick={() => redirectTo(generateUrl('my-albums.html'))}>
          {t('← Back To Albums')}
        </BackButton>
      </div>

      <StorageUsageCard subscriptionInfo={subscriptionInfo} t={t} />

      <Card>
        <SectionTitle>{t('Select Storage Capacity')}</SectionTitle>

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