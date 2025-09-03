import { useAuthStore } from "../store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function NavBar() {
  const { authUser, setAuthUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const logoutMutate = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setAuthUser(null);
      toast.success("Logout Success");
      navigate("/login");
    },
  });
  return (
    <div>
      {authUser && <button onClick={logoutMutate.mutate}>Logout</button>}
    </div>
  );
}
