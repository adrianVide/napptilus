import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // For testing routing
import WorkerCard from './WorkerCard';

const mockWorker = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    profession: 'Software Engineer',
};

describe('WorkerCard component', () => {
    it('renders worker information', () => {
        render(
            <MemoryRouter>
                <WorkerCard worker={mockWorker} />
            </MemoryRouter>
        );

        const name = screen.getByText(`${mockWorker.first_name} ${mockWorker.last_name}`);
        const profession = screen.getByText(mockWorker.profession);
        const image = screen.getByRole('img');

        expect(name).toBeInTheDocument();
        expect(profession).toBeInTheDocument();
        expect(image).toBeInTheDocument();
    });

    it('links to the worker detail page', () => {
        render(
            <MemoryRouter>
                <WorkerCard worker={mockWorker} />
            </MemoryRouter>
        );

        const link = screen.getByRole('link');
        expect(link.href).toBe(`http://localhost/${mockWorker.id}`);
    });
});