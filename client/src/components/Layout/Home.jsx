import React, { useEffect } from 'react';
import MainLayout from './MainLayout';
import PostList from '../UI/Post/PostList';
import Navbar from '../Navigation/Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <MainLayout>
        <PostList />
      </MainLayout>
    </>
  );
};

export default Home;
