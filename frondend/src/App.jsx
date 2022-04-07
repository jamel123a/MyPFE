 import React from 'react'; 
 import './App.css'
 import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
 import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
 // component
import Home from './components/page/page';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer'
import Register from './components/register/Register';
import {Routes,Route}from 'react-router-dom'
function App() { 
  return (
     <div className='App'>
     <Routes>
       <Route path='/' element={  <Home/>}></Route>
       <Route path='/condidat/signup' element={<Register/>}></Route>
     </Routes>
     </div>
   

  );
};

export default App;
