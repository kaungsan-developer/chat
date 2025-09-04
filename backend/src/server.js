import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import db_connect from "./libs/db.js";
import authRouter from "./routes/authRoute.js";
import messageRouter from "./routes/messageRoute.js";
import userRouter from "./routes/userRoute.js";

import AuthMiddleware from "./middlewares/AuthMiddleware.js";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", AuthMiddleware, userRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT || 9984;
await db_connect();
app.listen(PORT, () => {
  console.log("Server is running at localhost:8894");
});
