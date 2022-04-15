const express =require('express');
const { getAccessTokenAdmin } = require('../controller/admin/auth');
const { getAccessTokenUser } = require('../controller/condidat/auth');
const { getAccessToken } = require('../controller/entreprise/auth');
const router =express.Router();


router.post('/entreprise/refersh_token',getAccessToken)
router.post('/refersh_token',getAccessTokenUser);
//router.post('/admin/refersh_token',getAccessTokenAdmin)
module.exports=router;