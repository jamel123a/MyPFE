const mongoose=require ('mongoose');
const offrePostulerSchema =new mongoose.Schema({
    user: {type : mongoose.Schema.Types.ObjectId,ref :'condidat',required :true},
    offresPostuler :[
        {
            offre :{ type :mongoose.Schema.Types.ObjectId,ref :'offre',require :true},
            nomoffre :{type:String },
            date :{type: Date},
            nomEntreprise:{type :mongoose.Schema.Types.ObjectId,ref :'entreprise'}
        }
    ]

},{timestamps :true})
module.exports =mongoose.model('OffresPostuler',offrePostulerSchema)