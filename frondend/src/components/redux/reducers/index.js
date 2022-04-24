import {combineReducers } from 'redux'
import authReducer from './AuthReducersEn'
import errorReducer from './errorReducer'
export default combineReducers({
    auth :authReducer,
    errors :errorReducer
   
})