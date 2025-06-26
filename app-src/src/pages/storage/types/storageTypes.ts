// Stripe types
export interface StripeInstance {
  elements: () => StripeElements;
  confirmCardPayment: (clientSecret: string, options: StripeCardPaymentOptions) => Promise<StripePaymentResult>;
  retrievePaymentIntent: (clientSecret: string) => Promise<{ paymentIntent: StripePaymentIntent }>;
}

export interface StripeElements {
  create: (type: string, options?: StripeElementOptions) => StripeElement;
}

export interface StripeElement {
  mount: (domElement: string | Element) => void;
  unmount: () => void;
}

export interface StripeElementOptions {
  style?: {
    base?: {
      fontSize?: string;
      color?: string;
      '::placeholder'?: {
        color?: string;
      };
    };
  };
}

export interface StripePaymentResult {
  error?: { message: string };
  paymentIntent?: StripePaymentIntent;
}

export interface StripePaymentIntent {
  status: 'succeeded' | 'requires_payment_method' | 'requires_action' | 'requires_source_action' | 'processing';
}

export interface StripeCardPaymentOptions {
  payment_method: {
    card: StripeElement;
  };
}

// Extend Window interface to include Stripe
declare global {
  interface Window {
    Stripe: (publishableKey: string) => StripeInstance;
  }
}

// Business logic types
export interface Plan {
  id: number;
  price: string;
  subscriptions: number;
  storageGB: number;
  isInsufficient: boolean;
  isCurrent: boolean;
  insufficientReason?: string;
}

export interface SubscriptionInfo {
  intNumberOfSubscriptions: number;
  bytesOfDataUsed: number;
}

export interface ProRataInfo {
  currentMonthlyPrice: number;
  newMonthlyPrice: number;
  daysRemainingInCycle: number;
  totalDaysInCycle: number;
  proRataCredit: number;
  proRataCharge: number;
  netAmount: number;
}

export interface PaymentIntentResponse {
  id: string;
  clientSecret: string;
  proration: ProRataInfo;
}

// Simplified to only support card payments
export type PaymentMethod = 'card';

export interface PaymentMethodConfig {
  requiresElement: boolean;
  redirects: boolean;
  description: string;
}