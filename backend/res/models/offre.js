const mongoose =require('mongoose')
const offreSchema =new mongoose.Schema({
    name :{
        type :String,
        require : true
    },
    domaine:{
        type :String,
        require :true
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
     neveauEtude :{
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
     contPostuler :{
         type :mongoose.Schema.Types.ObjectId,
         require:true,
         ref :"Condidat"
        }
     },  
{timestamps :true});

module.exports=mongoose.model('Offre',offreSchema);


