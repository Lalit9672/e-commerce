const express = require('express');
const { isAuthenticated, isSignedIn } = require('../controllers/auth');
const { createOrder } = require('../controllers/order');
const router=express.Router();

router.param('orderId');

router.post('order/create',isSignedIn,isAuthenticated,createOrder);

module.exports=router;