import React from 'react';

const PostCard = ({ data }) => {
  return (
    <div className='p-4 border rounded-lg shadow'>
      <h3 className='font-bold'>{data.title}</h3>
    </div>
  );
};

export default PostCard;
