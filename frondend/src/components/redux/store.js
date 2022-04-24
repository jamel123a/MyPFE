import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers'
import  Middleware from 'redux-thunk' 
import {composeWithDevTools} from 'redux-devtools-extension'
const initialState={}
const store =createStore(rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(Middleware))
)

     



export default store;