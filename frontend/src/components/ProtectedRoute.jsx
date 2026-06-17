import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("ProtectedRoute:", {
    token,
    role,
    allowedRole,
  });

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (
    allowedRole &&
    role &&
    role.toUpperCase() !== allowedRole.toUpperCase()
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;