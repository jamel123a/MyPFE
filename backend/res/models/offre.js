const mongoose =require('mongoose')
const offreSchema = new mongoose.Schema({
    name :{
        type :String,
        required : true
    },
    motclé :{
       type :[String],
       required :true
    },
    lieu :{
        type :String,
        required :true
     },
     description :{
        type :String,
        required :true
     },
     dateFinOffre :{
         type :String,
     },
     salaire :{
        type :String,
     },
     niveauEtude :{
        type :String,
     },
     avantage :{
         type :String
     },
     require : {
         type :String
     },
     mois :{
        type :Number,
     }, 
    contPostuler :[
         {
             // extends mn numbre de condidat
          CondidatId:{type :mongoose.Schema.Types.ObjectId, ref :'Condidat' },
          numbers :Number
         }
     ],
    
    category :
        {type :mongoose.Schema.Types.ObjectId, ref :'Category',required :true },
     

    createBy :{ type :mongoose.Schema.Types.ObjectId , ref :'User',required :true},
    
    
    
    updateAt :Date,   
     },  
{timestamps :true});

module.exports=mongoose.model('Offre',offreSchema);



