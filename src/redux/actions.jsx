import {  STORE_USER } from "./actiontypes";

export const addUser = (user) => {
    return {
      type: STORE_USER,
      payload: user,
    };
  };
