const express=require('express');
const env=require('dotenv').config();
const app=express();
const mongoose=require('mongoose');
const path =require('path')
const cors =require('cors')
const cookieParser =require('cookie-parser')
const fileUploed =require('express-fileupload')

//router
const adminRoutes =require('./routes/admin/auth');
const catogoryRoutes =require('./routes/category');
//condidat
const userRoutes =require('./routes/condidat/auth');
const userOffres =require('./routes/condidat/offrepustuler');
const userImage =require('./routes/upload')
const cv =require('./routes/condidat/cv')
//entreprise
const entrepriseRoutes =require('./routes/entreprise/auth');
const offreRoutes =require('./routes/offre');
//commun 
const forgetpassword =require('./routes/forgetpassword');
//const AccessToken =require('./routes/acccestoken')
//const loginOut =require('./routes/loginOut')


///mongodb connection 

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_BD_USER}:${process.env.MONGO_BD_PASSWOED}@cluster0.k1x8l.mongodb.net/${process.env.MONGO_BD_DATABASE}?retryWrites=true&w=majority`,      
  
).then(()=>{console.log('database connect')
});



app.use(express.json());
app.use(cors({origin: 'http://localhost:3000'})),
app.use(cookieParser())
app.use(fileUploed({
    useTempFiles:true
}))
//app.use('/public',express.static(path.join(__dirname,'tmp')));

//admin
app.use('/api',adminRoutes);
app.use('/api',catogoryRoutes);
//condidat
app.use('/api',userRoutes);
app.use('/api',userOffres);
app.use('/api',cv)
app.use('/api',entrepriseRoutes);
app.use('/api',offreRoutes);
//commun
app.use('/api',forgetpassword);
//app.use('/api',AccessToken)
app.use('/api',userImage)
//app.use('/api',loginOut)





app.listen(process.env.PORT,
    ()=>console.log(`server is runing in || ${process.env.PORT}`));
