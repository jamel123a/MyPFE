const Offre =require('../../models/offre');


exports.createOffre =(req,res)=>{
    
  const {
       name,motclé,lieu,description,createBy
   }=req.body;
  
   
   const offre =new Offre({
       name,
       motclé,
       lieu,
       description,
       createBy :req.entreprise._id
   })
   offre.save((error,offre)=>{
    if(error){
        return res.status(400).json(error)
     }  
    if (offre){
          return res.status(201).json({offre})
        
      }
  })
}