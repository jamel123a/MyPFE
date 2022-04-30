const jwt=require('jsonwebtoken')
const Entreprise =require('../../models/user')
const Offre =require('../../models/offre')
const bcrypt =require('bcrypt')
///authentification


exports.EntrepriseMiddleware=(req,res,next)=>{
    if(req.user.role !== 'entreprise'){
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
            address,
            numberphone,
            wibsite,
            avatar,
            description
            
        } =req.body;
        const passwordHash =await bcrypt.hash (password,12)
         await Entreprise.findByIdAndUpdate({_id:req.user._id},{
            firstName,lastName,avatar,email,address,numberphone,password : passwordHash ,wibsite,avatar,description
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
        const offre = await Offre.find({createBy:req.user._id})
        console.log(offre)
       
        res.json(offre)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}   