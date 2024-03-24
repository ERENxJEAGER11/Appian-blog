import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userDetails') ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    setIsLoggedIn(false);
  };

  const location = useLocation();
  const isCurrentPage = (pathname) => location.pathname === pathname;

  return (
    <nav className='flex items-center justify-between p-4 bg-primary-500 text-white'>
      <div className='flex items-center'>
        <h1 className='text-xl font-bold mr-6'>GO CODE</h1>
        <ul className='flex'>
          <li
            className={`px-3 py-2 rounded-md transition-colors duration-300 
            ${isCurrentPage('/') ? 'bg-dark-400' : 'hover:bg-dark-400'}`}
          >
            <Link to='/'>All Blogs</Link>
          </li>
          <li
            className={`px-3 py-2 rounded-md transition-colors duration-300 
            ${isCurrentPage('/team') ? 'bg-dark-400' : 'hover:bg-dark-400'}`}
          >
            <Link to='/team'>Team</Link>
          </li>
          <li
            className={`px-3 py-2 rounded-md transition-colors duration-300 
            ${
              isCurrentPage('/about-us') ? 'bg-dark-400' : 'hover:bg-dark-400'
            }`}
          >
            <Link to='/about-us'>About us</Link>
          </li>
          <li
            className={`px-3 py-2 rounded-md transition-colors duration-300 
            ${isCurrentPage('/team') ? 'bg-dark-400' : 'hover:bg-dark-400'}`}
          >
            <Link to='/createPost'>Create Post</Link>
          </li>
        </ul>
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className='px-4 py-2 bg-dark-500 hover:bg-light-500 rounded-md transition-colors duration-300'
          >
            Log out
          </button>
        ) : (
          <Link
            to='/login'
            className='px-4 py-2 bg-dark-500 hover:bg-light-500 rounded-md transition-colors duration-300'
          >
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
