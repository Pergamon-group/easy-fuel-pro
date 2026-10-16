import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HardwareDirectory } from './HardwareDirectory';

describe('HardwareDirectory Component (TDD Searchable Hardware Matrix)', () => {
  it('renders trigger button with brand counts', () => {
    render(<HardwareDirectory />);
    const trigger = screen.getByRole('button', { name: /search all 151 dispensers & 62 atg probes/i });
    expect(trigger).toBeDefined();
  });

  it('opens modal when trigger button is clicked', () => {
    render(<HardwareDirectory />);
    const trigger = screen.getByRole('button', { name: /search all 151 dispensers & 62 atg probes/i });
    fireEvent.click(trigger);

    expect(screen.getByPlaceholderText(/search dispenser or atg probe brand/i)).toBeDefined();
    expect(screen.getByText(/supported brands of fuel dispensers & atg probes/i)).toBeDefined();
  });

  it('filters brands dynamically as user types in search input', () => {
    render(<HardwareDirectory defaultOpen={true} />);

    const searchInput = screen.getByPlaceholderText(/search dispenser or atg probe brand/i);
    fireEvent.change(searchInput, { target: { value: 'tokheim' } });

    expect(screen.getByText('TOKHEIM')).toBeDefined();
    expect(screen.getByText('TOKHEIM INDIA')).toBeDefined();
    expect(screen.queryByText('GILBARCO')).toBeNull();
  });

  it('filters by category tab (dispensers vs atg)', () => {
    render(<HardwareDirectory defaultOpen={true} />);

    const atgTab = screen.getByRole('button', { name: 'Filter by ATG Probes' });
    fireEvent.click(atgTab);

    expect(screen.getByText('GILBARCO VEEDER ROOT')).toBeDefined();
    expect(screen.getByText('FRANKLIN FUELING')).toBeDefined();
    expect(screen.queryByText('WAYNE DRESSER')).toBeNull();
  });

  it('closes modal when close button is clicked', () => {
    render(<HardwareDirectory defaultOpen={true} />);

    const closeBtn = screen.getByRole('button', { name: /close compatibility catalog/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByPlaceholderText(/search dispenser or atg probe brand/i)).toBeNull();
  });

  it('closes modal when backdrop is clicked', () => {
    render(<HardwareDirectory defaultOpen={true} />);

    const dialogBackdrop = screen.getByTestId('hardware-directory-dialog');
    fireEvent.click(dialogBackdrop);

    expect(screen.queryByPlaceholderText(/search dispenser or atg probe brand/i)).toBeNull();
  });

  it('closes modal when Escape key is pressed', () => {
    render(<HardwareDirectory defaultOpen={true} />);

    expect(screen.getByPlaceholderText(/search dispenser or atg probe brand/i)).toBeDefined();
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByPlaceholderText(/search dispenser or atg probe brand/i)).toBeNull();
  });

  it('closes modal when mobile footer close button is clicked', () => {
    render(<HardwareDirectory defaultOpen={true} />);

    const footerCloseBtn = screen.getByRole('button', { name: /^close$/i });
    fireEvent.click(footerCloseBtn);

    expect(screen.queryByPlaceholderText(/search dispenser or atg probe brand/i)).toBeNull();
  });

  it('allows clearing search query with clear button', () => {
    render(<HardwareDirectory defaultOpen={true} />);

    const searchInput = screen.getByPlaceholderText(/search dispenser or atg probe brand/i);
    fireEvent.change(searchInput, { target: { value: 'tokheim' } });

    const clearBtn = screen.getByRole('button', { name: /clear search input/i });
    fireEvent.click(clearBtn);

    expect((searchInput as HTMLInputElement).value).toBe('');
  });
});

