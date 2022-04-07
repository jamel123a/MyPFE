const fs=require('fs')
module.exports=async function(req,res,next){
    try{
        if(!req.files || Object.keys(req.files).lenght===0){
            return res.status(400).json({msg :"no files were uploed"})

        }
        const file=req.files.file;
        console.log(file)
    /* if(file.size >1024 *1024){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg :"Size so large"})
        }//1m*/

        if(file.mimetype !== "application/pdf"){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg :"file must be a pdf"})
        }
        
       
       next()
    }catch(err){
        return res.status(400).json({msg:err.message })
    }
}

const removeTmp=(path)=>{
    fs.unlink(path ,err =>{
        if(err) throw err
    })
}