import React from 'react';
import Navbar from '../Navigation/Navbar';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className='p-3 bg-gradient-to-br from-blue-200 to-indigo-300 min-h-screen flex flex-col'>
      <Navbar />
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
