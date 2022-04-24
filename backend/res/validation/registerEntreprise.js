const isEmpty =require('./isEmty');
const validator =require('validator')

module.exports=function ValidateRegister(data){
    let errors ={}

    data.firstName =!isEmpty(data.firstName) ? data.firstName :""
    data.lastName =!isEmpty(data.lastName) ? data.lastName :""
    data.email =!isEmpty(data.email) ?  data.email :""
    data.password =!isEmpty(data.password) ? data.password :""
    data.address =!isEmpty(data.address) ? data.address :""
    data.nomEntreprise =!isEmpty(data.nomEntreprise) ? data.nomEntreprise :""
    
    if (validator.isEmpty(data.firstName)){
        errors.firstName="Prénom requis"
    }
    if (validator.isEmpty(data.lastName)){
        errors.lastName="nom de famille requis"
    }
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
    if (validator.isEmpty(data.address )){
        errors.address="address requis"
    }
    if (validator.isEmpty(data.nomEntreprise )){
        errors.nomEntreprise="nom de entreprise requis"
    }
    
    return {
        errors,
        isValid :isEmpty(errors)
    }
}
