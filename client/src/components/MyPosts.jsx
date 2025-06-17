import React, { useState, useEffect } from 'react';
import Post from './post';
import axios from 'axios'; // ✅ You missed importing axios

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/myposts",{
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
