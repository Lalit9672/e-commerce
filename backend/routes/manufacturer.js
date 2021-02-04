const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/category');
const { getManufacturerId, getManufacturer, updateManufacturer, updateRetailer } = require('../controllers/manufacturer');

const { isAuthenticated, isSignedIn } = require('../controllers/auth');
const router = express.Router();


router.param('manuId',getManufacturerId);

router.get('/manufacturer/:manuId',getManufacturer);
//router.put('/manufacturer/:manuId',updateManufacturer);


router.put('/retailer/:manuId',isSignedIn,isAuthenticated,updateRetailer);

module.exports=router;