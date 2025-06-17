// import React, { useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../UserContext'; // 👈 make sure path is correct

// const Nav = () => {
//   const { userInfo, setUserInfo } = useContext(UserContext);

//   // 🟢 Fetch user info when Nav mounts
//   useEffect(() => {
//     axios
//       .get('http://localhost:4000/profile', {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setUserInfo(res.data); // Set user info in context
//       })
//       .catch((err) => {
//         console.log("Not logged in or error:", err.message);
//         setUserInfo(null);
//       });
//   }, []);

//   // 🔴 Logout handler
//   const Logout = async () => {
//     try {
//       await axios.post("http://localhost:4000/logout", {}, {
//         withCredentials: true,
//       });
//       setUserInfo(null);
//     } catch (err) {
//       console.error("Logout failed:", err.message);
//     }
//   };

//   return (
//     <header>
//       <Link to="/" className="logo">My Blog</Link>
//       <nav>
//         {userInfo ? (
//           <>
//             <Link to="/create">Create New posts</Link>
//             <a onClick={Logout} style={{ cursor: 'pointer' }}>Logout<span> ({userInfo.userName})</span></a>
            
//           </>
//         ) : (
//           <>
//             <Link to="/register">Register</Link>
//             <Link to="/login">Login</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Nav;



import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Nav = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Fetch user info when Nav mounts
  useEffect(() => {
    axios
      .get('http://localhost:4000/profile', {
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log("Not logged in or error:", err.message);
        setUserInfo(null);
      });
  }, []);

  // Logout handler
  const Logout = async () => {
    try {
      await axios.post("http://localhost:4000/logout", {}, {
        withCredentials: true,
      });
      setUserInfo(null);
      setIsProfileOpen(false);
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className="main-header">
      <Link to="/" className="logo">
        📝 My Blog
      </Link>
      
      <nav className="main-nav">
        {userInfo ? (
          <>
            <Link to="/create" className="create-btn">
              Create New Post
            </Link>
            
            <div className="profile-dropdown">
              <button 
                className="profile-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
              >
                {userInfo.userName}
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {isProfileOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <span className="user-name">{userInfo.userName}</span>
                    <span className="user-email">Welcome back!</span>
                  </div>
                  
                  <div className="dropdown-divider"></div>
                  
                  <Link to="/myposts" className="dropdown-item" >
                    My Posts
                  </Link>
                  
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                    Profile Settings
                  </Link>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button className="dropdown-item logout-btn" onClick={Logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/register" className="auth-btn register-btn">
              Register
            </Link>
            <Link to="/login" className="auth-btn login-btn">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;






