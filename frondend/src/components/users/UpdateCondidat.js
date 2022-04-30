import React, { useEffect, useState } from 'react'
import InputGroup from './InputGroup'

  import "./user.css";
  import Card from '@mui/material/Card';
  import CardActions from '@mui/material/CardActions';
  import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useParams } from 'react-router';

function UpdateCondidat() {

   const {id} =useParams("");
   const [errors,setErrors]=useState({});
  const [users,setUser]=useState({})
  const [form,setForm]=useState({})

   useEffect(async()=>{
    await axios.get(`http://localhost:6600/api/dashbord/condidat/${id}`)
    .then(res=>{
        setUser(res.data)
    })
})
const onChangeHandler=(e)=>{
  setForm({
    ...form,
    [e.target.name]:e.target.value
  })
 }
const onSubmitHandler =(e)=>{
  e.preventDefault()
  axios.put(`http://localhost:6600/api/dashbord/updateCondidat/${id}`,form)
  .then(res=>{
    console.log(res) 
  })
  .catch(err=>setErrors(err.response.data))
}   
  return (
   
<div class="container mt-3">
  <div class="row">
    <div class="col-sm border margin-botton">
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
        <div className='col-lg-6 col-md-6 col-12'>
          <h4>Suite</h4>
          <img  src={users.avatar} style={{width:50}} alt="profile"/>
          <p className='mt-3'>Prenom : <span>{users.firstName} </span></p>
          <p className='mt-3'>Nom : <span> {users.lastName} </span></p>
          <p className='mt-3'>Adresse e-mail : <span> {users.email}</span></p>
          <p className='mt-3'>Role : <span> {users.role}</span></p>
        </div>
        </CardContent>
       
      </Card>
    </div>
    <div class="col-sm border col-12 ">
    <form onSubmit={onSubmitHandler}>
           <InputGroup label="avatar :" type="file" name="file" onChangeHandler={onChangeHandler} />
           <InputGroup label="Prenom :" type="text" name="firstName" onChangeHandler={onChangeHandler} placeholder=" Enter Prenom" />
           <InputGroup label="Nom :" type="text" name="lastName" onChangeHandler={onChangeHandler} placeholder="Entrer nom"  />
           <InputGroup label="Adresse e-mail :" type="email" name="email" onChangeHandler={onChangeHandler} placeholder="Entrer Adresse e-mail"  />
           <InputGroup label="Role :" type="text" name="role" onChangeHandler={onChangeHandler} placeholder=" Entrer Role" />
          
            <button type="submit" className="btn btn-primary mt-3">Change</button>
    </form>
    </div>
  
    </div>
   </div>
  )
}

export default UpdateCondidat;