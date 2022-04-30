const CV=require('../../models/cv');
exports.Updatecv=(req,res)=>{
   // res.status(200).json({file:req.file,body :req.body})
   
    
  
  const  updateBy =req.condidat._id
   const file=process.env.API+'/public/'+req.files.file.name;
console.log(file)
  //  console.log(cvfile)
  
 /*  if (req.files.file){
       
   } */
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
