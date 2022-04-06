const express =require('express')
const Condidat =require('../../models/condidat');
const jwt =require ('jsonwebtoken');
exports.getAllCondidatInfo=async(req,res)=>{
    try{
        const condidat= await Condidat.find({role:"condidat"}).select('-hash_password')
        res.json(condidat)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}
//get all entreprise user
exports.getAllEntrepreiseInfo=async(req,res)=>{
    try{
        const condidat= await Condidat.find({role:"entreprise"}).select('-hash_password')
        res.json(condidat)
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}

/// update role user
exports.updateUserRole=async(req,res)=>{
   try{
     const {role}=req.body
      await Condidat.findByIdAndUpdate(req.params.id,{
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
       await Condidat.findByIdAndDelete(req.params.id,{
          
     })
     
     res.json({msg :"Delete  Succes"})
    }catch(err){
     return res.status(500).json({err :"error"})
  }
 }
 
