import React from 'react';
import Pic from '../Assests/Aishwarya.jpeg';
import '../styles/About.css';

function Frontendlead() {
  return (
    <div className='my-3'>
        <h1>Frontend Lead : Aishwarya</h1>
        <br></br>
        
        <img src={Pic} height={300}alt = "Aishwarya"/>

        <br/>
        <br/>

        <p className='about-member'>
        Hello, I'm Aishwarya Magar, Master in Science in Computer Science student at San Francisco State University and this is my first semester here. I have completed my Bachelors of Engineering in Computer Engineering from Pimpri chinchwad college of Engineering, Pune, India. I also have almost 2 years of Industry experience. I worked as Junior Consultant at Tibco Software, I worked on a BI tool called WebFOCUS. Created reports and dashboards in WebFOCUS according to the client requirements. I am a fun loving person and I like to travel. I like to dance, read books and I enjoy cooking as well. 
        </p>
      
    </div>
  )
}

export default Frontendlead
