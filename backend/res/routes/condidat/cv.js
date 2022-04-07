const express=require('express');

const router=express.Router();
const multer=require('multer');
const path = require('path') 
const shordId =require('shortid');
const { requireSignin, userMiddleware, auth,  } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const { updatecv } = require('../../controller/condidat/cv');
const cv1 = require('../../controller/condidat/cv1');

const storage =multer.diskStorage({
     

    destination : function(res,file,cb){
       
        cb(null,path.join(path.dirname(__dirname),'upload'))
       
    },
    filename :function(req,file,cb){
        cb(null,/*shordId.generate()+' '+*/file.originalname)
    } 
})
const upload = multer( {storage ,fileFilter: (req, file, cb) => {
       
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only pdf format allowed!'));
    }
  }});



router.post('/uploadcv',auth,userMiddleware,upload.single('cv'),updatecv);  

router.post('/uploadcvv',auth,userMiddleware,cv1,uploadCrl.uploadcv);  

module.exports=router;