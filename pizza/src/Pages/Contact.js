import React from 'react';
import {Link} from 'react-router-dom';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className= "my-3 about">
        <div className='aboutTop' style={{backgroundImage: `url(${BannerImage})`}}></div>
        <div className='my-3'>
            <h1>Contact US</h1>
            <div className="my-5 d-flex justify-content-between contact-btns">
              <Link to={'https://instagram.com'}>
                <button type="button">Instagram</button>
              </Link>

              <Link to={'mailto:pizzacrazesf@gmail.com'}>
                <button type="button">Mail</button>
              </Link>
              
              <Link to={'https://twitter.com'}>
              <button type="button">Twitter</button>
              </Link>
            </div>

            <h1>FAQ</h1>
            <div className="div-que">
              <div className='card-contact'>
              <p className='question'> What types of pizza do you offer?</p><br></br>
              <p>We offer a diverse range of pizza options, including classic favorites like Margherita, Pepperoni, and Hawaiian, as well as unique specialty pizzas such as BBQ Chicken, Veggie Delight, and Meat Lovers. Our menu is designed to cater to a variety of tastes and preferences.</p>
              </div>

              <div className='card-contact'>
              <p className='question'> How can I customize my pizza order?</p><br></br>
              <p>Our pizza customization options allow you to tailor your pizza to your liking. Choose your preferred spiciness level, cheesiness, type of sauce, and adjust the quantity of meat. Simply click on the customization options during the ordering process to create the perfect pizza for you.</p>
              </div>

              <div className='card-contact'>
              <p className='question'> Is there a delivery fee for my order?</p><br></br>
              <p>Yes, a delivery fee may apply based on your location. The delivery fee helps cover the cost of bringing your delicious pizza right to your doorstep. You can view the delivery fee for your specific area during the checkout process.</p>
              </div>

              <div className='card-contact'>
              <p className='question'> Can I track the status of my pizza delivery?</p><br></br>
              <p><b></b>Absolutely! We offer order tracking services to keep you informed about the status of your pizza delivery. Once your order is placed, you can track its progress in real-time, from preparation to delivery, ensuring you know exactly when to expect your mouth-watering pizza.</p>
              </div>

              <div className='card-contact'>
              <p className='question'> Are there any promotions or discounts available?</p><br></br>
              <p>Yes, we regularly offer promotions and discounts to make your pizza experience even more enjoyable. Keep an eye on our website, social media pages, and newsletters for the latest deals. Additionally, signing up for our loyalty program may provide you with exclusive discounts and rewards.</p>
              </div>
              
              
             
              
              
              
            </div>
            
        </div>
      
    </div>
  )
}

export default Contact
