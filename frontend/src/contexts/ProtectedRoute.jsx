import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './AuthContext.jsx'
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, role } = useContext(AuthContext)
    const token = localStorage.getItem('token')

    return token ? children : <Navigate to="/login" />

}

export default ProtectedRoute


