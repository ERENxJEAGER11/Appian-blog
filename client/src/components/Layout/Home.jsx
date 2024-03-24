import React, { useEffect } from 'react';
import MainLayout from './MainLayout';
import PostList from '../UI/Post/PostList';
// import RichTextEditor from'../UI/RichText/RichTextEditor';
import Navbar from '../Navigation/Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <MainLayout>
        {/* <RichTextEditor/> */}
        <PostList />
      </MainLayout>
    </>
  );
};

export default Home;
