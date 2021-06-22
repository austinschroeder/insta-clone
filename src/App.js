import React, { useState, useEffect } from "react";

import { db, auth } from './firebase';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import InstagramEmbed from 'react-instagram-embed';
import { Button, Input  } from '@material-ui/core'
import ImageUpload from "./ImageUpload";
import Post from "./PostComment"
import UserAuth from "./components/UserAuth";
import './App.css';

//////////MATERIAL UI STYLING////////////
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
////////////////////////////////////////


function App() {
  const classes = useStyles();
  // USING HOOKS :)
  const [modalStyle] = useState(getModalStyle);

  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  // useEffect --> Runs a piece of code based on a specific condition
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // USER HAS LOGGED IN...
        console.log(authUser);
        setUser(authUser);
      } else {
        // USER HAS LOGGED OUT... 
        setUser(null);
      }

      return () => {
        // perform some cleanup actions
        unsubscribe();
      }
    })
  }, [user, username]);


  useEffect(() => {
    // this is where the code runs on pageload
    // .onSnapshot https://firebase.google.com/docs/firestore/query-data/listen
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // EVERY time a new post is added, this code fires off
      setPosts(snapshot.docs.map(doc => ({
        // \/ Document ID number \/
        id: doc.id,
        // ALL data from Document
        post: doc.data()
      })));
    })

  }, []);




///////////USER AUTH//////////////
  const signUp = (event) => {
    //prevent page refresh
    event.preventDefault()

    auth
        //firebase magic
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))

      setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

      setOpenSignIn(false);
  }
  return (
    <div className="app">
      
      <Modal
        open={open}
        // click outside of modal will close modal
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app-signup" action="">
          <center>
            <img
              className="app-headerImage" 
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="" 
            />
          </center>
            <Input 
              placeholder="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign Up</Button>
        </form>

        </div>
      </Modal>
      {/* //////////////////////// */}
      {/* //////////////////////// */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app-signup" action="">
          <center>
            <img
              className="app-headerImage" 
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
              alt="" 
            />
          </center>
            <Input 
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
        </form>

        </div>
      </Modal> 
      {/* //////////////////////// */}
      {/* //////////////////////// */}
      {/* //////////////////////// */}
      {/* //////////////////////// */}
      <div className="app-header">
        <img 
            className="app-headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
            alt="" 
            />
        {/* if/or */}
        {user ? (
          // if user is true (exists)
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          // OR if user doesnt exist
          <div className="app-loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>          
        )}
      </div>
      <div className="app-posts">
        <div className="app-postsLeft">
          {
            posts.map(({id, post}) => (
              <Post 
                key={id} 
                postId={id} 
                user={user} 
                username={post.username} 
                caption={post.caption} 
                imageUrl={post.imageUrl}
              />
            ))
          }
        </div>
        <div className="app-postsRight">
          {/* USING https://www.npmjs.com/package/react-instagram-embed */}
          {/* <InstagramEmbed
            url='https://www.instagram.com/neildegrassetyson/?hl=en'
            clientAccessToken='329806298746214|dfe72b0d26a62d1ffc58222ecf632424'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> */}
        </div>
      </div>


      {/* ////////////IMAGE UPLOAD/////////  */}
      {user?.displayName ? (
        // OPTIONAL: only render image upload if user logged in is true
        <ImageUpload username={user.displayName}/>
      ): (
        <h3>Sorry you need to login to upload</h3>
      )}

    </div>
  );
}

export default App;
