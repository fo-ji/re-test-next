import { render, screen, cleanup } from '@testing-library/react';
import { getPage, initTestHelpers } from 'next-page-tester';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

initTestHelpers();

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos/', (req, res, ctx) => {
    const _limit = req.url.searchParams.get('_limit');
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 3,
            title: 'Static task C',
            completed: true,
            userId: 3,
          },
          {
            id: 4,
            title: 'Static task D',
            completed: false,
            userId: 4,
          },
        ])
      );
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Todo page / getStaticProps', () => {
  it('Should render tasks list from pre-fetch by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/task-page',
    });

    render(page);

    expect(await screen.findByText('Todos Page')).toBeInTheDocument();
    expect(await screen.findByText('Static task C')).toBeInTheDocument();
    expect(screen.getByText('Static task D')).toBeInTheDocument();
  });
});
