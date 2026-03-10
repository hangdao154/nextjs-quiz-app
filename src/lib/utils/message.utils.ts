import { ENV } from '@/constants';

export const errorResponse = <T>(
  error: T,
  message: string,
  debug: boolean = true
) => {
  if (debug && ENV.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('❌ API Error', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
  }

  return {
    message,
    error,
  };
};

export const successResponse = <T>(
  data: T,
  message: string,
  debug: boolean = true
) => {
  if (debug && ENV.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('✅ API Success', {
      message,
      data,
    });
  }

  return {
    message,
    data,
  };
};
