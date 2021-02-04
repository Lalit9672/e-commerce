import React from 'react'
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import './App.css'
import Header from './components/Header';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import HomeRetail from './User/HomeRetail';
import HomeManu from './Admin/HomeManu';
import AdminRoute from './Admin/AdminRoute';
import PrivateRoute from './User/PrivateRoute';
import { isAuthenticated } from './auth/apicalls';
import CreateProduct from './Admin/Product/CreateProduct';
import Cart from './User/Cart';
import RetailerDashBoard from './User/RetailerDashBoard';

import Payment from './User/Payment';
import OrderStatus from './User/OrderStatus';
import Slider from './components/Slider';
import SideBar from './components/SideBar';
const App=()=> {
    return(


        <div className="app">
        <Router>    
        <Header/>
        
        <div className="app-body">
        
        <Switch>
                 <Route path="/" exact component={isAuthenticated() && isAuthenticated().manufacturer.roll===1 ? HomeManu 
                    : isAuthenticated() && isAuthenticated().manufacturer.roll===0 ?
                     HomeRetail : SignIn}/>            
            <Route path="/signin" exact component={SignIn}/>
            <Route path="/signup" exact component={SignUp}/> 
            <AdminRoute path="/admin/home" exact component={HomeManu}/>
            <AdminRoute path ="/admin/create" exact component={CreateProduct}></AdminRoute>
            <PrivateRoute path ="/user/products/cart" exact component={Cart}></PrivateRoute>
                <PrivateRoute path="/user/home" exact component={HomeRetail}></PrivateRoute>                
                <PrivateRoute path="/user/dashboard" exact component={RetailerDashBoard}></PrivateRoute>                
                <PrivateRoute path="/user/products/checkout" exact component={Payment}></PrivateRoute>                
                <PrivateRoute path="/user/products/checkout/status/:orderId/:STATUS" exact component={OrderStatus}></PrivateRoute>                
             </Switch>
        </div>
        </Router>
        </div>
    )
}
export default App;