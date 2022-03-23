const Offre =require('../../models/offre');


exports.createOffre =(req,res)=>{
    
  const {
       name,motclé,lieu,description,createBy,category
   }=req.body;
  
   
   const offre =new Offre({
       name,
       motclé,
       lieu,
       description,
       category,
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
exports.getOffres=(req,res)=>{
    Offre.find({})
    .exec((error,offre)=>{
         if(error)return res.status(400).json({error});
         if (offre){
             res.status(200).json({offre})
         }
    })
  }