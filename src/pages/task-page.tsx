import type { FC } from 'react';
import { Layout } from '@/components';
import { GetStaticProps } from 'next';
import { Task } from '@/types';
import { getTasks } from '@/api/fetch';
import { useTasks } from '@/api/swr';

interface TaskPageProps {
  tasks: Task[];
}

const TaskPage: FC<TaskPageProps> = ({ tasks }) => {
  const { data, error } = useTasks(tasks); // MEMO: 2. 初期値をswrに渡す
  // MEMO: 3. マウントされた時に最新情報をswrで取りに行く

  if (error) return <span>Error!</span>;

  return (
    <Layout title="Todos">
      <p className="text-4xl mb-10">Todos Page</p>
      <ul>
        {data?.map((task) => (
          <li key={task.id}>
            {task.id}
            {': '}
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TaskPage;

// 更新頻度の高いページには向いてなさそう
// MEMO: 1. ビルド時にサーバサイドで実行
export const getStaticProps: GetStaticProps = async () => {
  const tasks = await getTasks();
  return {
    props: { tasks },
  };
};
