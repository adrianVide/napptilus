import { render, screen } from '@testing-library/react';
import WorkerDetail from './WorkerDetail';

jest.mock('react-router-dom', () => ({
    useParams: () => ({ id: '1' }),
}));

jest.mock('react-redux', () => {
    const actualReactRedux = jest.requireActual('react-redux');
    return {
        ...actualReactRedux,
        useDispatch: jest.fn(),
        useSelector: jest.fn(),
    };
});

describe('WorkerDetail component', () => {
    beforeEach(() => {
        const useDispatchMock = require('react-redux').useDispatch;
        const dispatchMock = jest.fn();
        useDispatchMock.mockReturnValue(dispatchMock);
    });

    it('renders loading indicator when worker data is loading', async () => {
        const useSelectorMock = require('react-redux').useSelector;
        useSelectorMock.mockImplementation(selector => selector({ workers: { status: 'loading' } }));

        await render(<WorkerDetail />);

        const loadingText = screen.getByText('Loading...');
        expect(loadingText).toBeInTheDocument();
    });

    it('renders worker description when available', async () => {
        const useSelectorMock = require('react-redux').useSelector;
        const mockWorker = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            description: '<p>This is a detailed description of the worker.</p>',
        };
        useSelectorMock.mockImplementation(selector => selector({ workers: { status: 'idle', selectedWorker: mockWorker } }));

        await render(<WorkerDetail />);

        const descriptionElement = screen.getByText(/This is a detailed description of the worker./);
        expect(descriptionElement).toBeInTheDocument();
    });
});
