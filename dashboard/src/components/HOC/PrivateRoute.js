import React from 'react'
import { Route, Navigate } from 'react-router-dom'

//private routes after successful authentication like home
const PrivateRoute = ({ children }) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        return children;
    } else {
        return <Navigate to="/signin" />
    }
}

export default PrivateRoute;