// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { formatISO9075 } from 'date-fns';

// const PostPage = () => {
//   const { id } = useParams();
//   const [postInfo, setPostInfo] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/post/${id}`);
//         setPostInfo(res.data);
//         console.log(res.data)
//       } catch (err) {
//         console.error("Failed to fetch post", err);
//       }
//     };

//     fetchPost();
//   }, [id]);

  
// if (!postInfo) return <div>Loading...</div>;

//   return (
//     <div className="post-page">
//          <h1>{postInfo.title}</h1>
//          <time className='time'>{formatISO9075(new Date(postInfo.createdAt))}</time>
//          <div className='author'>by @{postInfo.author.userName}</div>
//       <div className="image">
//         <img src={`http://localhost:4000/uploads/${postInfo.cover}`} alt="Post cover" />
//       </div>
     
//       <div
//         dangerouslySetInnerHTML={{ __html: postInfo.content }}
//       />
//     </div>
//   );
// };

// export default PostPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatISO9075 } from 'date-fns';
import '../postpage.css'
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';


const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
 const {userInfo}=useContext(UserContext);
  const {backendUrl}=useContext(BlogContext);

 
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${backendUrl}/post/${id}`);
        setPostInfo(res.data);
        
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch post", err);
      }
    };
    fetchPost();
  }, [id]);

  // Reading progress tracker
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
      
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  if (!postInfo) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem',
        color: '#888'
      }}>
        Loading...
      </div>
    );
  }
 const username = postInfo.author.userName;
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      
      <div className="post-meta">
        <time className="time">
           {formatISO9075(new Date(postInfo.createdAt))}
        </time>
        <div className="author"><Link to={`/author/${username}`} style={{textDecoration:"none",color:'inherit'}}>by @{postInfo.author.userName} </Link></div>
        
        {/* Fixed condition: Check if userInfo exists AND if current user IS the author */}
        {userInfo && userInfo.userId === postInfo.author._id && (
          <div className='edit-row'>
            <Link className='edit-btn' style={{color:"#fff", textDecoration:"none"}}to={`/edit/${postInfo._id}`}>Edit Post</Link>
            <Link className='delete-btn' style={{color:"#fff", textDecoration:"none"}}to={`/delete/${postInfo._id}`}>Delete Post</Link>
          </div>
        )}
          
       
      </div>

      <div className="image">
        <img 
          src={`${backendUrl}/uploads/${postInfo.cover}`} 
          alt={postInfo.title || "Post cover"} 
        />
      </div>

      <div 
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;



