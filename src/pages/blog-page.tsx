import { Layout } from '@/components';
import { getPosts } from '@/api/fetch';
import { Post } from '@/components';
import { GetStaticProps } from 'next';
import { Post as PostType } from '@/types';
import type { FC } from 'react';

interface BlogPageProps {
  posts: PostType[];
}

const BlogPage: FC<BlogPageProps> = ({ posts }) => (
  <Layout title="Blog">
    <p className="text-4xl mb-10">Blog Page</p>
    <ul>{posts && posts.map((post) => <Post key={post.id} {...post} />)}</ul>
  </Layout>
);

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: { posts },
  };
};
