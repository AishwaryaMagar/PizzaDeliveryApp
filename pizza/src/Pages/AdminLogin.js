import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setUsers((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const urlLogin = '/api/AdminController/login';
      const response = await axios.post(process.env.REACT_APP_API_URL.concat(urlLogin), users, { withCredentials: true });

      if (response.data.message === 'Login successful') {
        const url = `/adminpanel/${response.data.id}`;
        navigate(url);
      } else {
        toast.error(response.data.Failmessage);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className='tocenter'>
      <form onSubmit={handleClick}>
        <h1>Admin Login</h1>

        <label htmlFor='email'>Email</label>
        <input id='email' placeholder='Enter Email' onChange={handleChange} type='email' required></input>

        <label htmlFor='password'>Password</label>
        <input type='password' id='password' placeholder='Enter Password' onChange={handleChange} required></input>

        <button type='submit'>Login</button>
      </form>
      <div id='success-message'></div>
    </div>
  );
}

export default AdminLogin;
