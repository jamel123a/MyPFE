const express =require('express');
const { getAccessTokenUser } = require('../controller/condidat/auth');
const { getAccessToken } = require('../controller/entreprise/auth');
const router =express.Router();


router.post('/entreprise/refersh_token',getAccessToken)
router.post('/condidat/refersh_token',getAccessTokenUser)
module.exports=router;