const express=require('express');
const { signup, signin,requireSignin } = require('../../controller/admin/auth');
const { validateSignupRequest, isRequestValited, validateSigninRequest } = require('../../validation/auth');
const router=express.Router();


// admin
router.post('/admin/signup',validateSignupRequest,isRequestValited, signup)
router.post('/admin/signin',validateSigninRequest,isRequestValited,signin)



module.exports=router;