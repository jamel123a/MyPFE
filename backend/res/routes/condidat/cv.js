const express=require('express');

const router=express.Router();
const multer=require('multer');
const path = require('path') 
const shordId =require('shortid');
const { requireSignin, userMiddleware, auth,  } = require('../../common');
const uploadCrl = require('../../common/uploadCtrl');
const { Updatecv } = require('../../controller/condidat/cv');

const storage =multer.diskStorage({
     

    destination : function(res,file,cb){
       
        cb(null,path.join(path.dirname(__dirname),'tmp'))
       
    },
    filename :function(req,file,cb){
        cb(null,/*shordId.generate()+' '+*/file.originalname)
    } 
})
const upload = multer( {storage })
       
   



router.post('/uploadcv',requireSignin,userMiddleware,upload.single('cv'),Updatecv);  


module.exports=router;