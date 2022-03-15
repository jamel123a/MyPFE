const CV=require('../../models/cv');
exports.updatecv=(req,res)=>{
    //res.status(200).json({file:req.file,body :req.body})
 
  const cvOBJ ={
    updateBy :req.condidat._id,
    
  }
   if (req.file){
       cvOBJ.cvfile=process.env.API+'/public/'+req.file.filename;
   } 
 
   const cv = new CV(cvOBJ);

   cv.save((error,cv)=>{
      if (error) return res.status(400).json({error});
      if (cv){
          res.status(201).json({cv})
      }
   });
}
