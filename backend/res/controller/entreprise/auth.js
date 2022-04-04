const Entreprise =require('../../models/condidat');
const exprssjwt =require('express-jwt')
const jwt =require ('jsonwebtoken');
const { validationResult } = require('express-validator');
const _ =require('lodash')
//to send email
const mailgun= require('mailgun-js');
const DOMAIN ='sandboxa15c37c7e4fd4c538c83e8a90a4c7733.mailgun.org';
const mg = mailgun({apiKey:'462d423f63953ddc5e6757dd591e40d3-dbc22c93-381073ec', domain: DOMAIN});

/*const mail =require('@sendgrid/mail')
mail.setApiKey(process.env.MAIL.KEY)*/

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
     fullName,
     email,
     password
     },
     process.env.JWT_ACCOUNT_ACTIVATION,
     {
         expiresIn :'15m'
     }
  )

  //const url =`${process.env.API}/user/activate/${token}`

  /*sendEmail(email,url)
   res.json({msg :`email aaa  has benn sent to ${email}`})*/
    
  const emailData ={
      from: process.env.Email_FROM,
      to :email,
      subject :'Account activation link ',
      html :`
      <h1> click here for activate</h1>
      <p>${process.env.API}/user/activate/${token}</p>
      </hr>
      <p>this email contain sensetive info</p>
      <p>${process.env.API}</p>
      `
  }
 mg.messages().send(emailData,function(error,body){
      if(error){
          return res.json({error :error.message})
      }
      return res.json({message :`email has benn sent to ${email}`})
  })
})


  

    
 
  
}


// activation 
exports.activation=(req,res)=>{
    const {token}=req.body;
    if (token){
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,function(error,decodedToken){
            if(error){
                return res.status(400).json({message :'Incorrect or expried token .SIGNUP'})
            }else{
                const {firstName,lastName,email,password,fullName}=jwt.decode(token)
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
                           message : "user succsufly acctivate signup "
                        })
                    }
                }); 
            }
            
            
        })
    }else{
        return res.json({
            message:'something wrong'
        })
    }
    
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
                    //GENERATE TOKEN
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
            message :"user is not  exciste or check your email for validation "
        })
    });
}
// verify token exest ou nn 

    

