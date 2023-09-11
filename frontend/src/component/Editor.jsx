import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
  const [text, setText] = useState('');
  const [loader,setLoader] = useState(false)

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
    try {
      const response = await fetch('/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: text }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data sent successfully:', data);
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const submiText = async (e)=>{
    setLoader(true)
    
    await sendDataToServer();

    setLoader(false)

  }

  return(
  <>
    {loader ? <h1>Publishing</h1>:
    <>
        <ReactQuill modules={modules} theme="snow" value={text} onChange={setText} />
        <button className='publish-btn' onClick={submiText}>Publish</button>
    </>
    }
  </>
  );
}

export default Editor