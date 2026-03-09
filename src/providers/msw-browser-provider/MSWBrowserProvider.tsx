'use client';

import { FC, useEffect, useState } from 'react';

const MSWBrowserProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMockReady, setMockReady] = useState(false);

  useEffect(() => {
    const enableMocking = async () => {
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('@/mocks/browser');
        await worker.start();
      }
      setMockReady(true);
    };

    enableMocking();
  }, []);

  if (!isMockReady) {
    return <div>Loading mocks...</div>;
  }

  return <>{children}</>;
};

export default MSWBrowserProvider;
