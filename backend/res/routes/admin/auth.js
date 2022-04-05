const express=require('express');
const { requireSignin, auth, adminMiddleware, getUserInfo } = require('../../common');
const { signup, signin} = require('../../controller/admin/auth');
const { getAllCondidatInfo, getAllEntrepreiseInfo, updateUserRole } = require('../../controller/admin/constroller');
const { validateSignupRequest, isRequestValited, validateSigninRequest } = require('../../validation/auth');
const router=express.Router();


// admin
router.post('/admin/signup',validateSignupRequest,isRequestValited, signup)
router.post('/admin/signin',validateSigninRequest,isRequestValited,signin)
//get user
router.post('/info',requireSignin,getUserInfo)
//get all user
router.get('/dashbord/allcondidat',requireSignin,adminMiddleware,getAllCondidatInfo)
//get all entreprise 
router.get('/dashbord/allentreprise',requireSignin,adminMiddleware,getAllEntrepreiseInfo)
//update user role
router.get('update_role/:id',requireSignin,adminMiddleware,updateUserRole)

module.exports=router;