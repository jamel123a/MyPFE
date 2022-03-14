const express =require('express');
const { requireSignin, userMiddleware } = require('../../common');
const router =express.Router();


router.get('/condidat/profile',requireSignin,userMiddleware,);


module.exports=router;