const CV=require('../../models/CV');
const multer=require('multer');
const upload =multer({dest : 'upload/'});
const path = require('path') 
const shordId =require('shortid');

const storage =multer.diskStorage({


    destination : function(req,res,file,cb){
        if (path.extname ==='.pdf'){
        cb(null,path.join(path.dirname(__dirname),'uploads'))
        }else
        return res.status(400).json({
            message :"user is not  exciste"});
        
    },
    filename :function(req,file,cd){
        cb(null,shordId.generate()+' '+file.originalname)
    } 
})
const upload = multer( {storage});
