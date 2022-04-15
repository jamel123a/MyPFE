import ACTIONS from "./Index";

export const dispatchLoginEntreprise =()=>{
    return{
      type :ACTIONS.ENTREPRISE_LOGIN
    }
}
export const dispatchLoginCondidat =()=>{
    return{
      type :ACTIONS.USER_LOGIN
    }
}