// import React from 'react'
// import { formatISO9075 } from 'date-fns';
// const post = ({ title, summary, cover,content, createdAt,author }) => {
//   return (
//     <div>
//          <div className="post">
//           <div className="image">
//             <img src={`http://localhost:4000/${cover}`}></img>
//           </div>
//           <div className="texts">
//             <h2>{title}</h2>
//             <div className="info">
//               <a href="">{author?.userName || 'Unknown Author'}</a>
//               <time>{formatISO9075(createdAt)}</time>
//             </div>
//             <p className='summary'>{summary}</p>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default post

import React, { useContext } from 'react';
import { formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';



const Post = ({ _id, title, summary, cover, createdAt, author }) => {
  const {backendUrl}=useContext(BlogContext);
  
  return (
     <Link to={`/post/${_id}`} className="post" style={{textDecoration:"none",color:"inherit"}}>
      <div className="image">
        <img src={`${backendUrl}/uploads/${cover}`} alt={title} />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        <div className="info">
          <span>@{author?.userName || 'Unknown Author'}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </div>
        <p className="summary">{summary}</p>
        <a className='read-btn' style={{marginBottom: "15px"}}>Read more</a>
      </div>
    </Link>
  );
};

export default Post;



