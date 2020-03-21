import React, { useState } from 'react';
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize'

const CreatePage = (props) => {
  const [user, setUser] = useState('')
  const [content, setContent] = useState('')
  const handleUserChange = (e) => {
    setUser(e.target.value)
  }
  const handleContentChange = (e) => {
    setContent(e.target.value)
  }
  const handleSubmit = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `localhost:3000`,
        data: {
          user: user,
          content: content
        }
      })
      console.log(response)
    } catch (err) {
      console.error('CreateUrl error')
      console.error(err)
    }
  }
  return (
    <div className="App">
      <input type="text" onChange={handleUserChange} value={user} />
      <TextareaAutosize onChange={handleContentChange} value={content} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreatePage;
