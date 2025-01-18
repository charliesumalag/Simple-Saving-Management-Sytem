import React, { useState } from 'react';
import axios from 'axios';
import Header from "../../components/header";
import styles from './register.module.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [inputData, setInputData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register.php', inputData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
            // Handle success (e.g., display a success message or redirect)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <Header />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className={styles.input}
                        value={inputData.firstName}
                        onChange={handleChange}
                    />
                    <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        className={styles.input}
                        value={inputData.lastName}
                        onChange={handleChange}
                    />
                    <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={styles.input}
                        value={inputData.email}
                        onChange={handleChange}
                    />
                    <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={styles.input}
                        value={inputData.password}
                        onChange={handleChange}
                    />
                    <i className={`fa-solid fa-unlock ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        name="cpassword"
                        type="password"
                        placeholder="Confirm Password"
                        className={styles.input}
                        value={inputData.cpassword}
                        onChange={handleChange}
                    />
                    <i className={`fa-solid fa-unlock ${styles.inputIcon}`}></i>
                </div>
                <div className="btn-container">
                    <button type="submit" className={`${styles.btn} ${styles.btnRegister}`}>
                        Register
                    </button>
                </div>
                <p className={styles.par}>
                    Already have an Account?{' '}
                    <Link to="/">
                        <span className={styles.span}>Login</span>
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
