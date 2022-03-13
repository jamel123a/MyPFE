// verify token exest ou nn 
exports.requireSignin = (req,res,next)=>{
    const token =req.headers.authorization.split(" ")[1];
    const condidat =jwt.verify(token,process.env.JWT_SRCRET);
    req.condidat=condidat ;
    next();
}