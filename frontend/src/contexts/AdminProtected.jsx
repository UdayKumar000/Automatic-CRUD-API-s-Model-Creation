import React from 'react'
import { Navigate } from 'react-router-dom'


const AdminProtected = ({ children }) => {

    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (role !== 'admin') {
        return <Navigate to="/login" />
    }

    return token ? children : <Navigate to="/login" />
}

export default AdminProtected
