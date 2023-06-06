import {
  STORE_USER,
  SELECT_NAV_ITEM,
  SELECT_USER,
  SET_SELECTED_MONTH,
} from "./actiontypes";

const INIT_STATE = {
  user: "",
  navItem: "dashboard",
  selectedUser: "",
  selectedMonth: new Date().toLocaleString("default", { month: "long" }),
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
    case SELECT_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case SET_SELECTED_MONTH:
      return {
        ...state,
        selectedMonth: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
