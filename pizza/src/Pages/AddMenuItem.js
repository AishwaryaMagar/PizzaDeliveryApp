import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import BannerImage from '../Assests/pizza.jpeg';
import '../styles/Panel.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AddMenuItem() {

    const navigte = useNavigate();

    const [item, setitem] = useState({
        itemName: "",
        category: "",
        description: "",
        price: 0,
        calories: 0,
        ingredients: "",
        contains: "",
        imageURL:""
    });

    const handleChange = (e) => {
        setitem(prev => ({...prev, [e.target.id]: e.target.value}))
    };

    const handleOptionChange = (event) => {
        setitem({
            ...item,
            contains: event.target.value
        });
    };

    const handleClick = async e => {
        e.preventDefault()
        try{
            const urlLogin = "/api/AdminController/AddMenu"
            const response = await axios.post(process.env.REACT_APP_API_URL.concat(urlLogin),item, {withCredentials: true});
            
            if (response.data.message === "Success") {
                toast.success("Added the item successful");

            }else{
                toast.error("Something is wrong! Try again")
            }
        }
        catch(err){
            if (err.response && err.response.data && err.response.data.error) {
            // The error message is in err.response.data.error
            alert(err.response.data.error);
            } else {
            // If there's any other type of error
            console.error(err);
            }
        }
    }; 

    return (
        <div>
            <ToastContainer />
            <form class="AddMenuItemform" onSubmit = {handleClick} >
              <h1>Add Item Details</h1>
                <div className='eachinput-foritem'>
                    <label htmlFor='itemName'>Item Name:</label>
                    <input id='itemName' placeholder='Enter Items name' onChange={handleChange}  required></input>
                </div>
                
                <div className='eachinput-foritem'>
                    <label htmlFor='description'>Description:</label>
                    <input id='description' placeholder='Enter Description' onChange={handleChange} required></input>
                </div>
                
                <div className='eachinput-foritem'>
                    <label htmlFor='price'>Price:</label>
                    <input type = 'text' id='price' placeholder='Enter Price' onChange={handleChange} required></input>
                </div>
                
                <div className='eachinput-foritem'>
                    <label htmlFor='calories'>Calories:</label>
                    <input type = 'text' id='calories' placeholder='Enter Calories' onChange={handleChange} required></input>
                </div>
                
                <div className='eachinput-foritem'>
                    <label htmlFor='ingredients'>Ingredients:</label>
                    <input type = 'text' id='ingredients' placeholder='Enter Ingredients' onChange={handleChange} required></input>
                </div>
                
                <div className='eachinput-foritem'>
                    <label htmlFor='imageURL'>Image: </label>
                    <input type = 'text' id='imageURL' placeholder='Enter Image URL' onChange={handleChange} required></input>
                </div>
                
                <div className='eachinput-forContains'>
                    <input type='radio' value='vegan' id='vegan' name='contains' onChange={handleOptionChange}></input>
                    <label htmlFor='vegan'>Vegan?</label>

                    <input type='radio' value='vegetarian' id='vegan' name='contains' onChange={handleOptionChange}></input>
                    <label htmlFor='vegan'>Vegetarian?</label>

                    <input type='radio' value='non' id='vegan' name='contains' onChange={handleOptionChange}></input>
                    <label htmlFor='vegan'>Non Veg?</label>
                </div>
                
                <div className='dropdown'>

                    <label htmlFor='category'>Select Category</label>
                    <select name="category" id='category' onChange={handleChange} required>
                        <option></option>
                        <option value="Pizza">Pizza</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Dessert">Dessert</option>
                    </select>

                </div >   
                <button type='submit'>Add Item</button>     
            </form>
        </div>
    )
}
export default AddMenuItem