// GraphQL Mutations
export const CREATE_PAYMENT_INTENT_MUTATION = `
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

export const UPDATE_SUBSCRIPTION_MUTATION = `
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

// Stripe configuration
export const STRIPE_PUBLISHABLE_KEY = 
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  'pk_live_51O77MNA5szNEcsv6LqXfWX0BY2V8mBwAXnaBHcmdwsBHUaeXlQjlqRq3ELWFaycPzQvCRYOyz3sg3x2EkZ7ifRnR00QewJDIRL';