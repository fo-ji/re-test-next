import { render, screen, cleanup } from '@testing-library/react';
import { getPage } from 'next-page-tester';
import { initTestHelpers } from 'next-page-tester';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

initTestHelpers();

// 1. apiを叩いた時のレスポンスデータを定義
const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts/', (req, res, ctx) => {
    const query = req.url.searchParams;
    const _limit = query.get('_limit');
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
];

// 2. モックサーバー連携
// 2-1. 設置
const server = setupServer(...handlers);
// 2-2. 起動
beforeAll(() => server.listen());
// 2-3. テストケースごとに副作用が起こらないように都度初期化
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
// 2-4. 切断
afterAll(() => server.close());

describe('Blog Page', () => {
  it('Should render the list of blogs pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/blog-page',
    });
    render(page); // 構造の取得

    expect(await screen.findByText('Blog Page')).toBeInTheDocument();
    expect(screen.getByText('dummy title 1')).toBeInTheDocument();
    expect(screen.getByText('dummy title 2')).toBeInTheDocument();
  });
});
