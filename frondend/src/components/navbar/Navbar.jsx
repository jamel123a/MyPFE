import '../../App.css'
import React, {  useState } from 'react';
import logo from '../../assest/logo.png'
import './Style.css'
import {Link} from 'react-router-dom'


function Navbar() {
    
    
     const [nav,setnav]=useState(false);
     const changeBackgroud =()=>{
         if (window.scrollY>= 30){
             setnav(true);
         }else{
             setnav(false);
         }
     }
     window.addEventListener('scroll',changeBackgroud)
        return(
            <div className='app'>
            <nav className={nav ?'nav active': 'nav'} >
             <a href="#" className='logo'>
                 <img src={logo}/>
             </a>
             <input type='checkbox' className='menu-btn' id='menu-btn' />
             <label className='menu-icon' for='menu-btn'>
                 <span className='nav-icon'> </span>
             </label>
             <ul className='menu'>
                <li><Link to='/' className='active aaa' >page d'accueil</Link></li>
                <li><Link to='/aaa' className='aaa'>offres</Link></li>
                <li><Link to='/condidat/signup' className='aaa'>espace condidat</Link></li>
                <li><Link  to='/fff' className='aaa' >espace entreprise</Link></li>

             </ul>
            </nav>
            </div>
        )
    }

export default Navbar ;