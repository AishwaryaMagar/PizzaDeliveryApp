import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import serachlogo from '../Assests/search-icon.svg';
import cartlogo from '../Assests/cart-fill.svg';
import userlogo from '../Assests/person-circle.svg';
import loginlogo from '../Assests/add-profile.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';


function Navbar() {
  
  //to check if the user is autherised or no
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState(' ');
  const [userID, setUserID] = useState(null);

  const searchFor = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    const searchTerm = searchFor.current.value;
    setInputValue('');
  }

  //to get the user assigned to the token
  const lookForAuth = async () => {
    try{
      const urlCurrentUser = "/api/UserController/CurrentUser";
      const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), {withCredentials: true});
      if (response.data.Status === "Success"){
        //if the token is created (i.e., user is autherised then set auth to true)
        setAuth(true);
        setUsername(response.data.username);
        setUserID(response.data.userID);
      }
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    lookForAuth();
  }, []);

  const AskToLogin = () => {
    toast.error("Please log in");
  };

  return (
    <>
      <ToastContainer />
    <div className='navbar'>

        <div className='leftSide'>
        <Link to="/">PizzaCraze</Link>
        </div>

        <div className='centerside'> 
            <Link to='/menu'>Menu</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
        </div>
        
        <div className='rightSide'>

          <div class="search">

            <input type="text" placeholder="Search.." ref={searchFor} value={inputValue} onChange={handleChange}/>

            {inputValue.trim() === '' ? (
              // If the search term is empty, render a button with a direct link to /menu
              <Link to="/menu">
                <button>
                  <img src={serachlogo} alt="Search" />
                </button>
              </Link>
            ) : (
              // If the search term is not empty, render a button with an onClick handler
              <Link to = {`/searchmenu/${inputValue}`}>
                <button onClick={handleSearch}>
                  <img src={serachlogo} alt="Search" />
                </button>
              </Link>
            )}

          </div>

          <div className='rightbuttons'>
            {auth ? <Link to={`/mycart/${userID}`}><img src={cartlogo} alt={username}/></Link> : <Link to= '/login'> <img onClick = {AskToLogin} src={cartlogo} alt='profile'/></Link> }
          </div>
          
          <div className='rightbuttons'>
          {auth ? <Link to={`/profile/${userID}`}><img src={userlogo} alt={username}/></Link> : <Link to="/login"> <img src={loginlogo} alt='profile'/></Link> }
          </div>
       
        </div>
    </div>
    </>
  );
}

export default Navbar;
