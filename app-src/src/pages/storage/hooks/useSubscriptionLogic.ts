import { useCallback } from 'react';
import { SubscriptionInfo, Plan } from '../types/storageTypes';
import { getTotalStorage, getPrice } from '../utils/storageUtils';

export const useSubscriptionLogic = (
  subscriptionInfo: SubscriptionInfo | null, 
  calculatedBytesUsed: number, 
  albumCount: number, 
  t: (key: string, vars?: Record<string, string | number>) => string
) => {
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
    
    const addPlan = (tier: number) => {
      const gb = getTotalStorage(tier);
      const price = getPrice(tier);
      
      plans.push({
        id: tier,
        price: tier === 0 ? t('Free') : t('US${{price}} / month', { price: price.toFixed(2) }),
        subscriptions: tier,
        storageGB: gb,
        isInsufficient: false, // Upgrades should never be insufficient
        isCurrent: false,
        insufficientReason: undefined
      });
    };
    
    // Only add upgrade options (tiers above current tier)
    // Show up to 3 upgrade options
    for (let tier = currentTier + 1; tier <= currentTier + 3; tier++) {
      addPlan(tier);
    }
    
    return plans.sort((a, b) => a.subscriptions - b.subscriptions);
  }, [subscriptionInfo, t]);

  return { canDowngrade, generatePlans };
};