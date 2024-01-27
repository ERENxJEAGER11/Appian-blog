import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userDetails') ? true : false
  );
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    setIsLoggedIn(false);
  };
  return (
    <nav className='flex items-center justify-between p-4 bg-custom-darker-blue text-white'>
      <div className='flex items-center'>
        <h1 className='text-xl font-bold mr-6'>CodXMan</h1>
        <ul className='flex'>
          <li className='px-3 py-2 hover:bg-gray-700 rounded-md'>
            <Link to='/blogs'>All Blogs</Link>
          </li>
          <li className='px-3 py-2 hover:bg-gray-700 rounded-md'>
            <Link to='/team'>Team</Link>
          </li>
          <li className='px-3 py-2 hover:bg-gray-700 rounded-md'>
            <Link to='/about-us'>About us</Link>
          </li>
        </ul>
      </div>
      {isLoggedIn ? (
        <>
          <Button onClick={handleLogout}>Log out</Button>
        </>
      ) : (
        <>
          <Button variant='secondary' to='/login'>
            <Link to='/login'>Log In</Link>
          </Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
