const express=require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getAllCategories } = require("../controllers/category");
const { getManufacturerId, getCategories } = require("../controllers/manufacturer");
const { createProduct, getProductId, getProducts, getPhoto, addToCart, getAllProducts, getProduct, removeFromCart } = require("../controllers/product");
const router=express.Router();



router.param("manuId",getManufacturerId);
router.param("productId",getProductId);
router.get('/product/:productId',getProduct);
router.post("/product/create/:manuId",isSignedIn,isAuthenticated,createProduct);
router.get("/products/:manuId",getProducts);
router.post("/cart/:manuId/:productId",isSignedIn,isAuthenticated,addToCart);
router.post("/cart/remove/:manuId/:productId",isSignedIn,isAuthenticated,removeFromCart);
router.get("/allproducts/:manuId",getAllProducts);
router.get("/category",getAllCategories);



//add to cart



router.get("/product/photo/:productId",getPhoto);
module.exports=router;
