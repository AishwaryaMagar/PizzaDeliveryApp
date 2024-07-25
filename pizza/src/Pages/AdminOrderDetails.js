import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../styles/AdminLogin.css';

function AdminOrderDetails(){
    let {orderID} = useParams();
    const [orders, setorderdetails] = useState([]);
    const [selectedStatus, setStatus] = useState();
    const [CurrentStatus, setCurrentStatus] = useState(" ");

    const isDelivered = CurrentStatus === 'Delivered';

    useEffect(() => {
        const getOrderDetails = async() => {
            try{
                const urlgetOrderDetails = `/api/AdminController/get-order-details/${orderID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlgetOrderDetails), {withCredentials: true});
                setorderdetails(response.data);
            }catch(err){
                console.log(err);
            }
        }
        getOrderDetails();
    }, []);

    useEffect(() => {
        const getOrderStatus = async() =>{
            try{
                const urlGetStatus = `/api/AdminController/get-status/${orderID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlGetStatus), {withCredentials: true});
                setCurrentStatus(response.data);
            }catch(err){
                console.log(err);
            }
        }
        getOrderStatus();
    }, [CurrentStatus]);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const handleStatus = async(e) => {
        e.preventDefault();
        try{
            const UrlupdateOrderStatus = `/api/AdminController/update-order-status`;
            const response = await axios.post(process.env.REACT_APP_API_URL.concat(UrlupdateOrderStatus),{orderID, selectedStatus}, {withCredentials: true})
            if(response.data.message = "Success"){
                window.location.reload();
            }
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="orderdetail-tableContainer">
            <table className="orderdetail-table">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Address ID</th>
                        <th>Address</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>CART ID</th>
                        <th>Cheese_level</th>
                        <th>sauce_level</th>
                        <th>meat_level</th>
                        <th>spice_level</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.UserName}</td>
                        <td>{order.addressID}</td>
                        <td>{`${order.line1}, ${order.line2}, ${order.apt}, ${order.zipcode}`}</td>
                        <td>{order.Item}</td>
                        <td>{order.Price}</td>
                        <td>{order.quantity}</td>
                        <td>{order.cartID}</td>
                        <td>{order.cheese_level}</td>
                        <td>{order.sauce_level}</td>
                        <td>{order.meat_level}</td>
                        <td>{order.spice_level}</td>
                    </tr>
                    ))}
                </tbody>
            </table>  
            {!isDelivered && (
            <form onSubmit={handleStatus}>
                <div class="custom-select-container">
                    <label htmlFor="status">Change Status: </label>
                    <div class="custom-select-wrapper">
                    <select id="status" class="custom-select" value={selectedStatus} onChange={handleStatusChange}>
                        <option></option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing your food">Preparing your food</option>
                        <option value="On its way">On its way</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                    <div class="dropdown-icon">&#9660;</div>
                    </div>
                </div>
                <button type="submit">Update Status</button>
            </form>
            )}
            <p>Current Status: {CurrentStatus}</p>
        </div>
    )
}

export default AdminOrderDetails;