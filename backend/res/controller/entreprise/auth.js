const Entreprise =require('../../models/entreprise');
const jwt =require ('jsonwebtoken');
const { validationResult } = require('express-validator');


exports.signup= async(req,res)=>{
   

    Entreprise.findOne({email :req.body.email})
  .exec((error,entreprise)=>{
      if (entreprise) return res.status(400).json({
          message :'user already registered '
  });
  const {
      firstName,
      lastName,
      fullName,
      email,
      password
  } =req.body;
  const _entreprise= new Entreprise ({
      firstName,
      lastName,
      fullName,
      email,
      password,
      username : Math.random().toString(),
      role :"entreprise"
  });
  _entreprise.save((error,data)=>{
    if(error){
        return res.json(error)
     }  
    if (data){
          return res.status(201).json({
             message : "user succsufly create"
          })
      }
  });
  

    
 });
}
// signin 
exports.signin=(req,res)=>{
    // email moujoud ou nn
    Entreprise.findOne({email :req.body.email})
    .exec((error,entreprise)=>{
        if (error) return res.status(400).json({
            message : 'invalid email'
        });
        if (entreprise) {
                     // password
                if (entreprise.authentificate(req.body.password )&& entreprise.role ==='entreprise'){
                    // token with jsonwebtoken
                    const token =jwt.sign({_id :entreprise._id ,role :entreprise.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
                    const  { _id,firstName ,lastName ,email , role , fullName,username} =entreprise;
                    res.status(200).json({
                        token,
                        entreprise :{
                            _id, firstName,lastName,fullName,email,role,username
                        }

                    });
                }else{
                    return res.status(400).json({
                        message :' invalid password '
                    })
                }

        }else 
        return res.status(400).json({
            message :"user is not  exciste"
        })
    });
}
// verify token exest ou nn 

    

