const Entreprise =require('../../models/condidat');
const jwt =require ('jsonwebtoken');

const sendEmail =require('../../common/sendemail')
const userCrtl ={
signup : async(req,res)=>{
    try{
     const { firstName,  lastName, fullName, email,  password} =req.body;
      const user =await Entreprise.findOne({email})
      if (user) return res.status(400).json( {msg :'this email already exict .'})
      const newuser ={
          firstName,lastName,email,password,fullName
      }
       const activation_token =creacteActivationToken(newuser)
       const url = `${process.env.API}/user/activate/${activation_token}`
       sendEmail(email,url)
       res.json({msg :"register succes "})

    }catch (err){
        return res.status(500).json({msg :err.message})
    }
}
}
const creacteActivationToken =(payload)=>{
     return jwt.sign(payload,process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'5m'})
}
module.exports =userCrtl
  