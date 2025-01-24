import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from './admin.module.css';
import { useNavigate } from 'react-router-dom';
import Saving from "../../components/saving_management/savingManagement";

const Admin = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [savings, setSavings] = useState([]);
    const [newSavings, setNewSavings] = useState({ memberId: '', amount: '' });
    const [newUser, setNewUser] = useState({ email: '', password: '', firstName: '', lastName: '' });


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

    // Fetch session data
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
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                console.error('Error fetching session data:', err);
                setUser(null);
                setLoading(false);
                navigate('/login'); // Redirect to login if error fetching session
            }
        };

        fetchSessionData([navigate]);
    }, []);

    // Fetch savings data
    useEffect(() => {
        const fetchSavings = async () => {
            try {
                const response = await axios.get('', {
                    withCredentials: true,
                });
                setSavings(response.data.savings || []);
            } catch (err) {
                console.error('Error fetching savings data:', err);
            }
        };

        fetchSavings();
    }, []);

    const handleSavingsChange = (e) => {
        const { name, value } = e.target;
        setNewSavings((prev) => ({ ...prev, [name]: value }));
    };

    const handleSavingsSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('', newSavings, {
                withCredentials: true,
            });
            if (response.data.success) {
                setSavings([...savings, newSavings]);
                setNewSavings({ memberId: '', amount: '' });
            }
        } catch (err) {
            console.error('Error adding savings:', err);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('', newUser, {
                withCredentials: true,
            });
            if (response.data.success) {
                alert('User created successfully');
                setNewUser({ email: '', password: '', firstName: '', lastName: '' });
            }
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    const handleDeleteSavings = async (savingsId) => {
        try {
            const response = await axios.delete(``, {
                withCredentials: true,
            });
            if (response.data.success) {
                setSavings(savings.filter((savings) => savings.id !== savingsId));
            }
        } catch (err) {
            console.error('Error deleting savings:', err);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <h1 className={styles.adminHeaderText}>Welcome, {user.first_name}</h1>
                    <i className={`fa-solid fa-gear ${styles.settings}`}></i>

                </header>
                <Saving />
            </div>
            <button className={styles.logoutBtn}  onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Admin;
