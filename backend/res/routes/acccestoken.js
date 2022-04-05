const express =require('express');
const { getAccessToken } = require('../controller/condidat/auth');
const router =express.Router();


router.post('/user/reefersh_token',getAccessToken)


module.exports=router;