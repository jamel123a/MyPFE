const mongoose=require ('mongoose');

const CV =new mongoose.Schema({

    url: 
     { type : String ,required :true },
    
 updateBy: {type : mongoose.Schema.Types.ObjectId,ref :'Condidat',/*required :true*/},
    
    
  
})

module.exports =mongoose.model('CV',CV)