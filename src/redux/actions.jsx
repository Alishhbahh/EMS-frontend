import { GET_USER, STORE_USER } from "./actiontypes";

export const addUser = (user) => {
    return {
      type: STORE_USER,
      payload: user,
    };
  };

export const getUser=(user)=>{
    return{
        type: GET_USER,
        payload: user,
    }
}