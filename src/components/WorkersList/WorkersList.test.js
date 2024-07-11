import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import WorkersList from './WorkersList';
import { setLastWorkerRefId } from '../../store/features/refSlice';

const mockStore = configureStore([]);
const mockWorkers = [
    { id: 1, first_name: 'John', last_name: 'Doe', profession: 'Engineer' },
    { id: 2, first_name: 'Jane', last_name: 'Smith', profession: 'Designer' },
];

describe('WorkersList', () => {
    let store;
    let lastWorkerRef;

    beforeEach(() => {
        store = mockStore({});
        lastWorkerRef = React.createRef();
        store.dispatch = jest.fn();
    });

    it('renders header with searchTerm prop', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkersList
                        workers={mockWorkers}
                        lastWorkerRef={lastWorkerRef}
                        searchTerm=""
                        setSearchTerm={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );

        const headerElement = screen.getByRole('textbox');
        expect(headerElement).toBeInTheDocument();
    });

    it('renders WorkerCard components for each worker', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkersList
                        workers={mockWorkers}
                        lastWorkerRef={lastWorkerRef}
                        searchTerm=""
                        setSearchTerm={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );

        const johnDoeLink = screen.getByRole('link', { name: /john doe/i });
        expect(johnDoeLink).toBeInTheDocument();

        const janeSmithLink = screen.getByRole('link', { name: /jane smith/i });
        expect(janeSmithLink).toBeInTheDocument();
    });

    it('renders last WorkerCard with a ref', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkersList
                        workers={mockWorkers}
                        lastWorkerRef={lastWorkerRef}
                        searchTerm=""
                        setSearchTerm={() => {}}
                    />
                </BrowserRouter>
            </Provider>
        );

        const lastWorkerCard = screen.getByText('Jane Smith');
        expect(lastWorkerCard).toBeInTheDocument();
        expect(lastWorkerRef.current).toBeInTheDocument();
        expect(store.dispatch).toHaveBeenCalledWith(setLastWorkerRefId('2'));
    });

    it('calls setSearchTerm when typing in search input', () => {
        const setSearchTermMock = jest.fn();

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <WorkersList
                        workers={mockWorkers}
                        lastWorkerRef={lastWorkerRef}
                        searchTerm=""
                        setSearchTerm={setSearchTermMock}
                    />
                </BrowserRouter>
            </Provider>
        );

        const searchInput = screen.getByRole('textbox');
        userEvent.type(searchInput, 'J');
        expect(setSearchTermMock).toHaveBeenCalledWith('J');
    });
});
