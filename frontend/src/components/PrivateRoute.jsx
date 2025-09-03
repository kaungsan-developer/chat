import { Navigate } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function PrivateRoute({ children }) {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}
