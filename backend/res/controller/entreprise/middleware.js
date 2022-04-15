const jwt=require('jsonwebtoken')
const Entreprise =require('../../models/user')
const Offre =require('../../models/offre')
exports.requireSigninEntreprise = (req,res,next)=>{
 
 
    if (req.headers.authorization){
    
    
    const token =req.headers.authorization.split(" ")[1];
    const entreprise =jwt.verify(token,process.env.JWT_SRCRET);
     
    req.entreprise=entreprise ;
   
    }else {
    return res.status(400).json({
        message :'authorization require' })
    }
    next();

}
///authentification
exports.authEntreprise=(req,res,next)=>{
    try{
        const token =req.header("Authorization")
        if(!token)return res.status(400).json({msg:"authorization require "})
        jwt.verify(token,process.env.JWT_SRCRET,(err,entreprise)=>{
            if(err)return res.status(400).json({msg:"invaled token"})
             req.entreprise=entreprise
             console.log(entreprise)
             next()
        })
    }catch (err){
        return res.status(500).json({msg :err.message})
    }
}
//moddleware

exports.EntrepriseMiddleware=(req,res,next)=>{
    if(req.entreprise.role !== 'entreprise'){
        return res.status(400).json({message :'Acces denied'})
    }
    next();
}
//update user
exports.UpdateEntreprise=async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            adress,
            numberphone,
            wibsite,
            avatar,
            description
            
        } =req.body;
         await Entreprise.findByIdAndUpdate({_id:req.entreprise._id},{
            firstName,lastName,avatar,email,password,adress,numberphone,wibsite,avatar,description
        })
        
        res.json({msg :"update"})
    }catch(err){
       return res.status(500).json({err :"erorr"})
    }
}
exports.UpdateOffre=async(req,res)=>{
    try{
        const {
           name,motclé,description,salaire,dateFinOffre,lieu,niveauEtude,require, mois
        } =req.body;
         await Offre.findByIdAndUpdate(req.params.id,{
            name,motclé,description,salaire,dateFinOffre,lieu,niveauEtude,require, mois
        })
        
        res.json({msg :"update"})
    }catch(err){
       return res.status(500).json({err :"erorr"})
    }
}


exports.DeleteOffre=async(req,res)=>{
    try{
       await Offre.findByIdAndDelete(req.params.id,{ 
     })
     res.json({msg :"Delete  Succes"})
    }catch(err){
     return res.status(500).json({err :"error"})
  }
 }
 exports.getAllOffreEntreprise=async(req,res)=>{
    try{
        const offre = await Offre.find({createBy:req.entreprise._id})
        console.log(offre)
       
        res.json(offre)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}   