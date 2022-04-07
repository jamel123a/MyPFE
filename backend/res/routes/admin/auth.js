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
router.post('/info',auth,getUserInfo)
//get all user
router.get('/dashbord/allcondidat',auth,adminMiddleware,getAllCondidatInfo)
//get all entreprise 
router.get('/dashbord/allentreprise',auth,adminMiddleware,getAllEntrepreiseInfo)
//update user role
router.patch('/update_role/:id',auth,adminMiddleware,updateUserRole)
//delete user
router.patch('/delete/:id',auth,adminMiddleware,DeleteUser)

module.exports=router;