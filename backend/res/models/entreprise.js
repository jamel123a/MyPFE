const mongoose=require('mongoose')
const bcrypt =require('bcrypt');
const entrepriseShema =new mongoose.Schema({
     firstName:{
         type : String,
         required :true,
         trim :true,
         min :3,
         max: 20
     } ,
     lastName:{
        type : String,
        required :true,
        trim :true,
        min :3,
        max:  20 
    },
    username :{
        type :String,
        required:true,
        trim :true,
        unique :true,
        index :true,
        lowercase :true
    },
    
    email:{
       type :String,
       require :true,
       trim: true,
       unique :true,
       lowercase :true    
    },
    hash_password :{
        type :String,
        required :true
    },
    role :{
        type :String,
        enum :['condidat','entreprise','admin'],
        default :'entreprise'
    },
    address:{
        type :String,
        required :true
    },
    numberPhone :{
       type : Number,
       required :true
    },
    website :{
       type :String,
    },
    avatar :{
        type :String,
     
        default :"https://res.cloudinary.com/dggj0tbj8/image/upload/v1649260316/avatar/logo_gnri0o.png"
    },
   description:{
       type :String,
       
   }
},

{timestamps :true});

/// dycrypt le  password

// fullname
entrepriseShema.virtual('fullName')
    .get(function(){
           return `${this.firstName} ${this.lastName}`
    });


//authtificate 






module.exports=mongoose.model('Entreprise',entrepriseShema);
      