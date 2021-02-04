import React, { useState } from 'react'
import { useEffect } from 'react'
import { getManufacturer, isAuthenticated } from '../auth/apicalls'
import { updateRetailer } from './Product/apicalls'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import './RetailerDashBoard.css'
import {state} from './variable'


const RetailerDashBoard = () => {


    const{token}=isAuthenticated();
    const{_id}=isAuthenticated().manufacturer;

    
    const[values,setValues]=useState({
        name:'',
        email:'',
        MNo:'',
        pincode:'',
        profile_pic:'',
        area:'',
        city:'',
        userState:'',
        success: false,
        formData:'',
        showPayment:false,
        showAddress:true     
    })
const[data,setData]=useState({
address:[]    
})

    const{name,email,profile_pic,formData,pincode,userState,MNo,area,city}=values;

useEffect(()=>
{
    getManufacturer(_id).then(response=>
        {
            if(response.err)
            {
                console.log(response.err)
            }
            else
            {
                setValues({...values,
                    name:response.name,
                    email:response.email,
                    MNo:response.MNo,
                    formData:new FormData()
                }
                )
                setValues({...data,address:response.address})

                
                
            }
        })
                
},[])


const handleChange = name => event => {
    const value = name === "profile_pic" ? event.target.files[0] : event.target.value;
  formData.set(name,value)

   setValues({ ...values, [name]: value });
 
  };


  const updateRetail=()=>
  {
    formData.set("name",name)
    formData.set("email",email)
    formData.set("MNo",MNo)
// Display the values
for (var value of formData.values()) {
    console.log(value); 
 }

      updateRetailer(_id,token,formData).then(response=>console.log(response))
  }

    return (
    <div className ="retail">
        
             <h1>Dashboard</h1>
           <div className="retail-photo">
               <img src="data:image/jpeg;base64,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"></img>
               <input onChange={handleChange('profile_pic')} type="file" placeholder="choose file"></input>
               </div> 
            <div className="retail-form">
               
             <form>
             <h3>USER INFORMATION</h3>
             <div className ="retailer-info">
                <label>Name</label>
                <input value={name}  onChange={handleChange('name')} type="text" placeholder="Your Name"></input>   
                   
            </div>

            <div className ="retailer-info">
                <label>Email</label>
                <input value={email} onChange={handleChange('email')} type="email" placeholder="Your Email"></input>    
            </div>


            <div className ="retailer-info">
                <label>phoneno</label>
                <input value={MNo} onChange={handleChange('MNo')} type="number" placeholder="Your Mobile number"></input>   
                   
            </div>
                  
                  
                  
         </form> 



            </div>  
        
          <div className="retail-address">
             <h3>ADDRESS INFORMATION </h3>
           <form>
               <div className ="retailer-info">
                <label>PIN code</label>
                <input value={pincode}  onChange={handleChange('pincode')} type="number" maxLength='6' placeholder="Your city pincode"></input>   
                   
            </div>


            <div className ="retailer-info">
                <label>Area</label>
                <input value={area} onChange={handleChange('area') }type="text-area" placeholder="Your Area"></input>   
                   
            </div>


            <div className ="retailer-info">
                <label>City</label>
                <input value={city} onChange={handleChange('city')} type="text" placeholder="Your city"></input>   
                   
            </div>

<div className="retailer-info">
           
           <label>Select State</label>
            <select value={userState} onChange={handleChange('userState')}>
                <option>
                    Select State 
                </option>

                {
                    state.map((name)=><option>{name}</option>)
                }
            </select>

            </div>


           </form>
                         
          </div>
           <button onClick={updateRetail}>Save</button>
        </div>
    )
}

export default RetailerDashBoard
