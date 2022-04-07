const { requireSignin, auth } = require('../common')
const uploadCrl = require('../common/uploadCtrl')
const  uploadImage  = require('../common/uploadImage')

const router =require('express').Router()


router.post('/upload_avatar',auth,uploadImage,uploadCrl.uploadAvatar)

module.exports=router