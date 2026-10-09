import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GlobalNotFound from './not-found';

describe('GlobalNotFound Component', () => {
  it('renders the 404 text', () => {
    render(<GlobalNotFound />);
    expect(screen.getByText('Page Not Found')).toBeDefined();
    expect(screen.getByText(/We couldn't find the page/i)).toBeDefined();
  });

  it('renders navigation links', () => {
    render(<GlobalNotFound />);
    expect(screen.getByText('Go Home')).toBeDefined();
    expect(screen.getByText('Contact Support')).toBeDefined();
  });
});
