import {USER_LOGIN }from "../action/Index";
import isEmpty from './isEmpty'
const initialState={
    user :{},
    isConnected :false,
    
}
const authReducer = (state =initialState,action)=>{
    switch(action.type){
       
        case USER_LOGIN:  
            return{
                ...state,
                isConnected :true,   
                user:action.payload
               
            }
            default :
            return state

    }
}
export default authReducer ;