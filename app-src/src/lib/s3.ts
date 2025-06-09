import { S3Client } from "@aws-sdk/client-s3"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity"
import { AWS_REGION, COGNITO_IDENTITY_POOL_ID, COGNITO_USER_POOL_ID } from "./config"

// Module-scoped cache for the S3 client
let cachedS3Client: S3Client | null = null;
let lastIdToken: string | null = null;

/**
 * Gets or creates a memoized S3 client with prewarmed credentials
 * Caches the client to avoid expensive recreation on every call
 * Recreates client if the ID token changes
 */
export const getS3Client = (): S3Client => {
  const currentIdToken = localStorage.getItem("idToken") || "";
  
  // Create new client if none exists or if ID token changed
  if (!cachedS3Client || lastIdToken !== currentIdToken) {
    cachedS3Client = new S3Client({
      region: AWS_REGION,
      credentials: fromCognitoIdentityPool({
        identityPoolId: COGNITO_IDENTITY_POOL_ID,
        clientConfig: { region: AWS_REGION },
        logins: {
          [`cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`]: currentIdToken,
        },
      }),
    });
    
    lastIdToken = currentIdToken;
  }
  
  return cachedS3Client;
};

/**
 * Prewarns AWS credentials by calling the credential provider
 * This resolves credentials eagerly instead of waiting for first S3 operation
 */
export const prewarmCredentials = async (): Promise<void> => {
  try {
    const client = getS3Client();
    // Force credential resolution by calling the credentials function
    if (client.config.credentials && typeof client.config.credentials === 'function') {
      await client.config.credentials();
    }
  } catch (error) {
    // Silently handle credential prewarming errors to avoid breaking the app
    console.warn('Failed to prewarm S3 credentials:', error);
  }
};

// Legacy export for backward compatibility
export const createS3Client = getS3Client;