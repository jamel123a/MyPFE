import React,{useState} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import '../../style.css'
import { showErrMsg, showSuccesMsg } from '../../../util/notification/Notification'
import {dispatchLoginEntreprise} from '../../../redux/action/Auth'
 import { useDispatch, useSelector } from 'react-redux'
import Input from '../../Input'
import { LoginEntreprise1 } from '../../../redux/action/Auth'

/*const intialState ={
  email :'',
  password :'',
  error :'',
  success:''
}*/

function LoginEntreprise() {


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
  
   dispatch(LoginEntreprise1(form,navigate))
    
  }
 /* const [user,setUser]=useState(intialState)
  const dispatch =useDispatch()
  const history = useNavigate()
  const {email,password,error,success}=user
   const handleChangeInput =e=>{
     const {name,value}=e.target
     setUser({...user,[name]:value,error:'',success:''})
   }
   
   const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
        const res =await axios.post('http://localhost:6600/api/entreprise/signin',{email,password})
    
  setUser({...user,error:'',success:res.data.message})
 
     
    localStorage.setItem('firstllLogin',true)
    dispatch(dispatchLoginEntreprise())  
    history('/entreprise/dashbord')
   
    }catch(error){
     // console.log(error.response && error.response.data.message
     //     ? error.response.data.message
   //       : error.message)
  error.response.data.message &&
     setUser({...user,error:error.response.data.message,success :''})
      }

   }*/


  return (
    <>
    <div className="container shadow my-5">
      <div className="row">
        <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
          <h1 className="display-4 fw-bolder ">Content de te revoir</h1>
          <p className="lead text-center">Entrez vos identifiants pour vous connecter</p>
          <h5 className="mb-4">ou</h5>
          <Link
            to="/entreprise/signup"
            className="btn btn-outline-light rounded-pill pb-2 w-50"
          >
            S'inscrire
          </Link>
          <h5 className="mb-4">ou</h5>
            <Link
              to="/condidat/signin"
              className="btn btn-outline-light rounded-pill pb-2 w-50 mb-4"
            >
              espace condidat
            </Link>
          
        </div>
        <div className="col-md-6 p-5">
          <h1 className="display-6 fw-bolder mb-5">Connexion</h1>
         
          <form onSubmit={onSubmit}>
          <Input name="email" label="Adresse e-mail *" type="email" onChangeHanlder={onChangeHanlder} errors={errors.email} />
          <div id="emailHelp" className="form-text"> Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.
             </div>
          
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

export default LoginEntreprise