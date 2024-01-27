import React, { useEffect, useState } from 'react';
// Added code for SR - 03
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(
    localStorage.getItem('userDetails') ? true : false
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem('userDetails'));
    // setAuthorized(localStorage.getItem('userDetails') ? true : false);
    console.log(authorized);
    if (authorized) {
      navigate('/');
    } else {
      console.log('else');
      navigate('/login');
    }
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:30002/api/auth/login',
        { username, password }
      );
      // Handle login success (e.g., store token, redirect)
      if (data) {
        localStorage.setItem('userDetails', JSON.stringify(data));
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 font-display'>
      <div className='max-w-md w-full space-y-8 bg-white rounded-xl shadow-lg z-10'>
        <span className='text-center flex justify-end m-2 pr-3'>
          <button
            onClick={() => {
              navigate('/');
            }}
            className='text-lg text-slate-500 hover:text-slate-600 rounded-full'
          >
            X
          </button>
        </span>
        <div className='px-10 pb-10'>
          <div className='text-center p-4'>
            <h2 className='text-3xl font-bold text-slate-500 '>
              Go-code blogs
            </h2>
            <p className='mt-2 text-sm text-gray-600'>
              Please sign in to your account
            </p>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <div className='mb-8'>
              <input
                type='text'
                placeholder='Enter your username'
                value={username}
                autoComplete='current-username'
                onChange={(e) => setUsername(e.target.value)}
                className='w-full px-4 py-2 mb-3 text-base text-gray-700 bg-gray-50 rounded-lg border focus:outline-none focus:border-indigo-500 border-slate-600'
              />
              <input
                type='password'
                placeholder='Enter your password'
                value={password}
                autoComplete='current-password'
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 text-base text-gray-700 bg-gray-50 rounded-lg border focus:outline-none focus:border-indigo-500 border-slate-600'
              />
            </div>
            <div className='flex'>
              <button
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-slate bg-white-600 hover:bg-slate-300 focus:outline-none focus:ring-offset-2 shadow-md mb-3 mr-2 border-slate-600'
                onClick={() => navigate('/register')}
              >
                Register
              </button>
              <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md mb-3'
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
