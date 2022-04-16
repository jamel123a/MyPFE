import React from 'react'
import { Navigate } from 'react-router'

const  ForseRedirect =({user,children})=> {
  if(!user.isConnected ){
      return <Navigate to ="/"  replace />
  } 
  return  children
}

export default ForseRedirect;
//m3a register wlogin 