import { render, screen } from '@testing-library/react';
import ExpenseList from './ExpenseList';

test('renders expense list heading', () => {
  render(<ExpenseList expenses={[]} />);
  expect(screen.getByText(/expenses/i)).toBeInTheDocument();
});