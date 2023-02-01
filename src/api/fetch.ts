import fetch from 'node-fetch';
import type { Post, Task } from '@/types';

export const getPosts = async (): Promise<Post[]> => {
  const res = await fetch(
    new URL('https://jsonplaceholder.typicode.com/posts/?_limit=10')
  );
  return await res.json();
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await fetch(
    new URL('https://jsonplaceholder.typicode.com/todos/?_limit=10')
  );
  return await res.json();
};

export const getPostIds = async (): Promise<{ params: { id: string } }[]> => {
  const res = await fetch(
    new URL('https://jsonplaceholder.typicode.com/posts/?_limit=10')
  );
  const posts: Post[] = await res.json();
  return posts.map((post) => {
    return {
      params: {
        id: post.id.toString(),
      },
    };
  });
};

export const getPost = async (id: string): Promise<{ post: Post }> => {
  const res = await fetch(
    new URL(`https://jsonplaceholder.typicode.com/posts/${id}`)
  );
  const post: Post = await res.json();
  return { post };
};
