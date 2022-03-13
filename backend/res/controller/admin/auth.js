const Condidat =require('../../models/condidat');
const jwt =require ('jsonwebtoken')


exports.signup=(req,res)=>{
    Condidat.findOne({email :req.body.email})
  .exec((error,condidat)=>{
      if (condidat) return res.status(400).json({
          message :'admin already registered '
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
      role :"admin"
  });
  _condidat.save((data)=>{
     if(error){
         return res.status(400).json({
             message :'Something  wrong'
         });
      }
       if (data){
          return res.status(201).json({
             message : "admin succsufly create"
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
                if (condidat.authentificate(req.body.password )&& condidat.role ==='admin'){
                    // token with jsonwebtoken
                    const token =jwt.sign({_id :condidat._id,role:condidat.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
                    const  { _id,firstName ,lastName ,email , role , fullName} =condidat;
                    res.status(200).json({
                        token,
                        condidat :{
                            _id, firstName,lastName,fullName,email,role
                        }

                    });
                }else{
                    return res.status(400).json({
                        message :' invalid password '
                    })
                }

        }else  
        return res.status(400).json({
            message :"admin is not  exciste"
        })
    });
}
    

