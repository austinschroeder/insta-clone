import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';


function Post({ username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // let unsubscribe
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

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
