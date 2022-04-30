const express = require('express');
const { forgetpassword, resetPassword, auth, requireSignin } = require('../common');

const router =express.Router();


router.post('/forgetpassword',forgetpassword);
router.post('/resetpassword',requireSignin,resetPassword);



module.exports=router;