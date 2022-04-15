import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import logo from '../../../assest/logo.png'
import './Jamel.css'
function Navbar1() {
  const [isOpen,setIsOpen]=useState(false)
   return (
     <>
     <nav className='Navbar'>
      <span className='nav-logo'><img src={logo} alt='logo'></img></span>
      <div className={`nav-items ${isOpen && "open"}` }>
                <Link to='/'  >Page d'accueil</Link>
                <Link to='/offre' >Offres</Link>
                <Link to='/condidat/signin' >Espace condidat</Link>
                <Link  to='/entreprise/signin'  >Espace entreprise</Link>
                <Link to='/' >Dashbord</Link>
                <Link  to='/'  >Déconection</Link>
             </div>
             <div className={`nav-toogle ${isOpen && "open"}` }
              onClick={()=>setIsOpen(!isOpen)}>
               <div className='bar'></div>
             </div>
     </nav>
     </>
  )
}

export default Navbar1;