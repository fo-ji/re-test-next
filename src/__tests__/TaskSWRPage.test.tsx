import { render, screen, cleanup } from '@testing-library/react';
import { initTestHelpers } from 'next-page-tester';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import TaskPage from '@/pages/task-page';
import type { Task } from '@/types';

initTestHelpers();

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos/', (req, res, ctx) => {
    const _limit = req.url.searchParams.get('_limit');
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            id: 1,
            title: 'Task A',
            completed: false,
            userId: 1,
          },
          {
            id: 2,
            title: 'Task B',
            completed: true,
            userId: 2,
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

describe('Todo page / SWR', () => {
  const taskPageProps: Task[] = [
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
  ];

  it('Should render tasks list after pre-fetch by SWR', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <TaskPage tasks={taskPageProps} />
      </SWRConfig>
    );

    // MEMO: 初期値
    expect(await screen.findByText('Static task C')).toBeInTheDocument();
    expect(screen.getByText('Static task D')).toBeInTheDocument();
    // screen.debug();

    // MEMO: CSR
    expect(await screen.findByText('Task A')).toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
    // screen.debug();
  });

  it('Should render Error text when fetch failed', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/todos/',
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
        <TaskPage tasks={taskPageProps} />
      </SWRConfig>
    );

    expect(await screen.findByText('Error!')).toBeInTheDocument();
  });
});
