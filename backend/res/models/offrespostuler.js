const mongoose=require ('mongoose');
const offrePostulerSchema =new mongoose.Schema({
    condidat: {type : mongoose.Schema.Types.ObjectId,ref :'Condidat',required :true},
    offreItemps :[
        {
            offre :{ type :mongoose.Schema.Types.ObjectId,ref :'Offre',required :true},
           
            //date :{type: Date},
          //  nomEntreprise:{type :mongoose.Schema.Types.ObjectId,ref :'entreprise'}
        }
    ]

},{timestamps :true})
module.exports =mongoose.model('OffresPostuler',offrePostulerSchema)