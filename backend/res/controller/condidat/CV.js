const CV=require('../../models/cv');
exports.updatecv=(req,res)=>{
   // res.status(200).json({file:req.file,body :req.body})
   
    
  
  const  updateBy =req.condidat._id
   const cvfile=req.files.file.name

  //  console.log(cvfile)
  
 /*  if (req.files.file){
       cvfile=process.env.API+'/public/'+req.files.file.filename;
   } */
   const cv = new CV({
    cvfile,
    updateBy

  });
   

   cv.save((error,cv)=>{
      if (error) return res.status(400).json({error});
      if (cv){
          res.status(201).json({cv})
      }
   });
}
