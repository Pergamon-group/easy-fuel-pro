import { vi } from 'vitest';

vi.mock('next/font/google', () => ({
  Poppins: () => ({ variable: '--font-poppins', className: 'poppins' }),
  Inter: () => ({ variable: '--font-inter', className: 'inter' }),
  JetBrains_Mono: () => ({ variable: '--font-jetbrains-mono', className: 'jetbrains-mono' }),
  Plus_Jakarta_Sans: () => ({ variable: '--font-plus-jakarta-sans', className: 'plus-jakarta-sans' }),
}));
