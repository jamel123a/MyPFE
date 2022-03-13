const express=require('express');
const { signup, signin,requireSignin } = require('../../controller/condidat/auth');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')

const router=express.Router();


// condidat 

router.post('/condidat/signup',validateSignupRequest,isRequestValited,signup);
router.post('/condidat/signin',validateSigninRequest,isRequestValited,signin)
/*router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({condidat :'profile'})
});*/

module.exports=router;