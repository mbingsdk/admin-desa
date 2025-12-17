import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const {
    isAuthenticated,
    user,
    isBootstrapping,
  } = useSelector((s) => s.auth);

  // ⛔ JANGAN redirect selama bootstrap
  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}
