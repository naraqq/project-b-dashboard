import React, { createContext, useContext, useState, useRef } from "react";

const StateContext = createContext("");

export const ContextProvider = ({ children }) => {
  const [lock, setLock] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("token"));
  const TOKEN = localStorage.getItem("token");
  return (
    <StateContext.Provider value={{ lock, setLock, user, setUser, TOKEN }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
