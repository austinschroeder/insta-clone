import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';


function Post({ username, caption, imageUrl }) {
  return (
    <div className="post">
      <div className="post-header">
        <Avatar 
          className="post-avatar"
          alt='NealDegrasse'
          src=""
        />
        <h3>{username}</h3>
      </div>
      

      <img className="post-image" src={imageUrl} alt="" />
      {/* IMAGE  */}

      <h4 className="post-text"><strong>{username}:</strong> {caption}</h4>
    </div>
  )
}

export default Post;
