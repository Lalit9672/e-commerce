import React, { useEffect } from 'react'
import './ProductCard.css'
import { getManufacturer, isAuthenticated } from '../../../auth/apicalls';
import { addToCart } from '../../../User/Product/apicalls';
import { withRouter } from 'react-router-dom';
const ProductCard = ({product,price,name,src,history}) => {
    const{token}=isAuthenticated();
  const{_id}=isAuthenticated().manufacturer;

    const addToBasket=()=>
    {
      addToCart(_id,token,product._id).then(response=>console.log(response))
         history.push("/user/products/cart");       
    }

    useEffect(()=>{
     loadCartProduct();
    },[])


    const loadCartProduct=()=>
    {
   // getManufacturer(_id).then(response=>console.log(response))
    }
    
    return (
        <div className="product-card">
        <h1>{name}</h1>
           <h3>₹ {price} </h3>  
           <div className="product-image">
         <img src={src}/>
           </div>
 {
           isAuthenticated() && isAuthenticated().manufacturer.roll==0 &&
           <button onClick={addToBasket}>Add to cart</button>
           
 }
 {
   isAuthenticated() && isAuthenticated().manufacturer.roll==1 &&
   <button onClick={addToBasket}>Edit Product</button>
 }
           </div>
    )
}

export default withRouter(ProductCard);
