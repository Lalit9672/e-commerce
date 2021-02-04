
const formidable=require('formidable')
const fs=require('fs')
const Manufacturer = require('../models/Manufacturer')
const Product=require("../models/Product")


exports.getProductId=(req,res,next,id)=>
{
  Product.findById(id).exec((err,product)=>
  {
      if(err || !product)
      {
          return res.status(400).json({
              error:"Prouct Not Found"
          })
      }

      req.product=product;
      next();
  })


}



exports.createProduct=(req,res)=>
{
  let form=new formidable.IncomingForm();
  form.keepExtensions =true;

  form.parse(req,(err,fields,file)=>
  {
      if(err)
      {
          return res.status(400).json(
              {
                  error:"problem with image"
              }
          )
      }
        
      //destructure the fields
      const {name,price,category,stock,description,manufacturer_id}=fields;

      
      if(
          !name ||
          !price ||
          !category ||
          !stock ||
          !description ||
          !manufacturer_id
      )
      {
 return res.status(400).json(
     {
         error:"Please fill the all details"
     }
 )
      }
      let product=new Product(fields);



      //handle file here
      if(file.photo)
           {
               if(file.photo.size > 3000000)
               {
                return res.status(400).json({
                    error:"File size too long"
                })
               }
               product.photo.data=fs.readFileSync(file.photo.path)
               product.photo.contentType=file.photo.type

            }
              
            console.log(product)
            //save to the DB
          product.save((err,product)=>
          {
              if(err)
              {
                  return res.status(400).json({
                      error:"Failed to save in DB"
                  })
              }
              res.json(product);
          }) 
  })
}



exports.updateProduct=(req,res)=>
{


    const form=new formidable.IncomingForm();
    form.keepExtensions=true;

    form.parse(req,(err,fields,file)=>
    {
        if(err)
        {
            return res.status(400).json(
                {
                error:"Problem with image"
                }
            )
        }

        const{name,description,stock,price,manufactuer_id,category}=fields;
        if(!name||!description||!stock ||!price || !category || !manufactuer_id)
        {
            return res.status(400).json(
            {
                error:"Fill all the field"
            })
        }
       
         let product=new Product(fields);

        if(file.photo)
        {
            if(file.photo.size > 4000000)
            {
               return res.status(400).json({
                   error:"Photo is too large"
               })                
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
         
        }
             product.save((err,product)=>
             {
                 if(err)
                 {
                     return res.send(400).json({
                         error:"Unable to save in DB"
                     })
                 }
                 res.json(product);
             })        
        
        
    })

}



exports.getAllProducts=(req,res)=>
{
    Product.find().exec((err,product)=>
    {
        if(err)
        {
          return  res.status(400).json({
                error:"No Product Found"
            })
        }
        
        res.json(product)
    })
}



exports.getProducts=(req,res)=>
{
    Product.find({manufacturer_id:req.profile._id}).select('-photo').exec((err,product)=>
    {
        if(err)
        {
          return  res.status(400).json({
                error:"No Product Found"
            })
        }
        res.json(product)
    })

}



  exports.getPhoto=(req,res)=>
  {
  if(req.product.photo.data)
  {  
        
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data);
  
  }
  }

  exports.removeFromCart=(req,res)=>
  {
         let cart=[]
      
   



     if(req.profile.cart.length>0)
     {  
        
          cart=req.profile.cart;
          console.log("CART BEFORE",cart)   
         cart.map((product,index)=>               
                 { let a=req.product._id;
            if(product._id.equals(a))
            {
                cart.splice(index,1)
                //console.log("CART AFTER",cart)
            }
        
         })
    }






Manufacturer.findByIdAndUpdate(
    { _id: req.profile._id},
    {$set: {cart:cart}},
    {new :true,userfindAndModify:false},
    (err,cart)=>
    {
        if(err)
        {
           
            return res.status(400).json({
                error:"Not able to Remove from Cart"
            });
        }
        res.json(cart);
    }
)


  
    }

exports.addToCart=(req,res)=>
{
    let cart=[]
    let quantity=1;    

     if(req.profile.cart.length>0)
     {  
          let same=false;
          cart=req.profile.cart;   

          cart.map((product,index)=>               
                 { let a=req.product._id;
            if(product._id.equals(a))
            {
                
                console.log("INCREMENT IN QUANTITY");
               same=true;
            quantity=product.quantity+1;
             product.quantity=quantity;
            }
        
         })

         
         if(same==false)
         {
             console.log("FIRST TIME")
             cart.push({_id:req.product._id,quantity:quantity})
         }
          

}
 else
 {
     
    console.log("ADDING FIRST ONE")  
   cart.push({_id:req.product._id ,quantity:quantity})
 }
   Manufacturer.findByIdAndUpdate(
        { _id: req.profile._id},
        {$set: {cart:cart}},
        {new :true,userfindAndModify:false},
        (err,cart)=>
        {
            if(err)
            {
               
                return res.status(400).json({
                    error:"Not able to add in Cart"
                });
            }
            res.json(cart);
        }
    )

        
}



exports.getProduct=(req,res)=>
{

    Product.findOne({_id:req.product._id}).exec((err,product)=>
    {
        if(err)
        {
         return res.status(400).json({
             error:"NO product found"
         })
        }
        product.photo=undefined;
        res.json(product)
    })
}

exports.searchProduct=(req,res)=>
{
      let searchTerm="lalit"
    Product.find({$text:{$search:searchTerm}}).limit(10).exec((err,product)=>{
        if(err)
        {
            console.log(err)
        }
        console.log(product)
    })
}







