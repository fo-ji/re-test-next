import useSWR from 'swr';
import axios from 'axios';
import type { Comment, Task } from '@/types';

export const getComments = async (): Promise<Comment[]> => {
  const result = await axios.get(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  );
  return result.data;
};

export const useComments = () => {
  return useSWR('comments', getComments);
};

export const getTasks = async (): Promise<Task[]> => {
  const result = await axios.get(
    'https://jsonplaceholder.typicode.com/todos/?_limit=10'
  );
  return result.data;
};

export const useTasks = (tasks: Task[]) => {
  return useSWR('tasks', getTasks, {
    fallbackData: tasks, // 初期値
    revalidateOnMount: true, // マウントした時に最新かどうか検証する
  });
};
