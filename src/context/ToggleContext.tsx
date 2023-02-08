import type { SetStateAction, Dispatch } from 'react';
import { createContext } from 'react';

export type Toggle = boolean;

export interface ToggleContext {
  toggle: Toggle;
  setToggle: Dispatch<SetStateAction<boolean>>;
}

export const ToggleContext = createContext<ToggleContext>({} as never);
