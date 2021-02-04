const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema;
const productSchema=new mongoose.Schema({
 name:{
     type:String,
     required:true,
     trim:true
 },
 description:{
     type:String,
     required:true
     

 },

 category:{
  type:ObjectId,
  ref:"Category",
  required:true
 },
 manufacturer_id:{
    type:ObjectId,
    ref:"Manufacturer",
    required:true
},
 price:{
     type:Number,
     required:true
 },
 stock:{
     type:Number,
     required:true
      },
 sold:{
     type:Number    
 },
 photo:
    {
        data:Buffer,
        contentType:String
    }
})

module.exports=mongoose.model("Product",productSchema);