import Link from 'next/link';
import { Layout } from '@/components';
import { getPostIds, getPost } from '@/api/fetch';
import { Post } from '@/types';
import { GetStaticProps, GetStaticPaths } from 'next';
import type { FC } from 'react';

const PostDetail: FC<Post> = ({ id, title, body }) => (
  <Layout title={title}>
    <p className="m-4">
      {'ID : '}
      {id}
    </p>
    <p className="mb-4 text-xl font-bold">{title}</p>
    <p className="mx-10 mb-12">{body}</p>
    <Link href="/blog-page" data-testid="back-blog">
      <div className="flex cursor-pointer mt-12">
        <svg
          className="w-6 h-6 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
          />
        </svg>
        Back to blog-page
      </div>
    </Link>
  </Layout>
);

export default PostDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  //const { post: post } = await getPostData(ctx.params.id as string)
  const { post } = await getPost(ctx?.params?.id as string);
  return {
    props: {
      ...post,
    },
  };
};
