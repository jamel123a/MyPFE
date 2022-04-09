 import React from 'react'; 
 import './App.css'
 import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
 //import   './bootstrap/dist/js/bootstrap.bundle'
 // component
import Home from './components/page/Home';
import Login from './components/auth/login/Login.js';
import {Routes,Route}from 'react-router-dom'
function App() { 
  return (
     <div className='App'>
     <Routes>
       <Route  path='/' exact element={<Home/>}></Route>
       <Route path='/condidat/signin' element={<Login/>}></Route>
     </Routes>
     </div>
   

  );
};

export default App;
