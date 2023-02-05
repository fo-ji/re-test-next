import type { FC } from 'react';
import { Comment, Layout } from '@/components';
import { useComments } from '@/api/swr';

const CommentPage: FC = () => {
  const { data: comments, error } = useComments();

  if (error) return <span>Error!</span>;

  return (
    <Layout title="Comment">
      <p className="text-4xl m-10">Comment Page</p>
      <ul>
        {comments &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}
      </ul>
    </Layout>
  );
};

export default CommentPage;
