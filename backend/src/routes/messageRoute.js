import express from "express";
import {
  index,
  create,
  update,
  deleteMessage,
} from "../controllers/messageController.js";
const messageRouter = express.Router();

messageRouter.get("/messages/:id", index);
messageRouter.post("/messages/:id/send", create);
messageRouter.put("/messages/:id", update);
messageRouter.delete("/messages/:id/delete", deleteMessage);

export default messageRouter;
