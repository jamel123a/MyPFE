import {combineReducers } from 'redux'
import authReducer from './AuthReducersEn'
import errorReducer from './errorReducer'
import profile from './ProfileReducer'


export default combineReducers({
    auth :authReducer,
    errors :errorReducer,
    profile :profile  
})