import { useAuthStore } from "../store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { MessageSquare, LogOut, User, Settings } from "lucide-react";

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
    <header className="w-full backdrop-blur-2xl shadow">
      <div className="container mx-auto px-5 sm:px-0 py-2">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center gap-1.5 font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <MessageSquare className="text-primary" />
            <h1 className="text-xl">Chat</h1>
          </div>
          <div>
            {authUser && (
              <div className="flex gap-5">
                <Link to={"/profile/1"}>
                  <div className="flex items-center text-accent">
                    <User />
                    <h1 className="hidden md:inline">Profile</h1>
                  </div>
                </Link>

                <button onClick={logoutMutate.mutate}>
                  <div className="flex items-center text-error">
                    <LogOut />
                    <h1 className="hidden md:inline">Logout</h1>
                  </div>
                </button>

                <Link>
                  <div className="flex items-center text-primary">
                    <Settings />
                    <h1 className="hidden md:inline">Settings</h1>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
