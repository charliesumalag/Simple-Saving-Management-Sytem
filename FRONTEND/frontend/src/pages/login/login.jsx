import React from 'react'
import { Link } from 'react-router-dom';
import Header from "../../components/header";
import styles from './login.module.css';

const login = () => {
  return (
    <div className={styles.loginContainer}>
        <Header />
        <form action="" className={styles.form}>
            <div className={styles.inputContainer}>
                <input type="email" placeholder='Email' className={styles.input} />
                <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
            </div>
            <div className={styles.inputContainer}>
                <input type="password" placeholder='Password' className={styles.input} />
                <i className={`fa-solid fa-unlock ${styles.inputIcon}`}></i>
            </div>
            <div className="btn-container">
                <button className={`${styles.btn} ${styles.btnLogin}`}>Login</button>
            </div>
            <p className={styles.par}>Don't have an Account? <Link to="/register"> <span className={styles.span
            } >Register</span></Link></p>
        </form>
    </div>
  )
}
export default login
