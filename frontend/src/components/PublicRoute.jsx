import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function PublicRoute({ children }) {
  const { authUser } = useAuthStore();
  const location = useLocation();

  if (authUser) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
