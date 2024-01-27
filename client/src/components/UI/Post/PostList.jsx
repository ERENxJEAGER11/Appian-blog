import React from 'react';
import PostCard from './PostCard';

const PostsData = [
  {
    title: 'Introduction to React.js',
    content: 'React.js is a JavaScript library for building user interfaces...',
    code: 'function App() {\n  return <div>Hello, React!</div>;\n}',
    images: ['react_logo.png', 'react_component.png'],
    tags: ['React', 'JavaScript', 'Web Development'],
    date: '2024-01-26',
  },
  {
    title: 'Getting Started with Python Flask',
    content: 'Flask is a lightweight web application framework for Python...',
    code: "from flask import Flask\napp = Flask(__name__)\n\n@app.route('/')\ndef hello():\n    return 'Hello, Flask!'",
    images: ['flask_logo.png', 'flask_app.png'],
    tags: ['Python', 'Flask', 'Web Development'],
    date: '2024-01-25',
  },
  {
    title: 'CSS Flexbox Tutorial',
    content:
      'Flexbox is a layout model in CSS that allows you to design complex layouts more efficiently...',
    code: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    images: ['css_flexbox.png', 'flexbox_example.png'],
    tags: ['CSS', 'Web Development'],
    date: '2024-01-24',
  },
  {
    title: 'Diving into Machine Learning with TensorFlow',
    content:
      'TensorFlow is an open-source machine learning framework developed by Google...',
    code: "import tensorflow as tf\n\nmodel = tf.keras.Sequential([...])\nmodel.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])",
    images: ['tensorflow_logo.png', 'machine_learning.png'],
    tags: ['Machine Learning', 'TensorFlow'],
    date: '2024-01-23',
  },
  {
    title: 'Securing Your Web Applications with JWT',
    content:
      'JSON Web Tokens (JWT) provide a secure way to transmit information between parties...',
    code: "// Generate a JWT token\nconst token = jwt.sign({ user_id: 123 }, 'secret_key', { expiresIn: '1h' });",
    images: ['jwt_security.png', 'web_security.jpg'],
    tags: ['Security', 'Web Development'],
    date: '2024-01-22',
  },
];

const PostList = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      {PostsData.map((Post, index) => (
        <PostCard key={index} data={Post} />
      ))}
    </div>
  );
};

export default PostList;
