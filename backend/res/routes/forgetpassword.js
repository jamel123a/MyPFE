const express = require('express');
const { forgetpassword } = require('../common');

const router =express.Router();


router.post('/forgetpassword',forgetpassword);


module.exports=router;