import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import axios from 'axios'
import { showErrMsg, showSuccesMsg } from '../../util/notification/Notification'



const intialState ={
    email :'',
    password :'',
    error :'',
    success:''
}

function Login() {
  
    const [user,setUser]=useState(intialState)
    const {email,password,error,success}=user
     const handleChangeInput =e=>{
       const {name,value}=e.target
       setUser({...user,[name]:value,error:'',success:''})
     }
     const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const res =await axios.post('http://localhost:6600/api/condidat/signin',{
          email,
        password
      })
          console.log(res)

      }catch(error){
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
    
    }*/

  return (
    <div className='login-page'>
        <h2>login</h2>
        {error && showErrMsg(error)}
        {success && showSuccesMsg(success)}


        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor="email">Email Adress</label>
                <input type="text" placeholder="Enter your email" id="email"
                value={email} name="email" onChange={handleChangeInput} /*onChange={(e)=>setEmail(e.target.value)}*/ />
            </div>
            <div>
                <label htmlFor="email">Password</label>
                <input type="password" placeholder="Enter your password" id="password"
                value={password} name="password" onChange={handleChangeInput} /*onChange={(e)=>setPassword(e.target.value) }*//>
            </div>
            <div className="row">
             <button type='submit' className="cv-btn"> login</button> 
            <Link to='/forgetpassword'  >forget password </Link>
            <Link to='/login'  >login </Link>

            </div>
            
        </form>
    </div>
  )
}

export default Login;