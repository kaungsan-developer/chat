import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function PublicRoute({ children }) {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to={"/"} replace />;
  }

  return children;
}
