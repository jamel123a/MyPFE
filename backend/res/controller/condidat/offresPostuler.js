const OffresPostuler =require('../../models/offrespostuler');
exports.getOffresPostuler =(req,res)=>{
    const offresPostuler =new OffresPostuler({
        user:req.user._id,
        offresPostuler :req.body.OffresPostuler
                 
    });
    offresPostuler.save((error,offresPostuler)=>{
        if (error)return res.status(400).json({error});
        if (offresPostuler){
            return res.status(201).json({cart});
        }
    });

}