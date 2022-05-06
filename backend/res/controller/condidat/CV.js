const CV=require('../../models/cv');
exports.Updatecv=(req,res)=>{
   
    
     const  updateBy =req.user._id
    const file=process.env.API1+'/upload/'+req.files.file.name;
  

       
  
   const cv = new CV({
    file,
    updateBy

  });
   
if (req.files.file.mimetype=="application/pdf"){
  
  cv.save((error,cv)=>{
    if (error) return res.status(400).json({error});
    if (cv){
        res.status(201).json({cv})
    }
 });
}else{
  return res.status(400).json({msg :"file must be a pdf"})
}
  
}
