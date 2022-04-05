const Condidat =require('../../models/condidat');
const jwt =require ('jsonwebtoken');
const { validationResult } = require('express-validator');


exports.signup=(req,res)=>{
   

    Condidat.findOne({email :req.body.email})
  .exec((error,condidat)=>{
      if (condidat) return res.status(400).json({
          message :'user already registered '
  });
  const {
      firstName,
      lastName,
      fullName,
      email,
      password
  } =req.body;
  const _condidat= new Condidat ({
      firstName,
      lastName,
      fullName,
      email,
      password,
      username : Math.random().toString(),
      role :"condidat"
  });
  _condidat.save((error,data)=>{
    if(error){
        return res.json(error);
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
    Condidat.findOne({email :req.body.email})
    .exec((error,condidat)=>{
        if (error) return res.status(400).json({
            message : 'invalid email'
        });
        if (condidat) {
                     // password
                if (condidat.authentificate(req.body.password)&& condidat.role==='condidat'){
                    // token with jsonwebtoken
                    const token =jwt.sign({_id :condidat._id,role:condidat.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
                    const  { _id,firstName ,lastName ,email , role , fullName ,username,password} =condidat;
                   /*  res.cookie('refreshtoken',token,{
                             httpOnly:true,
                             path :'/api/condidat/refersh_token',
                             maxAge :7*24*60*60*100//7d
                         })*/
                        res.status(200).json({
                        token,
                        condidat :{
                            _id, firstName,lastName,fullName,email,role,username,password
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
exports.getAccessTokenUser=async(req,res)=>{
    try{
        const rf_token= req.cookies.refreshtoken
        console.log(rf_token)
    if(!rf_token)return res.status(400).json({msg :' please please login new'})
    jwt.verify(rf_token,process.env.JWT_REFRESH,(err,condidat)=>{
        if (err) return res.status(400).json({msg :" please login new"})
        const token =jwt.sign({_id :condidat._id,role:condidat.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
         res.json({token})
    })
    }catch(err){
        return res.status(400).json({msg :err.message})
    }
}
 

