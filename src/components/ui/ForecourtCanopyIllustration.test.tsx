import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ForecourtCanopyIllustration } from './ForecourtCanopyIllustration';

describe('ForecourtCanopyIllustration Component (Page 13 Inspired Station Vector)', () => {
  it('renders SVG graphic with accessible title and aria attributes', () => {
    render(<ForecourtCanopyIllustration />);
    const svg = screen.getByRole('img', { name: /easyfuel pro petrol station canopy illustration/i });
    expect(svg).toBeDefined();
  });
});
