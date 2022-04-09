const jwt=require('jsonwebtoken')
const Entreprise =require('../../models/user')
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
exports.UpdateEntreprise=async(req,res)=>{
    try{
        const {
            firstName,
            lastName,
            avatar
        } =req.body;
         await Entreprise.findByIdAndUpdate({_id:req.entreprise._id},{
            firstName,lastName,avatar
        })
        
        res.json({msg :"update"})
    }catch(err){
       return res.status(500).json({err :"erorr"})
    }
}
