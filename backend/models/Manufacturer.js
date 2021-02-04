const { v4: uuidv4 } = require('uuid');
const mongoose=require("mongoose");
const crypto=require("crypto");
const { type } = require('os');
const {ObectId}=mongoose.Schema;
const manufacturerSchema=new mongoose.Schema(
   
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        cart:{
          type:Array,
          default:[],
        },
        profile_pic:
    {
        data:Buffer,
        contentType:String
    },
        address:{
            type:Array,
            
        },
         roll:{
            type:Number,
           required:true
        },
        orderList:{
         type:Array,
         default:[]
        },
        email:{
         type:String,
         trim:true,
         unique:true,
         required:true   
        },
        MNo:{
         type:Number,
         required:true,
         unique:true,
         maxlength:10,
        },
        encry_password:{
             type:String,
        },
        salt:{
        type:String
         },
   
    },{
        timestamps:true
    }
);
manufacturerSchema.virtual('password')
.set(function(password)
{
    this._password=password;
    this.salt=uuidv4();
    this.encry_password=this.securedPassword(password);
})
.get(function()
{
    return this._password;
})

manufacturerSchema.methods={
authenticate:
function(password)
{
 return this.securedPassword(password)===this.encry_password
},

securedPassword: function(plainpassword)
    {
        if(!plainpassword) return "";
        try
        {
        
         return crypto.createHmac("sha256",this.salt).update(plainpassword).digest("hex");    
        
        
        }
        catch(err)
        {
            return "";
        }
    }
}




module.exports=mongoose.model("Manufacturer",manufacturerSchema);