const Entreprise =require('../../models/condidat');
const exprssjwt =require('express-jwt')
const jwt =require ('jsonwebtoken');
const { validationResult } = require('express-validator');
const _ =require('lodash')
//to send email

const mail =require('@sendgrid/mail')
mail.setApiKey(process.env.MAIL.KEY)

exports.signup= (req,res)=>{
   
    const {
        firstName,
        lastName,
        fullName,
        email,
        password
    } =req.body;

    
    Entreprise.findOne({email :req.body.email})
  .exec((error,entreprise)=>{
      if (entreprise) return res.status(400).json({
          message :'user already registered '
  });
  /// generate token 
 const token =jwt.sign(
     {
     firstName,
     lastName,
     email,
     password
     },
     process.env.JWT_ACCOUNT_ACTIVATION,
     {
         expiresIn :'15m'
     }
  )
  const emailData ={
      from: process.env.Email_FROM,
      to :to,
      subject :'Account activation link ',
      html :`
      <h1> click here for activate</h1>
      <p>${process.env.API}/user/activate/${token}</p>
      </hr>
      <p>this email contain sensetive info</p>
      <p>${process.env.API}</p>
      `
  }
  mail.send(emailData).then(sent=>{
      return res.status(200).json({
          message : `email has benn sent to ${email}`
      })
      
  })
 
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

    

