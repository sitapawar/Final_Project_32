import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import ReactDOM from 'react-dom/client';
// import './index.css';
import { BrowserRouter } from 'react-router-dom';

test('renders instructions', () => {
  render(
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  const instructionElement = screen.getByText(/Brown Yelp/i);
  expect(instructionElement).toBeInTheDocument;
});


