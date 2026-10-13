import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ForecourtArchitecture } from './ForecourtArchitecture';

describe('ForecourtArchitecture Component', () => {
  it('renders section title, architecture badge, and human-crafted intro copy', () => {
    render(<ForecourtArchitecture />);
    expect(screen.getByText(/the forecourt architecture/i)).toBeDefined();
    expect(screen.getByText(/hardware-to-cloud fiscal data flow/i)).toBeDefined();
    expect(
      screen.getByText(/easyfuel pro connects your forecourt directly to kra/i),
    ).toBeDefined();
  });

  it('renders interactive forecourt architecture diagram', () => {
    render(<ForecourtArchitecture />);
    expect(screen.getByTestId('forecourt-architecture-diagram')).toBeDefined();
  });

  it('renders all key physical devices', () => {
    render(<ForecourtArchitecture />);
    expect(screen.getAllByText(/kra (etims )?servers/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/pos (or|\/) (station|fuel) management/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/type c etims etr/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/thermal receipt printer|printer/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/forecourt controller/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/fuel (station )?dispensers/i).length).toBeGreaterThanOrEqual(1);
  });

  it('has anchor link #architecture for navigation', () => {
    const { container } = render(<ForecourtArchitecture />);
    const section = container.querySelector('#architecture');
    expect(section).not.toBeNull();
  });
});
