import React from "react";
import '../styles/NotFound.css';
import pizzalogo from '../Assests/pizza.svg';

const NotFound = () => {
    return (
      <div className="not-found-container">
        <img src = {pizzalogo}></img>
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the requested page does not exist.</p>
      </div>
    );
  };
  
  export default NotFound;