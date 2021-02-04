import { API } from "../backend";


export const signin = user => {
    return fetch(`http://localhost:4001/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
          console.log("RESPONSE",response);
        return response.json();
      })
      .catch(err => console.log(err));
  };



  export const signup = user => {
    return fetch(`http://localhost:4001/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
         
        return response.json();
      })
      .catch(err => console.log(err));
  };


 export const authenticate=(data,next)=>
 {
   if(typeof window!= "undefined")
   {
      localStorage.setItem("jwt",JSON.stringify(data));
          next()
   }
 }

 export const isAuthenticated=()=>
 {
   if(localStorage.getItem("jwt"))
   {
     return JSON.parse(localStorage.getItem("jwt"))
   }
   else
   {
     return false;
   }   




 }


 export const getManufacturer=(manuId)=>
 {
   return fetch(`http://localhost:4001/api/manufacturer/${manuId}`,{
     method:"GET",
     headers:{
       Accept: "application/json",
       "Content-Type": "application/json"
     }
   }).then(response=>response.json()).catch(err=>console.log(err))
 }





export const signOut=next=>
{
  if(typeof window!=="undefined")
  {
    localStorage.removeItem("jwt")
    next();
    return fetch(`${API}/signout`,{
      method:"GET"
    }).then(response=>
      {
        console.log("RESPONSE","SIGNOUT SUCCESS");
      }).catch(err=>console.log("ERROR",err))
  }
}













