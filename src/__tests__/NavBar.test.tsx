import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getPage, initTestHelpers } from 'next-page-tester';

initTestHelpers();

describe('Navigation by Link', () => {
  // next-page-testerを利用する際は非同期で実行する
  it('Should route to selected page in NavBar', async () => {
    // 1. ページを取得
    const { page } = await getPage({
      route: '/index',
    });
    // 2. ページをレンダリング
    render(page);
    // 3. ユーザーイベント発生
    await waitFor(() => userEvent.click(screen.getByTestId('blog-nav')));
    // 4. 期待する動作
    expect(await screen.findByText('Blog Page')).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByTestId('comment-nav')));
    expect(await screen.findByText('Comment Page')).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByTestId('context-nav')));
    expect(await screen.findByText('Context Page')).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByTestId('task-nav')));
    expect(await screen.findByText('Todos Page')).toBeInTheDocument();

    await waitFor(() => userEvent.click(screen.getByTestId('home-nav')));
    expect(await screen.findByText('Welcome to Nextjs')).toBeInTheDocument();

    // screen.debug();
  });
});
