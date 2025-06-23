import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { BlogContext } from '../context/BlogContext';


const EditPage = () => {
  const { id } = useParams(); // ✅ needed for fetching post
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const {backendUrl}=useContext(BlogContext);
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${backendUrl}/post/${id}`);
        setTitle(res.data.title);
        setSummary(res.data.summary);
        setContent(res.data.content);
        
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdatePost = async (e) => {
  e.preventDefault();
  
  const data = new FormData();
  data.set('title', title);
  data.set('summary', summary);
  data.set('content', content);
  data.set('id',id)
  if (files && files[0]) {
    data.set('file', files[0]); // optional file update
  }

  try {
    await axios.put(`${backendUrl}/edit/${id}`, data, {
      withCredentials: true,
    });
    setRedirect(true);
  } catch (err) {
    console.error('Error updating post:', err);
  }
};
  if (redirect) {
  return <Navigate to={`/post/${id}`} />;
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'image'
  ];

  return (
    <div>
      <form onSubmit={handleUpdatePost}>
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
          onChange={setContent}
          modules={modules}
          formats={formats}
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPage;
