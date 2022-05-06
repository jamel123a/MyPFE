const express =require('express');
const { requireSignin, userMiddleware, auth } = require('../../common');
const { getOffresPostuler } = require('../../controller/condidat/offresPostuler');
const router =express.Router();


router.get('/condidat/profile',requireSignin,userMiddleware,getOffresPostuler);  


module.exports=router;