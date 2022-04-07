const cloudinary =require('cloudinary')
const fs =require('fs')


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
          console.log(file)
        
          cloudinary.v2.uploader.upload(file.tempFilePath,{
             folder:'cv',crop :"fill"
         },async (err,result)=>{
             if (err) throw err
         
             removeTmp(file.tempFilePath)
             console.log({result})
             res.json({url:result.secure_url})
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