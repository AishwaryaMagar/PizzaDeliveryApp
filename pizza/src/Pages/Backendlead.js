import React from 'react';
import Pic from '../Assests/Nick.jpg';
import '../styles/About.css';

function Backendlead() {
  return (
    <div className='my-3'>
        <h1>Backend Lead : Nicholas </h1>
        <br></br>

        <img src={Pic} height={300} alt = "Nich"/>

        <br/>
        <br/>
        
        <p className='about-member'>
        Hello, my name is Nicholas Pagcanlungan. I am a senior computer science student attending San Francisco State University with a minor in video game studies. On my free time I like to either play video games or draw.
        </p>
      
    </div>
  )
}

export default Backendlead
