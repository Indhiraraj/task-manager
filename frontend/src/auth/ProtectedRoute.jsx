// src/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { getUser } from "./auth";

const ProtectedRoute = ({ element, allowedRoles }) => {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;

  return allowedRoles.includes(user.role) ? element : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
