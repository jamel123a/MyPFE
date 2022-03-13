const mongoose =require('mongoose')
const offreSchema =new mongoose.Schema({
    name :{
        type :String,
        require : true
    },
    motclé :{
       type :String,
       require :true
    },
    lieu :{
        type :String,
        require :true
     },
     descrition :{
        type :String,
        require :true
     },
     dateFinOffre :{
         type :date,
         require :true
     },
     salaire :{
        type :String,
     },
     niveauEtude :{
        type :String,
        require :true
     },
     avantage :{
         type :String
     },
     require : {
         type :String
     },
     mois :{
        type :Number,
        require :true
     }, 
     contPostuler :[
         {
             // extends mn numbre de condidat
             CondidatId:{type :mongoose.Schema.Types.ObjectId},
             ref :'Condidat'
         }
     ],
    category :{ Type :mongoose.Schema.Types.ObjectId, ref :"Category" },
  //  createBy :{ type :mongoose.Schema.Types.ObjectId ,ref :'Entreprise'}
        
     },  
{timestamps :true});

module.exports=mongoose.model('Offre',offreSchema);


