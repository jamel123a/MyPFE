import axios from 'axios'
import React, { useState } from 'react'
import Alert from './Alert';
import InputGroup from './InputGroup'
function AddCondidat() {
      const [form,setForm]=useState({})
      const [errors,setErrors]=useState({});
      const [message,setMessage]=useState("")
      const [show,setShow]=useState(false)
     const onChangeHandler=(e)=>{
        setForm({
          ...form,
          [e.target.name]:e.target.value
        })
      }

 const onSubmitHandler =(e)=>{
    e.preventDefault()
    axios.post('http://localhost:6600/api/admin/adduser',form)
    .then(res=>{
     setMessage(res.data.message)
     setShow(true)
     setTimeout(()=>{
      setShow(false)
     },4000)
    })
    .catch(err=>setErrors(err.response.data))
 }   

  return (
    <div className='container mt-3 col-12 col-lg-4'>
        <Alert message={message} show={show}/>
        
        <h1 style={{fontWeigth :400}}> ajouter un condidat</h1>

        <form onSubmit={onSubmitHandler}>
           <InputGroup label="Prenom *" type="text" name="firstName" onChangeHandler={onChangeHandler} placeholder=" Enter Prenom" errors={errors.firstName}/>
           <InputGroup label="Nom *" type="text" name="lastName" onChangeHandler={onChangeHandler} placeholder="Entrer nom"  errors={errors.lastName}/>
           <InputGroup label="Adresse e-mail *" type="email" name="email" onChangeHandler={onChangeHandler} placeholder="Entrer Adresse e-mail"  errors={errors.email}/>
           <InputGroup label="Mot de Passe *" type="password" name="password" onChangeHandler={onChangeHandler} placeholder=" Entrer mode de pass" errors={errors.password}/>
          
            <button type="submit" className="btn btn-primary mt-3">Ajouter</button>
    </form>
   
    </div>
  )
}

export default AddCondidat