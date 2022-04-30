import React, { useState } from 'react'
import {showErrMsg, showSuccesMsg} from '../../util/notification/Notification'
import axios from 'axios'
import { isEmail } from '../../util/Validation'
const initailState ={
  email :'',
  err :'',
  success :''

}
function ForgetPassword() {
  
  const [data,setDate]=useState(initailState)
  const {email,err,success}=data

  const handleChandeInput=e=>{
     const {name,value}=e.target
     setDate({...data,[name]:value,err :'',success:''})
  }
  
  const forgetPassword=async()=>{
    if (!isEmail(email)) return setDate({...data,err :'email invalide',success:''})

    try{
      const res =await axios.post('http://localhost:6600/api/forgetpassword',{email})
      console.log(res.data.msg)
      return  setDate({...data,err:'',success:res.data.msg})

    }catch(err){
      err.response.data.msg && setDate({...data,err:err.response.data.msg,success:''})
    } 
  }
  return (
    <div className="container shadow my-5">
      <div className="row">
        <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form"> 
        </div>
        <div className="col-md-6 p-5">
          <h1 className="display-6 fw-bolder mb-5">mode de pass oublier</h1>
           {err && showErrMsg(err)}
           {success && showSuccesMsg (success)}
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
              Adresse e-mail
              </label>
              <input  type="email"  className="form-control"  name="email" 
               placeholder='entrer votre email'  onChange={handleChandeInput} />
            </div>
           
          
            <button   onClick={forgetPassword} className="btn btn-primary w-100 mt-4 rounded-pill">
              ENVOIYER  
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default ForgetPassword