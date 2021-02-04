import React from 'react'
import './OrderStatus.css'

const OrderStatus = (props) => {
 
    console.log("PROPS",props)
 const onSuccess=()=>
 {
return(
    <div className="order-main">
        <div className="order-success-img">
    <img src="https://media.tenor.com/images/ce26467a28f432acc4d23dc3bc96d4af/tenor.gif"></img>
    </div>
    <div className="order-info">
    <h1>Your order is Successfully Placed</h1>
    <h3>Order ID:- {props.match.params.orderId} </h3>
    </div>
    <h1>Your Deliver detail</h1>
   <div className="order-detail">
       
    <div className="order-img">
        <img src="https://static.toiimg.com/photo/73244344.cms"/>
    </div>
    <div classNAme="order-date">
     <h1>20Nov 2000</h1>

     
  </div>
  


           
        

   </div>
   <button>View order detail</button>
   <div className="order-mail">
       <h1>veereshpaliwal.vp@gmail.com</h1>
    </div>
    </div>
)



 }   

 const onFailure=()=>
 {
return(
    
    <h1>Your Order is Failed</h1>
)

 }
   
    return (
        <div>
            {props.match.params.STATUS=="TXN_SUCCESS" && onSuccess()}
            {props.match.params.STATUS=="TXN_FAILURE" && onFailure()}
        </div>
    )
}

export default OrderStatus
