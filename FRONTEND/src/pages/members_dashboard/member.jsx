import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './member.module.css';
import { useNavigate } from 'react-router-dom';

const Member = () => {
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
                    console.log(response.data.user.user_id);
                    fetchSavings(response.data.user.user_id); // Fetch the savings using the user_id
                } else {
                    setUser(null);
                    navigate('/'); // Redirect to login page if no user is found
                }

            } catch (err) {
                console.error('Error fetching session data:', err);
                setUser(null);
                navigate('/'); // Redirect to login if error fetching session
            }
        };

        fetchSessionData();
    }, [navigate]); // Add navigate as a dependency to ensure the useEffect works correctly on navigation

    const fetchSavings = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/getSavings.php?user_id=${userId}`, {
                withCredentials: true, // Include credentials to maintain session
            });
            if (response.data.success) {
                setSavings(response.data.savings);
            } else {
                console.error('Failed to fetch savings:', response.data.message);
            }
        } catch (err) {
            console.error('Error fetching savings:', err);
        }
    };

    const calculateTotalSavings = () => {
        return savings.reduce((total, saving) => total + parseFloat(saving.amount), 0).toFixed(2);
    };

    if (!user) {
        return <div>Loading...</div>; // Show a loading message while waiting for user data
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.profileContainer}>
                    <i className="fa-solid fa-user"></i>
                    <h1 className={styles.headerText}>
                    {user.first_name} {user.last_name}</h1>
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>

            <div className={styles.savingsContainer}>
                {savings.length > 0 ? (
                    <>
                        <p className={styles.totalText}>Total Savings</p>
                        <p className={styles.savingText}>PHP {calculateTotalSavings()}</p>
                        <table className={styles.savingsTable}>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savings.map((saving) => (
                                    <tr key={saving.id}>
                                        <td className={styles.td}>{new Date(saving.date_added).toLocaleDateString('en-CA')}</td>
                                        <td>{saving.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>No savings records available.</p>
                )}
            </div>


        </div>
    );
};

export default Member;
