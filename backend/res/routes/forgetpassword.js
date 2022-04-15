const express = require('express');
const { forgetpassword, resetPassword, auth } = require('../common');

const router =express.Router();


router.post('/forgetpassword',forgetpassword);
router.post('/resetpassword',auth,resetPassword);



module.exports=router;