import { render, screen } from '@testing-library/react';
import Demo from './demo';

test('renders learn react link', () => {
  render(<Demo />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
