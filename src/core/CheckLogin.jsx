import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export const CheckLogin = ({ children }) => {
  const { user } = useStateContext();
  if (user) {
    return <Navigate to="/home" />;
  } else return children;
};
