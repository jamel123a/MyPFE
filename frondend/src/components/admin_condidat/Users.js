import React, { useEffect, useState } from 'react'
import "./datatable.scss";
import {Link, NavLink} from 'react-router-dom'
import axios from 'axios';
import RowDetails from './RowDetails';
import Alert from './Alert';

function Users() {
    const [users,setUser]=useState([])
    const [message,setMessage]=useState("")
    const [show,setShow]=useState(false)

    useEffect(async()=>{
          await axios.get('http://localhost:6600/api/dashbord/allcondidat')
          .then(res=>{
              setUser(res.data)
              console.log(res.data)
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
                    <input className='form-control' type="searsh"   placeholder='Search' name="searchTeam" ></input>   
                        <div class="col">
                    
                        <div className=' mt-3'>
                           <p className='btn btn-primary'>liste des condidats</p>
                        </div>
                        </div>
                        <div class="col">
                          <div className='add_btn mt-3'>
                            <button className='btn '><Link style={{ textDecoration: 'none' }} to='/admin/addCondidat'>Ajouter un condidat</Link></button>
                           </div>
                        </div>
                    </div>
                <table class="table border shadow">
                    <thead className='thead-dark'>
                        <tr className='table-dark'>
                        <th scope="col">id</th>
                        <th scope="col">avatar</th>
                        <th scope="col">nom </th>
                        <th scope="col">prenom</th>
                        <th scope="col">email</th>
                        <th scope="col"></th>
                       
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(({firstName,lastName,email,avatar,_id})=>(
                                <RowDetails email={email}
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

export default Users