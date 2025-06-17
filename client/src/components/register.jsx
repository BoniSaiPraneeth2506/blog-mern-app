import React from 'react'
import { useState } from 'react';
import axios from 'axios'
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
const register =  () => {
    const [userName,setUserName]=useState('');
    const [passWord,setPassWord]=useState('');
    const [redirect,setRedirect]=useState(false);
    const navigate = useNavigate();

     const handleRegister =  async (e) => {
    e.preventDefault(); // prevent form reload
    console.log('Registering user:', { userName, passWord });

    try{
      const response= await axios.post('http://localhost:4000/register', { userName, passWord })
       alert('registration successful');
       if(response){
        setRedirect(true);
       }
    }catch (error) {
  if (error.response && error.response.status === 409) {
    alert("Username already exists");
  } else {
    alert("Registration failed");
  }
}
    
  };
  if(redirect){
  navigate('/login', { 
        state: { 
          successMessage: 'Registration successful! Please login with your credentials.'
        }
      });
    }

  return (
    <form className='register' onSubmit={handleRegister}>
        <h1>Register</h1>
        <input type="text" placeholder='UserName' value={userName} onChange={(e)=>{setUserName(e.target.value)}}/>
         <input type="password" placeholder='Password' value={passWord} onChange={(e)=>{setPassWord(e.target.value)}}/>
         <button type="submit" >Register</button>
         <Link to='/login'className='reglog'>Already have an Account? <span>Login</span></Link>
    </form>
  )
}

export default register