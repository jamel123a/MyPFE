const express = require('express');
const { requireSigninEntreprise, EntrepriseMiddleware, authEntreprise } = require('../controller/entreprise/middleware');
const { createOffre, getOffres, getOffre } = require('../controller/entreprise/offre');

const router =express.Router();


router.post('/offre/create',authEntreprise,EntrepriseMiddleware,createOffre);
router.get('/offre/alloffres',getOffres);
router.get('/offre/:id' , getOffre)


module.exports=router;