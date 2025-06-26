import { useState, useEffect, useCallback } from 'react';

// Hook for safe localStorage access
export const useLocalStorage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getItem = useCallback((key: string): string | null => {
    if (!isClient || typeof localStorage === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [isClient]);

  const setItem = useCallback((key: string, value: string): void => {
    if (!isClient || typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [isClient]);

  const removeItem = useCallback((key: string): void => {
    if (!isClient || typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [isClient]);

  return { getItem, setItem, removeItem, isClient };
};

// Hook for safe Intl API access with SSR-safe defaults
export const useIntlAPIs = () => {
  // Default to US for SSR (desktop assumption)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatCurrency = useCallback((amount: number, currency: string = 'USD'): string => {
    if (!isClient || typeof Intl === 'undefined') {
      // SSR-safe fallback
      return `$${amount.toFixed(2)}`;
    }
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(amount);
    } catch {
      // Fallback for when Intl is not available
      return `$${amount.toFixed(2)}`;
    }
  }, [isClient]);

  return { formatCurrency, isClient };
};

// Hook for safe URL operations
export const useURLOperations = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getURLParams = useCallback((): URLSearchParams | null => {
    if (!isClient || typeof window === 'undefined') return null;
    try {
      return new URLSearchParams(window.location.search);
    } catch {
      return null;
    }
  }, [isClient]);

  const getCurrentURL = useCallback((): { origin: string; pathname: string } | null => {
    if (!isClient || typeof window === 'undefined') {
      return null;
    }
    try {
      return {
        origin: window.location.origin,
        pathname: window.location.pathname
      };
    } catch {
      return null;
    }
  }, [isClient]);

  const replaceURL = useCallback((url: string): void => {
    if (!isClient || typeof window === 'undefined' || typeof document === 'undefined') return;
    try {
      window.history.replaceState({}, document.title || '', url);
    } catch {
      // Silently fail if history API is not available
    }
  }, [isClient]);

  return { getURLParams, getCurrentURL, replaceURL, isClient };
};