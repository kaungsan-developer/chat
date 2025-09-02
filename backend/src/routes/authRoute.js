import express from "express";
import {
  register,
  login,
  logout,
  updateProfilePic,
  checkAuth,
} from "../controllers/authController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.put("/update-profilepic", AuthMiddleware, updateProfilePic);

authRouter.get("/check", AuthMiddleware, checkAuth);

export default authRouter;
