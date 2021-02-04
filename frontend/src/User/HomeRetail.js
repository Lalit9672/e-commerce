import React, { useEffect, useState } from 'react'
import { getImage } from '../Admin/Product/apicalls'
import ProductCard from '../Admin/Product/Components/ProductCard'
import {getManufacturer, isAuthenticated} from '../auth/apicalls'
import {  getAllProducts } from './Product/apicalls'
const HomeRetail = () => {
const[products,setProducts]=useState([])
    const{token}=isAuthenticated();
    const{_id}=isAuthenticated().manufacturer;
  
     useEffect(()=>{
   getAllPro();
   return()=>{
       
   }
     },[products])

    const getAllPro=()=>{

        getAllProducts(_id).then(response=>{
            if(response.error)
            {
                console.log(response.error);
            }
            else
            {
               setProducts(response)
            }
        })
    }   
    
    return (
        <div className="products">

       { products.length>0 && products.map((product,index)=>
       {
           return(
           <ProductCard key={product._id}  product={product} name={product.name} price={product.price} src={getImage(product)}/>
    
                    )
       }
       )

       }

        </div>
    )
}



export default HomeRetail
