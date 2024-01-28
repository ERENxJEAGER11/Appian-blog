import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Home from './components/Layout/Home';
import Error from './components/Layout/Error';
import Navbar from './components/Navigation/Navbar';
import AboutUs from './components/UI/AboutUs';
import Team from './components/UI/Team';
import Footer from './components/Layout/Footer';
import PostDetailPage from './components/UI/Post/PostDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      { path: '/about-us', element: <AboutUs /> },
      { path: '/team', element: <Team /> },
      { path: '/post/:id', element: <PostDetailPage /> },
      { path: '/login', element: <LoginForm /> },
      { path: '/register', element: <RegisterForm /> },
    ],
  },
]);

export default function App() {
  return (
    <div className='font-display'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
