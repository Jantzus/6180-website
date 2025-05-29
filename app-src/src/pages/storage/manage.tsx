import { useState } from 'react';
import ReactDOM from "react-dom/client";
import styled from 'styled-components';
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n"; // Correct import path matching photos.tsx
import { redirectTo, generateUrl } from "@/lib/utils";

// TypeScript interfaces
interface DirectionalProps {
  isRTL: boolean;
}

interface StorageProgressProps {
  percentage: number;
}

interface PlanCardProps {
  isSelected: boolean;
}

interface ButtonProps {
  variant?: 'danger' | 'secondary';
  disabled?: boolean;
}

interface SubscriptionInfo {
  intNumberOfSubscriptions: number;
  bytesOfDataUsed: number;
  SubscriptionStatus: string;
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
}

// Mock user data
const useMockUserData = () => {
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo>({
    intNumberOfSubscriptions: 2, // Start with tier 2 (20GB)
    bytesOfDataUsed: 5 * 1024 * 1024 * 1024, // 5GB used
    SubscriptionStatus: 'active'
  });

  return { subscriptionInfo, setSubscriptionInfo };
};

// Styled components using the same theme system
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

const PageContainer = styled.div<DirectionalProps>`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.background.primary};
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  direction: ${props => props.isRTL ? 'rtl' : 'ltr'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  color: ${theme.colors.text.primary};
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
  border: 2px solid ${props => props.isSelected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.medium};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.isSelected ? theme.colors.background.highlight : theme.colors.white};

  &:hover {
    border-color: ${theme.colors.primary};
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

const StorageManagePageContent = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  const { subscriptionInfo, setSubscriptionInfo } = useMockUserData();
  
  // Convert subscription tier to GB for display
  const subscriptionToGB = (subscriptions: number): number => {
    if (subscriptions === 0) return 0.5; // 500 MB = 0.5 GB
    return subscriptions * 10; // Each subscription tier = 10 GB
  };

  // Convert GB input to subscription tier (rounds up to next available plan)
  const gbToSubscription = (gb: number): number => {
    if (gb <= 0.5) return 0; // Free tier
    return Math.ceil(gb / 10); // Round up to next 10GB tier
  };

  // Get the actual GB amount for a plan (rounds up user input)
  const getRoundedGB = (inputGB: number): number => {
    if (inputGB <= 0.5) return 0.5; // Free tier
    return Math.ceil(inputGB / 10) * 10; // Round up to next 10GB tier
  };

  const [selectedGB, setSelectedGB] = useState<number>(subscriptionToGB(subscriptionInfo.intNumberOfSubscriptions));
  const [showStripe, setShowStripe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [customGB, setCustomGB] = useState<string>('');
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: ''
  });

  const freeStorageMB = 500; // Free tier is 500 MB
  
  // Calculate total storage based on subscription tier
  const getTotalStorage = (subscriptions: number) => {
    if (subscriptions === 0) return freeStorageMB / 1024; // 500 MB in GB
    return subscriptions * 10; // 10 GB per subscription
  };
  
  // Calculate price for subscription tier
  const getPrice = (subscriptions: number) => {
    if (subscriptions === 0) return 0;
    return 1.00 + 0.75 * (subscriptions - 1);
  };

  // Calculate price from GB
  const getPriceFromGB = (gb: number) => {
    const subscriptions = gbToSubscription(gb);
    return getPrice(subscriptions);
  };
  
  const totalGB = getTotalStorage(subscriptionInfo.intNumberOfSubscriptions);
  const totalMB = totalGB * 1024; // Convert GB to MB for display
  const usagePercentage = (subscriptionInfo.bytesOfDataUsed / (totalGB * 1024 * 1024 * 1024)) * 100;
  const usedMB = subscriptionInfo.bytesOfDataUsed / (1024 * 1024);

  // Generate plan options - show current tier, 1 below, and 2 above (in GB)
  const generatePlans = (): Plan[] => {
    const currentGB = subscriptionToGB(subscriptionInfo.intNumberOfSubscriptions);
    const plans: Plan[] = [];
    
    // Determine the range of GB to show
    const minGB = currentGB === 0.5 ? 0.5 : Math.max(0.5, currentGB - 10); // 1 tier below current
    const maxGB = Math.min(100, currentGB + 20); // 2 tiers above current (max 100GB)
    
    // Always include free tier
    if (minGB <= 0.5) {
      plans.push({
        id: 0,
        price: t('Free'),
        subscriptions: 0,
        storageGB: 0.5
      });
    }
    
    // Add paid tiers in 10GB increments
    for (let gb = 10; gb <= maxGB; gb += 10) {
      const subscriptions = gbToSubscription(gb);
      const price = getPrice(subscriptions);
      plans.push({
        id: subscriptions,
        price: t('US${{price}} / month', { price: price.toFixed(2) }),
        subscriptions: subscriptions,
        storageGB: gb
      });
    }
    
    return plans;
  };

  const plans = generatePlans();

  const canDowngrade = (targetGB: number): boolean => {
    const targetSubscriptions = gbToSubscription(targetGB);
    const targetStorageBytes = targetSubscriptions === 0 
      ? freeStorageMB * 1024 * 1024 
      : targetSubscriptions * 10 * 1024 * 1024 * 1024;
    return subscriptionInfo.bytesOfDataUsed <= targetStorageBytes;
  };

  const handlePlanSelect = (planGB: number): void => {
    // Only allow selection of plans that have sufficient storage
    if (canDowngrade(planGB)) {
      setSelectedGB(planGB);
      setCustomGB(''); // Clear custom GB when selecting a predefined plan
    }
  };

  const handleCustomGBChange = (value: string): void => {
    setCustomGB(value);
    const gbValue = parseFloat(value);
    if (value && !isNaN(gbValue) && gbValue >= 0.5) {
      const roundedGB = getRoundedGB(gbValue);
      setSelectedGB(roundedGB);
    }
  };

  const handleSubscriptionChange = () => {
    const targetGB = customGB && !isNaN(parseFloat(customGB)) ? getRoundedGB(parseFloat(customGB)) : selectedGB;
    const targetSubscriptions = gbToSubscription(targetGB);
    
    if (targetSubscriptions === subscriptionInfo.intNumberOfSubscriptions) {
      return; // No change
    }

    if (!canDowngrade(targetGB)) {
      alert(t('Cannot select this plan: You would exceed the storage limit. Please delete some files first.'));
      return;
    }

    if (targetSubscriptions === 0) {
      // Downgrading to free tier
      if (window.confirm(t('Are you sure you want to downgrade to the free plan?'))) {
        handleCancelSubscription();
      }
    } else {
      // Upgrading or changing subscription
      setShowStripe(true);
    }
  };

  const handleCancelSubscription = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubscriptionInfo((prev: SubscriptionInfo) => ({
        ...prev,
        intNumberOfSubscriptions: 0,
        SubscriptionStatus: 'canceled'
      }));
      setSelectedGB(0.5);
      setCustomGB('');
      setLoading(false);
      alert(t('Successfully downgraded to free plan.'));
    }, 2000);
  };

  const handleStripeSubmit = () => {
    // Basic validation
    if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.name) {
      alert(t('Please fill in all payment fields.'));
      return;
    }
    
    setLoading(true);
    const targetGB = customGB && !isNaN(parseFloat(customGB)) ? getRoundedGB(parseFloat(customGB)) : selectedGB;
    const targetSubscriptions = gbToSubscription(targetGB);

    // Simulate Stripe payment processing
    setTimeout(() => {
      // Mock successful payment
      setSubscriptionInfo((prev: SubscriptionInfo) => ({
        ...prev,
        intNumberOfSubscriptions: targetSubscriptions,
        SubscriptionStatus: 'active'
      }));
      
      setLoading(false);
      setShowStripe(false);
      setCustomGB('');
      alert(t('Payment successful! Your subscription has been updated.'));
      
      // Redirect back to my-albums after a short delay
      setTimeout(() => {
        redirectTo(generateUrl('my-albums.html'));
      }, 1500);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string): void => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().substring(0, 19);
    }
    
    // Format expiry date with slash
    if (field === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
    }
    
    // Limit CVC to 3-4 digits
    if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4);
    }
    
    setPaymentData((prev: PaymentData) => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  return (
    <PageContainer isRTL={isRTL}>
      <Header>
        <Title>{t('Storage Management')}</Title>
        <BackButton onClick={() => redirectTo(generateUrl('my-albums.html'))}>
          {t('← Back to Albums')}
        </BackButton>
      </Header>

      {/* Current Storage Usage */}
      <Card>
        <StorageInfo>
          <strong><span>{totalMB < 1024 ? `${Math.round(totalMB)} MB` : `${Math.round(totalMB)} MB`}</span></strong>
          <span>{t('US${{price}} / month', { price: getPrice(subscriptionInfo.intNumberOfSubscriptions).toFixed(2) })}</span>
        </StorageInfo>
        <StorageInfo>
          <span>{t('Used: {{used}} MB', { used: Math.round(usedMB) })}</span>
          <span>{t('Total: {{total}} MB', { total: Math.round(totalMB) })}</span>
        </StorageInfo>
        <StorageBar>
          <StorageProgress percentage={usagePercentage} />
        </StorageBar>
      </Card>

      {/* Plan Selection */}
      <Card>
        <SectionTitle>{t('Select Store Capacity')}</SectionTitle>
        <PlanGrid>
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              isSelected={selectedGB === plan.storageGB && !customGB}
              onClick={() => handlePlanSelect(plan.storageGB)}
            >
              <PlanTitle>{plan.storageGB === 0.5 ? t('500 MB') : t('{{gb}} GB', { gb: plan.storageGB })}</PlanTitle>
              <PlanPrice>{plan.price}</PlanPrice>
            </PlanCard>
          ))}
        </PlanGrid>

        {/* Custom GB Input */}
        <div style={{ marginTop: theme.spacing.lg }}>
          <Label>{t('Number of GB Needed:')}</Label>
          <div style={{ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.sm }}>
            <Input
              type="number"
              min="0.5"
              step="0.5"
              placeholder={t('e.g. 15')}
              value={customGB}
              onChange={(e) => handleCustomGBChange(e.target.value)}
              style={{ width: '120px' }}
            />
            <span style={{ fontSize: '14px', color: theme.colors.text.secondary }}>
              {customGB && !isNaN(parseFloat(customGB)) && parseFloat(customGB) >= 0.5
                ? (() => {
                    const inputGB = parseFloat(customGB);
                    const roundedGB = getRoundedGB(inputGB);
                    const price = getPriceFromGB(roundedGB);
                    if (roundedGB <= 0.5) {
                      return t('500 MB - Free');
                    } else if (inputGB !== roundedGB) {
                      return t('{{gb}} GB - US${{price}} / month', { gb: roundedGB, price: price.toFixed(2) });
                    } else {
                      return t('{{gb}} GB - US${{price}} / month', { gb: roundedGB, price: price.toFixed(2) });
                    }
                  })()
                : ''
              }
            </span>
          </div>
        </div>

        <div style={{ marginTop: theme.spacing.lg, textAlign: 'center' }}>
          <Button
            onClick={handleSubscriptionChange}
            disabled={
              (selectedGB === subscriptionToGB(subscriptionInfo.intNumberOfSubscriptions) && !customGB) || 
              loading ||
              Boolean(customGB && (isNaN(parseFloat(customGB)) || parseFloat(customGB) < 0.5))
            }
          >
            {loading && <LoadingSpinner />}
            {(() => {
              const targetGB = customGB && !isNaN(parseFloat(customGB)) ? getRoundedGB(parseFloat(customGB)) : selectedGB;
              const currentGB = subscriptionToGB(subscriptionInfo.intNumberOfSubscriptions);
              if (targetGB === currentGB) return t('Current Plan');
              if (targetGB > currentGB) return t('Upgrade');
              if (targetGB <= 0.5) return t('Downgrade To Free');
              return t('Change Plan');
            })()}
          </Button>
        </div>
      </Card>

      {/* Stripe Payment Modal */}
      {showStripe && (
        <>
          <StripeOverlay onClick={() => !loading && setShowStripe(false)} />
          <StripeContainer>
            <div style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}>
              <h3 style={{ margin: 0, marginBottom: theme.spacing.sm }}>{(() => {
                  const targetGB = customGB && !isNaN(parseFloat(customGB)) ? getRoundedGB(parseFloat(customGB)) : selectedGB;
                  return t('{{gb}} GB - US${{price}} / month', { gb: targetGB, price: getPriceFromGB(targetGB).toFixed(2) });
                })()}</h3>
            </div>

            <div>
              <FormGroup>
                <Label>{t('Card Number')}</Label>
                <Input
                  type="text"
                  placeholder={t('1234 5678 9012 3456')}
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
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
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
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
                    onChange={(e) => handleInputChange('cvc', e.target.value)}
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
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  disabled={loading}
                />
              </FormGroup>

              <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
                <Button 
                  onClick={handleStripeSubmit} 
                  disabled={loading || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvc || !paymentData.name}
                >
                  {loading && <LoadingSpinner />}
                  {loading ? t('Processing...') : t('Pay')}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowStripe(false)}
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
      )}
    </PageContainer>
  );
};

// Wrap StorageManagePageContent with I18nProvider - following photos.tsx pattern
const StorageManagePage = () => {
  return (
    <I18nProvider>
      <StorageManagePageContent />
    </I18nProvider>
  );
};

// Initialize the app - same pattern as photos.tsx
ReactDOM.createRoot(document.getElementById("root")!).render(<StorageManagePage />);