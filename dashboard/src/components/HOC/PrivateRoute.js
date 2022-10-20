import React from 'react'
import { Route, Navigate } from 'react-router-dom'

//private routes after successful authentication like home
const PrivateRoute = ({ component: Component, ...rest }) => {   //destructure props
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            return <Component {...props} />
        } else {
            return <Navigate to={'/signin'} />
        }
    }
    } />
}

export default PrivateRoute;