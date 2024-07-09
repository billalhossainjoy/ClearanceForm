/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const Context = createContext();

export const ContexProvider = ({ children }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <Context.Provider value={{ isMenuActive, setIsMenuActive }}>
      {children}
    </Context.Provider>
  );
};
