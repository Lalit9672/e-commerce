const express=require("express");
const { getManufacturerId } = require("../controllers/manufacturer");

const { stripePayment,verifyCheck, paytmPayment,finalResponse } = require("../controllers/payment");
const { searchProduct } = require("../controllers/product");
const router=express.Router();


router.param("manuId",getManufacturerId);

router.post('/checkout/stripe',stripePayment);
router.post('/v1/public/callback',verifyCheck);
router.post('/checkout/:manuId/paytm/payment',paytmPayment);
router.get('/search',searchProduct);



module.exports=router;

