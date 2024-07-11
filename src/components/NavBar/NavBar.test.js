import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar'; 
describe('NavBar component', () => {
  it('renders the logo image', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toBeInTheDocument();
  });

  it('renders the logo title', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const logoTitle = screen.getByText(/Oompa Loompa's Crew/i);
    expect(logoTitle).toBeInTheDocument();
  });

  it('links the logo to the homepage (/)', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );
    const logoLink = screen.getByRole('link', { name: /Oompa Loompa's Crew/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
