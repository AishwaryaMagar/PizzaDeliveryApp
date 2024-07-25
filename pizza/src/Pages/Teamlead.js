import React from 'react';
import Pic from '../Assests/TeamLead.jpeg';
import '../styles/About.css';


function Teamlead() {
  return (
    <div className='my-3 teamlead'>
        <h1>Team Lead : Monisha Mekala</h1>
        <br></br>
        
        <img src={Pic} height={300} alt = "Hey Monisha Here"/>

        <br/>
        <br/>

        
        
        <p className='about-member'>Hello, I'm Monisha Mekala, a first-semester Master's of Science in Computer Science student at SFSU, with a diverse background in Information Science and Engineering from Bangalore, India. Proficient in Python, Java, C, C++, MySQL, HTML, CSS, Bootstrap. I've interned as a Full Stack Developer, excelled in data entry, and served as a Senior Quality Assurance Engineer in a multinational corporation. My expertise extends to the BDD Specflow framework with Java and C# Selenium. Beyond my professional endeavors, I find joy in sketching, cooking, gardening, and crafting mystical tales. On a personal note, I hold a gold medal in swimming in India, a testament to my dedication and perseverance. I also revel in event hosting and dancing. This journey of blending technology and creativity has been a fulfilling one, and I look forward to exploring new horizons in the world of computer science. Thank you for taking a glimpse into my journey and passions.</p>
      
    </div>
  )
}

export default Teamlead
