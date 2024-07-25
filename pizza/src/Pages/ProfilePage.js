import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Panel.css';

function ProfilePage() {
    let { userID } = useParams();
    const navigate = useNavigate();

    const [currentUser, setUser] = useState([]);
    const [addressList, setAddress] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const condenseOrders = (orders) => {
        const condensedOrders = [...orders];
    
        for (let i = 0; i < condensedOrders.length - 1; i++) {
          for (let j = i + 1; j < condensedOrders.length; j++) {
            if (condensedOrders[i].orderID === condensedOrders[j].orderID) {
              console.log("condensed");
              condensedOrders[i].MenuName += `, ${condensedOrders[j].MenuName}`;
              condensedOrders.splice(j, 1);
              j--;
            }
          }
        }
    
        return condensedOrders;
      };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const urlForUser = `/api/UserController/profile/${userID}`;
                const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlForUser), { withCredentials: true });
                setUser(response.data.user);
                setAddress(response.data.address);
                const condensedOrders = condenseOrders(response.data.orderItems);
                setOrderList(condensedOrders);
              
                console.log(orderList);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();;
    }, [userID]);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const urlLogout = "/api/UserController/logout";
            const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlLogout), { withCredentials: true });

            if (response.data.Message === "Logged out successfully") {
                toast.success("Logged out successfully");
                navigate("/");
                window.location.reload();
            } else {
                toast.error("Error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleOrderChange = (e) => {
        const selectedOrderID = e.target.value;
        const selectedOrderData = orderList.find((order) => order.orderID === selectedOrderID);
        setSelectedOrder(selectedOrderData);
    };

    return (
        <div className="container mt-4">
            <h1>Welcome, {currentUser.username}!</h1>
            <h3>Phone Number: {currentUser.phone}</h3>
            <div className="mb-4">
                <h4>Your Addresses</h4>
                {addressList.length === 0 ? (
                    <p>No addresses added</p>
                ) : (
                    <ul className="list-group">
                        {addressList.map((address) => (
                            <div className="card" style = {{fontSize: '20px'}} key={address.addressID}>

                                <li className="list-group-item">
                            
                                    <p><b>Address Line 1: </b>{address.line1}</p>
                                    <p><b>Address Line 2:</b> {address.line2}</p>
                                    <p><b>Apt:</b> {address.apt}</p>
                                    <p style={{marginLeft: 25}}><b>Zipcode:</b> {address.zipcode}</p>
                                    
                                </li>
                        </div>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <h4>Your Order History</h4>
                  
                    <div value="">
                    {orderList.map((order) => (
                            <div className="card" style = {{marginBottom: 10, fontSize: '20px'}} key={order.orderID} value={order.orderID}>
                               <div className="row">
                                <div className="col-md-6 text-start">
                                <p ><b>Order ID: {order.orderID}</b></p>
                                <br></br>
                                <br></br>
                                <p>Items: {order.MenuName}</p>
                                </div>
                                <div className="col-md-6 text-md-end">
                                <p>Order Status: <b>{order.order_status}</b></p>
                                <br></br>
                                <br></br>
                                <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
                                </div>
                                </div>
                            </div>
                    ))}
                    </div>
            </div>
            <button type='button' className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
            <ToastContainer />
        </div>
    );
}

export default ProfilePage;
