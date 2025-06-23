// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import axios from 'axios';

// const CreatePost = () => {
//   const modules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ['bold', 'italic', 'underline', 'strike'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['blockquote', 'code-block'],
//     ['link', 'image'],
//     ['clean']
//   ]
// };

// const formats = [
//   'header',
//   'bold', 'italic', 'underline', 'strike',
//   'list', 'bullet',
//   'blockquote', 'code-block',
//   'link', 'image'
// ];
//   const [title,setTitle]=useState('');
//   const [summary,setSummary]=useState('')
//   const [content, setContent] = useState('');
//   const [files,setFiles]=useState('') 
//  const handleCreatePosts=async (e)=>{
//     e.preventDefault();
//     const data= new FormData();
//     data.set('title',title);
//     data.set('summary',summary);
//     data.set('content',content);
//     if(files){
//         data.set('file',files[0]);
//     }
// //    console.log(data);
//    const response=await axios.post("http://localhost:4000/create",data,{
//   headers: { 'Content-Type': 'multipart/form-data' });

//    console.log(response.data)

   
//  }
//   return (
//     <div>
//       <form onSubmit={handleCreatePosts}>
//         <input type="text" placeholder="Title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
//         <input type="text" placeholder="Summary" value={summary} onChange={(e)=>{setSummary(e.target.value)}} />
//         <input type="file" onChange={(e)=>{setFiles(e.target.files)}}/>
//         <ReactQuill
//           theme="snow"
//           value={content}
//           onChange={newValue=>setContent(newValue)}
//           modules={modules}
//           formats={formats}
//         />
//         <button style={{ marginTop: "10px" }} type="submit">Create Post</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect,setRedirect]=useState(false);
  const {backendUrl}=useContext(BlogContext);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link', 'image'
  ];

  const handleCreatePosts = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files && files[0]) {
      data.set('file', files[0]);
    }

    try {
      const response = await axios.post(backendUrl+"/create", data,{
       withCredentials: true
      });
      console.log("✅ Post created:", response.data);
      alert("Post created successfully!");
      if(response.data){
      setRedirect(true);
   }
    } catch (err) {
      console.error("❌ Error creating post:", err);
      alert("Failed to create post.");
    }
  };
   if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleCreatePosts}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFiles(e.target.files)}
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
          formats={formats}
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
