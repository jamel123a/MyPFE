import React, { useEffect, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import RowDetails from './RowDetails';
import Alert from '../admin_condidat/Alert';

function Entreprise() {
    const [users,setUser]=useState([])
    const [message,setMessage]=useState("")
    const [show,setShow]=useState(false)

    useEffect(async()=>{
          await axios.get('http://localhost:6600/api/dashbord/allentreprise')
          .then(res=>{
              setUser(res.data)
          })
    },[])
  

  
    //delete Condidat
    const OnDelete=(id__)=>{
          axios.delete(`http://localhost:6600/api/user/delete/${id__}`)
          .then(res=>{
            setMessage(res.data.message)
            setShow(true)
            setTimeout(()=>{
             setShow(false)
            },4000)
          })
       }
  return (
    <div >
        <div className='py-4'>
            <div className='container'>
            <Alert message={message} show={show}/>
            <div class="row">

                <div class="col">

                <div className=' mt-3 d-flex flex-column '>
                <p className='btn btn-primary'>liste des entreprises</p>
                </div>
                </div>
                <div class="col">

                <div className=' mt-3 d-flex flex-column '>
                <p className='btn btn-primary'><Link style={{ textDecoration: 'none',color :'white' }} to='/admin/condidats'>liste de condidat</Link></p>

                </div>
                </div>

                <div class="col">
                <div className='add_btn mt-3'>
                    <button className='btn '><Link style={{ textDecoration: 'none' }} to='/admin/addEntreprise'>Ajouter un entreprise</Link></button>
                </div>
                </div>
                </div>
                <table class="table border shadow">
                    <thead className='thead-dark'>
                        <tr className='table-dark'>
                        <th scope="col">Nom de entreprise</th>
                        <th scope="col">avatar</th>
                        <th scope="col">nom </th>
                        <th scope="col">prenom</th>
                        <th scope="col">email</th>
                        <th scope="col"></th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({firstName,lastName,email,nomEntreprise,avatar,_id})=>(
                                <RowDetails
                                nomEntreprise={nomEntreprise}
                                 email={email}
                                 firstName={firstName} 
                                lastName={lastName} 
                                avatar={avatar}
                                Id={_id}
                               OnDelete={OnDelete}
                                />  
                            ))
                        }  
                    </tbody>
                    </table>    
            </div>
        </div>
    </div>  
  )
}

export default Entreprise