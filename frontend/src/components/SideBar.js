import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import {Redirect, withRouter,Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import './SideBar.css'
import Modal from 'react-modal';
import { Avatar } from '@material-ui/core';
import { isAuthenticated, signOut } from '../auth/apicalls';

const SideBar = ({history},props) => {

const [show,setShow]=useState(false);  








const signOutForm=()=>
{
    signOut(()=>{
        history.push("/signin")
    })

}

return ReactDOM.createPortal    
(

         <div onClick={props.onDismiss} id="main" className="main">
         <div onClick={(e)=>e.stopPropagation()} className="sidebar" id="sidebar" >
           <div className="sidebar-address">
               <Avatar src={AddAPhotoIcon}/>
               <h3>Lalit</h3>
           </div>
           <div className="sidebar-address">
               <LocationOnIcon/>
               <h3>Location</h3>
           </div>
           <div className="sidebar-address">
               <MenuBookIcon/>
               <h3>Your Orders</h3>
           </div>
          
          {(isAuthenticated() && isAuthenticated().manufacturer.roll==1) &&(
              <Link to="/admin/create">
          <div  className="sidebar-address">
              <AddIcon/>
              <h3>Create Product</h3>
          </div>
          </Link>
          )}
          <div className="sidebar-address">
              <CreateIcon/>
              <h3>Edit Products</h3>
          </div>
          <div className="sidebar-address">
              <DeleteIcon/>
              <h3>Delete Products</h3>
          </div>
          <div onClick={signOutForm} className="sidebar-address">
            <ExitToAppIcon/>
              <h3>Signout</h3>
          </div>
        </div>
        </div>,
        document.querySelector('#modal')
    
    )
}

export default withRouter(SideBar)
