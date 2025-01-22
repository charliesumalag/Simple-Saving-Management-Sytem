import React, { useEffect, useState } from 'react';
import axios from "axios";
import styles from './admin.module.css';
import { useNavigate } from 'react-router-dom';

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
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>Admin Panel</div>
                <ul className={styles.navLinks}>
                    <li>Savings Management</li>
                    <li>User Management</li>
                </ul>
            </div>

            <div className={styles.mainContent}>
                <header className={styles.header}>
                    <h1>Welcome, {user.first_name} {user.last_name}</h1>
                    <button className={styles.logoutBtn}  onClick={handleLogout}>Logout</button>
                </header>

                <section className={styles.savingsSection}>
                    <h2>Savings Management</h2>
                    <form onSubmit={handleSavingsSubmit} className={styles.form}>
                        <input
                            type="number"
                            name="member"
                            placeholder="Member Name"
                            value={newSavings.memberId}
                            onChange={handleSavingsChange}
                            className={styles.input}
                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={newSavings.amount}
                            onChange={handleSavingsChange}
                            className={styles.input}
                        />
                        <button className={styles.btn}>Add Savings</button>
                    </form>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Member ID</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savings.map((savingsRecord) => (
                                <tr key={savingsRecord.id}>
                                    <td>{savingsRecord.memberId}</td>
                                    <td>{savingsRecord.amount}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteSavings(savingsRecord.id)}
                                            className={styles.deleteBtn}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className={styles.userManagement}>
                    <h2>User Management</h2>
                    <form onSubmit={handleCreateUser} className={styles.form}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            className={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            className={styles.input}
                        />
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={newUser.firstName}
                            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                            className={styles.input}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                            className={styles.input}
                        />
                        <button className={styles.btn}>Create User</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Admin;
