const express=require('express');
const {  signin, activation, signup } = require('../../controller/entreprise/auth');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')
const router=express.Router();


// condidat 

router.post('/entreprise/signup',validateSignupRequest,isRequestValited,signup);
router.post('/entreprise/signin',validateSigninRequest,isRequestValited,signin)
router.post('/entreprise/activate',activation)
/*router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({condidat :'profile'})
});*/

module.exports=router;