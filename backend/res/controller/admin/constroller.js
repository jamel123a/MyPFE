const express =require('express')
const User =require('../../models/user');
const ValidateRegister =require('../../validation/register');

const jwt =require ('jsonwebtoken');
exports.getAllCondidatInfo=async(req,res)=>{
    try{
        const user= await User.find({role:"condidat"}).select('-hash_password')
        res.json(user)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}
//get all entreprise user
exports.getAllEntrepreiseInfo=async(req,res)=>{
    try{
        const user= await User.find({role:"entreprise"}).select('-hash_password')
        res.json(user)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}

/// update role user
exports.updateCondidat=async(req,res)=>{
   try{
     const {firstName,lastName,email,role}=req.body
      await User.findByIdAndUpdate(req.params.id,{
         firstName,lastName,email,role,
    })
    
    res.json({message :"update Succes"})
   }catch(err){
    return res.status(500).json({err :"error"})
 }
}
exports.getCondidatInfo=async(req,res)=>{
    try{
        const user= await User.findById(req.params.id).select('-hash_password')
        res.json(user)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}
exports.AddUser=async(req,res)=>{
   const {errors,isValid} =ValidateRegister(req.body);
 try{
     if (!isValid){
         res.status(404).json(errors)
     }       
    else{
       const { firstName, lastName, fullName, email, password } = req.body;
       /*  if (!firstName || !lastName || !email || !password ) 
         return res.status(400).json({message :"merci de remplir tous les champs"})
         
         if (!validateEmail(email)) 
         return res.status(400).json({message :"email valide"})
         if (!password.length >6) 
         return res.status(400).json({message :"Le mot de passe doit être au moins de 6 caractères"})*/
  
        const user = await User.findOne({ email })
        errors.email = 'cette adresse e-mail existe déjà.'
          if (user) return  res.status(404).json(errors)
        const _user = new User({
            firstName,
            lastName,
            fullName,
            email,
            password,
            username: Math.random().toString(),
            role: "condidat"
        });
        _user.save((error, data) => {
            if (error) {
                return res.json(error);
            }
            if (data) {
                return res.status(201).json({
                    message: "Condidat créé avec succès"
                })
            }
        });
    }
 } catch (error) {
     return res.status(500).json({ message: error.message })
 }

}
//delete user
exports.DeleteUser=async(req,res)=>{
    try{
       await User.findByIdAndDelete(req.params.id,{
          
     })
     
     res.json({message :"Delete  Succes"})
    }catch(err){
     return res.status(500).json({err :"error"})
  }
 }
 exports.DeleteEntreprise=async(req,res)=>{
    try{
       await Entreprise.findByIdAndDelete(req.params.id,{
          
     })
     
     res.json({message:"Delete  Succes"})
    }catch(err){
     return res.status(500).json({err :"error"})
  }
 } 
 
