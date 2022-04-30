import axios from "axios"
import { ERRORS, SET_PROFILE } from "./Index"

export const GetProfile =()=>dispatch =>{
   axios.get("http://localhost:6600/api/user/info").then(res=>{
       dispatch({
           type :SET_PROFILE,
           payload :res.data
       })
   })
   .catch(err=>{
       dispatch({
           type :ERRORS,
           payload :err.response.data
       })
   })
}