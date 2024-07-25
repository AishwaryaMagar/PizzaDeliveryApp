import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/AdminLogin.css';


function AdminOrders() {
    const [orders, setorders] = useState([]);

    useEffect(() => {
        const fetchOrders = async() =>{
            try{
                const urlFetchOrders = '/api/AdminController/get-orders';
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlFetchOrders), {withCredentials: true});
                setorders(response.data);
                console.log(response.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchOrders();
    }, [])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        return new Date(dateString).toLocaleString('en-US', options);
    }


    return(
        <div className="order-tableContainer">
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Address ID</th>
                        <th>Order Status</th>
                        <th>Order Date</th>
                        <th>Payment Menthod</th>
                        <th>Cart ID</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(eachOrder => (
                        <tr key = {eachOrder.orderID}>
                            <td>{eachOrder.orderID}</td>
                            <td>{eachOrder.order_userID}</td>
                            <td>{eachOrder.order_addressID}</td>
                            <td>{eachOrder.order_status}</td>
                            <td>{formatDate(eachOrder.order_date)}</td>
                            <td>{eachOrder.paymethod}</td>
                            <td>{eachOrder.cartID_order}</td>
                            <td>
                                <Link to={`/order-details/${eachOrder.orderID}`}>
                                    <button>View/Update</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminOrders;