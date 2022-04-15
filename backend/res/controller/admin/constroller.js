const express =require('express')
const User =require('../../models/user');
const Entreprise =require ('../../models/entreprise')
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
        const user= await Entreprise.find({role:"entreprise"}).select('-hash_password')
        res.json(user)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}

/// update role user
exports.updateUserRole=async(req,res)=>{
   try{
     const {role}=req.body
      await User.findByIdAndUpdate(req.params.id,{
         role
    })
    
    res.json({msg :"update Succes"})
   }catch(err){
    return res.status(500).json({err :"error"})
 }
}
//delete user
exports.DeleteUser=async(req,res)=>{
    try{
       await User.findByIdAndDelete(req.params.id,{
          
     })
     
     res.json({msg :"Delete  Succes"})
    }catch(err){
     return res.status(500).json({err :"error"})
  }
 }
 exports.DeleteEntreprise=async(req,res)=>{
    try{
       await Entreprise.findByIdAndDelete(req.params.id,{
          
     })
     
     res.json({msg :"Delete  Succes"})
    }catch(err){
     return res.status(500).json({err :"error"})
  }
 } 
 
