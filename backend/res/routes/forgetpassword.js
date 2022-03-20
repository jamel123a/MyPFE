const express = require('express');
const { forgetpassword, resetPassword } = require('../common');

const router =express.Router();


router.post('/forgetpassword',forgetpassword);
router.post('/resetpassword',resetPassword);



module.exports=router;