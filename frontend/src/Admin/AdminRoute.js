import React from 'react'
import {Redirect,Route} from 'react-router-dom'
import { isAuthenticated } from '../auth/apicalls'
const AdminRoute = ({component:Component,...rest}) => {
    return (


        <Route
        {...rest}
        render={props =>
        (isAuthenticated() && isAuthenticated().manufacturer.roll==1)?
        (  
        <Component {...props}/>
        )
        :
        (isAuthenticated() &&isAuthenticated().manufacturer.roll==0)?
        (
            <Redirect to="/user/home"/>
        )
        :
        (
            <Redirect to="/signin"/>
        )
    }
        />
    )
}
export default AdminRoute;