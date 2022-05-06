import axios from 'axios'
import React, { useState } from 'react'
import Alert from '../admin_condidat/Alert';
import InputGroup from '../admin_condidat/InputGroup'
import TextErea from './TextErea';
function AddEntreprise() {
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
    axios.post('http://localhost:6600/api/admin/addentreprise',form)
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
    <div className='container mt-3 col-12 mb-3 col-lg-4'>
        <Alert message={message} show={show}/>
        
        <h1 style={{fontWeigth :400}}> ajouter un Entreprise</h1>

        <form className='mb-3' onSubmit={onSubmitHandler}>
           <InputGroup label="Prenom *" type="text" name="firstName" onChangeHandler={onChangeHandler} placeholder=" Enter Prenom" errors={errors.firstName}/>
           <InputGroup label="Nom *" type="text" name="lastName" onChangeHandler={onChangeHandler} placeholder="Entrer nom"  errors={errors.lastName}/>
           <InputGroup label="Adresse e-mail *" type="email" name="email" onChangeHandler={onChangeHandler} placeholder="Entrer Adresse e-mail"  errors={errors.email}/>
           <InputGroup label="Nom de entreprise *" type="text" name="nomEntreprise" onChangeHandler={onChangeHandler} placeholder=" Entrer nom de entreise" errors={errors.nomEntreprise}/>
           <InputGroup label="Address *" type="text" name="address" onChangeHandler={onChangeHandler} placeholder=" Entrer mode adresss" errors={errors.address}/>
           <InputGroup label="Telephone : " type="number" name="numberPhone" onChangeHandler={onChangeHandler} placeholder=" Entrer numero de telephone"/>
           <InputGroup label="Website : " type="text" name="website" onChangeHandler={onChangeHandler} placeholder=" Entrer Website" />
           <TextErea label="Description :" rows="4" name="description" onChangeHandler={onChangeHandler} placeholder="Enter description"></TextErea>
           <InputGroup label="Mot de Passe *" type="password" name="password" onChangeHandler={onChangeHandler} placeholder=" Entrer mode de pass" errors={errors.password}/>


          
            <button type="submit" className="btn btn-primary mt-3 mb-3">Ajouter</button>
    </form>
   
    </div>
  )
}

export default AddEntreprise