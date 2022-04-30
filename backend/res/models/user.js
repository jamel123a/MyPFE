const mongoose=require('mongoose')
const bcrypt =require('bcrypt');
const userShema =new mongoose.Schema({
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
       required :true,
       trim: true,
       unique :true,
       lowercase :true    
    },
    password :{
        type :String,
        required :true
    },
    role :{
        type :String,
        enum :['condidat','admin','entreprise'],
        default :'condidat'
    },
    address:{
        type :String,
        
    },
    numberPhone :{
       type : Number
    },
    website :{
        type :String,
        
     },
   nomEntreprise :
   {
    type :String,
   },
   resetLink :{
    data :String,
    default :''
   },
   avatar :{
       type :String,
    
       default :"https://res.cloudinary.com/dggj0tbj8/image/upload/v1649260316/avatar/logo_gnri0o.png"
   },
   description:{
    type :String,
   fullName :{
    type :String,
   } 
}
},

{timestamps :true});


// fullname
userShema.virtual('fullName')
    .get(function(){
           return `${this.firstName} ${this.lastName}`
    });








module.exports=mongoose.model('User',userShema);
      