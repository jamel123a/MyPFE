const Condidat =require('../../models/condidat');
const jwt =require ('jsonwebtoken');
exports.getAllCondidatInfo=async(req,res)=>{
    try{
        const condidat= await Condidat.find({role:"condidat"}).select('-hash_password')
        res.json(condidat)
        console.log(condidat);
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}
exports.getAllEntrepreiseInfo=async(req,res)=>{
    try{
        const condidat= await Condidat.find({role:"entreprise"}).select('-hash_password')
        res.json(condidat)
        console.log(condidat);
    }catch(err){
       return res.status(500).json({err :"error"})
    }
}  