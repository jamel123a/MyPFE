import React from 'react'
import { Navigate } from 'react-router'

const PrivateRouter =({user,children})=> {
  if(!user.isConnected ){
      return <Navigate to ="/"  replace />
  }
  return  children
}

export default PrivateRouter;