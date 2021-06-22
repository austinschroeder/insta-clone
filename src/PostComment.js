import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase";
import { db } from './firebase';


function PostComment({ postId, user, username, caption, imageUrl }) {
  //USING HOOKS :)
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  }

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

      <div className="post-comments">
        {comments.map((comment, index) => (
          <p key={index}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
  
      {user && (
        <form className="post-commentBox">
          <input 
            className="post-input" 
            type="text"
            placeholder="Add a comment..." 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post-button"
            disabled={!comment}
            type="submit"
            onClick={postComment}  
          >
            Post
          </button>
        </form>
      )}


    </div>
  )
}

export default PostComment;
