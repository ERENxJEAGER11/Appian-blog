import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ data }) => {
  return (
    <div className='p-4 border rounded-lg shadow space-y-2'>
      <Link to={`/post/${data.id}`} className='hover:text-blue-600'>
        <h3 className='text-lg font-bold'>{data.title}</h3>
      </Link>
      <p>{data.content}</p>
      <div className='flex flex-wrap gap-2'>
        {data.tags.map((tag) => (
          <span key={tag} className='bg-gray-200 text-sm px-2 py-1 rounded'>
            {tag}
          </span>
        ))}
      </div>
      <div className='flex justify-between items-center text-sm'>
        <span>{data.likes} Likes</span>
        <span>Created on: {data.created}</span>
      </div>
    </div>
  );
};

export default PostCard;
