import React, { useEffect, useState } from 'react'
import _ from 'lodash'; 
import { getImage, getProduct } from '../Admin/Product/apicalls';
import { getManufacturer, isAuthenticated } from '../auth/apicalls';
import './Cart.css'
import CartComponent from './components/CartComponent'
import { createOrder } from './apicalls';
import { Link, Redirect } from 'react-router-dom';
import Payment from './Payment';






const Cart = () => {
   
    const[values,setValues]=useState({
        cartProductId:[],
         setReload:false
                
    })
    const[finalPrice,setFinalPrice]=useState(0);
    const{cartProductId}=values;
    const{token}=isAuthenticated();
    const{_id}=isAuthenticated().manufacturer;
    const{name}=isAuthenticated().manufacturer;
  
useEffect(()=>{
    
getCart();
},[cartProductId])









const getCart=()=>

{   
   
getManufacturer(_id).then(response=>setValues({cartProductId:response.cart})) 

}

    return (
        <div id="h" className="cart">
        <div className="cart-main">
               <div className="cart-left">

                   <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"/>
                   <h3 >Hello {name}</h3>
                   
               </div>
               <div className="cart-right">
               
                 <div className="cart-amount">
                     <span>Subtotal(2)iteams:</span>
    <span>₹ {finalPrice}</span>
                 </div>
                 <div className="cart-gift">
                     <input type="checkbox"></input>
                     <span>This contain gift</span>    
                 </div>
             <Link to="/user/products/checkout">
             <button>Proceed to checkout</button>
             </Link>
               </div>
                      
        </div>

{
 (cartProductId.length>0) && (cartProductId.map((productId)=>
 { 
     
     
     
     
     return(
      <CartComponent key={productId._id}  finalPrice={finalPrice} setFinalPrice={setFinalPrice} cartProduct={productId}/>
  )
  
 }))

}
        
        
        </div>
    )




}

export default Cart;

