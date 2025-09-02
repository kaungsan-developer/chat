import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db_connect from "./libs/db.js";

import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);
const PORT = process.env.PORT || 9984;
await db_connect();
app.listen(PORT, () => {
  console.log("Server is running at localhost:8894");
});
