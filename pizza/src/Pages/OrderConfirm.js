import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti';
import { useParams } from 'react-router-dom';
import '../styles/OrderConfirmed.css';
import twitterIcon from "../Assests/twitter.svg";
import { toast, ToastContainer } from 'react-toastify';


function OrderConfirm(){
  let { CartID } = useParams();

  const [auth, setAuth] = useState(false);
  const [userID, setUserID] = useState(null);

  const [items, setItems] = useState([]);

  const [tweetSent, setTweetSent] = useState(false);

  const mediaTweet = async () => { ;
      try { 
        const urladdress = `/api/OrderController/tweet-order`;
        const res = await axios.post(process.env.REACT_APP_API_URL.concat(urladdress), items[0], {withCredentials: true});
        if(res.data.Message === "Hurrah!! You just tweetted🍕"){
          toast.success(res.data.Message);
          setTweetSent(true);
        }
      } catch (error) { 
          toast.error(error);
      } 
  }; 

  const lookForAuth = async () => {
    try{
      const urlCurrentUser = "/api/UserController/CurrentUser";
      const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), {withCredentials: true});
      if (response.data.Status === "Success"){
        //if the token is created (i.e., user is autherised then set auth to true)
        setAuth(true);
        setUserID(response.data.userID);
      }
    }catch(err){
      console.error(err);
    }
  };

  const getOrderedItems = async() => {
    try{
      const urlCartItems = `/api/OrderController/get-ordered-items/${CartID}`;
      const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlCartItems));
      if(res.data.Message == "Here you Go!"){
        setItems(res.data.items);
        console.log(res.data.items);
      }       
    }catch(err){
      console.log(err);
    }
  };
    
    useEffect(() => {
    lookForAuth();
    getOrderedItems();
    }, []);

  return(
    <div>
        {auth ? 
          <div>
            <h1>Order Confirmed</h1> 
            <div className='line-poster'></div>
            <Confetti 
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={150}
            recycle={false}
            />

            <h2>Your Order Summary</h2>
            <div className='card-poster'>
              {items.map(eachItem => (
                <div key={eachItem.MenuID} >
                  <p className='itemName-poster'>{eachItem.itemName}</p>
                  <p className='itemQuan-poster'>x {eachItem.quantity}</p>
                </div> 
              ))}
            </div>

            
            
            <img src = {twitterIcon}></img>
            <br></br>
            <button className = "tweetBtn" onClick={mediaTweet} disabled = {tweetSent}>Tweet Time!</button>
            <br></br>
            <p className='poster-share'>You are one click away from sharing with your friends</p>

          </div>

        : <h1>Please log in</h1>}
          
      </div>
  )
}

export default OrderConfirm;