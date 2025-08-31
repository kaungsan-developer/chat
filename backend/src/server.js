import express from "express";
import dotenv from "dotenv";
import db_connect from "./libs/db.js";

import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", userRouter);

const PORT = process.env.PORT || 8894;
await db_connect();
app.listen(PORT, () => {
  console.log("Server is running at localhost:8894");
});
