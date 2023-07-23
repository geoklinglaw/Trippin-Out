// App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import SignUp from './pages/Signup';

test('renders landing page by default', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const landingPageHeading = screen.getByRole('heading', { name: /We've Got Your Journey Covered/i });
  expect(landingPageHeading).toBeInTheDocument();
});

test('renders signup page', () => {
  render(
    <MemoryRouter initialEntries={['/signup']}>
      <App />
    </MemoryRouter>
  );

  const signupHeading = screen.getByRole('heading', { name: /Register here!/i });
  expect(signupHeading).toBeInTheDocument();
});

test('renders login page', () => {
  render(
    <MemoryRouter initialEntries={['/login']}>
      <App />
    </MemoryRouter>
  );

  const loginHeading = screen.getByRole('heading', { name: /Welcome Back/i });
  expect(loginHeading).toBeInTheDocument();
});

// Add more test cases for other routes as needed...
