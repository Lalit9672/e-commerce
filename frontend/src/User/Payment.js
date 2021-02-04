import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { getProduct } from '../Admin/Product/apicalls';
import _ from 'lodash'

import { getManufacturer, isAuthenticated } from '../auth/apicalls';

import './Payment.css'
import { Link, Redirect } from 'react-router-dom';
import { paytmPayment,getPaymentResponse, finalResponse } from './apicalls';
const Payment = () => {
  
  const{_id}=isAuthenticated().manufacturer;
//const[respo,setRespo]=useState('')
    const[values,setValues]=useState({
   userInfo:false,
    address:[],
    selectedAddress:'',
    name:'',
    email:'',
    mno:'',
    error:'',
    val:0,
    success:false,
    totalAmount:0,
    products:[],
    cartProductId:[],
    paymentData:'',
})
const[show,setShow]=useState({

    showAddress:true,
    showPayment:false,
})
const{name,val,address,mno,cartProductId,products,userInfo,totalAmount,email,selectedAddress,paymentData} =values;
const{showAddress,showPayment}=show;


useEffect(()=>{
getManu();

},[])

useEffect(()=>
{
    getCartProduct()
},[cartProductId])






const addNewAddressForm=()=>
{

}
    






function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === '[object Date]'
  }
  
  function isObj(val) {
    return typeof val === 'object'
  }
  
   function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val)
    } else {
      return val
    }
  }
  
  function buildForm({ action, params }) {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('action', action)
  
    Object.keys(params).forEach(key => {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', key)
      input.setAttribute('value', stringifyValue(params[key]))
      form.appendChild(input)
    })
  
    return form
  }
  
   function post(details) {
    const form = buildForm(details)
    document.body.appendChild(form);
    form.submit();
   
 
    form.remove()
  }






const getCartProduct=()=>
{
    let amount=0;
    
cartProductId.map((product,index)=>
{
    
   getProduct(product._id).then(response=>{
    products.push(response)
     amount= amount+(response.price * product.quantity);
  setValues({...values,totalAmount:amount})        
   })
   
   
})

}
  
  
       const makePaytmPayment=()=>
       {





if(userInfo)
{       
        paytmPayment({amount:totalAmount,address:selectedAddress,name:name,email:email,_id:_id}).then(response=>{

             // console.log(response)            
            var details={
                action:"https://securegw-stage.paytm.in/order/process",
                params:response
            }
            
          post(details);
        


        }
        )   
      }
      else
      {
        console.log("Unable to Load Payment")
      }

 


        








       }


   const getManu=()=>
   {
    getManufacturer(_id).then(response=>{
          
    if(response.error)
    {
          console.error("error");
    }
    else
    {
      console.log(response)
        setValues({...values,
        name:response.name,
        userInfo:true,
        mno:response.MNo,
        email:response.email,
        address:response.address,
        cartProductId:response.cart
        
        })
    }
    })}

    const paymentForm=()=>
    {
         return(
           
            <div className="checkout-address">  
               <div className="address-status-bar">
                  <div className="box">
                      <h3>2</h3>    
                  </div>
                  <h3>PAYMENT METHOD</h3>
              </div>
{ showPayment && (
                 <div>
                 <div onClick={()=> makePaytmPayment()}  className ="payment-option">
                 <input  type="radio"></input> 
                 <Avatar src="/upi.gif"/>
                  <label>paytem google pay upi</label>
                  </div>  
                     <div className ="payment-option">
                 <input type="radio"></input>
                  <label>pay on delivery</label>
                     </div> 
                     <div className ="payment-option">
                   <input type="radio"></input>
                   <div>
                       {/* <StripeCheckout




                       name="Buy Products"
                       
                       currency='inr'
                       stripeKey="pk_live_51HJeD7GueYnGSJeKTFEAAIJVXQcivwkvGx5Ga4HpSLP1lOiaI9NKX89Rg4yIpxNG0EZf9ws5yyWhN1Ycx3Po4Q9g00RUg1vRzE"
                        amount={totalAmount*100}
                       />
                            */}
                            
                       
                   </div>
                   </div>
                     </div> 
                       )                       }
                </div>
        ) 
         
    }

const makePayment=()=>
{

   return fetch(`http://localhost:4001/api/checkout/stripe`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
            
        },
        body:JSON.stringify({token:{products,name:name,email:email,address:selectedAddress,totalAmount}})
    });


}
    const deliveryForm=()=>
    {
        return(
            
            <div className="checkout-address">
                <div className={`address-status-bar ${showAddress}`}>
                  <div className="box">
                   <h3>1</h3>         
                             
                  </div>
                  <h3> DELIVERY ADDRESS </h3>

        {!showAddress && <button onClick={()=>setShow({...show,showAddress:true,showPayment:false})} className="address-change">CHANGE</button> }

                </div>

               

              { showAddress && <div className="address-fragment">
                { address.length>0 && address.map((add,index)=>(
                    <div className={`address-show index-${index}`}>

<input value={index} onClick={()=>setValues({...values,val:index}) } checked={index==val}   type="radio"></input>


<div className={`address-data`}>
<div className="profile-info">

<label>{name}</label>
<label>{mno}</label>
</div>  
<div className="address-info">
<label>{add.area+" "+add.state+" "+add.pincode+" "+add.city}</label>      
</div>

<button onClick={()=>{ setValues({...values,val:index,selectedAddress:address[index]})
 setShow({...show,showAddress:false,showPayment:true}) } }>Deliver here</button>
</div>
</div>
                ))
                
    }
    </div>
    }
            </div>
        )
        
    }
    
    return (

        <div className="checkout">
       
       <div className="checkout-left">

       {deliveryForm()}
       { paymentForm()}
       </div>
<div className="checkout-right">
<div className="price-details">
    
<h1>PRICE DETAILS</h1>
</div>
<div className="price-info">
    <div className="price-first">
<span>Price ({cartProductId.length} iteam)</span>
    <h3>₹ {totalAmount}</h3>
    </div>
    <div className="price-second">
<span>Delivery Charges</span>
<h3>FREE</h3>
    </div>

    <div className="total-amount">
    <span>Total Payable</span>
    <h3>₹ {totalAmount}</h3>
    </div>
</div>
</div>
        </div>
       
    )
}

export default Payment
