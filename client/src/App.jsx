import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Home from './components/Layout/Home';
import Error from './components/Layout/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <LoginForm /> },
      { path: '/register', element: <RegisterForm /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <Outlet />
    </>
  );
}
