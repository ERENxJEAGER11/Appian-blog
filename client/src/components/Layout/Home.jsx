import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import { useState } from 'react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userDetails') ? true : false
  );
  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Navbar />
      Home
      {isLoggedIn ? (
        <button onClick={handleLogout}>Log Out</button>
      ) : (
        <Link to='/login'>Log In</Link>
      )}
    </>
  );
};

export default Home;
