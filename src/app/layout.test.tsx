import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import RootLayout from './layout';

// Mock next/font/google
vi.mock('next/font/google', () => ({
  Inter: () => ({
    variable: '--font-sans',
  }),
  JetBrains_Mono: () => ({
    variable: '--font-jetbrains-mono',
  }),
}));

describe('RootLayout Component', () => {
  it('configures Inter font variable on the body element', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    const bodyElement = document.querySelector('body');
    expect(bodyElement?.className || document.body.className).toContain('--font-sans');
  });
});
