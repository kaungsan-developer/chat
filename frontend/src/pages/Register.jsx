import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../libs/axiosInstance";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

async function postRegister(data) {
  const res = await axiosInstance.post("/auth/register", data);
  return res.data;
}
export default function Register() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { authUser, setAuthUser } = useAuthStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerMutate = useMutation({
    mutationFn: postRegister,
    onMutate: () => setIsRegistering(true),
    onSuccess: (data) => {
      setAuthUser(data);
      setIsRegistering(false);
      toast.success("Account Created Successfully");
      navigate("/");
    },
  });

  const onSubmit = (data) => {
    registerMutate.mutate(data);
  };

  return (
    <div className="flex justify-center pt-10 ">
      <div className="space-y-5  px-10 py-5 border border-primary/10 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-xl font-bold">Create New Account</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div>
              <label htmlFor="fullName" className="text-sm">
                FullName
              </label>
              <input
                type="text"
                name="fullname"
                className="input input-accent focus:outline-0 "
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p className="text-xs text-error">This field is required</p>
              )}
            </div>
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
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                className="input input-accent focus:outline-0 "
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-xs text-error">This field is required</p>
              )}
            </div>
          </div>
          <div className="flex justify-end items-center mt-4">
            <button
              type="submit"
              className="btn btn-ghost shadow"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        <div className="divider"></div>
        <div className="flex justify-center">
          <Link to={"/login"} className="text-sm">
            Already have account? <span className="text-primary">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
