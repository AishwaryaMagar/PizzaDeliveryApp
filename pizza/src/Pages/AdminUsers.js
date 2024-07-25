import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminUsers() {
    const [Users, setusers] = useState([])

    useEffect(() => {
        const fetchDataDetails = async () => {
            try {
                const urlAdminPanel = "/api/AdminController/GetUsers";
                const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlAdminPanel));
                setusers(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchDataDetails()
    }, [])
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {Users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminUsers;
