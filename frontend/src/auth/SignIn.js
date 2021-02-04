import React,{useEffect, useState} from 'react'
import { signin,authenticate, isAuthenticated, getManufacturer } from './apicalls';
import {Link, Redirect} from 'react-router-dom'
import SdCardIcon from '@material-ui/icons/SdCard';
import PersonIcon from '@material-ui/icons/Person';
import './SignIn.css'
import LockIcon from '@material-ui/icons/Lock';

export default function SignIn() {
 const[values,setValues]=useState({
   email:"lalit7@gmail.com",
   password:"veeresh",
   error:"",
   success:false,
   latitude:'',
   longitude:''
 })

 useEffect(()=>{
getLocation()
 },[])

 const{email,password,error,success}=values;
 const {manufacturer}=isAuthenticated();
 const onTextChange=name=>event=>
 {
       setValues({...values,[name]:event.target.value})
       
 }


const getLocation=()=>
{
  
  navigator.geolocation.getCurrentPosition((position) => {
console.log(position.coords.latitude)
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=24.578120+73.701890&key=26667384a8a6482994dfc1792ad30262`).then(respons=>{console.log(respons.url)}
  )
  
  
       
//console.log(res)

})
} 
 const onSubmit = () =>
 {
          signin({email,password}).then(response=>
            {
              if(response.error)
              {
                 setValues({...values,error:response.err})
              }
              else
              {
                authenticate(response,()=>{
                  setValues({...values,success:true})
                })
              }
            
            }).catch(err=>
              {
                console.log(err);
              })

 }

 const didRedirect=()=>
 {
   if(success)
   {
    
      if(isAuthenticated() && manufacturer.roll==1)
      {
   return(
     <Redirect to="/admin/home"/>
   )
      }
       else if( isAuthenticated() && manufacturer.roll==0)
       {
   return(
     <Redirect to="/user/home"/>
   )
       }

   }
 }

  return (
<div className="signin">
  <div className="signin-left">
  <img src="./sigin-img.webp"/>
  <Link>Create Account</Link>
  </div>
  <div className="signin-form">
  <h1>Log in</h1>
      
    <form onSubmit={(e)=>e.preventDefault()}>
      <div className="email">
      <span> <b>Email </b></span>
      <div className="input-email">
        <PersonIcon className="start"/>
      <input value={email} type="text"  onChange={onTextChange('email')} placeholder="Email"></input>
      </div>
      </div>
        <div className="password">
      <span> <b>Password </b></span>
      
      <div className="input-password">
      <LockIcon/>
      <input  value={password} onChange={onTextChange('password')} type="password" placeholder="Password"></input>
      </div>
      </div>
    <button onClick={onSubmit}>Login</button>
    </form>
 <p>Forget password</p>
 <Link to="/signup">
<button onClick={()=>console.log("ERRO",success) }>Create</button>

 </Link>
 

  </div>
  {didRedirect()}
</div>

    )
}
