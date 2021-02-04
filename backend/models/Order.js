const mongoose=require("mongoose")
const{ObjectId}=mongoose.Schema;


const productCartSchema=new mongoose.Schema({
    product:{                                            
         type:ObjectId,
         ref:"Product"
    },
    name:String,
    qunatity:Number,
    price:Number
})

const ProductCart=mongoose.model("ProductCartSchema",productCartSchema);

const orderSchema=new mongoose.Schema({
         product:{
             type:[productCartSchema]
         },
         transcation_id:{},
         amount:{
             type:Number
         },
         payment_mode:{
          type:String
         },
         status:{
             type:String,
             default:"Received",
             enum:["Cancelled","Processing","Received","Delivered","Shipped"]
         },
        address:
         {
             type:Object,
         },
         user:{
             type:ObjectId,
             ref:"User"
         }                                     
})

const Order=mongoose.model("Order",orderSchema);

module.exports={ProductCart,Order};