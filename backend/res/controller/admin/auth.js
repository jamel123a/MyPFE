const User =require('../../models/user');
const jwt =require ('jsonwebtoken')
const bcrypt =require('bcrypt');
const ValidateRegister =require('../../validation/register');
const ValidateLogin =require ('../../validation/login')


exports.signup=async(req,res)=>{
    const {errors,isValid} =ValidateRegister(req.body);
    try{
        if (!isValid){
            res.status(404).json(errors)
        }       
       else{
          const { firstName, lastName, fullName, email, password,avatar } = req.body;
         
            const passwordHash =await  bcrypt.hash(password,12)  
           const user = await User.findOne({ email })
           errors.email = 'cette adresse e-mail existe déjà.'
             if (user) return  res.status(404).json(errors)
           const _condidat = new User({
               firstName,
               lastName,
               fullName :firstName+lastName,
               email,
               password :passwordHash,
               username: Math.random().toString(),
               role: "admin",
               
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
// signin 
exports.signin=async(req,res)=>{
   
    const {errors,isValid} =ValidateLogin(req.body);
   try{
    if (!isValid){
        res.status(404).json(errors)
    } 
   else{

    const {email, password } = req.body;
    //email ixext ou non 
    const condidat=  await   User.findOne({email :req.body.email})
    
    if (!condidat) return  res.status(404)
    .json(errors.email = 'cette adresse e-mail ne existe  pas.')
        if (condidat) {
                     // password
                       
                 const isMatch =await bcrypt.compare(password,condidat.password)   
                if (isMatch){
                    // token with jsonwebtoken
                    const token =jwt.sign({_id :condidat._id,role:condidat.role,fullName:condidat.fullName},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
                    const  { _id,firstName ,lastName ,email , role , fullName ,username,password,avatar} =condidat;

                 ///for lougout 
               /*    res.cookie('refreshtoken',token,{
                             httpOnly:true,
                             path :'/api/refersh_token',
                             maxAge :7*24*60*60*100//7d
                         })*/
                     res.status(200).json({
                         message :" connexion réussie  ",
                         token :"Bearer "+token,
                         user :{
                            _id, firstName,lastName,fullName,email,role,username,password,avatar
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
/*
exports.getAccessToken=async(req,res)=>{
    try{
        const rf_token= req.cookies.refreshtoken
    if(!rf_token)return res.status(400).json({msg :'  please login new'})
    jwt.verify(rf_token,process.env.JWT_REFRESH,(err,user)=>{
        if (err) return res.status(400).json({msg :" please login new"})
        const token =jwt.sign({_id :user._id,role:user.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
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
}  */

    

