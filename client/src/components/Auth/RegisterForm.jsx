import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorMessageModel from '../UI/Error/ErrorMessageModel';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentAuthPath = (path) => location.pathname === path;

  const handleCreateNewUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:30002/api/auth/createUser',
        {
          username,
          password,
          full_name: firstName + ' ' + lastName,
          email,
          bio: '',
          role_id: 3,
          is_active: true,
        }
      );
      if (data) {
        localStorage.setItem('userDetails', JSON.stringify(data));
        navigate('/');
      }
    } catch (error) {
      console.error('Registration failed', error);
      setErrorMessage(
        error.response?.data?.message || 'An unexpected error occurred'
      );
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-light-700 to-light-500 font-display '>
      <div
        className='max-w-lg w-full bg-light-800 bg-opacity-90 rounded-2xl shadow-2xl 
       z-10 overflow-hidden'
      >
        <div
          className='text-center flex justify-between items-center bg-dark-400 
          p-4'
        >
          <h2 className='text-xl font-bold text-white'>Create a New Account</h2>
          <button
            onClick={() => navigate('/')}
            className='text-white rounded-full p-2 hover:bg-light-700 hover:text-dark-200 transition duration-300 
            ease-in-out'
          >
            X
          </button>
        </div>
        <div className='px-10 pb-10 pt-6 bg-custom-light-blue'>
          <form
            onSubmit={handleCreateNewUser}
            className='space-y-6 animate-fade-in-up'
          >
            <div className='text-center text-custom-darker-blue'>
              <h2 className='text-3xl font-bold  '>Go-code blogs</h2>
              <p className='mt-2 text-sm '>Create your new account</p>
            </div>
            <div className='flex'>
              <input
                type='text'
                placeholder='First Name'
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
                className='w-full px-4 py-2 mr-2 text-base text-gray-700 bg-gray-50 rounded-lg border 
              border-gray-300 focus:outline-none focus:border-custom-medium-blue transition ease-in-out duration-300'
              />
              <input
                type='text'
                placeholder='Last Name'
                value={lastName}
                required
                onChange={(e) => setLastName(e.target.value)}
                className='w-full px-4 py-2 text-base text-gray-700 bg-gray-50 rounded-lg border 
              border-gray-300 focus:outline-none focus:border-custom-medium-blue transition ease-in-out duration-300'
              />
            </div>
            <input
              type='text'
              placeholder='Username'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-4 py-2 text-base text-gray-700 bg-gray-50 rounded-lg 
                border border-gray-300 focus:outline-none focus:border-custom-medium-blue transition 
                ease-in-out duration-300'
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 text-base text-gray-700 bg-gray-50 rounded-lg border 
              border-gray-300 focus:outline-none focus:border-custom-medium-blue transition ease-in-out duration-300'
            />

            <input
              type='email'
              placeholder='Email Address'
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 text-base text-gray-700 bg-gray-50 rounded-lg border 
              border-gray-300 focus:outline-none focus:border-custom-medium-blue transition ease-in-out duration-300'
            />
            <div className='flex justify-between gap-4'>
              <button
                type='button'
                onClick={() => navigate('/login')}
                className='w-full py-2 px-4 border border-custom-medium-blue rounded-lg text-custom-medium-blue bg-white 
                hover:bg-dark-400 hover:text-white focus:outline-none focus:ring-2 
                focus:ring-custom-medium-blue focus:ring-offset-2 shadow-lg transition duration-300 ease-in-out'
              >
                Log In
              </button>
              <button
                type='submit'
                className='w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium 
                text-white bg-primary-500 hover:bg-primary-100 hover:text-primary-500 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-custom-medium-blue shadow-lg transition duration-300 ease-in-out'
              >
                Sign Up
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

export default RegisterForm;
