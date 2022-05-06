import React, { useState } from 'react'
import '../../style.css'
import {Link,useNavigate} from 'react-router-dom'
import Input from '../../Input'
import { useDispatch, useSelector } from 'react-redux'
import { RegistrationEntreprise } from '../../../redux/action/Auth'
import { showSuccesMsg } from '../../../util/notification/Notification'

/*const intialState ={
  success :''
}*/
function RegisterEntreprise() {
  const [success,setSuccess] =useState();
  const [form,setForm]=useState({})
//   const success =useState(intialState)
  const dispatch =useDispatch()
  const navigate =useNavigate()
  const errors =useSelector(state=>state.errors)
  const onChangeHanlder  =(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const onSubmit=(e)=>{
    e.preventDefault()
    dispatch(RegistrationEntreprise(form))
   
  }

  return (
   <>
     
   <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Bonjour</h1>
            <p className="lead text-center">Entrez vos coordonnées pour vous inscrire</p>
            <h5 className="mb-4">ou</h5>
            <Link
              to="/entreprise/signin"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Connexion
            </Link>
            <h5 className="mb-4">ou</h5>
            <Link
              to="/condidat/signup"
              className="btn btn-outline-light rounded-pill pb-2 w-50 "
            >
              espase condidat
            </Link>
            
          </div>
          <div className="col-md-6 p-5">
          {success && showSuccesMsg(success)}
          
            <form  onSubmit={onSubmit}>
           
              <Input name="firstName" label="prénom *" type="text" onChangeHanlder={onChangeHanlder} errors={errors.firstName} />
              <Input name="lastName" label=" Nom de famille *" type="text" onChangeHanlder={onChangeHanlder} errors={errors.lastName} />
              <Input name="email" label=" Adresse e-mail *" type="email" onChangeHanlder={onChangeHanlder} errors={errors.email} />  
                        
              <div id="emailHelp" className="form-text">   Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre. </div>
              <Input name="password" label=" Mot de passe *" type="password" onChangeHanlder={onChangeHanlder} errors={errors.password} /> 
            
              <Input name="nomEntreprise" label=" Nom de Entreprise" type="text" onChangeHanlder={onChangeHanlder} errors={errors.nomEntreprise} /> 
             
              <Input name="address" label="address *" type="text" onChangeHanlder={onChangeHanlder}  errors={errors.address} /> 
             
              <Input name="numberPhone" label="Telephone " type="text" onChangeHanlder={onChangeHanlder}  /> 
             
              <Input name="website" label="site web " type="text" onChangeHanlder={onChangeHanlder}  /> 
              
             
                
      

              <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
              S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
   </>
  )
}

export default RegisterEntreprise