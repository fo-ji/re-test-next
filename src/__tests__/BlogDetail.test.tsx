import { render, screen, cleanup } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import { initTestHelpers } from 'next-page-tester';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';

initTestHelpers();

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts/', (req, res, ctx) => {
    const _limit = req.url.searchParams.get('_limit');
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'dummy title 1',
            body: 'dummy body 1',
            userId: 1,
          },
          {
            id: 2,
            title: 'dummy title 2',
            body: 'dummy body 2',
            userId: 2,
          },
        ])
      );
    }
  }),
  rest.get('https://jsonplaceholder.typicode.com/posts/1', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: 'dummy title 1',
        body: 'dummy body 1',
        userId: 1,
      })
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/posts/2', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 2,
        title: 'dummy title 2',
        body: 'dummy body 2',
        userId: 2,
      })
    );
  }),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('Blog detail page', () => {
  it('Should render detail content of id=1', async () => {
    const { page } = await getPage({
      route: '/posts/1',
    });

    render(page);

    // 非同期処理はコンテンツの取得するまでに、初めに行う必要があるが、以降は不要
    // findはPromiseを返す
    expect(await screen.findByText('dummy title 1')).toBeInTheDocument();
    expect(screen.getByText('dummy body 1')).toBeInTheDocument();
  });

  it('Should render detail content of id=2', async () => {
    const { page } = await getPage({
      route: '/posts/2',
    });

    render(page);

    expect(await screen.findByText('dummy title 2')).toBeInTheDocument();
    expect(screen.getByText('dummy body 2')).toBeInTheDocument();
  });

  it('Should route back top-page from blog detail page', async () => {
    const { page } = await getPage({
      route: '/posts/2',
    });

    render(page);
    // コンテンツを取得できるまで待つ
    await screen.findByText('dummy title 2');
    // クリックイベントを発火
    userEvent.click(screen.getByTestId('back-blog'));

    // イベント発火後なのでawaitかける
    expect(await screen.findByText('Blog Page')).toBeInTheDocument();
  });
});
