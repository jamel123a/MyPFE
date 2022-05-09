 import React, { useEffect } from 'react'; 
 import './App.css'
 // component
import Home from './page/Home';

import Offre from './components/offre/Offre'
import LoginEntreprise from './components/auth/entreprise/login/LoginEntreprise'
import RegisterEntreprise from './components/auth/entreprise/register/RegisterEntreprise'

import {Routes,Route}from 'react-router-dom'
import NotFound from './page/NotFound';
import Noaccess from './page/Noaccess';
import ForgetPassword from './components/auth/forgetPassword/ForgetPassword';
import DashbordUser from './components/auth/user/DashbordUser';
import CondidatRouter from './components/router/condidatRouter';
import Navbar1 from './components/navbar/Navbar1';
import LoginUser from './components/auth/user/login/LoginUser';
import RegisterUser from './components/auth/user/register/RegisterUser';
import ProfileEntre from './components/auth/entreprise/Profile/ProfileEntre';
import store from './components/redux/store';
import { setUser } from './components/redux/action/Auth';
import jwt_decode from 'jwt-decode'
import { useSelector } from 'react-redux';
import Activation from './components/auth/entreprise/Activation';
import EntrepriseRouter from './components/router/entrepriseRouter';
import AdminRouter from './components/router/adminRouter';
import Users from './components/admin_condidat/Users';
import UppdateCondidat from './components/admin_condidat/UpdateCondidat';
import AddCondidat from './components/admin_condidat/AddCondidat';
import OneOffre from './components/offre/OneOffre';
import Profile from './components/auth/user/Profile/Profile';
import { setAuth } from './components/util/setAuth';
import ResetPassword from './components/auth/forgetPassword/ResetPassword';
import Sidebar from './components/sidebar/Sidebar';
import DashbordHome from './page/DashbordHome';
import Entreprise from './components/admin_entreprise/Entreprise';
import AddEntreprise from './components/admin_entreprise/AddEntreprise';
import UpdateEntreprise from './components/admin_entreprise/UpdateEntreprise';
import Footer from './components/Footer/Footer';



if(window.localStorage.jwt){
  const decode =jwt_decode(localStorage.jwt)
  store.dispatch(setUser(decode))
   setAuth(window.localStorage.jwt)
}

function App() {
   const auth =useSelector(state=>state.auth)
   
const user ={
    isConnected :auth.isConnected,
    role : auth.user.role
    
  }
  return (
     <div className='App'>  

     <Navbar1 user={user}></Navbar1>
     <Routes>
     

      <Route  path='*' exact element={<NotFound/>}></Route>
      <Route  path='/noaccsss' exact element={<Noaccess/>}></Route>
       <Route  path='/' exact element={<Home/>}></Route>


       <Route  path='/forgetpassword' exact element={<ForgetPassword/>}></Route>
       <Route path='/resetpassword/:token' exact element={<ResetPassword/>}></Route>
       <Route path= '/user/activate/:token' exact element={<Activation/>}> </Route>


       <Route  path="/offre/page/:pageNumber" element={<Offre/>}></Route>
       <Route  path="/offre"   element={<Offre/>}></Route>
       <Route  path="/offre/details/:token"   element={<OneOffre/>}></Route>
    
       <Route path='/condidat/signin'exact element={<LoginUser/>}></Route>
       <Route path='/condidat/signup'exact element={<RegisterUser/>}></Route>
       
       <Route path='/condidat/Profile' element={
       <CondidatRouter user={user}>
       <Profile/>
       </CondidatRouter>
       }></Route>
       {/* admin router*/ }
      <Route path='/admin/addCondidat' element={
      <AdminRouter user ={user}>
              <AddCondidat/>
          </AdminRouter>
      } ></Route> 
        <Route path='/admin/DetailsCondidat/:id' element={
      <AdminRouter user ={user}>
              <UppdateCondidat/>
          </AdminRouter>
      } ></Route>  
    <Route path='/admin/condidats' exact element={
         <AdminRouter user={user}>
           <Users/>
         </AdminRouter>
       }></Route>  
        <Route path='/admin/entreprises' exact element={
         <AdminRouter user={user}>
           <Entreprise/>
         </AdminRouter>
       }></Route>   
        <Route path='/admin/addEntreprise' exact element={
         <AdminRouter user={user}>
           <AddEntreprise/>
         </AdminRouter>
       }></Route> 
        <Route path='/admin/DetailsEntreprise/:id' element={
      <AdminRouter user ={user}>
              <UpdateEntreprise/>
          </AdminRouter>
      } ></Route>    

       <Route path='/entreprise/signin'exact element={<LoginEntreprise/>}></Route>
       <Route path='/entreprise/signup' exact element={<RegisterEntreprise/>}></Route>
       <Route path='/entreprise/dashbord'exact element={
         <EntrepriseRouter user={user}>
           <ProfileEntre/>
         </EntrepriseRouter>
       }></Route>
    
     </Routes>
     <Footer/>
     </div>
   

  );
};

export default App;
