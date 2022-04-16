const express=require('express');
const { requireSignin, UpdateUser, userMiddleware, auth } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const uploadImage = require('../../common/uploadImage');
const { signup, signin, getUserInfo, logout,  } = require('../../controller/condidat/auth');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')

const router=express.Router();


// condidat 

router.post('/condidat/signup',signup);
router.post('/condidat/signin',signin);
//update self
//update user him self
router.patch('/condidat/profile/update',auth,userMiddleware,UpdateUser)
router.post('/condidat/profile/upload_avatar',auth,userMiddleware,uploadImage,uploadCrl.uploadAvatar)
//router.post('/condidat/profile/logout',logout)
module.exports=router;