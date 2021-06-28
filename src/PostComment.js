import React, { useState, useEffect } from 'react';
import './css/PostComment.css';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase";
import { db } from './firebase';
import EditFunction from './components/EditFunction';
import bookmark from './images/bookmark.png';
import dm from './images/dm.png';
import heart from './images/heart.png';
import message from './images/message.png';


function PostComment({ postId, user, username, caption, imageUrl}) {
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
          setComments(snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data()
          })));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

   //////////////////////////
  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  }

  //////////////////////////
  const deleteComment = (id) => {
    // console.log(id)
    db.collection("posts").doc(postId).collection("comments").doc(id).delete();
  }

  //////////////////////////
  const deleteUpload = (postId) => {
    db.collection("posts").doc(postId).delete();
  }
  
  
  return (
    <div className="post">
      <div className="post-header">
        <Avatar 
          className="post-avatar"
          alt={username}
          src=""
        />
        <h3>{username}</h3>
        {
          (user && username === user.displayName) &&
          <button className="delete-upload" onClick={() => deleteUpload(postId)}>
                {/* Delete Upload */}
                <img className="trashcan" src="https://static.thenounproject.com/png/3823-200.png" alt="" />
              </button>
        }
      </div>
        <img className="post-image" src={imageUrl} alt="" />
      <div className="icons-container">
        <img className="icons" src={heart} alt="" />
        <img className="icons" src={message} alt="" />
        <img className="icons dm" src={dm} alt="" />
        <img className="icons-bookmark" src={bookmark} alt="" />
      </div>

      <h4 className="post-text"><strong>{username}:</strong> {caption}</h4>

      <div className="post-comments">
        {comments.length > 0 && comments.map(({comment, id}) => (
          <div className="post-comment-p" key={id}>
            <strong>{typeof comment.username === 'string' && comment.username}: </strong> 
            {comment.text}
           {
           (user && comment.username === user.displayName) && 
            <>
              <button className="delete-comment" onClick={() => deleteComment(id)}>
                Delete
              </button>
              
              <EditFunction id={id} postId={postId} comment={comment.text}/>
            </>
            }
          </div>
        ))}
      </div>
  
      {user && (
        <>
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
          
        </>
      )}


    </div>
  )
}

export default PostComment;
