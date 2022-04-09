import React from 'react'
import './notification.css'
export const showErrMsg =(message)=>{
    return <div className='errMsg'>{message}</div>
}

export const showSuccesMsg =(message)=>{
    return <div className='succesMsg'>{message}</div>
}
