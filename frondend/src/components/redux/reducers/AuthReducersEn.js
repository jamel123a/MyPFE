import ACTION from "../action/Index";
const initialState={
    user :null,
    isLogged :false,
    Role :''
}
const authReducer =(state =initialState,action)=>{
    switch(action.type){
        case ACTION.ENTREPRISE_LOGIN:
            return{
                ...state,
                isLogged :true,
                Role :'entreprise',
                user :action.payload
            }
        case ACTION.USER_LOGIN:  
            return{
                ...state,
                isLogged :true,
                Role :'condidat',
                user:action.payload
               
            }
            default :
            return state

    }
}
export default authReducer ;