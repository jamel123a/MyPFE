const Offre =require('../../models/offre');

exports.createOffre =(req,res)=>{
    
  const {
       name,motclé,lieu,description,createBy,category,salaire,niveauEtude,avantage,require,mois
   }=req.body;
  
   
   const offre =new Offre({
       name,
       motclé,
       lieu,
       description,
       category,
       salaire,
       niveauEtude,
       avantage,
       require,
       mois,
       createBy :req.user._id
   })
   offre.save((error,offre)=>{
    if(error){
        return res.status(400).json(error )
     }  
    if (offre){
          return res.status(201).json({offre})
        
      }
  })
}
/*exports.getOffres=(req,res)=>{
    Offre.find({}).populate('createBy')
    .exec((error,offre)=>{
         if(error)return res.status(400).json({error});
         if (offre){
             res.status(200).json({offre})
         }
    })
  }
*/
exports.getOffres=async(req,res)=>{
    const page =req.query.page || 1; 
    const pageSize =req.query.limit || 7;
    try{
      
        const total =await Offre.countDocuments();
        const pages =Math.ceil(total /pageSize);
         if (page> pages){
             res.status(404).json({
                 status :'fail',
                 message :"no page found"
             })
         }
        const offre= await Offre.find().populate('createBy',["avatar","nomEntreprise","address","description","website"])
        .skip((page -1) * parseInt (pageSize))
        .limit(parseInt(pageSize))
        
        res.status(200).json({
            status :'succes',
            count :offre.length,
            page,
            pages,
            data :offre

        });
    }catch(err){
       return res.status(500).json({err :"error"})
    }
} 
exports.getOffre=async(req,res)=>{
    try{
        const offre= await Offre.findById(req.params.id).populate('createBy',
           ["nomEntreprise","adresss","description","website"] )
        
        res.json(offre)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}   