/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

export const AdminContext = createContext();

const init = {
  status: false,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, status: true, user: action.payload };
    case "LOGOUT":
      return { ...state, status: false, user: null };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, init);
  return (
    <AdminContext.Provider value={{state, dispatch}}>
      <>{children}</>
    </AdminContext.Provider>
  );
};
