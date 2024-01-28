import React from 'react';
import Navbar from '../Navigation/Navbar';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div
      className='bg-gradient-to-br from-custom-light to-custom-medium
      min-h-screen flex flex-col font-display'
    >
      <Header />
      <main className='flex-grow'>{children}</main>
    </div>
  );
};

export default MainLayout;
