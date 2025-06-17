// // import React, { useState, useEffect } from 'react';
// // import Post from './post';
// // import axios from 'axios';

// // const IndexPage = () => {
// //   const [posts, setPosts] = useState([]);

// //   useEffect(() => {
    
// //     const fetchPosts = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:4000/getposts"); 
// //         console.log(response.data);
// //         setPosts(response.data);
// //       } catch (err) {
// //         console.log(err.message);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   return (
// //     <>
// //      {posts.length === 0 ? " ": posts.map(post => <Post key={post._id} {...post} />)}
// //     </>
// //   );
// // };

// // export default IndexPage;

// import React, { useState, useEffect } from 'react';
// import Post from './post';
// import axios from 'axios';
// import { formatISO9075 } from 'date-fns';
// import static1 from '../assets/static1.png'
// import static3 from '../assets/static3.jpeg'
// import static2 from '../assets/static2.jpg'

// const IndexPage = () => {
//   const [posts, setPosts] = useState([]);

//   const staticPosts = [
//     {
//       _id: 'static1',
//       title: 'Welcome to My Blog! explore Blogging',
//       summary: 'This is a sample blog post. Real posts will appear here when you add them.',
//       cover: 'static1.jpg',
//       createdAt: new Date().toISOString(),
//       author: { userName: 'DemoUser' },
//     },
//     {
//       _id: 'static2',
//       title: 'Welcome to My Blog 2! explore Blogging more',
//       summary: 'This is a sample blog post 2. Real posts will appear here when you add them.',
//       cover: 'static1.jpg',
//       createdAt: new Date().toISOString(),
//       author: { userName: 'DemoUser' },
//     },
//   ];

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/getposts');
//         setPosts(response.data);
//       } catch (err) {
//         console.log(err.message);
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <>
//       {posts.length === 0 ? (
//         const images = [static3, static2, static1];
//         staticPosts.map((post,index) => (
          
//           <div className="post" key={post._id}>
//             <div className="image">
//               <img src={images[index]} alt={post.title} />
//             </div>
//             <div className="texts">
//               <h2>{post.title}</h2>
//               <div className="info">
//                 <span>@{post.author?.userName || 'Unknown Author'}</span>
//                 <time>{formatISO9075(new Date(post.createdAt))}</time>
//               </div>
//               <p className="summary">{post.summary}</p>
//               <a className="read-btn" style={{ color: 'inherit', textDecoration: 'underline' }}>
//                 Read more
//               </a>
//             </div>
//           </div>
//         ))
//       ) : (
//         posts.map((post) => <Post key={post._id} {...post} />)
//       )}
//     </>
//   );
// };

// export default IndexPage;


import React, { useState, useEffect } from 'react';
import Post from './post';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';

const IndexPage = () => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getposts');
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

