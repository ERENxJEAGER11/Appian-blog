import React from 'react';

const LoginForm = () => {
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        'http://localhost:30002/api/auth/login',
        { username, password }
      );
      console.log('Login successful', data);
      // Handle login success (e.g., store token, redirect)
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <form onSubmit={handleLoginSubmit}>
      <input type='text' placeholder='Enter you username' />
      <input type='password' placeholder='Enter your password' />
      <button type='submit'>Login</button>
    </form>
  );
};

export default LoginForm;
