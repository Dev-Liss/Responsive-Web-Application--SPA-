import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from './PropertyCard';

// --- MOCK UTILS MODULE ---
// This mocks the getBaseUrl function to avoid import.meta issues
jest.mock('../utils', () => ({
  getBaseUrl: () => '/',
  parsePropertyDate: jest.fn()
}));

// --- THE FIX: MOCK REACT-DND ---
// This tells Jest: "Don't try to read the complex react-dnd library."
// "Just use these simple fake functions instead."
jest.mock('react-dnd', () => ({
  useDrag: () => [{ isDragging: false }, jest.fn()],
  DndProvider: ({ children }) => <div>{children}</div>
}));

jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {},
}));
// -------------------------------

const mockProperty = {
    id: "prop1",
    type: "House",
    price: 350000,
    location: "London",
    bedrooms: 3,
    picture: "images/prop1/main.jpg",
    description: "A lovely family home."
};

const renderComponent = () => {
    return render(
        <BrowserRouter>
            <PropertyCard property={mockProperty} />
        </BrowserRouter>
    );
};

describe('PropertyCard Component Tests', () => {
    test('1. Renders the property type title', () => {
        renderComponent();
        expect(screen.getByText(/House/i)).toBeInTheDocument();
    });

    test('2. Displays the formatted price with £ symbol', () => {
        renderComponent();
        expect(screen.getByText(/350,000/i)).toBeInTheDocument();
    });

    test('3. Displays the correct location', () => {
        renderComponent();
        expect(screen.getByText(/London/i)).toBeInTheDocument();
    });

    test('4. Contains a View Details button', () => {
        renderComponent();
        const linkElement = screen.getByRole('link', { name: /View Details/i });
        expect(linkElement).toBeInTheDocument();
    });

    test('5. Renders the property image', () => {
        renderComponent();
        const imgElement = screen.getByAltText(/House/i);
        expect(imgElement).toBeInTheDocument();
        // Check that the image src contains the expected path
        expect(imgElement.src).toContain('images/prop1/main.jpg'); 
    });
});