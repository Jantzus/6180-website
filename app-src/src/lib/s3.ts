import { S3Client } from "@aws-sdk/client-s3"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity"
import { AWS_REGION, COGNITO_IDENTITY_POOL_ID, COGNITO_USER_POOL_ID } from "./config"

export const createS3Client = () =>
  new S3Client({
    region: AWS_REGION,
    credentials: fromCognitoIdentityPool({
      identityPoolId: COGNITO_IDENTITY_POOL_ID,
      clientConfig: { region: AWS_REGION },
      logins: {
        [`cognito-idp.${AWS_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`]: localStorage.getItem("idToken") || "",
      },
    }),
  })