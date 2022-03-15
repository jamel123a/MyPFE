const express=require('express');
const env=require('dotenv');
const app=express();
const mongoose=require('mongoose');

//router
const adminRoutes =require('./routes/admin/auth');
const catogoryRoutes =require('./routes/category');
//condidat
const userRoutes =require('./routes/condidat/auth');
const userOffres =require('./routes/condidat/offrepustuler');
const usercv=require('./routes/condidat/cv')
//entreprise
const entrepriseRoutes =require('./routes/entreprise/auth');
const offreRoutes =require('./routes/offre');






//enviroment vairiable
env.config()

///mongodb connection 

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_BD_USER}:${process.env.MONGO_BD_PASSWOED}@cluster0.k1x8l.mongodb.net/${process.env.MONGO_BD_DATABASE}?retryWrites=true&w=majority`,      
  
).then(()=>{console.log('database connect')
});



app.use(express.json());
//admin
app.use('/api',adminRoutes);
app.use('/api',catogoryRoutes);
//condidat
app.use('/api',userRoutes);
app.use('/api',userOffres);
app.use('/api',usercv)
//entreprise router
app.use('/api',entrepriseRoutes);
app.use('/api',offreRoutes);









app.listen(process.env.PORT,
    ()=>console.log(`server is runing in ${process.env.PORT}`));
