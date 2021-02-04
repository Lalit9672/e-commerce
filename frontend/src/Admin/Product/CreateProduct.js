import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../../auth/apicalls';
import { createPro, getAllCategories } from './apicalls';

import './CreateProduct.css'




const CreateProduct = () => {


  const{token}=isAuthenticated();
  const{_id}=isAuthenticated().manufacturer;

  const [values,setValues]=useState({
      name:"",
      description:"",
      stock:"",
      price:"",
      error:"",
      success:false,
      category:"",
      categories:[],
      photo:"",
      formData:''

  })

  const{name,photo,description,error,stock,price,category,categories,formData}=values;


   

        useEffect(()=>{
        loadCategories();
        
    
        },[])

        const loadCategories=()=>
        {
        getAllCategories().then(response=>{
           
            if(response.error)
            {
                setValues({...values,error:response.error})
            }
            else
            {
              setValues({...values,categories:response,formData:new FormData()})  
          
            }
        })
        }
    
        const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value)
        console.log(_id);
        setValues({ ...values, [name]: value });
   
        };
  


        const onSubmit=(event) =>
        {
      
     event.preventDefault(); 
     formData.set("manufacturer_id",_id)
     createPro(_id,token,formData).then(response=>{
     console.log(response)
          if(response.error)
         {
            
     setValues({...values,error:response.error,success:false})
     }
     else
     {
     setValues({...values,
     success:true,
                name:"",
                description:"",
                photo:"",
                price:"",
                sold:"",
                stock:"",
                
            })
         }
     
         }).catch(err=>console.log(err))         
    }

    return (
        <div className="create">
    
        <div className="create-product">

      
                
          <form>
          <h1>Create Product</h1>          
              <div className="name">
              <span> <b>Name </b></span>
              <input type="text" value={name} onChange={handleChange('name')}></input>
              </div>
              <div className="description">
              <span> <b> Descreption </b></span>
              <input  value={description} onChange={handleChange("description")} type="text"></input>
              </div>
              <div className="category">
              <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
                  </div>
              <div className="image">
              
              <input id="image-input"  onChange={handleChange("photo")} type="file" accept="image/*"></input>
              </div>
              
              <div className="price">
              <span> <b> Price </b></span>
              <input type="number"  value={price}onChange={handleChange("price")} ></input>
              </div>
              <div className="stock"> 
              <span> <b>  Stock</b></span>
              <input type="number" value={stock} onChange={handleChange("stock")}></input>
              </div>
              <button onClick={onSubmit}>Create database</button>

              
          </form>
          </div>
               
          </div>
            
        
    )
}

export default CreateProduct