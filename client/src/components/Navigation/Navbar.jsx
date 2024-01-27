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
    <nav className='flex justify-between'>
      <h1>CodXMan</h1>
      {isLoggedIn ? (
        <>
          <Button onClick={handleLogout}>Log out</Button>
        </>
      ) : (
        <>
          <Button variant='link' to='/login'>
            <Link to='/login'>Log In</Link>
          </Button>
        </>
      )}
    </nav>
  );
};

export default Navbar;
