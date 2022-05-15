import React from 'react';
import { render, screen } from '@testing-library/react';
import TopPage from './TopPage';

test('renders learn react link', () => {
  render(<TopPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
