// import { useState } from 'react';
// import axios from 'axios';
// import { Navigate, } from 'react-router-dom';

// const Login = () => {
//   const [userName, setUserName] = useState('');
//   const [passWord, setPassWord] = useState('');
//   const [redirect,setRedirect]=useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log('user logging in:', { userName, passWord });

//     try {
//       const res = await axios.post(
//         'http://localhost:4000/login',
//         { userName, passWord },
//         { withCredentials: true }
//       );

//       if (res.status === 200) {
//         alert('✅ Login successful');
//         console.log("login successful",res.status)
//         res.json().then(userInfo=>{
//           setUserInfo(userInfo);
//           setRedirect(true);
//         })
//         // setRedirect(true);
//       }
//     } catch (err) {
//       if (err.response && err.response.status === 400) {
//         alert('❌ Invalid credentials');
//       } else {
//         console.log('login failed:', err.message);
//         alert('🚫 Login failed. Try again.');
//       }
//     }
//   };
//   if(redirect){
//     return <Navigate to={'/'}/>
//   }
//   return (
//     <form className='login' onSubmit={handleLogin}>
//       <h1>Login</h1>
//       <input
//         type="text"
//         placeholder="UserName"
//         value={userName}
//         onChange={(e) => setUserName(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={passWord}
//         onChange={(e) => setPassWord(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;
import { useState, useContext,useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
   const [successMessage, setSuccessMessage] = useState('');
   const {backendUrl}=useContext(BlogContext);
  

  
  const location = useLocation();

  useEffect(() => {
    // Check if we received success message from registration
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('user logging in:', { userName, passWord });

    try {
      const res = await axios.post(
        backendUrl+'/login',
        { userName, passWord },  // or use correct keys as per your backend
        { withCredentials: true }
      );

      if (res.status === 200) {
        alert('✅ Login successful');
        setUserInfo(res.data);   // ✅ Use res.data instead of res.json()
        setRedirect(true);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('❌ Invalid credentials');
      } else {
        console.log('login failed:', err.message);
        alert('🚫 Login failed. Try again.');
      }
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
    <div>
      {/* Display success message if exists */}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      </div>
    <form className='login' onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={passWord}
        onChange={(e) => setPassWord(e.target.value)}
      />
      <button type="submit">Login</button>
      <Link to='/register'className='reglog'>Don't have an Account? <span>Register</span></Link>
    </form>
    </>
  );
};

export default Login;
