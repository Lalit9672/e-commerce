import { check } from 'express-validator';
import React,{useState} from 'react'
import { Redirect } from 'react-router-dom';
import { signup } from './apicalls';
import './SignUp.css'



const SignUp=()=> {
    const[value,setValues]=useState({
            name:"",
            email:"",
            error:"",
            checkbox:false,
            success:false,
            MNo:"",
            password:"",
            address:"",
            roll:0
    })




const{email,name,password,MNo,error,success,checkbox,address,roll}=value;
    
   
const errorMessage=()=>
{

  return(
<div style={{display:success  ?"" :"none" }}>
  Success 
   
</div>
  
  )
} 
const didRedirect=()=>
{
  if(success)
  {
    return(
      <Redirect to="/signin"/>
    )
  }
}
const successMessage=()=>
{

return(
<div style={{ color:"red",   display:error ?"" :"none"  }}>
{error}
</div>
      
      )
}
   
            
const onTextChange=name=>event=>
    {
      
              setValues({...value,[name]:event.target.value});
                
        
              
    }

    const onSubmit=(event)=>
    {
event.preventDefault();

      setValues({...value,error:false,success:false})
       signup({name,email,password,MNo,roll,address}).then(data=>
       {
          
          if(data.err)
          {
            setValues({...value,error:data.err,success:false});
            console.log("CH",checkbox);
          }
          else

          {
          
            setValues({...value,success:true,
            name:"",
            email:"",
            password:"",
            MNo:"",
       
            })

       
          }
       }).catch(err=>
        {
          console.log("ERROR",err);
          setValues({...value,error:err,success:false})
        })           
      
     }

   

    return(
        <div className="signin">
        <img src="data:image/png;base64,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"/>
        <div className="form">
          <form>
            
            <label>Login</label>
            <div className="name">
            <span> <b>Your name  </b></span>
            <input onChange={onTextChange('name')}value={name} type="text" placeholder="Name"></input>
            </div>
            <div className="email">
            <span> <b>Email </b></span>
            <input onChange={onTextChange('email')} value={email} type="text" placeholder="Email"></input>
            </div>

            <div className="mno">
            <span> <b>Mobile-number</b></span>
            <input value={MNo}   onChange={onTextChange('MNo')} placeholder="Mobile-number"></input>
            </div>

              <div style={{display:"none"}} id="address" className="address">
            <span> <b>Address </b></span>
            <input  value={address}  onChange={onTextChange('address')} placeholder="Address"></input>
            </div>
            
            
              <div className="password">
            <span> <b>password </b></span>
            <input  value={password} onChange={onTextChange('password')} placeholder="Password"></input>
            </div>
             
            
            <div className="checkbox">
            <input id="c"  type="checkbox" onClick={(e)=>{
                if(e.target.checked)
                {
                  setValues({...value,checkbox:true,roll:1})
                  let c=document.getElementById("address").style;
                  c.display="flex"
                  c.flexDirection="column"
                }
                else
                {
                  setValues({...value,checkbox:false,roll:0})
                  document.getElementById("address").style.display="none"
                }
       }} ></input>
            <span> <b>As a manufacture </b></span>
            
            </div>
          </form>
       <p>Forget password</p>
       <button onClick={onSubmit}>Create Your amazon account</button>
       

        </div>

        {errorMessage()}
        {successMessage()}
       {didRedirect()}
      </div>
      
          )
         
      }
      


export default SignUp;