const jwt=require('jsonwebtoken')

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
//moddleware

exports.EntrepriseMiddleware=(req,res,next)=>{
    if(req.entreprise.role !== 'entreprise'){
        return res.status(400).json({message :'Acces denied'})
    }
    next();
}