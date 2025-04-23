import { S3Client } from "@aws-sdk/client-s3"
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity"
import { REGION, IDENTITY_POOL_ID, USER_POOL_ID } from "./config"

export const createS3Client = () =>
  new S3Client({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      identityPoolId: IDENTITY_POOL_ID,
      clientConfig: { region: REGION },
      logins: {
        [`cognito-idp.${REGION}.amazonaws.com/${USER_POOL_ID}`]: localStorage.getItem("idToken") || "",
      },
    }),
  })


export type UploadStatus = 'pending' | 'uploading' | 'processing' | 'complete' | 'error';

export type ProgressTracker = {
  totalFiles: number
  filesComplete: number
  filesUploading: number
  filesProcessing: number
  filesWithError: number
  overallProgress: number
}