import { Login } from "./views/Login";
import { Register } from "./views/Registration";
import { Dashboard } from "./views/Dashboard";

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

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
    element: <Dashboard />,
  }
])

export const App = () => {
  
  return (
    <RouterProvider router={router} />
  );
};
