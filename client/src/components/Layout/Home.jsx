import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';
import { useState } from 'react';
import Footer from './Footer';
import Header from './Header';

const Home = () => {
  return (
    <div
      className='p-3 bg-gradient-to-br from-blue-200 
    to-indigo-300'
    >
      <Navbar />
      <Header />
      <Footer />
    </div>
  );
};

export default Home;
