import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [loader,setLoader] = useState(false);
  const [sendStatus , setSendStatus] = useState("")

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], ['link', 'image'],       
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      
    [{ 'indent': '-1'}, { 'indent': '+1' }],          
    [{ 'direction': 'rtl' }],                         
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                        
  ];

  const modules = {
    toolbar:toolbarOptions
  }

  const sendDataToServer = async () => {
    const dataToSent  = { content: text , author : author }
    try {
      const response = await fetch('/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSent),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Data sent successfully:', data);
      } else {
        console.error('Error sending:', response.statusText);
      }
      return (data)
    } catch (error) {
      console.error('Error sending data:', error);
      return ({status : false})
    }
  };

  const submiText = async (e)=>{
    setLoader(true)
    
    const status = await sendDataToServer();
    console.log("",status.status);
    setSendStatus(status.status)
    setLoader(false)

  }

  const changeAuthor = (e)=>{
    setAuthor(()=>e.target.value)
  }

  return(
  <>
    {loader ? <h1>Publishing</h1>:
    <>
        <input type='text' placeholder='Author name' value={author}  onChange={changeAuthor} />
        <ReactQuill modules={modules} theme="snow" value={text} onChange={setText} />
        <button className='publish-btn' onClick={submiText}>Publish</button>
    </>
    }
  </>
  );
}

export default Editor