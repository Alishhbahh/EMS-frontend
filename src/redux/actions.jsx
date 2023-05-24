import {  STORE_USER,SELECT_NAV_ITEM, SET_COLLAPSE} from "./actiontypes";

export const addUser = (user) => {
    return {
      type: STORE_USER,
      payload: user,
    };
  };

export const selectNavItem =(item)=>{
  return{
    type: SELECT_NAV_ITEM,
    payload:item,
  }
}

export const setDrawerCollapse=(collapse)=>{
  return{
    type: SET_COLLAPSE,
    payload: collapse,
  }
}