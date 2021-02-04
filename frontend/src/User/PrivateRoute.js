import React from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../auth/apicalls'

const PrivateRoute = ({component:Component,...rest}) => {
    return (
        <Route
        {...rest}
        render={props =>
        (isAuthenticated() && isAuthenticated().manufacturer.roll==0)?
        (  
        <Component {...props}/>
        )
        :
        (isAuthenticated() &&isAuthenticated().manufacturer.roll==1)?
        (
            <Redirect to="/admin/home"/>
        )
        :
        (
            <Redirect to="/signin"/>
        )
    }
        />
    )
}

export default PrivateRoute
