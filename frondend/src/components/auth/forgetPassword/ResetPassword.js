import React, { useState } from 'react'
import { showErrMsg, showSuccesMsg } from '../../util/notification/Notification'
import {useParams}from 'react-router-dom'
import { isLength, isMatch } from '../../util/Validation'
import password1 from '../../../assest/Password1.png'
import axios from 'axios'
const initailState ={
    password :'',
    cf_password:'',
    err :'',
    success :''
  }

function ResetPassword() {
    const [data,setDate]=useState(initailState)
    const {token} =useParams()
    const {password,cf_password,err,success}=data

    const handleChandeInput=e=>{
        const {name,value}=e.target
        setDate({...data,[name]:value,err :'',success:''})
     }
    const resetPassword = async () =>{
        if(isLength(password))
        return setDate ( {...data,err:"Le mot de passe doit être au moins de 6 caractères",success:''})
    
    if(!isMatch(password,cf_password))
         return setDate ( {...data,err:"Password did not match ",success:''})
    try{    
   
        const res = await axios.post('http://localhost:6600/api/resetpassword',{password},
        {   headers :{Authorization :"Bearer "+token}
  
    })
       
        return setDate({...data,err:'',success:res.data.msg})
   
    }catch(err){
        err.response.data.msg && setDate({...data,err:err.response.data.msg,success:''})
      } 
    }
  return (
  
  
  <div className="container shadow my-5">
    <div className="row">
      <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center"> 
       <img src={password1} style={{width :'100%'}}></img>  
      </div>
      <div className="col-md-6 p-5">
        <h1 className="display-6 fw-bolder mb-5">Reset  Password</h1>
         {err && showErrMsg(err)}
         {success && showSuccesMsg (success)}
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
           New Password :
            </label>
            <input  type="password"  className="form-control"  name="password" 
               onChange={handleChandeInput} value={password} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
            Confirm Password :
            </label>
            <input  type="password"  className="form-control"  name="cf_password" 
              onChange={handleChandeInput} value={cf_password}
               />
          </div>
         
        
          
        </form>
        <button onClick={resetPassword} className="btn btn-primary w-100 mt-4 rounded-pill">
            ENVOIYER  
          </button>
      </div>
    </div>
  </div>

  )
}

export default ResetPassword