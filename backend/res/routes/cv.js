const express=require('express');

const router=express.Router();
const multer=require('multer');
const path = require('path') 
const shordId =require('shortid');
const { requireSignin, userMiddleware } = require('../common');
const { updatecv } = require('../controller/condidat/cv');

const storage =multer.diskStorage({
     

    destination : function(res,file,cb){
       
        cb(null,path.join(path.dirname(__dirname),'upload'))
       
    },
    filename :function(req,file,cb){
        cb(null,shordId.generate()+' '+file.originalname)
    } 
})
const upload = multer( {storage ,fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf/") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only pdf format allowed!'));
    }
  }});



router.post('/uploadcv',requireSignin,userMiddleware,upload.single('cv'),updatecv);  


module.exports=router;