import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
//import { showErrMsg, showSuccesMsg } from '../../../util/notification/Notification'
import '../../style.css'
//import {dispatchLoginCondidat} from '../../../redux/action/AuthEntreprise'
 import { useDispatch,useSelector } from 'react-redux'
import Input from '../../Input'
import { Login } from '../../../redux/action/Auth'



function LoginUser() {
  
  const [form,setForm]=useState({})
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
  
    dispatch(Login(form,navigate))
    
  }
     


  return (
   
    <>
    <div className="container shadow my-5">
      <div className="row">
        <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
          <h1 className="display-4 fw-bolder ">Content de te revoir</h1>
          <p className="lead text-center">Entrez vos identifiants pour vous connecter</p>
          <h5 className="mb-4">ou</h5>
          <Link
            to="/condidat/signup"
            className="btn btn-outline-light rounded-pill pb-2 w-50"
          >
            S'inscrire
          </Link>
          <h5 className="mb-4">ou</h5>
            <Link
              to="/entreprise/signin"
              className="btn btn-outline-light rounded-pill pb-2 w-50 mb-4"
            >
              espase entreprise
            </Link>
          
        </div>
        <div className="col-md-6 p-5">
          <h1 className="display-6 fw-bolder mb-5">Connexion</h1>
         
       
          <form onSubmit={onSubmit}>
           
          <Input name="email" label="Adresse e-mail *" type="email" onChangeHanlder={onChangeHanlder} errors={errors.email} />
          <Input name="password" label="mot de passe*" type="password" onChangeHanlder={onChangeHanlder} errors={errors.password} />
  
           
            <div className="mb-3 ">
               
               <Link style={{ textDecoration: 'none' }} to="/forgetpassword" className="form-check-label" htmlFor="exampleCheck1">
               mot de passe oublié
               </Link>
             </div>
            <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
            Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default LoginUser;