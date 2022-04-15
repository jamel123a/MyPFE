const User =require('../../models/user');
const jwt =require ('jsonwebtoken')
const bcrypt =require('bcrypt');


exports.signup=(req,res)=>{
    User.findOne({email :req.body.email})
  .exec (async(error,user)=>{
      if (user) return res.status(400).json({
          message :'admin already registered ',

          
  });
  const {
      firstName,
      lastName,
      fullName,
      email,
      password
  } =req.body;
  const hash_password =await bcrypt.hash(password,10)
  const _user= new User ({
      firstName,
      lastName,
      fullName,
      email,
      hash_password,
      username : Math.random().toString(),
      role :"admin"
  });
  _user.save((error,data)=>{
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
    User.findOne({email :req.body.email})
    .exec((error,user)=>{
        if (error) return res.status(400).json({
            message : 'invalid email'
        });
        if (user) {
                     // password
                if (user.authentificate(req.body.password )&& user.role ==='admin'){
                    // token with jsonwebtoken
                    const token =jwt.sign({_id :user._id,role:user.role},process.env.JWT_SRCRET,{expiresIn :'12h'})// tetneha b3ed se3a
                    const  { _id,firstName ,lastName ,email , role ,username, fullName,password} =user;
                   /* res.cookie('refreshtoken',token,{
                        httpOnly:true,
                        path :'/api/refersh_token',
                        maxAge :7*24*60*60*100//7d
                    })*/
                 
                    res.status(200).json({
                        token,
                        user :{
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
            message :"admin is not  exciste"
        })
    });
}
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
}  

    

