import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostsData } from './PostList';
import Loader from './../Loader';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      setTimeout(() => {
        const postId = Number(id);
        const foundPost = PostsData.find((post) => post.id === postId);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
        setLoading(false);
      }, 1000);
    } catch (e) {
      setError('An error occurred while fetching the post');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className='text-center'>{error}</div>;
  }

  if (!post) {
    return <div className='text-center'>Post not found</div>;
  }

  return (
    <div className='min-h-screen bg-dark-200 text-light-900 flex flex-col justify-center items-center px-4 py-8'>
      <div className='max-w-2xl w-full bg-dark-300 rounded-lg shadow-md overflow-hidden'>
        <div className='p-5'>
          <h2 className='text-2xl font-bold text-light-900 mb-4'>
            {post.title}
          </h2>
          <div className='border-b border-light-700 pb-4 mb-4'>
            <p>{post.content}</p>
          </div>
          <div className='border-b border-light-700 pb-4 mb-4'>
            <pre className='bg-dark-200 text-light-900 p-3 rounded'>
              <code>{post.code}</code>
            </pre>
          </div>
          <div className='flex'>
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Visual representation ${index + 1}`}
                className='mb-4 pr-4'
              />
            ))}
          </div>
          <div className='flex flex-wrap gap-2'>
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className='bg-primary-100 text-primary-500 px-3 py-1 rounded-full text-sm'
              >
                {tag}
              </span>
            ))}
          </div>
          <div className='text-sm text-light-700 mt-4'>
            Published on: {post.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
