import React from 'react'
import '../navbar/Style.css'
import img from '../../assest/Finance.png'
import {Link} from 'react-router-dom'

function Header (){
    return(
         <>
   
          <div className='intro'>
              <div className='i-left'>
                  <div className='i-name'>
                      <span>bienvenu  à </span>
                      <span> stageny </span>
                      <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                          Iure fugiat laborum magni molestias cupiditate suscipit dolor dolorem porro itaque commodi doloremque, modi, consectetur molestiae, 
                          quia praesentium aperiam? Vitae, molestias odit.</span>
                  </div>
                   <Link to='/' className='cv-btn i-button'>more </Link>
              </div>
              <div className='i-right'>
                  <img src={img} alt="" />
              </div>
              </div>             
             
        </>
       
    )
}
export default Header;