const{validationResult}=require("express-validator");
const Manufacturer=require("../models/Manufacturer")
var expressJwt = require("express-jwt");

var jwt = require("jsonwebtoken");
exports.signUp=(req,res)=>
{

  const manufacturer=new Manufacturer(req.body);
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
      return res.status(400).json({
          err:errors.array()[0].msg
      })
  }
  manufacturer.save((err,manufacturer)=>
  {
      if(err)
      {
          return res.status(400).json({
              err:"SignUp failed"
          })
      }
    
      res.json(manufacturer);

  })

}


exports.signIn=(req,res)=>
{

     const{email,password}=req.body;

     const error=validationResult(req.body);
      if(!error.isEmpty())
      {
        return res.status(400).json({
            err:"something went wrong"})
      }
   Manufacturer.findOne({email},(err,user)=>
   {
       if(err||!user )
       {
           return res.status(400).json({
               error:"User doses not exists"
           })
       }
       if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }

      const{_id,email,name,roll}=user;
       var token = jwt.sign({ _id: user._id }, 'cha-cha');
       res.cookie("token",token,new Date() + 365);
 
       return res.json({
           token,
           manufacturer:{
           name,
           _id,
           roll
           }
       })  
   })
} 

exports.isSignedIn=expressJwt({
    secret:"cha-cha",
    userProperty:"auth",
    algorithms: ['sha1', 'RS256', 'HS256']

})

exports.signout=(req,res)=>
{
  res.clearCookie("token");
  res.json({
      message:"Signout Successfully"
  })
}

exports.isAuthenticated=(req,res,next)=>
{
  
     let check=req.profile && req.auth && req.profile._id == req.auth._id
     if(!check)
     {
         return res.status(403).json({
             error:"You Dont have Permission"
         })
     }
     next();

}
