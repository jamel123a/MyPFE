const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt');
const { merge, result } = require('lodash');
const User =require('../models/user');
const _ =require('lodash')
//to send email
const mailgun= require('mailgun-js');
const sendEmail = require('./sendemail');
const DOMAIN ='sandboxa15c37c7e4fd4c538c83e8a90a4c7733.mailgun.org';
const mg = mailgun({apiKey:'462d423f63953ddc5e6757dd591e40d3-dbc22c93-381073ec', domain: DOMAIN});

 // verify token exest ou nn 
exports.requireSignin = (req,res,next)=>{
 
  try{
          
    if (req.headers.authorization){
    
        const token =req.headers.authorization.split(" ")[1];
        const user =jwt.verify(token,process.env.JWT_SRCRET);

        req.user=user ;
    }else {
    return res.status(400).json({
        message :'authorization require' })
    }
    next();
  }catch (err){
    return res.status(500).json({msg :err.message})
}

}

//auth mt3 vedio login
exports.auth=(req,res,next)=>{
    try{
        const token =req.header("Authorization")
        if(!token)return res.status(400).json({msg:"authorization require "})
        jwt.verify(token,process.env.JWT_SRCRET,(err,user)=>{
            if(err)return res.status(400).json({msg:"invaled token"})
             req.user=user
             next()
        })
    }catch (err){
        return res.status(500).json({msg :err.message})
    }
}

// user 
exports.userMiddleware=(req,res,next)=>{
   
    if(req.user.role !== 'condidat'){
        return res.status(400).json({message :'Acces denied'})
    }
    next();
}
// admin
// lzem w9et t3ml signup thot attr role admin 
exports.adminMiddleware=(req,res,next)=>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({msg :'Acces denied'})
    }
    next();
}
exports.forgetpassword=async(req,res)=>{
       try {
        const {email}=req.body;
        const user = await  User.findOne({email})

        if(!user) return res.status(400).json({msg :"l'utilisateur avec cet email nexiste pas"})
        
        const token =jwt.sign({_id :user._id},process.env.JWT_SRCRET,{ expiresIn :'15m'})
       const url =`${process.env.API}/resetpassword/${token}`
       sendEmail(email,url,"réinitialisez votre mot de passe") 
       return  await res.status(200).json({msg :`réinitialiser le mot de passe envoyer à ${email}`})
   
    
     
    

    }catch(erorr) {
        return res.json(erorr)
    }

}

exports.resetPassword =async(req,res)=>{
    try{
        const {password}=req.body;
       
        const passwordHash =await bcrypt.hash(password,12)
        await User.findByIdAndUpdate({_id:req.user._id},{
            password :passwordHash
        })
        res.status(200).json({msg :"Mot de passe changé"})
      
    }catch (err){
        return res.status(500).json({message :err.message})
    }
}

//get user

exports.getUserInfo=async(req,res)=>{
    try{
    
        const user= await User.findById(req.user._id).select('-password')
        res.status(200).json(user)
    }catch(err){
       return res.status(500).json({err :"erorr"})
    }
}

//update user  
exports.UpdateUser=async(req,res)=>{
  
  
    try{
        const {
            avatar,
            firstName,
            lastName,
            email,
         //  password
            
        } =req.body;
           
      // const passwordHash = bcrypt.hash(password,12)
        
       
         await User.findByIdAndUpdate({_id:req.user._id},{
            avatar,firstName,lastName,email//password :passwordHash
        })
        
       await res.json({msg :"update"})

    }catch{
       return res.status(400).json({err :"erorr"})
    }
}
