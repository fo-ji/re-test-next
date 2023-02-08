import { useContext } from 'react';
import { ToggleContext } from '@/context/ToggleContext';

export const ContextA: React.FC = () => {
  const { toggle, setToggle } = useContext(ToggleContext);

  return (
    <>
      <button
        className="bg-gray-500 hover:bg-gray-400 px-3 py-2 mb-5 text-white rounded focus:outline-none"
        onClick={() => {
          setToggle((prev) => !prev);
        }}
      >
        change
      </button>
      <p>Context A</p>
      <p className="mb-5 text-indigo-600" data-testid="toggle-a">
        {toggle ? 'true' : 'false'}
      </p>
    </>
  );
};
