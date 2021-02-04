const { API } = require("../../backend");

export const getAllProducts=(manuId)=>
{
    return fetch(`${API}/allproducts/${manuId}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>response.json())
    .catch(err=>console.log(err))
}

export const addToCart=(manuId,token,productId)=>
{
 return fetch(`${API}/cart/${manuId}/${productId}`,{
     method:"POST",
     headers:{
         Accept:"application/json",
         Authorization:`Bearer ${token}`

     }
 }
 
 ).then(response=>console.log(response))
 .catch(err=>console.log(err)) 
}


export const removeToCart=(manuId,token,productId)=>
{
    
 return fetch(`${API}/cart/remove/${manuId}/${productId}`,{
     method:"POST",
     headers:{
         Accept:"application/json",
         Authorization:`Bearer ${token}`

     }
 }
 
 ).then(response=>console.log(response))
 .catch(err=>console.log(err)) 
}




export const updateRetailer = (manuId, token, retailer) => {
    return fetch(`${API}/retailer/${manuId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: retailer
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };










export const createOrder=(token,orderData)=>
{

    return fetch(`${API}/order/create`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})
    }).then(response=>{
        response.json()
    }).catch(err=>console.log(err))
}