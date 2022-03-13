const mongoose=require('mongoose');

const catogorySchema =mongoose.Schema({
    name :{
        type :String,
        require :true,
        trim :true
    },
    slug :{
        type :String,
        require :true,
        unique :true
    }

},{ timestamps :true});

module.exports=mongoose.model('Category',catogorySchema);