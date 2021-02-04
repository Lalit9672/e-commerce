const { v4: uuidv4 } = require('uuid');
const nodemailer = require("nodemailer");
const stripe = require('stripe')('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');
const Paytm = require('paytm-pg-node-sdk');
const Nexmo = require('nexmo');
const orderid = require('order-id')('mysecret');
const https = require('https');
const express=require('express')
const formidable=require('formidable')
var PaytmChecksum = require("./PaytmChecksum");
const {Order} = require('../models/Order');
let userData={};
 exports.stripePayment=(req,res)=>
 {
   const{token}=req.body;
    

 let idempotencyKey=uuidv4();
    console.log(token)
    stripe.customers.create({
    email:token.email,
    source:token.id
 }).then(customer=>{

    stripe.charges.create({
        amount: token.totalAmount,
        currency: 'inr',
        customer:customer.id,
        receipt_email:token.email,
        address:token.address
        
      },{
        idempotencyKey: idempotencyKey
      }).then(response=> res.json(response)).catch(err=>res.status(400).json({error:"FAiled"})) ;
})
    
}






exports.paytmPayment=(req,res)=>
{

  let {name,email,_id,amount}=req.body;
  let amu=JSON.stringify(amount)
userData={name:req.profile.name,_id:req.profile._id,cart:req.profile.cart,address:req.body.address}


  let params ={}
params['MID'] = 'IjVVcR75438073507941',
params['WEBSITE'] = 'WEBSTAGING',
params['CHANNEL_ID'] = 'WEB',
params['INDUSTRY_TYPE_ID'] = 'Retail',
params['ORDER_ID'] = orderid.generate(),
params['CUST_ID'] = _id,
params['TXN_AMOUNT'] = '1',
params['CALLBACK_URL'] = 'http://localhost:4001/api/v1/public/callback',
params['EMAIL'] = email,
params['MOBILE_NO'] = '9876543210'


var paytmChecksum = PaytmChecksum.generateSignature(params, "tPEeUWbk544bDIbC");
paytmChecksum.then(function(result){
	console.log("generateSignature Returns: " + result);
  
  let param={
    ...params,'CHECKSUMHASH':result
  }
  console.log(param)
  res.json(param)
}).catch(function(error){
	console.log(error);
});

}





exports.verifyCheck=(req,res)=>
{
  let form=new formidable.IncomingForm();
  form.keepExtensions =true;

  form.parse(req,(err,fields,file)=>
  {
     if(fields)
     {

      paytmChecksum = fields.CHECKSUMHASH;
delete fields.CHECKSUMHASH;

var isVerifySignature = PaytmChecksum.verifySignature(fields, "tPEeUWbk544bDIbC", paytmChecksum);
if (isVerifySignature) {
  
  console.log("Checksum matched")

   



  var paytmParams = {};

  paytmParams["MID"]= fields.MID;
  paytmParams["ORDERID"] = fields.ORDERID;
  
  
  PaytmChecksum.generateSignature(paytmParams, "tPEeUWbk544bDIbC").then(function(checksum){
  
      paytmParams["CHECKSUMHASH"] = checksum;
  
      var post_data = JSON.stringify(paytmParams);
  
      var options = {
  
          /* for Staging */
          hostname: 'securegw-stage.paytm.in',
  
          /* for Production */
          // hostname: 'securegw.paytm.in',
  
          port: 443,
          path: '/order/status',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Content-Length': post_data.length
          }
      };
  
      var response = "";
      var post_req = https.request(options, function(post_res) {
          post_res.on('data', function (chunk) {
              response += chunk;
          });
  
          post_res.on('end', function(){

            let a=JSON.parse(response)
             if(a.STATUS=="TXN_SUCCESS") 
             {            
            generateOrder({TXNID:a.TXNID,ORDERID:a.ORDERID,AMOUNT:a.TXNAMOUNT,GATEWAYNAME:a.GATEWAYNAME,PAYMENTMODE:a.PAYMENTMODE,TXNDATE:a.TXNDATE})
             } 
            sendMail(a.ORDERID)
              res.redirect(`http://localhost:3000/user/products/checkout/status/${a.ORDERID}/${a.STATUS}`);
             
            
   
          });
      });
  
      post_req.write(post_data);
      post_req.end();
  });




  
} else {
  
	console.log("Checksum Mismatched");
}
     } 
   



  })
}


 async function sendMail(orderId)
{
  
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
   
    service:'gmail', 
    // true for 465, false for other ports
    auth: {
      user:'lalitpatel0234@gmail.com', // generated ethereal user
      pass:'clevercoder9672@gmail.com', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from:"'Team Champ' <lalitpatel0234@gmail.com>", // sender address
    to: "veereshpaliwal@gmail.com,nitinameta57@gmail.com", // list of receivers
    subject: `Your Manu-Retail Order ${orderId}`, // Subject line
    text: `Hi 
    Your package will be delivered between 5 days`, // plain text body
    html:`<a style={{display:'block',backgroundColor:'blueviolet'}} href="https://google.com" class="btn btn-primary">Track your package</a>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}





const generateOrder=(data)=>
{
  console.log(userData)
  if(userData)
  {
   const orderData={
   product:userData.cart,
   transcation_id:data.TXNID,
   amount:data.AMOUNT,
   payment_mode:data.PAYMENTMODE,
   address:userData.address,
   user:userData._id
  }
   console.log(orderData)

  const order=new Order(orderData);
 order.save((err,order)=>{
   if(err)
   {
     console.log("Not able to create order")
   }
   console.log(order)
 })
}
      
}