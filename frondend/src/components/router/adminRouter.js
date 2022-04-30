import React from 'react'
import { Navigate } from 'react-router'

const AdminRouter =({user,children})=> {
  console.log(user.role)
  if(!user.isConnected ){
      return <Navigate to ="/"  replace />
  }else{
    if(user.role !== "admin"){
      return <Navigate to="/noaccsss" replace/>
    }
  }
  return  children
}

export default AdminRouter;