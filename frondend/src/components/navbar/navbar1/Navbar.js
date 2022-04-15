import React, {  useState } from 'react';
import logo from '../../../assest/logo.png'
import {Link} from 'react-router-dom'
import './Style.css'

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
        
          
          <nav className={nav ?'nav active': 'nav'} >
             <Link to ="/" className='logo'>
                 <img src={logo} alt="logo"/>
             </Link>
             <input type='checkbox' className='menu-btn' id='menu-btn' />
             <label className='menu-icon' htmlFor='menu-btn'>
                 <span className='nav-icon'> </span>
             </label>
             <ul className='menu'>
                <li><Link to='/' className='active aaa' >page d'accueil</Link></li>
                <li><Link to='/offre' className='aaa'>offres</Link></li>
                <li><Link to='/condidat/signin' className='aaa'>espace condidat</Link></li>
                <li><Link  to='/entreprise/signin' className='aaa' >espace entreprise</Link></li>
                <li><Link to='/condidat/dashbord' className='aaa'>dashbord</Link></li>
                <li><Link  to='/entreprise/lougout' className='aaa' >logout</Link></li>
             
                
                

             </ul>
            </nav>
         
            
        )
    }

export default Navbar ;