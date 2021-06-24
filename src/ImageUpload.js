import {useState} from 'react'
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { storage, db } from "./firebase"
import './ImageUpload.css'

function ImageUpload({username}) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  // get the file in file path.. set the image in 'state' to that file
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on("state_changed", (snapshot) => {
        // progress bar function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function ... 
        console.log(error);
        alert(error.message);
      },
      () => {
        //Complete function... 
        storage 
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            // post image inside db... 
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username  
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          })
      }
    )
  } 

  return (
    <div className="imageupload" >
      {username ? (
        // OPTIONAL: only render image upload if user logged in is true
        <>
          <progress className="imageupload-progress" value={progress} max="100" />
          <input className="enter-caption" type="text" placeholder='Enter a caption...' onChange={event => setCaption(event.target.value)} value={caption}/>
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>
            Upload
          </Button>
        </>
      ): (<h3>Sorry you need to login to upload or REFRESH PAGE</h3>)}
      
    </div>
  )
}

export default ImageUpload;
