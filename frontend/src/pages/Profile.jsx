import { Camera, User, Mail, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export default function Profile() {
  const { authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const profilePic = reader.result;
      setSelectedImage(profilePic);

      const res = await axiosInstance.put("/auth/update-profilePic", {
        profilePic,
      });
      return res.data;
    };
  };

  const uploadProfileMutate = useMutation({
    mutationFn: handleUpload,
    onMutate: () => {
      setIsUploading(true);
    },
    onSuccess: () => {
      setIsUploading(false);
      toast.success("Profile Uploaded");
    },
    onError: () => {
      setIsUploading(false);
      toast.error("Cannot Upload Profile");
    },
  });
  return (
    <div className="container mx-auto">
      <div className="max-w-2xl mx-auto p-4 py-8 ">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-2">Your Profile Information</p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-3">
          <div className="relative">
            <img
              src={
                selectedImage ||
                authUser?.profilePic ||
                "../../public/avatar.jpg"
              }
              alt=""
              className="size-32 rounded-full object-cover border-2"
            />
            <label
              htmlFor="upload-avatar"
              className="absolute bottom-[0] right-0  p-2 rounded-full cursor-pointer transition-all duration-200 z-20 bg-primary/10 hover:bg-primary/20 "
            >
              <Camera className="w-5 h-5 text-primary-200" />

              <input
                id="upload-avatar"
                type="file"
                className="hidden"
                accept="image/*"
                disabled={isUploading}
                onChange={uploadProfileMutate.mutate}
              />
            </label>
          </div>
          {isUploading && (
            <p className="opacity-50 flex gap-1.5">
              Uploading Image
              <Loader className="animate-spin" />
            </p>
          )}
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <div className="flex gap-2 text-zinc-500  items-center text-sm">
              <User className="size-4 " />
              Full Name
            </div>
            <p className="px-4 py-2.5 rounded-lg border border-primary/20">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex gap-2 text-zinc-500  items-center text-sm">
              <User className="size-4 " />
              E-mail
            </div>
            <p className="px-4 py-2.5 rounded-lg border border-primary/20">
              {authUser?.email}
            </p>
          </div>
        </div>

        <div className="mt-15 px-5">
          <h1 className="text-xl font-medium mb-5">Account Information</h1>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h1>Member Since</h1>
              <p>{format(new Date(authUser?.createdAt), "yyyy-MM-dd")}</p>
            </div>
            <div className="divider"></div>
            <div className="flex justify-between items-center">
              <h1>Account Status</h1>
              <p className="text-success">Active</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[300px]"></div>
    </div>
  );
}
