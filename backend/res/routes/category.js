const express =require('express');
const { requireSignin, adminMiddleware } = require('../common/index');
const { addCatogory, getCategories } = require('../controller/category/category');
const router =express.Router();


router.post('/category/create',requireSignin,adminMiddleware,addCatogory)
router.get('/category/getcategory',getCategories)


module.exports=router;