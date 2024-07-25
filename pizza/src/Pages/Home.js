import React from 'react';
import {Link} from 'react-router-dom';
import Video from '../Assests/video.mp4';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Home.css';

function Home() {
  return (
    <div className='home'>
      <video autoPlay loop muted playsInline className="backvideo">
        <source src={Video} type="video/mp4"/>
      </video>

      <div className='headerContainer'>
        <h1>PizzaCraze</h1>
        <br/>
        <p>We serve the most cheesiest pizzas</p>
        <Link to={'/menu'}>
        <button>Order Now</button></Link>
      </div> 
    </div>
  )
}

export default Home
