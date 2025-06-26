import { useState, useEffect, useMemo, useCallback } from 'react';
import ReactDOM from "react-dom/client";
import { I18nProvider } from "@/lib/i18n/context";
import { useTranslation } from "@/lib/i18n/hooks";
import { getLanguageDirection } from "@/lib/i18n";
import { redirectTo, generateUrl } from "@/lib/utils";
import { useFolderManagement } from "@/lib/useFolderManagement";
import {
  Card
} from "@/styles/components/layout";
import { 
  Button, 
  BackButton
} from '@/styles/components/buttons'
import { 
  PageContainer,
  SectionTitle,
  LoadingSpinner
} from './components/styled/StorageStyledComponents';
import { StorageUsageCard } from './components/StorageUsageCard';
import { CustomGBInput } from './components/CustomGBInput';
import { PlanSelectionGrid } from './components/PlanSelectionGrid';
import { PaymentModal } from './components/PaymentModal';
import { useIntlAPIs } from './hooks/useSSRSafeHooks';
import { useSubscriptionLogic } from './hooks/useSubscriptionLogic';
import { Plan } from './types/storageTypes';
import { selectTierForGB, bytesToGB } from './utils/storageUtils';

export const StorageManagePageContent = () => {
  const { t, language } = useTranslation();
  const isRTL = getLanguageDirection(language) === "rtl";
  
  // Use SSR-safe hooks
  const { formatCurrency } = useIntlAPIs();
  
  const { folders, subscriptionInfo, calculatedBytesUsed } = useFolderManagement((message: string) => console.log(message));
  const albumCount = folders.length;
  const isSubscriptionInfoLoaded = subscriptionInfo !== null;
  
  // State
  const [selectedTier, setSelectedTier] = useState<number>(0); // Default to 0 for SSR
  const [isPlanSelected, setIsPlanSelected] = useState<boolean>(false);
  const [showStripe, setShowStripe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [customGB, setCustomGB] = useState<string>('');

  // Update selectedTier when subscriptionInfo loads
  useEffect(() => {
    if (subscriptionInfo && selectedTier === 0) {
      setSelectedTier(subscriptionInfo.intNumberOfSubscriptions);
    }
  }, [subscriptionInfo, selectedTier]);

  // Custom hooks
  const { generatePlans } = useSubscriptionLogic(subscriptionInfo, calculatedBytesUsed, albumCount, t);
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

  const handleSubscriptionChange = useCallback(() => {
    if (!subscriptionInfo) return;

    let targetTier: number;
    const isCustomGBInput = customGB && !isNaN(parseFloat(customGB));
    
    if (isCustomGBInput) {
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
      // Only allow upgrades through plan grid
      if (targetTier < subscriptionInfo.intNumberOfSubscriptions) {
        alert(t('Use the custom GB input below to select a smaller plan.'));
        return;
      }
    }
    
    if (targetTier === subscriptionInfo.intNumberOfSubscriptions) return;

    // Check if requested storage is sufficient for current usage
    const usedGB = bytesToGB(calculatedBytesUsed);
    const targetGB = targetTier * 10; // Simple calculation for target storage
    
    if (targetGB < usedGB) {
      alert(t('This capacity is insufficient for your current usage. Please select a larger capacity or delete some files first.'));
      return;
    }

    // Handle downgrades differently
    if (targetTier < subscriptionInfo.intNumberOfSubscriptions) {
      if (typeof window !== 'undefined' && window.confirm && window.confirm(t('Are you sure you want to change to a smaller plan? This will take effect at the end of your current billing period.'))) {
        // For downgrades, we would call a different service method
        // For now, we'll use the same flow but this could be customized
        setShowStripe(true);
      }
    } else {
      // Upgrades
      setShowStripe(true);
    }
  }, [subscriptionInfo, customGB, selectedTier, albumCount, calculatedBytesUsed, t]);

  const handlePaymentSuccess = useCallback(() => {
    setShowStripe(false);
    setCustomGB('');
    setIsPlanSelected(false);
    
    alert(t('Payment successful! Your subscription has been updated.'));
    
    // Redirect immediately to my-albums
    redirectTo(generateUrl('my-albums.html'));
  }, [t]);

  const getButtonText = useCallback(() => {
    if (!subscriptionInfo) return t('Select Plan');
    
    const currentTier = subscriptionInfo.intNumberOfSubscriptions;
    let targetTier: number;
    
    if (customGB && !isNaN(parseFloat(customGB))) {
      const inputGB = parseFloat(customGB);
      
      if (inputGB < bytesToGB(calculatedBytesUsed)) {
        return t('Select Plan');
      }
      
      targetTier = selectTierForGB(Math.max(inputGB, 10), albumCount);
    } else {
      targetTier = selectedTier;
    }
    
    if (targetTier === currentTier) return t('Current Plan');
    if (targetTier > currentTier) return t('Upgrade (Pro-rata Credit)');
    if (targetTier < currentTier) return t('Change Plan (End of Period)');
    return t('Select Plan');
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
      // Allow downgrades for custom GB input
    } else {
      // For plan grid selections, only allow upgrades
      if (selectedTier < subscriptionInfo.intNumberOfSubscriptions) return true;
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
      <div style={{ marginBottom: '16px', textAlign: isRTL ? 'right' : 'left' }}>
        <BackButton onClick={() => redirectTo(generateUrl('my-albums.html'))}>
          {t('← Back To Albums')}
        </BackButton>
      </div>

      <StorageUsageCard 
        subscriptionInfo={subscriptionInfo} 
        calculatedBytesUsed={calculatedBytesUsed} 
        t={t} 
        formatCurrency={formatCurrency}
      />

      <Card>
        <SectionTitle>{t('Select Your Storage Plan')}</SectionTitle>
        <div style={{ 
          fontSize: '14px', 
          color: '#666', 
          marginBottom: '16px',
          fontStyle: 'italic'
        }}>
          {t('Choose the plan that best fits your needs. You can select from the options below or enter a custom amount.')}
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
              formatCurrency={formatCurrency}
            />

            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <Button onClick={handleSubscriptionChange} disabled={isButtonDisabled} $primary>
                {loading && <LoadingSpinner />}
                {getButtonText()}
              </Button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '24px' }}>
            <LoadingSpinner />
            <span style={{ marginLeft: '8px', color: '#666' }}>
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
        formatCurrency={formatCurrency}
      />
    </PageContainer>
  );
};

export const StorageManagePage = () => (
  <I18nProvider>
    <StorageManagePageContent />
  </I18nProvider>
);

// SSR-safe initialization
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<StorageManagePage />);
  }
}