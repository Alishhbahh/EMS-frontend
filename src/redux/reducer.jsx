import { STORE_USER, SELECT_NAV_ITEM, SET_COLLAPSE } from "./actiontypes";

const INIT_STATE = {
  user: "",
  navItem: "dashboard",
  collapse: false,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case STORE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SELECT_NAV_ITEM:
      return {
        ...state,
        navItem: action.payload,
      };
    case SET_COLLAPSE:
      return {
        ...state,
        collapse: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
