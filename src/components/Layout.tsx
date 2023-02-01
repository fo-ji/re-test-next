import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import type { PropsWithChildren, FC } from 'react';

interface LayoutProps {
  title: string;
}
export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  title = 'Nextjs',
  children,
}) => (
  <div className="flex justify-center items-center flex-col min-h-screen font-mono">
    <Head>
      <title>{title}</title>
    </Head>
    <header>
      <nav className="bg-gray-800 w-screen">
        <div className="flex items-center pl-8 h-14">
          <div className="flex space-x-4">
            <Link
              href="/"
              data-testid="home-nav"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
            >
              Home
            </Link>
            <Link
              href="/blog-page"
              data-testid="blog-nav"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
            >
              Blog
            </Link>
            <Link
              href="/comment-page"
              data-testid="comment-nav"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
            >
              Comment
            </Link>
            <Link
              href="/context-page"
              data-testid="context-nav"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
            >
              Context
            </Link>
            <Link
              href="/task-page"
              data-testid="task-nav"
              className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
            >
              Todos
            </Link>
          </div>
        </div>
      </nav>
    </header>
    <main className="flex flex-1 justify-center items-center flex-col w-screen">
      {children}
    </main>
    <footer className="w-full h-12 flex justify-center items-center border-t">
      <a
        className="flex items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by
        {/* <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" /> */}
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </a>
    </footer>
  </div>
);
