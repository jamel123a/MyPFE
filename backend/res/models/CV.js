const mongoose=require ('mongoose');

const CV =new mongoose.Schema({
    condidat: {type : mongoose.Schema.Types.ObjectId,ref :'Condidat',required :true},
    cv : [
        {
            filecv :{ type : String }
        }
    ]
  
})

module.exports =mongoose.model('CV',CV)