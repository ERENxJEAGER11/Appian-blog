import React, { useEffect, useState } from 'react';
// Added code for SR - 03
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessageModel from '../UI/Error/ErrorMessageModel';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(
    localStorage.getItem('userDetails') ? true : false
  );
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem('userDetails'));
    // setAuthorized(localStorage.getItem('userDetails') ? true : false);
    console.log(authorized);
    if (authorized) {
      navigate('/');
    } else {
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
      setErrorMessage(
        error.response?.data?.message || 'An unexpected error occurred'
      );
    }
  };

  return (
    <div
      className='min-h-screen flex items-center justify-center bg-gradient-to-br 
      from-light-700 to-light-500 font-display'
    >
      <div
        className='max-w-lg w-full bg-light-700 bg-opacity-90 rounded-2xl 
        shadow-2xl z-10 overflow-hidden'
      >
        <div className='text-center flex justify-between items-center bg-dark-400 p-4'>
          <h2 className='text-xl font-bold text-light-900'>
            Sign In to Your Account
          </h2>
          <button
            onClick={() => navigate('/')}
            className='text-white rounded-full p-2 hover:bg-light-700 hover:text-dark-200 transition 
              duration-300 ease-in-out'
          >
            X
          </button>
        </div>
        <div className='px-10 pb-10'>
          <form
            onSubmit={handleLoginSubmit}
            className='space-y-6 animate-fade-in-up'
          >
            <div className='text-center text-dark-400 pt-6'>
              <h2 className='text-3xl font-bold'>Go-code blogs</h2>
              <p className='mt-2 text-sm '>Please sign in to your account</p>
            </div>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              className='w-full px-4 py-2 text-base text-gray-700 bg-gray-50 rounded-lg border border-gray-300 
              focus:outline-none focus:border-custom-medium-blue transition ease-in-out duration-300'
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className='w-full px-4 py-2 text-base text-gray-700 bg-gray-50 rounded-lg border 
            border-gray-300 focus:outline-none focus:border-light-900 transition ease-in-out duration-300'
            />
            <div className='flex justify-between gap-4'>
              <button
                type='button'
                onClick={() => navigate('/register')}
                className='w-full py-2 px-4 border  rounded-lg text-dark-600 bg-white 
              hover:bg-dark-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-light-850 
                focus:ring-offset-2 shadow-lg transition duration-300 ease-in-out'
              >
                Register
              </button>
              <button
                type='submit'
                className='w-full py-2 px-4 border border-primary-100 rounded-lg text-sm font-medium text-white
              bg-primary-500 hover:bg-primary-100 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-primary-500 shadow-lg transition duration-300 ease-in-out'
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        {errorMessage && (
          <ErrorMessageModel
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
};

export default LoginForm;
