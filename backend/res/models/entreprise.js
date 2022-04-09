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
        type :String
    },
    numberPhone :{
       type : Number
    },
   logo :
   {
    type :String
   },
   description:{
       type :String,
   }
},

{timestamps :true});

/// dycrypt le  password
entrepriseShema.virtual('password')
.set(function(password){
   this.hash_password =bcrypt.hashSync(password,10);
});
// fullname
entrepriseShema.virtual('fullName')
    .get(function(){
           return `${this.firstName} ${this.lastName}`
    });


//authtificate 
entrepriseShema.methods ={
    authentificate: async function(password){
        return await bcrypt.compareSync(password,this.hash_password);
    }
}





module.exports=mongoose.model('Entreprise',entrepriseShema);
      