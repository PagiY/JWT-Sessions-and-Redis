import { useEffect, useState } from 'react';

import { Login } from "./views/Login";
import { Register } from "./views/Registration";
import { Dashboard } from "./views/Dashboard";

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { Protected } from './components/Protected';
import { AuthContext } from "./contexts/AuthContext";
import { getToken } from './api/getToken';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  }
])

export const App = () => {
  const [auth, setAuth] = useState<string | undefined>(undefined);

  // to persist auth upon refresh, since it's lost during refresh
  // we'll refetch the access token from the server
  useEffect(() => {
    getToken()
      .then((res) => {
        console.log('App', res);
        if (res.accessToken !== undefined) {
          setAuth(res.accessToken);
        } else {
          setAuth(undefined);
        }
      })
      .catch(() => {
        setAuth(undefined);
      })
  }, []);

  return (
    <AuthContext.Provider value={{accessToken: auth, setAccessToken: setAuth}}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};
