import ACTION from "../action/Index";
const initialState={
    user :{},
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
               
            }
            
            default :
            return state

    }
}
export default authReducer ;