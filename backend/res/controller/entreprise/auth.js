const Entreprise =require('../../models/user');
const exprssjwt =require('express-jwt')
const jwt =require ('jsonwebtoken');
const { validationResult } = require('express-validator');
const _ =require('lodash')

const sendEmail =require('../../common/sendemail')




  // signin    */



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
    return res.status(400).json({message :"merci de remplir tous les champs"})
    
    if (!validateEmail(email)) 
    return res.status(400).json({message :"email valide"})
    if (password.length <6) 
    return res.status(400).json({message :"Le mot de passe doit être au moins de 6 caractères"})


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
               /*   res.cookie('refreshtoken',referch_token,{
                        httpOnly :true,
                        path :'/api/entreprise/refersh_token',
                        maxAge :7*27*60*60*1000
                    }) */
                    const  { _id,firstName ,lastName ,email , role , fullName,username,adress,website,nomEntreprise,description,numberPhone} =entreprise;
                    

                    res.status(200).json({
                        token,
                        user :{
                            _id, firstName,lastName,fullName,email,role,username,adress,website,nomEntreprise,description,numberPhone
                        }

                    });
                }else{
                    return res.status(400).json({
                        message :' Mot de passe incorrect'
                    })
                }

        }else 
        /* ou vérifiez votre e-mail pour validation */
        return res.status(400).json({
            message :"l'utilisateur n'est pas exciste"
        })
    });
   }  
   catch (err){
    return res.status(500).json({message :err.message})  
  
}
  }













/*exports.signup = async(req,res)=>{
    try{
     const { firstName,  lastName, fullName, email,  password,website,numberPhone,nomEntreprise,description,address} =req.body;
     if (!firstName || !lastName || !email || !password || !website || !numberPhone  || !nomEntreprise || !address || !description) 
     return res.status(400).json({message :"merci de remplir tous les champs"})
     
     if (!validateEmail(email)) 
     return res.status(400).json({message :"email valide"})
     if (!password.length >6) 
     return res.status(400).json({message :"Le mot de passe doit être au moins de 6 caractères"})

   
      
      const user =await Entreprise.findOne({email})
      if (user) return res.status(400).json( {message :'cette adresse e-mail existe déjà.'})
      const newuser ={
          firstName,lastName,email,password,fullName,website,numberPhone,nomEntreprise,description,address
      }
       const activation_token =creacteActivationToken(newuser)
       const url = `${process.env.API}/user/activate/${activation_token}`
       sendEmail(email,url,"Vérifiez votre e-mail")
       res.json({message :`e-mail a été envoyé à ${email}`})
    }catch (err){
        return res.status(500).json({message:err.message})
    }
}

function validateEmail(email) {
   
    const re=  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  };
const creacteActivationToken =(payload)=>{
     return jwt.sign(payload,process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'15m'})
}
*/

//to send email
//const mailgun= require('mailgun-js');
//const DOMAIN ='sandboxa15c37c7e4fd4c538c83e8a90a4c7733.mailgun.org';
//const mg = mailgun({apiKey:'462d423f63953ddc5e6757dd591e40d3-dbc22c93-381073ec', domain: DOMAIN});

/*const mail =require('@sendgrid/mail')
mail.setApiKey(process.env.MAIL.KEY)*/

/*exports.signup= (req,res)=>{
   
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
   res.json({msg :`email aaa  has benn sent to ${email}`})
    
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
 
  
}*/


//activation /*
/*exports.activation=(req,res)=>{
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
                           message : "l'utilisateur a réussi à activer l'inscription "
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
    
}*/
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

*/
