import {USER_LOGIN,ERRORS ,ACTIONS}from "./Index";

import axios from 'axios'
import jwt_decode from 'jwt-decode'
export const dispatchLoginEntreprise =()=>{
    return{
      type :ACTIONS.ENTREPRISE_LOGIN
    }
}

export const Login =(form,navigate)=>dispatch=>{
  axios.post('http://localhost:6600/api/condidat/signin',form)
  .then(res=>{
    const {token} =res.data
    localStorage.setItem('jwt',token)
    const decode =jwt_decode(token)
    dispatch(setUser(decode))
    navigate('/condidat/dashbord')
  })
  .catch(err=>{
    
      dispatch({
        type :ERRORS,
        payload : err.response.data
      })
  }) 
}
export const Registration =(form,navigate)=>dispatch=>{
    axios.post('http://localhost:6600/api/condidat/signup',form)
    .then(res=>{
       navigate('/condidat/signin')
       dispatch({
         type:ERRORS,
         payload :{}
       })
    })
    .catch(err=>{
        dispatch({
          type :ERRORS,
          payload : err.response.data
        })
    }) 
}

export const RegistrationEntreprise =(form,success)=>dispatch=>{
   axios.post('http://localhost:6600/api/entreprise/signup',form)

  .then(res=>{
    
     dispatch({
       type:ERRORS,
       payload :{}
     })
     success =res.data.message
     console.log(success)
     
  })
  .catch(err=>{
      dispatch({
        type :ERRORS,
        payload : err.response.data
      })
  }) 
}
export const LoginEntreprise1 =(form,navigate)=>dispatch=>{
  axios.post('http://localhost:6600/api/entreprise/signin',form)
  .then(res=>{
    const {token} =res.data
    localStorage.setItem('jwt',token)
    const decode =jwt_decode(token)
    dispatch(setUser(decode))
   navigate('/entreprise/dashbord')
  })
  .catch(err=>{
    
      dispatch({
        type :ERRORS,
        payload : err.response.data
      })
  }) 
}
export const Logout =()=>dispatch=>{
  localStorage.removeItem('jwt')
  dispatch({
    type :USER_LOGIN,
    payload:{}
  })
  
}
export const setUser =(decode)=>({
  type :USER_LOGIN,
  payload :decode
})