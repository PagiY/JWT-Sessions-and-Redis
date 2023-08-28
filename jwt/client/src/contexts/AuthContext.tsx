import {createContext, Dispatch, SetStateAction} from 'react';

export const AuthContext = createContext<{
  accessToken: undefined | string,
  setAccessToken: Dispatch<SetStateAction<undefined | string>>,
}>({
  accessToken: undefined,
  setAccessToken: () => {}
});