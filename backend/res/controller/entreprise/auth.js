const Entreprise =require('../../models/user');
const exprssjwt =require('express-jwt')
const jwt =require ('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt =require('bcrypt')
const _ =require('lodash')
const ValidateRegister =require('../../validation/registerEntreprise')
const ValidateLogin =require ('../../validation/login')
const sendEmail =require('../../common/sendemail')

  

 
  // signin 

  exports.signin=async(req,res)=>{
    // email moujoud ou nn
    const {errors,isValid} =ValidateLogin(req.body);
   try{
    if (!isValid){
        res.status(404).json(errors)
    }else{
      
    
    
        const {email, password } = req.body;
        const entreprise =await  Entreprise.findOne({email :req.body.email})
        errors.email = 'cette adresse e-mail existe pas'
        if (!entreprise) return  res.status(404).json(errors)
    
            if (entreprise) {
                  
                const isMatch =await bcrypt.compare(password,entreprise.password)   

                         // password
                    if (isMatch && entreprise.role ==='entreprise'){
                        // token with jsonwebtoken
                        //GENERATE TOKEN
                        const token =jwt.sign({_id :entreprise._id ,role :entreprise.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
                   /*   res.cookie('refreshtoken',referch_token,{
                            httpOnly :true,
                            path :'/api/entreprise/refersh_token',
                            maxAge :7*27*60*60*1000
                        }) */
                        const  { _id,firstName ,lastName ,email , role , fullName,username,address,website,nomEntreprise,description,numberPhone} =entreprise;
                        
    
                        res.status(200).json({
                            token,
                             user :{
                                _id, firstName,lastName,fullName,email,role,username,address,website,nomEntreprise,description,numberPhone
                           }
    
                        });
                    

   
                }else {
                    errors.password = 'Mot de passe incorrect'
                    return  res.status(404).json(errors)
                }
                
            }
        
            }
   }  
   catch (err){
    return res.status(500).json({message :err.message})  
  
}
  }

exports.signup = async(req,res)=>{
    const {errors,isValid} =ValidateRegister(req.body);
    try{
        if (!isValid){
            res.status(404).json(errors)
    } 
      else{

        const { firstName,  lastName, fullName, email,role,  password,website,numberPhone,nomEntreprise,description,address} =req.body;
   /*  if (!firstName || !lastName || !email || !password || !website || !numberPhone  || !nomEntreprise || !address || !description) 
     return res.status(400).json({message :"merci de remplir tous les champs"})
     
     if (!validateEmail(email)) 
     return res.status(400).json({message :"email valide"})
     if (!password.length >6) 
     return res.status(400).json({message :"Le mot de passe doit être au moins de 6 caractères"})*/

      const user =await Entreprise.findOne({email})
      errors.email = 'cette adresse e-mail existe déjà.'
       if (user) return  res.status(404).json(errors)
       const passwordHash =await  bcrypt.hash(password,12)  

      const newuser ={
          firstName,lastName,email,password : passwordHash,fullName,website,numberPhone,nomEntreprise,description,address,role: "entreprise"
      }
       const activation_token =creacteActivationToken(newuser)
       const url = `${process.env.API}/user/activate/${activation_token}`
       sendEmail(email,url,"Vérifiez votre e-mail")
       res.json({message :`e-mail a été envoyé à ${email}`})
    
      }
    }catch (err){
        return res.status(500).json({message:err.message})
    }
}


const creacteActivationToken =(payload)=>{
     return jwt.sign(payload,process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'15m'})
}

//activation /*
exports.activation=(req,res)=>{
    const {token}=req.body;
    if (token){
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,function(error,decodedToken){
            if(error){
                return res.status(400).json({message :'Jeton incorrect ou expiré. SINSCRIRE'})
            }else{
                const {firstName,lastName,email,password,fullName,address,website,numberPhone,nomEntreprise,description}=jwt.decode(token)
                const _entreprise= new Entreprise ({
                    firstName,
                    lastName,
                    fullName,
                    email,
                    password,
                    address,
                    website,
                    numberPhone,
                    nomEntreprise,
                    description,
                    username : Math.random().toString(),
                    role :"entreprise"
                });
                _entreprise.save((error,data)=>{
                  if(error){
                      return res.json(error)
                   }  
                  if (data){
                        return res.status(201).json({
                           message : "l'utilisateur a réussi à activer l'inscription te peut connecter "
                        })
                    }
                }); 
            }       
        })
    }else{
        return res.json({
            message:'Quelque chose ca va pas'
        })
    }

}
// signin 
/*
// verify token exest ou nn 
exports.getAccessToken=async(req,res)=>{
    try{
        const rf_token=req.cookies.refreshtoken
        if(!rf_token)return res.status(400).json({msg :'  please login new'})
      
        jwt.verify(rf_token,process.env.JWT_REFRESH,(err,condidat)=>{
      
            if (err) return res.status(400).json({msg :" please login new"})
      
            const token =jwt.sign({_id :condidat._id,role:condidat.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
             res.json({token})
        })


    }catch(err){
        return res.status(500).json({msg :err.message})
    }

}
exports.logout=async(req,res)=>{
    try{
        res.clearCookie('refreshtoken',{path :'/api/entreprise/refersh_token'})
        return res.json({msg :"logget out ."})        

    }catch(err){
        return res.status(400).json({msg :err.message})
    }
} 

*//*
exports.signup=async(req,res)=>{
    try{
               
        const { firstName,  lastName, fullName, email,  password,website,numberPhone,nomEntreprise,description,address} =req.body;
        if (!firstName || !lastName || !email || !password || !website || !numberPhone  || !nomEntreprise || !address || !description) 
        return res.status(400).json({message :"merci de remplir tous les champs"})
        
        if (!validateEmail(email)) 
        return res.status(400).json({message :"email valide"})
        if (!password.length >6) 
        return res.status(400).json({message :"Le mot de passe doit être au moins de 6 caractères"})
   

        const user = await Entreprise.findOne({ email })
        if (user) return res.status(400).json({ error: 'cette adresse e-mail existe déjà.' })
        const _entreprise = new Entreprise({
            firstName,
            lastName,
            fullName,
            email,
            password,
            username: Math.random().toString(),
            role: "entreprise",
            description,
            numberPhone,
            nomEntreprise,
            address,
            numberPhone

        });
        _entreprise.save((error, data) => {
            if (error) {
                return res.json(error);
            }
            if (data) {
                return res.status(201).json({
                    message: "utilisateur créé avec succès"
                })
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
   
  }*/