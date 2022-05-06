const express=require('express');
const { requireSignin } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const uploadImage = require('../../common/uploadImage');
const {  signin, activation, signup, logout } = require('../../controller/entreprise/auth');
const { EntrepriseMiddleware,  UpdateEntreprise, UpdateOffre, DeleteOffre, getAllOffreEntreprise } = require('../../controller/entreprise/middleware');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')
const router=express.Router();


// condidat 

router.post('/entreprise/signup',signup);
router.post('/entreprise/signin',signin)
router.post('/entreprise/activate',activation);



// update information
router.put('/entreprise/update',requireSignin,EntrepriseMiddleware,UpdateEntreprise)
//update avatar
router.post('/entreprise/upload_avatar',requireSignin,EntrepriseMiddleware,uploadImage,uploadCrl.uploadAvatar)

// get all offree
router.get('/entreprise/getalloffre',requireSignin,EntrepriseMiddleware,getAllOffreEntreprise)
//update offre
router.post('/offre/update/:id',requireSignin,EntrepriseMiddleware,UpdateOffre);
// delete offre
router.post('/offre/delete/:id',requireSignin,EntrepriseMiddleware,DeleteOffre);

//login out 
//router.post('/entreprise/loginout',logout)



module.exports=router;