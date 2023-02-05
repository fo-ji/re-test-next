import { render, screen, cleanup } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CommentPage from '../pages/comment-page';

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/comments', (req, res, ctx) => {
    const _limit = req.url.searchParams.get('_limit');
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            name: 'A',
            email: 'dummya@gmail.com',
            body: 'test body a',
            postId: 1,
          },
          {
            id: 2,
            name: 'B',
            email: 'dummyb@gmail.com',
            body: 'test body b',
            postId: 2,
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

describe('Comment Page with useSWR / Success & Error', () => {
  it('Should render the value fetched by useSWR', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    );

    expect(await screen.findByText('1: test body a')).toBeInTheDocument();
    expect(screen.getByText('1: test body a')).toBeInTheDocument();
  });

  it('Should render Error text when fetch failed', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/comments/',
        (req, res, ctx) => {
          const _limit = req.url.searchParams.get('_limit');
          if (_limit === '10') {
            return res(ctx.status(400));
          }
        }
      )
    );

    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    );

    expect(await screen.findByText('Error!')).toBeInTheDocument();
  });
});
