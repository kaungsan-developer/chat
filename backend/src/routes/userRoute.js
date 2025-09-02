import express from "express";
import { getUserListForSidebar } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getUserListForSidebar);

export default userRouter;
