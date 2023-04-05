import React, { createContext, useContext, useState, useRef } from "react";

const StateContext = createContext("");

export const ContextProvider = ({ children }) => {
  const [lock, setLock] = useState(false);
  return (
    <StateContext.Provider value={{ lock, setLock }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
