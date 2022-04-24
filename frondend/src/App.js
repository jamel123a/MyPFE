 import React from 'react'; 
 import './App.css'
 // component
import Home from './components/page/Home';

import Offre from './components/offre/Offre'
import LoginEntreprise from './components/auth/entreprise/login/LoginEntreprise'
import RegisterEntreprise from './components/auth/entreprise/register/RegisterEntreprise'

import {Routes,Route}from 'react-router-dom'
import NotFound from './components/page/NotFound';
import Noaccess from './components/page/Noaccess';
import ForgetPassword from './components/auth/forgetPassword/ForgetPassword';
import DashbordUser from './components/auth/user/DashbordUser';
import CondidatRouter from './components/router/condidatRouter';
import Navbar1 from './components/navbar/Navbar1';
import LoginUser from './components/auth/user/login/LoginUser';
import RegisterUser from './components/auth/user/register/RegisterUser';
import Footer from './components/footer/Footer';
import DashbordEntreprise from './components/auth/entreprise/dashbord/DashbordEntre';
import store from './components/redux/store';
import { setUser } from './components/redux/action/AuthEntreprise';
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux';
import Activation from './components/auth/entreprise/Activation';
import EntrepriseRouter from './components/router/entrepriseRouter';
import AdminRouter from './components/router/adminRouter';
import DashbordAdmin from './components/auth/admin/DashbordAdmin';
if (localStorage.jwt){
  const decode =jwt_decode(localStorage.jwt)
  store.dispatch(setUser(decode))
}

function App() {
   const auth =useSelector(state=>state.auth)
   
const user ={
    isConnected :auth.isConnected,
    role : auth.user.role
    
  }
  return (
     <div className='App'>
       <Navbar1 user={user}/>
     <Routes>
     
      <Route  path='*' exact element={<NotFound/>}></Route>
      <Route  path='/noaccsss' exact element={<Noaccess/>}></Route>

       <Route  path='/' exact element={<Home/>}></Route>
       <Route  path='/forgetpassword' exact element={<ForgetPassword/>}></Route>
    
       <Route path='/condidat/signin'exact element={<LoginUser/>}></Route>
       <Route path='/condidat/signup'exact element={<RegisterUser/>}></Route>
       <Route path='/condidat/dashbord' exact element={
         <CondidatRouter user={user}>
           <DashbordUser/>
         </CondidatRouter>
       }/>
      
       <Route path='/admin/dashbord' exact element={
         <AdminRouter user={user}>
         <DashbordAdmin/>

        
         </AdminRouter>
       }></Route>

       <Route path='/entreprise/signin'exact element={<LoginEntreprise/>}></Route>
       <Route path='/entreprise/signup' exact element={<RegisterEntreprise/>}></Route>
       <Route path='/entreprise/dashbord'exact element={
         <EntrepriseRouter user={user}>
           <DashbordEntreprise/>
         </EntrepriseRouter>
       }></Route>
       <Route path= '/user/activate/:token' exact element={<Activation/>}> </Route>
  
       <Route path="/offre/:pageNumber" exact  component={Offre}></Route>
       <Route path="/offre" exact component={Offre}></Route>
   
     </Routes>
     </div>
   

  );
};

export default App;
