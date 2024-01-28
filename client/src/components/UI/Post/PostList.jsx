import React from 'react';
import PostCard from './PostCard';

export const PostsData = [
  {
    id: 1,
    title: 'Introduction to React.js',
    content:
      'React.js is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components". React has a few different kinds of components, but we’ll start with React.Component subclasses:',
    code: `class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}`,
    images: [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=1',
    ],
    tags: ['React', 'JavaScript', 'UI'],
    date: '2024-01-26',
    likes: 150,
    created: '2023-12-01',
  },
  {
    id: 2,
    title: 'Getting Started with Python Flask',
    content:
      'Flask is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions.',
    code: `from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'`,
    images: [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=1',
    ],
    tags: ['Python', 'Flask', 'Backend'],
    date: '2024-01-25',
    likes: 85,
    created: '2023-11-21',
  },
  {
    id: 3,
    title: 'CSS Flexbox Tutorial',
    content:
      'The Flexible Box Layout Module, makes it easier to design flexible responsive layout structure without using float or positioning.',
    code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
    images: [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=1',
    ],
    tags: ['CSS', 'Flexbox', 'Web Design'],
    date: '2024-01-24',
    likes: 120,
    created: '2023-11-15',
  },
  {
    id: 4,
    title: 'Exploring Vue.js for Frontend Development',
    content:
      'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.',
    code: `new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})`,
    images: [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=1',
    ],
    tags: ['Vue.js', 'JavaScript', 'Frontend'],
    date: '2024-01-23',
    likes: 200,
    created: '2023-11-10',
  },
  {
    id: 5,
    title: 'Understanding Angular Framework',
    content:
      'Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.',
    code: `import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: '<h1>Hello {{name}}</h1>'
})
export class AppComponent  { name = 'Angular'; }`,
    images: [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=1',
    ],
    tags: ['Angular', 'TypeScript', 'SPA'],
    date: '2024-01-22',
    likes: 180,
    created: '2023-11-05',
  },
  {
    id: 6,
    title: 'Getting into Node.js',
    content:
      'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.',
    code: `const http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello, Node.js');
}).listen(3000);`,
    images: [
      'https://picsum.photos/200/300?random=1',
      'https://picsum.photos/200/300?random=1',
    ],
    tags: ['Node.js', 'JavaScript', 'Server'],
    date: '2024-01-21',
    likes: 165,
    created: '2023-11-01',
  },
];

const PostList = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
      {PostsData.map((Post, index) => (
        <PostCard key={index} data={Post} />
      ))}
    </div>
  );
};

export default PostList;
