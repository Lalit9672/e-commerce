const formaidable=require('formidable')
const fs=require('fs')
const Manufacturer=require("../models/Manufacturer");
exports.getManufacturerId=(req,res,next,id)=>
{

Manufacturer.findById(id).exec((err,manu)=>
{
    if(err || !manu)
    {
        return res.status(400).json({
            err:"User not found"
        })                                               
                                     
    }
    req.profile=manu;
    next();                                               
    
})

}
//any product to select 

exports.getManufacturer=(req,res)=>
{
    req.profile.createdAt=undefined;
    req.profile.encry_password=undefined;
    req.profile.salt=undefined;
    req.profile.updatedAt=undefined;
    req.profile.__v=undefined;
    
    return res.json(req.profile);

}
//update the data 
exports.updateManufacturer=(req,res)=>
{
 
  Manufacturer.findByIdAndUpdate({_id:res.profile._id},(err,data)=>
  {
      if(err)
      {
          return res.status(400).json({
              error:"Unable to update"
          })
      }
      data.encry_password=undefined;
      dara.createAt=undefined;
      res.json(data);
  })

}

//update data of retailer

exports.updateRetailer=(req,res)=>
{
  
    
 
     

  
  const form=new formaidable.IncomingForm();



  form.parse(req,(err,fields,file)=>
  { 
   
      if(err)
      {
          return res.status(400).json({
              error:"SomeThing went Wrong"
          })
      }
      const{name,email,pincode,area,city,userState,MNo}=fields;
        
       
    if(!name || !email || !pincode|| !area|| !city|| !userState||!MNo )
     {
         return res.status(400).json({
             error:"Fill all the fields"
         })
     }
     
  
   if(file.profile_pic)
   {
    if(file.profile_pic.size > 3000000)
               {
                return res.status(400).json({
                    error:"File size too long"
                })
               }

   
   
    }


let address=[];

if(req.profile.address.length>0 && req.profile.address[0])
{
    address=req.profile.address;
}
address.push({area:area,state:userState,pincode:pincode,city:city})



console.log(fs.readFileSync(file.profile_pic.path))
Manufacturer.findByIdAndUpdate({_id:req.profile._id},
    {$set:{name:name,MNo:MNo,email:email,address:address,
    profile_pic:{data:fs.readFileSync(file.profile_pic.path),contentType:file.profile_pic.type}    

 }},
    {new :true,userfindAndModify:false},
     (err,retailer)=>
     {
         if(err)
         {
             return res.status(400).json({
                 error:"Unable to update"
             })
         }
         res.json(retailer)
     }       
    )


  
  
})
}
