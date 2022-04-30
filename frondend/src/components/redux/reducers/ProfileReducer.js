import { SET_PROFILE } from "../action/Index";

const initialState={
  profile :{}
}
export default function (state =initialState,action){
    switch(action.type){
        case  SET_PROFILE:
            return{
                ...state,
                profile:action.payload

            } 
            default:
              return state
    }
}