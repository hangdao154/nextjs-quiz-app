import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MuiProvider } from '@/providers';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: MuiProvider, ...options });

export * from '@testing-library/react';
export { customRender as render };
