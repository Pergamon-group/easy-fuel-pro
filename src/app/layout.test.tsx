import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout from './layout';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Poppins: () => ({
    variable: '--font-poppins',
  }),
  JetBrains_Mono: () => ({
    variable: '--font-jetbrains-mono',
  }),
}));

describe('RootLayout Component', () => {
  it('configures Poppins font variable on the body element', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const bodyElement = document.querySelector('body');
    expect(bodyElement?.className || document.body.className).toContain('--font-poppins');
  });
});
