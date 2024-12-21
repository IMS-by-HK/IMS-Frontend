import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import Main from '../components/main.jsx';
import { AuthProvider } from '../context/AuthContext.js';

jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
}));

// Mock AuthContext for testing
const mockLogout = jest.fn();

const renderWithAuth = (ui, { providerProps = {}, ...renderOptions } = {}) => {
    return render(
        <AuthProvider {...providerProps}>
            {ui}
        </AuthProvider>,
        renderOptions
    );
};

describe('Main Component', () => {
    const providerProps = {
        isLoggedIn: true,
        logout: mockLogout,
    };

    beforeEach(() => {
        // Mock axios responses
        axios.get.mockResolvedValue({ data: [
            { _id: '1', name: 'Test Item', price: 10, quantity: 5, category: 'Produce', productId: 100 }
        ]});
        axios.post.mockResolvedValue({ status: 201 });
        axios.patch.mockResolvedValue({ status: 200 });
        axios.delete.mockResolvedValue({ status: 204 });
    });

    test('renders inventory title and items', async () => {
        renderWithAuth(<Main />, { providerProps });
        
        // Check if the title is rendered
        await waitFor(() => {
            expect(screen.getByText('Inventory Management System')).toBeInTheDocument();
        });

        // Wait for items to load
        await waitFor(() => {
            expect(screen.getByText('Test Item')).toBeInTheDocument();
        });
    });

    test('opens add item popup and submits', async () => {
        renderWithAuth(<Main />, { providerProps });

        // Open the popup
        fireEvent.click(screen.getByAltText('Add'));
        expect(screen.getByText('Add New Item')).toBeInTheDocument();

        // Fill form and submit
        fireEvent.change(screen.getByPlaceholderText('Enter item name'), { target: { value: 'New Item' } });
        fireEvent.change(screen.getByPlaceholderText('Enter item price'), { target: { value: '20' } });
        fireEvent.change(screen.getByPlaceholderText('Enter item quantity'), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText('Item Category:'), { target: { value: 'Frozen' } });

        // Submit form
        fireEvent.click(screen.getByText('Add Item'));
        
        // Wait for form submission and popup to close
        await waitFor(() => {
            expect(screen.queryByText('Add New Item')).not.toBeInTheDocument();
        });

        // Check if axios.post was called with correct data
        expect(axios.post).toHaveBeenCalledWith(
            "https://ims-backend-2qfp.onrender.com/products/create",
            { name: 'New Item', price: '20', quantity: '10', category: 'Frozen' }
        );
    });
});