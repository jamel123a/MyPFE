const express=require('express');
const { requireSignin, auth, adminMiddleware, getUserInfo } = require('../../common');
const { signup, signin} = require('../../controller/admin/auth');
const { getAllCondidatInfo, getAllEntrepreiseInfo, updateUserRole, DeleteUser, AddUser, getCondidatInfo, updateCondidat } = require('../../controller/admin/constroller');
const { validateSignupRequest, isRequestValited, validateSigninRequest } = require('../../validation/auth');
const router=express.Router();


// admin
router.post('/admin/signup',validateSignupRequest,isRequestValited, signup)
router.post('/admin/signin',validateSigninRequest,isRequestValited,signin)
//get user
router.post('/userinfo/:id',getUserInfo)
//get all user
router.get('/dashbord/allcondidat',getAllCondidatInfo)
//get user info
router.get('/dashbord/condidat/:id',getCondidatInfo)
//update user info 
router.put('/dashbord/updateCondidat/:id',updateCondidat)
//add user
router.post('/admin/adduser',AddUser)
//get all entreprise 
router.get('/dashbord/allentreprise',auth,adminMiddleware,getAllEntrepreiseInfo)
//update user role
//router.patch('/admin/updateCondidat/:id',auth,adminMiddleware,updateUserRole)
//delete user
router.delete('/user/delete/:id',DeleteUser)

module.exports=router;