import React,{useEffect, useState} from 'react'
import ProductCard from './Product/Components/ProductCard'
import './HomeMenu.css'
import { getImage, getProducts } from './Product/apicalls';
import {  isAuthenticated } from '../auth/apicalls';
const HomeManu = () => {

    const[products,setProducts]=useState([]);
    
  const{token}=isAuthenticated();
  const{_id}=isAuthenticated().manufacturer;

useEffect(() => {
    
   getProducts(_id).then(response=>{
       if(response.error)
       {
           console.log(response.error);
       }
       else
       {
           
        
           setProducts(response);
       
        }
   });
}, [products])


    return (
        <div className="products">

       { products.length>0 && products.map((product,index)=>
       {
           
           return(
           <ProductCard key={product._id} product={product} name={product.name} price={product.price} src={getImage(product)}/>
           
           )
       }
       )

       }

        </div>
    )
}

export default HomeManu
