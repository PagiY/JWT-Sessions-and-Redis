import { Login } from "./views/Login";
import { Register } from "./views/Registration";

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
  }
])

export const App = () => {
  return (
    <RouterProvider router={router} />
  );
};
