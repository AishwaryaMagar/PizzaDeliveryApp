import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminLogin.css';

function AdminPanel() {
  return (
    <div className='adminPanel'>
      <Link to="/AdminUsers">
        <button>Users</button>
      </Link>

      <Link to="/AdminMenu">
        <button>Menu</button>
      </Link>

      <Link to="/AdminOrders">
        <button>Orders</button>
      </Link>
    </div>
  );
}

export default AdminPanel;
