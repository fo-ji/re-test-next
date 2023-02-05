import useSWR from 'swr';
import axios from 'axios';
import type { Comment } from '@/types';

export const getComments = async (): Promise<Comment[]> => {
  const result = await axios.get(
    'https://jsonplaceholder.typicode.com/comments/?_limit=10'
  );
  return result.data;
};

export const useComments = () => {
  return useSWR('comments', getComments);
};
