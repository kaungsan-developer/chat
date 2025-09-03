import { create } from "zustand";
import axiosInstance from "../libs/axiosInstance";

export const useAuthStore = create((set) => ({
  authUser: null,
  setAuthUser: (user) =>
    set((state) => ({
      authUser: user,
    })),
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log(error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    const res = await axiosInstance.post("/auth/logout");

    return res.data;
  },
}));
