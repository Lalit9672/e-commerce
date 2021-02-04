import { API } from "../backend"


export const paytmPayment=(data)=>
{
     
return fetch(`${API}/checkout/${data._id}/paytm/payment`,{
    method:"POST",
    headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
   
   }).then(response=>{
    return response.json()
}).catch(err=>console.log(err))

}


export const finalResponse=()=>
{
    return fetch(`${API}/checkout/paytm/response`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>response.json()).catch(err=>console.log(err))
}

