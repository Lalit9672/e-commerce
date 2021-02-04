import React, { useEffect, useState } from 'react'
import { getImage, getProduct } from '../../Admin/Product/apicalls'
import { isAuthenticated } from '../../auth/apicalls'
import { removeToCart } from '../Product/apicalls'
import './CartComponent.css'
const CartComponent = ({cartProduct,setFinalPrice,finalPrice,}) => {
  let price=0;  

  const{token}=isAuthenticated();
  const{_id}=isAuthenticated().manufacturer;
    const[reload,setReload]=useState(false); 
  const[product,setProduct]=useState({});
  
useEffect(()=>{
getProductInfo();
},[])



useEffect(()=>{
 totalAmount() 
},[product])




const removeCart=(productId)=>
{
 removeToCart(_id,token,productId).then(response=>console.log(response))
 
 
}

const totalAmount=()=>
   {
     if(cartProduct && product.price!=undefined)
     {
         let amount=0;
         amount=product.price*cartProduct.quantity;
        setFinalPrice(finalPrice+amount); 
     
      }

   }


  const getProductInfo=()=>
  {
  
     getProduct(cartProduct._id).then(response=>{
      setProduct(response);

      
      
        
     })
  }
    return (
        <div className="cart-component">
            
            <img src={ getImage(product)} />
            <div className="product-detail">
    <h1>{product.name}</h1>
    <h3>₹ {product.price}</h3>
    
<div className="cart-quantity">
  <select>
  
  

{ 
<option>{cartProduct.quantity}</option>
}


  </select>
</div>

      <div className="product-rate">     

               {
               Array(5)
                
                .fill()
                .map((_, i) => (
                  <p>🌟</p>
                
                ))}
          </div>
<button onClick={()=>removeCart(product._id)}>Remove to basket</button>
{
     }
            </div>

        </div>
    )
}

export default CartComponent
