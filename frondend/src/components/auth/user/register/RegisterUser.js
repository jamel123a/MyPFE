import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link,useNavigate} from 'react-router-dom'
import { Registration } from '../../../redux/action/Auth';

import Input from '../../Input';
import '../../style.css'

function RegisterUser() { 
  
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
  
    dispatch(Registration(form,navigate))
    
  }
  return (
        <>
            <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">bonjour</h1>
            <p className="lead text-center">Entrez vos coordonnées pour vous inscrire</p>
            <h5 className="mb-4">ou</h5>
            <Link
              to="/condidat/signin"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Connexion
            </Link>
            <h5 className="mb-4">ou</h5>
            <Link
              to="/entreprise/signin"
              className="btn btn-outline-light rounded-pill pb-2 w-50 "
            >
              espace entreprise
            </Link>
            
          </div>
          <div className="col-md-6 p-5">
            <form onSubmit={onSubmit} errors={errors.error}>
            <Input name="firstName" label="prénom *" type="text" onChangeHanlder={onChangeHanlder} errors={errors.firstName} />
            <Input name="lastName" label="nom de famille *" type="text" onChangeHanlder={onChangeHanlder} errors={errors.lastName} />
            <Input name="email" label="Adresse e-mail *" type="email" onChangeHanlder={onChangeHanlder} errors={errors.email} 
            />
            <div id="emailHelp" className="form-text">   Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre. </div>  
             
            {/*
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                Adresse e-mail *
                </label>
                <input
                  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="email"  
                  onChange={onChangeHanlder}
                />
                <div id="emailHelp" className="form-text">   Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre. </div>
              </div>*/ }
               <Input name="password" label=" mode de pass *" type="password" onChangeHanlder={onChangeHanlder} errors={errors.password} />  
              <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
              S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
        </>
    
     
    );
  };
  export default RegisterUser;