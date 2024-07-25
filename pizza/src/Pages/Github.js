import React from 'react'
import Pic from '../Assests/Joey.png';
import '../styles/About.css';

function Github() {
  return (
    <div className='my-3'>
        <h1>Github Master : Joey</h1>
        <br></br>

        <img src={Pic} height={300} alt = "Joey" />

        <br/>
        <br/>
        
        <p className='about-member'>
        Howdy, I'm Joey, and I'm a 5th year Computer Science student at San Francisco State. I’m also in charge of the GitHub repository keeping this site together. When I'm not studying, I mostly prefer to play video games or watch reality TV shows.
        </p>
      
    </div>
  )
}

export default Github
