const Condidat =require('../../models/user');
const jwt =require ('jsonwebtoken');
const ValidateRegister =require('../../validation/register');
const ValidateLogin =require ('../../validation/login')
const { validationResult } = require('express-validator');
//const bcrypt =require('bcrypt');


exports.signup=async(req,res)=>{
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
   
         const user = await Condidat.findOne({ email })
         errors.email = 'cette adresse e-mail existe déjà.'
           if (user) return  res.status(404).json(errors)
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
                     message: "utilisateur créé avec succès"
                 })
             }
         });
     }
  } catch (error) {
      return res.status(500).json({ message: error.message })
  }
 
}
/*function validateEmail(email) {
   
    const re=  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  };*/
// signin 
exports.signin=async(req,res)=>{
    // email moujoud ou nn
    const {errors,isValid} =ValidateLogin(req.body);
   try{
    if (!isValid){
        res.status(404).json(errors)
    } 
  /*  const {email, password } = req.body;
    if (!email || !password ) 
    return res.status(400).json({message :"merci de remplir tous les champs"})
    
    if (!validateEmail(email)) 
    return res.status(400).json({message :"email valide"})
    if (password.length <6) 
    return res.status(400).json({message :"Le mot de passe doit être au moins de 6 caractères"})
*/   else{

    const {email, password } = req.body;
    const condidat=  await   Condidat.findOne({email :req.body.email})
    errors.email = 'cette adresse e-mail existe déjà.'
    if (!condidat) return  res.status(404).json(errors)
        if (condidat) {
                     // password
                       
                    
                if (condidat.authentificate(req.body.password)/*&& condidat.role==='condidat'*/){
                    // token with jsonwebtoken
                    const token =jwt.sign({_id :condidat._id,role:condidat.role,fullName:condidat.fullName},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
                    const  { _id,firstName ,lastName ,email , role , fullName ,username,password} =condidat;

                 ///for lougout 
               /*    res.cookie('refreshtoken',token,{
                             httpOnly:true,
                             path :'/api/refersh_token',
                             maxAge :7*24*60*60*100//7d
                         })*/
                     res.status(200).json({
                         message :" connexion réussie  ",
                         token,
                         user :{
                            _id, firstName,lastName,fullName,email,role,username,password
                        }

                    });
                }else{
                    errors.password = 'Mot de passe incorrect'
                     return  res.status(404).json(errors)
                }

        }/*else 
        return res.status(400).json({
            message :" l'utilisateur n'existe pas"
        })*/
    }
   
  
   }catch (err){
    return res.status(500).json({message :err.message})
}
    
}
// verify token exest ou nn 
/*exports.getAccessTokenUser=async(req,res)=>{
    try{
        const rf_token= req.cookies.refreshtoken
        console.log(rf_token)
    if(!rf_token)return res.status(400).json({msg :' veuillez vous connecter'})
    jwt.verify(rf_token,process.env.JWT_REFRESH,(err,condidat)=>{
        if (err) return res.status(400).json({msg :" veuillez vous connecter"})
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
        return res.json({msg :"déconnecté ."})        

    }catch(err){
        return res.status(400).json({msg :err.message})
    }
}  

*/