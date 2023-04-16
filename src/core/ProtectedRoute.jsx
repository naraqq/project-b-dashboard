import { useStateContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const { user } = useStateContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
