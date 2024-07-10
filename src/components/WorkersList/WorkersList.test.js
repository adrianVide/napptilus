import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import WorkersList from './WorkersList';

const mockWorkers = [
    { id: 1, first_name: 'John', last_name: 'Doe', profession: 'Engineer' },
    { id: 2, first_name: 'Jane', last_name: 'Smith', profession: 'Designer' },
];

describe('WorkersList', () => {
    it('renders header with searchTerm prop', () => {
        render(
            <BrowserRouter>
                <WorkersList
                    workers={mockWorkers}
                    lastWorkerRef={React.createRef()}
                    searchTerm=""
                    setSearchTerm={() => { }}
                />
            </BrowserRouter>
        );

        const headerElement = screen.getByRole('textbox', { name: '' });
        expect(headerElement).toBeInTheDocument();
    });

    it('renders WorkerCard components for each worker', () => {
        render(
            <BrowserRouter>
                <WorkersList
                    workers={mockWorkers}
                    lastWorkerRef={React.createRef()}
                    searchTerm=""
                    setSearchTerm={() => { }}
                />
            </BrowserRouter>

        );
        const johnDoeLink = screen.getByRole('link', { name: /john doe/i });
        expect(johnDoeLink).toBeInTheDocument();

        const janeSmithLink = screen.getByRole('link', { name: /jane smith/i });
        expect(janeSmithLink).toBeInTheDocument();
    });

    it('renders last WorkerCard with a ref', () => {
        const lastWorkerRef = React.createRef();

        render(
            <BrowserRouter>
                <WorkersList
                    workers={mockWorkers}
                    lastWorkerRef={lastWorkerRef}
                    searchTerm=""
                    setSearchTerm={() => { }}
                />
            </BrowserRouter>
        );

        const lastWorkerCard = screen.getByText('Jane Smith');
        expect(lastWorkerCard).toBeInTheDocument();
        expect(lastWorkerRef.current).toBeInTheDocument();
    });

    it('calls setSearchTerm when typing in search input', () => {
        const setSearchTermMock = jest.fn();

        render(
            <BrowserRouter>
                <WorkersList
                    workers={mockWorkers}
                    lastWorkerRef={React.createRef()}
                    searchTerm=""
                    setSearchTerm={setSearchTermMock}
                />
            </BrowserRouter>
        );

        const searchInput = screen.getByRole('textbox', { name: '' });
        userEvent.type(searchInput, 'J');
        expect(setSearchTermMock).toHaveBeenCalledWith('J');
    });
});
