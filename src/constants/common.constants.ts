export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
  R2_ACCESS_KEY: process.env.R2_ACCESS_KEY,
  R2_SECRET_KEY: process.env.R2_SECRET_KEY,
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
  PUBLIC_URL_PREFIX: process.env.NEXT_PUBLIC_URL_PREFIX,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
};

export const ACCEPTED_IMG_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const LENGTH_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
  MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
  MAX_FILES_UPLOAD: 3,
  MAX_TEXTAREA: 3000,
};
