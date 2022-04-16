 import React from 'react'; 
 import './App.css'
 // component
import Home from './components/page/Home';
import Login from './components/page/Login';
import Register from './components/page/Register';
import Offre from './components/offre/Offre'
import LoginEntreprise from './components/auth/entreprise/login/LoginEntreprise'
import RegisterEntreprise from './components/auth/entreprise/register/RegisterEntreprise'

import {Routes,Route}from 'react-router-dom'
import NotFound from './components/page/NotFound';
import Noaccess from './components/page/Noaccess';
import Dashbord from './components/auth/entreprise/dashbord/DashbordEntre';
import ForgetPassword from './components/auth/forgetPassword/ForgetPassword';
import DashbordUser from './components/auth/user/DashbordUser';
import PrivateRouter from './components/router/PrivateRouter';
import DashbordAdmin from './components/auth/admin/DashbordAdmin';
import AdminRouter from './components/router/adminRouter';
function App() { 
  const user ={
    isConnected :false,
    role :'admin'

  }
  return (
     <div className='App'>
     <Routes>

     <Route  path='*' exact element={<NotFound/>}></Route>
     <Route  path='/noaccsss' exact element={<Noaccess/>}></Route>

       <Route  path='/' exact element={<Home/>}></Route>
       <Route  path='/forgetpassword' exact element={<ForgetPassword/>}></Route>
    
       <Route path='/condidat/signin' element={<Login/>}></Route>
       <Route path='/condidat/signup' element={<Register/>}></Route>
      
       <Route path='/condidat/dashbord' element={
         <PrivateRouter user={user}>
           <DashbordUser/>
         </PrivateRouter>
       }>

       </Route>
       <Route path='/admin/dashbord' element={
         <AdminRouter>
           <DashbordAdmin/>
         </AdminRouter>
       }> </Route>
       <Route path='/entreprise/signin' element={<LoginEntreprise/>}></Route>
       <Route path='/entreprise/signup' element={<RegisterEntreprise/>}></Route>
       <Route path='/entreprise/dashbord' element={<Dashbord/>}></Route>
       
       <Route   path="/offre/:pageNumber"  component={Offre}></Route>
       <Route   path="/offre" component={Offre}></Route>
       
     </Routes>
     </div>
   

  );
};

export default App;
