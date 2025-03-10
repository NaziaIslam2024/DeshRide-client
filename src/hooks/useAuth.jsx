import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
