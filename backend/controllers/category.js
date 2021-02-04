const { response } = require("express");
const Category = require("../models/Category");



exports.getAllCategories=(req,res)=>
{
  Category.find().exec((err,category)=>
  {
      if(err)
      {
          return res.status(400).json({
              error:"Not able to found"
          })
      }
      res.json(category)
  })

}


