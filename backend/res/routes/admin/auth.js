const express=require('express');
const { requireSignin, auth, adminMiddleware, getUserInfo } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const uploadImage = require('../../common/uploadImage');
const { signup, signin} = require('../../controller/admin/auth');
const { getAllCondidatInfo, getAllEntrepreiseInfo, DeleteUser, AddUser, updateCondidat, AddEntreprise, updateAvatar, getUserInfo1, updateEntreprise } = require('../../controller/admin/constroller');
const { validateSignupRequest, isRequestValited, validateSigninRequest } = require('../../validation/auth');
const router=express.Router();


// admin
router.post('/admin/signup',validateSignupRequest,isRequestValited, signup)
router.post('/admin/signin',validateSigninRequest,isRequestValited,signin)
//get user
router.post('/userinfo/:id',getUserInfo)
//get all user
router.get('/dashbord/allcondidat',requireSignin,adminMiddleware,getAllCondidatInfo)
//get user info
router.get('/dashbord/user/:id',requireSignin,adminMiddleware,getUserInfo1)
//update user info 
router.post('/admin/condidat/upload_avatar',requireSignin,adminMiddleware,uploadImage,uploadCrl.uploadAvatar)
router.put('/dashbord/updateCondidat/:id',requireSignin,adminMiddleware,updateCondidat)
//update avatar condidat entreprise
router.put('/dashbord/updateAvatar/:id',requireSignin,adminMiddleware,updateAvatar)

//add user

router.post('/admin/adduser',requireSignin,adminMiddleware,AddUser)
//get all entreprise 
router.get('/dashbord/allentreprise',requireSignin,adminMiddleware,getAllEntrepreiseInfo)
//add entreprise
router.post('/admin/addentreprise',requireSignin,adminMiddleware,AddEntreprise)
//update entreprise
router.put('/dashbord/updateEntreprise/:id',requireSignin,adminMiddleware,updateEntreprise)


//delete user
router.delete('/user/delete/:id',DeleteUser)

module.exports=router;