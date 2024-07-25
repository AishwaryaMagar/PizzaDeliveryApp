import React from 'react';
import Pic from '../Assests/Malieka.jpeg';
import '../styles/About.css';

function Scrummaster() {
  return (
    <div className='my-3'>
        <h1>Scrum Master : Malieka</h1>
        <br></br>

        <img src={Pic} height={300} alt = "Malieka"/>

        <br/>
        <br/>
        
        <p className='about-member'>
        Hey, my name is Malieka and I am currently a  4th year student at San Francisco State University, pursuing a degree in Computer Science with a Minor in Mathematics. During my free time, I enjoy spending time with family, engaging in small crafts, and skateboarding. Traveling with my family and embarking on new adventures while trying new foods along the way is one of my favorite pastimes. Apart from these interests, I am also a passionate car enthusiast. The fascination with cars began when I watched Fast and Furious: Tokyo Drift one afternoon after school. Since that movie, one of my all-time favorite cars has been the 2002 350z’s, particularly the ones driven by Takashi during the first racing scene

        </p>
      
    </div>
  )
}

export default Scrummaster
