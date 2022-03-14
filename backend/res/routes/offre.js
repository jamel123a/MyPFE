const express =require('express');
const { requireSigninEntreprise, EntrepriseMiddleware } = require('../controller/entreprise/middleware');
const { createOffre } = require('../controller/offre');

const router =express.Router();


router.post('/offre/create',requireSigninEntreprise,EntrepriseMiddleware,createOffre);
router.get('/offre/getcategory')


module.exports=router;