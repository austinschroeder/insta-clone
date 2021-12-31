import { db } from '../firebase'
import { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { Button, Input  } from '@material-ui/core'


export default function EditFunction({id, postId, comment}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const editComment = (e) => {
    e.preventDefault()
    db.collection("posts").doc(postId).collection("comments").doc(id).update({"text": value})
    setOpen(!open)
  }
  return (
    <>
      <button className="edit-button" onClick={() => setOpen(!open)}>
                Edit
              </button>
              {open &&
              
                <form onSubmit={editComment}>
                  <Input 
                    placeholder={comment}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                /> 
                </form>  
              }
    </>
  )
}

// Export is in function
