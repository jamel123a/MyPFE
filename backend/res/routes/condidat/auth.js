const express=require('express');
const { requireSignin, UpdateUser, userMiddleware } = require('../../common');
const { signup, signin, getUserInfo,  } = require('../../controller/condidat/auth');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')

const router=express.Router();


// condidat 

router.post('/condidat/signup',validateSignupRequest,isRequestValited,signup);
router.post('/condidat/signin',validateSigninRequest,isRequestValited,signin);
//update self
//update user him self
router.patch('/condidat/update',requireSignin,userMiddleware,UpdateUser)

module.exports=router;