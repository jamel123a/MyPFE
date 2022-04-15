import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccesMsg } from '../../../util/notification/Notification'
import '../../style.css'
import {dispatchLoginCondidat} from '../../../redux/action/AuthEntreprise'
 import { useDispatch } from 'react-redux'

const intialState ={
    email :'',
    password :'',
    error :'',
    success:''
}

function Login() {
  
    const [user,setUser]=useState(intialState)
    const {email,password,error,success}=user
    const dispatch =useDispatch()
  const history = useNavigate()
     const handleChangeInput =e=>{
       const {name,value}=e.target
       setUser({...user,[name]:value,error:'',success:''})
     }
     const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const res =await axios.post('http://localhost:6600/api/condidat/signin',{email,password})
      
    setUser({...user,error:'',success:res.data.message})
    console.log(setUser)
      localStorage.setItem('firstllLogin',true)
      dispatch(dispatchLoginCondidat())  
    history('/condidat/profile')
        

      }catch(error){
       // console.log(error.response && error.response.data.message
       //     ? error.response.data.message
     //       : error.message)
    error.response.data.message &&
       setUser({...user,error:error.response.data.message,success :''})
        }

     }
     
/*const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

    const handleSubmit =async (e)=>{
        e.preventDefault()
        try {
         
           
    
            await axios.post('http://localhost:6600/api/condidat/signin', {                       
        email,
        password
        }).then(data => {
                        console.log(data) 
                        })  
        }catch(error){
            console.log(error.response && error.response.data.message
                ? error.response.data.message
                : error.message)
        }
    
    } */

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
          <h1 className="display-6 fw-bolder mb-5">connexion</h1>
          {error && showErrMsg(error)}
          {success && showSuccesMsg(success)}
       
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
              Adresse e-mail
              </label>
              <input  type="email"  className="form-control"  id="exampleInputEmail1"  aria-describedby="emailHelp" name="email" value={email} onChange={handleChangeInput}  />
             
              <div id="emailHelp" className="form-text"> Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.
             </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">  Mot de passe * </label>
              <input
                type="password" className="form-control" id="exampleInputPassword1"   name="password"   value={password} onChange={handleChangeInput}  />
            </div>
            <div className="mb-3 ">
               
               <Link style={{ textDecoration: 'none' }} to="/forgetpassword" className="form-check-label" htmlFor="exampleCheck1">
               mot de passe oublié
               </Link>
             </div>
            <button type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login;