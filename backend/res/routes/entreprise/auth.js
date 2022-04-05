const express=require('express');
const { UpdateUser,  } = require('../../common');
const {  signin, activation, signup } = require('../../controller/entreprise/auth');
const { EntrepriseMiddleware, requireSigninEntreprise } = require('../../controller/entreprise/middleware');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')
const router=express.Router();


// condidat 

router.post('/entreprise/signup',validateSignupRequest,isRequestValited,signup);
router.post('/entreprise/signin',validateSigninRequest,isRequestValited,signin)
router.post('/entreprise/activate',activation);

// update data
router.patch('/entreprise/update',requireSigninEntreprise,EntrepriseMiddleware,UpdateUser)

/*router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({condidat :'profile'})
});*/

module.exports=router;