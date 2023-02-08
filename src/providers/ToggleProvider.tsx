import type { FC, PropsWithChildren } from 'react';
import { useState } from 'react';
import { Toggle, ToggleContext } from '@/context/ToggleContext';

export const ToggleProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [toggle, setToggle] = useState<Toggle>(false);

  return (
    <ToggleContext.Provider value={{ toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};
