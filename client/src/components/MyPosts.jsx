import React, { useState, useEffect, useContext } from 'react';
import Post from './post';
import axios from 'axios'; // ✅ You missed importing axios
import { BlogContext } from '../context/BlogContext';


const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const {backendUrl}=useContext(BlogContext);
  

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get(backendUrl+"/myposts",{
          withCredentials:true,
        }); 
        console.log(response.data);
        setPosts(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
    <h3>My Posts</h3>
      {posts.length > 0 &&
        posts.map(post => (
          <Post key={post._id} {...post} /> 
        ))
      }
    </>
  );
};

export default MyPosts;
