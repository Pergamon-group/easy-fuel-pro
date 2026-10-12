import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ForecourtArchitecture } from './ForecourtArchitecture';

describe('ForecourtArchitecture Component (Page 3 Architecture Schematic)', () => {
  it('renders section title and architecture badge', () => {
    render(<ForecourtArchitecture />);
    expect(screen.getByText(/the forecourt architecture/i)).toBeDefined();
    expect(screen.getByText(/hardware-to-cloud fiscal data flow/i)).toBeDefined();
  });

  it('renders all key physical devices from proposal page 3', () => {
    render(<ForecourtArchitecture />);
    expect(screen.getByText('KRA eTIMS Servers')).toBeDefined();
    expect(screen.getByText('POS / Station Management')).toBeDefined();
    expect(screen.getByText('Type C eTIMS ETR (Incotex 600 ESD)')).toBeDefined();
    expect(screen.getByText('Thermal Receipt Printer')).toBeDefined();
    expect(screen.getByText('Forecourt Controller (PTS-2)')).toBeDefined();
    expect(screen.getByText('Fuel Dispensers & ATG Probes')).toBeDefined();
  });

  it('has anchor link #architecture for navigation', () => {
    const { container } = render(<ForecourtArchitecture />);
    const section = container.querySelector('#architecture');
    expect(section).not.toBeNull();
  });
});
