import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../libs/axiosInstance";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { Eye, EyeClosed } from "lucide-react";

async function postLogin(data) {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
}
export default function Register() {
  const [isLoginRunning, setIsLoginRunning] = useState(false);
  const { setAuthUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutate = useMutation({
    mutationFn: postLogin,
    onMutate: () => setIsLoginRunning(true),
    onSuccess: (data) => {
      setAuthUser(data);
      setIsLoginRunning(false);
      toast.success("Login Success");
      navigate("/");
    },
  });

  const onSubmit = (data) => {
    loginMutate.mutate(data);
  };

  return (
    <div className="flex justify-center pt-10 ">
      <div className="space-y-5  px-10 py-5 border border-primary/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-xl font-bold">Login</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                type="text"
                className={`input input-accent focus:outline-0 `}
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-xs text-error">This field is required</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-accent focus:outline-none"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-xs text-error">This field is required</p>
                )}
                <button
                  type="button"
                  className="btn btn-ghost btn-xs absolute right-2 top-2 z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5" />
                  ) : (
                    <EyeClosed className="size-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center mt-4">
            <button
              type="submit"
              className="btn btn-ghost shadow"
              disabled={isLoginRunning}
            >
              {isLoginRunning ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="divider"></div>
        <div className="flex justify-center">
          <Link to={"/register"} className="text-sm">
            Already have account? <span className="text-primary">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
