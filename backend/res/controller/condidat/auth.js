const Condidat =require('../../models/user');
const jwt =require ('jsonwebtoken');
const { validationResult } = require('express-validator');
//const bcrypt =require('bcrypt');


exports.signup=async(req,res)=>{
  try{
             
      const { firstName, lastName, fullName, email, password } = req.body;
       if (!firstName || !lastName || !email || !password ) 
       return res.status(400).json({message :"please full in all fields"})
       
       if (!validateEmail(email)) 
       return res.status(400).json({message :"valid email"})
       if (!password.length >6) 
       return res.status(400).json({message :"password must be at least 6 characters"})

      const user = await Condidat.findOne({ email })
      if (user) return res.status(400).json({ error: 'this email already exict .' })
      const _condidat = new Condidat({
          firstName,
          lastName,
          fullName,
          email,
          password,
          username: Math.random().toString(),
          role: "condidat"
      });
      _condidat.save((error, data) => {
          if (error) {
              return res.json(error);
          }
          if (data) {
              return res.status(201).json({
                  message: "user succsufly create"
              })
          }
      });
  } catch (error) {
      return res.status(500).json({ message: error.message })
  }
 
}
function validateEmail(email) {
   
    const re=  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  };
// signin 
exports.signin=async(req,res)=>{
    // email moujoud ou nn
    
   try{
       
    const {email, password } = req.body;
    if (!email || !password ) 
    return res.status(400).json({message :"please full in all fields"})
    
    if (!validateEmail(email)) 
    return res.status(400).json({message :"valid email"})
    if (password.length >6) 
    return res.status(400).json({message :"password must be at least 6 characters"})

   
     Condidat.findOne({email :req.body.email})
    .exec((error,condidat)=>{
        if (error) return res.status(400).json({
            message : 'invalid email'
        });
        if (condidat) {
                     // password
                       
                    
                if (condidat.authentificate(req.body.password)&& condidat.role==='condidat'){
                    // token with jsonwebtoken
                    const token =jwt.sign({_id :condidat._id,role:condidat.role},process.env.JWT_REFRESH,{expiresIn :'12h'})// tetneha b3ed se3a
                    const  { _id,firstName ,lastName ,email , role , fullName ,username,password} =condidat;


                   res.cookie('refreshtoken',token,{
                             httpOnly:true,
                             path :'/api/refersh_token',
                             maxAge :7*24*60*60*100//7d
                         })
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
   }catch (err){
    return res.status(500).json({msg :err.message})
}
    
}
// verify token exest ou nn 
exports.getAccessTokenUser=async(req,res)=>{
    try{
        const rf_token= req.cookies.refreshtoken
        console.log(rf_token)
    if(!rf_token)return res.status(400).json({msg :'  please login new'})
    jwt.verify(rf_token,process.env.JWT_REFRESH,(err,condidat)=>{
        if (err) return res.status(400).json({msg :" please login new"})
        const token =jwt.sign({_id :condidat._id,role:condidat.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
         res.json({token})
    })
    }catch(err){
        return res.status(400).json({msg :err.message})
    }
}
exports.logout=async(req,res)=>{
    try{
        res.clearCookie('refreshtoken',{path :'/api/refersh_token'})
        return res.json({msg :"logget out ."})        

    }catch(err){
        return res.status(400).json({msg :err.message})
    }
}  

