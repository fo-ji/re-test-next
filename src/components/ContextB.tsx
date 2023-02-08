import { useContext } from 'react';
import { ToggleContext } from '@/context/ToggleContext';

export const ContextB: React.FC = () => {
  const { toggle } = useContext(ToggleContext);

  return (
    <>
      <p>Context B</p>
      <p className="text-indigo-600" data-testid="toggle-b">
        {toggle ? 'true' : 'false'}
      </p>
    </>
  );
};
