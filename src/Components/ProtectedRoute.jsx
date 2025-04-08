import { Navigate } from "react-router-dom";
import { useUser } from "../Context/User";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/authenticate" replace />;
  }

  return children;
};

export default ProtectedRoute;
