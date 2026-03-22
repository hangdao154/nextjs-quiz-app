import { S3Client } from '@aws-sdk/client-s3';
import { ENV } from '@/constants';

const { R2_ACCOUNT_ID, R2_ACCESS_KEY, R2_SECRET_KEY } = ENV;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY || !R2_SECRET_KEY) {
  throw new Error('Missing Cloudflare R2 environment variables');
}

const r2 = new S3Client({
  region: 'auto', // Cloudflare R2 typically uses 'auto' region
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY,
    secretAccessKey: R2_SECRET_KEY,
  },
});

export default r2;
