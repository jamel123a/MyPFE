const OffresPostuler =require('../../models/offrespostuler');
exports.getOffresPostuler =(req,res)=>{

    OffresPostuler.findOne({condidat:req.condidat._id})
    .exec((error,postuler)=>{
       
        if (error) return res.status(400).json({error})

       if (postuler){
          const offre = req.body.offreItemps.offre;
           const isitem = postuler.offreItemps.find(offre);
           if(isitem){
            return res.status(400).json({ message : 'you ready postuler  offre'})    
           }else{
            const postuler =new OffresPostuler({
             condidat:req.condidat._id,
                offreItemps :req.body.offreItemps.offre
                 
                         
            });
            postuler.save((error,postuler)=>{
                if (error)return res.status(400).json({error});
                if (postuler){
                    return res.status(201).json({postuler});
                }
            });
            
            
           }

       }
    });
    

}