import { render, screen } from '@testing-library/react';
import HelloWorld from './HelloWorld';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';

describe('HelloWorld', () => {
  test('renders correctly', () => {
    render(<HelloWorld />);
    const textElement = screen.getByText('Users');
    expect(textElement).toBeInTheDocument();
  });

  test('renders a list of users', async () => {
    render(<HelloWorld />);
    const users = await screen.findAllByRole('listitem');
    expect(users).toHaveLength(3);
  });

  test('renders error', async () => {
    server.use(
      http.get('https://jsonplaceholder.typicode.com/users', () => {
        return HttpResponse.json(
          { error: 'Error fetching users' },
          { status: 500 }
        );
      })
    );
    render(<HelloWorld />);
    const error = await screen.findByText('Error fetching users');
    expect(error).toBeInTheDocument();
  });
});
