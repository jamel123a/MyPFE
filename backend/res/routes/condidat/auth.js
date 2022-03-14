const express=require('express');
const { signup, signin,requireSignin } = require('../../controller/condidat/auth');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')

const router=express.Router();


// condidat 

router.post('/condidat/signup',validateSignupRequest,isRequestValited,signup);
router.post('/condidat/signin',validateSigninRequest,isRequestValited,signin)


module.exports=router;