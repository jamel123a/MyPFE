const express=require('express');
const { requireSignin, UpdateUser, userMiddleware, auth } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const uploadImage = require('../../common/uploadImage');
const { signup, signin, getUserInfo, logout,  } = require('../../controller/condidat/auth');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')

const router=express.Router();


// condidat 

router.post('/condidat/signup',validateSignupRequest,isRequestValited,signup);
router.post('/condidat/signin',validateSigninRequest,isRequestValited,signin);
//update self
//update user him self
router.patch('/condidat/update',auth,userMiddleware,UpdateUser)
router.post('/condidat/upload_avatar',auth,userMiddleware,uploadImage,uploadCrl.uploadAvatar)
router.post('/condidat/logout',logout)
module.exports=router;