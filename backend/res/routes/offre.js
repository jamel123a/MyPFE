const express = require('express');
const { getUserInfo, requireSignin } = require('../common');
const {  EntrepriseMiddleware } = require('../controller/entreprise/middleware');
const { createOffre, getOffres, getOffre } = require('../controller/entreprise/offre');

const router =express.Router();


router.post('/offre/create',requireSignin,EntrepriseMiddleware,createOffre);
router.get('/offre/alloffres',getOffres);
router.get('/offre/:id' , getOffre)
router.get('/user/info',requireSignin,getUserInfo)

module.exports=router;