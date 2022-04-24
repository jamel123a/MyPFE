const isEmpty =require('./isEmty');
const validator =require('validator')

module.exports=function ValidateLogin(data){
    let errors ={}

   
    data.email =!isEmpty(data.email) ?  data.email :""
    data.password =!isEmpty(data.password) ? data.password :""
    
    
    if (validator.isEmpty(data.email )){
        errors.email="e-mail requis"
    }
    if (!validator.isEmail(data.email )){
        errors.email="email valide"
    }
    if (validator.isEmpty(data.password)){
        errors.password="mode de passe requis"
    }
    if (!validator.isLength(data.password,6,30)){
        errors.password="Le mot de passe doit être au moins de 6 caractères"
    }
    
    return {
        errors,
        isValid :isEmpty(errors)
    }
}