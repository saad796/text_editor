import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor() {
  const [text, setText] = useState('');
  const [loader,setLoader] = useState(false)

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], ['link', 'image'],       // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

  const modules = {
    toolbar:toolbarOptions
  }

  const submiText = async (e)=>{
    setLoader(true)
    // const data =  JSON.stringify(text)
    // const result = await fetch("http://localhost:8000/publish",{
    //     method : "POST",
    //   headers : {
    //     'Content-Type': 'application/json',
    //   },
    //   body : data
    // })

    // if(!result.ok){
    //     throw new Error("Unfortunatly! Couldn't make request to server.Please try again")
    // }
    // console.log(await result.json());
    setTimeout(()=>{
        setLoader(false)
    },3000)

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