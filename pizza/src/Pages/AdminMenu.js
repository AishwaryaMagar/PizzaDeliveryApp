import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminLogin.css';
import { Link } from 'react-router-dom';

function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const urlAdminPanel = "/api/AdminController/GetMenu";
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlAdminPanel));
        setMenuItems(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataDetails()
  }, []);

  return (
    <div>
      <div className='menu-tableContainer'>
      <table className='menu-table'>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(eachItem => (
            <tr key={eachItem.menu_id}>
              <td>{eachItem.menu_id}</td>
              <td>{eachItem.name}</td>
              <td>{eachItem.category}</td>
              <td>{eachItem.description}</td>
              <td>{eachItem.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className='addmenu-btn-container'>
        <Link to = "/addmenuitem">
          <button>Add Menu Item</button>
        </Link>
      </div>
    </div>
  );
}

export default AdminMenu;
