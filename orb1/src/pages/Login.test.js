import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';

test('renders login form without errors', () => {
    render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
    // Use assertions to check if the login form elements are rendered
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });
  
  test('submits login form successfully', () => {
    render(
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });
  
    // Fill in the form fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
    // Simulate form submission
    fireEvent.click(loginButton);
  });
  