import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/header";
import styles from './login.module.css';
import axios from 'axios';

const login = () => {
    const [inputDatas, setInputDatas] = useState({
        'email': '',
        'password': '',
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputDatas((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form submitted');
        console.log('Input data:', inputDatas); // Check if input data is correctly captured

        try {
            const response = await axios.post(
                'http://localhost:8000/api/login.php',
                inputDatas,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            );

            console.log('Response:', response); // Log the response

            if (response.data.errors) {
                setErrors(response.data.errors);
            } else if (response.data.user) {
                setSuccessMessage(response.data.message || '');

                if (response.data.user.role === 'admin') {
                    console.log('admin')
                    window.location.href = '/admin-dashboard';  // Redirect to Admin Dashboard
                } else {
                    window.location.href = '/member-dashboard';  // Redirect to Member Dashboard
                }
                setTimeout(() => {
                    setSuccessMessage('');

                }, 3000);
            } else {
                setErrors({ global: response.data.message || 'Unexpected error occurred' });
            }
            setInputDatas({
                email: '',
                password: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Error during login', error);
        }
    }


    return (
        <div className={styles.loginContainer}>
            <Header />
            <form onSubmit={handleSubmit} className={styles.form}>
                {errors.global && <p className={styles.error}>{errors.global}</p>} {/* Added error handling for global messages */}
                {errors.email && <p className={styles.error}>{errors.email}</p>}
                {errors.password && <p className={styles.error}>{errors.password}</p>}
                {successMessage && <p className={styles.message}>{successMessage}</p>}
                <div className={styles.inputContainer}>
                    <input
                        type="email"
                        name='email'
                        placeholder='Email'
                        className={styles.input}
                        value={inputDatas.email}
                        onChange={handleChange}
                    />
                    <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        name='password'
                        placeholder='Password'
                        value={inputDatas.password}
                        className={styles.input}
                        onChange={handleChange}
                    />
                    <i className={`fa-solid fa-unlock ${styles.inputIcon}`}></i>
                </div>
                <div className="btn-container">
                    <button className={`${styles.btn} ${styles.btnLogin}`}>Login</button>
                </div>
                <p className={styles.par}>Don't have an Account? <Link to="/register"> <span className={styles.span}>Register</span></Link></p>
            </form>
        </div>
    );
}

export default login;
