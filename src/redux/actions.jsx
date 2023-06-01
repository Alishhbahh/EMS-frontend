import { STORE_USER, SELECT_NAV_ITEM, SELECT_USER } from "./actiontypes";

export const addUser = (user) => {
  return {
    type: STORE_USER,
    payload: user,
  };
};

export const selectNavItem = (item) => {
  return {
    type: SELECT_NAV_ITEM,
    payload: item,
  };
};

export const setSelectedUser = (user) => {
  return {
    type: SELECT_USER,
    payload: user,
  };
};
