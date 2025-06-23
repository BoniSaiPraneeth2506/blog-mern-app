import React, { useState, useEffect, useContext } from 'react';
import Post from './post';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import { BlogContext } from '../context/BlogContext';


const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const {backendUrl}=useContext(BlogContext);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(backendUrl+'/getposts');
        setPosts(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {posts.length === 0 ? (
       '') : (
        posts.map((post) => <Post key={post._id} {...post} />)
      )}
    </>
  );
};

export default IndexPage;

