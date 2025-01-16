import React from 'react'
import Header from "../../components/header";
import styles from './register.module.css';
import { Link } from 'react-router-dom';
const register = () => {
    return (
        <div className={styles.registerContainer}>
            <Header />
            <form action="" className={styles.form}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='First Name' className={styles.input} />
                    <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='Last Name' className={styles.input} />
                    <i className={`fa-solid fa-user ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input type="email" placeholder='Email' className={styles.input} />
                    <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
                </div>
                <div className={styles.inputContainer}>
                    <input type="password" placeholder='Password' className={styles.input} />
                    <i className={`fa-solid fa-unlock ${styles.inputIcon}`}></i>
                </div>
                <div className="btn-container">
                    <button className={`${styles.btn} ${styles.btnRegister}`}>Register</button>
                </div>
                <p className={styles.par}>Already have an Account? <Link to='/' ><span className={styles.span}>Login</span></Link></p>
            </form>
        </div>
      )
}

export default register
