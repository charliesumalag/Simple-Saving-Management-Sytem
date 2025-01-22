import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './member.module.css';
import { useNavigate } from 'react-router-dom';


const member = () => {
    const [savings, setSavings] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        try {
            // Call the logout API endpoint
            const response = await axios.get('http://localhost:8000/api/logout.php', {
                withCredentials: true, // Ensure the session is destroyed on the server-side
            });

            if (response.data.message === 'Logged out successfully') {
                // Redirect the user to the login page after successful logout
                window.location.href = '/';  // Redirect to login page
            }
        } catch (error) {
            console.error('Logout failed', error);
        }
    };


    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/session.php', {
                    withCredentials: true,
                });

                if (response.data.user) {
                    setUser(response.data.user);
                }else {
                    setUser(null);
                    navigate('/'); // Redirect to login page if no user is found
                }

            } catch (err) {
                console.error('Error fetching session data:', err);
                setUser(null);

                navigate('/'); // Redirect to login if error fetching session
            }
        };

        fetchSessionData([navigate]);
    }, []);
    return (
        <div className={styles.dashboardContainer}>
            <h1>Welcome to Your Dashboard</h1>


            <div className={styles.savingsContainer}>
                <h2>Your Savings</h2>
                {savings.length > 0 ? (
                    <table className={styles.savingsTable}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savings.map((saving) => (
                                <tr key={saving.id}>
                                    <td>{new Date(saving.date).toLocaleDateString()}</td>
                                    <td>{saving.amount}</td>
                                    <td>
                                        <button className={styles.editBtn}>Edit</button>
                                        <button className={styles.deleteBtn}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No savings records available.</p>
                )}
            </div>
            <button className={styles.logoutBtn}  onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default member
