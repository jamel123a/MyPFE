const jwt=require('jsonwebtoken');
const { merge } = require('lodash');
const User =require('../models/condidat');

const mailgun= require('mailgun-js');
const DOMAIN ='sandboxc9a3a3f6e51841e19d76ad1c35ed3130.mailgun.org';
const mg = mailgun({apiKey:'261b955ab906d2f095bfa8bab82317a4-dbc22c93-07c9d475', domain: DOMAIN});

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

exports.forgetpassword=(req,res)=>{
    const {email}=req.body;
    // virify email
      User.findOne(email)
    .exec((error,user)=>{
        if (error) return res.status(400).json({
            message :'user with this email not exict'
    });
    const token =jwt.sign(
        {
        _id :user._id
        },
        process.env.JWT_RESET_PASSWORD,
        {
            expiresIn :'15m'
        }
     )
     const emailData ={
         from: process.env.Email_FROM,
         to :email,
         subject :'Account reset password link ',
         html :`
         <h1> click here for reset your password</h1>
         <p>${process.env.API}/resetpassword/${token}</p>
         </hr>
         <p>this email contain sensetive info</p>
         <p>${process.env.API}</p>
         `
     };
     return user.updateOne({resetLink :token},function(error,succes){
         if(error){
             return res.status(400).json({ message :'reset password link error'})
         }else{
            mg.messages().send(emailData,function(error,body){
                if(error){
                    return res.json({error :error.message})
                }
                return res.json({message :`email has benn sent to ${email}`})
            })
         }
     })
  })

}