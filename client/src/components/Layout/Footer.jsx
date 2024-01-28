import React from 'react';

const Footer = () => {
  return (
    <footer className='w-full py-4 px-8 bg-dark-500 text-light-900'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} CodXMan. All rights reserved.
        </p>
        <ul className='flex space-x-4'>
          <li>
            <a href='#!' className='hover:text-primary-500'>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href='#!' className='hover:text-primary-500'>
              Terms of Service
            </a>
          </li>
          <li>
            <a href='#!' className='hover:text-primary-500'>
              Support
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
