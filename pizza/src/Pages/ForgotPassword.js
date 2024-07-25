import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';

function ForgotPassword() {
  const [users, setUsers] = useState({
    email: ""
  });

  const handleChange = (e) => {
    setUsers((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const urlforgotPassword = "/api/UserController/forgot-password";
      const response = await axios.post(
        process.env.REACT_APP_API_URL.concat(urlforgotPassword),
        users,
        { withCredentials: true }
      );

      if (response.data.message === "Valid Email") {
        toast.success(response.data.message);
        window.location.replace("Login");
      } else {
        toast.error(response.data.Failmessage);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        // The error message is in err.response.data.error
        toast.error(err.response.data.error);
      } else {
        // If there's any other type of error
        console.error(err);
      }
    }
  };

  return (
    <div className="my-3 about">
      <div className='aboutTop' style={{ backgroundImage: `url(${BannerImage})` }}></div>
      <div className='my-3 forgotPassword'>
        <div>
        <label htmlFor='email'><b style={{fontSize:20}}>Enter Email Address</b></label>
        <br></br>
        <input id='email'  type='email'   onChange={handleChange} style={{margin:10, height:40}} required></input>
        <br></br>
        <br></br>
        <label htmlFor='password'><b style={{fontSize:20} }>Enter New Password</b></label>
        <br></br>
        <input id='password'  onChange={handleChange} style={{margin:10, width:600, height:40}} required></input>
        <br></br>
        <button className="FP-Verifybtn" onClick={handleVerify} style={{margin:10}}>Verify</button>
        </div>
        
        <ToastContainer />
      </div>
    </div>
  );
}

export default ForgotPassword;
