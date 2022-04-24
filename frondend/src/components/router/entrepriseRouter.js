import React from 'react'

import { Navigate } from 'react-router'

const  EntrepriseRouter =({user,children})=> {
  if(!user.isConnected === true){
      return <Navigate to ="/"  replace />
  }  if(user.role !== "entreprise"){
    return <Navigate to="/noaccsss" replace/>
  }
  return  children
}

export default EntrepriseRouter;