const express=require("express");
const crypto=require("crypto");
const{check}=require("express-validator");
const router=express.Router();
const {signUp,signIn, isSignedIn}=require('../controllers/auth');
const { json } = require("body-parser");


router.post("/signup",[
check("name","name must have min 3").isLength({min:3}),
check("email","invalid email").isEmail(),
check("password","enter valid password").isLength({min:3, max:8})
],signUp);

router.post("/signin",signIn);

module.exports=router;

