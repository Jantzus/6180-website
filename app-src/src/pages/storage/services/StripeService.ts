import { checkLoginWithRefresh } from "@/lib/utils";
import { AWS_PRIVATE_GRAPHQL_ENDPOINT } from "@/lib/config";
import { 
  StripeInstance, 
  StripeElement, 
  PaymentMethod, 
  PaymentIntentResponse,
  SubscriptionInfo,
  StripePaymentResult
} from '../types/storageTypes';
import { 
  CREATE_PAYMENT_INTENT_MUTATION, 
  UPDATE_SUBSCRIPTION_MUTATION,
  STRIPE_PUBLISHABLE_KEY 
} from '../constants/storageConstants';

export class StripeService {
  // Initialize Stripe with publishable key - SSR safe
  static async initializeStripe(publishableKey: string = STRIPE_PUBLISHABLE_KEY): Promise<StripeInstance> {
    // Early guard - this method should only be called in browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      throw new Error('Browser environment required for Stripe initialization');
    }

    // Type-safe access to browser APIs
    const globalWindow = window as typeof window & { Stripe?: (key: string) => StripeInstance };
    const globalDocument = document as typeof document;

    // Load Stripe.js dynamically if not already loaded
    if (!globalWindow.Stripe) {
      const script = globalDocument.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      globalDocument.head.appendChild(script);
      
      await new Promise((resolve) => {
        script.onload = resolve;
      });
    }
    
    if (!globalWindow.Stripe) {
      throw new Error('Failed to load Stripe.js');
    }
    
    return globalWindow.Stripe(publishableKey);
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
  static async updateSubscription(newTier: number, prorationBehavior: string = 'create_prorations'): Promise<SubscriptionInfo> {
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

  // Simplified to only handle card payments
  static async confirmPayment(
    stripe: StripeInstance, 
    paymentMethod: PaymentMethod, 
    clientSecret: string, 
    cardElement: StripeElement
  ): Promise<StripePaymentResult> {
    if (paymentMethod !== 'card') {
      throw new Error(`Unsupported payment method: ${paymentMethod}`);
    }

    if (!cardElement) {
      throw new Error('Card element not initialized');
    }

    return await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement }
    });
  }
}