import React from 'react'

const userManagement = () => {
  return (
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
  )
}

export default userManagement
