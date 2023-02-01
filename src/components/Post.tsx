import Link from 'next/link';
import type { Post as PostType } from '../types';
import type { FC } from 'react';

export const Post: FC<PostType> = ({ id, title }) => (
  <div>
    <span>{id}</span>
    {' : '}
    <Link
      href={`/posts/${id}`}
      className="cursor-pointer border-b border-gray-500 hover:bg-gray-300"
    >
      {title}
    </Link>
  </div>
);
