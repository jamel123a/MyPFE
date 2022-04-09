const cloudinary =require('cloudinary')
const fs =require('fs')
const CV=require('../models/cv');


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
   
})


const uploadCrl={
uploadAvatar :async(req,res)=>{
        try{
        
            const file =req.files.file;
           console.log(file)
        
          cloudinary.v2.uploader.upload(file.tempFilePath,{
             folder:'avatar',width: 150,height : 150,crop :"fill"
         },async (err,result)=>{
             if (err) throw err
         
             removeTmp(file.tempFilePath)
             console.log({result})
             res.json({url:result.secure_url})
         })

        }catch(err){
            return res.json(err)
        }
    },
    
    uploadcv :async(req,res)=>{
        try{
          
            const file =req.files.file;
            const   updateBy =req.condidat_id
           console.log(updateBy)
        
          cloudinary.v2.uploader.upload(file.tempFilePath,{
             folder:'cv',crop :"fill"
         },async (err,result)=>{
             if (err) throw err
         
             removeTmp(file.tempFilePath)
          const   url=result.secure_url
         
             const cv = new CV({
                url,
               // updateBy
            
              });
              cv.save((error,cv)=>{
                if (error) return res.status(400).json({error});
                if (cv){
                    res.status(201).json({cv})
                }
             });
            })
           
        }catch(err){
            return res.json(err)
        }
    }
 
 
}
const removeTmp=(path)=>{
    fs.unlink(path ,err =>{
        if(err) throw err
    })
}
module.exports=uploadCrl