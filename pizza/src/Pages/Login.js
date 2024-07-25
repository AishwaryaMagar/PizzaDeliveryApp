import React, { useState } from 'react';
import axios from 'axios';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import loginlogo from '../Assests/eye.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const [users, setusers] = useState({
    email: "",
    password: ""
  });

  const [LoginFail, setLoginFail] = useState(false);
  const [LoginPass, setLoginPass] = useState(false);

  const handleChange = (e) => {
    setusers((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const urlLogin = "/api/UserController/login";
      const response = await axios.post(
        process.env.REACT_APP_API_URL.concat(urlLogin),
        users,
        { withCredentials: true }
      );

      if (response.data.message === "Login successful") {
        setLoginPass(true);
        toast.success("Login successful");
        setTimeout(() => {
          navigate('/menu');
          window.location.reload();
        }, 1500);
      } else {
        setLoginFail(true);
        toast.error(response.data.Failmessage);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        // The error message is in err.response.data.error
        toast.error(err.response.data.error);
      } else if (err.message === "Network Error"){
        toast.error("Network Error: Unable to connect to the server.");
      } else {
        // If there's any other type of error
        console.error(err);
      }
    }
  };

  return (
    <div className='contact'>
      <div className='leftSide' style={{ backgroundImage: `url(${BannerImage})` }}></div>
      <div className='rightSide'>
        <form onSubmit={handleClick}>
          <h1 data-testid = "loginHeading">Login</h1>

          <label htmlFor='email'>Email</label>
          <input data-testid='email-input' id='email' value={users.email} onChange={handleChange} type='email' required></input>
          
          <label htmlFor='password'>Password</label>
          <div className='password'>
            <input data-testid='password-input' value = {users.password} type={showPassword ? 'text' : 'password'} id='password' onChange={handleChange} required></input>
            <button type = 'button' onClick={togglePasswordVisibility}><img src={loginlogo} alt="eye icon"></img></button>
          </div>

          <div data-testid = "LoginPassMeassage" style={{visibility: LoginPass? "visible": "hidden"}}>Login successful!</div>

          <div data-testid = "LoginfailMeassage" style={{visibility: LoginFail? "visible": "hidden"}}>Either Email or Password is incorrect</div>
          
          <div className='submitsection'>
            <button data-testid="login_btn" className='normalbutton' type='submit'>
              Log In
            </button>
            <Link to='/forgotPassword' data-testid = "forgotPasswordLink">Forgot Password?</Link>
          </div>

          <div className='newaccount'>
            <h1>Need an account?</h1>
            <Link to='/signup' data-testid = "SignUpButton">
              <button>Sign Up</button>
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
