const express=require('express');
//const { UpdateUser  } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const uploadImage = require('../../common/uploadImage');
const {  signin, activation, signup, logout } = require('../../controller/entreprise/auth');
const { EntrepriseMiddleware, requireSigninEntreprise, authEntreprise, UpdateEntreprise, UpdateOffre, DeleteOffre, getAllOffreEntreprise } = require('../../controller/entreprise/middleware');
const {validateSignupRequest,validateSigninRequest, isRequestValited} =require('../../validation/auth')
const router=express.Router();


// condidat 

router.post('/entreprise/signup',signup);
router.post('/entreprise/signin',signin)
router.post('/entreprise/activate',activation);



// update information
router.patch('/entreprise/update',authEntreprise,EntrepriseMiddleware,UpdateEntreprise)
//update avatar
router.post('/entreprise/upload_avatar',authEntreprise,uploadImage,uploadCrl.uploadAvatar)

// get all offree
router.get('/entreprise/getalloffre',authEntreprise,getAllOffreEntreprise)
//update offre
router.post('/offre/update/:id',authEntreprise,EntrepriseMiddleware,UpdateOffre);
// delete offre
router.post('/offre/delete/:id',authEntreprise,EntrepriseMiddleware,DeleteOffre);

//login out 
//router.post('/entreprise/loginout',logout)



module.exports=router;