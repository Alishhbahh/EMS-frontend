import { GET_USER, STORE_USER } from "./actiontypes";

const INIT_STATE = {
    user: ''
  };


  
const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,


      };
      case STORE_USER:
        return{
            ...state,
            user: action.payload,
        }
        default:
            return state;
        
    }
}

export default reducer;