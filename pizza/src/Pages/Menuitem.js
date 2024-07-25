import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/menuitem.css';

function Menuitem(props) {

  const [item, setItemData] = useState({
    itemID: props.itemID,
    spice: 2,
    cheese: 2,
    sauce: 2,
    meat: 1,
  });

  const [CurrentuserID, setUserID] = useState();

  const handleChange = (e) => {
    setItemData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const checkAuth = async (e) => {
    e.preventDefault();
    try {
      const urlCurrentUser = '/api/UserController/CurrentUser';
      const response = await axios.get(
        process.env.REACT_APP_API_URL.concat(urlCurrentUser),
        { withCredentials: true }
      );

      if (response.data.Status === 'Success') {
        setUserID(response.data.userID);
        const user = response.data.userID;

        const urlAddToCart = '/api/CartController/add-to-cart';
        const responseAddToCart = await axios.post(
          process.env.REACT_APP_API_URL.concat(urlAddToCart),
          { item, user },
          { withCredentials: true }
        );

        // Replace alert with toast.success
        toast.success(responseAddToCart.data.message);
      } 
      else {
        // Replace alert with toast.error
        toast.error('Please login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const displayDescription = showFullDescription
    ? props.description
    : `${props.description.substring(0, 50)}`;

  return (
    <div className="card my-3 border" style={{ width: '20rem' }}>
      <img src={props.image_url} className="card-img-top" alt="Pizza Image" style={{ height: '200px' }}/>
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>

        <div className='idescrip'>
          <p className='item-description'>{displayDescription}</p>
          {props.description.length > 50 && (
            <p className="item-description" onClick={toggleDescription}>
              <b>{showFullDescription ? '  <<<Read Less' : '...'}</b>
            </p>
          )}
        </div>

        {props.category !== 'Dessert' && (
        <div className='slideBars'>
          <div className="slidecontainer">
            <label htmlFor="spice">Spiciness</label>
            <input
              type="range"
              min="1"
              max="3"
              className="slider"
              id="spice"
              defaultValue="2"
              onChange={handleChange}
            />
          </div>

          <div className="slidecontainer">
            <label htmlFor="cheese">Cheese Level</label>
            <input
              type="range"
              min="1"
              max="3"
              className="slider"
              id="cheese"
              defaultValue="2"
              onChange={handleChange}
            />
          </div>

          <div className="slidecontainer">
            <label htmlFor="sauce">Sauce Level</label>
            <input
              type="range"
              min="1"
              max="3"
              className="slider"
              id="sauce"
              defaultValue="2"
              onChange={handleChange}
            />
          </div>

          <div className="slidecontainer">
            <label htmlFor="meat">Meat?</label>
            <input
              type="range"
              min="1"
              max="3"
              className="slider"
              id="meat"
              defaultValue="1"
              onChange={handleChange}
            />
          </div>
        </div>
        )}
        
        <div className='item-price'>
          <b className="slidecontainer" id="price">
            $ {props.price}
          </b>
          <button className="btn btn-primary custom-button" onClick={checkAuth}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menuitem;
