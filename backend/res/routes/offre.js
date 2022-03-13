const express =require('express');
const { requireSignin, EntrepriseMiddleware } = require('../common');
const { getCategories } = require('../controller/category/category');

const router =express.Router();


router.post('/offre/create',requireSignin,EntrepriseMiddleware);
router.get('/category/getcategory',getCategories)


module.exports=router;