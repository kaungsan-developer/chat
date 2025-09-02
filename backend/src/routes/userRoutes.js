import express from "express";
import {
  register,
  login,
  logout,
  updateProfilePic,
  checkAuth,
} from "../controllers/authController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const userRouter = express.Router();

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.post("/logout", logout);

userRouter.put("/update-profilepic", AuthMiddleware, updateProfilePic);

userRouter.get("/check", AuthMiddleware, checkAuth);

export default userRouter;
