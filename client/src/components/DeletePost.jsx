// import React, { useState, useEffect } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import axios from 'axios';

// const DeletePost = () => {
//   const { id } = useParams();
//   const [redirect, setRedirect] = useState(false);
//   const [postTitle, setPostTitle] = useState('');

//   // Fetch post details to show what's being deleted
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/post/${id}`);
//         setPostTitle(res.data.title);
//       } catch (err) {
//         console.error("Failed to fetch post", err);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const handleDeletePost = async () => {
//     try {
//       await axios.delete(`http://localhost:4000/delete/${id}`, {
//         withCredentials: true,
//       });
//       setRedirect(true);
//     } catch (err) {
//       console.error('Error deleting post:', err);
//     }
//   };

//   if (redirect) {
//     return <Navigate to={'/'} />;
//   }

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h2>Delete Post</h2>
//       {postTitle && <p>Post: <strong>{postTitle}</strong></p>}
//       <p>Are you sure you want to delete this post?</p>
//       <div className='delete-div'>
//         <button 
//           onClick={handleDeletePost}
//           style={{
//             backgroundColor: '#dc3545',
//             color: 'white',
//             padding: '10px 20px',
//             border: 'none',
//             borderRadius: '4px',
//             // marginRight: '10px',
//             cursor: 'pointer',
//             width:"30%",
//           }}
//         >
//           Yes, Delete
//         </button>
//         <button 
//           onClick={() => setRedirect(true)}
//           style={{
//             backgroundColor: '#6c757d',
//             color: 'white',
//             padding: '10px 20px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: 'pointer',
//              width:"30%",
//           }}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeletePost;


// import React, { useState, useEffect } from 'react';
// import { useParams, Navigate } from 'react-router-dom';
// import axios from 'axios';

// const DeletePost = () => {
//   const { id } = useParams();
//   const [redirect, setRedirect] = useState(false);
//   const [postTitle, setPostTitle] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Fetch post details to show what's being deleted
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/post/${id}`);
//         setPostTitle(res.data.title);
//       } catch (err) {
//         console.error("Failed to fetch post", err);
//       }
//     };
//     fetchPost();
//   }, [id]);

//   const handleDeletePost = async () => {
//     setIsDeleting(true);
//     try {
//       await axios.delete(`http://localhost:4000/delete/${id}`, {
//         withCredentials: true,
//       });
//       setRedirect(true);
//     } catch (err) {
//       console.error('Error deleting post:', err);
//       setIsDeleting(false);
//     }
//   };

//   if (redirect) {
//     return <Navigate to={'/'} />;
//   }

//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h2>Delete Post</h2>
//       {postTitle && <p>Post: <strong>{postTitle}</strong></p>}
//       <p>Are you sure you want to delete this post?</p>
      
//       {isDeleting && (
//         <div style={{ margin: '20px 0' }}>
//           <div style={{
//             border: '4px solid #f3f3f3',
//             borderTop: '4px solid #dc3545',
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             animation: 'spin 1s linear infinite',
//             margin: '0 auto'
//           }}></div>
//           <p style={{ marginTop: '10px', color: '#dc3545' }}>Deleting...</p>
//         </div>
//       )}
      
//       <div className='delete-div'>
//         <button 
//           onClick={handleDeletePost}
//           disabled={isDeleting}
//           style={{
//             backgroundColor: isDeleting ? '#ccc' : '#dc3545',
//             color: 'white',
//             padding: '10px 20px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: isDeleting ? 'not-allowed' : 'pointer',
//             width: "30%",
//           }}
//         >
//           {isDeleting ? 'Deleting...' : 'Yes, Delete'}
//         </button>
//         <button 
//           onClick={() => setRedirect(true)}
//           disabled={isDeleting}
//           style={{
//             backgroundColor: isDeleting ? '#ccc' : '#6c757d',
//             color: 'white',
//             padding: '10px 20px',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: isDeleting ? 'not-allowed' : 'pointer',
//             width: "30%",
//           }}
//         >
//           Cancel
//         </button>
//       </div>
      
//       <style jsx>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DeletePost;


import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

const DeletePost = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(true);

  // Fetch post details to show what's being deleted
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/post/${id}`);
        setPostTitle(res.data.title);
      } catch (err) {
        console.error("Failed to fetch post", err);
      } finally {
        setIsLoadingPost(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    setIsDeleting(true);
    try {
      // Add minimum delay to show loading effect
      await Promise.all([
        axios.delete(`http://localhost:4000/delete/${id}`, {
          withCredentials: true,
        }),
        new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 second minimum
      ]);
      setRedirect(true);
    } catch (err) {
      console.error('Error deleting post:', err);
      setIsDeleting(false);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Delete Post</h2>
      <div style={{ minHeight: '30px', margin: '10px 0' }}>
        {isLoadingPost ? (
          <p>Loading post details...</p>
        ) : (
          postTitle && <p>Post: <strong>{postTitle}</strong></p>
        )}
      </div>
      <p>Are you sure you want to delete this post?</p>
      
      {isDeleting && (
        <div style={{ margin: '20px 0' }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #dc3545',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '10px', color: '#dc3545' }}>Deleting...</p>
        </div>
      )}
      
      <div className='delete-div'>
        <button 
          onClick={handleDeletePost}
          disabled={isDeleting}
          style={{
            backgroundColor: isDeleting ? '#ccc' : '#dc3545',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            width: "30%",
          }}
        >
          {isDeleting ? 'Deleting...' : 'Yes, Delete'}
        </button>
        <button 
          onClick={() => setRedirect(true)}
          disabled={isDeleting}
          style={{
            backgroundColor: isDeleting ? '#ccc' : '#6c757d',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            width: "30%",
          }}
        >
          Cancel
        </button>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DeletePost;