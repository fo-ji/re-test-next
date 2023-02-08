import type { FC } from 'react';
import { Layout } from '@/components';
import { ContextA, ContextB } from '@/components';
import { ToggleProvider } from '@/providers/ToggleProvider';

const ContextPage: FC = () => (
  <Layout title="Context">
    <p className="text-4xl">Context Page</p>
    <ToggleProvider>
      <ContextA />
      <ContextB />
    </ToggleProvider>
  </Layout>
);

export default ContextPage;
