import { PaymentMethodConfig } from '../types/storageTypes';

// Storage calculation utilities
export const bytesToGB = (bytes: number): number => bytes / (1024 * 1024 * 1024);

export const formatStorageDisplay = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  const gb = bytes / (1024 * 1024 * 1024);
  const tb = bytes / (1024 * 1024 * 1024 * 1024);

  if (tb >= 1) return `${tb.toFixed(1)} TB`;
  if (gb >= 1) return `${gb.toFixed(1)} GB`;
  return `${Math.round(mb)} MB`;
};

export const getTotalStorage = (tier: number): number => {
  if (tier <= 1) return 10;
  return tier * 10;
};

export const getPrice = (tier: number): number => {
  if (tier === 0) return 0;
  return 1.00 + 0.75 * (tier - 1);
};

export const selectTierForGB = (requestedGB: number, albumCount: number): number => {
  if (requestedGB <= 10) {
    return albumCount <= 5 ? 0 : 1;
  }
  return Math.ceil(requestedGB / 10);
};

// Simplified to only support card payments
export const getPaymentMethodConfig = (): PaymentMethodConfig => {
  return {
    requiresElement: true,
    redirects: false,
    description: 'Credit or debit card',
  };
};