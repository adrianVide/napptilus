import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar'; // Assuming NavBar is in the same directory

describe('NavBar component', () => {
  it('renders the logo image', () => {
    render(<NavBar />);
    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toBeInTheDocument();
  });

  it('renders the logo title', () => {
    render(<NavBar />);
    const logoTitle = screen.getByText(/Oompa Loompa's Crew/i);
    expect(logoTitle).toBeInTheDocument();
  });

  it('links the logo to the homepage (/)', () => {
    render(<NavBar />);
    const logoLink = screen.getByRole('link', { name: /logo/i });
    expect(logoLink.href).toBe('http://localhost/');
  });
});