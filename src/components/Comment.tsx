import type { Comment as CommentType } from '@/types';
import type { FC } from 'react';

export const Comment: FC<CommentType> = ({ id, name, body }) => {
  return (
    <li className="mx-10">
      <p className="">
        {id}
        {': '}
        {body}
      </p>
      <p className="text-center mt-3 mb-10">
        {'by '}
        {name}
      </p>
    </li>
  );
};
