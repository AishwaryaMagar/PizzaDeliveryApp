import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Menuitem from './Menuitem';
import '../styles/MenuFilter.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Menu() {
  const [menuItems, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Initial category is 'All'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const urlMenu = "/api/MenuController/GetMenu";
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlMenu));
        setMenu(res.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Axios error (e.g., network error, HTTP status code outside 2xx range)
          console.error('Axios error:', err.message);
        } else {
          // Other types of errors
          console.error('Error:', err.message);
        }
      }
    }
    fetchMenuDetails()
  }, []);

  const CheckLogin = async () => {
    try {
      const urlCurrentUser = "/api/UserController/CurrentUser";
      const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), { withCredentials: true });

      if (response.data.Status === "Success") {
        const user = response.data.userID;
        const url = `/mycart/${user}`;
        navigate(url);
      }
      else {
        toast.error("Please log in");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const categories = [...new Set(menuItems.map(item => item.category))];

  // Filter menu items based on the selected category
  const filteredMenuItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className='menu-div'>
      <div className='container my-4'>
        <div className='filter-buttons'>
          <button className='custom-button-filter' onClick={() => setSelectedCategory('All')}>All</button>
          {categories.map(category => (
            <button test-dataid = {category} className='custom-button-filter' key={category} onClick={() => setSelectedCategory(category)}>{category}</button>
          ))}
        </div>

        {categories.map(category => (
          <div key={category} className='menu-category'>
            <h2 data-testid = 'categoryhead'>{category}</h2>
            <div className='line'></div>
            <div className='row'>
              {filteredMenuItems
                .filter(item => item.category === category)
                .map(eachItem => (
                  <div className='col-md-4' key={eachItem.menu_id}>
                    <Menuitem
                      itemID={eachItem.menu_id}
                      name={eachItem.name}
                      price={eachItem.price}
                      image_url={eachItem.image_url}
                      description={eachItem.description}
                      category={eachItem.category}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className='gotocart-footer'>
        <button id="addtocartbutton" className="btn btn-primary custom-button" onClick={CheckLogin} style={{ width: "10rem", height: "3rem" }}>Go to Cart</button>
      </div>
    </div>
  )
}

export default Menu;
