import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login'
import Register from './pages/register/register'
import Admin from './pages/admin_dashboard/admin'
import Member from './pages/members_dashboard/member';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path='/admin-dashboard' element={<Admin/>}></Route>
        <Route path='/member-dashboard' element={<Member/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
