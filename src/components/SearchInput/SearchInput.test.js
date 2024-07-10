import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'; // Import screen from testing-library/react
import SearchInput from './SearchInput';

describe('SearchInput component', () => {
  it('renders the input field with the correct placeholder', () => {
    render(<SearchInput searchTerm="" setSearchTerm={() => {}} />); // Mock setSearchTerm
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search');
  });

  it('displays the initial search term', () => {
    const initialTerm = 'chocolate';
    render(<SearchInput searchTerm={initialTerm} setSearchTerm={() => {}} />); // Mock setSearchTerm
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialTerm);
  });

  it('updates the search term on user input', () => {
    const mockSetSearchTerm = jest.fn(); // Mock function to track updates
    render(<SearchInput searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'candy' } });

    expect(mockSetSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockSetSearchTerm).toHaveBeenCalledWith('candy');
  });
});