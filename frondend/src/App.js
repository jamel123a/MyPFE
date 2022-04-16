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
import LoginAdmin from './components/auth/admin/LoginAdmin';
import Navbar1 from './components/navbar/navbar2/Navbar1';
import LoginUser from './components/auth/user/login/LoginUser';
import RegisterUser from './components/auth/user/register/RegisterUser';
import Footer from './components/footer/Footer';
import DashbordEntreprise from './components/auth/entreprise/dashbord/DashbordEntre';
function App() { 
  /*const user ={
    isConnected :true
  }*/
  return (
     <div className='App'>
       <Navbar1/>
     <Routes>
     
     <Route  path='*' exact element={<NotFound/>}></Route>
     <Route  path='/noaccsss' exact element={<Noaccess/>}></Route>

       <Route  path='/' exact element={<Home/>}></Route>
       <Route  path='/forgetpassword' exact element={<ForgetPassword/>}></Route>
    
       <Route path='/condidat/signin' element={<LoginUser/>}></Route>
       <Route path='/condidat/signup' element={<RegisterUser/>}></Route>
       <Route path='/condidat/dashbord' element={ <DashbordUser/>}> </Route>
      
       <Route path='/admin/signin' element={<LoginAdmin/>}></Route> 
       <Route path='/entreprise/signin' element={<LoginEntreprise/>}></Route>
       <Route path='/entreprise/signup' element={<RegisterEntreprise/>}></Route>
       <Route path='/entreprise/dashbord' element={<DashbordEntreprise/>}></Route>

       <Route path="/offre/:pageNumber"  component={Offre}></Route>
       <Route path="/offre" component={Offre}></Route>


      
      
     </Routes>
     </div>
   

  );
};

export default App;
