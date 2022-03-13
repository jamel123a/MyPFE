const express =require('express');
const Category =require('../models/category');
const slugify =require('slugify');
const router =express.Router();


router.post('/catogory/create',(req,res)=>{

 const  category ={
     name :req.body.name,
     slug :slugify(res.body.name)
 }
 const cat =new Category(category);
    cat.save((error,category)=>{
     if (error)return res.status(400).json({error})
     if (category)return res.status(201).json({category})
    });


});

module.exports=router;