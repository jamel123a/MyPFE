const jwt=require('jsonwebtoken');
const { merge, result } = require('lodash');
const User =require('../models/condidat');
const _ =require('lodash')
//to send email
const mailgun= require('mailgun-js');
const DOMAIN ='sandboxa15c37c7e4fd4c538c83e8a90a4c7733.mailgun.org';
const mg = mailgun({apiKey:'462d423f63953ddc5e6757dd591e40d3-dbc22c93-381073ec', domain: DOMAIN});

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
      User.findOne({email},(error,user)=>{
         if(error || !user) {
             return res.status(400).json({error :'user with this email not exist'})
         }
        
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

//resetpassword
exports.resetPassword=(req,res)=>{
    //resetpassword bch ttaked li howa lien ou nn
   const {resetLink,newPass} =req.body;
   if (resetLink){
       jwt.verify(resetLink,process.env.JWT_RESET_PASSWORD,function(error,decodeDate){
           if(error){
               return res.status(400).json({error :'incorret token or it is expired'})
           }
           User.findOne({resetLink},(error,user)=>{
            if(error || !user) {
                return res.status(400).json({error :'user with this email not exist'})
            }
            const obj ={
                password :newPass,
                resetLink :''
            }

            user =_.extend(user,obj);
            user.save((error,result)=>{
               if(error){
                   return res.status(400).json({error :'reset password error'})
               }
               else{
                   return res.status(200).json({message :'your password has been change '});
               }
            })
           })
       })
   }else{
       return res.status(400).json({message :'something wrong'})
   }

}