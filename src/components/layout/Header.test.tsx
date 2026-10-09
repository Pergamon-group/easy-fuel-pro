import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';
import { siteConfig } from '@/config/site';

describe('Header Component', () => {
  it('renders the header with the logo', () => {
    render(<Header />);
    expect(screen.getByAltText(siteConfig.logo.alt)).toBeDefined();
  });

  it('renders the navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Solutions')).toBeDefined();
    expect(screen.getByText('Request a Demo')).toBeDefined();
  });
});
