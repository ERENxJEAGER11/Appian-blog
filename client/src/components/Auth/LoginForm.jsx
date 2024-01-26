import React, { useEffect, useState } from 'react';
// Added code for SR - 03
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem('userDetails'));
    setAuthorized(localStorage.getItem('userDetails') ? true : false);
    console.log(authorized);
    if (authorized) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [authorized]);

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
    <form onSubmit={handleLoginSubmit}>
      <input
        type='text'
        placeholder='Enter you username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter your password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
