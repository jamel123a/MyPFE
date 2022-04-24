const express=require('express');
const { requireSignin, auth, adminMiddleware, getUserInfo } = require('../../common');
const { signup, signin} = require('../../controller/admin/auth');
const { getAllCondidatInfo, getAllEntrepreiseInfo, updateUserRole, DeleteUser } = require('../../controller/admin/constroller');
const { validateSignupRequest, isRequestValited, validateSigninRequest } = require('../../validation/auth');
const router=express.Router();


// admin
router.post('/admin/signup',validateSignupRequest,isRequestValited, signup)
router.post('/admin/signin',validateSigninRequest,isRequestValited,signin)
//get user
router.post('/userinfo',auth,getUserInfo)
//get all user
router.get('/dashbord/allcondidat',auth,adminMiddleware,getAllCondidatInfo)
//get all entreprise 
router.get('/dashbord/allentreprise',auth,adminMiddleware,getAllEntrepreiseInfo)
//update user role
router.patch('/dashbord/allcondidat/update_role/:id',auth,adminMiddleware,updateUserRole)
//delete user
router.patch('dashord/user/delete/:id',auth,adminMiddleware,DeleteUser)

module.exports=router;