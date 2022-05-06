const express=require('express');
const { requireSignin, auth, adminMiddleware, getUserInfo } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const uploadImage = require('../../common/uploadImage');
const { signup, signin} = require('../../controller/admin/auth');
const { getAllCondidatInfo, getAllEntrepreiseInfo, updateUserRole, DeleteUser, AddUser, getCondidatInfo, updateCondidat, updateCondidatAvatar } = require('../../controller/admin/constroller');
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
router.get('/dashbord/condidat/:id',requireSignin,adminMiddleware,getCondidatInfo)
//update user info 
router.post('/admin/condidat/upload_avatar',requireSignin,adminMiddleware,uploadImage,uploadCrl.uploadAvatar)
router.put('/dashbord/updateCondidat/:id',requireSignin,adminMiddleware,updateCondidat)
router.put('/dashbord/updateCondidatAvatar/:id',requireSignin,adminMiddleware,updateCondidatAvatar)


//add user
router.post('/admin/adduser',requireSignin,adminMiddleware,AddUser)
//get all entreprise 
router.get('/dashbord/allentreprise',requireSignin,adminMiddleware,getAllEntrepreiseInfo)
//update user role
//router.patch('/admin/updateCondidat/:id',auth,adminMiddleware,updateUserRole)
//delete user
router.delete('/user/delete/:id',DeleteUser)

module.exports=router;