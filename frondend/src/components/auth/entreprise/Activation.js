import React,{ useEffect,useState} from 'react'
import {showErrMsg,showSuccesMsg} from '../../util/notification/Notification'
import axios from 'axios'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import '../style.css'
function Activation() {
    const {token} =useParams()
    const [err,setErr] =useState('')
    const [success,setSuccess]=useState('')
    useEffect(()=>{

        if (token){
            const activationEmail =async()=>{
                try{
                   const res =await axios.post('http://localhost:6600/api/entreprise/activate' ,{token})
                    console.log(res.data.message)
                   setSuccess(res.data.message)

                }catch(err){
                    err.response.data.message&& setErr(err.response.data.message)
                }
            }
            activationEmail()
        }
    },[token])
   

  return (
   <div className='active_page'>
        {err && showErrMsg(err)}
        {success && showSuccesMsg(success)}
      
    
   </div>
  )
}

export default Activation;