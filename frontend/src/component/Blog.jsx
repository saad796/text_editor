import React,{useEffect,useState } from 'react'
import Parser from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';

function Blog() {
   
    const [blogArr , setBlogArr] = useState([])
    useEffect(() => {
      const getData = async()=>{
        try {
            const response = await fetch('/blog', {
              method: 'GET'
            });
      
            if (response.ok) {
              const data = await response.json();
              setBlogArr(data.blog)
              console.log('Data get successfully:', data.blog);
            } else {
              console.error('Error geting:', response.statusText);
            }
          } catch (error) {
            console.error('Error geting data:', error);
          }
      }
      getData()
    }, [])
    

  return (
    <div>
      {blogArr.map((ele ,ind)=>{
        let id = `blog${ind}`
        return (
          <div className='ql-snow' key={ele._id}>
            <p>{ele.author}</p>
            <small>{ele.createdAt}</small>
            <div id={id} className='ql-editor'>
              {Parser(ele.blog)}
            </div>
          </div>)
      })}
    </div>
  )
}

export default Blog