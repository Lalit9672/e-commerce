const Order=require('../models/Order')



exports.createOrder=(req,res)=>
{

const order=new Order(req.body);

order.save((err,order)=>{
    if(err)
    {
return res.status(400).json({
    error:"Order Failed"
})
    }
    res.json(order)
    
})

}