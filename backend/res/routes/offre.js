const express = require('express');
const { requireSigninEntreprise, EntrepriseMiddleware } = require('../controller/entreprise/middleware');
const { createOffre, getOffres } = require('../controller/entreprise/offre');

const router =express.Router();


router.post('/offre/create',requireSigninEntreprise,EntrepriseMiddleware,createOffre);
router.get('/offre/alloffres',getOffres);


module.exports=router;