const jwt=require('jsonwebtoken')



 // verify token exest ou nn 
exports.requireSignin = (req,res,next)=>{
 
 
    if (req.headers.authorization){
    
    
        const token =req.headers.authorization.split(" ")[1];
    const condidat =jwt.verify(token,process.env.JWT_SRCRET);
     
    req.condidat=condidat ;
   
    }else {
    return res.status(400).json({
        message :'authorization require' })
    }
    next();

}

// user 
exports.userMiddleware=(req,res,next)=>{
      
    if(req.condidat.role !== 'condidat'){
        return res.status(400).json({message :'Acces denied'})
    }
    next();
}
// admin
// lzem w9et t3ml signup thot attr role admin 
exports.adminMiddleware=(req,res,next)=>{
    if(req.condidat.role !== 'admin'){
        return res.status(400).json({message :'Acces denied'})
    }
    next();
}
