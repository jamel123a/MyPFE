const express=require('express');
//const { UpdateUser  } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const uploadImage = require('../../common/uploadImage');
const {  signin, activation, signup, logout } = require('../../controller/entreprise/auth');
const { EntrepriseMiddleware, requireSigninEntreprise, authEntreprise, UpdateEntreprise } = require('../../controller/entreprise/middleware');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')
const router=express.Router();


// condidat 

router.post('/entreprise/signup',validateSignupRequest,isRequestValited,signup);
router.post('/entreprise/signin',validateSigninRequest,isRequestValited,signin)
router.post('/entreprise/activate',activation);

// update data
router.patch('/entreprise/update',authEntreprise,EntrepriseMiddleware,UpdateEntreprise)
//
router.post('/entreprise/upload_avatar',authEntreprise,uploadImage,uploadCrl.uploadAvatar)
//login out 
router.post('/entreprise/loginout',logout)

/*router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({condidat :'profile'})
});*/

module.exports=router;