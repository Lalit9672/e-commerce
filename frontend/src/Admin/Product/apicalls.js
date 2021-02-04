const { API } = require("../../backend");

export const createPro = (manuId, token, product) => {
    return fetch(`${API}/product/create/${manuId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: product
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

export const getAllCategories=()=>
{
    return fetch(`${API}/category`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err))

}

export const getProducts=(manuId)=>
{
  return fetch(`${API}/products/${manuId}`,{
    method:"GET",
    headers:{
    "Content-Type":"application/json"  
    }
  }).then(response=>{
    return response.json();
  }).catch(err=>console.log(err))
}


export const getProduct=(productId)=>
{
  return fetch(`${API}/product/${productId}`,{
    method:"GET"
  }).then(response=>response.json()).catch(err=>console.log(err))
}




export const getImage=(product)=>
{
return  product
? `${API}/product/photo/${product._id}`
: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
}


