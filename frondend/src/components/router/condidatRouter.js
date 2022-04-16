import React from 'react'
import { Navigate } from 'react-router'

const  CondidatRouter =({user,children})=> {
  if(!user.isConnected ){
      return <Navigate to ="/"  replace />
  }  if(user.role !== "condidat"){
    return <Navigate to="/noaccsss" replace/>
  }
  return  children
}

export default CondidatRouter;