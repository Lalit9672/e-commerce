import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link, Redirect, withRouter} from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton,Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './Header.css'
import { isAuthenticated } from '../auth/apicalls';


const menuClick=()=>
{


}

    const Header = ({history}) => {
    return (
        <div className="header">
            <div onClick={menuClick} className="header-menu">
              <MenuIcon  />
     
            </div>

             <div className="header-left">
                 <Avatar src="data:image/jpeg;base64,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"/>
                 <div className="header-input">
                <SearchIcon/>
                <input type="text" placeholder="Search"/>
            </div>
           
             </div>
             <div className="header-middle">
           
           {(isAuthenticated() && isAuthenticated().manufacturer.roll==1) ? 
         ( <Link to="/admin/home">
          <HomeIcon />
            </Link>)
             :
             (isAuthenticated() && isAuthenticated().manufacturer.roll==0 ? (
              <Link to="/user/home">
              <HomeIcon />
                </Link>
             ):
             (
              <Link to="/signin">
              <HomeIcon />
                </Link>
             )
             )
          
          }
             
           
             {!isAuthenticated() && (
                <Link to="/signin">
                <LockIcon/>
                </Link>
             )}   
                 <Link to="/signup">  
                 
                 <LockOpenIcon />
                 </Link>
                  <Link to="/user/dashboard">
                 <AccountCircleIcon/>
                 </Link>
             </div>
             <div className="header-right">
       
                 <IconButton>
                   <p>0</p>
                     <ShoppingBasketIcon onClick={()=>history.push('/user/products/cart')}/>
                 </IconButton>
                     </div>
        </div>
    )
}

export default withRouter(Header);
