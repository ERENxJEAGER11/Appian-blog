import React, { useEffect } from 'react';
import MainLayout from './MainLayout';
import PostList from '../UI/Post/PostList';

const Home = () => {
  return (
    <MainLayout>
      {/* The main content of your home page goes here */}
      <PostList />
    </MainLayout>
  );
};

export default Home;
