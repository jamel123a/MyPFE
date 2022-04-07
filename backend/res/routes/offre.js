const express = require('express');
const { requireSigninEntreprise, EntrepriseMiddleware, authEntreprise } = require('../controller/entreprise/middleware');
const { createOffre, getOffres } = require('../controller/entreprise/offre');

const router =express.Router();


router.post('/offre/create',authEntreprise,EntrepriseMiddleware,createOffre);
router.get('/offre/alloffres',getOffres);


module.exports=router;