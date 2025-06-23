import React, { useState, useEffect, useContext } from 'react';
import Post from './post';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import profile from '../assets/profileblog.avif';
import { UserContext } from '../UserContext';
import { BlogContext } from '../context/BlogContext';

const Author = () => {
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const { userInfo } = useContext(UserContext);
  const [you, setYou] = useState('');
  const {backendUrl}=useContext(BlogContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/author/${username}`, {
          withCredentials: true
        });
        setPosts(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchPosts();
  }, [username]);

  useEffect(() => {
    if (username === userInfo?.userName) {
      setYou('you');
    } else {
      setYou('');
    }
  }, [username, userInfo?.userName]);

  return (
    <>
      <div className="author-welcome">
        <div className="welcome-image">
          <img src={profile} alt={`${username}'s profile`} />
        </div>
        <div className="welcome-content">
          <h2>
            Explore Mr. {username}’s Blogs {you && '(you)'}
          </h2>
          <p className="welcome-text">
            💬 Welcome to {username}’s corner! Here you'll find a curated collection of insights,
            stories, and expertise shaped by their unique perspective. Dive in, share your thoughts,
            and join the conversation!
          </p>
        </div>
      </div>

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => <Post key={post._id} {...post} />)
        ) : (
          <p>No posts found for {username} yet.</p>
        )}
      </div>
    </>
  );
};

export default Author;
