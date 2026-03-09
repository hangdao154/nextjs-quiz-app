import { http, HttpResponse } from 'msw';

const MOCKED_USERS = [
  {
    name: 'John Doe',
  },
  {
    name: 'Jane Doe',
  },
  {
    name: 'John Smith',
  },
];

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/users', () => {
    return HttpResponse.json(MOCKED_USERS, { status: 200 });
  }),
];
